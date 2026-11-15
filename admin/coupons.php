<?php
$page_title = 'Coupon Codes & Discount Engine';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$msg = '';
$err = '';

// Handle Create / Update Coupon
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'create_coupon') {
        $code = strtoupper(trim($_POST['code'] ?? ''));
        $desc = trim($_POST['description'] ?? '');
        $type = in_array($_POST['discount_type'] ?? '', ['percentage', 'fixed']) ? $_POST['discount_type'] : 'percentage';
        $val = (float)($_POST['discount_value'] ?? 0);
        $min_order = (float)($_POST['min_order_amount'] ?? 0);
        $max_disc = (float)($_POST['max_discount'] ?? 0);
        $from = $_POST['valid_from'] ?: date('Y-m-d');
        $to = $_POST['valid_to'] ?: date('Y-m-d', strtotime('+1 year'));
        $limit = (int)($_POST['usage_limit'] ?? 0);
        $active = isset($_POST['is_active']) ? 1 : 0;

        if (strlen($code) < 3) {
            $err = 'Coupon code must be at least 3 characters.';
        } else {
            $stmt = $db->prepare("
                INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_discount, valid_from, valid_to, usage_limit, is_active)
                VALUES (:c, :d, :t, :v, :mo, :md, :vf, :vt, :ul, :ia)
            ");
            try {
                $stmt->execute([
                    ':c' => $code, ':d' => $desc, ':t' => $type, ':v' => $val,
                    ':mo' => $min_order, ':md' => $max_disc ?: null,
                    ':vf' => $from, ':vt' => $to, ':ul' => $limit, ':ia' => $active
                ]);
                $msg = "Coupon $code created successfully!";
            } catch (Exception $e) {
                $err = 'Error saving coupon: ' . $e->getMessage();
            }
        }
    } elseif ($_POST['action'] === 'toggle_active') {
        $id = (int)($_POST['coupon_id'] ?? 0);
        $db->prepare("UPDATE coupons SET is_active = NOT is_active WHERE id = :id")->execute([':id' => $id]);
        $msg = 'Coupon status updated.';
    } elseif ($_POST['action'] === 'delete_coupon') {
        $id = (int)($_POST['coupon_id'] ?? 0);
        $db->prepare("DELETE FROM coupons WHERE id = :id")->execute([':id' => $id]);
        $msg = 'Coupon deleted.';
    }
}

$coupons = $db->query("SELECT * FROM coupons ORDER BY id DESC")->fetchAll();
?>

<?php if (!empty($msg)): ?>
    <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--adm-radius); padding: 14px 20px; margin-bottom: 24px; color: #065F46; font-size: 13.5px;">
        <i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($msg); ?>
    </div>
<?php endif; ?>

<?php if (!empty($err)): ?>
    <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--adm-radius); padding: 14px 20px; margin-bottom: 24px; color: #9F1239; font-size: 13.5px;">
        <i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($err); ?>
    </div>
<?php endif; ?>

