<?php
$page_title = 'Live Kitchen Radar & Order Tracker ⚡';
require_once __DIR__ . '/includes/header.php';

$order_number = trim($_REQUEST['order'] ?? '');
$phone = trim($_REQUEST['phone'] ?? '');

$order = null;
$search_error = '';

if ($order_number && $phone) {
    $order = getOrderByTracking($order_number, $phone);
    if (!$order) {
        $search_error = 'No drop found for Order #' . htmlspecialchars($order_number) . ' with phone ending in ' . htmlspecialchars(substr($phone, -4)) . '. Double-check your details!';
    }
} elseif ($order_number && !$phone) {
    $directOrder = getOrderByOrderNumber($order_number);
    if ($directOrder) {
        $order = $directOrder;
        $phone = $directOrder['customer_phone'];
    } else {
        $search_error = 'Order number not found.';
    }
}

$recent_orders = $current_customer ? getCustomerOrders($current_customer['id']) : [];
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 46px 0 36px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ RADAR LIVE &bull; TRACK YOUR CRAVINGS</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">LIVE FOOD DROP RADAR</h1>
        <p style="font-size: 15px; font-weight: 700; color: var(--gen-ink); max-width: 540px; margin: 8px auto 0;">
            Track your woodfired pizza, fiery pink rigatoni, and loaded shakes in real time.
        </p>
    </div>
</div>

