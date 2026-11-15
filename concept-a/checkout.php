<?php
require_once __DIR__ . '/../shared/config/db.php';

$cart = getCartDetails();

// If cart is empty, redirect to menu
if (empty($cart['items'])) {
    header('Location: menu.php');
    exit;
}

$error_msg = '';
$current_customer = getCurrentCustomer();
$saved_addresses = $current_customer ? getCustomerAddresses($current_customer['id']) : [];

// Check payment toggles
$cod_enabled = (bool)getSetting('cod_enabled', '1');
$pickup_pay_enabled = (bool)getSetting('pay_at_pickup_enabled', '1');

// Process Checkout Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $error_msg = 'Security token expired. Please try submitting again.';
    } else {
        $_POST['concept_source'] = 'Concept A — Coquette Pinterest';
        $result = createOrder($_POST);
        if ($result['success']) {
            header('Location: order-confirmation.php?order=' . urlencode($result['order_number']));
            exit;
        } else {
            $error_msg = $result['error'] ?? 'There was an issue processing your order. Please check all fields.';
        }
    }
}

$page_title = 'Secure Feast Checkout';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">🎀 Encrypted &bull; Fresh to Order</span>
        <h1 class="coq-section-title">Finalize Your <em>Peachy Order</em></h1>
        <p class="coq-section-subtitle">
            Provide your dining preference and destination details. We prepare each box with love and fresh ribbons.
        </p>
    </div>
</div>

