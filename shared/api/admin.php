<?php
/**
 * Restaurant SaaS Admin API Endpoint
 * Powers the Peachy Plate 2.0 Next.js Admin Dashboard
 * Direct MySQL PDO prepared statements with real database analytics
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$payload = getRequestPayload();
$action = $payload['action'] ?? 'stats';
$db = getDbConnection();

// Public actions: login & check session
if ($action === 'login') {
    $username = trim($payload['username'] ?? '');
    $password = trim($payload['password'] ?? '');

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'error' => 'Username and password required.']);
        exit;
    }

    $stmt = $db->prepare("SELECT * FROM admins WHERE username = :u OR email = :e LIMIT 1");
    $stmt->execute([':u' => $username, ':e' => $username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
        $db->prepare("UPDATE admins SET last_login = NOW() WHERE id = :id")->execute([':id' => $admin['id']]);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];
        $_SESSION['admin_name'] = $admin['full_name'] ?? 'Restaurant Manager';
        $_SESSION['admin_role'] = $admin['role'] ?? 'superadmin';

        echo json_encode([
            'success' => true,
            'admin' => [
                'id' => $admin['id'],
                'username' => $admin['username'],
                'full_name' => $admin['full_name'],
                'email' => $admin['email'],
                'role' => $admin['role']
            ]
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid username or password.']);
    }
    exit;
}

if ($action === 'logout') {
    unset($_SESSION['admin_logged_in'], $_SESSION['admin_id'], $_SESSION['admin_username'], $_SESSION['admin_name'], $_SESSION['admin_role']);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'me') {
    $isLoggedIn = !empty($_SESSION['admin_logged_in']);
    if ($isLoggedIn) {
        $stmt = $db->prepare("SELECT id, username, full_name, email, role, last_login FROM admins WHERE id = :id");
        $stmt->execute([':id' => $_SESSION['admin_id']]);
        $admin = $stmt->fetch();
        echo json_encode(['success' => true, 'authenticated' => true, 'admin' => $admin]);
    } else {
        echo json_encode(['success' => true, 'authenticated' => false, 'admin' => null]);
    }
    exit;
}

// Ensure admin authentication for subsequent actions (or allow local dev inspect with default admin session if needed)
if (empty($_SESSION['admin_logged_in'])) {
    // Check if session can be verified or return unauthenticated
    echo json_encode(['success' => false, 'unauthorized' => true, 'error' => 'Admin authentication required.']);
    exit;
}

// Authenticated Admin Actions
switch ($action) {
    case 'stats':
    case 'dashboard_stats':
        $overview = getDashboardStats();

        // 7-day revenue trend
        $revStmt = $db->query("
            SELECT DATE(created_at) as order_date, SUM(final_total) as daily_revenue, COUNT(*) as daily_orders
            FROM orders
            WHERE order_status != 'Cancelled' AND created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(created_at)
            ORDER BY order_date ASC
        ");
        $revenueTrend = $revStmt->fetchAll(PDO::FETCH_ASSOC);

        // Status breakdown
        $statusStmt = $db->query("
            SELECT order_status, COUNT(*) as count, SUM(final_total) as total_amount
            FROM orders
            GROUP BY order_status
        ");
        $statusBreakdown = $statusStmt->fetchAll(PDO::FETCH_ASSOC);

        // Popular dishes from actual order_items
        $popularStmt = $db->query("
            SELECT oi.item_name, SUM(oi.quantity) as total_sold, SUM(oi.total_price) as total_sales, m.category, m.image_url
            FROM order_items oi
            LEFT JOIN menu_items m ON oi.item_id = m.id
            GROUP BY oi.item_name
            ORDER BY total_sold DESC
            LIMIT 5
        ");
        $popularDishes = $popularStmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($popularDishes as &$pd) {
            $pd['image_url'] = getFoodImageUrl($pd['image_url'] ?? 'fallback-food.svg');
        }

        // Recent orders (last 8)
        $recentOrdersStmt = $db->query("
            SELECT id, order_number, customer_name, customer_email, customer_phone, order_type, final_total, order_status, concept_source, created_at
            FROM orders
            ORDER BY created_at DESC
            LIMIT 8
        ");
        $recentOrders = $recentOrdersStmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'overview' => $overview,
            'revenue_trend' => $revenueTrend,
            'status_breakdown' => $statusBreakdown,
            'popular_dishes' => $popularDishes,
            'recent_orders' => $recentOrders
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'orders_list':
        $search = trim($payload['search'] ?? '');
        $status = trim($payload['status'] ?? '');
        $type = trim($payload['order_type'] ?? '');

        $sql = "SELECT * FROM orders WHERE 1=1";
        $params = [];

        if (!empty($search)) {
            $sql .= " AND (order_number LIKE :s OR customer_name LIKE :s OR customer_phone LIKE :s OR customer_email LIKE :s)";
            $params[':s'] = "%$search%";
        }
        if (!empty($status) && $status !== 'all') {
            $sql .= " AND order_status = :st";
            $params[':st'] = $status;
        }
        if (!empty($type) && $type !== 'all') {
            $sql .= " AND order_type = :ot";
            $params[':ot'] = $type;
        }

        $sql .= " ORDER BY created_at DESC LIMIT 100";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'orders' => $orders, 'total' => count($orders)], JSON_UNESCAPED_UNICODE);
        break;

    case 'order_details':
        $orderId = (int)($payload['order_id'] ?? 0);
        $order = getOrderById($orderId);
        if (!$order) {
            echo json_encode(['success' => false, 'error' => 'Order not found']);
            exit;
        }
        echo json_encode(['success' => true, 'order' => $order], JSON_UNESCAPED_UNICODE);
        break;

    case 'order_update_status':
        $orderId = (int)($payload['order_id'] ?? 0);
        $newStatus = trim($payload['status'] ?? '');
        $validStatuses = ['Pending', 'Accepted', 'Preparing', 'Ready for pickup', 'Out for delivery', 'Delivered', 'Cancelled'];

        if (!in_array($newStatus, $validStatuses)) {
            echo json_encode(['success' => false, 'error' => 'Invalid order status.']);
            exit;
        }

        $stmt = $db->prepare("UPDATE orders SET order_status = :st WHERE id = :id");
        $stmt->execute([':st' => $newStatus, ':id' => $orderId]);

        // If delivered, mark payment as paid if cod
        if ($newStatus === 'Delivered') {
            $db->prepare("UPDATE payments SET payment_status = 'paid' WHERE order_id = :id AND payment_status = 'unpaid'")->execute([':id' => $orderId]);
        }

        echo json_encode(['success' => true, 'order_id' => $orderId, 'status' => $newStatus]);
        break;

    case 'menu_list':
        $stmt = $db->query("SELECT * FROM menu_items ORDER BY category ASC, id ASC");
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($items as &$it) {
            $it['image_url'] = getFoodImageUrl($it['image_url']);
        }
        $catStmt = $db->query("SELECT * FROM categories ORDER BY display_order ASC");
        $categories = $catStmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'items' => $items, 'categories' => $categories], JSON_UNESCAPED_UNICODE);
        break;

    case 'menu_save':
        $id = (int)($payload['id'] ?? 0);
        $name = trim($payload['name'] ?? '');
        $category = trim($payload['category'] ?? 'Starters');
        $desc = trim($payload['description'] ?? '');
        $price = (float)($payload['price'] ?? 0);
        $isVeg = isset($payload['is_veg']) ? (int)$payload['is_veg'] : 1;
        $isBestseller = isset($payload['is_bestseller']) ? (int)$payload['is_bestseller'] : 0;
        $imageUrl = trim($payload['image_url'] ?? 'fallback-food.svg');
        $prepTime = trim($payload['preparation_time'] ?? '15 mins');
        $calories = (int)($payload['calories'] ?? 300);
        $isAvailable = isset($payload['is_available']) ? (int)$payload['is_available'] : 1;

        if (empty($name) || $price <= 0) {
            echo json_encode(['success' => false, 'error' => 'Item name and valid price required.']);
            exit;
        }

        if ($id > 0) {
            $stmt = $db->prepare("UPDATE menu_items SET name=:n, category=:cat, description=:d, price=:p, is_veg=:v, is_bestseller=:b, image_url=:img, preparation_time=:pt, calories=:cal, is_available=:a WHERE id=:id");
            $stmt->execute([':n' => $name, ':cat' => $category, ':d' => $desc, ':p' => $price, ':v' => $isVeg, ':b' => $isBestseller, ':img' => $imageUrl, ':pt' => $prepTime, ':cal' => $calories, ':a' => $isAvailable, ':id' => $id]);
        } else {
            $stmt = $db->prepare("INSERT INTO menu_items (name, category, description, price, is_veg, is_bestseller, image_url, preparation_time, calories, is_available) VALUES (:n, :cat, :d, :p, :v, :b, :img, :pt, :cal, :a)");
            $stmt->execute([':n' => $name, ':cat' => $category, ':d' => $desc, ':p' => $price, ':v' => $isVeg, ':b' => $isBestseller, ':img' => $imageUrl, ':pt' => $prepTime, ':cal' => $calories, ':a' => $isAvailable]);
            $id = $db->lastInsertId();
        }
        echo json_encode(['success' => true, 'id' => $id]);
        break;

    case 'menu_delete':
        $id = (int)($payload['id'] ?? 0);
        $db->prepare("DELETE FROM menu_items WHERE id = :id")->execute([':id' => $id]);
        echo json_encode(['success' => true]);
        break;

    case 'menu_toggle_available':
        $id = (int)($payload['id'] ?? 0);
        $stmt = $db->prepare("UPDATE menu_items SET is_available = IF(is_available=1, 0, 1) WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(['success' => true]);
        break;

    case 'reservations_list':
        $date = trim($payload['date'] ?? '');
        $status = trim($payload['status'] ?? '');
        $sql = "SELECT * FROM reservations WHERE 1=1";
        $params = [];
        if (!empty($date)) {
            $sql .= " AND reservation_date = :d";
            $params[':d'] = $date;
        }
        if (!empty($status) && $status !== 'all') {
            $sql .= " AND status = :st";
            $params[':st'] = $status;
        }
        $sql .= " ORDER BY reservation_date DESC, reservation_time DESC LIMIT 100";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        echo json_encode(['success' => true, 'reservations' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
        break;

    case 'reservation_update_status':
        $resId = (int)($payload['reservation_id'] ?? 0);
        $status = trim($payload['status'] ?? 'Confirmed');
        $db->prepare("UPDATE reservations SET status = :st WHERE id = :id")->execute([':st' => $status, ':id' => $resId]);
        echo json_encode(['success' => true]);
        break;

    case 'coupons_list':
        $stmt = $db->query("SELECT * FROM coupons ORDER BY id DESC");
        echo json_encode(['success' => true, 'coupons' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
        break;

    case 'coupon_save':
        $id = (int)($payload['id'] ?? 0);
        $code = strtoupper(trim($payload['code'] ?? ''));
        $desc = trim($payload['description'] ?? '');
        $type = in_array($payload['discount_type'] ?? '', ['percentage', 'fixed']) ? $payload['discount_type'] : 'percentage';
        $val = (float)($payload['discount_value'] ?? 0);
        $min = (float)($payload['min_order_amount'] ?? 0);
        $max = !empty($payload['max_discount']) ? (float)$payload['max_discount'] : null;
        $validFrom = $payload['valid_from'] ?? date('Y-m-d');
        $validTo = $payload['valid_to'] ?? date('Y-m-d', strtotime('+60 days'));
        $isActive = isset($payload['is_active']) ? (int)$payload['is_active'] : 1;

        if (empty($code) || $val <= 0) {
            echo json_encode(['success' => false, 'error' => 'Coupon code and discount amount required.']);
            exit;
        }

        if ($id > 0) {
            $stmt = $db->prepare("UPDATE coupons SET code=:c, description=:d, discount_type=:t, discount_value=:v, min_order_amount=:m, max_discount=:mx, valid_from=:vf, valid_to=:vt, is_active=:a WHERE id=:id");
            $stmt->execute([':c' => $code, ':d' => $desc, ':t' => $type, ':v' => $val, ':m' => $min, ':mx' => $max, ':vf' => $validFrom, ':vt' => $validTo, ':a' => $isActive, ':id' => $id]);
        } else {
            $stmt = $db->prepare("INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_discount, valid_from, valid_to, is_active) VALUES (:c, :d, :t, :v, :m, :mx, :vf, :vt, :a)");
            $stmt->execute([':c' => $code, ':d' => $desc, ':t' => $type, ':v' => $val, ':m' => $min, ':mx' => $max, ':vf' => $validFrom, ':vt' => $validTo, ':a' => $isActive]);
        }
        echo json_encode(['success' => true]);
        break;

    case 'coupon_delete':
        $id = (int)($payload['id'] ?? 0);
        $db->prepare("DELETE FROM coupons WHERE id = :id")->execute([':id' => $id]);
        echo json_encode(['success' => true]);
        break;

    case 'reviews_list':
        $stmt = $db->query("SELECT * FROM reviews ORDER BY id DESC LIMIT 100");
        echo json_encode(['success' => true, 'reviews' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
        break;

    case 'review_update_status':
        $id = (int)($payload['id'] ?? 0);
        $status = trim($payload['status'] ?? 'approved');
        $db->prepare("UPDATE reviews SET status = :st WHERE id = :id")->execute([':st' => $status, ':id' => $id]);
        echo json_encode(['success' => true]);
        break;

    case 'customers_list':
        $stmt = $db->query("
            SELECT c.*, COUNT(o.id) as total_orders, COALESCE(SUM(o.final_total), 0) as total_spent, MAX(o.created_at) as last_order_date
            FROM customers c
            LEFT JOIN orders o ON c.id = o.customer_id AND o.order_status != 'Cancelled'
            GROUP BY c.id
            ORDER BY total_spent DESC
        ");
        echo json_encode(['success' => true, 'customers' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
        break;

    case 'messages_list':
        $stmt = $db->query("SELECT * FROM contact_messages ORDER BY id DESC LIMIT 100");
        echo json_encode(['success' => true, 'messages' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
        break;

    case 'message_update_status':
        $id = (int)($payload['id'] ?? 0);
        $status = trim($payload['status'] ?? 'Read');
        $db->prepare("UPDATE contact_messages SET status = :st WHERE id = :id")->execute([':st' => $status, ':id' => $id]);
        echo json_encode(['success' => true]);
        break;

    case 'settings_get':
        $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
        echo json_encode(['success' => true, 'settings' => $stmt->fetchAll(PDO::FETCH_KEY_PAIR)], JSON_UNESCAPED_UNICODE);
        break;

    case 'settings_update':
        $settings = $payload['settings'] ?? [];
        if (is_array($settings)) {
            $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (:k, :v) ON DUPLICATE KEY UPDATE setting_value = :v2");
            foreach ($settings as $k => $v) {
                $stmt->execute([':k' => $k, ':v' => (string)$v, ':v2' => (string)$v]);
            }
        }
        echo json_encode(['success' => true]);
        break;

    case 'categories_list':
        $stmt = $db->query("
            SELECT c.*, COUNT(m.id) as item_count 
            FROM categories c 
            LEFT JOIN menu_items m ON m.category = c.name 
            GROUP BY c.id 
            ORDER BY c.display_order ASC, c.name ASC
        ");
        echo json_encode(['success' => true, 'categories' => $stmt->fetchAll(PDO::FETCH_ASSOC)], JSON_UNESCAPED_UNICODE);
        break;

    case 'category_save':
        $id = (int)($payload['id'] ?? 0);
        $name = trim($payload['name'] ?? '');
        $slug = trim($payload['slug'] ?? '');
        $desc = trim($payload['description'] ?? '');
        $order = (int)($payload['display_order'] ?? 0);
        $isActive = isset($payload['is_active']) ? (int)$payload['is_active'] : 1;

        if (empty($name)) {
            echo json_encode(['success' => false, 'error' => 'Category name is required.']);
            exit;
        }
        if (empty($slug)) {
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name), '-'));
        }

        if ($id > 0) {
            $stmt = $db->prepare("UPDATE categories SET name = :n, slug = :s, description = :d, display_order = :o, is_active = :a WHERE id = :id");
            $stmt->execute([':n' => $name, ':s' => $slug, ':d' => $desc, ':o' => $order, ':a' => $isActive, ':id' => $id]);
        } else {
            $stmt = $db->prepare("INSERT INTO categories (name, slug, description, display_order, is_active) VALUES (:n, :s, :d, :o, :a)");
            $stmt->execute([':n' => $name, ':s' => $slug, ':d' => $desc, ':o' => $order, ':a' => $isActive]);
        }
        echo json_encode(['success' => true]);
        break;

    case 'category_delete':
        $id = (int)($payload['id'] ?? 0);
        $db->prepare("DELETE FROM categories WHERE id = :id")->execute([':id' => $id]);
        echo json_encode(['success' => true]);
        break;

    case 'analytics':
        // Detailed metrics for reports
        // 1. Sales by category
        $catSalesStmt = $db->query("
            SELECT COALESCE(m.category, 'Uncategorized') as category, SUM(oi.quantity) as items_sold, SUM(oi.total_price) as total_revenue
            FROM order_items oi
            LEFT JOIN menu_items m ON oi.item_id = m.id
            GROUP BY m.category
            ORDER BY total_revenue DESC
        ");
        $salesByCategory = $catSalesStmt->fetchAll(PDO::FETCH_ASSOC);

        // 2. Orders by concept source (A vs B vs C)
        $conceptStmt = $db->query("
            SELECT concept_source, COUNT(*) as order_count, SUM(final_total) as revenue, AVG(final_total) as avg_order
            FROM orders
            GROUP BY concept_source
        ");
        $ordersByConcept = $conceptStmt->fetchAll(PDO::FETCH_ASSOC);

        // 3. Payment methods split
        $paymentStmt = $db->query("
            SELECT payment_method, COUNT(*) as count, SUM(final_total) as total
            FROM orders
            GROUP BY payment_method
        ");
        $ordersByPayment = $paymentStmt->fetchAll(PDO::FETCH_ASSOC);

        // 4. Order type split (Delivery vs Pickup)
        $typeStmt = $db->query("
            SELECT order_type, COUNT(*) as count, SUM(final_total) as total
            FROM orders
            GROUP BY order_type
        ");
        $ordersByType = $typeStmt->fetchAll(PDO::FETCH_ASSOC);

        // 5. Daily performance (last 14 days)
        $dailyStmt = $db->query("
            SELECT DATE(created_at) as date, COUNT(*) as orders, SUM(final_total) as revenue
            FROM orders
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND order_status != 'Cancelled'
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        ");
        $dailyPerformance = $dailyStmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'sales_by_category' => $salesByCategory,
            'orders_by_concept' => $ordersByConcept,
            'orders_by_payment' => $ordersByPayment,
            'orders_by_type' => $ordersByType,
            'daily_performance' => $dailyPerformance
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'profile_update':
        $adminId = $_SESSION['admin_id'] ?? 0;
        $fullName = trim($payload['full_name'] ?? '');
        $email = trim($payload['email'] ?? '');

        if (empty($fullName) || empty($email)) {
            echo json_encode(['success' => false, 'error' => 'Full name and email are required.']);
            exit;
        }

        $stmt = $db->prepare("UPDATE admins SET full_name = :fn, email = :em WHERE id = :id");
        $stmt->execute([':fn' => $fullName, ':em' => $email, ':id' => $adminId]);
        $_SESSION['admin_name'] = $fullName;

        echo json_encode(['success' => true]);
        break;

    case 'password_update':
        $adminId = $_SESSION['admin_id'] ?? 0;
        $currentPassword = $payload['current_password'] ?? '';
        $newPassword = $payload['new_password'] ?? '';

        if (empty($currentPassword) || empty($newPassword)) {
            echo json_encode(['success' => false, 'error' => 'Both current and new password are required.']);
            exit;
        }
        if (strlen($newPassword) < 6) {
            echo json_encode(['success' => false, 'error' => 'New password must be at least 6 characters.']);
            exit;
        }

        $stmt = $db->prepare("SELECT password_hash FROM admins WHERE id = :id");
        $stmt->execute([':id' => $adminId]);
        $row = $stmt->fetch();

        if (!$row || !password_verify($currentPassword, $row['password_hash'])) {
            echo json_encode(['success' => false, 'error' => 'Current password does not match.']);
            exit;
        }

        $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $updateStmt = $db->prepare("UPDATE admins SET password_hash = :hash WHERE id = :id");
        $updateStmt->execute([':hash' => $newHash, ':id' => $adminId]);

        echo json_encode(['success' => true]);
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Unknown admin action']);
        break;
}
exit;
