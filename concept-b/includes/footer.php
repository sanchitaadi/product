<!-- Retro Gen-Z Footer -->
<footer class="gen-footer">
    <div class="gen-container">
        <div class="gen-footer-grid">
            <div>
                <a href="index.php" class="gen-logo" style="color: #ffffff; margin-bottom: 16px;">
                    <span class="gen-logo-badge">⚡</span>
                    <span>PEACHY <span class="red">PLATE</span></span>
                </a>
                <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    GOOD FOOD. CUTE MOODS.<br>
                    The energetic modern diner serving fire pink sauce pastas, sourdough crusts, and aesthetic confections in New Delhi.
                </p>
                <div style="display: flex; gap: 10px;">
                    <a href="https://instagram.com" target="_blank" rel="noopener" class="gen-sticker sticker-red" style="text-decoration: none;">Instagram</a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener" class="gen-sticker sticker-yellow" style="text-decoration: none;">TikTok</a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" class="gen-sticker sticker-orange" style="text-decoration: none;">WhatsApp</a>
                </div>
            </div>

            <div>
                <h4 class="gen-footer-title">Order &amp; Drops</h4>
                <ul class="gen-footer-links">
                    <li><a href="menu.php">🍕 Full Menu Drops</a></li>
                    <li><a href="cart.php">🛍️ View Stash Cart</a></li>
                    <li><a href="order-tracking.php">📦 Live Delivery Tracker</a></li>
                    <li><a href="wishlist.php">💖 Saved Food Drops</a></li>
                    <li><a href="account.php">👤 VIP Account &amp; Past Orders</a></li>
                    <li><a href="reviews.php">🔥 Community Vibe Checks</a></li>
                    <li><a href="reservation.php">🎟️ Reserve Table Spot</a></li>
                </ul>
            </div>

            <div>
                <h4 class="gen-footer-title">Operating Times</h4>
                <p style="color: #d4d4d8; font-size: 14px; line-height: 1.8;">
                    <strong>Open 7 Days a Week:</strong><br>
                    <?php echo RESTAURANT_HOURS; ?><br><br>
                    <strong>Kitchen Fire:</strong><br>
                    Closes 10:30 PM Sharp<br><br>
                    <strong>Late Shake Hours:</strong><br>
                    Until 11:00 PM
                </p>
            </div>

            <div>
                <h4 class="gen-footer-title">Join The Drop List</h4>
                <p style="color: #a1a1aa; font-size: 13.5px; line-height: 1.5; margin-bottom: 14px;">
                    Be first to taste monthly secret dessert drops and invite-only diner nights.
                </p>
                <form onsubmit="event.preventDefault(); alert('⚡ You are on the VIP Peachy Drop List!');" style="display: flex; gap: 8px;">
                    <input type="email" placeholder="enter your email..." required style="flex: 1; background: #27272a; border: 2px solid #52525b; border-radius: 8px; padding: 10px 14px; color: #fff; font-family: inherit; font-size: 13px; outline: none;">
                    <button type="submit" class="gen-btn-yellow" style="padding: 10px 16px; font-size: 13px; border-radius: 8px;">JOIN</button>
                </form>
                <p style="font-size: 11px; color: #71717a; margin-top: 8px;">Use code <strong>PEACHY20</strong> at checkout for 20% off!</p>
            </div>
        </div>

        <div style="border-top: 2px solid #27272a; padding-top: 20px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #71717a; flex-wrap: wrap; gap: 10px;">
            <p>&copy; <?php echo date('Y'); ?> <?php echo RESTAURANT_NAME; ?>. Concept B - Retro Gen-Z Edition.</p>
            <p>Address: <?php echo RESTAURANT_ADDRESS; ?></p>
        </div>
    </div>
</footer>

<!-- Lightbox Modal -->
<div class="gen-lightbox" id="genLightbox">
    <div class="gen-lightbox-card">
        <button type="button" class="gen-lightbox-close" id="genLightboxClose">&times;</button>
        <img src="" alt="Enlarged Drop" id="genLightboxImg" style="width: 100%; max-height: 520px; object-fit: cover;">
        <div style="padding: 16px 20px; background: #ffffff; border-top: 2px solid var(--gen-ink);">
            <h4 id="genLightboxCaption" style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase;"></h4>
        </div>
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

<!-- Script -->
<script src="assets/js/main.js"></script>
</body>
</html>
