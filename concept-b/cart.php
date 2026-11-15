<?php
$page_title = 'Your Stash Cart & Fuel Drops ⚡';
require_once __DIR__ . '/includes/header.php';

$cart = getCartDetails();
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 46px 0 36px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ STASH REVIEW &bull; PEACHY FLEET</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">YOUR FOOD STASH CART</h1>
        <p style="font-size: 15px; font-weight: 700; color: var(--gen-ink); max-width: 540px; margin: 8px auto 0;">
            Review your pasta drops, sourdough pizzas, and killer milkshakes before firing to our kitchen.
        </p>
    </div>
</div>

<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <?php if (empty($cart['items'])): ?>
            <!-- Empty Cart State -->
            <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 8px 8px 0px var(--gen-ink); border-radius: 16px; padding: 60px 24px; text-align: center; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 48px; margin-bottom: 14px;">🍕</div>
                <h2 style="font-family: var(--gen-font-display); font-size: 26px; text-transform: uppercase; margin: 0 0 10px;">YOUR STASH IS TOTALLY EMPTY</h2>
                <p style="color: var(--gen-muted); font-size: 14.5px; font-weight: 600; line-height: 1.6; max-width: 400px; margin: 0 auto 24px;">
                    No food drops selected yet! Fuel up with our woodfired sourdough pizzas, loaded fries, or strawberry tiramisu.
                </p>
                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <a href="menu.php" class="gen-btn-primary">CHECK MENU DROPS ⚡</a>
                    <a href="wishlist.php" class="gen-btn-yellow">VIEW SAVED DROPS</a>
                </div>
            </div>

        <?php else: ?>

            <!-- Free Delivery Tracker -->
            <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 12px; padding: 18px 24px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: 800; font-size: 13px; text-transform: uppercase;">
                    <span>
                        <?php if ($cart['subtotal'] >= $cart['free_delivery_threshold']): ?>
                            🎉 <span style="color: #059669;">UNLOCKED FREE DELIVERY</span> ACROSS DELHI!
                        <?php else: 
                            $diff = $cart['free_delivery_threshold'] - $cart['subtotal'];
                        ?>
                            ADD <span style="color: var(--gen-red);">₹<?php echo number_format($diff, 0); ?></span> MORE FOR <span style="color: #059669;">FREE DELIVERY</span>!
                        <?php endif; ?>
                    </span>
                    <span>THRESHOLD: <?php echo formatPrice($cart['free_delivery_threshold']); ?></span>
                </div>
                <div style="width: 100%; height: 12px; background: #e4e4e7; border: 2px solid var(--gen-ink); border-radius: 6px; overflow: hidden;">
                    <?php 
                        $pct = min(100, round(($cart['subtotal'] / $cart['free_delivery_threshold']) * 100));
                        $barBg = ($cart['subtotal'] >= $cart['free_delivery_threshold']) ? '#10B981' : 'var(--gen-red)';
                    ?>
                    <div style="width: <?php echo $pct; ?>%; height: 100%; background: <?php echo $barBg; ?>; transition: width 0.4s ease;"></div>
                </div>
            </div>

            <!-- Stash Grid -->
            <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 36px; align-items: start;">
                
                <!-- Items Column -->
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--gen-ink); padding-bottom: 16px; margin-bottom: 20px;">
                        <h2 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase; margin: 0;">
                            STASH ITEMS (<span class="peachy-cart-count"><?php echo $cart['item_count']; ?></span>)
                        </h2>
                        <button type="button" onclick="clearFullCart()" style="background: none; border: none; font-size: 12px; font-weight: 800; color: var(--gen-red); cursor: pointer; text-transform: uppercase; text-decoration: underline;">
                            DUMP ALL
                        </button>
                    </div>

                    <?php foreach ($cart['items'] as $item): ?>
                        <div style="display: flex; gap: 16px; align-items: center; padding: 16px 0; border-bottom: 2px dashed #e4e4e7;">
                            <img src="<?php echo htmlspecialchars($item['image_url']); ?>" alt="<?php echo htmlspecialchars($item['name']); ?>" 
                                 style="width: 80px; height: 80px; border-radius: 10px; border: 2px solid var(--gen-ink); object-fit: cover; flex-shrink: 0;"
                                 loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                            
                            <div style="flex: 1; min-width: 0;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h3 style="font-family: var(--gen-font-display); font-size: 16px; text-transform: uppercase; margin: 0 0 4px;">
                                            <?php echo htmlspecialchars($item['name']); ?>
                                        </h3>
                                        <span class="gen-sticker sticker-orange" style="font-size: 9px; padding: 2px 6px;">
                                            <?php echo htmlspecialchars($item['category']); ?>
                                        </span>
                                    </div>
                                    <button type="button" onclick="removeCartItem('<?php echo $item['cart_key']; ?>')" 
                                            style="background: #fee2e2; border: 2px solid var(--gen-ink); border-radius: 6px; width: 28px; height: 28px; font-weight: 900; color: var(--gen-red); cursor: pointer;" title="Remove">
                                        &times;
                                    </button>
                                </div>

                                <?php if (!empty($item['customizations'])): ?>
                                    <div style="margin-top: 6px; font-size: 11.5px; font-weight: 700; color: var(--gen-red);">
                                        ⚡ <?php 
                                            $cTexts = [];
                                            foreach ($item['customizations'] as $c) {
                                                $cTexts[] = htmlspecialchars($c['option']) . ($c['price_delta'] > 0 ? ' (+₹' . (int)$c['price_delta'] . ')' : '');
                                            }
                                            echo implode(' &bull; ', $cTexts);
                                        ?>
                                    </div>
                                <?php endif; ?>

                                <?php if (!empty($item['special_instructions'])): ?>
                                    <div style="font-size: 11.5px; color: #71717a; font-style: italic; margin-top: 4px;">
                                        Note: <?php echo htmlspecialchars($item['special_instructions']); ?>
                                    </div>
                                <?php endif; ?>

                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                                    <div class="cart-qty-spinner" style="margin: 0; border: 2px solid var(--gen-ink); border-radius: 8px;">
                                        <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('<?php echo $item['cart_key']; ?>', <?php echo $item['quantity'] - 1; ?>)">&minus;</button>
                                        <span class="cart-qty-num" style="font-weight: 900;"><?php echo $item['quantity']; ?></span>
                                        <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('<?php echo $item['cart_key']; ?>', <?php echo $item['quantity'] + 1; ?>)">&plus;</button>
                                    </div>

                                    <div style="text-align: right;">
                                        <span style="font-size: 11px; color: var(--gen-muted); font-weight: 700; display: block;">
                                            <?php echo formatPrice($item['unit_price']); ?> each
                                        </span>
                                        <strong style="font-family: var(--gen-font-display); font-size: 18px; color: var(--gen-red);">
                                            <?php echo $item['line_total_formatted']; ?>
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>

                    <div style="margin-top: 20px;">
                        <a href="menu.php" class="gen-btn-yellow" style="display: inline-flex; font-size: 12px;">
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>ADD MORE DROPS</span>
                        </a>
                    </div>
                </div>

                <!-- Summary Column -->
                <div>
                    <!-- Coupon Card -->
                    <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 14px; padding: 20px; margin-bottom: 24px;">
                        <h3 style="font-family: var(--gen-font-display); font-size: 15px; text-transform: uppercase; margin: 0 0 12px;">
                            🏷️ DISCOUNT CODE
                        </h3>

                        <?php if (!empty($cart['coupon'])): ?>
                            <div style="background: #dcfce7; border: 2px solid var(--gen-ink); border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong style="color: #15803d; font-size: 14px;"><?php echo htmlspecialchars($cart['coupon']['code']); ?></strong>
                                    <p style="margin: 2px 0 0; font-size: 11px; color: #166534; font-weight: 700;">Unlocked <?php echo $cart['discount_formatted']; ?> OFF!</p>
                                </div>
                                <button type="button" onclick="removeAppliedCoupon()" style="background: none; border: none; color: #dc2626; font-size: 11px; font-weight: 800; cursor: pointer;">
                                    REMOVE
                                </button>
                            </div>
                        <?php else: ?>
                            <form id="couponApplyForm" onsubmit="handleApplyCoupon(event)" style="display: flex; gap: 8px;">
                                <input type="text" id="couponCodeInput" placeholder="TRY PEACHY20" uppercase 
                                       style="flex: 1; padding: 10px 12px; border: 2px solid var(--gen-ink); border-radius: 8px; font-family: inherit; font-size: 12.5px; font-weight: 800; text-transform: uppercase;">
                                <button type="submit" class="gen-btn-yellow" style="padding: 10px 14px; font-size: 12px;">APPLY</button>
                            </form>
                            <p style="font-size: 11px; font-weight: 700; color: var(--gen-muted); margin: 8px 0 0;">
                                Promo: Enter <strong>PEACHY20</strong> for 20% discount!
                            </p>
                        <?php endif; ?>
                    </div>

                    <!-- Bill Summary -->
                    <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px;">
                        <h3 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0 0 16px; border-bottom: 2px solid var(--gen-ink); padding-bottom: 12px;">
                            TOTAL CHARGE
                        </h3>

                        <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px; font-weight: 700; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; color: var(--gen-muted);">
                                <span>SUBTOTAL</span>
                                <span style="color: var(--gen-ink);"><?php echo $cart['subtotal_formatted']; ?></span>
                            </div>

                            <div style="display: flex; justify-content: space-between; color: var(--gen-muted);">
                                <span>DELIVERY CHARGE</span>
                                <span style="color: <?php echo $cart['delivery_fee'] == 0 ? '#059669' : 'var(--gen-ink)'; ?>;">
                                    <?php echo $cart['delivery_fee_formatted']; ?>
                                </span>
                            </div>

                            <?php if ($cart['discount_amount'] > 0): ?>
                                <div style="display: flex; justify-content: space-between; color: #059669;">
                                    <span>COUPON DISCOUNT</span>
                                    <span>&minus;<?php echo $cart['discount_formatted']; ?></span>
                                </div>
                            <?php endif; ?>

                            <div style="border-top: 2px solid var(--gen-ink); padding-top: 14px; display: flex; justify-content: space-between; align-items: baseline;">
                                <span style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase;">GRAND TOTAL</span>
                                <span style="font-family: var(--gen-font-display); font-size: 26px; font-weight: 900; color: var(--gen-red);">
                                    <?php echo $cart['final_total_formatted']; ?>
                                </span>
                            </div>
                        </div>

                        <?php if ($cart['subtotal'] < $cart['min_order_amount']): ?>
                            <div style="background: #fee2e2; border: 2px solid var(--gen-red); border-radius: 8px; padding: 10px; font-size: 12px; font-weight: 700; color: #991b1b; margin-bottom: 14px;">
                                Minimum order is <?php echo formatPrice($cart['min_order_amount']); ?>. Add more drops!
                            </div>
                            <button type="button" disabled class="gen-btn-primary" style="width: 100%; opacity: 0.5; cursor: not-allowed; justify-content: center;">
                                MIN ORDER NOT MET
                            </button>
                        <?php else: ?>
                            <a href="checkout.php" class="gen-btn-primary" style="width: 100%; justify-content: center; padding: 15px; font-size: 15px; text-decoration: none;">
                                <span>PROCEED TO CHECKOUT ⚡</span>
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
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.error || 'Invalid code');
        }
    } catch (err) {
        console.error(err);
    }
}

async function removeAppliedCoupon() {
    try {
        const res = await fetch('../shared/api/coupon.php?action=remove', { method: 'POST' });
        const data = await res.json();
        if (data.success) window.location.reload();
    } catch (err) {
        console.error(err);
    }
}

async function clearFullCart() {
    if (!confirm('Dump all drops from stash?')) return;
    try {
        const res = await fetch('../shared/api/cart.php?action=clear', { method: 'POST' });
        const data = await res.json();
        if (data.success) window.location.reload();
    } catch (err) {
        console.error(err);
    }
}

function updateCartPageTable() {
    window.location.reload();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
