<?php
$page_title = 'Your Feast Cart & Confections';
require_once __DIR__ . '/includes/header.php';

$cart = getCartDetails();
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">🎀 Handpicked Indulgence</span>
        <h1 class="coq-section-title">Your Peachy <em>Feast Cart</em></h1>
        <p class="coq-section-subtitle">
            Review your handcrafted pastas, desserts, and artisan drinks before proceeding to checkout.
        </p>
    </div>
</div>

<section style="padding-bottom: 90px;">
    <div class="coq-container">
        
        <?php if (empty($cart['items'])): ?>
            <!-- Empty Cart State -->
            <div style="background: #ffffff; border: 2px dashed var(--coq-border); border-radius: var(--coq-radius-lg); padding: 70px 24px; text-align: center; max-width: 650px; margin: 0 auto; box-shadow: var(--coq-shadow);">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--coq-bg-soft); color: var(--coq-rose); display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 20px;">
                    🧁
                </div>
                <h2 style="font-family: var(--coq-font-serif); font-size: 28px; color: var(--coq-text); margin-bottom: 12px;">Your Feast Basket is Empty</h2>
                <p style="color: var(--coq-text-muted); font-size: 15px; line-height: 1.6; max-width: 440px; margin: 0 auto 26px;">
                    You haven't selected any treats yet! Good food brings cute moods. Discover our handmade pasta, strawberry confections and drinks.
                </p>
                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <a href="menu.php" class="coq-btn-primary">
                        <span>Explore Our Menu</span>
                        <i class="fa-solid fa-sparkles"></i>
                    </a>
                    <a href="wishlist.php" class="coq-btn-secondary">
                        <i class="fa-regular fa-heart"></i>
                        <span>View Saved Favorites</span>
                    </a>
                </div>
            </div>

        <?php else: ?>

            <!-- Free Delivery Progress Bar -->
            <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-md); padding: 18px 24px; margin-bottom: 30px; box-shadow: var(--coq-shadow);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 13.5px;">
                    <span id="pageDeliveryMsg">
                        <?php if ($cart['subtotal'] >= $cart['free_delivery_threshold']): ?>
                            🎉 <strong style="color: #059669;">Congratulations!</strong> You unlocked <strong>FREE Delivery</strong> across New Delhi!
                        <?php else: 
                            $diff = $cart['free_delivery_threshold'] - $cart['subtotal'];
                        ?>
                            Add <strong style="color: var(--coq-rose-dark);">₹<?php echo number_format($diff, 0); ?></strong> more to unlock <strong style="color: #059669;">FREE Delivery</strong>!
                        <?php endif; ?>
                    </span>
                    <span style="font-weight: 700; color: var(--coq-text); font-size: 13px;">
                        Threshold: <?php echo formatPrice($cart['free_delivery_threshold']); ?>
                    </span>
                </div>
                <div style="width: 100%; height: 8px; background: var(--coq-bg-soft); border-radius: var(--coq-radius-full); overflow: hidden;">
                    <?php 
                        $pct = min(100, round(($cart['subtotal'] / $cart['free_delivery_threshold']) * 100));
                        $barBg = ($cart['subtotal'] >= $cart['free_delivery_threshold']) ? '#10B981' : '#E27993';
                    ?>
                    <div id="pageDeliveryProgress" style="width: <?php echo $pct; ?>%; height: 100%; background: <?php echo $barBg; ?>; transition: width 0.4s ease; border-radius: var(--coq-radius-full);"></div>
                </div>
            </div>

            <!-- Cart Layout: Items (Left) + Summary (Right) -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 36px; align-items: start;" class="coq-cart-grid-layout">
                
                <!-- Items Table / List -->
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow);">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--coq-border); padding-bottom: 16px; margin-bottom: 20px;">
                        <h2 style="font-family: var(--coq-font-serif); font-size: 22px; color: var(--coq-text); margin: 0;">
                            Ordered Treats (<span class="peachy-cart-count"><?php echo $cart['item_count']; ?></span>)
                        </h2>
                        <button type="button" onclick="clearFullCart()" style="background: none; border: none; font-size: 12px; color: var(--coq-rose); cursor: pointer; text-decoration: underline;">
                            Clear All Items
                        </button>
                    </div>

                    <div id="cartPageItemsTable">
                        <?php foreach ($cart['items'] as $item): ?>
                            <div class="coq-cart-page-row" style="display: flex; gap: 18px; align-items: center; padding: 18px 0; border-bottom: 1px dashed var(--coq-border);">
                                <img src="<?php echo htmlspecialchars($item['image_url']); ?>" alt="<?php echo htmlspecialchars($item['name']); ?>" 
                                     style="width: 80px; height: 80px; border-radius: var(--coq-radius-md); object-fit: cover; border: 1px solid var(--coq-border); flex-shrink: 0;"
                                     loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                                
                                <div style="flex: 1; min-width: 0;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div>
                                            <h3 style="font-family: var(--coq-font-serif); font-size: 17px; color: var(--coq-text); margin: 0 0 4px;">
                                                <?php echo htmlspecialchars($item['name']); ?>
                                            </h3>
                                            <span style="font-size: 11px; color: var(--coq-text-muted); background: var(--coq-bg-soft); padding: 2px 8px; border-radius: var(--coq-radius-full);">
                                                <?php echo htmlspecialchars($item['category']); ?>
                                            </span>
                                        </div>
                                        <button type="button" onclick="removeCartItem('<?php echo $item['cart_key']; ?>')" 
                                                style="background: none; border: none; font-size: 18px; color: #94a3b8; cursor: pointer; padding: 4px;" title="Remove from cart">
                                            &times;
                                        </button>
                                    </div>

                                    <?php if (!empty($item['customizations'])): ?>
                                        <div style="margin-top: 6px; font-size: 12px; color: var(--coq-rose-dark);">
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
                                        <div style="font-size: 11.5px; color: #64748b; font-style: italic; margin-top: 4px;">
                                            Note: <?php echo htmlspecialchars($item['special_instructions']); ?>
                                        </div>
                                    <?php endif; ?>

                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                                        <!-- Quantity Controls -->
                                        <div class="cart-qty-spinner" style="margin: 0;">
                                            <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('<?php echo $item['cart_key']; ?>', <?php echo $item['quantity'] - 1; ?>)">&minus;</button>
                                            <span class="cart-qty-num"><?php echo $item['quantity']; ?></span>
                                            <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('<?php echo $item['cart_key']; ?>', <?php echo $item['quantity'] + 1; ?>)">&plus;</button>
                                        </div>

                                        <div style="text-align: right;">
                                            <span style="font-size: 12px; color: var(--coq-text-muted); display: block;">
                                                <?php echo formatPrice($item['unit_price']); ?> each
                                            </span>
                                            <strong style="font-size: 16px; color: var(--coq-text); font-family: var(--coq-font-serif);">
                                                <?php echo $item['line_total_formatted']; ?>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                        <a href="menu.php" style="color: var(--coq-rose-dark); font-size: 13.5px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>Continue Adding Treats</span>
                        </a>
                        <span style="font-size: 12px; color: var(--coq-text-muted);">
                            Free cutlery &amp; eco-friendly packaging included 🎀
                        </span>
                    </div>
                </div>

                <!-- Summary & Checkout Sidebar -->
                <div>
                    <!-- Coupon Card -->
                    <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 22px; box-shadow: var(--coq-shadow); margin-bottom: 24px;">
                        <h3 style="font-family: var(--coq-font-serif); font-size: 17px; color: var(--coq-text); margin: 0 0 12px; display: flex; align-items: center; gap: 8px;">
                            <span>🏷️ Have a Coupon Code?</span>
                        </h3>
                        
                        <?php if (!empty($cart['coupon'])): ?>
                            <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--coq-radius-sm); padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong style="color: #065F46; font-size: 13.5px;"><?php echo htmlspecialchars($cart['coupon']['code']); ?></strong>
                                    <p style="margin: 2px 0 0; font-size: 11px; color: #047857;">Saved <?php echo $cart['discount_formatted']; ?> on this order!</p>
                                </div>
                                <button type="button" onclick="removeAppliedCoupon()" style="background: none; border: none; color: #DC2626; font-size: 12px; cursor: pointer; text-decoration: underline;">
                                    Remove
                                </button>
                            </div>
                        <?php else: ?>
                            <form id="couponApplyForm" onsubmit="handleApplyCoupon(event)" style="display: flex; gap: 8px;">
                                <input type="text" id="couponCodeInput" placeholder="Try PEACHY20 or WELCOME50" uppercase
                                       style="flex: 1; padding: 10px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-md); font-family: inherit; font-size: 13px; text-transform: uppercase;">
                                <button type="submit" class="coq-btn-primary" style="padding: 10px 18px; font-size: 13px;">Apply</button>
                            </form>
                            <p style="font-size: 11px; color: var(--coq-text-muted); margin: 8px 0 0;">
                                Hint: Enter <strong>PEACHY20</strong> for 20% off your feast!
                            </p>
                        <?php endif; ?>
                    </div>

                    <!-- Bill Summary Card -->
                    <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow);">
                        <h3 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0 0 16px; border-bottom: 1px solid var(--coq-border); padding-bottom: 12px;">
                            Feast Summary
                        </h3>

                        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 14px; margin-bottom: 18px;">
                            <div style="display: flex; justify-content: space-between; color: var(--coq-text-muted);">
                                <span>Subtotal</span>
                                <span style="font-weight: 600; color: var(--coq-text);" id="cartPageSubtotal"><?php echo $cart['subtotal_formatted']; ?></span>
                            </div>

                            <div style="display: flex; justify-content: space-between; color: var(--coq-text-muted);">
                                <span>Estimated Delivery</span>
                                <span style="font-weight: 600; color: <?php echo $cart['delivery_fee'] == 0 ? '#059669' : 'var(--coq-text)'; ?>;" id="cartPageDelivery">
                                    <?php echo $cart['delivery_fee_formatted']; ?>
                                </span>
                            </div>

                            <?php if ($cart['discount_amount'] > 0): ?>
                                <div style="display: flex; justify-content: space-between; color: #059669;">
                                    <span>Coupon Discount (<?php echo htmlspecialchars($cart['coupon']['code']); ?>)</span>
                                    <span style="font-weight: 600;">&minus;<?php echo $cart['discount_formatted']; ?></span>
                                </div>
                            <?php endif; ?>

                            <div style="border-top: 1px solid var(--coq-border); padding-top: 14px; display: flex; justify-content: space-between; align-items: baseline;">
                                <strong style="font-size: 17px; color: var(--coq-text); font-family: var(--coq-font-serif);">Grand Total</strong>
                                <strong style="font-size: 24px; color: var(--coq-rose-dark); font-family: var(--coq-font-serif);" id="cartPageFinalTotal">
                                    <?php echo $cart['final_total_formatted']; ?>
                                </strong>
                            </div>
                        </div>

                        <?php if ($cart['subtotal'] < $cart['min_order_amount']): ?>
                            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--coq-radius-sm); padding: 10px 14px; font-size: 12px; color: #9F1239; margin-bottom: 16px;">
                                Minimum order amount is <?php echo formatPrice($cart['min_order_amount']); ?>. Please add more items to proceed.
                            </div>
                            <button type="button" disabled class="coq-btn-primary" style="width: 100%; opacity: 0.5; cursor: not-allowed; justify-content: center;">
                                Minimum Order Not Reached
                            </button>
                        <?php else: ?>
                            <a href="checkout.php" class="coq-btn-primary" style="width: 100%; justify-content: center; padding: 14px; font-size: 15px; text-decoration: none;">
                                <span>Proceed to Checkout</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        <?php endif; ?>

                        <div style="margin-top: 18px; text-align: center;">
                            <span style="font-size: 11.5px; color: var(--coq-text-muted); display: flex; align-items: center; justify-content: center; gap: 6px;">
                                <i class="fa-solid fa-shield-heart" style="color: var(--coq-rose);"></i>
                                Safe &bull; Sanitized Packaging &bull; Cash on Delivery Available
                            </span>
                        </div>
                    </div>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<script>
// Coupon Apply / Remove Handlers
async function handleApplyCoupon(e) {
    e.preventDefault();
    const code = document.getElementById('couponCodeInput').value.trim();
    if (!code) return;

    try {
        const formData = new FormData();
        formData.append('code', code);
        const res = await fetch('../shared/api/coupon.php?action=apply', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.error || 'Invalid coupon code');
        }
    } catch (err) {
        console.error(err);
    }
}

async function removeAppliedCoupon() {
    try {
        const res = await fetch('../shared/api/coupon.php?action=remove', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
    }
}

async function clearFullCart() {
    if (!confirm('Are you sure you want to empty your entire cart?')) return;
    try {
        const res = await fetch('../shared/api/cart.php?action=clear', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
    }
}

// When item qty is changed from cart drawer or cart page, reload table
function updateCartPageTable(cart) {
    window.location.reload();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
