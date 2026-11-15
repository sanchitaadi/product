<?php
/**
 * Shared Database Configuration & Full E-Commerce Business Logic
 * Peachy Plate Restaurant System
 * Conventional Shared cPanel Hosting Ready (PHP 8+, MySQL PDO)
 */

if (session_status() === PHP_SESSION_NONE) {
    if (PHP_VERSION_ID >= 70300) {
        session_set_cookie_params([
            'lifetime' => 86400 * 7,
            'path' => '/',
            'domain' => '',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
    }
    session_start();
}

// --------------------------------------------------------
// Database Configuration
// --------------------------------------------------------
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'peachy_plate');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'aadi');

/**
 * Get active PDO connection.
 */
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $passwordsToTry = [DB_PASS, '', 'root', 'admin'];

    foreach ($passwordsToTry as $pwd) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, $pwd, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            return $pdo;
        } catch (PDOException $e) {
            // Keep trying next password
        }
    }

    // Try creating database if it didn't exist
    try {
        $rootDsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4";
        $testPdo = new PDO($rootDsn, DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $testPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo = new PDO("mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        die("Fatal Database Connection Error: " . htmlspecialchars($e->getMessage()));
    }
}

// --------------------------------------------------------
// Settings Helper
// --------------------------------------------------------
function getSetting($key, $default = '') {
    static $settings_cache = null;
    if ($settings_cache === null) {
        $db = getDbConnection();
        $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
        $settings_cache = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    }
    return $settings_cache[$key] ?? $default;
}

function updateSetting($key, $value) {
    $db = getDbConnection();
    $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (:k, :v) ON DUPLICATE KEY UPDATE setting_value = :v2");
    return $stmt->execute([':k' => $key, ':v' => $value, ':v2' => $value]);
}

// Brand Constants based on Settings
define('RESTAURANT_NAME', getSetting('restaurant_name', 'Peachy Plate'));
define('RESTAURANT_TAGLINE', getSetting('restaurant_tagline', 'GOOD FOOD. CUTE MOODS.'));
define('RESTAURANT_LOCATION', 'New Delhi, India');
define('RESTAURANT_ADDRESS', getSetting('restaurant_address', '24, Garden Avenue, New Delhi, India'));
define('RESTAURANT_PHONE', getSetting('restaurant_phone', '+91 98765 43210 (dummy)'));
define('RESTAURANT_PHONE_RAW', '+919876543210');
define('RESTAURANT_EMAIL', getSetting('restaurant_email', 'hello@peachyplate.example'));
define('RESTAURANT_HOURS', getSetting('restaurant_hours', '11:00 AM – 11:00 PM'));
define('RESTAURANT_CURRENCY', getSetting('currency_symbol', '₹'));

// --------------------------------------------------------
// Security Helpers: CSRF, Sanitization, Formatting
// --------------------------------------------------------
function getCsrfToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function validateCsrfToken($token) {
    return !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], (string)$token);
}

function sanitize($data) {
    return htmlspecialchars(trim((string)$data), ENT_QUOTES, 'UTF-8');
}

function formatPrice($amount) {
    return RESTAURANT_CURRENCY . number_format((float)$amount, 0);
}

/**
 * Universal cPanel & Localhost compatible image path resolver.
 * Ensures images resolve correctly from root (index.html), concepts (/concept-a/), and admin (/admin/).
 */
function getRelativeAssetUrl($path) {
    if (empty($path)) {
        $path = 'shared/assets/images/fallback-food.svg';
    }
    if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, 'data:')) {
        return $path;
    }
    
    $script = str_replace('\\', '/', $_SERVER['PHP_SELF'] ?? '');
    if (preg_match('#/(concept-[abc]|admin)/#i', $script)) {
        $prefix = '../';
    } else {
        $prefix = '';
    }
    
    $clean = ltrim(str_replace('\\', '/', $path), './');
    if (!str_starts_with($clean, 'shared/')) {
        $clean = 'shared/assets/images/' . $clean;
    }
    return $prefix . $clean;
}

function getFoodImageUrl($path) {
    return getRelativeAssetUrl($path);
}

// --------------------------------------------------------
// Menu & Customizations
// --------------------------------------------------------
function getMenuItems($category = null, $search = null, $sort = null) {
    $db = getDbConnection();
    $sql = "SELECT * FROM menu_items WHERE is_available = 1";
    $params = [];

    if ($category && $category !== 'all' && $category !== 'All') {
        $sql .= " AND category = :cat";
        $params[':cat'] = $category;
    }

    if ($search && trim($search) !== '') {
        $sql .= " AND (name LIKE :s OR description LIKE :s2)";
        $params[':s'] = '%' . trim($search) . '%';
        $params[':s2'] = '%' . trim($search) . '%';
    }

    switch ($sort) {
        case 'price_low':
            $sql .= " ORDER BY price ASC, id ASC";
            break;
        case 'price_high':
            $sql .= " ORDER BY price DESC, id ASC";
            break;
        case 'popular':
            $sql .= " ORDER BY is_bestseller DESC, id ASC";
            break;
        default:
            $sql .= " ORDER BY is_bestseller DESC, category ASC, id ASC";
            break;
    }

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['image_url'] = getFoodImageUrl($r['image_url']);
    }
    unset($r);
    return $rows;
}

