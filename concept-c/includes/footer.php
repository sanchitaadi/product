<!-- Luxury Footer -->
<footer class="lux-footer">
    <div class="lux-container">
        <div class="lux-footer-grid">
            <div>
                <div class="lux-logo" style="color: #ffffff; margin-bottom: 20px;">
                    <span class="lux-logo-brand" style="font-size: 24px;">PEACHY PLATE</span>
                    <span class="lux-logo-tagline" style="color: var(--lux-peach);">ATELIER &bull; NEW DELHI</span>
                </div>
                <p style="font-size: 13.5px; color: #a4968c; line-height: 1.8; margin-bottom: 24px;">
                    GOOD FOOD. CUTE MOODS.<br>
                    An elevated boutique dining salon dedicated to artisanal Italian comfort, seasonal produce, and refined pastry craft in New Delhi.
                </p>
                <div style="display: flex; gap: 18px; font-size: 15px; color: var(--lux-peach);">
                    <a href="https://instagram.com" target="_blank" rel="noopener" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="mailto:hello@peachyplate.example" title="Email Concierge"><i class="fa-regular fa-envelope"></i></a>
                </div>
            </div>

            <div>
                <h4 class="lux-footer-title">Curation &amp; Service</h4>
                <ul class="lux-footer-links">
                    <li><a href="menu.php">Seasonal Menu &amp; Delivery</a></li>
                    <li><a href="cart.php">Order Hamper</a></li>
                    <li><a href="order-tracking.php">Atelier Order Tracker</a></li>
                    <li><a href="wishlist.php">Saved Collection</a></li>
                    <li><a href="account.php">Patron Account</a></li>
                    <li><a href="reviews.php">Patron Accolades</a></li>
                    <li><a href="reservation.php">Table Reservations</a></li>
                </ul>
            </div>

            <div>
                <h4 class="lux-footer-title">Service Hours</h4>
                <p style="font-size: 13px; color: #a4968c; line-height: 1.9;">
                    <strong style="color: #ffffff; font-weight: 500;">Every Day:</strong><br>
                    <?php echo RESTAURANT_HOURS; ?><br><br>
                    <strong style="color: #ffffff; font-weight: 500;">Last Kitchen Order:</strong><br>
                    10:15 PM Daily
                </p>
            </div>

            <div>
                <h4 class="lux-footer-title">The Gazette</h4>
                <p style="font-size: 13px; color: #a4968c; line-height: 1.6; margin-bottom: 16px;">
                    Receive private dining invitations, seasonal truffle menus, and exclusive chef tastings.
                </p>
                <form onsubmit="event.preventDefault(); alert('You are subscribed to the Peachy Plate Gazette.');" style="display: flex; gap: 6px;">
                    <input type="email" placeholder="Your email address..." required style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 4px; padding: 10px 14px; font-size: 12px; color: #fff; outline: none; font-family: inherit;">
                    <button type="submit" class="lux-btn-primary" style="padding: 10px 16px; font-size: 10px; background: var(--lux-peach-dark); border-color: var(--lux-peach-dark);">SUBSCRIBE</button>
                </form>
                <p style="font-size: 11px; color: #a4968c; margin-top: 8px;">Use code <strong>PEACHY20</strong> at checkout for 20% off.</p>
            </div>
        </div>

        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px; display: flex; align-items: center; justify-content: space-between; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #7d6f65; flex-wrap: wrap; gap: 12px;">
            <p>&copy; <?php echo date('Y'); ?> <?php echo RESTAURANT_NAME; ?>. Concept C — Luxury Cute.</p>
            <p><?php echo RESTAURANT_ADDRESS; ?></p>
        </div>
    </div>
</footer>

<!-- Lightbox Modal -->
<div class="lux-lightbox" id="luxLightbox">
    <div class="lux-lightbox-card">
        <button type="button" class="lux-lightbox-close" id="luxLightboxClose">&times;</button>
        <img src="" alt="Enlarged Collection Plate" id="luxLightboxImg" style="width: 100%; max-height: 540px; object-fit: cover;">
        <div style="padding: 18px 24px; text-align: center; border-top: 1px solid var(--lux-border);">
            <h4 id="luxLightboxCaption" style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500;"></h4>
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