<section style="padding-bottom: 90px;">
    <div class="coq-container">

        <?php if (!empty($error_msg)): ?>
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--coq-radius-md); padding: 16px 20px; margin-bottom: 24px; color: #9F1239; font-size: 14px; display: flex; align-items: center; gap: 12px;">
                <i class="fa-solid fa-circle-exclamation" style="font-size: 18px;"></i>
                <span><?php echo htmlspecialchars($error_msg); ?></span>
            </div>
        <?php endif; ?>

        <?php if (!getSetting('orders_enabled', '1')): ?>
            <div style="background: #FEF3C7; border: 1px solid #FDE68A; border-radius: var(--coq-radius-md); padding: 18px 24px; margin-bottom: 30px; color: #92400E; text-align: center;">
                <h3 style="font-family: var(--coq-font-serif); margin: 0 0 6px;">Kitchen Orders Temporarily Paused</h3>
                <p style="margin: 0; font-size: 14px;">Our kitchen has reached maximum prep capacity for the current hour. Please call us at <?php echo RESTAURANT_PHONE; ?> for table reservations!</p>
            </div>
        <?php else: ?>

            <form method="POST" action="checkout.php" id="checkoutForm">
                <input type="hidden" name="csrf_token" value="<?php echo getCsrfToken(); ?>">

                <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 36px; align-items: start;" class="coq-checkout-grid">
                    
                    <!-- Left Column: Customer & Delivery Details -->
                    <div>
                        
                        <!-- Order Type Selection -->
                        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow); margin-bottom: 24px;">
                            <h2 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0 0 16px;">
                                1. How Would You Like Your Food?
                            </h2>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid var(--coq-rose); border-radius: var(--coq-radius-md); background: #FFF9FA; cursor: pointer;" id="labelDelivery">
                                    <input type="radio" name="order_type" value="delivery" checked onchange="toggleOrderType('delivery')" style="accent-color: var(--coq-rose-dark);">
                                    <div>
                                        <strong style="display: block; font-size: 14px; color: var(--coq-text);">🛵 Home Delivery</strong>
                                        <span style="font-size: 12px; color: var(--coq-text-muted);">Delivered warm to your doorstep</span>
                                    </div>
                                </label>

                                <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-md); background: #ffffff; cursor: pointer;" id="labelTakeaway">
                                    <input type="radio" name="order_type" value="takeaway" onchange="toggleOrderType('takeaway')" style="accent-color: var(--coq-rose-dark);">
                                    <div>
                                        <strong style="display: block; font-size: 14px; color: var(--coq-text);">🛍️ Takeaway / Pickup</strong>
                                        <span style="font-size: 12px; color: var(--coq-text-muted);">Pick up at 24 Garden Avenue</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Customer Information -->
                        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow); margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h2 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0;">
                                    2. Contact Details
                                </h2>
                                <?php if (!$current_customer): ?>
                                    <span style="font-size: 12.5px; color: var(--coq-text-muted);">
                                        Have an account? <a href="account.php" style="color: var(--coq-rose-dark); font-weight: 600;">Sign In</a>
                                    </span>
                                <?php else: ?>
                                    <span style="font-size: 12.5px; color: #059669; font-weight: 600;">
                                        Logged in as <?php echo htmlspecialchars($current_customer['full_name']); ?>
                                    </span>
                                <?php endif; ?>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <div style="grid-column: span 2;">
                                    <label class="coq-label" style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Full Name *</label>
                                    <input type="text" name="name" required class="coq-input" 
                                           value="<?php echo htmlspecialchars($current_customer['full_name'] ?? $_POST['name'] ?? ''); ?>" 
                                           placeholder="e.g. Ananya Sharma" style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;">
                                </div>

                                <div>
                                    <label class="coq-label" style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Phone Number *</label>
                                    <input type="tel" name="phone" required class="coq-input" 
                                           value="<?php echo htmlspecialchars($current_customer['phone'] ?? $_POST['phone'] ?? ''); ?>" 
                                           placeholder="+91 98765 43210" style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;">
                                </div>

                                <div>
                                    <label class="coq-label" style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Email Address *</label>
                                    <input type="email" name="email" required class="coq-input" 
                                           value="<?php echo htmlspecialchars($current_customer['email'] ?? $_POST['email'] ?? ''); ?>" 
                                           placeholder="ananya@example.com" style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;">
                                </div>
                            </div>
                        </div>

                        <!-- Delivery Address (Hidden if takeaway) -->
                        <div id="deliveryAddressSection" style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow); margin-bottom: 24px;">
                            <h2 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0 0 16px;">
                                3. Delivery Destination
                            </h2>

                            <?php if (!empty($saved_addresses)): ?>
                                <div style="margin-bottom: 16px; background: var(--coq-bg-soft); padding: 12px; border-radius: var(--coq-radius-sm);">
                                    <label style="font-size: 12.5px; font-weight: 600; color: var(--coq-text); display: block; margin-bottom: 6px;">Choose Saved Address:</label>
                                    <select onchange="populateSavedAddress(this)" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--coq-border); font-size: 13px;">
                                        <option value="">-- Or enter new address below --</option>
                                        <?php foreach ($saved_addresses as $saddr): ?>
                                            <option value="<?php echo htmlspecialchars(json_encode($saddr)); ?>">
                                                <?php echo htmlspecialchars($saddr['address_line'] . ', ' . $saddr['city'] . ' (' . $saddr['pincode'] . ')'); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            <?php endif; ?>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <div style="grid-column: span 2;">
                                    <label class="coq-label" style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Street Address / Apartment / Flat No. *</label>
                                    <textarea name="address" id="fieldAddress" rows="2" class="coq-input" placeholder="e.g. Flat 402, Rosewood Villa, Greater Kailash II" style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;"><?php echo htmlspecialchars($_POST['address'] ?? ''); ?></textarea>
                                </div>

                                <div>
                                    <label class="coq-label" style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">City</label>
                                    <input type="text" name="city" id="fieldCity" value="New Delhi" class="coq-input" style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;">
                                </div>

                                <div>
                                    <label class="coq-label" style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Pincode *</label>
                                    <input type="text" name="pincode" id="fieldPincode" placeholder="110048" class="coq-input" value="<?php echo htmlspecialchars($_POST['pincode'] ?? ''); ?>" style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;">
                                </div>

                                <div style="grid-column: span 2;">
                                    <label class="coq-label" style="display: block; font-size: 13px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Landmark (Optional)</label>
                                    <input type="text" name="landmark" id="fieldLandmark" placeholder="Near M-Block Market" class="coq-input" value="<?php echo htmlspecialchars($_POST['landmark'] ?? ''); ?>" style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;">
                                </div>

                                <?php if ($current_customer): ?>
                                    <div style="grid-column: span 2;">
                                        <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--coq-text); cursor: pointer;">
                                            <input type="checkbox" name="save_address" value="1" checked style="accent-color: var(--coq-rose-dark);">
                                            <span>Save this address to my profile for future orders</span>
                                        </label>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>

                        <!-- Special Instructions -->
                        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow); margin-bottom: 24px;">
                            <h2 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0 0 12px;">
                                Special Instructions (Optional)
                            </h2>
                            <textarea name="special_instructions" rows="2" class="coq-input" 
                                      placeholder="Any note for kitchen or delivery rider (e.g., extra cutlery, doorbell code, leave at reception)..." 
                                      style="width: 100%; padding: 12px 14px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-family: inherit; font-size: 14px;"><?php echo htmlspecialchars($_POST['special_instructions'] ?? ''); ?></textarea>
                        </div>

                        <!-- Payment Method Selector -->
                        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow);">
                            <h2 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0 0 16px;">
                                4. Select Payment Method
                            </h2>

                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                
                                <!-- Cash on Delivery -->
                                <?php if ($cod_enabled): ?>
                                    <label style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 2px solid var(--coq-rose); border-radius: var(--coq-radius-md); background: #FFF9FA; cursor: pointer;" id="payOptCod">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <input type="radio" name="payment_method" value="cod" checked style="accent-color: var(--coq-rose-dark);">
                                            <div>
                                                <strong style="font-size: 14px; color: var(--coq-text); display: block;">💵 Cash on Delivery (COD)</strong>
                                                <span style="font-size: 12px; color: var(--coq-text-muted);">Pay securely by cash or UPI on delivery</span>
                                            </div>
                                        </div>
                                        <span style="font-size: 11.5px; font-weight: 700; color: #059669; background: #D1FAE5; padding: 3px 8px; border-radius: 20px;">ACTIVE</span>
                                    </label>
                                <?php endif; ?>

                                <!-- Pay at Pickup -->
                                <?php if ($pickup_pay_enabled): ?>
                                    <label style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-md); background: #ffffff; cursor: pointer;" id="payOptPickup">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <input type="radio" name="payment_method" value="pay_at_pickup" style="accent-color: var(--coq-rose-dark);">
                                            <div>
                                                <strong style="font-size: 14px; color: var(--coq-text); display: block;">🏪 Pay at Pickup / Counter</strong>
                                                <span style="font-size: 12px; color: var(--coq-text-muted);">Pay at restaurant counter via Card/Cash/UPI</span>
                                            </div>
                                        </div>
                                        <span style="font-size: 11.5px; font-weight: 700; color: #059669; background: #D1FAE5; padding: 3px 8px; border-radius: 20px;">ACTIVE</span>
                                    </label>
                                <?php endif; ?>

                                <!-- Online Payment Gateway (Coming Soon) -->
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px dashed #CBD5E1; border-radius: var(--coq-radius-md); background: #F8FAFC; opacity: 0.9;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <input type="radio" disabled style="accent-color: #94A3B8;">
                                        <div>
                                            <strong style="font-size: 14px; color: #475569; display: block;">💳 Online Payment (Razorpay / Cards / UPI)</strong>
                                            <span style="font-size: 12px; color: #64748B;">Instant automated gateway integration</span>
                                        </div>
                                    </div>
                                    <button type="button" onclick="openPaymentModal()" style="background: #E2E8F0; border: none; padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #334155; cursor: pointer;">
                                        Coming Soon &bull; Preview
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>

                    <!-- Right Column: Order Review & Submit -->
                    <div>
                        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow); position: sticky; top: 90px;">
                            <h3 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 0 0 16px; border-bottom: 1px solid var(--coq-border); padding-bottom: 12px;">
                                Review Your Feast
                            </h3>

                            <!-- Items Summary List -->
                            <div style="max-height: 260px; overflow-y: auto; margin-bottom: 18px; padding-right: 6px;">
                                <?php foreach ($cart['items'] as $item): ?>
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px dashed var(--coq-border); font-size: 13px;">
                                        <div style="flex: 1; padding-right: 12px;">
                                            <strong style="color: var(--coq-text);"><?php echo htmlspecialchars($item['name']); ?></strong> &times; <?php echo $item['quantity']; ?>
                                            <?php if (!empty($item['customizations'])): ?>
                                                <div style="font-size: 11px; color: var(--coq-rose-dark); margin-top: 2px;">
                                                    <?php 
                                                        $opts = array_map(fn($c) => $c['option'], $item['customizations']);
                                                        echo htmlspecialchars(implode(', ', $opts));
                                                    ?>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                        <span style="font-weight: 600; color: var(--coq-text);">
                                            <?php echo $item['line_total_formatted']; ?>
                                        </span>
                                    </div>
                                <?php endforeach; ?>
                            </div>

                            <!-- Cost Breakdown -->
                            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px; margin-bottom: 18px;">
                                <div style="display: flex; justify-content: space-between; color: var(--coq-text-muted);">
                                    <span>Subtotal</span>
                                    <span style="font-weight: 600; color: var(--coq-text);"><?php echo $cart['subtotal_formatted']; ?></span>
                                </div>

                                <div style="display: flex; justify-content: space-between; color: var(--coq-text-muted);">
                                    <span>Delivery Fee</span>
                                    <span id="checkoutDeliveryFee" style="font-weight: 600; color: <?php echo $cart['delivery_fee'] == 0 ? '#059669' : 'var(--coq-text)'; ?>;">
                                        <?php echo $cart['delivery_fee_formatted']; ?>
                                    </span>
                                </div>

                                <?php if ($cart['discount_amount'] > 0): ?>
                                    <div style="display: flex; justify-content: space-between; color: #059669;">
                                        <span>Coupon (<?php echo htmlspecialchars($cart['coupon']['code']); ?>)</span>
                                        <span style="font-weight: 600;">&minus;<?php echo $cart['discount_formatted']; ?></span>
                                    </div>
                                <?php endif; ?>

                                <div style="border-top: 1px solid var(--coq-border); padding-top: 14px; display: flex; justify-content: space-between; align-items: baseline;">
                                    <strong style="font-size: 16px; color: var(--coq-text); font-family: var(--coq-font-serif);">Amount Payable</strong>
                                    <strong style="font-size: 24px; color: var(--coq-rose-dark); font-family: var(--coq-font-serif);" id="checkoutFinalTotal">
                                        <?php echo $cart['final_total_formatted']; ?>
                                    </strong>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="coq-btn-primary" style="width: 100%; justify-content: center; padding: 15px; font-size: 16px;">
                                <span>Place Order 🎀</span>
                                <i class="fa-solid fa-sparkles"></i>
                            </button>

                            <div style="margin-top: 16px; text-align: center;">
                                <span style="font-size: 11px; color: var(--coq-text-muted); display: block; line-height: 1.5;">
                                    By placing your order, you agree to receive live SMS/Email kitchen preparation updates.
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </form>

        <?php endif; ?>

    </div>