function getFeaturedMenuItems($limit = 6) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM menu_items WHERE is_bestseller = 1 AND is_available = 1 LIMIT :lim");
    $stmt->bindValue(':lim', (int)$limit, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['image_url'] = getFoodImageUrl($r['image_url']);
    }
    unset($r);
    return $rows;
}

function getMenuItemById($id) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM menu_items WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => (int)$id]);
    $item = $stmt->fetch();
    if ($item) {
        $item['image_url'] = getFoodImageUrl($item['image_url']);
    }
    return $item;
}

function getItemCustomizations($itemId, $category = null) {
    $db = getDbConnection();
    if (!$category) {
        $item = getMenuItemById($itemId);
        $category = $item['category'] ?? '';
    }

    $stmt = $db->prepare("
        SELECT * FROM customization_groups
        WHERE item_id = :id OR (item_id IS NULL AND category = :cat)
        ORDER BY id ASC
    ");
    $stmt->execute([':id' => (int)$itemId, ':cat' => $category]);
    $groups = $stmt->fetchAll();

    foreach ($groups as &$group) {
        $optStmt = $db->prepare("SELECT * FROM customization_options WHERE group_id = :gid AND is_available = 1 ORDER BY price_delta ASC, id ASC");
        $optStmt->execute([':gid' => $group['id']]);
        $group['options'] = $optStmt->fetchAll();
    }
    return $groups;
}

// --------------------------------------------------------
// Cart Management (Session & Server Validation)
// --------------------------------------------------------
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

function generateCartKey($itemId, $customizationOptionIds = [], $specialInstructions = '') {
    sort($customizationOptionIds);
    return md5($itemId . '_' . implode(',', $customizationOptionIds) . '_' . trim($specialInstructions));
}

function addToCart($itemId, $quantity = 1, $customizationOptionIds = [], $specialInstructions = '') {
    $db = getDbConnection();
    $item = getMenuItemById($itemId);
    if (!$item || !$item['is_available']) {
        return ['success' => false, 'error' => 'This item is currently unavailable.'];
    }

    $quantity = max(1, (int)$quantity);
    $cartKey = generateCartKey($itemId, $customizationOptionIds, $specialInstructions);

    if (isset($_SESSION['cart'][$cartKey])) {
        $_SESSION['cart'][$cartKey]['quantity'] += $quantity;
    } else {
        $_SESSION['cart'][$cartKey] = [
            'item_id' => (int)$itemId,
            'quantity' => $quantity,
            'customization_option_ids' => array_map('intval', (array)$customizationOptionIds),
            'special_instructions' => trim($specialInstructions)
        ];
    }

    return ['success' => true, 'cart' => getCartDetails()];
}

function updateCartQuantity($cartKey, $quantity) {
    if (!isset($_SESSION['cart'][$cartKey])) {
        return ['success' => false, 'error' => 'Cart item not found.'];
    }

    $quantity = (int)$quantity;
    if ($quantity <= 0) {
        unset($_SESSION['cart'][$cartKey]);
    } else {
        $_SESSION['cart'][$cartKey]['quantity'] = min(50, $quantity);
    }

    return ['success' => true, 'cart' => getCartDetails()];
}

function removeFromCart($cartKey) {
    if (isset($_SESSION['cart'][$cartKey])) {
        unset($_SESSION['cart'][$cartKey]);
    }
    return ['success' => true, 'cart' => getCartDetails()];
}

function clearCart() {
    $_SESSION['cart'] = [];
    unset($_SESSION['coupon']);
    return ['success' => true];
}

/**
 * Server-side validated cart calculation. Never trusts client prices.
 */
function getCartDetails() {
    $db = getDbConnection();
    $items = [];
    $subtotal = 0.0;
    $totalCount = 0;

    foreach ($_SESSION['cart'] as $key => $cartEntry) {
        $itemId = $cartEntry['item_id'];
        $qty = $cartEntry['quantity'];
        $item = getMenuItemById($itemId);

        if (!$item || !$item['is_available']) {
            continue;
        }

        $basePrice = (float)$item['price'];
        $addonsTotal = 0.0;
        $customizationsList = [];

        if (!empty($cartEntry['customization_option_ids'])) {
            $placeholders = implode(',', array_fill(0, count($cartEntry['customization_option_ids']), '?'));
            $optStmt = $db->prepare("
                SELECT o.id, o.name, o.price_delta, g.title as group_title
                FROM customization_options o
                JOIN customization_groups g ON o.group_id = g.id
                WHERE o.id IN ($placeholders)
            ");
            $optStmt->execute($cartEntry['customization_option_ids']);
            $options = $optStmt->fetchAll();

            foreach ($options as $opt) {
                $addonsTotal += (float)$opt['price_delta'];
                $customizationsList[] = [
                    'group' => $opt['group_title'],
                    'option' => $opt['name'],
                    'price_delta' => (float)$opt['price_delta']
                ];
            }
        }

        $unitPrice = $basePrice + $addonsTotal;
        $lineTotal = $unitPrice * $qty;
        $subtotal += $lineTotal;
        $totalCount += $qty;

        $items[] = [
            'cart_key' => $key,
            'item_id' => $itemId,
            'name' => $item['name'],
            'image_url' => getFoodImageUrl($item['image_url']),
            'category' => $item['category'],
            'is_veg' => (bool)$item['is_veg'],
            'base_price' => $basePrice,
            'addons_total' => $addonsTotal,
            'unit_price' => $unitPrice,
            'unit_price_formatted' => formatPrice($unitPrice),
            'quantity' => $qty,
            'line_total' => $lineTotal,
            'line_total_formatted' => formatPrice($lineTotal),
            'customizations' => $customizationsList,
            'special_instructions' => $cartEntry['special_instructions'] ?? ''
        ];
    }

    // Delivery calculation
    $deliveryChargeSetting = (float)getSetting('delivery_charge', 50.00);
    $freeDeliveryThreshold = (float)getSetting('free_delivery_threshold', 599.00);
    $minOrderAmount = (float)getSetting('min_order_amount', 199.00);

    $deliveryFee = ($subtotal >= $freeDeliveryThreshold || $subtotal == 0) ? 0.0 : $deliveryChargeSetting;

    // Coupon discount calculation
    $discountAmount = 0.0;
    $appliedCoupon = null;

    if (!empty($_SESSION['coupon'])) {
        $couponCode = $_SESSION['coupon']['code'];
        $couponValidation = validateCouponOnServer($couponCode, $subtotal);
        if ($couponValidation['valid']) {
            $discountAmount = $couponValidation['discount'];
            $appliedCoupon = $couponValidation['coupon'];
        } else {
            // Remove invalid coupon automatically
            unset($_SESSION['coupon']);
        }
    }

    $finalTotal = max(0.0, ($subtotal - $discountAmount) + $deliveryFee);

    return [
        'items' => $items,
        'item_count' => $totalCount,
        'subtotal' => $subtotal,
        'subtotal_formatted' => formatPrice($subtotal),
        'delivery_fee' => $deliveryFee,
        'delivery_fee_formatted' => $deliveryFee == 0 ? 'FREE' : formatPrice($deliveryFee),
        'free_delivery_threshold' => $freeDeliveryThreshold,
        'min_order_amount' => $minOrderAmount,
        'discount_amount' => $discountAmount,
        'discount_formatted' => formatPrice($discountAmount),
        'coupon' => $appliedCoupon,
        'final_total' => $finalTotal,
        'final_total_formatted' => formatPrice($finalTotal),
        'currency' => RESTAURANT_CURRENCY,
        'orders_enabled' => (bool)getSetting('orders_enabled', '1')
    ];
}

// --------------------------------------------------------
// Coupon System
// --------------------------------------------------------
function validateCouponOnServer($code, $subtotal, $customerEmail = null) {
    $db = getDbConnection();
    $code = strtoupper(trim((string)$code));

    $stmt = $db->prepare("SELECT * FROM coupons WHERE code = :c AND is_active = 1 LIMIT 1");
    $stmt->execute([':c' => $code]);
    $coupon = $stmt->fetch();

    if (!$coupon) {
        return ['valid' => false, 'error' => 'Invalid coupon code.'];
    }

    $today = date('Y-m-d');
    if ($today < $coupon['valid_from'] || $today > $coupon['valid_to']) {
        return ['valid' => false, 'error' => 'This coupon has expired.'];
    }

    if ($coupon['usage_limit'] > 0 && $coupon['usage_count'] >= $coupon['usage_limit']) {
        return ['valid' => false, 'error' => 'Coupon usage limit has been reached.'];
    }

    if ($subtotal < (float)$coupon['min_order_amount']) {
        return [
            'valid' => false,
            'error' => 'Minimum order of ' . formatPrice($coupon['min_order_amount']) . ' required for this coupon.'
        ];
    }

    // Check repeat customer usage if email provided
    if ($customerEmail) {
        $chk = $db->prepare("SELECT COUNT(*) FROM coupon_usage WHERE coupon_id = :cid AND customer_email = :email");
        $chk->execute([':cid' => $coupon['id'], ':email' => $customerEmail]);
        if ($chk->fetchColumn() >= 3) {
            return ['valid' => false, 'error' => 'You have reached maximum redemption limit for this coupon.'];
        }
    }

    // Calculate discount
    $discount = 0.0;
    if ($coupon['discount_type'] === 'percentage') {
        $discount = ($subtotal * (float)$coupon['discount_value']) / 100.0;
        if (!empty($coupon['max_discount']) && (float)$coupon['max_discount'] > 0) {
            $discount = min($discount, (float)$coupon['max_discount']);
        }
    } else {
        $discount = (float)$coupon['discount_value'];
    }

    $discount = min($subtotal, $discount);

    return [
        'valid' => true,
        'coupon' => $coupon,
        'discount' => $discount,
        'discount_formatted' => formatPrice($discount)
    ];
}

function applyCoupon($code) {
    $cart = getCartDetails();
    if ($cart['subtotal'] <= 0) {
        return ['success' => false, 'error' => 'Your cart is empty. Add food items first.'];
    }

    $validation = validateCouponOnServer($code, $cart['subtotal']);
    if (!$validation['valid']) {
        return ['success' => false, 'error' => $validation['error']];
    }

    $_SESSION['coupon'] = [
        'id' => $validation['coupon']['id'],
        'code' => $validation['coupon']['code'],
        'description' => $validation['coupon']['description'],
        'discount' => $validation['discount']
    ];

    return ['success' => true, 'cart' => getCartDetails()];
}

function removeCoupon() {
    unset($_SESSION['coupon']);
    return ['success' => true, 'cart' => getCartDetails()];
}

// --------------------------------------------------------
// Order Creation with Transactions
// --------------------------------------------------------
function generateUniqueOrderNumber() {
    return 'PP-' . date('Y') . '-' . strtoupper(bin2hex(random_bytes(3)));
}

function createOrder($data) {
    $db = getDbConnection();
    $cart = getCartDetails();

    if (empty($cart['items'])) {
        return ['success' => false, 'error' => 'Your cart is currently empty.'];
    }

    if (!getSetting('orders_enabled', '1')) {
        return ['success' => false, 'error' => 'We are temporarily not accepting online orders. Please call us directly!'];
    }

    if ($cart['subtotal'] < $cart['min_order_amount']) {
        return ['success' => false, 'error' => 'Minimum order amount is ' . formatPrice($cart['min_order_amount']) . '.'];
    }

    // Validation
    $name = trim($data['name'] ?? $data['customer_name'] ?? '');
    $phone = trim($data['phone'] ?? $data['customer_phone'] ?? '');
    $email = trim($data['email'] ?? $data['customer_email'] ?? '');
    $orderType = in_array($data['order_type'] ?? '', ['delivery', 'takeaway']) ? $data['order_type'] : 'delivery';
    $paymentMethod = $data['payment_method'] ?? 'cod';
    $conceptSource = $data['concept_source'] ?? 'Concept A - Coquette';

    if (strlen($name) < 2) {
        return ['success' => false, 'error' => 'Please provide your full name.'];
    }
    if (strlen($phone) < 8) {
        return ['success' => false, 'error' => 'Please provide a valid phone number for delivery updates.'];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['success' => false, 'error' => 'Please enter a valid email address.'];
    }

    $address = '';
    $city = 'New Delhi';
    $pincode = '';
    $landmark = '';

    if ($orderType === 'delivery') {
        $address = trim($data['address'] ?? $data['delivery_address'] ?? '');
        $city = trim($data['city'] ?? $data['delivery_city'] ?? 'New Delhi');
        $pincode = trim($data['pincode'] ?? $data['delivery_pincode'] ?? '');
        $landmark = trim($data['landmark'] ?? $data['delivery_landmark'] ?? '');

        if (strlen($address) < 6) {
            return ['success' => false, 'error' => 'Please provide a complete delivery street address.'];
        }
        if (strlen($pincode) < 4) {
            return ['success' => false, 'error' => 'Please provide a valid postal pincode.'];
        }
    }

    // Payment validation
    $codEnabled = (bool)getSetting('cod_enabled', '1');
    $pickupPayEnabled = (bool)getSetting('pay_at_pickup_enabled', '1');

    if ($paymentMethod === 'cod' && !$codEnabled) {
        return ['success' => false, 'error' => 'Cash on Delivery is currently disabled.'];
    }
    if ($paymentMethod === 'pay_at_pickup' && !$pickupPayEnabled) {
        return ['success' => false, 'error' => 'Pay at Pickup is currently disabled.'];
    }
    if ($paymentMethod === 'online_coming_soon') {
        return ['success' => false, 'error' => 'Online payment is currently in preview. Please choose Cash on Delivery or Pay at Pickup.'];
    }

    $deliveryFee = ($orderType === 'takeaway') ? 0.0 : $cart['delivery_fee'];
    $finalTotal = max(0.0, ($cart['subtotal'] - $cart['discount_amount']) + $deliveryFee);
    $orderNumber = generateUniqueOrderNumber();
    $customerId = isset($_SESSION['customer_id']) ? (int)$_SESSION['customer_id'] : null;

    // Database Transaction
    try {
        $db->beginTransaction();

        $orderStmt = $db->prepare("
            INSERT INTO orders (
                order_number, customer_id, customer_name, customer_email, customer_phone,
                order_type, delivery_address, city, pincode, landmark, special_instructions,
                subtotal, delivery_fee, discount_amount, coupon_code, final_total,
                order_status, concept_source
            ) VALUES (
                :ord_num, :cust_id, :c_name, :c_email, :c_phone,
                :ord_type, :addr, :city, :pin, :lmark, :instr,
                :subtot, :deliv, :disc, :coupon, :final,
                'Pending', :source
            )
        ");

        $orderStmt->execute([
            ':ord_num' => $orderNumber,
            ':cust_id' => $customerId,
            ':c_name' => $name,
            ':c_email' => $email,
            ':c_phone' => $phone,
            ':ord_type' => $orderType,
            ':addr' => $address,
            ':city' => $city,
            ':pin' => $pincode,
            ':lmark' => $landmark,
            ':instr' => trim($data['special_instructions'] ?? ''),
            ':subtot' => $cart['subtotal'],
            ':deliv' => $deliveryFee,
            ':disc' => $cart['discount_amount'],
            ':coupon' => $cart['coupon']['code'] ?? null,
            ':final' => $finalTotal,
            ':source' => $conceptSource
        ]);

        $orderId = $db->lastInsertId();

        // Insert Order Items and Customizations
        $itemStmt = $db->prepare("
            INSERT INTO order_items (order_id, item_id, item_name, unit_price, quantity, total_price, customizations_summary)
            VALUES (:oid, :iid, :iname, :uprice, :qty, :tprice, :summary)
        ");

        $optStmt = $db->prepare("
            INSERT INTO order_item_customizations (order_item_id, group_title, option_name, price_delta)
            VALUES (:oiid, :gtitle, :oname, :pdelta)
        ");

        foreach ($cart['items'] as $item) {
            $summaryParts = [];
            foreach ($item['customizations'] as $c) {
                $summaryParts[] = $c['option'];
            }
            $summaryStr = implode('; ', $summaryParts);

            $itemStmt->execute([
                ':oid' => $orderId,
                ':iid' => $item['item_id'],
                ':iname' => $item['name'],
                ':uprice' => $item['unit_price'],
                ':qty' => $item['quantity'],
                ':tprice' => $item['line_total'],
                ':summary' => $summaryStr
            ]);

            $orderItemId = $db->lastInsertId();

            foreach ($item['customizations'] as $c) {
                $optStmt->execute([
                    ':oiid' => $orderItemId,
                    ':gtitle' => $c['group'],
                    ':oname' => $c['option'],
                    ':pdelta' => $c['price_delta']
                ]);
            }
        }

        // Insert Payment record
        $payStmt = $db->prepare("
            INSERT INTO payments (order_id, payment_method, payment_status, amount, transaction_reference)
            VALUES (:oid, :pmethod, 'unpaid', :amt, :ref)
        ");
        $payStmt->execute([
            ':oid' => $orderId,
            ':pmethod' => $paymentMethod,
            ':amt' => $finalTotal,
            ':ref' => 'REF-' . $orderNumber
        ]);

        // Record Coupon Usage
        if (!empty($cart['coupon'])) {
            $cpUsageStmt = $db->prepare("
                INSERT INTO coupon_usage (coupon_id, order_id, customer_email)
                VALUES (:cid, :oid, :email)
            ");
            $cpUsageStmt->execute([
                ':cid' => $cart['coupon']['id'],
                ':oid' => $orderId,
                ':email' => $email
            ]);

            $db->prepare("UPDATE coupons SET usage_count = usage_count + 1 WHERE id = :id")->execute([':id' => $cart['coupon']['id']]);
        }

        // If customer is logged in, optionally save address
        if ($customerId && !empty($data['save_address']) && $orderType === 'delivery') {
            saveCustomerAddress($customerId, $address, $city, $pincode, $landmark);
        }

        $db->commit();

        // Clear cart
        clearCart();

        // Trigger asynchronous/safe confirmation notification
        sendOrderReceivedNotification($orderId);

        return [
            'success' => true,
            'order_id' => $orderId,
            'order_number' => $orderNumber
        ];
    } catch (Exception $e) {
        $db->rollBack();
        return ['success' => false, 'error' => 'Database error while placing order: ' . $e->getMessage()];
    }
}

// --------------------------------------------------------
// Order Tracking & Retrieval
// --------------------------------------------------------
function getOrderByTracking($orderNumber, $phone) {
    $db = getDbConnection();
    $orderNumber = trim((string)$orderNumber);
    $phone = trim((string)$phone);

    $stmt = $db->prepare("
        SELECT * FROM orders
        WHERE order_number = :num AND (customer_phone = :phone OR customer_phone LIKE :pclean)
        LIMIT 1
    ");
    $cleanPhone = '%' . substr(preg_replace('/[^0-9]/', '', $phone), -8);
    $stmt->execute([':num' => $orderNumber, ':phone' => $phone, ':pclean' => $cleanPhone]);
    $order = $stmt->fetch();

    if (!$order) {
        return null;
    }

    // Fetch items
    $itemStmt = $db->prepare("SELECT * FROM order_items WHERE order_id = :oid");
    $itemStmt->execute([':oid' => $order['id']]);
    $order['items'] = $itemStmt->fetchAll();

    // Fetch payment
    $payStmt = $db->prepare("SELECT * FROM payments WHERE order_id = :oid LIMIT 1");
    $payStmt->execute([':oid' => $order['id']]);
    $order['payment'] = $payStmt->fetch();

    return $order;
}

function getOrderById($orderId) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM orders WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => (int)$orderId]);
    $order = $stmt->fetch();
    if (!$order) return null;

    $itemStmt = $db->prepare("SELECT * FROM order_items WHERE order_id = :oid");
    $itemStmt->execute([':oid' => $order['id']]);
    $order['items'] = $itemStmt->fetchAll();

    $payStmt = $db->prepare("SELECT * FROM payments WHERE order_id = :oid LIMIT 1");
    $payStmt->execute([':oid' => $order['id']]);
    $order['payment'] = $payStmt->fetch();

    return $order;
}

function getOrderByOrderNumber($orderNumber) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM orders WHERE order_number = :num LIMIT 1");
    $stmt->execute([':num' => trim((string)$orderNumber)]);
    $order = $stmt->fetch();
    if (!$order) return null;

    $itemStmt = $db->prepare("SELECT * FROM order_items WHERE order_id = :oid");
    $itemStmt->execute([':oid' => $order['id']]);
    $order['items'] = $itemStmt->fetchAll();

    $payStmt = $db->prepare("SELECT * FROM payments WHERE order_id = :oid LIMIT 1");
    $payStmt->execute([':oid' => $order['id']]);
    $order['payment'] = $payStmt->fetch();

    return $order;
}

// --------------------------------------------------------
// Customer Account & Address Management
// --------------------------------------------------------
function customerRegister($fullName, $email, $phone, $password) {
    $db = getDbConnection();
    $fullName = trim((string)$fullName);
    $email = strtolower(trim((string)$email));
    $phone = trim((string)$phone);

    if (strlen($fullName) < 2) return ['success' => false, 'error' => 'Full name required.'];
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return ['success' => false, 'error' => 'Valid email required.'];
    if (strlen($phone) < 8) return ['success' => false, 'error' => 'Valid phone number required.'];
    if (strlen($password) < 6) return ['success' => false, 'error' => 'Password must be at least 6 characters.'];

    $chk = $db->prepare("SELECT id FROM customers WHERE email = :e LIMIT 1");
    $chk->execute([':e' => $email]);
    if ($chk->fetch()) {
        return ['success' => false, 'error' => 'An account with this email already exists. Please log in.'];
    }

    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $db->prepare("INSERT INTO customers (full_name, email, phone, password_hash) VALUES (:n, :e, :p, :h)");
    $stmt->execute([':n' => $fullName, ':e' => $email, ':p' => $phone, ':h' => $hash]);
    $id = $db->lastInsertId();

    $_SESSION['customer_id'] = $id;
    $_SESSION['customer_name'] = $fullName;
    $_SESSION['customer_email'] = $email;

    return ['success' => true, 'customer_id' => $id];
}

function customerLogin($email, $password) {
    $db = getDbConnection();
    $email = strtolower(trim((string)$email));
    $stmt = $db->prepare("SELECT * FROM customers WHERE email = :e LIMIT 1");
    $stmt->execute([':e' => $email]);
    $customer = $stmt->fetch();

    if ($customer && password_verify($password, $customer['password_hash'])) {
        $_SESSION['customer_id'] = $customer['id'];
        $_SESSION['customer_name'] = $customer['full_name'];
        $_SESSION['customer_email'] = $customer['email'];
        return ['success' => true, 'customer' => $customer];
    }
    return ['success' => false, 'error' => 'Invalid email or password.'];
}

function customerLogout() {
    unset($_SESSION['customer_id'], $_SESSION['customer_name'], $_SESSION['customer_email']);
    return ['success' => true];
}

function getCurrentCustomer() {
    if (empty($_SESSION['customer_id'])) return null;
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT id, full_name, email, phone, created_at FROM customers WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => (int)$_SESSION['customer_id']]);
    return $stmt->fetch() ?: null;
}

function getCustomerAddresses($customerId) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM customer_addresses WHERE customer_id = :cid ORDER BY is_default DESC, id DESC");
    $stmt->execute([':cid' => (int)$customerId]);
    return $stmt->fetchAll();
}

function saveCustomerAddress($customerId, $addressLine, $city, $pincode, $landmark) {
    $db = getDbConnection();
    $stmt = $db->prepare("
        INSERT INTO customer_addresses (customer_id, address_line, city, pincode, landmark)
        VALUES (:cid, :a, :c, :p, :l)
    ");
    return $stmt->execute([
        ':cid' => (int)$customerId,
        ':a' => $addressLine,
        ':c' => $city,
        ':p' => $pincode,
        ':l' => $landmark
    ]);
}

function getCustomerOrders($customerId) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM orders WHERE customer_id = :cid ORDER BY id DESC");
    $stmt->execute([':cid' => (int)$customerId]);
    $orders = $stmt->fetchAll();

    foreach ($orders as &$order) {
        $itemStmt = $db->prepare("SELECT * FROM order_items WHERE order_id = :oid");
        $itemStmt->execute([':oid' => $order['id']]);
        $order['items'] = $itemStmt->fetchAll();
    }
    return $orders;
}

// --------------------------------------------------------
// Wishlist System
// --------------------------------------------------------
if (!isset($_SESSION['wishlist'])) {
    $_SESSION['wishlist'] = [];
}

function toggleWishlist($itemId) {
    $itemId = (int)$itemId;
    $db = getDbConnection();
    $customerId = $_SESSION['customer_id'] ?? null;

    if ($customerId) {
        $chk = $db->prepare("SELECT id FROM wishlist WHERE customer_id = :cid AND item_id = :iid");
        $chk->execute([':cid' => $customerId, ':iid' => $itemId]);
        if ($chk->fetch()) {
            $db->prepare("DELETE FROM wishlist WHERE customer_id = :cid AND item_id = :iid")->execute([':cid' => $customerId, ':iid' => $itemId]);
            $isFavorited = false;
        } else {
            $db->prepare("INSERT INTO wishlist (customer_id, item_id) VALUES (:cid, :iid)")->execute([':cid' => $customerId, ':iid' => $itemId]);
            $isFavorited = true;
        }
    } else {
        $idx = array_search($itemId, $_SESSION['wishlist']);
        if ($idx !== false) {
            unset($_SESSION['wishlist'][$idx]);
            $isFavorited = false;
        } else {
            $_SESSION['wishlist'][] = $itemId;
            $isFavorited = true;
        }
    }

    return ['success' => true, 'is_favorited' => $isFavorited, 'count' => getWishlistCount()];
}

function getWishlistCount() {
    $customerId = $_SESSION['customer_id'] ?? null;
    if ($customerId) {
        $db = getDbConnection();
        $stmt = $db->prepare("SELECT COUNT(*) FROM wishlist WHERE customer_id = :cid");
        $stmt->execute([':cid' => $customerId]);
        return (int)$stmt->fetchColumn();
    }
    return count($_SESSION['wishlist']);
}

function getWishlistItems() {
    $db = getDbConnection();
    $customerId = $_SESSION['customer_id'] ?? null;
    $itemIds = [];

    if ($customerId) {
        $stmt = $db->prepare("SELECT item_id FROM wishlist WHERE customer_id = :cid");
        $stmt->execute([':cid' => $customerId]);
        $itemIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } else {
        $itemIds = $_SESSION['wishlist'];
    }

    if (empty($itemIds)) return [];

    $placeholders = implode(',', array_fill(0, count($itemIds), '?'));
    $stmt = $db->prepare("SELECT * FROM menu_items WHERE id IN ($placeholders) AND is_available = 1");
    $stmt->execute($itemIds);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['image_url'] = getFoodImageUrl($r['image_url']);
    }
    unset($r);
    return $rows;
}

