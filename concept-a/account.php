<?php
$page_title = 'Patron Account & Order History';
require_once __DIR__ . '/includes/header.php';

$error_msg = '';
$success_msg = '';

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    customerLogout();
    header('Location: account.php');
    exit;
}

// Handle Login Form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $res = customerLogin($_POST['email'] ?? '', $_POST['password'] ?? '');
    if ($res['success']) {
        header('Location: account.php');
        exit;
    } else {
        $error_msg = $res['error'];
    }
}

// Handle Register Form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'register') {
    $res = customerRegister($_POST['full_name'] ?? '', $_POST['email'] ?? '', $_POST['phone'] ?? '', $_POST['password'] ?? '');
    if ($res['success']) {
        $success_msg = 'Account created successfully! Welcome to the Peach Club.';
        header('Location: account.php');
        exit;
    } else {
        $error_msg = $res['error'];
    }
}

// Handle Add Address
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_address' && $current_customer) {
    $line = trim($_POST['address_line'] ?? '');
    $city = trim($_POST['city'] ?? 'New Delhi');
    $pin = trim($_POST['pincode'] ?? '');
    $landmark = trim($_POST['landmark'] ?? '');

    if (strlen($line) >= 5 && strlen($pin) >= 4) {
        saveCustomerAddress($current_customer['id'], $line, $city, $pin, $landmark);
        $success_msg = 'New delivery address saved!';
    } else {
        $error_msg = 'Please fill out a valid street address and pincode.';
    }
}

$current_customer = getCurrentCustomer();
$customer_orders = $current_customer ? getCustomerOrders($current_customer['id']) : [];
$saved_addresses = $current_customer ? getCustomerAddresses($current_customer['id']) : [];
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">🎀 The Peach Club &bull; VIP Dining</span>
        <h1 class="coq-section-title">
            <?php echo $current_customer ? 'Welcome, <em>' . htmlspecialchars(explode(' ', $current_customer['full_name'])[0]) . '!</em>' : 'Patron <em>Account</em>'; ?>
        </h1>
        <p class="coq-section-subtitle">
            Manage your past feasts, live delivery addresses, and curated favorites in one aesthetic sanctuary.
        </p>
    </div>
</div>