</section>

<script>
function toggleOrderType(type) {
    const addrSec = document.getElementById('deliveryAddressSection');
    const fieldAddress = document.getElementById('fieldAddress');
    const labelDelivery = document.getElementById('labelDelivery');
    const labelTakeaway = document.getElementById('labelTakeaway');
    const deliveryFeeEl = document.getElementById('checkoutDeliveryFee');
    const finalTotalEl = document.getElementById('checkoutFinalTotal');

    const subtotal = <?php echo (float)$cart['subtotal']; ?>;
    const discount = <?php echo (float)$cart['discount_amount']; ?>;
    const origDelivery = <?php echo (float)$cart['delivery_fee']; ?>;

    if (type === 'takeaway') {
        if (addrSec) addrSec.style.display = 'none';
        if (fieldAddress) fieldAddress.removeAttribute('required');
        labelTakeaway.style.borderColor = 'var(--coq-rose)';
        labelTakeaway.style.background = '#FFF9FA';
        labelDelivery.style.borderColor = 'var(--coq-border)';
        labelDelivery.style.background = '#ffffff';

        // Free delivery for takeaway
        if (deliveryFeeEl) deliveryFeeEl.textContent = 'FREE (Pickup)';
        const newTotal = Math.max(0, (subtotal - discount));
        if (finalTotalEl) finalTotalEl.textContent = '₹' + Math.round(newTotal);
    } else {
        if (addrSec) addrSec.style.display = 'block';
        if (fieldAddress) fieldAddress.setAttribute('required', 'required');
        labelDelivery.style.borderColor = 'var(--coq-rose)';
        labelDelivery.style.background = '#FFF9FA';
        labelTakeaway.style.borderColor = 'var(--coq-border)';
        labelTakeaway.style.background = '#ffffff';

        if (deliveryFeeEl) deliveryFeeEl.textContent = origDelivery === 0 ? 'FREE' : '₹' + Math.round(origDelivery);
        const newTotal = Math.max(0, (subtotal - discount) + origDelivery);
        if (finalTotalEl) finalTotalEl.textContent = '₹' + Math.round(newTotal);
    }
}

function populateSavedAddress(selectEl) {
    if (!selectEl.value) return;
    try {
        const addr = JSON.parse(selectEl.value);
        document.getElementById('fieldAddress').value = addr.address_line || '';
        document.getElementById('fieldCity').value = addr.city || 'New Delhi';
        document.getElementById('fieldPincode').value = addr.pincode || '';
        document.getElementById('fieldLandmark').value = addr.landmark || '';
    } catch (e) {
        console.error(e);
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
