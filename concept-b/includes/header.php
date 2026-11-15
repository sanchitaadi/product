<?php
if (!defined('RESTAURANT_NAME')) {
    require_once __DIR__ . '/../../shared/config/db.php';
}
$active_concept_id = 'b';
$active_concept_name = 'Concept B — Retro Gen-Z';
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
    <title><?php echo isset($page_title) ? htmlspecialchars($page_title) . ' | ' . RESTAURANT_NAME . ' (Retro Gen-Z)' : RESTAURANT_NAME . ' — GOOD FOOD. CUTE MOODS.'; ?></title>
    <meta name="description" content="Peachy Plate Retro Gen-Z Edition — Bold bites, epic pink sauce pasta, iconic shakes, and neon diner energy in New Delhi.">
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>">
    <!-- Concept B Styles -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

<!-- Presentation Concept Switcher -->
<?php include __DIR__ . '/../../shared/includes/concept-nav-banner.php'; ?>

<!-- Retro Header -->
<header class="gen-header">
    <div class="gen-container">
        <nav class="gen-nav-shell">
            <a href="index.php" class="gen-logo" title="Peachy Plate — Good Food. Cute Moods.">
                <span class="gen-logo-badge">⚡</span>
                <span>PEACHY <span class="red">PLATE</span></span>
            </a>

            <!-- Retro Navigation according to specification -->
            <ul class="gen-nav-menu">
                <li><a href="index.php" class="<?php echo $current_page === 'index' ? 'active' : ''; ?>">HOME</a></li>
                <li><a href="menu.php" class="<?php echo in_array($current_page, ['menu', 'cart', 'checkout']) ? 'active' : ''; ?>">MENU</a></li>
                <li><a href="menu.php?cat=Pizza+and+Pasta" class="<?php echo $current_page === 'menu' && isset($_GET['cat']) ? 'active' : ''; ?>">DROPS</a></li>
                <li><a href="about.php" class="<?php echo $current_page === 'about' ? 'active' : ''; ?>">THE VIBE</a></li>
                <li><a href="gallery.php" class="<?php echo $current_page === 'gallery' ? 'active' : ''; ?>">FEED</a></li>
                <li><a href="reservation.php" class="<?php echo $current_page === 'reservation' ? 'active' : ''; ?>">RESERVATIONS</a></li>
                <li><a href="contact.php" class="<?php echo $current_page === 'contact' ? 'active' : ''; ?>">CONTACT</a></li>
            </ul>

            <div style="display: flex; align-items: center; gap: 10px;">
                <!-- Wishlist Icon -->
                <a href="wishlist.php" class="gen-icon-btn <?php echo $current_page === 'wishlist' ? 'active' : ''; ?>" title="Saved Drops" style="text-decoration: none;">
                    <i class="fa-regular fa-heart"></i>
                    <span class="peachy-wishlist-count gen-badge-counter" style="<?php echo $wishlist_count > 0 ? 'display:inline-flex;' : 'display:none;'; ?>">
                        <?php echo $wishlist_count; ?>
                    </span>
                </a>

                <!-- Cart Button with Drawer Trigger -->
                <button type="button" class="gen-icon-btn" onclick="openCartDrawer()" title="View Stash">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <span class="peachy-cart-count gen-badge-counter" style="<?php echo $cart_details['item_count'] > 0 ? 'display:inline-flex;' : 'display:none;'; ?>">
                        <?php echo $cart_details['item_count']; ?>
                    </span>
                </button>

                <!-- Customer Account -->
                <?php if ($current_customer): ?>
                    <a href="account.php" class="gen-btn-yellow" style="padding: 8px 14px; font-size: 12px; text-decoration: none;" title="My Account">
                        <i class="fa-solid fa-user"></i>
                        <span><?php echo htmlspecialchars(explode(' ', $current_customer['full_name'])[0]); ?></span>
                    </a>
                <?php else: ?>
                    <a href="account.php" class="gen-btn-yellow" style="padding: 8px 14px; font-size: 12px; text-decoration: none;" title="Sign In">
                        <i class="fa-solid fa-user"></i>
                        <span>VIP</span>
                    </a>
                <?php endif; ?>

                <!-- Prominent Order Now Button -->
                <a href="menu.php" class="gen-btn-primary" title="Order Delicious Food">
                    <span>ORDER NOW</span>
                    <i class="fa-solid fa-bolt"></i>
                </a>

                <button type="button" class="gen-mobile-toggle" id="genMobileToggle" onclick="openMobileDrawer()" aria-label="Toggle Menu">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </nav>
    </div>
</header>

<!-- Mobile Drawer -->
<div class="gen-mobile-overlay" id="genMobileOverlay" onclick="closeMobileDrawer()"></div>
<aside class="gen-mobile-drawer" id="genMobileDrawer" aria-label="Mobile Navigation">
    <div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid var(--gen-ink); padding-bottom: 16px;">
            <span class="gen-logo" style="font-size: 20px;">⚡ PEACHY <span class="red">PLATE</span></span>
            <button type="button" id="genDrawerClose" onclick="closeMobileDrawer()" aria-label="Close menu" style="background: var(--gen-red); color: #fff; border: 2px solid var(--gen-ink); border-radius: 6px; width: 34px; height: 34px; font-weight: 900; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
        </div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
            <li><a href="index.php" class="<?php echo $current_page === 'index' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">⚡ HOME</a></li>
            <li><a href="menu.php" class="<?php echo $current_page === 'menu' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">🍕 MENU &amp; DROPS</a></li>
            <li><a href="about.php" class="<?php echo $current_page === 'about' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">🛹 THE VIBE</a></li>
            <li><a href="gallery.php" class="<?php echo $current_page === 'gallery' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">📸 PHOTO FEED</a></li>
            <li><a href="reservation.php" class="<?php echo $current_page === 'reservation' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">🎟️ RESERVATIONS</a></li>
            <li><a href="order-tracking.php" class="<?php echo $current_page === 'order-tracking' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">📦 LIVE TRACKER</a></li>
            <li><a href="wishlist.php" class="<?php echo $current_page === 'wishlist' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">💖 SAVED DROPS</a></li>
            <li><a href="account.php" class="<?php echo $current_page === 'account' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">👤 VIP ACCOUNT</a></li>
            <li><a href="reviews.php" class="<?php echo $current_page === 'reviews' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">🔥 VIBE REVIEWS</a></li>
            <li><a href="contact.php" class="<?php echo $current_page === 'contact' ? 'active' : ''; ?>" style="display: block; font-family: var(--gen-font-display); font-size: 17px; font-weight: 800; padding: 6px 0; color: var(--gen-ink);">📍 CONTACT SPOT</a></li>
        </ul>
    </div>
    <div style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed var(--gen-ink);">
        <a href="menu.php" class="gen-btn-primary" style="width: 100%; justify-content: center; margin-bottom: 10px;">ORDER NOW ⚡</a>
        <button type="button" onclick="closeMobileDrawer(); openCartDrawer();" class="gen-btn-yellow" style="width: 100%; justify-content: center; margin-bottom: 10px;">
            VIEW CART STASH (<span class="peachy-cart-count"><?php echo $cart_details['item_count']; ?></span>)
        </button>
    </div>
</aside>
