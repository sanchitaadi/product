<?php
/**
 * Unified Cart API Endpoint
 * Handles AJAX Add, Update Quantity, Remove, and Fetch Cart
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$action = $_REQUEST['action'] ?? 'get';
$response = ['success' => false, 'error' => 'Invalid action'];

// Support JSON payload in addition to standard form-data
if (empty($_POST)) {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $jsonData = json_decode($rawInput, true);
        if (is_array($jsonData)) {
            $_POST = $jsonData;
        }
    }
}

switch ($action) {
    case 'get':
        $response = [
            'success' => true,
            'cart' => getCartDetails()
        ];
        break;

    case 'add':
        $itemId = isset($_POST['item_id']) ? (int)$_POST['item_id'] : 0;
        $qty = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 1;
        $customizations = isset($_POST['customizations']) ? (array)$_POST['customizations'] : [];
        $instructions = isset($_POST['special_instructions']) ? trim((string)$_POST['special_instructions']) : (isset($_POST['instructions']) ? trim((string)$_POST['instructions']) : '');

        if ($itemId <= 0) {
            $response = ['success' => false, 'error' => 'Invalid food item.'];
        } else {
            $res = addToCart($itemId, $qty, $customizations, $instructions);
            $response = $res;
        }
        break;

    case 'update_qty':
        $cartKey = trim($_POST['cart_key'] ?? '');
        $qty = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 1;

        if (empty($cartKey)) {
            $response = ['success' => false, 'error' => 'Missing cart key.'];
        } else {
            $res = updateCartQuantity($cartKey, $qty);
            $response = $res;
        }
        break;

    case 'remove':
        $cartKey = trim($_POST['cart_key'] ?? '');
        if (empty($cartKey)) {
            $response = ['success' => false, 'error' => 'Missing cart key.'];
        } else {
            $res = removeFromCart($cartKey);
            $response = $res;
        }
        break;

    case 'clear':
        clearCart();
        $response = ['success' => true, 'cart' => getCartDetails()];
        break;
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