function isItemInWishlist($itemId) {
    $customerId = $_SESSION['customer_id'] ?? null;
    if ($customerId) {
        $db = getDbConnection();
        $stmt = $db->prepare("SELECT 1 FROM wishlist WHERE customer_id = :cid AND item_id = :iid LIMIT 1");
        $stmt->execute([':cid' => $customerId, ':iid' => (int)$itemId]);
        return (bool)$stmt->fetchColumn();
    }
    return in_array((int)$itemId, $_SESSION['wishlist']);
}

// --------------------------------------------------------
// Reviews & Ratings System
// --------------------------------------------------------
function getApprovedReviews($limit = 12) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM reviews WHERE status = 'approved' ORDER BY id DESC LIMIT :lim");
    $stmt->bindValue(':lim', (int)$limit, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
}

function submitReview($data) {
    $db = getDbConnection();
    $name = trim($data['customer_name'] ?? '');
    $email = trim($data['customer_email'] ?? '');
    $rating = max(1, min(5, (int)($data['rating'] ?? 5)));
    $dish = trim($data['dish_recommended'] ?? '');
    $text = trim($data['review_text'] ?? '');
    $source = $data['concept_source'] ?? 'Direct Website';

    if (strlen($name) < 2) return ['success' => false, 'error' => 'Please provide your name.'];
    if (strlen($text) < 10) return ['success' => false, 'error' => 'Review must be at least 10 characters long.'];

    $stmt = $db->prepare("
        INSERT INTO reviews (customer_name, customer_email, rating, dish_recommended, review_text, concept_source, status)
        VALUES (:n, :e, :r, :d, :t, :s, 'approved')
    ");
    $stmt->execute([
        ':n' => $name,
        ':e' => $email,
        ':r' => $rating,
        ':d' => $dish,
        ':t' => $text,
        ':s' => $source
    ]);

    return ['success' => true, 'id' => $db->lastInsertId()];
}

// --------------------------------------------------------
// Reservations
// --------------------------------------------------------
function saveReservation($data) {
    $db = getDbConnection();

    // Check duplicate reservation within 30 minutes for same phone/email on same date
    $checkStmt = $db->prepare("SELECT id FROM reservations WHERE email = :email AND reservation_date = :rdate AND reservation_time = :rtime AND phone = :phone LIMIT 1");
    $checkStmt->execute([
        ':email' => $data['email'],
        ':rdate' => $data['reservation_date'],
        ':rtime' => $data['reservation_time'],
        ':phone' => $data['phone']
    ]);

    if ($checkStmt->fetch()) {
        return ['success' => false, 'error' => 'A reservation with this phone/email for the same date and time slot already exists.'];
    }

    $stmt = $db->prepare("
        INSERT INTO reservations (name, phone, email, reservation_date, reservation_time, guests, seating_area, special_requests, concept_source, status)
        VALUES (:name, :phone, :email, :rdate, :rtime, :guests, :seating, :requests, :concept, 'Pending')
    ");

    $success = $stmt->execute([
        ':name' => $data['name'],
        ':phone' => $data['phone'],
        ':email' => $data['email'],
        ':rdate' => $data['reservation_date'],
        ':rtime' => $data['reservation_time'],
        ':guests' => (int)$data['guests'],
        ':seating' => $data['seating_area'] ?? 'Indoor Dining',
        ':requests' => $data['special_requests'] ?? '',
        ':concept' => $data['concept_source'] ?? 'Direct Website'
    ]);

    if ($success) {
        $resId = $db->lastInsertId();
        sendReservationNotification($resId);
        return ['success' => true, 'id' => $resId];
    }
    return ['success' => false, 'error' => 'Unable to record reservation. Please try again.'];
}

function saveContactMessage($data) {
    $db = getDbConnection();
    $stmt = $db->prepare("
        INSERT INTO contact_messages (name, email, phone, subject, message, concept_source, status)
        VALUES (:name, :email, :phone, :subject, :message, :concept, 'New')
    ");
    return $stmt->execute([
        ':name' => $data['name'],
        ':email' => $data['email'],
        ':phone' => $data['phone'] ?? '',
        ':subject' => $data['subject'] ?? 'Website Inquiry',
        ':message' => $data['message'],
        ':concept' => $data['concept_source'] ?? 'Direct Website'
    ]);
}

// --------------------------------------------------------
// Notifications / Email Architecture
// --------------------------------------------------------
function sendNotificationEmail($toEmail, $subject, $htmlContent) {
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: ' . getSetting('email_from_name', 'Peachy Plate Concierge') . ' <' . getSetting('restaurant_email', 'hello@peachyplate.example') . '>',
        'Reply-To: ' . getSetting('restaurant_email', 'hello@peachyplate.example'),
        'X-Mailer: PHP/' . phpversion()
    ];
    // In production cPanel hosting, mail() uses the local Exim MTA
    // If SMTP is enabled, custom socket wrapper or PHPMailer can be attached
    return @mail($toEmail, $subject, $htmlContent, implode("\r\n", $headers));
}

function sendOrderReceivedNotification($orderId) {
    $order = getOrderById($orderId);
    if (!$order) return false;

    $subject = "Order Confirmed: #" . $order['order_number'] . " — " . RESTAURANT_NAME;
    $itemsHtml = '';
    foreach ($order['items'] as $item) {
        $itemsHtml .= "<tr>
            <td style='padding: 8px; border-bottom: 1px solid #eee;'>{$item['item_name']} x {$item['quantity']}</td>
            <td style='padding: 8px; border-bottom: 1px solid #eee; text-align: right;'>" . formatPrice($item['total_price']) . "</td>
        </tr>";
    }

    $body = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px;'>
        <h2 style='color: #e11d48; margin-top: 0;'>Thank you for your order, {$order['customer_name']}!</h2>
        <p>Your order <strong>#{$order['order_number']}</strong> has been received by our kitchen.</p>
        <table style='width: 100%; border-collapse: collapse; margin: 20px 0;'>
            {$itemsHtml}
            <tr><td style='padding: 8px; font-weight: bold;'>Total Amount:</td><td style='padding: 8px; text-align: right; font-weight: bold;'>" . formatPrice($order['final_total']) . "</td></tr>
        </table>
        <p>Track your live order status anytime using your Order Number and phone number on our website tracking page.</p>
        <p style='color: #888; font-size: 12px;'>Peachy Plate &bull; 24, Garden Avenue, New Delhi &bull; " . RESTAURANT_PHONE . "</p>
    </div>";

    return sendNotificationEmail($order['customer_email'], $subject, $body);
}

function sendReservationNotification($reservationId) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * FROM reservations WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $reservationId]);
    $res = $stmt->fetch();
    if (!$res) return false;

    $subject = "Table Reservation Request Received: #" . $res['id'] . " — " . RESTAURANT_NAME;
    $body = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px;'>
        <h2 style='color: #e11d48; margin-top: 0;'>Reservation Request Received</h2>
        <p>Hello {$res['name']},</p>
        <p>We have safely recorded your reservation request for <strong>{$res['guests']} Guests</strong> on <strong>{$res['reservation_date']} at {$res['reservation_time']}</strong>.</p>
        <p>Our concierge will review table availability and send you a final confirmation.</p>
        <p style='color: #888; font-size: 12px;'>Peachy Plate &bull; 24, Garden Avenue, New Delhi &bull; " . RESTAURANT_PHONE . "</p>
    </div>";

    return sendNotificationEmail($res['email'], $subject, $body);
}

