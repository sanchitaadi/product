<?php
if (!defined('RESTAURANT_NAME')) {
    require_once __DIR__ . '/../../shared/config/db.php';
}
$active_concept_id = 'c';
$active_concept_name = 'Concept C — Luxury Cute';
$current_page = basename($_SERVER['PHP_SELF'], '.php');
$cart_details = getCartDetails();
$wishlist_count = getWishlistCount();
$current_customer = getCurrentCustomer();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? htmlspecialchars($page_title) . ' | ' . RESTAURANT_NAME . ' (Luxury Atelier)' : RESTAURANT_NAME . ' — High Dining & Cute Moods'; ?></title>
    <meta name="description" content="Peachy Plate Luxury Edition — High-concept continental dining, artisanal pink sauce rigatoni, and delicate patisserie in New Delhi.">
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍸</text></svg>">
    <!-- Concept C Styles -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

<!-- Presentation Concept Switcher -->
<?php include __DIR__ . '/../../shared/includes/concept-nav-banner.php'; ?>

<!-- Luxury Header -->
<header class="lux-header">
    <div class="lux-container">
        <nav class="lux-nav-shell">
            <a href="index.php" class="lux-logo" title="Peachy Plate — Good Food. Cute Moods.">
                <span class="lux-logo-brand">PEACHY PLATE</span>
                <span class="lux-logo-tagline">ATELIER &bull; NEW DELHI</span>
            </a>

            <!-- Luxury Minimalist Navigation -->
            <ul class="lux-nav-menu">
                <li><a href="index.php" class="<?php echo $current_page === 'index' ? 'active' : ''; ?>">Overview</a></li>
                <li><a href="menu.php" class="<?php echo in_array($current_page, ['menu', 'cart', 'checkout']) ? 'active' : ''; ?>">Carte du Jour</a></li>
                <li><a href="about.php" class="<?php echo $current_page === 'about' ? 'active' : ''; ?>">The Maison</a></li>
                <li><a href="gallery.php" class="<?php echo $current_page === 'gallery' ? 'active' : ''; ?>">Collection</a></li>
                <li><a href="reservation.php" class="<?php echo $current_page === 'reservation' ? 'active' : ''; ?>">Reservations</a></li>
                <li><a href="contact.php" class="<?php echo $current_page === 'contact' ? 'active' : ''; ?>">Concierge</a></li>
            </ul>

            <div style="display: flex; align-items: center; gap: 12px;">
                <!-- Wishlist Icon -->
                <a href="wishlist.php" class="lux-icon-btn <?php echo $current_page === 'wishlist' ? 'active' : ''; ?>" title="Saved Collection">
                    <i class="fa-regular fa-heart"></i>
                    <span class="peachy-wishlist-count lux-badge-counter" style="<?php echo $wishlist_count > 0 ? 'display:inline-flex;' : 'display:none;'; ?>">
                        <?php echo $wishlist_count; ?>
                    </span>
                </a>

                <!-- Cart Button with Drawer Trigger -->
                <button type="button" class="lux-icon-btn" onclick="openCartDrawer()" title="View Order Hamper">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <span class="peachy-cart-count lux-badge-counter" style="<?php echo $cart_details['item_count'] > 0 ? 'display:inline-flex;' : 'display:none;'; ?>">
                        <?php echo $cart_details['item_count']; ?>
                    </span>
                </button>

                <!-- Customer Account -->
                <?php if ($current_customer): ?>
                    <a href="account.php" class="lux-btn-secondary" style="padding: 7px 16px; font-size: 11px;" title="Patron Account">
                        <i class="fa-regular fa-user" style="color: var(--lux-gold);"></i>
                        <span><?php echo htmlspecialchars(explode(' ', $current_customer['full_name'])[0]); ?></span>
                    </a>
                <?php else: ?>
                    <a href="account.php" class="lux-btn-secondary" style="padding: 7px 16px; font-size: 11px;" title="Patron Sign In">
                        <span>Sign In</span>
                    </a>
                <?php endif; ?>

                <a href="reservation.php" class="lux-btn-primary" title="Reserve Dining Salon">
                    <span>Reserve Salon</span>
                </a>

                <button type="button" class="lux-mobile-toggle" id="luxMobileToggle" onclick="openMobileDrawer()" aria-label="Toggle Navigation">
                    <i class="fa-solid fa-bars-staggered"></i>
                </button>
            </div>
        </nav>
    </div>
</header>

<!-- Mobile Navigation Drawer -->
<div class="lux-mobile-overlay" id="luxMobileOverlay" onclick="closeMobileDrawer()"></div>
<aside class="lux-mobile-drawer" id="luxMobileDrawer" aria-label="Mobile Navigation">
    <div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--lux-border); padding-bottom: 18px;">
            <div class="lux-logo">
                <span class="lux-logo-brand" style="font-size: 20px;">PEACHY PLATE</span>
                <span class="lux-logo-tagline">NEW DELHI</span>
            </div>
            <button type="button" id="luxDrawerClose" onclick="closeMobileDrawer()" aria-label="Close menu" style="background: none; border: none; font-size: 26px; color: var(--lux-espresso); cursor: pointer; padding: 4px;">&times;</button>
        </div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; margin-top: 22px;">
            <li><a href="index.php" class="<?php echo $current_page === 'index' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Overview</a></li>
            <li><a href="menu.php" class="<?php echo $current_page === 'menu' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Carte du Jour &amp; Ordering</a></li>
            <li><a href="about.php" class="<?php echo $current_page === 'about' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">The Maison &amp; Philosophy</a></li>
            <li><a href="gallery.php" class="<?php echo $current_page === 'gallery' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Visual Collection</a></li>
            <li><a href="reservation.php" class="<?php echo $current_page === 'reservation' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Table Reservations</a></li>
            <li><a href="order-tracking.php" class="<?php echo $current_page === 'order-tracking' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Track Atelier Order</a></li>
            <li><a href="wishlist.php" class="<?php echo $current_page === 'wishlist' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Saved Collection</a></li>
            <li><a href="account.php" class="<?php echo $current_page === 'account' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Patron Sanctuary</a></li>
            <li><a href="reviews.php" class="<?php echo $current_page === 'reviews' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Patron Accolades</a></li>
            <li><a href="contact.php" class="<?php echo $current_page === 'contact' ? 'active' : ''; ?>" style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Concierge &amp; Visit</a></li>
        </ul>
    </div>
    <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--lux-border);">
        <button type="button" onclick="closeMobileDrawer(); openCartDrawer();" class="lux-btn-secondary" style="width: 100%; justify-content: center; margin-bottom: 10px;">
            VIEW ORDER HAMPER (<span class="peachy-cart-count"><?php echo $cart_details['item_count']; ?></span>)
        </button>
        <a href="reservation.php" class="lux-btn-primary" style="width: 100%; justify-content: center;">RESERVE SALON</a>
    </div>
</aside>
