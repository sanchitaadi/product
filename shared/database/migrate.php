<?php
/**
 * Database Migration & Seeder Helper
 * Peachy Plate Restaurant E-Commerce System
 */

$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = getenv('DB_PORT') ?: '3306';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'aadi';
$dbname = getenv('DB_NAME') ?: 'peachy_plate';

echo "=== Peachy Plate E-Commerce Database Migration ===\n";

$passwords_to_try = [$pass, '', 'root', 'admin'];
$pdo = null;

foreach ($passwords_to_try as $test_pass) {
    try {
        $pdo = new PDO("mysql:host={$host};port={$port};charset=utf8mb4", $user, $test_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        echo "Connected to MySQL successfully with password: " . ($test_pass === '' ? '(empty)' : '***') . "\n";
        break;
    } catch (PDOException $e) {
        // continue trying
    }
}

if (!$pdo) {
    die("Error: Could not connect to MySQL with any standard credentials.\n");
}

$sqlFile = __DIR__ . '/../../database/database.sql';
if (!file_exists($sqlFile)) {
    die("Error: SQL file not found at {$sqlFile}\n");
}

$sql = file_get_contents($sqlFile);

try {
    $pdo->exec($sql);
    echo "Database & tables created and seeded successfully!\n";

    $pdo->exec("USE `{$dbname}`");
    $menuCount = $pdo->query("SELECT COUNT(*) FROM menu_items")->fetchColumn();
    $custCount = $pdo->query("SELECT COUNT(*) FROM customers")->fetchColumn();
    $orderCount = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $couponCount = $pdo->query("SELECT COUNT(*) FROM coupons")->fetchColumn();
    $revCount = $pdo->query("SELECT COUNT(*) FROM reviews")->fetchColumn();

    echo "Stats:\n";
    echo "- Menu items: {$menuCount}\n";
    echo "- Registered patrons: {$custCount}\n";
    echo "- Active orders: {$orderCount}\n";
    echo "- Active coupons: {$couponCount}\n";
    echo "- Verified reviews: {$revCount}\n";
    echo "Ready for presentation!\n";
} catch (PDOException $e) {
    echo "SQL Execution error: " . $e->getMessage() . "\n";
}
