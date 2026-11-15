<?php
/**
 * Coupon API Endpoint
 * Handles applying and removing coupon discount codes
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$action = $_REQUEST['action'] ?? 'apply';

if (empty($_POST)) {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $jsonData = json_decode($rawInput, true);
        if (is_array($jsonData)) {
            $_POST = $jsonData;
        }
    }
}

if ($action === 'apply') {
    $code = trim($_POST['code'] ?? $_POST['coupon_code'] ?? '');
    if (empty($code)) {
        echo json_encode(['success' => false, 'error' => 'Please enter a coupon code.']);
        exit;
    }
    $res = applyCoupon($code);
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
    exit;
} elseif ($action === 'remove') {
    $res = removeCoupon();
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => false, 'error' => 'Invalid action.']);
exit;
