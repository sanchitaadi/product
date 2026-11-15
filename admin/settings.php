<?php
$page_title = 'Restaurant Configuration & E-Commerce Settings';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$msg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_settings') {
    $settings_to_update = [
        'restaurant_name' => trim($_POST['restaurant_name'] ?? 'Peachy Plate'),
        'restaurant_tagline' => trim($_POST['restaurant_tagline'] ?? 'GOOD FOOD. CUTE MOODS.'),
        'restaurant_address' => trim($_POST['restaurant_address'] ?? '24, Garden Avenue, New Delhi, India'),
        'restaurant_phone' => trim($_POST['restaurant_phone'] ?? '+91 98765 43210 (dummy)'),
        'restaurant_email' => trim($_POST['restaurant_email'] ?? 'hello@peachyplate.example'),
        'restaurant_hours' => trim($_POST['restaurant_hours'] ?? '11:00 AM – 11:00 PM'),
        'currency_symbol' => trim($_POST['currency_symbol'] ?? '₹'),
        'orders_enabled' => isset($_POST['orders_enabled']) ? '1' : '0',
        'cod_enabled' => isset($_POST['cod_enabled']) ? '1' : '0',
        'pay_at_pickup_enabled' => isset($_POST['pay_at_pickup_enabled']) ? '1' : '0',
        'delivery_charge' => (float)($_POST['delivery_charge'] ?? 50),
        'free_delivery_threshold' => (float)($_POST['free_delivery_threshold'] ?? 599),
        'min_order_amount' => (float)($_POST['min_order_amount'] ?? 199),
        'email_from_name' => trim($_POST['email_from_name'] ?? 'Peachy Plate Concierge')
    ];

    foreach ($settings_to_update as $k => $v) {
        updateSetting($k, (string)$v);
    }

    $msg = 'All restaurant and e-commerce settings saved successfully!';
}

// Fetch current values
$cur_settings = [];
$sStmt = $db->query("SELECT setting_key, setting_value FROM settings");
while ($r = $sStmt->fetch()) {
    $cur_settings[$r['setting_key']] = $r['setting_value'];
}
?>

<?php if (!empty($msg)): ?>
    <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--adm-radius); padding: 14px 20px; margin-bottom: 24px; color: #065F46; font-size: 13.5px;">
        <i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($msg); ?>
    </div>
<?php endif; ?>

