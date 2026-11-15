<?php
$page_title = 'Order Confirmed! ⚡ Kitchen Fired';
require_once __DIR__ . '/includes/header.php';

$order_number = trim($_GET['order'] ?? '');
$order = $order_number ? getOrderByOrderNumber($order_number) : null;
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 46px 0 36px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ DISPATCH SECURED &bull; HEATING UP</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">LOCKED IN! ORDER RECEIVED</h1>
        <p style="font-size: 15px; font-weight: 700; color: var(--gen-ink); max-width: 540px; margin: 8px auto 0;">
            Our kitchen crew just fired up the pans and woodfired oven. Your feast drop is officially cooking!
        </p>
    </div>
</div>

<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <?php if (!$order): ?>
            <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 60px 24px; text-align: center; max-width: 540px; margin: 0 auto;">
                <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
                <h2 style="font-family: var(--gen-font-display); font-size: 24px; text-transform: uppercase;">NO ORDER SELECTED</h2>
                <p style="color: var(--gen-muted); font-weight: 600; font-size: 14px; margin-bottom: 20px;">
                    Track your drop using your order number and phone number on our live tracking screen.
                </p>
                <a href="order-tracking.php" class="gen-btn-primary">GO TO LIVE TRACKER ⚡</a>
            </div>
        <?php else: 
            $statuses = ['Pending', 'Accepted', 'Preparing', ($order['order_type'] === 'takeaway' ? 'Ready' : 'Out for delivery'), 'Delivered'];
            $currentStatus = $order['order_status'];
            $currentIndex = array_search($currentStatus, $statuses);
            if ($currentIndex === false) {
                $currentIndex = ($currentStatus === 'Cancelled') ? -1 : 0;
            }
        ?>

            <div style="max-width: 820px; margin: 0 auto;">
                
                <!-- Success Sticker Card -->
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 8px 8px 0px var(--gen-ink); border-radius: 16px; padding: 36px 30px; text-align: center; margin-bottom: 30px; position: relative;">
                    <span class="gen-sticker sticker-red" style="font-size: 11px; padding: 4px 12px;">★ OFFICIAL DISPATCH RECEIPT</span>
                    <h2 style="font-family: var(--gen-font-display); font-size: 30px; text-transform: uppercase; margin: 12px 0 6px;">
                        THANKS FOR ROLLING WITH US, <?php echo htmlspecialchars($order['customer_name']); ?>!
                    </h2>
                    <p style="font-weight: 600; font-size: 14.5px; color: var(--gen-muted); margin: 0 0 20px;">
                        Confirmation copy delivered to <strong><?php echo htmlspecialchars($order['customer_email']); ?></strong>.
                    </p>

                    <div style="display: inline-flex; align-items: center; gap: 12px; background: var(--gen-yellow); border: 2px solid var(--gen-ink); box-shadow: 3px 3px 0px var(--gen-ink); padding: 10px 22px; border-radius: 10px;">
                        <span style="font-family: var(--gen-font-display); font-size: 13px; font-weight: 800; text-transform: uppercase;">ORDER #</span>
                        <strong style="font-family: monospace; font-size: 17px;"><?php echo htmlspecialchars($order['order_number']); ?></strong>
                        <button type="button" onclick="navigator.clipboard.writeText('<?php echo htmlspecialchars($order['order_number']); ?>'); alert('⚡ Order ID Copied!');" 
                                style="background: #ffffff; border: 2px solid var(--gen-ink); border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 13px;">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </div>

                <!-- Timeline -->
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 30px 24px; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <div>
                            <span style="font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; color: var(--gen-muted);">LIVE KITCHEN STAGE</span>
                            <h3 style="font-family: var(--gen-font-display); font-size: 22px; text-transform: uppercase; color: var(--gen-red); margin: 4px 0 0;">
                                <?php echo htmlspecialchars($currentStatus); ?>
                            </h3>
                        </div>
                        <span class="gen-sticker sticker-yellow" style="font-size: 11px; padding: 6px 12px;">ETA: ~35-45 MINS</span>
                    </div>

                    <?php if ($currentStatus === 'Cancelled'): ?>
                        <div style="background: #fee2e2; border: 2px solid var(--gen-red); border-radius: 8px; padding: 12px; font-weight: 700; color: #991b1b; font-size: 13px;">
                            This drop was cancelled. Need help? Call diner dispatch directly at <?php echo RESTAURANT_PHONE; ?>.
                        </div>
                    <?php else: ?>
                        <div class="gen-timeline-wrap">
                            <?php 
                            $stepIcons = ['fa-file-lines', 'fa-thumbs-up', 'fa-fire-burner', ($order['order_type'] === 'takeaway' ? 'fa-box-open' : 'fa-motorcycle'), 'fa-bolt'];
                            foreach ($statuses as $idx => $st): 
                                $isCompleted = ($idx < $currentIndex);
                                $isActive = ($idx === $currentIndex);
                                $stepClass = $isActive ? 'active' : ($isCompleted ? 'completed' : '');
                            ?>
                                <div class="gen-timeline-step <?php echo $stepClass; ?>">
                                    <div class="gen-timeline-dot">
                                        <i class="fa-solid <?php echo $stepIcons[$idx]; ?>"></i>
                                    </div>
                                    <span class="gen-timeline-label"><?php echo $st; ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Receipt Table -->
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--gen-ink); padding-bottom: 14px; margin-bottom: 20px;">
                        <h3 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0;">
                            ITEMS DISPATCHED
                        </h3>
                        <span style="font-size: 12px; font-weight: 700; color: var(--gen-muted);">
                            <?php echo date('d M Y &bull; h:i A', strtotime($order['created_at'])); ?>
                        </span>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <?php foreach ($order['items'] as $item): ?>
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 2px dashed #e4e4e7; font-weight: 700; font-size: 13.5px;">
                                <div>
                                    <span><?php echo htmlspecialchars($item['item_name']); ?></span> &times; <?php echo $item['quantity']; ?>
                                    <?php if (!empty($item['customizations_summary'])): ?>
                                        <div style="font-size: 11px; color: var(--gen-red); margin-top: 2px;">
                                            ⚡ <?php echo htmlspecialchars($item['customizations_summary']); ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <span style="font-family: var(--gen-font-display); font-size: 15px; color: var(--gen-ink);">
                                    <?php echo formatPrice($item['total_price']); ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <!-- Summary box -->
                    <div style="background: #fafafa; border: 2px solid var(--gen-ink); border-radius: 10px; padding: 18px; font-size: 13.5px; font-weight: 700; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: var(--gen-muted);">
                            <span>SUBTOTAL</span>
                            <span style="color: var(--gen-ink);"><?php echo formatPrice($order['subtotal']); ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: var(--gen-muted);">
                            <span>DELIVERY FEE</span>
                            <span style="color: <?php echo $order['delivery_fee'] == 0 ? '#059669' : 'var(--gen-ink)'; ?>;">
                                <?php echo $order['delivery_fee'] == 0 ? 'FREE' : formatPrice($order['delivery_fee']); ?>
                            </span>
                        </div>
                        <?php if ($order['discount_amount'] > 0): ?>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: #059669;">
                                <span>COUPON SAVINGS (<?php echo htmlspecialchars($order['coupon_code']); ?>)</span>
                                <span>&minus;<?php echo formatPrice($order['discount_amount']); ?></span>
                            </div>
                        <?php endif; ?>
                        <div style="border-top: 2px solid var(--gen-ink); padding-top: 10px; display: flex; justify-content: space-between; align-items: baseline;">
                            <span style="font-family: var(--gen-font-display); font-size: 15px; text-transform: uppercase;">FINAL AMOUNT</span>
                            <span style="font-family: var(--gen-font-display); font-size: 22px; font-weight: 900; color: var(--gen-red);">
                                <?php echo formatPrice($order['final_total']); ?>
                            </span>
                        </div>
                    </div>

                    <!-- Dispatch Address & Payment Info -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 13px; font-weight: 600; border-top: 2px solid var(--gen-ink); padding-top: 16px;">
                        <div>
                            <span style="font-family: var(--gen-font-display); font-size: 11px; text-transform: uppercase; color: var(--gen-muted); display: block; margin-bottom: 4px;">DROP DESTINATION:</span>
                            <?php if ($order['order_type'] === 'takeaway'): ?>
                                🛍️ <strong>Diner Pickup Counter</strong><br>
                                24, Garden Avenue, New Delhi
                            <?php else: ?>
                                🛵 <strong>Home Delivery</strong><br>
                                <?php echo nl2br(htmlspecialchars($order['delivery_address'])); ?>, <?php echo htmlspecialchars($order['city']); ?> &ndash; <?php echo htmlspecialchars($order['pincode']); ?>
                            <?php endif; ?>
                        </div>
                        <div>
                            <span style="font-family: var(--gen-font-display); font-size: 11px; text-transform: uppercase; color: var(--gen-muted); display: block; margin-bottom: 4px;">PAYMENT STATUS:</span>
                            Method: <strong><?php echo strtoupper(htmlspecialchars($order['payment']['payment_method'] ?? 'COD')); ?></strong><br>
                            Status: <span style="color: <?php echo ($order['payment']['payment_status'] ?? '') === 'paid' ? '#059669' : '#D97706'; ?>; font-weight: 800; text-transform: uppercase;"><?php echo htmlspecialchars($order['payment']['payment_status'] ?? 'unpaid'); ?></span>
                        </div>
                    </div>
                </div>

                <!-- Action CTAs -->
                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <a href="order-tracking.php?order=<?php echo urlencode($order['order_number']); ?>&phone=<?php echo urlencode($order['customer_phone']); ?>" class="gen-btn-primary">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>LIVE TRACK DROP ⚡</span>
                    </a>
                    <button type="button" onclick="window.print()" class="gen-btn-yellow">
                        <i class="fa-solid fa-print"></i>
                        <span>PRINT RECEIPT</span>
                    </button>
                    <a href="menu.php" class="gen-btn-yellow">
                        <span>MORE FOOD DROPS</span>
                    </a>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
