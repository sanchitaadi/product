<!-- ========================================================
     PEACHY PLATE — UNIVERSAL SLIDE-OUT CART DRAWER
     Compatible with Concept A, Concept B, and Concept C
     ======================================================== -->
<div id="peachyCartOverlay" class="cart-drawer-overlay" onclick="closeCartDrawer()" aria-hidden="true"></div>

<aside id="peachyCartDrawer" class="cart-drawer-aside" role="dialog" aria-labelledby="cartDrawerTitle" aria-modal="true">
    <div class="cart-drawer-header">
        <div class="cart-drawer-title-wrap">
            <span class="cart-drawer-icon">🛍️</span>
            <h3 id="cartDrawerTitle" class="cart-drawer-title">Your Feast</h3>
            <span id="cartDrawerCountBadge" class="cart-drawer-badge">0 items</span>
        </div>
        <button type="button" class="cart-drawer-close" onclick="closeCartDrawer()" aria-label="Close cart">&times;</button>
    </div>

    <!-- Free Delivery Progress Tracker -->
    <div class="cart-delivery-bar-wrap">
        <div id="cartDeliveryMsg" class="cart-delivery-msg">Add ₹599 for Free Delivery!</div>
        <div class="cart-progress-track">
            <div id="cartDeliveryProgress" class="cart-progress-fill" style="width: 0%;"></div>
        </div>
    </div>

    <!-- Cart Items Scrollable List -->
    <div id="cartDrawerItemsList" class="cart-drawer-items-wrap">
        <!-- Rendered reactively via JS -->
    </div>

    <!-- Cart Drawer Footer -->
    <div class="cart-drawer-footer">
        <div class="cart-drawer-subtotal-row">
            <span>Subtotal</span>
            <span id="cartDrawerSubtotal" class="cart-price-highlight">₹0</span>
        </div>
        <p class="cart-drawer-tax-note">Taxes &amp; delivery calculated during checkout</p>
        
        <div class="cart-drawer-buttons">
            <a href="cart.php" class="cart-btn-view">View Full Cart</a>
            <a href="checkout.php" class="cart-btn-checkout">Proceed to Checkout &rarr;</a>
        </div>
    </div>
</aside>

<style>
/* Universal Slide-Out Drawer Styles */
.cart-drawer-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 999998;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.cart-drawer-overlay.active {
    display: block;
    opacity: 1;
}

.cart-drawer-aside {
    position: fixed;
    top: 0;
    right: -100%;
    width: 92%;
    max-width: 440px;
    height: 100vh;
    background: var(--coq-bg, var(--gen-bg, var(--lux-bg, #ffffff)));
    color: var(--coq-text, var(--gen-ink, var(--lux-espresso, #18181b)));
    z-index: 999999;
    box-shadow: -10px 0 50px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.cart-drawer-aside.open {
    right: 0;
}

.cart-drawer-header {
    padding: 22px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.cart-drawer-title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
}
.cart-drawer-title {
    font-size: 20px;
    font-weight: 800;
    margin: 0;
}
.cart-drawer-badge {
    background: rgba(0, 0, 0, 0.06);
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
}
.cart-drawer-close {
    background: none;
    border: none;
    font-size: 28px;
    color: inherit;
    cursor: pointer;
    line-height: 1;
    opacity: 0.6;
    transition: opacity 0.2s;
}
.cart-drawer-close:hover { opacity: 1; }

.cart-delivery-bar-wrap {
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    font-size: 12px;
}
.cart-delivery-msg {
    font-weight: 600;
    margin-bottom: 6px;
}
.cart-progress-track {
    width: 100%;
    height: 6px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 999px;
    overflow: hidden;
}
.cart-progress-fill {
    height: 100%;
    background: #10B981;
    border-radius: 999px;
    transition: width 0.4s ease;
}

.cart-drawer-items-wrap {
    flex: 1;
    overflow-y: auto;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.cart-item-row {
    display: flex;
    gap: 14px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 14px;
    padding: 12px;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
.cart-item-thumb {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
}
.cart-item-info {
    flex: 1;
    min-width: 0;
}
.cart-item-name {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
}
.cart-item-customizations {
    font-size: 11.5px;
    color: #64748b;
    line-height: 1.35;
    margin-bottom: 6px;
}
.cart-item-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.cart-qty-spinner {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 2px 6px;
}
.cart-qty-btn {
    background: none;
    border: none;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
}
.cart-qty-num {
    font-size: 13px;
    font-weight: 700;
    min-width: 16px;
    text-align: center;
}
.cart-item-price {
    font-size: 14px;
    font-weight: 800;
}
.cart-item-delete {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    font-size: 12px;
    padding: 4px;
    opacity: 0.7;
}
.cart-item-delete:hover { opacity: 1; }

.cart-empty-state {
    text-align: center;
    padding: 60px 20px;
    margin: auto 0;
}
.cart-empty-icon {
    font-size: 52px;
    margin-bottom: 12px;
    display: block;
}
.cart-empty-title {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 6px;
}
.cart-empty-text {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 24px;
}

.cart-drawer-footer {
    padding: 22px 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(0, 0, 0, 0.02);
}
.cart-drawer-subtotal-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
}
.cart-price-highlight {
    font-size: 22px;
    font-weight: 800;
}
.cart-drawer-tax-note {
    font-size: 11px;
    color: #64748b;
    margin-bottom: 16px;
}
.cart-drawer-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.cart-btn-checkout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #0f172a;
    color: #ffffff;
    padding: 14px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.15s;
}
.cart-btn-checkout:hover {
    opacity: 0.92;
    transform: translateY(-1px);
}
.cart-btn-view {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: inherit;
    padding: 10px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 13px;
    text-decoration: none;
}
.cart-btn-view:hover { background: rgba(0, 0, 0, 0.03); }
</style>
