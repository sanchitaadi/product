<?php
/**
 * Settings & Config API Endpoint
 * Exposes store configuration, brand constants, delivery thresholds, and CSRF token
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$db = getDbConnection();
$stmt = $db->query("SELECT setting_key, setting_value FROM settings");
$allSettings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

echo json_encode([
    'success' => true,
    'settings' => [
        'restaurant_name' => $allSettings['restaurant_name'] ?? 'Peachy Plate',
        'restaurant_tagline' => $allSettings['restaurant_tagline'] ?? 'GOOD FOOD. CUTE MOODS.',
        'restaurant_address' => $allSettings['restaurant_address'] ?? '24, Garden Avenue, New Delhi, India',
        'restaurant_phone' => $allSettings['restaurant_phone'] ?? '+91 98765 43210 (dummy)',
        'restaurant_phone_raw' => '+919876543210',
        'restaurant_email' => $allSettings['restaurant_email'] ?? 'hello@peachyplate.example',
        'restaurant_hours' => $allSettings['restaurant_hours'] ?? '11:00 AM – 11:00 PM',
        'currency_symbol' => $allSettings['currency_symbol'] ?? '₹',
        'delivery_charge' => (float)($allSettings['delivery_charge'] ?? 50.00),
        'free_delivery_threshold' => (float)($allSettings['free_delivery_threshold'] ?? 599.00),
        'min_order_amount' => (float)($allSettings['min_order_amount'] ?? 199.00),
        'orders_enabled' => (bool)($allSettings['orders_enabled'] ?? 1),
        'cod_enabled' => (bool)($allSettings['cod_enabled'] ?? 1),
        'pay_at_pickup_enabled' => (bool)($allSettings['pay_at_pickup_enabled'] ?? 1),
        'online_payment_enabled' => (bool)($allSettings['online_payment_enabled'] ?? 0),
    ],
    'csrf_token' => getCsrfToken()
], JSON_UNESCAPED_UNICODE);
exit;
