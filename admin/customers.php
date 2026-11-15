<?php
$page_title = 'Customer Accounts & Patron List';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$search = trim($_GET['search'] ?? '');

$sql = "
    SELECT c.*, 
           COUNT(DISTINCT o.id) as order_count, 
           COALESCE(SUM(o.final_total), 0) as total_spend,
           COUNT(DISTINCT a.id) as address_count
    FROM customers c
    LEFT JOIN orders o ON o.customer_id = c.id
    LEFT JOIN customer_addresses a ON a.customer_id = c.id
    WHERE 1=1
";
$params = [];

if ($search !== '') {
    $sql .= " AND (c.full_name LIKE :s OR c.email LIKE :s2 OR c.phone LIKE :s3)";
    $term = '%' . $search . '%';
    $params[':s'] = $term;
    $params[':s2'] = $term;
    $params[':s3'] = $term;
}

$sql .= " GROUP BY c.id ORDER BY c.id DESC";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$customers = $stmt->fetchAll();
?>

<!-- Search & Overview -->
<div class="adm-card" style="margin-bottom: 24px;">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
            <h3 style="font-size: 16px; margin: 0 0 4px;">Registered Patrons (<?php echo count($customers); ?>)</h3>
            <p style="margin: 0; font-size: 13px; color: var(--adm-text-muted);">Customers who created accounts from Concept A, B, or C.</p>
        </div>

        <form method="GET" action="customers.php" style="display: flex; gap: 8px;">
            <input type="text" name="search" placeholder="Search name, email, phone..." value="<?php echo htmlspecialchars($search); ?>" 
                   style="padding: 7px 12px; border: 1px solid var(--adm-border); border-radius: 6px; font-size: 13px; outline: none;">
            <button type="submit" class="adm-btn adm-btn-primary adm-btn-sm">
                <i class="fa-solid fa-magnifying-glass"></i> Search
            </button>
            <?php if ($search): ?>
                <a href="customers.php" class="adm-btn adm-btn-outline adm-btn-sm">Clear</a>
            <?php endif; ?>
        </form>
    </div>
</div>

<!-- Table -->
<div class="adm-card">
    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Patron Name</th>
                    <th>Email Address</th>
                    <th>Phone</th>
                    <th>Total Orders</th>
                    <th>Total Spend</th>
                    <th>Saved Spots</th>
                    <th>Member Since</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($customers)): ?>
                    <tr>
                        <td colspan="9" style="text-align: center; color: var(--adm-text-muted); padding: 40px;">
                            No registered customers found. Register from any concept's account page!
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($customers as $cust): ?>
                        <tr>
                            <td>#<?php echo $cust['id']; ?></td>
                            <td><strong><?php echo htmlspecialchars($cust['full_name']); ?></strong></td>
                            <td><a href="mailto:<?php echo htmlspecialchars($cust['email']); ?>" style="color: var(--adm-primary);"><?php echo htmlspecialchars($cust['email']); ?></a></td>
                            <td><?php echo htmlspecialchars($cust['phone']); ?></td>
                            <td>
                                <span class="adm-badge adm-badge-info">
                                    <?php echo (int)$cust['order_count']; ?> Orders
                                </span>
                            </td>
                            <td><strong><?php echo formatPrice($cust['total_spend']); ?></strong></td>
                            <td><?php echo (int)$cust['address_count']; ?> Locations</td>
                            <td style="font-size: 12px; color: var(--adm-text-muted);">
                                <?php echo date('M j, Y', strtotime($cust['created_at'])); ?>
                            </td>
                            <td>
                                <a href="orders.php?search=<?php echo urlencode($cust['email']); ?>" class="adm-btn adm-btn-outline adm-btn-sm" title="View customer orders">
                                    <i class="fa-solid fa-bag-shopping"></i> Orders
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