<section style="padding-bottom: 90px;">
    <div class="coq-container">

        <?php if (!empty($error_msg)): ?>
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--coq-radius-md); padding: 14px 20px; max-width: 600px; margin: 0 auto 24px; color: #9F1239; font-size: 13.5px;">
                <i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($error_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($success_msg)): ?>
            <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--coq-radius-md); padding: 14px 20px; max-width: 600px; margin: 0 auto 24px; color: #065F46; font-size: 13.5px;">
                <i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($success_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!$current_customer): ?>
            <!-- Auth Screen: Login & Register Tabs -->
            <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 32px; box-shadow: var(--coq-shadow);">
                <div style="display: flex; border-bottom: 1px solid var(--coq-border); margin-bottom: 24px;">
                    <button type="button" id="tabLoginBtn" onclick="switchAuthTab('login')" 
                            style="flex: 1; padding: 12px; background: none; border: none; border-bottom: 3px solid var(--coq-rose); font-family: var(--coq-font-serif); font-size: 17px; font-weight: 700; color: var(--coq-rose-dark); cursor: pointer;">
                        Sign In
                    </button>
                    <button type="button" id="tabRegisterBtn" onclick="switchAuthTab('register')" 
                            style="flex: 1; padding: 12px; background: none; border: none; border-bottom: 3px solid transparent; font-family: var(--coq-font-serif); font-size: 17px; font-weight: 700; color: var(--coq-text-muted); cursor: pointer;">
                        Join Peach Club
                    </button>
                </div>

                <!-- Sign In Form -->
                <form method="POST" action="account.php" id="loginForm">
                    <input type="hidden" name="action" value="login">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Email Address</label>
                        <input type="email" name="email" required placeholder="your.name@example.com" class="coq-input" 
                               style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 14px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Password</label>
                        <input type="password" name="password" required placeholder="••••••••" class="coq-input" 
                               style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 14px;">
                    </div>
                    <button type="submit" class="coq-btn-primary" style="width: 100%; justify-content: center; padding: 13px;">
                        <span>Sign In to Account</span>
                        <i class="fa-solid fa-sparkles"></i>
                    </button>
                    <div style="margin-top: 18px; text-align: center;">
                        <span style="font-size: 12px; color: var(--coq-text-muted);">
                            Don't have an account? <a href="javascript:switchAuthTab('register')" style="color: var(--coq-rose-dark); font-weight: 600;">Create one here</a>
                        </span>
                    </div>
                </form>

                <!-- Register Form (hidden by default) -->
                <form method="POST" action="account.php" id="registerForm" style="display: none;">
                    <input type="hidden" name="action" value="register">
                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Full Name *</label>
                        <input type="text" name="full_name" required placeholder="Ananya Sharma" class="coq-input" 
                               style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 14px;">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Email Address *</label>
                        <input type="email" name="email" required placeholder="ananya@example.com" class="coq-input" 
                               style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 14px;">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Phone Number *</label>
                        <input type="tel" name="phone" required placeholder="+91 98765 43210" class="coq-input" 
                               style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 14px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Create Password *</label>
                        <input type="password" name="password" required minlength="6" placeholder="Min. 6 characters" class="coq-input" 
                               style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 14px;">
                    </div>
                    <button type="submit" class="coq-btn-primary" style="width: 100%; justify-content: center; padding: 13px;">
                        <span>Join The Peach Club 🎀</span>
                    </button>
                </form>
            </div>

        <?php else: ?>

            <!-- Logged In Patron Dashboard -->
            <div style="display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start;" class="coq-account-grid">
                
                <!-- Left Sidebar: Profile Card -->
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 26px; box-shadow: var(--coq-shadow); text-align: center;">
                    <div style="width: 76px; height: 76px; border-radius: 50%; background: #FFF0F3; border: 2px solid var(--coq-rose); color: var(--coq-rose); display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 14px;">
                        🌸
                    </div>
                    <h3 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0 0 4px;">
                        <?php echo htmlspecialchars($current_customer['full_name']); ?>
                    </h3>
                    <p style="margin: 0 0 16px; font-size: 12.5px; color: var(--coq-text-muted);">
                        <?php echo htmlspecialchars($current_customer['email']); ?><br>
                        <?php echo htmlspecialchars($current_customer['phone']); ?>
                    </p>

                    <div style="background: var(--coq-bg-soft); border-radius: var(--coq-radius-md); padding: 12px; margin-bottom: 20px; font-size: 12.5px; text-align: left;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="color: var(--coq-text-muted);">Past Orders:</span>
                            <strong><?php echo count($customer_orders); ?></strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="color: var(--coq-text-muted);">Saved Wishlist:</span>
                            <strong><?php echo $wishlist_count; ?> items</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: var(--coq-text-muted);">Member Since:</span>
                            <span><?php echo date('M Y', strtotime($current_customer['created_at'])); ?></span>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <a href="wishlist.php" class="coq-btn-secondary" style="justify-content: center; font-size: 13px;">
                            <i class="fa-regular fa-heart"></i>
                            <span>View Wishlist (<?php echo $wishlist_count; ?>)</span>
                        </a>
                        <a href="account.php?action=logout" class="coq-btn-secondary" style="justify-content: center; font-size: 13px; color: #DC2626;">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            <span>Sign Out</span>
                        </a>
                    </div>
                </div>

                <!-- Right Main Column: Orders & Addresses -->
                <div>
                    
                    <!-- Past Orders History -->
                    <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 26px; box-shadow: var(--coq-shadow); margin-bottom: 30px;">
                        <h2 style="font-family: var(--coq-font-serif); font-size: 22px; color: var(--coq-text); margin: 0 0 18px; border-bottom: 1px solid var(--coq-border); padding-bottom: 12px;">
                            Order History
                        </h2>

                        <?php if (empty($customer_orders)): ?>
                            <div style="text-align: center; padding: 40px 10px;">
                                <span style="font-size: 32px;">🍽️</span>
                                <p style="color: var(--coq-text-muted); font-size: 14px; margin: 8px 0 16px;">You haven't placed any feast orders yet.</p>
                                <a href="menu.php" class="coq-btn-primary" style="font-size: 13px;">Explore Our Menu ✦</a>
                            </div>
                        <?php else: ?>
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                <?php foreach ($customer_orders as $ord): ?>
                                    <div style="border: 1px solid var(--coq-border); border-radius: var(--coq-radius-md); padding: 18px; background: #FFFDF9;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                                            <div>
                                                <strong style="font-size: 15px; color: var(--coq-text);">#<?php echo htmlspecialchars($ord['order_number']); ?></strong>
                                                <span style="font-size: 12px; color: var(--coq-text-muted); display: block;">
                                                    <?php echo date('d M Y, h:i A', strtotime($ord['created_at'])); ?> &bull; <?php echo ucfirst($ord['order_type']); ?>
                                                </span>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 10px;">
                                                <span style="font-size: 11.5px; font-weight: 700; padding: 4px 10px; border-radius: 20px; background: #EFF6FF; color: #1D4ED8;">
                                                    <?php echo htmlspecialchars($ord['order_status']); ?>
                                                </span>
                                                <strong style="font-size: 16px; color: var(--coq-rose-dark); font-family: var(--coq-font-serif);">
                                                    <?php echo formatPrice($ord['final_total']); ?>
                                                </strong>
                                            </div>
                                        </div>

                                        <div style="font-size: 13px; color: var(--coq-text-muted); margin-bottom: 14px;">
                                            <?php 
                                                $itemSummaries = [];
                                                foreach ($ord['items'] as $oi) {
                                                    $itemSummaries[] = htmlspecialchars($oi['item_name']) . ' &times;' . $oi['quantity'];
                                                }
                                                echo implode(', ', $itemSummaries);
                                            ?>
                                        </div>

                                        <div style="display: flex; gap: 10px; justify-content: flex-end;">
                                            <a href="order-tracking.php?order=<?php echo urlencode($ord['order_number']); ?>&phone=<?php echo urlencode($ord['customer_phone']); ?>" 
                                               class="coq-btn-secondary" style="padding: 6px 14px; font-size: 12px;">
                                                Track Live
                                            </a>
                                            <a href="order-confirmation.php?order=<?php echo urlencode($ord['order_number']); ?>" 
                                               class="coq-btn-secondary" style="padding: 6px 14px; font-size: 12px;">
                                                View Receipt
                                            </a>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Saved Delivery Addresses -->
                    <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 26px; box-shadow: var(--coq-shadow);">
                        <h2 style="font-family: var(--coq-font-serif); font-size: 22px; color: var(--coq-text); margin: 0 0 18px; border-bottom: 1px solid var(--coq-border); padding-bottom: 12px;">
                            Saved Delivery Addresses
                        </h2>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px;">
                            <?php foreach ($saved_addresses as $addr): ?>
                                <div style="background: var(--coq-bg-soft); border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); padding: 14px; font-size: 13px;">
                                    <strong style="color: var(--coq-text); display: block; margin-bottom: 4px;">📍 Delivery Location</strong>
                                    <p style="margin: 0; color: var(--coq-text-muted); line-height: 1.5;">
                                        <?php echo htmlspecialchars($addr['address_line']); ?><br>
                                        <?php echo htmlspecialchars($addr['city']); ?> &ndash; <?php echo htmlspecialchars($addr['pincode']); ?><br>
                                        <?php if (!empty($addr['landmark'])): ?>Landmark: <?php echo htmlspecialchars($addr['landmark']); ?><?php endif; ?>
                                    </p>
                                </div>
                            <?php endforeach; ?>
                        </div>

                        <!-- Add New Address Form -->
                        <h3 style="font-family: var(--coq-font-serif); font-size: 17px; color: var(--coq-text); margin: 0 0 12px;">
                            + Add New Address
                        </h3>
                        <form method="POST" action="account.php" style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; align-items: end;">
                            <input type="hidden" name="action" value="add_address">
                            <div>
                                <input type="text" name="address_line" required placeholder="Street address / Apartment" class="coq-input" style="width: 100%; padding: 10px 12px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 13px;">
                            </div>
                            <div>
                                <input type="text" name="pincode" required placeholder="Pincode (e.g. 110048)" class="coq-input" style="width: 100%; padding: 10px 12px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 13px;">
                            </div>
                            <div>
                                <button type="submit" class="coq-btn-primary" style="width: 100%; padding: 10px; font-size: 13px; justify-content: center;">Save</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        <?php endif; ?>

    </div>
</section>

<script>
function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');

    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLoginBtn.style.borderBottomColor = 'var(--coq-rose)';
        tabLoginBtn.style.color = 'var(--coq-rose-dark)';
        tabRegisterBtn.style.borderBottomColor = 'transparent';
        tabRegisterBtn.style.color = 'var(--coq-text-muted)';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabRegisterBtn.style.borderBottomColor = 'var(--coq-rose)';
        tabRegisterBtn.style.color = 'var(--coq-rose-dark)';
        tabLoginBtn.style.borderBottomColor = 'transparent';
        tabLoginBtn.style.color = 'var(--coq-text-muted)';
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