<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <!-- Tracking Form -->
        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 32px; max-width: 680px; margin: 0 auto 36px;">
            <h2 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase; margin: 0 0 8px; text-align: center;">
                LOCATE YOUR PEACHY DROP
            </h2>
            <p style="text-align: center; font-size: 13.5px; font-weight: 600; color: var(--gen-muted); margin: 0 0 20px;">
                Enter your order number (e.g. <code>PP-2026-ABC123</code>) and contact number used at checkout.
            </p>

            <form method="GET" action="order-tracking.php" style="display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 12px; align-items: end;">
                <div>
                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">ORDER NUMBER *</label>
                    <input type="text" name="order" required placeholder="PP-2026-XXXX" value="<?php echo htmlspecialchars($order_number); ?>" 
                           class="gen-form-control" style="width: 100%; text-transform: uppercase;">
                </div>
                <div>
                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">PHONE NUMBER *</label>
                    <input type="tel" name="phone" required placeholder="Your phone number" value="<?php echo htmlspecialchars($phone); ?>" 
                           class="gen-form-control" style="width: 100%;">
                </div>
                <button type="submit" class="gen-btn-primary" style="height: 48px; padding: 0 20px; font-size: 14px; white-space: nowrap;">
                    <span>RADAR ⚡</span>
                </button>
            </form>

            <?php if (!empty($recent_orders)): ?>
                <div style="margin-top: 18px; padding-top: 14px; border-top: 2px dashed #e4e4e7; font-size: 12px; font-weight: 700;">
                    <span style="color: var(--gen-muted); text-transform: uppercase;">Your Recent Drops:</span>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
                        <?php foreach (array_slice($recent_orders, 0, 3) as $ro): ?>
                            <a href="order-tracking.php?order=<?php echo urlencode($ro['order_number']); ?>&phone=<?php echo urlencode($ro['customer_phone']); ?>" 
                               class="gen-sticker sticker-yellow" style="text-decoration: none;">
                                <?php echo htmlspecialchars($ro['order_number']); ?> (<?php echo htmlspecialchars($ro['order_status']); ?>)
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <?php if (!empty($search_error)): ?>
            <div style="background: #fee2e2; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 12px; padding: 16px 20px; max-width: 680px; margin: 0 auto 30px; color: #991b1b; font-weight: 700; font-size: 13.5px;">
                ⚠️ <?php echo $search_error; ?>
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
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 32px; margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
                        <div>
                            <span class="gen-sticker sticker-red" style="font-size: 10px;">★ LIVE STATUS RADAR</span>
                            <h2 style="font-family: var(--gen-font-display); font-size: 24px; text-transform: uppercase; margin: 8px 0 4px;">
                                ORDER #<?php echo htmlspecialchars($order['order_number']); ?>
                            </h2>
                            <p style="margin: 0; font-size: 13.5px; font-weight: 700; color: var(--gen-muted);">
                                Customer: <?php echo htmlspecialchars($order['customer_name']); ?> &bull; Fired at <?php echo date('g:i A', strtotime($order['created_at'])); ?>
                            </p>
                        </div>

                        <div style="text-align: right;">
                            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--gen-muted); display: block; margin-bottom: 4px;">ESTIMATED DROP</span>
                            <?php if ($currentStatus === 'Delivered'): ?>
                                <span style="font-family: var(--gen-font-display); font-size: 20px; font-weight: 900; color: #059669;">DELIVERED! 🎉</span>
                            <?php elseif ($currentStatus === 'Cancelled'): ?>
                                <span style="font-family: var(--gen-font-display); font-size: 20px; font-weight: 900; color: var(--gen-red);">CANCELLED</span>
                            <?php else: ?>
                                <span style="font-family: var(--gen-font-display); font-size: 24px; font-weight: 900; color: var(--gen-red);">~<?php echo $etaMinutes; ?> MINS</span>
                            <?php endif; ?>
                        </div>
                    </div>

                    <?php if ($currentStatus === 'Cancelled'): ?>
                        <div style="background: #fee2e2; border: 2px solid var(--gen-red); border-radius: 8px; padding: 12px; font-weight: 700; color: #991b1b; font-size: 13px;">
                            This drop has been cancelled. Contact our hotline at <?php echo RESTAURANT_PHONE; ?> for assistance.
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

                    <div style="background: var(--gen-yellow); border: 2px solid var(--gen-ink); border-radius: 12px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 24px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">🛵</span>
                            <div>
                                <strong style="font-family: var(--gen-font-display); font-size: 13.5px; text-transform: uppercase; display: block;">
                                    <?php echo $order['order_type'] === 'takeaway' ? 'Diner Counter Pickup' : 'Rider Dispatched via Fleet'; ?>
                                </strong>
                                <span style="font-size: 12px; font-weight: 700; color: var(--gen-ink);">
                                    <?php echo $order['order_type'] === 'takeaway' ? '24 Garden Avenue, New Delhi' : htmlspecialchars($order['delivery_address'] . ', ' . $order['city']); ?>
                                </span>
                            </div>
                        </div>

                        <a href="https://wa.me/<?php echo RESTAURANT_PHONE_RAW; ?>?text=Hey%20Peachy%20Plate,%20checking%20on%20drop%20<?php echo urlencode($order['order_number']); ?>" 
                           target="_blank" rel="noopener" class="gen-btn-primary" style="padding: 8px 16px; font-size: 12px;">
                            <i class="fa-brands fa-whatsapp"></i>
                            <span>MESSAGE FLEET</span>
                        </a>
                    </div>
                </div>

                <!-- Order contents breakdown -->
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 26px; margin-bottom: 30px;">
                    <h3 style="font-family: var(--gen-font-display); font-size: 17px; text-transform: uppercase; margin: 0 0 16px; border-bottom: 2px solid var(--gen-ink); padding-bottom: 12px;">
                        DROPS IN THIS PACKAGE (<?php echo count($order['items']); ?>)
                    </h3>

                    <div style="margin-bottom: 16px;">
                        <?php foreach ($order['items'] as $item): ?>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e4e4e7; font-size: 13.5px; font-weight: 700;">
                                <div>
                                    <span><?php echo htmlspecialchars($item['item_name']); ?></span> &times; <?php echo $item['quantity']; ?>
                                    <?php if (!empty($item['customizations_summary'])): ?>
                                        <div style="font-size: 11px; color: var(--gen-red);">
                                            ⚡ <?php echo htmlspecialchars($item['customizations_summary']); ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <span style="font-family: var(--gen-font-display);"><?php echo formatPrice($item['total_price']); ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 2px solid var(--gen-ink); padding-top: 14px;">
                        <span style="font-size: 13px; font-weight: 700; color: var(--gen-muted);">
                            PAYMENT: <?php echo strtoupper(htmlspecialchars($order['payment']['payment_method'] ?? 'COD')); ?>
                        </span>
                        <span style="font-family: var(--gen-font-display); font-size: 20px; font-weight: 900; color: var(--gen-red);">
                            TOTAL: <?php echo formatPrice($order['final_total']); ?>
                        </span>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="menu.php" class="gen-btn-yellow">ORDER MORE DROPS ⚡</a>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
