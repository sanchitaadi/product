<?php
/**
 * Order API Endpoint
 * Handles Order Placement, Tracking, and Retrieval
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$payload = getRequestPayload();
$action = $payload['action'] ?? 'get';

switch ($action) {
    case 'create':
        $result = createOrder($payload);
        if ($result['success']) {
            $order = getOrderByOrderNumber($result['order_number']);
            echo json_encode([
                'success' => true,
                'order_number' => $result['order_number'],
                'order_id' => $result['order_id'],
                'order' => $order
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([
                'success' => false,
                'error' => $result['error'] ?? 'Order processing failed'
            ], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'track':
        $orderNumber = trim($payload['order_number'] ?? '');
        $phone = trim($payload['phone'] ?? '');

        if (empty($orderNumber)) {
            echo json_encode(['success' => false, 'error' => 'Please provide an Order Number.']);
            exit;
        }

        $order = getOrderByTracking($orderNumber, $phone);
        if (!$order) {
            echo json_encode(['success' => false, 'error' => 'No matching active order found. Please check order number and phone.']);
            exit;
        }

        echo json_encode([
            'success' => true,
            'order' => $order
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'get':
    default:
        $orderNumber = trim($payload['order_number'] ?? '');
        if (empty($orderNumber)) {
            echo json_encode(['success' => false, 'error' => 'Order number required.']);
            exit;
        }

        $order = getOrderByOrderNumber($orderNumber);
        if (!$order) {
            echo json_encode(['success' => false, 'error' => 'Order not found.']);
            exit;
        }

        echo json_encode([
            'success' => true,
            'order' => $order
        ], JSON_UNESCAPED_UNICODE);
        break;
}
exit;
