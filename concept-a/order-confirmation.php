<?php
$page_title = 'Order Confirmed! 🎀';
require_once __DIR__ . '/includes/header.php';

$order_number = trim($_GET['order'] ?? '');
$order = $order_number ? getOrderByOrderNumber($order_number) : null;
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">🎀 Order Successfully Received</span>
        <h1 class="coq-section-title">A Sweet Feast is on Its <em>Way!</em></h1>
        <p class="coq-section-subtitle">
            Our chefs have fired up the ovens and are crafting your order with fresh organic ingredients.
        </p>
    </div>
</div>

<section style="padding-bottom: 90px;">
    <div class="coq-container">
        
        <?php if (!$order): ?>
            <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 60px 24px; text-align: center; max-width: 580px; margin: 0 auto; box-shadow: var(--coq-shadow);">
                <span style="font-size: 36px;">🔍</span>
                <h2 style="font-family: var(--coq-font-serif); font-size: 24px; color: var(--coq-text); margin: 12px 0;">No Order Specified</h2>
                <p style="color: var(--coq-text-muted); font-size: 14px; margin-bottom: 24px;">
                    Please check your order confirmation email or enter your order number on our live tracking page.
                </p>
                <a href="order-tracking.php" class="coq-btn-primary">Go to Order Tracking</a>
            </div>
        <?php else: 
            $statuses = ['Pending', 'Accepted', 'Preparing', ($order['order_type'] === 'takeaway' ? 'Ready' : 'Out for delivery'), 'Delivered'];
            $currentStatus = $order['order_status'];
            $currentIndex = array_search($currentStatus, $statuses);
            if ($currentIndex === false) {
                if ($currentStatus === 'Cancelled') {
                    $currentIndex = -1;
                } else {
                    $currentIndex = 0;
                }
            }
        ?>

            <div style="max-width: 820px; margin: 0 auto;">
                
                <!-- Success Banner Card -->
                <div style="background: #ffffff; border: 2px solid var(--coq-rose); border-radius: var(--coq-radius-lg); padding: 36px 32px; text-align: center; box-shadow: var(--coq-shadow); position: relative; margin-bottom: 30px;">
                    <div style="width: 70px; height: 70px; border-radius: 50%; background: #FFF0F3; color: var(--coq-rose); display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 16px;">
                        🎀
                    </div>
                    <span style="font-size: 12px; font-weight: 700; color: var(--coq-rose-dark); letter-spacing: 2px; text-transform: uppercase;">
                        ORDER CONFIRMATION
                    </span>
                    <h2 style="font-family: var(--coq-font-serif); font-size: 30px; color: var(--coq-text); margin: 8px 0;">
                        Thank You, <?php echo htmlspecialchars($order['customer_name']); ?>!
                    </h2>
                    <p style="color: var(--coq-text-muted); font-size: 15px; margin: 0 0 20px;">
                        Your delicious meal is being lovingly prepared. We sent a copy of this receipt to <strong><?php echo htmlspecialchars($order['customer_email']); ?></strong>.
                    </p>

                    <div style="display: inline-flex; align-items: center; gap: 12px; background: var(--coq-bg-soft); padding: 10px 20px; border-radius: var(--coq-radius-full); border: 1px dashed var(--coq-rose);">
                        <span style="font-size: 13px; color: var(--coq-text-muted);">Order Number:</span>
                        <strong style="font-size: 16px; color: var(--coq-text); font-family: monospace;" id="orderNumText"><?php echo htmlspecialchars($order['order_number']); ?></strong>
                        <button type="button" onclick="navigator.clipboard.writeText('<?php echo htmlspecialchars($order['order_number']); ?>'); alert('🎀 Order Number Copied!');" 
                                style="background: none; border: none; color: var(--coq-rose); cursor: pointer; font-size: 14px;" title="Copy Order Number">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </div>

                <!-- Status Timeline Tracker -->
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 30px 24px; box-shadow: var(--coq-shadow); margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <div>
                            <span style="font-size: 12px; color: var(--coq-text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Live Status</span>
                            <h3 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 4px 0 0;">
                                <?php echo htmlspecialchars($currentStatus); ?>
                            </h3>
                        </div>
                        <span style="font-size: 12.5px; background: #ECFDF5; color: #047857; font-weight: 700; padding: 6px 14px; border-radius: var(--coq-radius-full);">
                            Estimated: ~35-45 mins
                        </span>
                    </div>

                    <?php if ($currentStatus === 'Cancelled'): ?>
                        <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--coq-radius-md); padding: 14px 18px; color: #9F1239; font-size: 13.5px;">
                            This order was cancelled. If you believe this is in error, please contact us immediately at <?php echo RESTAURANT_PHONE; ?>.
                        </div>
                    <?php else: ?>
                        <div class="coq-timeline-wrap">
                            <?php 
                            $stepIcons = ['fa-file-lines', 'fa-thumbs-up', 'fa-fire-burner', ($order['order_type'] === 'takeaway' ? 'fa-box-open' : 'fa-motorcycle'), 'fa-heart'];
                            foreach ($statuses as $idx => $st): 
                                $isCompleted = ($idx < $currentIndex);
                                $isActive = ($idx === $currentIndex);
                                $stepClass = $isActive ? 'active' : ($isCompleted ? 'completed' : '');
                            ?>
                                <div class="coq-timeline-step <?php echo $stepClass; ?>">
                                    <div class="coq-timeline-dot">
                                        <i class="fa-solid <?php echo $stepIcons[$idx]; ?>"></i>
                                    </div>
                                    <span class="coq-timeline-label"><?php echo $st; ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Itemized Receipt & Delivery Overview -->
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 32px; box-shadow: var(--coq-shadow); margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--coq-border); padding-bottom: 16px; margin-bottom: 20px;">
                        <h3 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0;">
                            Receipt Breakdown
                        </h3>
                        <span style="font-size: 13px; color: var(--coq-text-muted);">
                            Placed on <?php echo date('M j, Y &bull; g:i A', strtotime($order['created_at'])); ?>
                        </span>
                    </div>

                    <!-- Items Table -->
                    <div style="margin-bottom: 24px;">
                        <?php foreach ($order['items'] as $item): ?>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 0; border-bottom: 1px dashed var(--coq-border); font-size: 14px;">
                                <div style="flex: 1; padding-right: 16px;">
                                    <strong style="color: var(--coq-text);"><?php echo htmlspecialchars($item['item_name']); ?></strong> &times; <?php echo $item['quantity']; ?>
                                    <?php if (!empty($item['customizations_summary'])): ?>
                                        <div style="font-size: 12px; color: var(--coq-rose-dark); margin-top: 3px;">
                                            ✦ <?php echo htmlspecialchars($item['customizations_summary']); ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <span style="font-weight: 600; color: var(--coq-text); font-family: var(--coq-font-serif); font-size: 15px;">
                                    <?php echo formatPrice($item['total_price']); ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <!-- Totals Grid -->
                    <div style="background: var(--coq-bg-soft); border-radius: var(--coq-radius-md); padding: 20px; margin-bottom: 24px; font-size: 14px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--coq-text-muted);">
                            <span>Subtotal</span>
                            <span style="font-weight: 600; color: var(--coq-text);"><?php echo formatPrice($order['subtotal']); ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--coq-text-muted);">
                            <span>Delivery Fee</span>
                            <span style="font-weight: 600; color: <?php echo $order['delivery_fee'] == 0 ? '#059669' : 'var(--coq-text)'; ?>;">
                                <?php echo $order['delivery_fee'] == 0 ? 'FREE' : formatPrice($order['delivery_fee']); ?>
                            </span>
                        </div>
                        <?php if ($order['discount_amount'] > 0): ?>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #059669;">
                                <span>Discount (Coupon: <?php echo htmlspecialchars($order['coupon_code']); ?>)</span>
                                <span style="font-weight: 600;">&minus;<?php echo formatPrice($order['discount_amount']); ?></span>
                            </div>
                        <?php endif; ?>
                        <div style="border-top: 1px solid var(--coq-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: baseline;">
                            <strong style="font-size: 16px; color: var(--coq-text); font-family: var(--coq-font-serif);">Total Paid / Due</strong>
                            <strong style="font-size: 22px; color: var(--coq-rose-dark); font-family: var(--coq-font-serif);">
                                <?php echo formatPrice($order['final_total']); ?>
                            </strong>
                        </div>
                    </div>

                    <!-- Destination & Logistics -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 13.5px; border-top: 1px solid var(--coq-border); padding-top: 20px;">
                        <div>
                            <strong style="display: block; color: var(--coq-text); margin-bottom: 6px;">Dining Type:</strong>
                            <p style="margin: 0; color: var(--coq-text-muted); line-height: 1.6;">
                                <?php if ($order['order_type'] === 'takeaway'): ?>
                                    🛍️ <strong>Takeaway / Pick-up</strong><br>
                                    Collection counter: 24, Garden Avenue, New Delhi
                                <?php else: ?>
                                    🛵 <strong>Home Delivery</strong><br>
                                    <?php echo nl2br(htmlspecialchars($order['delivery_address'])); ?>, <?php echo htmlspecialchars($order['city']); ?> &ndash; <?php echo htmlspecialchars($order['pincode']); ?><br>
                                    <?php if ($order['landmark']): ?>Landmark: <?php echo htmlspecialchars($order['landmark']); ?><br><?php endif; ?>
                                <?php endif; ?>
                            </p>
                        </div>

                        <div>
                            <strong style="display: block; color: var(--coq-text); margin-bottom: 6px;">Payment Information:</strong>
                            <p style="margin: 0; color: var(--coq-text-muted); line-height: 1.6;">
                                Method: <strong><?php echo strtoupper(htmlspecialchars($order['payment']['payment_method'] ?? 'COD')); ?></strong><br>
                                Payment Status: <span style="text-transform: capitalize; font-weight: 600; color: <?php echo ($order['payment']['payment_status'] ?? '') === 'paid' ? '#059669' : '#D97706'; ?>;"><?php echo htmlspecialchars($order['payment']['payment_status'] ?? 'unpaid'); ?></span><br>
                                Phone: <?php echo htmlspecialchars($order['customer_phone']); ?>
                            </p>
                        </div>
                    </div>

                    <?php if (!empty($order['special_instructions'])): ?>
                        <div style="margin-top: 18px; background: #FFF9FA; padding: 12px 16px; border-radius: var(--coq-radius-sm); border: 1px dashed var(--coq-border); font-size: 12.5px; color: var(--coq-text-muted);">
                            <strong>Kitchen Note:</strong> <?php echo htmlspecialchars($order['special_instructions']); ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Action CTAs -->
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="order-tracking.php?order=<?php echo urlencode($order['order_number']); ?>&phone=<?php echo urlencode($order['customer_phone']); ?>" class="coq-btn-primary">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>Track Live Progress</span>
                    </a>
                    <button type="button" onclick="window.print()" class="coq-btn-secondary">
                        <i class="fa-solid fa-print"></i>
                        <span>Print Bill Receipt</span>
                    </button>
                    <a href="menu.php" class="coq-btn-secondary">
                        <span>Order More Treats</span>
                        <i class="fa-solid fa-sparkles"></i>
                    </a>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
