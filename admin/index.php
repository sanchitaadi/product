<?php
$page_title = 'Executive Dashboard & Analytics';
require_once __DIR__ . '/includes/header.php';

$stats = getDashboardStats();
$db = getDbConnection();

// Fetch latest 6 orders
$recent_orders = $db->query("SELECT * FROM orders ORDER BY id DESC LIMIT 6")->fetchAll();

// Fetch latest 6 reservations
$recent_reservations = $db->query("SELECT * FROM reservations ORDER BY id DESC LIMIT 6")->fetchAll();
?>

<!-- Metric Stats Cards -->
<div class="adm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
    <!-- Revenue -->
    <div class="adm-stat-card">
        <div>
            <div class="adm-stat-label">Total Revenue</div>
            <div class="adm-stat-number" style="color: #059669;"><?php echo formatPrice($stats['total_revenue']); ?></div>
        </div>
        <div class="adm-stat-icon icon-success">
            <i class="fa-solid fa-indian-rupee-sign"></i>
        </div>
    </div>

    <!-- Total Orders -->
    <div class="adm-stat-card">
        <div>
            <div class="adm-stat-label">Total Orders</div>
            <div class="adm-stat-number"><?php echo (int)$stats['total_orders']; ?></div>
        </div>
        <div class="adm-stat-icon icon-primary">
            <i class="fa-solid fa-bag-shopping"></i>
        </div>
    </div>

    <!-- Pending Orders -->
    <div class="adm-stat-card">
        <div>
            <div class="adm-stat-label">Pending Orders</div>
            <div class="adm-stat-number" style="color: #ef4444;"><?php echo (int)$stats['pending_orders']; ?></div>
        </div>
        <div class="adm-stat-icon icon-danger">
            <i class="fa-solid fa-bell-concierge"></i>
        </div>
    </div>

    <!-- Table Reservations -->
    <div class="adm-stat-card">
        <div>
            <div class="adm-stat-label">Bookings</div>
            <div class="adm-stat-number"><?php echo (int)$stats['total_reservations']; ?></div>
        </div>
        <div class="adm-stat-icon icon-warning">
            <i class="fa-solid fa-calendar-check"></i>
        </div>
    </div>

    <!-- Registered Customers -->
    <div class="adm-stat-card">
        <div>
            <div class="adm-stat-label">Patron Accounts</div>
            <div class="adm-stat-number"><?php echo (int)$stats['total_customers']; ?></div>
        </div>
        <div class="adm-stat-icon icon-info">
            <i class="fa-solid fa-users"></i>
        </div>
    </div>
</div>

<!-- Presentation Banner -->
<div style="background: linear-gradient(135deg, #FFF1F2, #FFE4E6); border: 1px solid #FECDD3; border-radius: var(--adm-radius); padding: 20px 24px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
    <div>
        <h4 style="font-size: 16px; font-weight: 800; color: #9F1239; margin-bottom: 4px;">
            ✨ Client Presentation Mode Active &bull; Unified Backend Live
        </h4>
        <p style="font-size: 13px; color: #BE123C; margin: 0;">
            All three concepts (Coquette Pinterest, Retro Gen-Z, Luxury Cute) are sharing this single MySQL backend and business logic!
        </p>
    </div>
    <div style="display: flex; gap: 10px;">
        <a href="orders.php" class="adm-btn adm-btn-primary">Manage Live Orders</a>
        <a href="settings.php" class="adm-btn adm-btn-outline">Configure Store</a>
    </div>
</div>

<!-- Recent Orders Section -->
<div class="adm-card" style="margin-bottom: 30px;">
    <div class="adm-card-header">
        <h3 class="adm-card-title">Recent Customer Orders</h3>
        <a href="orders.php" class="adm-btn adm-btn-outline adm-btn-sm">View All Orders &rarr;</a>
    </div>
    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Type</th>
                    <th>Concept Source</th>
                    <th>Final Total</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($recent_orders)): ?>
                    <tr>
                        <td colspan="8" style="text-align: center; color: var(--adm-text-muted); padding: 30px;">
                            No online orders received yet. Place a test order from any concept!
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($recent_orders as $ord): ?>
                        <tr>
                            <td><strong style="color: var(--adm-primary); font-family: monospace; font-size: 13px;">#<?php echo htmlspecialchars($ord['order_number']); ?></strong></td>
                            <td><strong><?php echo htmlspecialchars($ord['customer_name']); ?></strong></td>
                            <td style="font-size: 12px; color: var(--adm-text-muted);"><?php echo htmlspecialchars($ord['customer_phone']); ?></td>
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
                                <div style="display: flex; gap: 6px;">
                                    <a href="orders.php?search=<?php echo urlencode($ord['order_number']); ?>" class="adm-btn adm-btn-outline adm-btn-sm" title="View details">
                                        <i class="fa-solid fa-eye"></i>
                                    </a>
                                    <a href="invoice.php?order=<?php echo $ord['id']; ?>" target="_blank" class="adm-btn adm-btn-sm" style="background: #e2e8f0; color: #0f172a;" title="Print invoice">
                                        <i class="fa-solid fa-receipt"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Recent Reservations Section -->
<div class="adm-card">
    <div class="adm-card-header">
        <h3 class="adm-card-title">Recent Table Reservations</h3>
        <a href="reservations.php" class="adm-btn adm-btn-outline adm-btn-sm">View All Bookings &rarr;</a>
    </div>
    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>Ref #</th>
                    <th>Guest Name</th>
                    <th>Date &amp; Time</th>
                    <th>Party</th>
                    <th>Concept Source</th>
                    <th>Area</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($recent_reservations)): ?>
                    <tr>
                        <td colspan="7" style="text-align: center; color: var(--adm-text-muted); padding: 30px;">
                            No reservations recorded yet.
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($recent_reservations as $res): ?>
                        <tr>
                            <td>#<?php echo $res['id']; ?></td>
                            <td><strong><?php echo htmlspecialchars($res['name']); ?></strong></td>
                            <td><?php echo date('M j, Y', strtotime($res['reservation_date'])); ?> @ <?php echo date('g:i A', strtotime($res['reservation_time'])); ?></td>
                            <td><span class="adm-badge adm-badge-secondary"><?php echo (int)$res['guests']; ?> Guests</span></td>
                            <td><span style="font-size: 11.5px;"><?php echo htmlspecialchars($res['concept_source'] ?? 'General'); ?></span></td>
                            <td><?php echo htmlspecialchars($res['seating_area']); ?></td>
                            <td>
                                <span class="adm-badge <?php echo $res['status'] === 'Confirmed' ? 'adm-badge-success' : ($res['status'] === 'Cancelled' ? 'adm-badge-danger' : 'adm-badge-warning'); ?>">
                                    <?php echo htmlspecialchars($res['status']); ?>
                                </span>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
