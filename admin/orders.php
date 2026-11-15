<?php
$page_title = 'Order Management & Kitchen Dispatch';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$msg = '';

// Handle Status Change
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_status') {
    $order_id = (int)($_POST['order_id'] ?? 0);
    if ($order_id <= 0 && !empty($_POST['order_number'])) {
        $onStmt = $db->prepare("SELECT id FROM orders WHERE order_number = :on LIMIT 1");
        $onStmt->execute([':on' => trim($_POST['order_number'])]);
        $order_id = (int)$onStmt->fetchColumn();
    }
    $new_status = $_POST['new_status'] ?? $_POST['order_status'] ?? '';
    $allowed_statuses = ['Pending', 'Accepted', 'Preparing', 'Ready', 'Out for delivery', 'Delivered', 'Cancelled'];

    if ($order_id > 0 && in_array($new_status, $allowed_statuses)) {
        $stmt = $db->prepare("UPDATE orders SET order_status = :st WHERE id = :id");
        $stmt->execute([':st' => $new_status, ':id' => $order_id]);

        // If marked delivered, update payment status if COD/pickup
        if ($new_status === 'Delivered') {
            $db->prepare("UPDATE payments SET payment_status = 'paid' WHERE order_id = :id AND payment_status = 'unpaid'")->execute([':id' => $order_id]);
        }

        $msg = 'Order #' . $order_id . ' status updated to "' . htmlspecialchars($new_status) . '".';
    }
}

// Filters & Search
$status_filter = $_GET['status'] ?? 'all';
$search = trim($_GET['search'] ?? '');

$sql = "SELECT * FROM orders WHERE 1=1";
$params = [];

if ($status_filter && $status_filter !== 'all') {
    $sql .= " AND order_status = :st";
    $params[':st'] = $status_filter;
}

if ($search !== '') {
    $sql .= " AND (order_number LIKE :s OR customer_name LIKE :s2 OR customer_phone LIKE :s3 OR customer_email LIKE :s4)";
    $term = '%' . $search . '%';
    $params[':s'] = $term;
    $params[':s2'] = $term;
    $params[':s3'] = $term;
    $params[':s4'] = $term;
}

$sql .= " ORDER BY id DESC";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$orders = $stmt->fetchAll();

// Count for each status tab
$status_counts = [];
$countStmt = $db->query("SELECT order_status, COUNT(*) as c FROM orders GROUP BY order_status");
while ($row = $countStmt->fetch()) {
    $status_counts[$row['order_status']] = (int)$row['c'];
}
$total_all_orders = array_sum($status_counts);
?>

<?php if (!empty($msg)): ?>
    <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--adm-radius); padding: 14px 20px; margin-bottom: 24px; color: #065F46; font-size: 13.5px; display: flex; align-items: center; gap: 10px;">
        <i class="fa-solid fa-circle-check"></i>
        <span><?php echo $msg; ?></span>
    </div>
<?php endif; ?>

<!-- Filter & Search Controls -->
<div class="adm-card" style="margin-bottom: 24px;">
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
        
        <!-- Status Tabs -->
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            <a href="orders.php?status=all<?php echo $search ? '&search=' . urlencode($search) : ''; ?>" 
               class="adm-btn adm-btn-sm <?php echo $status_filter === 'all' ? 'adm-btn-primary' : 'adm-btn-outline'; ?>">
                All (<?php echo $total_all_orders; ?>)
            </a>
            <?php 
            $filterList = ['Pending', 'Accepted', 'Preparing', 'Ready', 'Out for delivery', 'Delivered', 'Cancelled'];
            foreach ($filterList as $fSt):
                $c = $status_counts[$fSt] ?? 0;
            ?>
                <a href="orders.php?status=<?php echo urlencode($fSt); ?><?php echo $search ? '&search=' . urlencode($search) : ''; ?>" 
                   class="adm-btn adm-btn-sm <?php echo $status_filter === $fSt ? 'adm-btn-primary' : 'adm-btn-outline'; ?>">
                    <?php echo $fSt; ?> (<?php echo $c; ?>)
                </a>
            <?php endforeach; ?>
        </div>

        <!-- Search Form -->
        <form method="GET" action="orders.php" style="display: flex; gap: 8px;">
            <?php if ($status_filter !== 'all'): ?>
                <input type="hidden" name="status" value="<?php echo htmlspecialchars($status_filter); ?>">
            <?php endif; ?>
            <input type="text" name="search" placeholder="Order #, name, or phone..." value="<?php echo htmlspecialchars($search); ?>" 
                   style="padding: 7px 12px; border: 1px solid var(--adm-border); border-radius: 6px; font-size: 13px; outline: none;">
            <button type="submit" class="adm-btn adm-btn-primary adm-btn-sm">
                <i class="fa-solid fa-magnifying-glass"></i> Search
            </button>
            <?php if ($search): ?>
                <a href="orders.php?status=<?php echo urlencode($status_filter); ?>" class="adm-btn adm-btn-outline adm-btn-sm">Clear</a>
            <?php endif; ?>
        </form>

    </div>
