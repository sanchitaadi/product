<?php
if (!defined('RESTAURANT_NAME')) {
    require_once __DIR__ . '/../../shared/config/db.php';
}
$active_concept_id = 'a';
$active_concept_name = 'Concept A — Coquette Pinterest';
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
    <title><?php echo isset($page_title) ? htmlspecialchars($page_title) . ' | ' . RESTAURANT_NAME . ' (Coquette Edition)' : RESTAURANT_NAME . ' — ' . RESTAURANT_TAGLINE; ?></title>
    <meta name="description" content="Peachy Plate — Dreamy aesthetic dining, handcrafted pink sauce pastas, artisan desserts and cute moods in New Delhi.">
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎀</text></svg>">
    <!-- Concept Styles -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

<!-- Presentation Concept Switcher -->
<?php include __DIR__ . '/../../shared/includes/concept-nav-banner.php'; ?>

<!-- Coquette Preloader -->
<div id="coquettePreloader">
    <svg class="preloader-bow" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 42c-5-8-18-18-32-12-14 6-16 22-5 30 11 8 33-8 37-14 4 6 26 22 37 14 11-8 9-24-5-30-14-6-27 4-32 12zm-3 8c-6 10-16 26-27 34-4 3-8 0-6-5 6-15 16-29 23-38 3 3 7 6 10 9zm6 0c7 9 17 23 23 38 2 5-2 8-6 5-11-8-21-24-27-34 3-3 7-6 10-9z"/>
        <circle cx="50" cy="50" r="7"/>
    </svg>
    <p class="preloader-text">whipping up cute moods...</p>
</div>

<!-- Header & Nav -->
<header class="coq-header" id="coqHeader">
    <div class="coq-container">
        <nav class="coq-nav-shell">
            <a href="index.php" class="coq-logo" title="Peachy Plate — Good Food. Cute Moods.">
                <svg class="bow-svg" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 42c-5-8-18-18-32-12-14 6-16 22-5 30 11 8 33-8 37-14 4 6 26 22 37 14 11-8 9-24-5-30-14-6-27 4-32 12zm-3 8c-6 10-16 26-27 34-4 3-8 0-6-5 6-15 16-29 23-38 3 3 7 6 10 9zm6 0c7 9 17 23 23 38 2 5-2 8-6 5-11-8-21-24-27-34 3-3 7-6 10-9z"/>
                    <circle cx="50" cy="50" r="7"/>
                </svg>
                <span>Peachy <em>Plate</em></span>
            </a>

            <!-- Primary Navigation according to specification -->
            <ul class="coq-nav-menu">
                <li><a href="index.php" class="<?php echo $current_page === 'index' ? 'active' : ''; ?>">Home</a></li>
                <li><a href="menu.php" class="<?php echo in_array($current_page, ['menu', 'cart', 'checkout']) ? 'active' : ''; ?>">Menu</a></li>
                <li><a href="about.php" class="<?php echo $current_page === 'about' ? 'active' : ''; ?>">Our Story</a></li>
                <li><a href="gallery.php" class="<?php echo $current_page === 'gallery' ? 'active' : ''; ?>">Gallery</a></li>
                <li><a href="reservation.php" class="<?php echo $current_page === 'reservation' ? 'active' : ''; ?>">Reservations</a></li>
                <li><a href="contact.php" class="<?php echo $current_page === 'contact' ? 'active' : ''; ?>">Contact</a></li>
            </ul>

            <div class="coq-nav-actions">
                <!-- Wishlist Icon -->
                <a href="wishlist.php" class="coq-icon-btn <?php echo $current_page === 'wishlist' ? 'active' : ''; ?>" title="Saved Favorites">
                    <i class="fa-regular fa-heart"></i>
                    <span class="peachy-wishlist-count coq-badge-counter" style="<?php echo $wishlist_count > 0 ? 'display:inline-flex;' : 'display:none;'; ?>">
                        <?php echo $wishlist_count; ?>
                    </span>
                </a>

                <!-- Cart Button with Drawer Trigger -->
                <button type="button" class="coq-icon-btn" onclick="openCartDrawer()" title="View Cart Feast">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <span class="peachy-cart-count coq-badge-counter" style="<?php echo $cart_details['item_count'] > 0 ? 'display:inline-flex;' : 'display:none;'; ?>">
                        <?php echo $cart_details['item_count']; ?>
                    </span>
                </button>

                <!-- Customer Account -->
                <?php if ($current_customer): ?>
                    <a href="account.php" class="coq-btn-account <?php echo $current_page === 'account' ? 'active' : ''; ?>" title="My Account">
                        <i class="fa-solid fa-user" style="color: var(--coq-rose);"></i>
                        <span class="coq-account-name"><?php echo htmlspecialchars(explode(' ', $current_customer['full_name'])[0]); ?></span>
                    </a>
                <?php else: ?>
                    <a href="account.php" class="coq-btn-account" title="Sign In">
                        <i class="fa-regular fa-user" style="color: var(--coq-rose);"></i>
                        <span class="coq-account-name">Sign In</span>
                    </a>
                <?php endif; ?>

                <!-- Reservation Button -->
                <a href="reservation.php" class="coq-btn-primary">
                    <span>Reserve</span>
                    <i class="fa-solid fa-sparkles"></i>
                </a>
                
                <!-- Mobile Hamburger Toggle -->
                <button type="button" class="coq-mobile-toggle" id="coqMobileToggle" onclick="openMobileDrawer()" aria-label="Toggle Navigation">
                    <i class="fa-solid fa-bars-staggered"></i>
                </button>
            </div>
        </nav>
    </div>
