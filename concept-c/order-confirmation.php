<?php
$page_title = 'Atelier Order Confirmed';
require_once __DIR__ . '/includes/header.php';

$order_number = trim($_GET['order'] ?? '');
$order = $order_number ? getOrderByOrderNumber($order_number) : null;
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Order Confirmed &bull; Atelier Cuisine</span>
        <h1 class="lux-section-title">Preparation <em>Commenced</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Our culinary team has received your order and begun careful scratch preparation.
        </p>
    </div>
</div>

<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <?php if (!$order): ?>
            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 60px 24px; text-align: center; max-width: 580px; margin: 0 auto; box-shadow: var(--lux-shadow);">
                <span style="font-size: 32px;">🍸</span>
                <h2 style="font-family: var(--lux-font-serif); font-size: 24px; font-weight: 500; margin: 12px 0;">No Order Specified</h2>
                <p style="color: var(--lux-muted); font-size: 14px; margin-bottom: 24px;">
                    Please track your order using the link sent in your confirmation email or through our order tracking portal.
                </p>
                <a href="order-tracking.php" class="lux-btn-primary">Atelier Order Tracker</a>
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
                
                <!-- Confirmation Banner -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 40px 32px; text-align: center; box-shadow: var(--lux-shadow); margin-bottom: 30px;">
                    <span class="lux-tag" style="margin-bottom: 12px; display: inline-block;">ATELIER DISPATCH CONFIRMATION</span>
                    <h2 style="font-family: var(--lux-font-serif); font-size: 30px; font-weight: 500; color: var(--lux-espresso); margin: 8px 0;">
                        Thank You, <?php echo htmlspecialchars($order['customer_name']); ?>
                    </h2>
                    <p style="color: var(--lux-muted); font-size: 14.5px; margin: 0 0 22px;">
                        Your selections are being prepared by our brigade. A receipt copy has been dispatched to <strong><?php echo htmlspecialchars($order['customer_email']); ?></strong>.
                    </p>

                    <div style="display: inline-flex; align-items: center; gap: 12px; background: #FAF7F2; border: 1px solid var(--lux-border); padding: 10px 22px; border-radius: var(--lux-radius-full);">
                        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted);">Order Reference:</span>
                        <strong style="font-family: monospace; font-size: 16px; color: var(--lux-espresso);"><?php echo htmlspecialchars($order['order_number']); ?></strong>
                        <button type="button" onclick="navigator.clipboard.writeText('<?php echo htmlspecialchars($order['order_number']); ?>'); alert('Reference Copied');" 
                                style="background: none; border: none; color: var(--lux-gold); cursor: pointer; font-size: 13px;">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </div>

                <!-- Status Timeline -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 30px; box-shadow: var(--lux-shadow); margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <div>
                            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted); font-weight: 600;">Culinary Progress</span>
                            <h3 style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 500; color: var(--lux-espresso); margin: 4px 0 0;">
                                <?php echo htmlspecialchars($currentStatus); ?>
                            </h3>
                        </div>
                        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-gold); font-weight: 600; border: 1px solid var(--lux-border); padding: 6px 14px; border-radius: 20px;">
                            Estimated: ~35-45 minutes
                        </span>
                    </div>

                    <?php if ($currentStatus === 'Cancelled'): ?>
                        <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 14px; color: #9F1239; font-size: 13px;">
                            This order was cancelled. Please contact our concierge at <?php echo RESTAURANT_PHONE; ?> for assistance.
                        </div>
                    <?php else: ?>
                        <div class="lux-timeline-wrap">
                            <?php 
                            $stepIcons = ['fa-file-lines', 'fa-thumbs-up', 'fa-fire-burner', ($order['order_type'] === 'takeaway' ? 'fa-box-open' : 'fa-motorcycle'), 'fa-champagne-glasses'];
                            foreach ($statuses as $idx => $st): 
                                $isCompleted = ($idx < $currentIndex);
                                $isActive = ($idx === $currentIndex);
                                $stepClass = $isActive ? 'active' : ($isCompleted ? 'completed' : '');
                            ?>
                                <div class="lux-timeline-step <?php echo $stepClass; ?>">
                                    <div class="lux-timeline-dot">
                                        <i class="fa-solid <?php echo $stepIcons[$idx]; ?>"></i>
                                    </div>
                                    <span class="lux-timeline-label"><?php echo $st; ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Receipt Overview -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 32px; box-shadow: var(--lux-shadow); margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--lux-border); padding-bottom: 16px; margin-bottom: 20px;">
                        <h3 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 0;">
                            Itemized Receipt
                        </h3>
                        <span style="font-size: 12px; color: var(--lux-muted);">
                            Placed on <?php echo date('M j, Y &bull; g:i A', strtotime($order['created_at'])); ?>
                        </span>
                    </div>

                    <div style="margin-bottom: 22px;">
                        <?php foreach ($order['items'] as $item): ?>
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(44, 30, 26, 0.08); font-size: 13.5px;">
                                <div>
                                    <span style="color: var(--lux-espresso); font-weight: 500;"><?php echo htmlspecialchars($item['item_name']); ?></span> &times; <?php echo $item['quantity']; ?>
                                    <?php if (!empty($item['customizations_summary'])): ?>
                                        <div style="font-size: 11px; color: var(--lux-gold); margin-top: 2px;">
                                            ✦ <?php echo htmlspecialchars($item['customizations_summary']); ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <span style="font-family: var(--lux-font-serif); color: var(--lux-espresso); font-weight: 600;">
                                    <?php echo formatPrice($item['total_price']); ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div style="background: #FAF7F2; border-radius: 4px; padding: 18px; margin-bottom: 22px; font-size: 13.5px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--lux-muted);">
                            <span>Subtotal</span>
                            <span style="color: var(--lux-espresso); font-weight: 500;"><?php echo formatPrice($order['subtotal']); ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--lux-muted);">
                            <span>Delivery</span>
                            <span style="color: <?php echo $order['delivery_fee'] == 0 ? '#059669' : 'var(--lux-espresso)'; ?>; font-weight: 500;">
                                <?php echo $order['delivery_fee'] == 0 ? 'Complimentary' : formatPrice($order['delivery_fee']); ?>
                            </span>
                        </div>
                        <?php if ($order['discount_amount'] > 0): ?>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #059669;">
                                <span>Privilege Reduction (<?php echo htmlspecialchars($order['coupon_code']); ?>)</span>
                                <span>&minus;<?php echo formatPrice($order['discount_amount']); ?></span>
                            </div>
                        <?php endif; ?>
                        <div style="border-top: 1px solid var(--lux-border); padding-top: 10px; display: flex; justify-content: space-between; align-items: baseline;">
                            <span style="font-family: var(--lux-font-serif); font-size: 16px; text-transform: uppercase; color: var(--lux-espresso);">Total Settled / Due</span>
                            <span style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 600; color: var(--lux-espresso);">
                                <?php echo formatPrice($order['final_total']); ?>
                            </span>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 13px; border-top: 1px solid var(--lux-border); padding-top: 18px;">
                        <div>
                            <span style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted); display: block; margin-bottom: 4px;">Fulfillment Type:</span>
                            <?php if ($order['order_type'] === 'takeaway'): ?>
                                🛍️ <strong>Maison Salon Pickup</strong><br>
                                24, Garden Avenue, New Delhi
                            <?php else: ?>
                                🛵 <strong>Chauffeured Delivery</strong><br>
                                <?php echo nl2br(htmlspecialchars($order['delivery_address'])); ?>, <?php echo htmlspecialchars($order['city']); ?> &ndash; <?php echo htmlspecialchars($order['pincode']); ?>
                            <?php endif; ?>
                        </div>
                        <div>
                            <span style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted); display: block; margin-bottom: 4px;">Settlement Details:</span>
                            Method: <strong><?php echo strtoupper(htmlspecialchars($order['payment']['payment_method'] ?? 'COD')); ?></strong><br>
                            Status: <span style="text-transform: capitalize; font-weight: 600; color: <?php echo ($order['payment']['payment_status'] ?? '') === 'paid' ? '#059669' : '#D97706'; ?>;"><?php echo htmlspecialchars($order['payment']['payment_status'] ?? 'unpaid'); ?></span>
                        </div>
                    </div>
                </div>

                <!-- CTAs -->
                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <a href="order-tracking.php?order=<?php echo urlencode($order['order_number']); ?>&phone=<?php echo urlencode($order['customer_phone']); ?>" class="lux-btn-primary">
                        <span>Live Tracking Feed</span>
                    </a>
                    <button type="button" onclick="window.print()" class="lux-btn-secondary">
                        <i class="fa-solid fa-print"></i>
                        <span>Print Receipt</span>
                    </button>
                    <a href="menu.php" class="lux-btn-secondary">
                        <span>Explore Further Selections</span>
                    </a>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
