<?php
/**
 * Customization Options API Endpoint
 * Returns customizable options and price deltas for a food item
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$itemId = isset($_GET['item_id']) ? (int)$_GET['item_id'] : 0;
$item = getMenuItemById($itemId);

if (!$item) {
    echo json_encode(['success' => false, 'error' => 'Item not found.']);
    exit;
}

$groups = getItemCustomizations($itemId, $item['category']);

echo json_encode([
    'success' => true,
    'item' => [
        'id' => $item['id'],
        'name' => $item['name'],
        'description' => $item['description'],
        'price' => (float)$item['price'],
        'price_formatted' => formatPrice($item['price']),
        'category' => $item['category'],
        'is_veg' => (bool)$item['is_veg'],
        'image_url' => getFoodImageUrl($item['image_url'])
    ],
    'groups' => $groups
], JSON_UNESCAPED_UNICODE);
exit;
