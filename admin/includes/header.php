<?php
require_once __DIR__ . '/auth.php';
requireAdminAuth();

$admin_page = basename($_SERVER['PHP_SELF'], '.php');

// Fetch pending counts for badge
$db = getDbConnection();
$pending_orders_count = (int)$db->query("SELECT COUNT(*) FROM orders WHERE order_status = 'Pending'")->fetchColumn();
$pending_reservations_count = (int)$db->query("SELECT COUNT(*) FROM reservations WHERE status = 'Pending'")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? htmlspecialchars($page_title) . ' | Peachy Plate Admin' : 'Admin Dashboard | Peachy Plate'; ?></title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎛️</text></svg>">
    <link rel="stylesheet" href="assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

<div class="adm-layout">
    <!-- Sidebar -->
    <aside class="adm-sidebar">
        <div class="adm-sidebar-header">
            <a href="index.php" class="adm-brand">
                <span>🍑</span>
                <span class="title">Peachy Plate</span>
                <span class="badge">PRO</span>
            </a>
        </div>

        <ul class="adm-sidebar-nav">
            <li>
                <a href="index.php" class="adm-nav-link <?php echo $admin_page === 'index' ? 'active' : ''; ?>">
                    <i class="fa-solid fa-chart-pie" style="width: 20px;"></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li style="margin-top: 14px; padding: 0 14px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 700;">
                ORDERING &amp; E-COMMERCE
            </li>
            <li>
                <a href="orders.php" class="adm-nav-link <?php echo $admin_page === 'orders' ? 'active' : ''; ?>" style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-bell-concierge" style="width: 20px; color: #38bdf8;"></i>
                        <span>Order Manager</span>
                    </div>
                    <?php if ($pending_orders_count > 0): ?>
                        <span style="background: #ef4444; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 20px;">
                            <?php echo $pending_orders_count; ?>
                        </span>
                    <?php endif; ?>
                </a>
            </li>
            <li>
                <a href="customers.php" class="adm-nav-link <?php echo $admin_page === 'customers' ? 'active' : ''; ?>">
                    <i class="fa-solid fa-users" style="width: 20px; color: #a78bfa;"></i>
                    <span>Customers</span>
                </a>
            </li>
            <li>
                <a href="coupons.php" class="adm-nav-link <?php echo $admin_page === 'coupons' ? 'active' : ''; ?>">
                    <i class="fa-solid fa-tags" style="width: 20px; color: #f43f5e;"></i>
                    <span>Coupon Codes</span>
                </a>
            </li>

            <li style="margin-top: 14px; padding: 0 14px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 700;">
                RESTAURANT OPS
            </li>
            <li>
                <a href="menu.php" class="adm-nav-link <?php echo $admin_page === 'menu' ? 'active' : ''; ?>">
                    <i class="fa-solid fa-utensils" style="width: 20px; color: #fbbf24;"></i>
                    <span>Food Menu</span>
                </a>
            </li>
            <li>
                <a href="reservations.php" class="adm-nav-link <?php echo $admin_page === 'reservations' ? 'active' : ''; ?>" style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-calendar-check" style="width: 20px; color: #34d399;"></i>
                        <span>Reservations</span>
                    </div>
                    <?php if ($pending_reservations_count > 0): ?>
                        <span style="background: #f59e0b; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 20px;">
                            <?php echo $pending_reservations_count; ?>
                        </span>
                    <?php endif; ?>
                </a>
            </li>
            <li>
                <a href="reviews.php" class="adm-nav-link <?php echo $admin_page === 'reviews' ? 'active' : ''; ?>">
                    <i class="fa-solid fa-star" style="width: 20px; color: #fb7185;"></i>
                    <span>Reviews &amp; Ratings</span>
                </a>
            </li>
            <li>
                <a href="messages.php" class="adm-nav-link <?php echo $admin_page === 'messages' ? 'active' : ''; ?>">
                    <i class="fa-solid fa-envelope" style="width: 20px; color: #94a3b8;"></i>
                    <span>Inquiries</span>
                </a>
            </li>
            <li>
                <a href="settings.php" class="adm-nav-link <?php echo $admin_page === 'settings' ? 'active' : ''; ?>">
                    <i class="fa-solid fa-gear" style="width: 20px; color: #cbd5e1;"></i>
                    <span>System Settings</span>
                </a>
            </li>

            <li style="margin-top: 18px; padding: 0 14px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 700;">
                Live Frontend Concepts
            </li>
            <li>
                <a href="../index.html" class="adm-nav-link" target="_blank">
                    <i class="fa-solid fa-arrow-up-right-from-square" style="width: 20px;"></i>
                    <span>Showcase Portal</span>
                </a>
            </li>
            <li>
                <a href="../concept-a/index.php" class="adm-nav-link" target="_blank">
                    <i class="fa-solid fa-heart" style="width: 20px; color: #fb7185;"></i>
                    <span>Concept A: Coquette</span>
                </a>
            </li>
            <li>
                <a href="../concept-b/index.php" class="adm-nav-link" target="_blank">
                    <i class="fa-solid fa-bolt" style="width: 20px; color: #facc15;"></i>
                    <span>Concept B: Retro</span>
                </a>
            </li>
            <li>
                <a href="../concept-c/index.php" class="adm-nav-link" target="_blank">
                    <i class="fa-solid fa-gem" style="width: 20px; color: #e5a995;"></i>
                    <span>Concept C: Luxury</span>
                </a>
            </li>
        </ul>

        <div class="adm-sidebar-footer">
            <div style="font-size: 12px; color: #94a3b8;">
                <div style="font-weight: 700; color: #ffffff;"><?php echo htmlspecialchars($_SESSION['admin_name'] ?? 'Admin'); ?></div>
                <div>Superadmin &bull; Store Owner</div>
            </div>
            <a href="logout.php" title="Log Out" style="color: #ef4444; font-size: 16px; padding: 6px;">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </a>
        </div>
    </aside>

    <!-- Main Content Shell -->
    <div class="adm-main">
        <header class="adm-topbar">
            <div class="adm-topbar-title">
                <?php echo isset($page_title) ? htmlspecialchars($page_title) : 'Dashboard Overview'; ?>
            </div>
            <div style="display: flex; align-items: center; gap: 14px;">
                <span style="font-size: 12px; color: var(--adm-text-muted);">
                    <i class="fa-regular fa-clock"></i> <?php echo date('D, d M Y &bull; g:i A'); ?>
                </span>
                <a href="../index.html" class="adm-btn adm-btn-outline adm-btn-sm" target="_blank">
                    <i class="fa-solid fa-globe"></i> View Website
                </a>
                <a href="logout.php" class="adm-btn adm-btn-danger adm-btn-sm">
                    <i class="fa-solid fa-power-off"></i> Logout
                </a>
            </div>
        </header>

        <div class="adm-content">