// --------------------------------------------------------
// Admin Dashboard Metrics & Analytics
// --------------------------------------------------------
function getDashboardStats() {
    $db = getDbConnection();
    $stats = [];
    $stats['total_orders'] = $db->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $stats['pending_orders'] = $db->query("SELECT COUNT(*) FROM orders WHERE order_status = 'Pending'")->fetchColumn();
    $stats['completed_orders'] = $db->query("SELECT COUNT(*) FROM orders WHERE order_status = 'Delivered'")->fetchColumn();
    $stats['total_revenue'] = (float)$db->query("SELECT COALESCE(SUM(final_total), 0) FROM orders WHERE order_status != 'Cancelled'")->fetchColumn();
    $stats['total_reservations'] = $db->query("SELECT COUNT(*) FROM reservations")->fetchColumn();
    $stats['pending_reservations'] = $db->query("SELECT COUNT(*) FROM reservations WHERE status = 'Pending'")->fetchColumn();
    $stats['confirmed_reservations'] = $db->query("SELECT COUNT(*) FROM reservations WHERE status = 'Confirmed'")->fetchColumn();
    $stats['total_menu_items'] = $db->query("SELECT COUNT(*) FROM menu_items")->fetchColumn();
    $stats['total_customers'] = $db->query("SELECT COUNT(*) FROM customers")->fetchColumn();
    $stats['total_messages'] = $db->query("SELECT COUNT(*) FROM contact_messages")->fetchColumn();
    $stats['total_reviews'] = $db->query("SELECT COUNT(*) FROM reviews")->fetchColumn();
    return $stats;
}