</header>

<!-- Mobile Drawer -->
<div class="coq-mobile-overlay" id="coqMobileOverlay" onclick="closeMobileDrawer()"></div>
<aside class="coq-mobile-drawer" id="coqMobileDrawer" aria-label="Mobile Navigation">
    <div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--coq-border); padding-bottom: 14px;">
            <a href="index.php" class="coq-logo">
                <svg class="bow-svg" viewBox="0 0 100 100" fill="currentColor" style="width: 22px; height: 22px;">
                    <path d="M50 42c-5-8-18-18-32-12-14 6-16 22-5 30 11 8 33-8 37-14 4 6 26 22 37 14 11-8 9-24-5-30-14-6-27 4-32 12zm-3 8c-6 10-16 26-27 34-4 3-8 0-6-5 6-15 16-29 23-38 3 3 7 6 10 9zm6 0c7 9 17 23 23 38 2 5-2 8-6 5-11-8-21-24-27-34 3-3 7-6 10-9z"/>
                    <circle cx="50" cy="50" r="7"/>
                </svg>
                <span>Peachy <em>Plate</em></span>
            </a>
            <button type="button" class="coq-drawer-close" id="coqDrawerClose" onclick="closeMobileDrawer()" aria-label="Close menu">&times;</button>
        </div>
        <p style="font-size: 12px; color: var(--coq-text-muted); margin: 10px 0 16px;">GOOD FOOD. CUTE MOODS.</p>
        <ul class="coq-drawer-links">
            <li><a href="index.php" class="<?php echo $current_page === 'index' ? 'active' : ''; ?>">🎀 Home</a></li>
            <li><a href="menu.php" class="<?php echo $current_page === 'menu' ? 'active' : ''; ?>">🌸 Food Menu &amp; Ordering</a></li>
            <li><a href="about.php" class="<?php echo $current_page === 'about' ? 'active' : ''; ?>">✨ Our Story &amp; Ambience</a></li>
            <li><a href="gallery.php" class="<?php echo $current_page === 'gallery' ? 'active' : ''; ?>">📸 Pinterest Gallery</a></li>
            <li><a href="reservation.php" class="<?php echo $current_page === 'reservation' ? 'active' : ''; ?>">💌 Table Reservations</a></li>
            <li><a href="order-tracking.php" class="<?php echo $current_page === 'order-tracking' ? 'active' : ''; ?>">📦 Track Live Order</a></li>
            <li><a href="wishlist.php" class="<?php echo $current_page === 'wishlist' ? 'active' : ''; ?>">💖 Saved Favorites</a></li>
            <li><a href="reviews.php" class="<?php echo $current_page === 'reviews' ? 'active' : ''; ?>">💌 Community Reviews</a></li>
            <li><a href="account.php" class="<?php echo $current_page === 'account' ? 'active' : ''; ?>">👤 My Account &amp; Orders</a></li>
            <li><a href="contact.php" class="<?php echo $current_page === 'contact' ? 'active' : ''; ?>">📍 Contact &amp; Hours</a></li>
        </ul>
    </div>
    <div style="margin-top: 24px; padding-top: 18px; border-top: 1px dashed var(--coq-border);">
        <button type="button" class="coq-btn-primary" onclick="closeMobileDrawer(); openCartDrawer();" style="width: 100%; margin-bottom: 10px;">
            <i class="fa-solid fa-bag-shopping"></i> View Cart Drawer
        </button>
        <a href="reservation.php" class="coq-btn-secondary" style="width: 100%; justify-content: center;">
            <i class="fa-solid fa-sparkles"></i> Book a Table
        </a>
    </div>
</aside>
