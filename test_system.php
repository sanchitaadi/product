<?php
/**
 * Comprehensive System Test Script for Peachy Plate E-Commerce Suite
 */
echo "=== PEACHY PLATE SYSTEM INTEGRATION TEST ===\n\n";

$baseUrl = "http://127.0.0.1:8000";
$cookieFile = __DIR__ . '/test_cookie.txt';
if (file_exists($cookieFile)) unlink($cookieFile);

function makeRequest($url, $method = 'GET', $data = null, $headers = []) {
    global $cookieFile;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);
    curl_setopt($ch, CURLOPT_HEADER, true);
    
    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        if ($data !== null) {
            if (is_array($data) && (isset($headers['Content-Type']) && str_contains($headers['Content-Type'], 'json'))) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            } elseif (is_array($data)) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
            } else {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            }
        }
    }
    
    $headerArr = [];
    foreach ($headers as $k => $v) {
        $headerArr[] = "$k: $v";
    }
    if (!empty($headerArr)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArr);
    }
    
    $rawRes = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $responseHeaders = substr($rawRes, 0, $headerSize);
    $body = substr($rawRes, $headerSize);
    curl_close($ch);

    if (in_array($httpCode, [301, 302, 303])) {
        if (preg_match('/Location:\s*([^\r\n]+)/i', $responseHeaders, $locMatch)) {
            $loc = trim($locMatch[1]);
            echo "   [Redirect 302] Location: $loc\n";
            if (!str_starts_with($loc, 'http')) {
                $parsed = parse_url($url);
                $loc = $parsed['scheme'] . '://' . $parsed['host'] . ':' . ($parsed['port'] ?? 80) . (str_starts_with($loc, '/') ? $loc : dirname($parsed['path']) . '/' . $loc);
            }
            return makeRequest($loc, 'GET');
        }
    }

    return ['code' => $httpCode, 'body' => $body];
}

// 1. Test Cart GET
echo "1. Testing Cart GET API...\n";
$res = makeRequest("$baseUrl/shared/api/cart.php?action=get");
echo "   Status: {$res['code']}\n";
$cart = json_decode($res['body'], true);
echo "   Success: " . ($cart['success'] ? 'YES' : 'NO') . " | Initial Items: " . $cart['cart']['item_count'] . "\n\n";

// 2. Test Customization API for item 1
echo "2. Testing Customization API for Item 1...\n";
$res = makeRequest("$baseUrl/shared/api/customization.php?item_id=1");
echo "   Status: {$res['code']}\n";
$custom = json_decode($res['body'], true);
echo "   Item: " . ($custom['item']['name'] ?? 'N/A') . " | Groups: " . count($custom['groups'] ?? []) . "\n\n";

// 3. Test Add Item to Cart
echo "3. Testing Add to Cart (Item 1 with customizations)...\n";
$res = makeRequest("$baseUrl/shared/api/cart.php?action=add", 'POST', [
    'item_id' => 1,
    'quantity' => 2,
    'customizations' => [1, 3], // Medium pizza + Extra Mozzarella
    'instructions' => 'Well done and sliced in 6'
], ['Content-Type' => 'application/json']);
echo "   Status: {$res['code']}\n";
$addRes = json_decode($res['body'], true);
echo "   Added Success: " . ($addRes['success'] ? 'YES' : 'NO') . "\n";
echo "   Item Count: " . ($addRes['cart']['item_count'] ?? 0) . " | Subtotal: " . ($addRes['cart']['subtotal_formatted'] ?? 'N/A') . "\n\n";

// 4. Test Add Second Item to Cart
echo "4. Testing Add Second Item to Cart (Item 5)...\n";
$res = makeRequest("$baseUrl/shared/api/cart.php?action=add", 'POST', [
    'item_id' => 5,
    'quantity' => 1,
    'customizations' => [],
    'instructions' => 'Less sugar'
], ['Content-Type' => 'application/json']);
$addRes2 = json_decode($res['body'], true);
echo "   Added Success: " . ($addRes2['success'] ? 'YES' : 'NO') . "\n";
echo "   New Item Count: " . ($addRes2['cart']['item_count'] ?? 0) . " | Subtotal: " . ($addRes2['cart']['subtotal_formatted'] ?? 'N/A') . "\n\n";

