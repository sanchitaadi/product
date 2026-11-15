<?php
$page_title = 'Patron Membership & Dining Archive';
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
        $success_msg = 'Dining residence recorded.';
    } else {
        $error_msg = 'Valid address line and postal code required.';
    }
}

$current_customer = getCurrentCustomer();
$customer_orders = $current_customer ? getCustomerOrders($current_customer['id']) : [];
$saved_addresses = $current_customer ? getCustomerAddresses($current_customer['id']) : [];
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Patron Sanctuary &bull; Private Access</span>
        <h1 class="lux-section-title">
            <?php echo $current_customer ? 'Welcome, <em>' . htmlspecialchars(explode(' ', $current_customer['full_name'])[0]) . '</em>' : 'Patron <em>Sanctuary</em>'; ?>
        </h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Review your atelier dining history, manage your private residences, and access curated seasonal invitations.
        </p>
    </div>
</div>

<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <?php if (!empty($error_msg)): ?>
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 12px 18px; max-width: 540px; margin: 0 auto 24px; color: #9F1239; font-size: 13.5px;">
                ✦ <?php echo htmlspecialchars($error_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($success_msg)): ?>
            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 4px; padding: 12px 18px; max-width: 540px; margin: 0 auto 24px; color: #166534; font-size: 13.5px;">
                ✦ <?php echo htmlspecialchars($success_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!$current_customer): ?>
            <!-- Auth Box -->
            <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px; box-shadow: var(--lux-shadow);">
                <div style="display: flex; border-bottom: 1px solid var(--lux-border); margin-bottom: 26px;">
                    <button type="button" id="luxTabLogin" onclick="switchLuxAuth('login')" 
                            style="flex: 1; padding: 12px; background: none; border: none; border-bottom: 2px solid var(--lux-espresso); font-family: var(--lux-font-serif); font-size: 16px; color: var(--lux-espresso); cursor: pointer;">
                        Patron Sign In
                    </button>
                    <button type="button" id="luxTabReg" onclick="switchLuxAuth('register')" 
                            style="flex: 1; padding: 12px; background: none; border: none; border-bottom: 2px solid transparent; font-family: var(--lux-font-serif); font-size: 16px; color: var(--lux-muted); cursor: pointer;">
                        Join Sanctuary
                    </button>
                </div>

                <!-- Sign In Form -->
                <form method="POST" action="account.php" id="luxLoginForm">
                    <input type="hidden" name="action" value="login">
                    <div style="margin-bottom: 16px;">
                        <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Email Address</label>
                        <input type="email" name="email" required placeholder="your.name@example.com" class="lux-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 22px;">
                        <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Password</label>
                        <input type="password" name="password" required placeholder="••••••••" class="lux-form-control" style="width: 100%;">
                    </div>
                    <button type="submit" class="lux-btn-primary" style="width: 100%; justify-content: center; padding: 13px;">
                        <span>Access Sanctuary</span>
                    </button>
                </form>

                <!-- Register Form -->
                <form method="POST" action="account.php" id="luxRegForm" style="display: none;">
                    <input type="hidden" name="action" value="register">
                    <div style="margin-bottom: 14px;">
                        <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Full Name *</label>
                        <input type="text" name="full_name" required placeholder="Meera Singhania" class="lux-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Email Address *</label>
                        <input type="email" name="email" required placeholder="meera@example.com" class="lux-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Telephone Number *</label>
                        <input type="tel" name="phone" required placeholder="+91 98765 43210" class="lux-form-control" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label class="lux-label" style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Create Password *</label>
                        <input type="password" name="password" required minlength="6" placeholder="Min. 6 characters" class="lux-form-control" style="width: 100%;">
                    </div>
                    <button type="submit" class="lux-btn-primary" style="width: 100%; justify-content: center; padding: 13px;">
                        <span>Create Patron Membership</span>
                    </button>
                </form>
            </div>

        <?php else: ?>

            <div style="display: grid; grid-template-columns: 280px 1fr; gap: 36px; align-items: start;">
                
                <!-- Sidebar -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow); text-align: center;">
                    <div style="width: 68px; height: 68px; border-radius: 50%; background: #FAF7F2; border: 1px solid var(--lux-border); color: var(--lux-gold); display: flex; align-items: center; justify-content: center; font-size: 26px; margin: 0 auto 14px;">
                        🍸
                    </div>
                    <h3 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 4px;">
                        <?php echo htmlspecialchars($current_customer['full_name']); ?>
                    </h3>
                    <p style="margin: 0 0 16px; font-size: 12px; color: var(--lux-muted);">
                        <?php echo htmlspecialchars($current_customer['email']); ?><br>
                        <?php echo htmlspecialchars($current_customer['phone']); ?>
                    </p>

                    <div style="background: #FAF7F2; border-radius: 4px; padding: 12px; margin-bottom: 20px; font-size: 12px; text-align: left;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="color: var(--lux-muted);">Atelier Orders:</span>
                            <strong style="color: var(--lux-espresso);"><?php echo count($customer_orders); ?></strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="color: var(--lux-muted);">Curated Favorites:</span>
                            <strong style="color: var(--lux-espresso);"><?php echo $wishlist_count; ?></strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: var(--lux-muted);">Patron Since:</span>
                            <span><?php echo date('M Y', strtotime($current_customer['created_at'])); ?></span>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <a href="wishlist.php" class="lux-btn-secondary" style="justify-content: center; font-size: 11px;">
                            Saved Collection (<?php echo $wishlist_count; ?>)
                        </a>
                        <a href="account.php?action=logout" class="lux-btn-secondary" style="justify-content: center; font-size: 11px; color: #dc2626;">
                            Sign Out
                        </a>
                    </div>
                </div>

                <!-- Main -->
                <div>
                    
                    <!-- Past Orders -->
                    <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow); margin-bottom: 30px;">
                        <h2 style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 18px; border-bottom: 1px solid var(--lux-border); padding-bottom: 12px;">
                            Dining Archive
                        </h2>

                        <?php if (empty($customer_orders)): ?>
                            <div style="text-align: center; padding: 40px 10px;">
                                <span style="font-size: 30px;">🍽️</span>
                                <p style="color: var(--lux-muted); font-size: 14px; margin: 8px 0 16px;">You have no prior recorded dining orders.</p>
                                <a href="menu.php" class="lux-btn-primary" style="font-size: 11px;">Explore Carte du Jour</a>
                            </div>
                        <?php else: ?>
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                <?php foreach ($customer_orders as $ord): ?>
                                    <div style="background: #FAF7F2; border: 1px solid var(--lux-border); border-radius: 4px; padding: 18px;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
                                            <div>
                                                <strong style="font-size: 14px; color: var(--lux-espresso);">Reference #<?php echo htmlspecialchars($ord['order_number']); ?></strong>
                                                <span style="font-size: 11.5px; color: var(--lux-muted); display: block;">
                                                    <?php echo date('d M Y, h:i A', strtotime($ord['created_at'])); ?> &bull; <?php echo ucfirst($ord['order_type']); ?>
                                                </span>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 10px;">
                                                <span style="font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--lux-gold); font-weight: 600; border: 1px solid var(--lux-border); padding: 3px 8px; border-radius: 4px; background: #ffffff;">
                                                    <?php echo htmlspecialchars($ord['order_status']); ?>
                                                </span>
                                                <strong style="font-family: var(--lux-font-serif); font-size: 17px; color: var(--lux-espresso);">
                                                    <?php echo formatPrice($ord['final_total']); ?>
                                                </strong>
                                            </div>
                                        </div>

                                        <div style="font-size: 12.5px; color: var(--lux-muted); margin-bottom: 12px;">
                                            <?php 
                                                $parts = [];
                                                foreach ($ord['items'] as $oi) {
                                                    $parts[] = htmlspecialchars($oi['item_name']) . ' &times;' . $oi['quantity'];
                                                }
                                                echo implode(', ', $parts);
                                            ?>
                                        </div>

                                        <div style="display: flex; gap: 8px; justify-content: flex-end;">
                                            <a href="order-tracking.php?order=<?php echo urlencode($ord['order_number']); ?>&phone=<?php echo urlencode($ord['customer_phone']); ?>" class="lux-btn-secondary" style="padding: 4px 12px; font-size: 10.5px;">
                                                Track Progress
                                            </a>
                                            <a href="order-confirmation.php?order=<?php echo urlencode($ord['order_number']); ?>" class="lux-btn-secondary" style="padding: 4px 12px; font-size: 10.5px;">
                                                View Receipt
                                            </a>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Saved Residences -->
                    <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow);">
                        <h2 style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 18px; border-bottom: 1px solid var(--lux-border); padding-bottom: 12px;">
                            Dining Residences
                        </h2>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 22px;">
                            <?php foreach ($saved_addresses as $addr): ?>
                                <div style="background: #FAF7F2; border: 1px solid var(--lux-border); border-radius: 4px; padding: 14px; font-size: 12.5px;">
                                    <strong style="display: block; color: var(--lux-espresso); margin-bottom: 4px;">📍 Residence</strong>
                                    <?php echo htmlspecialchars($addr['address_line']); ?><br>
                                    <?php echo htmlspecialchars($addr['city']); ?> &ndash; <?php echo htmlspecialchars($addr['pincode']); ?><br>
                                    <?php if ($addr['landmark']): ?>Near: <?php echo htmlspecialchars($addr['landmark']); ?><?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        </div>

                        <h3 style="font-family: var(--lux-font-serif); font-size: 16px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 10px;">
                            + Record Additional Residence
                        </h3>
                        <form method="POST" action="account.php" style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; align-items: end;">
                            <input type="hidden" name="action" value="add_address">
                            <input type="text" name="address_line" required placeholder="Street address or residence" class="lux-form-control" style="font-size: 12px;">
                            <input type="text" name="pincode" required placeholder="Pincode" class="lux-form-control" style="font-size: 12px;">
                            <button type="submit" class="lux-btn-primary" style="padding: 11px; font-size: 10px; justify-content: center;">Record</button>
                        </form>
                    </div>

                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<script>
function switchLuxAuth(tab) {
    const lForm = document.getElementById('luxLoginForm');
    const rForm = document.getElementById('luxRegForm');
    const lBtn = document.getElementById('luxTabLogin');
    const rBtn = document.getElementById('luxTabReg');

    if (tab === 'login') {
        lForm.style.display = 'block';
        rForm.style.display = 'none';
        lBtn.style.borderBottomColor = 'var(--lux-espresso)';
        lBtn.style.color = 'var(--lux-espresso)';
        rBtn.style.borderBottomColor = 'transparent';
        rBtn.style.color = 'var(--lux-muted)';
    } else {
        lForm.style.display = 'none';
        rForm.style.display = 'block';
        rBtn.style.borderBottomColor = 'var(--lux-espresso)';
        rBtn.style.color = 'var(--lux-espresso)';
        lBtn.style.borderBottomColor = 'transparent';
        lBtn.style.color = 'var(--lux-muted)';
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