</div>

<!-- Orders Table -->
<div class="adm-card">
    <div class="adm-card-header">
        <h3 class="adm-card-title">Orders List (<?php echo count($orders); ?>)</h3>
    </div>
    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>Order #</th>
                    <th>Date &amp; Time</th>
                    <th>Customer</th>
                    <th>Dining Type</th>
                    <th>Concept Source</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Update Status</th>
                    <th>Invoice / Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($orders)): ?>
                    <tr>
                        <td colspan="9" style="text-align: center; color: var(--adm-text-muted); padding: 40px;">
                            No orders found matching this criteria.
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($orders as $ord): 
                        // Fetch items for expandable view
                        $itemStmt = $db->prepare("SELECT * FROM order_items WHERE order_id = :oid");
                        $itemStmt->execute([':oid' => $ord['id']]);
                        $order_items = $itemStmt->fetchAll();
                    ?>
                        <tr>
                            <td>
                                <strong style="color: var(--adm-primary); font-family: monospace; font-size: 13px;">
                                    #<?php echo htmlspecialchars($ord['order_number']); ?>
                                </strong>
                            </td>
                            <td style="font-size: 12px; color: var(--adm-text-muted);">
                                <?php echo date('M j, Y &bull; g:i A', strtotime($ord['created_at'])); ?>
                            </td>
                            <td>
                                <strong><?php echo htmlspecialchars($ord['customer_name']); ?></strong><br>
                                <span style="font-size: 12px; color: var(--adm-text-muted);"><?php echo htmlspecialchars($ord['customer_phone']); ?></span>
                            </td>
                            <td>
                                <span class="adm-badge adm-badge-info" style="text-transform: uppercase;">
                                    <?php echo htmlspecialchars($ord['order_type']); ?>
                                </span>
                            </td>
                            <td>
                                <span style="font-size: 11.5px; font-weight: 600; color: #475569;">
                                    <?php echo htmlspecialchars($ord['concept_source'] ?? 'Direct'); ?>
                                </span>
                            </td>
                            <td><strong><?php echo formatPrice($ord['final_total']); ?></strong></td>
                            <td>
                                <?php
                                $statusClasses = [
                                    'Pending' => 'adm-badge-warning',
                                    'Accepted' => 'adm-badge-info',
                                    'Preparing' => 'adm-badge-info',
                                    'Ready' => 'adm-badge-success',
                                    'Out for delivery' => 'adm-badge-info',
                                    'Delivered' => 'adm-badge-success',
                                    'Cancelled' => 'adm-badge-danger',
                                ];
                                $badgeClass = $statusClasses[$ord['order_status']] ?? 'adm-badge-secondary';
                                ?>
                                <span class="adm-badge <?php echo $badgeClass; ?>">
                                    <?php echo htmlspecialchars($ord['order_status']); ?>
                                </span>
                            </td>
                            <td>
                                <form method="POST" action="orders.php" style="display: flex; gap: 4px;">
                                    <input type="hidden" name="action" value="update_status">
                                    <input type="hidden" name="order_id" value="<?php echo $ord['id']; ?>">
                                    <select name="new_status" style="padding: 4px 8px; border: 1px solid var(--adm-border); border-radius: 4px; font-size: 12px; outline: none;">
                                        <?php foreach ($filterList as $optSt): ?>
                                            <option value="<?php echo $optSt; ?>" <?php echo $ord['order_status'] === $optSt ? 'selected' : ''; ?>>
                                                <?php echo $optSt; ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <button type="submit" class="adm-btn adm-btn-sm" style="background: #0f172a; color: #fff; padding: 4px 8px;">
                                        Save
                                    </button>
                                </form>
                            </td>
                            <td>
                                <div style="display: flex; gap: 6px;">
                                    <button type="button" class="adm-btn adm-btn-outline adm-btn-sm" onclick="toggleDetailsRow(<?php echo $ord['id']; ?>)" title="View items breakdown">
                                        <i class="fa-solid fa-list-ul"></i> Details
                                    </button>
                                    <a href="invoice.php?order=<?php echo $ord['id']; ?>" target="_blank" class="adm-btn adm-btn-sm" style="background: #e2e8f0; color: #0f172a;" title="Print official invoice">
                                        <i class="fa-solid fa-print"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>

                        <!-- Expandable Details Row -->
                        <tr id="detailsRow_<?php echo $ord['id']; ?>" style="display: none; background: #f8fafc;">
                            <td colspan="9" style="padding: 18px 24px;">
                                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
                                    <div>
                                        <h4 style="font-size: 13.5px; margin: 0 0 10px; color: #0f172a;">Ordered Items:</h4>
                                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                                            <?php foreach ($order_items as $oi): ?>
                                                <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #f1f5f9; font-size: 13px;">
                                                    <div>
                                                        <strong><?php echo htmlspecialchars($oi['item_name']); ?></strong> &times; <?php echo $oi['quantity']; ?>
                                                        <?php if (!empty($oi['customizations_summary'])): ?>
                                                            <div style="font-size: 11px; color: #e11d48;">✦ <?php echo htmlspecialchars($oi['customizations_summary']); ?></div>
                                                        <?php endif; ?>
                                                    </div>
                                                    <span style="font-weight: 600;"><?php echo formatPrice($oi['total_price']); ?></span>
                                                </div>
                                            <?php endforeach; ?>
                                        </div>

                                        <?php if (!empty($ord['special_instructions'])): ?>
                                            <div style="margin-top: 10px; font-size: 12px; color: #64748b; background: #fef3c7; padding: 8px 12px; border-radius: 4px;">
                                                <strong>Kitchen Note:</strong> <?php echo htmlspecialchars($ord['special_instructions']); ?>
                                            </div>
                                        <?php endif; ?>
                                    </div>

                                    <div style="font-size: 12.5px; line-height: 1.6; color: #475569;">
                                        <h4 style="font-size: 13.5px; margin: 0 0 10px; color: #0f172a;">Fulfillment &amp; Customer:</h4>
                                        <strong>Name:</strong> <?php echo htmlspecialchars($ord['customer_name']); ?><br>
                                        <strong>Email:</strong> <?php echo htmlspecialchars($ord['customer_email']); ?><br>
                                        <strong>Phone:</strong> <?php echo htmlspecialchars($ord['customer_phone']); ?><br>
                                        <strong>Type:</strong> <?php echo ucfirst($ord['order_type']); ?><br>
                                        <?php if ($ord['order_type'] === 'delivery'): ?>
                                            <strong>Address:</strong> <?php echo htmlspecialchars($ord['delivery_address']); ?>, <?php echo htmlspecialchars($ord['city']); ?> &ndash; <?php echo htmlspecialchars($ord['pincode']); ?><br>
                                            <?php if ($ord['landmark']): ?><strong>Landmark:</strong> <?php echo htmlspecialchars($ord['landmark']); ?><br><?php endif; ?>
                                        <?php endif; ?>
                                        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
                                            <strong>Subtotal:</strong> <?php echo formatPrice($ord['subtotal']); ?> &bull; 
                                            <strong>Delivery:</strong> <?php echo formatPrice($ord['delivery_fee']); ?> &bull; 
                                            <strong>Discount:</strong> <?php echo formatPrice($ord['discount_amount']); ?>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<script>
function toggleDetailsRow(id) {
    const r = document.getElementById('detailsRow_' + id);
    if (r) {
        r.style.display = (r.style.display === 'none') ? 'table-row' : 'none';
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
