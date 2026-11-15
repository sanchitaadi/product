<?php
/**
 * Menu API Endpoint
 * Returns menu categories and items with filtering, search, and sorting
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$db = getDbConnection();

// Fetch categories
$catStmt = $db->query("SELECT id, name, slug, description FROM categories WHERE is_active = 1 ORDER BY display_order ASC");
$categories = $catStmt->fetchAll(PDO::FETCH_ASSOC);

// Filters
$category = isset($_GET['category']) && $_GET['category'] !== 'all' ? trim($_GET['category']) : null;
$search = isset($_GET['search']) ? trim($_GET['search']) : null;
$sort = isset($_GET['sort']) ? trim($_GET['sort']) : null;
$diet = isset($_GET['diet']) ? trim($_GET['diet']) : null; // 'veg', 'non-veg'
$bestsellerOnly = isset($_GET['bestseller']) && $_GET['bestseller'] === '1';
$itemId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($itemId > 0) {
    $item = getMenuItemById($itemId);
    if (!$item) {
        echo json_encode(['success' => false, 'error' => 'Item not found']);
        exit;
    }
    echo json_encode(['success' => true, 'item' => $item], JSON_UNESCAPED_UNICODE);
    exit;
}

$items = getMenuItems($category, $search, $sort);

// Apply secondary diet / bestseller filter if requested
if ($diet === 'veg') {
    $items = array_values(array_filter($items, fn($it) => (int)$it['is_veg'] === 1));
} elseif ($diet === 'non-veg') {
    $items = array_values(array_filter($items, fn($it) => (int)$it['is_veg'] === 0));
}

if ($bestsellerOnly) {
    $items = array_values(array_filter($items, fn($it) => (int)$it['is_bestseller'] === 1));
}

echo json_encode([
    'success' => true,
    'categories' => $categories,
    'items' => $items,
    'total' => count($items)
], JSON_UNESCAPED_UNICODE);
exit;
