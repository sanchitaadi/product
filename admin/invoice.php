<?php
require_once __DIR__ . '/includes/auth.php';
requireAdminAuth();

$order_ref = trim($_GET['order'] ?? $_GET['id'] ?? '');
$order = null;
if (is_numeric($order_ref) && (int)$order_ref > 0) {
    $order = getOrderById((int)$order_ref);
} elseif (!empty($order_ref)) {
    $order = getOrderByOrderNumber($order_ref);
}

if (!$order) {
    die("Error: Order not found.");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice #<?php echo htmlspecialchars($order['order_number']); ?> — <?php echo RESTAURANT_NAME; ?></title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f1f5f9;
            color: #0f172a;
            padding: 40px 20px;
        }
        .invoice-card {
            max-width: 780px;
            margin: 0 auto;
            background: #ffffff;
            padding: 44px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 24px;
            margin-bottom: 28px;
        }
        .invoice-brand {
            font-size: 26px;
            font-weight: 800;
            color: #e11d48;
            letter-spacing: -0.5px;
        }
        .invoice-tagline {
            font-size: 12px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 2px;
        }
        .invoice-restaurant-info {
            font-size: 12.5px;
            color: #475569;
            line-height: 1.6;
            margin-top: 6px;
        }
        .invoice-meta {
            text-align: right;
        }
        .invoice-title {
            font-size: 20px;
            font-weight: 800;
            text-transform: uppercase;
            color: #0f172a;
            margin-bottom: 6px;
        }
        .invoice-meta p {
            font-size: 13px;
            color: #475569;
            line-height: 1.5;
        }
        .invoice-billing-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
            margin-bottom: 28px;
            font-size: 13.5px;
        }
        .billing-col h4 {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #94a3b8;
            font-weight: 800;
            margin-bottom: 8px;
        }
        .billing-col p {
            color: #334155;
            line-height: 1.6;
        }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 28px;
        }
        .invoice-table th {
            background: #f8fafc;
            border-bottom: 2px solid #cbd5e1;
            padding: 12px 14px;
            text-align: left;
            font-size: 11.5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #475569;
        }
        .invoice-table td {
            padding: 14px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13.5px;
            color: #1e293b;
        }
        .invoice-totals {
            margin-left: auto;
            max-width: 340px;
            font-size: 13.5px;
            line-height: 1.8;
            margin-bottom: 30px;
        }
        .totals-row {
            display: flex;
            justify-content: space-between;
            color: #64748b;
        }
        .totals-row.grand-total {
            border-top: 2px solid #0f172a;
            padding-top: 10px;
            margin-top: 6px;
            font-size: 18px;
            font-weight: 800;
            color: #0f172a;
        }
        .invoice-footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            line-height: 1.6;
        }
        .no-print-bar {
            max-width: 780px;
            margin: 0 auto 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .btn-print {
            background: #e11d48;
            color: #ffffff;
            border: none;
            padding: 10px 22px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
        }
        .btn-close {
            background: #64748b;
            color: #ffffff;
            border: none;
            padding: 10px 18px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            text-decoration: none;
        }
        @media print {
            body { padding: 0; background: #fff; }
            .no-print-bar { display: none !important; }
            .invoice-card { box-shadow: none; border: none; padding: 20px; max-width: 100%; }
        }
    </style>
</head>
<body>

<div class="no-print-bar">
    <a href="orders.php" class="btn-close">&larr; Back to Order Manager</a>
    <div>
        <button type="button" class="btn-print" onclick="window.print()">
            🖨️ Print Receipt / Invoice
        </button>
    </div>
</div>

<div class="invoice-card">
    <!-- Header -->
    <div class="invoice-header">
        <div>
            <div class="invoice-brand">🍑 <?php echo RESTAURANT_NAME; ?></div>
            <div class="invoice-tagline"><?php echo RESTAURANT_TAGLINE; ?></div>
            <div class="invoice-restaurant-info">
                <?php echo RESTAURANT_ADDRESS; ?><br>
                Phone: <?php echo RESTAURANT_PHONE; ?> &bull; Email: <?php echo RESTAURANT_EMAIL; ?><br>
                FSSAI Lic. No: 13322001000999 (Sample)
            </div>
        </div>
        <div class="invoice-meta">
            <div class="invoice-title">Tax Receipt / Bill</div>
            <p><strong>Order #:</strong> <?php echo htmlspecialchars($order['order_number']); ?></p>
            <p><strong>Date:</strong> <?php echo date('d M Y, h:i A', strtotime($order['created_at'])); ?></p>
            <p><strong>Source:</strong> <?php echo htmlspecialchars($order['concept_source'] ?? 'Direct'); ?></p>
            <p><strong>Status:</strong> <?php echo strtoupper(htmlspecialchars($order['order_status'])); ?></p>
        </div>
    </div>

    <!-- Customer & Logistics -->
    <div class="invoice-billing-grid">
        <div class="billing-col">
            <h4>Billed To (Customer):</h4>
            <p>
                <strong><?php echo htmlspecialchars($order['customer_name']); ?></strong><br>
                Phone: <?php echo htmlspecialchars($order['customer_phone']); ?><br>
                Email: <?php echo htmlspecialchars($order['customer_email']); ?>
            </p>
        </div>
        <div class="billing-col">
            <h4>Fulfillment &amp; Destination:</h4>
            <p>
                <strong>Type:</strong> <?php echo ucfirst($order['order_type']); ?><br>
                <?php if ($order['order_type'] === 'takeaway'): ?>
                    Counter Pickup at 24 Garden Avenue, New Delhi
                <?php else: ?>
                    <?php echo nl2br(htmlspecialchars($order['delivery_address'])); ?>, <?php echo htmlspecialchars($order['city']); ?> &ndash; <?php echo htmlspecialchars($order['pincode']); ?><br>
                    <?php if ($order['landmark']): ?>Landmark: <?php echo htmlspecialchars($order['landmark']); ?><?php endif; ?>
                <?php endif; ?>
            </p>
        </div>
    </div>

    <!-- Items Table -->
    <table class="invoice-table">
        <thead>
            <tr>
                <th style="width: 45%;">Item Description</th>
                <th style="width: 15%; text-align: center;">Qty</th>
                <th style="width: 20%; text-align: right;">Unit Price</th>
                <th style="width: 20%; text-align: right;">Total Amount</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($order['items'] as $item): ?>
                <tr>
                    <td>
                        <strong><?php echo htmlspecialchars($item['item_name']); ?></strong>
                        <?php if (!empty($item['customizations_summary'])): ?>
                            <div style="font-size: 11.5px; color: #e11d48; margin-top: 2px;">
                                ✦ <?php echo htmlspecialchars($item['customizations_summary']); ?>
                            </div>
                        <?php endif; ?>
                    </td>
                    <td style="text-align: center;"><?php echo (int)$item['quantity']; ?></td>
                    <td style="text-align: right;"><?php echo formatPrice($item['unit_price']); ?></td>
                    <td style="text-align: right; font-weight: 600;"><?php echo formatPrice($item['total_price']); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Totals -->
    <div class="invoice-totals">
        <div class="totals-row">
            <span>Subtotal:</span>
            <span style="font-weight: 600; color: #0f172a;"><?php echo formatPrice($order['subtotal']); ?></span>
        </div>
        <div class="totals-row">
            <span>Delivery Fee:</span>
            <span style="font-weight: 600; color: #0f172a;"><?php echo $order['delivery_fee'] == 0 ? 'FREE' : formatPrice($order['delivery_fee']); ?></span>
        </div>
        <?php if ($order['discount_amount'] > 0): ?>
            <div class="totals-row" style="color: #059669;">
                <span>Coupon (<?php echo htmlspecialchars($order['coupon_code']); ?>):</span>
                <span style="font-weight: 600;">&minus;<?php echo formatPrice($order['discount_amount']); ?></span>
            </div>
        <?php endif; ?>
        <div class="totals-row grand-total">
            <span>Grand Total:</span>
            <span style="color: #e11d48;"><?php echo formatPrice($order['final_total']); ?></span>
        </div>
        <div style="margin-top: 8px; font-size: 12px; color: #64748b; text-align: right;">
            Payment: <strong><?php echo strtoupper(htmlspecialchars($order['payment']['payment_method'] ?? 'COD')); ?></strong> &bull; Status: <strong><?php echo strtoupper(htmlspecialchars($order['payment']['payment_status'] ?? 'unpaid')); ?></strong>
        </div>
    </div>

    <?php if (!empty($order['special_instructions'])): ?>
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px 14px; font-size: 12px; color: #475569; margin-bottom: 24px;">
            <strong>Kitchen Instructions:</strong> <?php echo htmlspecialchars($order['special_instructions']); ?>
        </div>
    <?php endif; ?>

    <!-- Footer -->
    <div class="invoice-footer">
        <p>Thank you for choosing <?php echo RESTAURANT_NAME; ?>! Good food brings cute moods.</p>
        <p>For inquiries, please contact our concierge at <?php echo RESTAURANT_PHONE; ?> or <?php echo RESTAURANT_EMAIL; ?>.</p>
    </div>
</div>

</body>
</html>