// 5. Test Coupon API
echo "5. Testing Coupon API (PEACHY20)...\n";
$res = makeRequest("$baseUrl/shared/api/coupon.php?action=apply", 'POST', [
    'coupon_code' => 'PEACHY20'
], ['Content-Type' => 'application/json']);
$couponRes = json_decode($res['body'], true);
echo "   Coupon Result: " . ($couponRes['message'] ?? 'N/A') . "\n";
echo "   Discount: " . ($couponRes['cart']['discount_formatted'] ?? 'N/A') . " | Final Total: " . ($couponRes['cart']['final_total_formatted'] ?? 'N/A') . "\n\n";

// 6. Test Wishlist API
echo "6. Testing Wishlist Toggle API...\n";
$res = makeRequest("$baseUrl/shared/api/wishlist.php?action=toggle", 'POST', [
    'item_id' => 3
], ['Content-Type' => 'application/json']);
$wishRes = json_decode($res['body'], true);
echo "   Wishlist Success: " . ($wishRes['success'] ? 'YES' : 'NO') . " | Action: " . ($wishRes['action'] ?? 'N/A') . " | Count: " . ($wishRes['count'] ?? 0) . "\n\n";

// 7. Test Concept A Checkout Page Load
echo "7. Testing Concept A Checkout Page GET...\n";
$res = makeRequest("$baseUrl/concept-a/checkout.php");
echo "   Status: {$res['code']} | Contains Checkout form: " . (str_contains($res['body'], 'form') ? 'YES' : 'NO') . "\n";
preg_match('/name="csrf_token"\s+value="([^"]+)"/', $res['body'], $csrfMatches);
$csrfToken = $csrfMatches[1] ?? '';
echo "   CSRF Token Extracted: " . (empty($csrfToken) ? 'NONE' : substr($csrfToken, 0, 10) . '...') . "\n\n";

// 8. Test Concept A Order Placement POST
echo "8. Testing Order Placement via Checkout POST...\n";
$checkoutData = [
    'csrf_token' => $csrfToken,
    'customer_name' => 'Aditi Sharma',
    'customer_phone' => '+91 98765 11223',
    'customer_email' => 'aditi.sharma@example.com',
    'order_type' => 'delivery',
    'delivery_address' => 'Apartment 4B, Peach Grove Residency, Outer Ring Road',
    'city' => 'New Delhi',
    'pincode' => '110025',
    'landmark' => 'Near Central Park Gate 2',
    'special_instructions' => 'Ring bell twice please',
    'payment_method' => 'cod'
];
$res = makeRequest("$baseUrl/concept-a/checkout.php", 'POST', $checkoutData);
echo "   Status: {$res['code']}\n";
preg_match('/<i class="fa-solid fa-circle-exclamation"[^>]*><\/i>\s*<span>(.*?)<\/span>/s', $res['body'], $errMatches);
echo "   Error msg: " . ($errMatches[1] ?? 'None') . "\n";
echo "   Redirected to Confirmation: " . (str_contains($res['body'], 'Order Confirmed') || str_contains($res['body'], 'PP-') ? 'YES' : 'NO') . "\n";

// Extract Order Number from confirmation redirect or body
preg_match('/PP-\d{4}-[A-Za-z0-9]+/', $res['body'], $matches);
if (empty($matches)) {
    preg_match('/PP-\d{4}-[A-Za-z0-9]+/', $loc ?? '', $matches);
}
$orderNumber = $matches[0] ?? null;
echo "   Created Order Number: " . ($orderNumber ?: 'Not found in output') . "\n\n";

