<!-- Footer Section -->
<footer class="coq-footer">
    <div class="coq-container">
        <div class="coq-footer-grid">
            <div>
                <a href="index.php" class="coq-footer-logo">
                    <svg class="bow-svg" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M50 42c-5-8-18-18-32-12-14 6-16 22-5 30 11 8 33-8 37-14 4 6 26 22 37 14 11-8 9-24-5-30-14-6-27 4-32 12zm-3 8c-6 10-16 26-27 34-4 3-8 0-6-5 6-15 16-29 23-38 3 3 7 6 10 9zm6 0c7 9 17 23 23 38 2 5-2 8-6 5-11-8-21-24-27-34 3-3 7-6 10-9z"/>
                        <circle cx="50" cy="50" r="7"/>
                    </svg>
                    <span>Peachy Plate</span>
                </a>
                <p class="coq-footer-tagline">
                    GOOD FOOD. CUTE MOODS.<br>
                    Handmade pink sauce pastas, dreamy strawberry desserts, artisan coffee &amp; pure aesthetic dining in New Delhi.
                </p>
                <div style="display: flex; gap: 12px; margin-top: 14px;">
                    <a href="https://instagram.com" target="_blank" rel="noopener" style="color: #FBB6CE; font-size: 18px;" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener" style="color: #FBB6CE; font-size: 18px;" title="Pinterest"><i class="fa-brands fa-pinterest"></i></a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" style="color: #FBB6CE; font-size: 18px;" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                </div>
            </div>

            <div>
                <h4 class="coq-footer-title">Explore &amp; Order</h4>
                <ul class="coq-footer-links">
                    <li><a href="menu.php">🌸 Full Food Menu</a></li>
                    <li><a href="cart.php">🛍️ View Feast Cart</a></li>
                    <li><a href="order-tracking.php">📦 Live Order Tracker</a></li>
                    <li><a href="wishlist.php">💖 Saved Wishlist</a></li>
                    <li><a href="account.php">👤 Customer Account</a></li>
                    <li><a href="reviews.php">💌 Patron Love Notes</a></li>
                    <li><a href="reservation.php">💌 Table Reservations</a></li>
                </ul>
            </div>

            <div>
                <h4 class="coq-footer-title">Opening Hours</h4>
                <p style="font-size: 13.5px; color: #E7C4CE; line-height: 1.8;">
                    <strong>Monday – Sunday:</strong><br>
                    <?php echo RESTAURANT_HOURS; ?><br><br>
                    <strong>Kitchen Last Order:</strong><br>
                    10:15 PM Daily<br><br>
                    <strong>Afternoon High Tea:</strong><br>
                    4:00 PM – 6:30 PM
                </p>
            </div>

            <div>
                <h4 class="coq-footer-title">Join The Peach Club</h4>
                <p style="font-size: 13.5px; color: #E7C4CE; line-height: 1.6;">
                    Subscribe for secret dessert drops, weekend tasting invites, and cute gifts.
                </p>
                <form class="coq-newsletter-form" onsubmit="event.preventDefault(); alert('🌸 Thank you for subscribing to Peachy Plate Club!');">
                    <input type="email" class="coq-newsletter-input" placeholder="Your aesthetic email..." required>
                    <button type="submit" class="coq-btn-primary" style="padding: 10px 18px; font-size: 13px;">Join ✦</button>
                </form>
                <p style="font-size: 11px; color: #A88692; margin-top: 8px;">Use code <strong>PEACHY20</strong> at checkout for 20% off!</p>
            </div>
        </div>

        <div class="coq-footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> <?php echo RESTAURANT_NAME; ?>. Concept A &bull; Coquette Pinterest Edition.</p>
            <p>Designed with 💖 &bull; Address: <?php echo RESTAURANT_ADDRESS; ?></p>
        </div>
    </div>
</footer>

<!-- Lightbox Modal for Gallery & Previews -->
<div class="coq-lightbox" id="coqLightbox">
    <div class="coq-lightbox-content">
        <button type="button" class="coq-lightbox-close" id="coqLightboxClose">&times;</button>
        <img src="" alt="Enlarged view" class="coq-lightbox-img" id="coqLightboxImg">
        <div class="coq-lightbox-caption" id="coqLightboxCaption"></div>
    </div>
</div>

<!-- Shared Payment Coming Soon Modal -->
<?php include __DIR__ . '/../../shared/includes/payment-modal.php'; ?>

<!-- Universal Slide-Out Cart Drawer -->
<?php include __DIR__ . '/../../shared/includes/cart-drawer.php'; ?>

<!-- Universal Food Customization Modal -->
<?php include __DIR__ . '/../../shared/includes/customization-modal.php'; ?>

<!-- Universal E-Commerce JS Engine -->
<script src="../shared/assets/js/peachy-cart.js"></script>

<!-- Concept Scripts -->
<script src="assets/js/main.js"></script>
</body>
</html>
