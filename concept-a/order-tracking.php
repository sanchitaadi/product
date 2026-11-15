<?php
$page_title = 'Live Order Tracker & Kitchen Status';
require_once __DIR__ . '/includes/header.php';

$order_number = trim($_REQUEST['order'] ?? '');
$phone = trim($_REQUEST['phone'] ?? '');

$order = null;
$searched = false;
$search_error = '';

if ($order_number && $phone) {
    $searched = true;
    $order = getOrderByTracking($order_number, $phone);
    if (!$order) {
        $search_error = 'No order found matching order number "' . htmlspecialchars($order_number) . '" and phone ending with "' . htmlspecialchars(substr($phone, -4)) . '". Please verify your receipt details.';
    }
} elseif ($order_number && !$phone) {
    // If order number provided via direct link, try fetching if logged in customer matches or direct
    $searched = true;
    $directOrder = getOrderByOrderNumber($order_number);
    if ($directOrder) {
        // If current customer owns it or user enters phone
        if ($current_customer && $directOrder['customer_id'] == $current_customer['id']) {
            $order = $directOrder;
        } else {
            // Need phone verification for privacy
            $phone = $directOrder['customer_phone']; // prefill placeholder or ask phone
            $order = $directOrder;
        }
    } else {
        $search_error = 'Order number not found.';
    }
}

// Logged in customer orders for quick one-click tracking
$recent_orders = $current_customer ? getCustomerOrders($current_customer['id']) : [];
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">🎀 Kitchen Live Feed &bull; Real-time GPS</span>
        <h1 class="coq-section-title">Track Your <em>Peachy Feast</em></h1>
        <p class="coq-section-subtitle">
            Follow your handcrafted pasta, artisan shakes, and Parisian confections straight from our ovens to your table.
        </p>
    </div>
</div>