// 9. Test Order Tracking
if ($orderNumber) {
    echo "9. Testing Order Tracking for $orderNumber...\n";
    $trackUrl = "$baseUrl/concept-a/order-tracking.php?order=" . urlencode($orderNumber) . "&phone=" . urlencode('+91 98765 11223');
    $res = makeRequest($trackUrl);
    echo "   Status: {$res['code']} | Found Tracking Timeline: " . (str_contains($res['body'], 'Timeline') || str_contains($res['body'], 'Status') ? 'YES' : 'NO') . "\n\n";

    // 9b. Test Admin Login and Order Management
    echo "9b. Testing Admin Login & Order Lifecycle Workflow...\n";
    $adminLoginRes = makeRequest("$baseUrl/admin/login.php", 'POST', [
        'username' => 'admin',
        'password' => 'admin123'
    ]);
    echo "   Admin Login Status: {$adminLoginRes['code']} | Logged in: " . (str_contains($adminLoginRes['body'], 'Dashboard') || str_contains($adminLoginRes['body'], 'admin') ? 'YES' : 'NO') . "\n";

    // Check Order in Admin Orders list
    $adminOrdersRes = makeRequest("$baseUrl/admin/orders.php");
    echo "   Admin Orders List Status: {$adminOrdersRes['code']} | Contains $orderNumber: " . (str_contains($adminOrdersRes['body'], $orderNumber) ? 'YES' : 'NO') . "\n";

    // Update Status to 'Preparing'
    $updateRes = makeRequest("$baseUrl/admin/orders.php", 'POST', [
        'action' => 'update_status',
        'order_number' => $orderNumber,
        'order_status' => 'Preparing'
    ]);
    echo "   Order Status Update Status: {$updateRes['code']}\n";

    // Verify Invoice
    $invoiceUrl = "$baseUrl/admin/invoice.php?order=" . urlencode($orderNumber);
    $resInv = makeRequest($invoiceUrl);
    echo "   Admin Invoice Status: {$resInv['code']} | Contains Peachy Plate Invoice: " . (str_contains($resInv['body'], 'TAX INVOICE') || str_contains($resInv['body'], 'Peachy Plate') ? 'YES' : 'NO') . "\n";

    // Re-verify tracking shows updated status
    $resTrack2 = makeRequest($trackUrl);
    echo "   Customer Tracking After Update: " . (str_contains($resTrack2['body'], 'Preparing') ? 'SHOWS PREPARING (LIVE SYNC OK)' : 'STATUS MISMATCH') . "\n\n";
}

// 10. Test Concept Pages Load (HTTP 200 checks)
echo "10. Testing All Key Concept Pages (HTTP 200 Check)...\n";
$testPages = [
    'Concept A - Menu' => "$baseUrl/concept-a/menu.php",
    'Concept A - Cart' => "$baseUrl/concept-a/cart.php",
    'Concept A - Account' => "$baseUrl/concept-a/account.php",
    'Concept A - Wishlist' => "$baseUrl/concept-a/wishlist.php",
    'Concept A - Reviews' => "$baseUrl/concept-a/reviews.php",
    'Concept B - Menu' => "$baseUrl/concept-b/menu.php",
    'Concept B - Cart' => "$baseUrl/concept-b/cart.php",
    'Concept B - Checkout' => "$baseUrl/concept-b/checkout.php",
    'Concept B - Tracking' => "$baseUrl/concept-b/order-tracking.php",
    'Concept B - Account' => "$baseUrl/concept-b/account.php",
    'Concept C - Menu' => "$baseUrl/concept-c/menu.php",
    'Concept C - Cart' => "$baseUrl/concept-c/cart.php",
    'Concept C - Checkout' => "$baseUrl/concept-c/checkout.php",
    'Concept C - Tracking' => "$baseUrl/concept-c/order-tracking.php",
    'Concept C - Account' => "$baseUrl/concept-c/account.php",
    'Admin - Orders' => "$baseUrl/admin/orders.php",
    'Admin - Settings' => "$baseUrl/admin/settings.php",
    'Admin - Coupons' => "$baseUrl/admin/coupons.php",
    'Admin - Reviews' => "$baseUrl/admin/reviews.php",
    'Admin - Customers' => "$baseUrl/admin/customers.php"
];

$allPass = true;
foreach ($testPages as $label => $url) {
    $res = makeRequest($url);
    $ok = ($res['code'] === 200);
    if (!$ok) $allPass = false;
    echo "   [" . ($ok ? "OK " : "ERR") . "] {$res['code']} - $label\n";
}

echo "\n=== INTEGRATION TEST COMPLETE: " . ($allPass ? "ALL SYSTEMS PASSED" : "SOME PAGES FAILED") . " ===\n";

if (file_exists($cookieFile)) unlink($cookieFile);