<div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 28px; align-items: start;">
    
    <!-- Coupon List Table -->
    <div class="adm-card">
        <div class="adm-card-header">
            <h3 class="adm-card-title">Active &amp; Expired Coupons (<?php echo count($coupons); ?>)</h3>
        </div>
        <div class="adm-table-wrap">
            <table class="adm-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Type &amp; Value</th>
                        <th>Min Order</th>
                        <th>Usage</th>
                        <th>Valid Period</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($coupons)): ?>
                        <tr><td colspan="7" style="text-align: center; color: var(--adm-text-muted); padding: 30px;">No coupons found. Create one on the right!</td></tr>
                    <?php else: ?>
                        <?php foreach ($coupons as $cp): ?>
                            <tr>
                                <td>
                                    <strong style="color: #e11d48; font-family: monospace; font-size: 14px;"><?php echo htmlspecialchars($cp['code']); ?></strong>
                                    <?php if ($cp['description']): ?>
                                        <div style="font-size: 11px; color: var(--adm-text-muted);"><?php echo htmlspecialchars($cp['description']); ?></div>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <strong>
                                        <?php echo $cp['discount_type'] === 'percentage' ? $cp['discount_value'] . '%' : formatPrice($cp['discount_value']); ?>
                                    </strong>
                                    <?php if ($cp['max_discount']): ?>
                                        <div style="font-size: 10.5px; color: var(--adm-text-muted);">Max: <?php echo formatPrice($cp['max_discount']); ?></div>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo formatPrice($cp['min_order_amount']); ?></td>
                                <td>
                                    <?php echo (int)$cp['usage_count']; ?> / <?php echo $cp['usage_limit'] > 0 ? (int)$cp['usage_limit'] : '&infin;'; ?>
                                </td>
                                <td style="font-size: 11.5px; color: var(--adm-text-muted);">
                                    <?php echo date('d M y', strtotime($cp['valid_from'])); ?> &ndash; <?php echo date('d M y', strtotime($cp['valid_to'])); ?>
                                </td>
                                <td>
                                    <span class="adm-badge <?php echo $cp['is_active'] ? 'adm-badge-success' : 'adm-badge-secondary'; ?>">
                                        <?php echo $cp['is_active'] ? 'Active' : 'Disabled'; ?>
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 6px;">
                                        <form method="POST" action="coupons.php" style="display: inline;">
                                            <input type="hidden" name="action" value="toggle_active">
                                            <input type="hidden" name="coupon_id" value="<?php echo $cp['id']; ?>">
                                            <button type="submit" class="adm-btn adm-btn-outline adm-btn-sm" title="Toggle active">
                                                <i class="fa-solid fa-power-off"></i>
                                            </button>
                                        </form>
                                        <form method="POST" action="coupons.php" style="display: inline;" onsubmit="return confirm('Delete this coupon?');">
                                            <input type="hidden" name="action" value="delete_coupon">
                                            <input type="hidden" name="coupon_id" value="<?php echo $cp['id']; ?>">
                                            <button type="submit" class="adm-btn adm-btn-danger adm-btn-sm" title="Delete">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Create Coupon Form -->
    <div class="adm-card">
        <div class="adm-card-header">
            <h3 class="adm-card-title">+ Create New Coupon</h3>
        </div>
        <form method="POST" action="coupons.php" style="padding: 10px 0;">
            <input type="hidden" name="action" value="create_coupon">

            <div class="adm-form-group">
                <label>Coupon Code * (e.g. SUMMER30)</label>
                <input type="text" name="code" required class="adm-form-control" style="text-transform: uppercase;" placeholder="CODE">
            </div>

            <div class="adm-form-group">
                <label>Description (Optional)</label>
                <input type="text" name="description" class="adm-form-control" placeholder="20% off all artisan pastas">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="adm-form-group">
                    <label>Discount Type</label>
                    <select name="discount_type" class="adm-form-control">
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Cash (₹)</option>
                    </select>
                </div>
                <div class="adm-form-group">
                    <label>Discount Value *</label>
                    <input type="number" step="1" name="discount_value" required value="20" class="adm-form-control">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="adm-form-group">
                    <label>Min Order (₹)</label>
                    <input type="number" step="1" name="min_order_amount" value="399" class="adm-form-control">
                </div>
                <div class="adm-form-group">
                    <label>Max Discount (₹, Optional)</label>
                    <input type="number" step="1" name="max_discount" value="150" class="adm-form-control">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="adm-form-group">
                    <label>Valid From</label>
                    <input type="date" name="valid_from" value="<?php echo date('Y-m-d'); ?>" class="adm-form-control">
                </div>
                <div class="adm-form-group">
                    <label>Valid To</label>
                    <input type="date" name="valid_to" value="<?php echo date('Y-m-d', strtotime('+3 months')); ?>" class="adm-form-control">
                </div>
            </div>

            <div class="adm-form-group">
                <label>Total Usage Limit (0 for unlimited)</label>
                <input type="number" name="usage_limit" value="500" class="adm-form-control">
            </div>

            <div class="adm-form-group" style="margin-top: 10px;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" name="is_active" value="1" checked style="width: 16px; height: 16px;">
                    <span style="font-weight: 700;">Enable coupon immediately</span>
                </label>
            </div>

            <button type="submit" class="adm-btn adm-btn-primary" style="width: 100%; justify-content: center; padding: 12px;">
                Save Coupon Code 🏷️
            </button>
        </form>
    </div>

</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