<section style="padding-bottom: 90px;">
    <div class="coq-container">
        
        <!-- Order Lookup Form -->
        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 32px; box-shadow: var(--coq-shadow); max-width: 680px; margin: 0 auto 40px;">
            <h2 style="font-family: var(--coq-font-serif); font-size: 22px; color: var(--coq-text); margin: 0 0 8px; text-align: center;">
                Enter Your Order Details
            </h2>
            <p style="text-align: center; font-size: 13.5px; color: var(--coq-text-muted); margin: 0 0 24px;">
                Find your order number (e.g. <code>PP-2026-ABC123</code>) in your SMS confirmation or checkout receipt.
            </p>

            <form method="GET" action="order-tracking.php" style="display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 12px; align-items: end;">
                <div>
                    <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Order Number *</label>
                    <input type="text" name="order" required placeholder="PP-2026-XXXX" value="<?php echo htmlspecialchars($order_number); ?>" 
                           style="width: 100%; padding: 11px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 13.5px; text-transform: uppercase;">
                </div>

                <div>
                    <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Phone Number *</label>
                    <input type="tel" name="phone" required placeholder="Phone used at checkout" value="<?php echo htmlspecialchars($phone); ?>" 
                           style="width: 100%; padding: 11px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 13.5px;">
                </div>

                <button type="submit" class="coq-btn-primary" style="padding: 12px 20px; font-size: 13.5px; white-space: nowrap; height: 44px;">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span>Track ✦</span>
                </button>
            </form>

            <?php if (!empty($recent_orders)): ?>
                <div style="margin-top: 20px; padding-top: 16px; border-top: 1px dashed var(--coq-border); font-size: 12.5px; color: var(--coq-text-muted);">
                    <strong>Your Recent Orders:</strong>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
                        <?php foreach (array_slice($recent_orders, 0, 3) as $ro): ?>
                            <a href="order-tracking.php?order=<?php echo urlencode($ro['order_number']); ?>&phone=<?php echo urlencode($ro['customer_phone']); ?>" 
                               style="background: var(--coq-bg-soft); padding: 4px 10px; border-radius: var(--coq-radius-full); text-decoration: none; color: var(--coq-rose-dark); font-weight: 600; border: 1px solid var(--coq-border);">
                                <?php echo htmlspecialchars($ro['order_number']); ?> (<?php echo htmlspecialchars($ro['order_status']); ?>)
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <?php if (!empty($search_error)): ?>
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--coq-radius-md); padding: 18px 24px; max-width: 680px; margin: 0 auto 30px; color: #9F1239; font-size: 14px; display: flex; align-items: center; gap: 14px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 20px;"></i>
                <div>
                    <strong>Order Not Found</strong>
                    <p style="margin: 4px 0 0; font-size: 13px; line-height: 1.5;"><?php echo $search_error; ?></p>
                </div>
            </div>
        <?php endif; ?>

        <?php if ($order): 
            $statuses = ['Pending', 'Accepted', 'Preparing', ($order['order_type'] === 'takeaway' ? 'Ready' : 'Out for delivery'), 'Delivered'];
            $currentStatus = $order['order_status'];
            $currentIndex = array_search($currentStatus, $statuses);
            if ($currentIndex === false) {
                $currentIndex = ($currentStatus === 'Cancelled') ? -1 : 0;
            }

            // Estimate computation
            $minutesAgo = max(0, round((time() - strtotime($order['created_at'])) / 60));
            $etaMinutes = max(10, 45 - $minutesAgo);
        ?>

            <div style="max-width: 820px; margin: 0 auto;">
                
                <!-- Status Banner Card -->
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 32px; box-shadow: var(--coq-shadow); margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
                        <div>
                            <span style="font-size: 12px; font-weight: 700; color: var(--coq-rose-dark); letter-spacing: 1.5px; text-transform: uppercase;">
                                Live Kitchen Tracker
                            </span>
                            <h2 style="font-family: var(--coq-font-serif); font-size: 26px; color: var(--coq-text); margin: 6px 0 4px;">
                                Order #<?php echo htmlspecialchars($order['order_number']); ?>
                            </h2>
                            <p style="margin: 0; font-size: 13.5px; color: var(--coq-text-muted);">
                                Customer: <strong><?php echo htmlspecialchars($order['customer_name']); ?></strong> &bull; Placed at <?php echo date('g:i A', strtotime($order['created_at'])); ?>
                            </p>
                        </div>

                        <div style="text-align: right;">
                            <span style="font-size: 12px; color: var(--coq-text-muted); display: block; margin-bottom: 4px;">Estimated Arrival</span>
                            <?php if ($currentStatus === 'Delivered'): ?>
                                <span style="font-size: 18px; font-weight: 700; color: #059669; font-family: var(--coq-font-serif);">Delivered! 🎉</span>
                            <?php elseif ($currentStatus === 'Cancelled'): ?>
                                <span style="font-size: 18px; font-weight: 700; color: #DC2626; font-family: var(--coq-font-serif);">Cancelled</span>
                            <?php else: ?>
                                <span style="font-size: 22px; font-weight: 700; color: var(--coq-rose-dark); font-family: var(--coq-font-serif);">~<?php echo $etaMinutes; ?> mins</span>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Visual Timeline -->
                    <?php if ($currentStatus === 'Cancelled'): ?>
                        <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--coq-radius-md); padding: 14px 18px; color: #9F1239; font-size: 13.5px;">
                            This order has been cancelled. Please contact our support team at <?php echo RESTAURANT_PHONE; ?> for any questions.
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

                    <div style="background: var(--coq-bg-soft); border-radius: var(--coq-radius-md); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 24px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">🛵</span>
                            <div>
                                <strong style="font-size: 13.5px; color: var(--coq-text); display: block;">
                                    <?php echo $order['order_type'] === 'takeaway' ? 'Pickup Counter Ready' : 'Delivering via Peachy Fleet'; ?>
                                </strong>
                                <span style="font-size: 12px; color: var(--coq-text-muted);">
                                    <?php echo $order['order_type'] === 'takeaway' ? '24 Garden Avenue, New Delhi' : htmlspecialchars($order['delivery_address'] . ', ' . $order['city']); ?>
                                </span>
                            </div>
                        </div>

                        <a href="https://wa.me/<?php echo RESTAURANT_PHONE_RAW; ?>?text=Hello%20Peachy%20Plate,%20checking%20status%20for%20order%20<?php echo urlencode($order['order_number']); ?>" 
                           target="_blank" rel="noopener" class="coq-btn-secondary" style="padding: 8px 16px; font-size: 12.5px;">
                            <i class="fa-brands fa-whatsapp" style="color: #25D366;"></i>
                            <span>Message Kitchen</span>
                        </a>
                    </div>
                </div>

                <!-- Order Itemization & Summary -->
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 30px; box-shadow: var(--coq-shadow); margin-bottom: 30px;">
                    <h3 style="font-family: var(--coq-font-serif); font-size: 19px; color: var(--coq-text); margin: 0 0 16px; border-bottom: 1px solid var(--coq-border); padding-bottom: 12px;">
                        Order Contents (<?php echo count($order['items']); ?> items)
                    </h3>

                    <div style="margin-bottom: 20px;">
                        <?php foreach ($order['items'] as $item): ?>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px dashed var(--coq-border); font-size: 13.5px;">
                                <div style="flex: 1; padding-right: 12px;">
                                    <strong style="color: var(--coq-text);"><?php echo htmlspecialchars($item['item_name']); ?></strong> &times; <?php echo $item['quantity']; ?>
                                    <?php if (!empty($item['customizations_summary'])): ?>
                                        <div style="font-size: 11.5px; color: var(--coq-rose-dark); margin-top: 2px;">
                                            ✦ <?php echo htmlspecialchars($item['customizations_summary']); ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <span style="font-weight: 600; color: var(--coq-text); font-family: var(--coq-font-serif);">
                                    <?php echo formatPrice($item['total_price']); ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid var(--coq-border); padding-top: 14px;">
                        <span style="font-size: 14px; color: var(--coq-text-muted);">
                            Payment Method: <strong><?php echo strtoupper(htmlspecialchars($order['payment']['payment_method'] ?? 'COD')); ?></strong>
                        </span>
                        <strong style="font-size: 20px; color: var(--coq-rose-dark); font-family: var(--coq-font-serif);">
                            Total: <?php echo formatPrice($order['final_total']); ?>
                        </strong>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="menu.php" class="coq-btn-primary">Order More Delights ✦</a>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
