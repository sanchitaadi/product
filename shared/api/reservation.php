<?php
/**
 * Reservation API Endpoint
 * Handles Table Bookings and Customer Inquiries
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$payload = getRequestPayload();
$action = $payload['action'] ?? 'create';

switch ($action) {
    case 'create':
        $res = saveReservation($payload);
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
        break;

    case 'list':
        $customer = getCurrentCustomer();
        if (!$customer) {
            echo json_encode(['success' => false, 'error' => 'Authentication required']);
            exit;
        }
        $db = getDbConnection();
        $stmt = $db->prepare("SELECT * FROM reservations WHERE email = :email OR phone = :phone ORDER BY reservation_date DESC, reservation_time DESC LIMIT 20");
        $stmt->execute([':email' => $customer['email'], ':phone' => $customer['phone']]);
        echo json_encode(['success' => true, 'reservations' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
        break;
}
exit;
