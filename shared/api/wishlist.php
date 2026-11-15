<?php
/**
 * Wishlist API Endpoint
 * Handles toggling favorites and fetching count
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$action = $_REQUEST['action'] ?? 'toggle';

if (empty($_POST)) {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $jsonData = json_decode($rawInput, true);
        if (is_array($jsonData)) {
            $_POST = $jsonData;
        }
    }
}

if ($action === 'toggle') {
    $itemId = isset($_POST['item_id']) ? (int)$_POST['item_id'] : 0;
    if ($itemId <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid food item.']);
        exit;
    }
    $res = toggleWishlist($itemId);
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
    exit;
} elseif ($action === 'count') {
    echo json_encode(['success' => true, 'count' => getWishlistCount()]);
    exit;
}

echo json_encode(['success' => false, 'error' => 'Invalid action.']);
exit;
