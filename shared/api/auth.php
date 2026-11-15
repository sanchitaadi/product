<?php
/**
 * Customer Authentication & Profile API Endpoint
 * Handles login, registration, session status, addresses, and order history
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$payload = getRequestPayload();
$action = $payload['action'] ?? 'me';

switch ($action) {
    case 'login':
        $email = trim($payload['email'] ?? '');
        $password = trim($payload['password'] ?? '');
        $res = customerLogin($email, $password);
        if ($res['success']) {
            $customer = getCurrentCustomer();
            $addresses = getCustomerAddresses($customer['id']);
            $orders = getCustomerOrders($customer['id']);
            echo json_encode([
                'success' => true,
                'customer' => $customer,
                'addresses' => $addresses,
                'orders' => $orders
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($res, JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'register':
        $fullName = trim($payload['full_name'] ?? $payload['name'] ?? '');
        $email = trim($payload['email'] ?? '');
        $phone = trim($payload['phone'] ?? '');
        $password = trim($payload['password'] ?? '');

        $res = customerRegister($fullName, $email, $phone, $password);
        if ($res['success']) {
            $customer = getCurrentCustomer();
            echo json_encode([
                'success' => true,
                'customer' => $customer,
                'addresses' => [],
                'orders' => []
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($res, JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'logout':
        customerLogout();
        echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
        break;

    case 'save_address':
        $customer = getCurrentCustomer();
        if (!$customer) {
            echo json_encode(['success' => false, 'error' => 'Not authenticated']);
            exit;
        }
        $address = trim($payload['address_line'] ?? $payload['address'] ?? '');
        $city = trim($payload['city'] ?? 'New Delhi');
        $pincode = trim($payload['pincode'] ?? '');
        $landmark = trim($payload['landmark'] ?? '');

        $res = saveCustomerAddress($customer['id'], $address, $city, $pincode, $landmark);
        if ($res['success']) {
            echo json_encode([
                'success' => true,
                'addresses' => getCustomerAddresses($customer['id'])
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($res, JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'me':
    default:
        $customer = getCurrentCustomer();
        if ($customer) {
            $addresses = getCustomerAddresses($customer['id']);
            $orders = getCustomerOrders($customer['id']);
            echo json_encode([
                'success' => true,
                'authenticated' => true,
                'customer' => $customer,
                'addresses' => $addresses,
                'orders' => $orders
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([
                'success' => true,
                'authenticated' => false,
                'customer' => null,
                'addresses' => [],
                'orders' => []
            ], JSON_UNESCAPED_UNICODE);
        }
        break;
}
exit;