<form method="POST" action="settings.php">
    <input type="hidden" name="action" value="save_settings">

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start;">
        
        <!-- General Restaurant Brand -->
        <div class="adm-card">
            <div class="adm-card-header">
                <h3 class="adm-card-title">🍽️ Brand &amp; Contact Details</h3>
            </div>
            
            <div class="adm-form-group">
                <label>Restaurant Name</label>
                <input type="text" name="restaurant_name" required value="<?php echo htmlspecialchars($cur_settings['restaurant_name'] ?? 'Peachy Plate'); ?>" class="adm-form-control">
            </div>

            <div class="adm-form-group">
                <label>Tagline</label>
                <input type="text" name="restaurant_tagline" required value="<?php echo htmlspecialchars($cur_settings['restaurant_tagline'] ?? 'GOOD FOOD. CUTE MOODS.'); ?>" class="adm-form-control">
            </div>

            <div class="adm-form-group">
                <label>Physical Address</label>
                <input type="text" name="restaurant_address" required value="<?php echo htmlspecialchars($cur_settings['restaurant_address'] ?? '24, Garden Avenue, New Delhi, India'); ?>" class="adm-form-control">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="adm-form-group">
                    <label>Public Phone</label>
                    <input type="text" name="restaurant_phone" required value="<?php echo htmlspecialchars($cur_settings['restaurant_phone'] ?? '+91 98765 43210 (dummy)'); ?>" class="adm-form-control">
                </div>
                <div class="adm-form-group">
                    <label>Concierge Email</label>
                    <input type="email" name="restaurant_email" required value="<?php echo htmlspecialchars($cur_settings['restaurant_email'] ?? 'hello@peachyplate.example'); ?>" class="adm-form-control">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
                <div class="adm-form-group">
                    <label>Service Operating Hours</label>
                    <input type="text" name="restaurant_hours" required value="<?php echo htmlspecialchars($cur_settings['restaurant_hours'] ?? '11:00 AM – 11:00 PM'); ?>" class="adm-form-control">
                </div>
                <div class="adm-form-group">
                    <label>Currency Symbol</label>
                    <input type="text" name="currency_symbol" required value="<?php echo htmlspecialchars($cur_settings['currency_symbol'] ?? '₹'); ?>" class="adm-form-control">
                </div>
            </div>
        </div>

        <!-- E-Commerce & Ordering Settings -->
        <div class="adm-card">
            <div class="adm-card-header">
                <h3 class="adm-card-title">🛵 E-Commerce &amp; Dispatch Rules</h3>
            </div>

            <!-- Toggles -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
                <label style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; cursor: pointer;">
                    <div>
                        <strong style="display: block; font-size: 13.5px; color: #0f172a;">Online Orders Active</strong>
                        <span style="font-size: 12px; color: #64748b;">Turn off to pause taking new checkout orders</span>
                    </div>
                    <input type="checkbox" name="orders_enabled" value="1" <?php echo ($cur_settings['orders_enabled'] ?? '1') === '1' ? 'checked' : ''; ?> style="width: 20px; height: 20px;">
                </label>

                <label style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; cursor: pointer;">
                    <div>
                        <strong style="display: block; font-size: 13.5px; color: #0f172a;">Cash on Delivery (COD) Active</strong>
                        <span style="font-size: 12px; color: #64748b;">Allow customers to pay via cash/UPI on arrival</span>
                    </div>
                    <input type="checkbox" name="cod_enabled" value="1" <?php echo ($cur_settings['cod_enabled'] ?? '1') === '1' ? 'checked' : ''; ?> style="width: 20px; height: 20px;">
                </label>

                <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                    <div>
                        <strong style="display: block; font-size: 13.5px; color: #0f172a;">Pay at Pickup Active</strong>
                        <span style="font-size: 12px; color: #64748b;">Allow takeaway customers to pay at restaurant counter</span>
                    </div>
                    <input type="checkbox" name="pay_at_pickup_enabled" value="1" <?php echo ($cur_settings['pay_at_pickup_enabled'] ?? '1') === '1' ? 'checked' : ''; ?> style="width: 20px; height: 20px;">
                </label>
            </div>

            <!-- Pricing Thresholds -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="adm-form-group">
                    <label>Standard Delivery Fee (₹)</label>
                    <input type="number" step="1" name="delivery_charge" required value="<?php echo htmlspecialchars($cur_settings['delivery_charge'] ?? '50'); ?>" class="adm-form-control">
                </div>
                <div class="adm-form-group">
                    <label>Free Delivery Threshold (₹)</label>
                    <input type="number" step="1" name="free_delivery_threshold" required value="<?php echo htmlspecialchars($cur_settings['free_delivery_threshold'] ?? '599'); ?>" class="adm-form-control">
                </div>
            </div>

            <div class="adm-form-group">
                <label>Minimum Order Amount (₹)</label>
                <input type="number" step="1" name="min_order_amount" required value="<?php echo htmlspecialchars($cur_settings['min_order_amount'] ?? '199'); ?>" class="adm-form-control">
            </div>

            <div class="adm-form-group">
                <label>Email Notification Sender Name</label>
                <input type="text" name="email_from_name" value="<?php echo htmlspecialchars($cur_settings['email_from_name'] ?? 'Peachy Plate Concierge'); ?>" class="adm-form-control">
            </div>

            <button type="submit" class="adm-btn adm-btn-primary" style="width: 100%; justify-content: center; padding: 13px; font-size: 14px; margin-top: 10px;">
                <i class="fa-solid fa-floppy-disk"></i> Save Configuration
            </button>
        </div>

    </div>
</form>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
