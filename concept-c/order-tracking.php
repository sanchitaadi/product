<?php
$page_title = 'Atelier Culinary Tracking & Order Status';
require_once __DIR__ . '/includes/header.php';

$order_number = trim($_REQUEST['order'] ?? '');
$phone = trim($_REQUEST['phone'] ?? '');

$order = null;
$search_error = '';

if ($order_number && $phone) {
    $order = getOrderByTracking($order_number, $phone);
    if (!$order) {
        $search_error = 'We were unable to locate an atelier order matching reference #' . htmlspecialchars($order_number) . ' with the provided contact ending in ' . htmlspecialchars(substr($phone, -4)) . '.';
    }
} elseif ($order_number && !$phone) {
    $directOrder = getOrderByOrderNumber($order_number);
    if ($directOrder) {
        $order = $directOrder;
        $phone = $directOrder['customer_phone'];
    } else {
        $search_error = 'Order reference not found.';
    }
}

$recent_orders = $current_customer ? getCustomerOrders($current_customer['id']) : [];
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Atelier Concierge &bull; Live Feed</span>
        <h1 class="lux-section-title">Track Your <em>Culinary Order</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Monitor the progress of your private dining order from our brigade's scratch preparation to your doorstep.
        </p>
    </div>
</div>

<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <!-- Tracking Form -->
        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px; max-width: 680px; margin: 0 auto 36px; box-shadow: var(--lux-shadow);">
            <h2 style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 6px; text-align: center;">
                Locate Your Reservation or Order
            </h2>
            <p style="text-align: center; font-size: 13.5px; color: var(--lux-muted); margin: 0 0 24px;">
                Enter your order reference number (e.g. <code>PP-2026-ABC123</code>) and contact number.
            </p>

            <form method="GET" action="order-tracking.php" style="display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 12px; align-items: end;">
                <div>
                    <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Order Reference *</label>
                    <input type="text" name="order" required placeholder="PP-2026-XXXX" value="<?php echo htmlspecialchars($order_number); ?>" 
                           class="lux-form-control" style="width: 100%; text-transform: uppercase;">
                </div>
                <div>
                    <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Telephone Number *</label>
                    <input type="tel" name="phone" required placeholder="Your phone number" value="<?php echo htmlspecialchars($phone); ?>" 
                           class="lux-form-control" style="width: 100%;">
                </div>
                <button type="submit" class="lux-btn-primary" style="height: 48px; padding: 0 22px; font-size: 11px;">
                    <span>Locate</span>
                </button>
            </form>

            <?php if (!empty($recent_orders)): ?>
                <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--lux-border); font-size: 12px;">
                    <span style="color: var(--lux-muted); text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Recent Patron Orders:</span>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <?php foreach (array_slice($recent_orders, 0, 3) as $ro): ?>
                            <a href="order-tracking.php?order=<?php echo urlencode($ro['order_number']); ?>&phone=<?php echo urlencode($ro['customer_phone']); ?>" 
                               class="lux-btn-secondary" style="padding: 4px 12px; font-size: 11px;">
                                <?php echo htmlspecialchars($ro['order_number']); ?> (<?php echo htmlspecialchars($ro['order_status']); ?>)
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <?php if (!empty($search_error)): ?>
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 16px 20px; max-width: 680px; margin: 0 auto 30px; color: #9F1239; font-size: 13.5px;">
                ✦ <?php echo $search_error; ?>
            </div>
        <?php endif; ?>

        <?php if ($order): 
            $statuses = ['Pending', 'Accepted', 'Preparing', ($order['order_type'] === 'takeaway' ? 'Ready' : 'Out for delivery'), 'Delivered'];
            $currentStatus = $order['order_status'];
            $currentIndex = array_search($currentStatus, $statuses);
            if ($currentIndex === false) {
                $currentIndex = ($currentStatus === 'Cancelled') ? -1 : 0;
            }

            $minutesAgo = max(0, round((time() - strtotime($order['created_at'])) / 60));
            $etaMinutes = max(10, 45 - $minutesAgo);
        ?>

            <div style="max-width: 820px; margin: 0 auto;">
                
                <!-- Status Card -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 32px; box-shadow: var(--lux-shadow); margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
                        <div>
                            <span class="lux-tag" style="margin-bottom: 6px; display: inline-block;">Live Atelier Feed</span>
                            <h2 style="font-family: var(--lux-font-serif); font-size: 24px; font-weight: 500; color: var(--lux-espresso); margin: 4px 0;">
                                Reference #<?php echo htmlspecialchars($order['order_number']); ?>
                            </h2>
                            <p style="margin: 0; font-size: 13px; color: var(--lux-muted);">
                                Patron: <?php echo htmlspecialchars($order['customer_name']); ?> &bull; Received at <?php echo date('g:i A', strtotime($order['created_at'])); ?>
                            </p>
                        </div>

                        <div style="text-align: right;">
                            <span style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted); display: block; margin-bottom: 4px;">Fulfillment Estimate</span>
                            <?php if ($currentStatus === 'Delivered'): ?>
                                <span style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 600; color: #059669;">Delivered</span>
                            <?php elseif ($currentStatus === 'Cancelled'): ?>
                                <span style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 600; color: #9F1239;">Cancelled</span>
                            <?php else: ?>
                                <span style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 600; color: var(--lux-espresso);">~<?php echo $etaMinutes; ?> mins</span>
                            <?php endif; ?>
                        </div>
                    </div>

                    <?php if ($currentStatus === 'Cancelled'): ?>
                        <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 14px; color: #9F1239; font-size: 13px;">
                            This order was cancelled. Please contact our concierge at <?php echo RESTAURANT_PHONE; ?> for inquiries.
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

                    <div style="background: #FAF7F2; border: 1px solid var(--lux-border); border-radius: 6px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 24px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">🛵</span>
                            <div>
                                <strong style="font-size: 13px; color: var(--lux-espresso); display: block;">
                                    <?php echo $order['order_type'] === 'takeaway' ? 'Maison Salon Pickup' : 'Private Concierge Chauffeur'; ?>
                                </strong>
                                <span style="font-size: 12px; color: var(--lux-muted);">
                                    <?php echo $order['order_type'] === 'takeaway' ? '24 Garden Avenue, New Delhi' : htmlspecialchars($order['delivery_address'] . ', ' . $order['city']); ?>
                                </span>
                            </div>
                        </div>

                        <a href="https://wa.me/<?php echo RESTAURANT_PHONE_RAW; ?>?text=Hello%20Peachy%20Plate%20Concierge,%20inquiring%20about%20order%20reference%20<?php echo urlencode($order['order_number']); ?>" 
                           target="_blank" rel="noopener" class="lux-btn-secondary" style="padding: 7px 16px; font-size: 11px;">
                            <i class="fa-brands fa-whatsapp" style="color: #059669;"></i>
                            <span>Message Concierge</span>
                        </a>
                    </div>
                </div>

                <!-- Order Itemization -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 30px; box-shadow: var(--lux-shadow); margin-bottom: 30px;">
                    <h3 style="font-family: var(--lux-font-serif); font-size: 19px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 16px; border-bottom: 1px solid var(--lux-border); padding-bottom: 12px;">
                        Selections (<?php echo count($order['items']); ?> items)
                    </h3>

                    <div style="margin-bottom: 16px;">
                        <?php foreach ($order['items'] as $item): ?>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(44, 30, 26, 0.08); font-size: 13px;">
                                <div>
                                    <span style="color: var(--lux-espresso); font-weight: 500;"><?php echo htmlspecialchars($item['item_name']); ?></span> &times; <?php echo $item['quantity']; ?>
                                    <?php if (!empty($item['customizations_summary'])): ?>
                                        <div style="font-size: 11px; color: var(--lux-gold);">
                                            ✦ <?php echo htmlspecialchars($item['customizations_summary']); ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <span style="font-family: var(--lux-font-serif); font-weight: 600;"><?php echo formatPrice($item['total_price']); ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid var(--lux-border); padding-top: 14px;">
                        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--lux-muted);">
                            Settlement: <?php echo strtoupper(htmlspecialchars($order['payment']['payment_method'] ?? 'COD')); ?>
                        </span>
                        <span style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 600; color: var(--lux-espresso);">
                            Total: <?php echo formatPrice($order['final_total']); ?>
                        </span>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="menu.php" class="lux-btn-primary">Explore Further Creations</a>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
