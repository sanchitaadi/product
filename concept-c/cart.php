<?php
$page_title = 'Your Culinary Hamper & Order Review';
require_once __DIR__ . '/includes/header.php';

$cart = getCartDetails();
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Curated Selection &bull; Atelier Hamper</span>
        <h1 class="lux-section-title">Your Culinary <em>Hamper</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Review your selections before finalizing your private dining delivery or salon collection.
        </p>
    </div>
</div>

<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <?php if (empty($cart['items'])): ?>
            <!-- Empty Hamper State -->
            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 70px 24px; text-align: center; max-width: 620px; margin: 0 auto; box-shadow: var(--lux-shadow);">
                <span style="font-size: 38px;">🍸</span>
                <h2 style="font-family: var(--lux-font-serif); font-size: 26px; font-weight: 500; margin: 14px 0 10px; color: var(--lux-espresso);">Your Hamper is Empty</h2>
                <p style="color: var(--lux-muted); font-size: 14.5px; line-height: 1.8; max-width: 440px; margin: 0 auto 28px;">
                    You have not yet selected any culinary preparations. Discover our artisanal handmade pasta, seasonal plates, and delicate patisserie.
                </p>
                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <a href="menu.php" class="lux-btn-primary">Explore Carte du Jour</a>
                    <a href="wishlist.php" class="lux-btn-secondary">Saved Collection</a>
                </div>
            </div>

        <?php else: ?>

            <!-- Free Delivery Progress -->
            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 20px 26px; margin-bottom: 36px; box-shadow: var(--lux-shadow);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 13px;">
                    <span>
                        <?php if ($cart['subtotal'] >= $cart['free_delivery_threshold']): ?>
                            ✦ <strong style="color: #059669;">Complimentary Concierge Delivery Unlocked</strong> Across New Delhi
                        <?php else: 
                            $diff = $cart['free_delivery_threshold'] - $cart['subtotal'];
                        ?>
                            Add <strong style="color: var(--lux-espresso);">₹<?php echo number_format($diff, 0); ?></strong> more to receive <strong style="color: #059669;">Complimentary Delivery</strong>
                        <?php endif; ?>
                    </span>
                    <span style="font-size: 12px; color: var(--lux-muted); text-transform: uppercase; letter-spacing: 0.1em;">
                        Threshold: <?php echo formatPrice($cart['free_delivery_threshold']); ?>
                    </span>
                </div>
                <div style="width: 100%; height: 6px; background: #EFE9E2; border-radius: 10px; overflow: hidden;">
                    <?php 
                        $pct = min(100, round(($cart['subtotal'] / $cart['free_delivery_threshold']) * 100));
                        $barBg = ($cart['subtotal'] >= $cart['free_delivery_threshold']) ? '#059669' : 'var(--lux-espresso)';
                    ?>
                    <div style="width: <?php echo $pct; ?>%; height: 100%; background: <?php echo $barBg; ?>; transition: width 0.4s ease;"></div>
                </div>
            </div>

            <!-- Hamper Content Grid -->
            <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 40px; align-items: start;">
                
                <!-- Items Table -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 30px; box-shadow: var(--lux-shadow);">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--lux-border); padding-bottom: 16px; margin-bottom: 22px;">
                        <h2 style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 500; color: var(--lux-espresso); margin: 0;">
                            Hamper Selections (<span class="peachy-cart-count"><?php echo $cart['item_count']; ?></span>)
                        </h2>
                        <button type="button" onclick="clearFullCart()" style="background: none; border: none; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted); cursor: pointer; text-decoration: underline;">
                            Clear All
                        </button>
                    </div>

                    <?php foreach ($cart['items'] as $item): ?>
                        <div style="display: flex; gap: 20px; align-items: center; padding: 18px 0; border-bottom: 1px solid rgba(44, 30, 26, 0.08);">
                            <img src="<?php echo htmlspecialchars($item['image_url']); ?>" alt="<?php echo htmlspecialchars($item['name']); ?>" 
                                 style="width: 82px; height: 82px; border-radius: 4px; object-fit: cover; border: 1px solid var(--lux-border); flex-shrink: 0;"
                                 loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                            
                            <div style="flex: 1; min-width: 0;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h3 style="font-family: var(--lux-font-serif); font-size: 18px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 3px;">
                                            <?php echo htmlspecialchars($item['name']); ?>
                                        </h3>
                                        <span style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted);">
                                            <?php echo htmlspecialchars($item['category']); ?>
                                        </span>
                                    </div>
                                    <button type="button" onclick="removeCartItem('<?php echo $item['cart_key']; ?>')" 
                                            style="background: none; border: none; font-size: 18px; color: #94a3b8; cursor: pointer;" title="Remove">
                                        &times;
                                    </button>
                                </div>

                                <?php if (!empty($item['customizations'])): ?>
                                    <div style="margin-top: 6px; font-size: 12px; color: var(--lux-gold);">
                                        ✦ <?php 
                                            $cTexts = [];
                                            foreach ($item['customizations'] as $c) {
                                                $cTexts[] = htmlspecialchars($c['option']) . ($c['price_delta'] > 0 ? ' (+₹' . (int)$c['price_delta'] . ')' : '');
                                            }
                                            echo implode(', ', $cTexts);
                                        ?>
                                    </div>
                                <?php endif; ?>

                                <?php if (!empty($item['special_instructions'])): ?>
                                    <div style="font-size: 11.5px; color: #78716c; font-style: italic; margin-top: 4px;">
                                        Chef Note: <?php echo htmlspecialchars($item['special_instructions']); ?>
                                    </div>
                                <?php endif; ?>

                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px;">
                                    <div class="cart-qty-spinner" style="margin: 0;">
                                        <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('<?php echo $item['cart_key']; ?>', <?php echo $item['quantity'] - 1; ?>)">&minus;</button>
                                        <span class="cart-qty-num"><?php echo $item['quantity']; ?></span>
                                        <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('<?php echo $item['cart_key']; ?>', <?php echo $item['quantity'] + 1; ?>)">&plus;</button>
                                    </div>

                                    <div style="text-align: right;">
                                        <span style="font-size: 11.5px; color: var(--lux-muted); display: block;">
                                            <?php echo formatPrice($item['unit_price']); ?> each
                                        </span>
                                        <strong style="font-family: var(--lux-font-serif); font-size: 17px; color: var(--lux-espresso); font-weight: 600;">
                                            <?php echo $item['line_total_formatted']; ?>
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>

                    <div style="margin-top: 24px;">
                        <a href="menu.php" style="color: var(--lux-espresso); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; text-decoration: none;">
                            &larr; Return to Carte du Jour
                        </a>
                    </div>
                </div>

                <!-- Summary Sidebar -->
                <div>
                    <!-- Coupon Card -->
                    <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 22px; box-shadow: var(--lux-shadow); margin-bottom: 24px;">
                        <h3 style="font-family: var(--lux-font-serif); font-size: 16px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 12px;">
                            Privilege Code
                        </h3>

                        <?php if (!empty($cart['coupon'])): ?>
                            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 4px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong style="color: #166534; font-size: 13px;"><?php echo htmlspecialchars($cart['coupon']['code']); ?></strong>
                                    <p style="margin: 2px 0 0; font-size: 11px; color: #15803d;">Privilege reduction applied: <?php echo $cart['discount_formatted']; ?></p>
                                </div>
                                <button type="button" onclick="removeAppliedCoupon()" style="background: none; border: none; color: #dc2626; font-size: 11px; cursor: pointer; text-decoration: underline;">
                                    Remove
                                </button>
                            </div>
                        <?php else: ?>
                            <form id="couponApplyForm" onsubmit="handleApplyCoupon(event)" style="display: flex; gap: 8px;">
                                <input type="text" id="couponCodeInput" placeholder="Privilege Code (e.g. PEACHY20)" uppercase 
                                       style="flex: 1; padding: 10px 14px; border: 1px solid var(--lux-border); border-radius: 4px; font-family: inherit; font-size: 12px; text-transform: uppercase; outline: none;">
                                <button type="submit" class="lux-btn-primary" style="padding: 10px 16px; font-size: 10px;">Apply</button>
                            </form>
                            <p style="font-size: 11px; color: var(--lux-muted); margin: 8px 0 0;">
                                Note: You may apply code <strong>PEACHY20</strong> for a 20% courtesy reduction.
                            </p>
                        <?php endif; ?>
                    </div>

                    <!-- Summary Card -->
                    <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 26px; box-shadow: var(--lux-shadow);">
                        <h3 style="font-family: var(--lux-font-serif); font-size: 18px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 18px; border-bottom: 1px solid var(--lux-border); padding-bottom: 12px;">
                            Order Estimate
                        </h3>

                        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13.5px; margin-bottom: 22px;">
                            <div style="display: flex; justify-content: space-between; color: var(--lux-muted);">
                                <span>Subtotal</span>
                                <span style="color: var(--lux-espresso); font-weight: 600;"><?php echo $cart['subtotal_formatted']; ?></span>
                            </div>

                            <div style="display: flex; justify-content: space-between; color: var(--lux-muted);">
                                <span>Concierge Delivery</span>
                                <span style="font-weight: 600; color: <?php echo $cart['delivery_fee'] == 0 ? '#059669' : 'var(--lux-espresso)'; ?>;">
                                    <?php echo $cart['delivery_fee_formatted']; ?>
                                </span>
                            </div>

                            <?php if ($cart['discount_amount'] > 0): ?>
                                <div style="display: flex; justify-content: space-between; color: #059669;">
                                    <span>Privilege Reduction</span>
                                    <span>&minus;<?php echo $cart['discount_formatted']; ?></span>
                                </div>
                            <?php endif; ?>

                            <div style="border-top: 1px solid var(--lux-border); padding-top: 14px; display: flex; justify-content: space-between; align-items: baseline;">
                                <span style="font-family: var(--lux-font-serif); font-size: 16px; color: var(--lux-espresso); text-transform: uppercase;">Total</span>
                                <span style="font-family: var(--lux-font-serif); font-size: 24px; font-weight: 600; color: var(--lux-espresso);">
                                    <?php echo $cart['final_total_formatted']; ?>
                                </span>
                            </div>
                        </div>

                        <?php if ($cart['subtotal'] < $cart['min_order_amount']): ?>
                            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 10px; font-size: 12px; color: #9F1239; margin-bottom: 14px;">
                                Minimum atelier order is <?php echo formatPrice($cart['min_order_amount']); ?>. Please add further selections.
                            </div>
                            <button type="button" disabled class="lux-btn-primary" style="width: 100%; opacity: 0.5; cursor: not-allowed; justify-content: center;">
                                Minimum Order Not Reached
                            </button>
                        <?php else: ?>
                            <a href="checkout.php" class="lux-btn-primary" style="width: 100%; justify-content: center; padding: 14px; font-size: 11px; text-decoration: none;">
                                <span>Proceed to Private Checkout</span>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<script>
async function handleApplyCoupon(e) {
    e.preventDefault();
    const code = document.getElementById('couponCodeInput').value.trim();
    if (!code) return;
    try {
        const formData = new FormData();
        formData.append('code', code);
        const res = await fetch('../shared/api/coupon.php?action=apply', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) window.location.reload();
        else alert(data.error || 'Invalid privilege code.');
    } catch (e) { console.error(e); }
}

async function removeAppliedCoupon() {
    try {
        const res = await fetch('../shared/api/coupon.php?action=remove', { method: 'POST' });
        const data = await res.json();
        if (data.success) window.location.reload();
    } catch(e) { console.error(e); }
}

async function clearFullCart() {
    if (!confirm('Clear all selections from your hamper?')) return;
    try {
        const res = await fetch('../shared/api/cart.php?action=clear', { method: 'POST' });
        const data = await res.json();
        if (data.success) window.location.reload();
    } catch(e) { console.error(e); }
}

function updateCartPageTable() {
    window.location.reload();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
