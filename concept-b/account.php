<?php
$page_title = 'VIP Patron Account & Stash Archive ⚡';
require_once __DIR__ . '/includes/header.php';

$error_msg = '';
$success_msg = '';

if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    customerLogout();
    header('Location: account.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $res = customerLogin($_POST['email'] ?? '', $_POST['password'] ?? '');
    if ($res['success']) {
        header('Location: account.php');
        exit;
    } else {
        $error_msg = $res['error'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'register') {
    $res = customerRegister($_POST['full_name'] ?? '', $_POST['email'] ?? '', $_POST['phone'] ?? '', $_POST['password'] ?? '');
    if ($res['success']) {
        header('Location: account.php');
        exit;
    } else {
        $error_msg = $res['error'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_address' && $current_customer) {
    $line = trim($_POST['address_line'] ?? '');
    $city = trim($_POST['city'] ?? 'New Delhi');
    $pin = trim($_POST['pincode'] ?? '');
    $landmark = trim($_POST['landmark'] ?? '');

    if (strlen($line) >= 5 && strlen($pin) >= 4) {
        saveCustomerAddress($current_customer['id'], $line, $city, $pin, $landmark);
        $success_msg = 'New drop destination locked in!';
    } else {
        $error_msg = 'Valid street and pincode required.';
    }
}

$current_customer = getCurrentCustomer();
$customer_orders = $current_customer ? getCustomerOrders($current_customer['id']) : [];
$saved_addresses = $current_customer ? getCustomerAddresses($current_customer['id']) : [];
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 46px 0 36px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ VIP CLUB &bull; REWARDS &amp; HISTORY</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">
            <?php echo $current_customer ? 'WELCOME BACK, ' . strtoupper(htmlspecialchars(explode(' ', $current_customer['full_name'])[0])) . '!' : 'VIP PATRON CLUB'; ?>
        </h1>
        <p style="font-size: 15px; font-weight: 700; color: var(--gen-ink); max-width: 540px; margin: 8px auto 0;">
            Track your order archives, manage drop addresses, and access member perks.
        </p>
    </div>
</div>

<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <?php if (!empty($error_msg)): ?>
            <div style="background: #fee2e2; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 10px; padding: 12px 18px; max-width: 540px; margin: 0 auto 24px; color: #991b1b; font-weight: 800; font-size: 13.5px;">
                ⚠️ <?php echo htmlspecialchars($error_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($success_msg)): ?>
            <div style="background: #dcfce7; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 10px; padding: 12px 18px; max-width: 540px; margin: 0 auto 24px; color: #166534; font-weight: 800; font-size: 13.5px;">
                ✅ <?php echo htmlspecialchars($success_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!$current_customer): ?>
            <!-- Auth Box -->
            <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 8px 8px 0px var(--gen-ink); border-radius: 16px; padding: 32px;">
                <div style="display: flex; gap: 10px; margin-bottom: 24px;">
                    <button type="button" id="genTabLogin" onclick="switchGenAuth('login')" 
                            style="flex: 1; padding: 10px; background: var(--gen-yellow); border: 2px solid var(--gen-ink); box-shadow: 2px 2px 0px var(--gen-ink); font-family: var(--gen-font-display); font-size: 14px; font-weight: 900; text-transform: uppercase; cursor: pointer;">
                        SIGN IN
                    </button>
                    <button type="button" id="genTabReg" onclick="switchGenAuth('register')" 
                            style="flex: 1; padding: 10px; background: #ffffff; border: 2px solid var(--gen-ink); box-shadow: 2px 2px 0px var(--gen-ink); font-family: var(--gen-font-display); font-size: 14px; font-weight: 900; text-transform: uppercase; cursor: pointer;">
                        JOIN CLUB
                    </button>
                </div>

                <!-- Sign In Form -->
                <form method="POST" action="account.php" id="genLoginForm">
                    <input type="hidden" name="action" value="login">
                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">EMAIL ADDRESS</label>
                        <input type="email" name="email" required placeholder="your.name@example.com" class="gen-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">PASSWORD</label>
                        <input type="password" name="password" required placeholder="••••••••" class="gen-form-control" style="width: 100%;">
                    </div>
                    <button type="submit" class="gen-btn-primary" style="width: 100%; justify-content: center; padding: 14px;">
                        <span>ENTER VIP PORTAL ⚡</span>
                    </button>
                </form>

                <!-- Register Form -->
                <form method="POST" action="account.php" id="genRegForm" style="display: none;">
                    <input type="hidden" name="action" value="register">
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">FULL NAME *</label>
                        <input type="text" name="full_name" required placeholder="Kabir Sethi" class="gen-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">EMAIL ADDRESS *</label>
                        <input type="email" name="email" required placeholder="kabir@example.com" class="gen-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">PHONE NUMBER *</label>
                        <input type="tel" name="phone" required placeholder="+91 98765 43210" class="gen-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 18px;">
                        <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">CREATE PASSWORD *</label>
                        <input type="password" name="password" required minlength="6" placeholder="Min 6 characters" class="gen-form-control" style="width: 100%;">
                    </div>
                    <button type="submit" class="gen-btn-yellow" style="width: 100%; justify-content: center; padding: 14px;">
                        <span>JOIN PEACH CLUB NOW ⚡</span>
                    </button>
                </form>
            </div>

        <?php else: ?>

            <div style="display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start;">
                
                <!-- Sidebar -->
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 10px;">⚡</div>
                    <h3 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase; margin: 0 0 4px;">
                        <?php echo htmlspecialchars($current_customer['full_name']); ?>
                    </h3>
                    <p style="margin: 0 0 16px; font-size: 12.5px; font-weight: 700; color: var(--gen-muted);">
                        <?php echo htmlspecialchars($current_customer['email']); ?><br>
                        <?php echo htmlspecialchars($current_customer['phone']); ?>
                    </p>

                    <div style="background: var(--gen-cream); border: 2px solid var(--gen-ink); border-radius: 10px; padding: 12px; margin-bottom: 18px; font-size: 12px; font-weight: 700; text-align: left;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>TOTAL DROPS:</span>
                            <span style="color: var(--gen-red);"><?php echo count($customer_orders); ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>SAVED DROPS:</span>
                            <span style="color: var(--gen-red);"><?php echo $wishlist_count; ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>VIP SINCE:</span>
                            <span><?php echo date('M Y', strtotime($current_customer['created_at'])); ?></span>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <a href="wishlist.php" class="gen-btn-yellow" style="justify-content: center; font-size: 12px; text-decoration: none;">
                            VIEW SAVED DROPS (<?php echo $wishlist_count; ?>)
                        </a>
                        <a href="account.php?action=logout" class="gen-btn-primary" style="justify-content: center; font-size: 12px; background: #fee2e2; color: #dc2626; border-color: var(--gen-ink); text-decoration: none;">
                            SIGN OUT
                        </a>
                    </div>
                </div>

                <!-- Main -->
                <div>
                    
                    <!-- Past Orders -->
                    <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 26px; margin-bottom: 30px;">
                        <h2 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase; margin: 0 0 16px; border-bottom: 2px solid var(--gen-ink); padding-bottom: 10px;">
                            DROP ARCHIVES
                        </h2>

                        <?php if (empty($customer_orders)): ?>
                            <div style="text-align: center; padding: 36px 10px;">
                                <span style="font-size: 32px;">🍕</span>
                                <p style="font-weight: 700; color: var(--gen-muted); margin: 8px 0 16px;">No food drops recorded yet.</p>
                                <a href="menu.php" class="gen-btn-primary">EXPLORE MENU DROPS ⚡</a>
                            </div>
                        <?php else: ?>
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                <?php foreach ($customer_orders as $ord): ?>
                                    <div style="background: var(--gen-cream); border: 2px solid var(--gen-ink); border-radius: 10px; padding: 16px;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                                            <div>
                                                <strong style="font-family: var(--gen-font-display); font-size: 15px;">#<?php echo htmlspecialchars($ord['order_number']); ?></strong>
                                                <span style="font-size: 11.5px; font-weight: 700; color: var(--gen-muted); display: block;">
                                                    <?php echo date('d M Y, h:i A', strtotime($ord['created_at'])); ?> &bull; <?php echo strtoupper($ord['order_type']); ?>
                                                </span>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 10px;">
                                                <span class="gen-sticker sticker-yellow" style="font-size: 10px;"><?php echo strtoupper($ord['order_status']); ?></span>
                                                <strong style="font-family: var(--gen-font-display); font-size: 17px; color: var(--gen-red);"><?php echo formatPrice($ord['final_total']); ?></strong>
                                            </div>
                                        </div>

                                        <div style="font-size: 12.5px; font-weight: 600; color: var(--gen-muted); margin-bottom: 12px;">
                                            <?php 
                                                $parts = [];
                                                foreach ($ord['items'] as $oi) {
                                                    $parts[] = htmlspecialchars($oi['item_name']) . ' &times;' . $oi['quantity'];
                                                }
                                                echo implode(' &bull; ', $parts);
                                            ?>
                                        </div>

                                        <div style="display: flex; gap: 8px; justify-content: flex-end;">
                                            <a href="order-tracking.php?order=<?php echo urlencode($ord['order_number']); ?>&phone=<?php echo urlencode($ord['customer_phone']); ?>" class="gen-btn-yellow" style="padding: 5px 12px; font-size: 11px;">
                                                TRACK LIVE
                                            </a>
                                            <a href="order-confirmation.php?order=<?php echo urlencode($ord['order_number']); ?>" class="gen-btn-yellow" style="padding: 5px 12px; font-size: 11px;">
                                                RECEIPT
                                            </a>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Saved Delivery Spots -->
                    <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 26px;">
                        <h2 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase; margin: 0 0 16px; border-bottom: 2px solid var(--gen-ink); padding-bottom: 10px;">
                            SAVED DROP SPOTS
                        </h2>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">
                            <?php foreach ($saved_addresses as $addr): ?>
                                <div style="background: var(--gen-cream); border: 2px solid var(--gen-ink); border-radius: 10px; padding: 12px; font-size: 12.5px; font-weight: 600;">
                                    <strong style="display: block; font-family: var(--gen-font-display); margin-bottom: 4px;">📍 SPOT</strong>
                                    <?php echo htmlspecialchars($addr['address_line']); ?><br>
                                    <?php echo htmlspecialchars($addr['city']); ?> &ndash; <?php echo htmlspecialchars($addr['pincode']); ?><br>
                                    <?php if ($addr['landmark']): ?>Near: <?php echo htmlspecialchars($addr['landmark']); ?><?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        </div>

                        <h3 style="font-family: var(--gen-font-display); font-size: 14px; text-transform: uppercase; margin: 0 0 10px;">
                            + LOCK IN NEW DROP SPOT
                        </h3>
                        <form method="POST" action="account.php" style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; align-items: end;">
                            <input type="hidden" name="action" value="add_address">
                            <input type="text" name="address_line" required placeholder="Street / House Number" class="gen-form-control" style="font-size: 12px;">
                            <input type="text" name="pincode" required placeholder="Pincode" class="gen-form-control" style="font-size: 12px;">
                            <button type="submit" class="gen-btn-yellow" style="padding: 10px; font-size: 12px; justify-content: center;">SAVE</button>
                        </form>
                    </div>

                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<script>
function switchGenAuth(tab) {
    const lForm = document.getElementById('genLoginForm');
    const rForm = document.getElementById('genRegForm');
    const lBtn = document.getElementById('genTabLogin');
    const rBtn = document.getElementById('genTabReg');

    if (tab === 'login') {
        lForm.style.display = 'block';
        rForm.style.display = 'none';
        lBtn.style.background = 'var(--gen-yellow)';
        rBtn.style.background = '#ffffff';
    } else {
        lForm.style.display = 'none';
        rForm.style.display = 'block';
        rBtn.style.background = 'var(--gen-yellow)';
        lBtn.style.background = '#ffffff';
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
