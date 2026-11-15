<?php
require_once __DIR__ . '/../shared/config/db.php';

$cart = getCartDetails();
if (empty($cart['items'])) {
    header('Location: menu.php');
    exit;
}

$error_msg = '';
$current_customer = getCurrentCustomer();
$saved_addresses = $current_customer ? getCustomerAddresses($current_customer['id']) : [];

$cod_enabled = (bool)getSetting('cod_enabled', '1');
$pickup_pay_enabled = (bool)getSetting('pay_at_pickup_enabled', '1');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $error_msg = 'Security token expired. Please try submitting again.';
    } else {
        $_POST['concept_source'] = 'Concept C — Luxury Cute';
        $result = createOrder($_POST);
        if ($result['success']) {
            header('Location: order-confirmation.php?order=' . urlencode($result['order_number']));
            exit;
        } else {
            $error_msg = $result['error'] ?? 'Please review the highlighted details.';
        }
    }
}

$page_title = 'Private Dining Dispatch & Checkout';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Bespoke Concierge &bull; Encrypted</span>
        <h1 class="lux-section-title">Finalize Your <em>Atelier Order</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Specify your dining residence and preferred delivery arrangement. Each hamper is sealed and packaged in temperature-controlled aesthetic packaging.
        </p>
    </div>
</div>

<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <?php if (!empty($error_msg)): ?>
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 14px 20px; margin-bottom: 26px; color: #9F1239; font-size: 13.5px;">
                ✦ <?php echo htmlspecialchars($error_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!getSetting('orders_enabled', '1')): ?>
            <div style="background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 4px; padding: 22px; margin-bottom: 30px; text-align: center; color: #92400E;">
                <h3 style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 500; margin: 0 0 6px;">Atelier Dispatch Currently at Capacity</h3>
                <p style="margin: 0; font-size: 13.5px;">Our culinary brigade has reached full capacity for the current hour. Please call our maison concierge at <?php echo RESTAURANT_PHONE; ?>.</p>
            </div>
        <?php else: ?>

            <form method="POST" action="checkout.php" id="luxCheckoutForm">
                <input type="hidden" name="csrf_token" value="<?php echo getCsrfToken(); ?>">

                <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 40px; align-items: start;">
                    
                    <!-- Form Column -->
                    <div>
                        
                        <!-- Dining Type -->
                        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow); margin-bottom: 24px;">
                            <h2 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 16px;">
                                1. Concierge Fulfillment
                            </h2>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1.5px solid var(--lux-espresso); background: #FAF7F2; border-radius: 6px; cursor: pointer;" id="luxOptDelivery">
                                    <input type="radio" name="order_type" value="delivery" checked onchange="setLuxOrderType('delivery')" style="accent-color: var(--lux-espresso);">
                                    <div>
                                        <strong style="display: block; font-size: 13.5px; color: var(--lux-espresso);">Concierge Home Delivery</strong>
                                        <span style="font-size: 11.5px; color: var(--lux-muted);">Chauffeured directly to your residence</span>
                                    </div>
                                </label>

                                <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid var(--lux-border); background: #ffffff; border-radius: 6px; cursor: pointer;" id="luxOptTakeaway">
                                    <input type="radio" name="order_type" value="takeaway" onchange="setLuxOrderType('takeaway')" style="accent-color: var(--lux-espresso);">
                                    <div>
                                        <strong style="display: block; font-size: 13.5px; color: var(--lux-espresso);">Maison Salon Collection</strong>
                                        <span style="font-size: 11.5px; color: var(--lux-muted);">Collect at 24 Garden Avenue</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Patron Contact -->
                        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow); margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h2 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 0;">
                                    2. Patron Information
                                </h2>
                                <?php if ($current_customer): ?>
                                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--lux-gold); font-weight: 600;">
                                        Authenticated Patron
                                    </span>
                                <?php endif; ?>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <div style="grid-column: span 2;">
                                    <label class="lux-label" style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Full Name *</label>
                                    <input type="text" name="name" required class="lux-form-control" style="width: 100%;" 
                                           value="<?php echo htmlspecialchars($current_customer['full_name'] ?? $_POST['name'] ?? ''); ?>" placeholder="e.g. Meera Singhania">
                                </div>
                                <div>
                                    <label class="lux-label" style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Telephone Number *</label>
                                    <input type="tel" name="phone" required class="lux-form-control" style="width: 100%;" 
                                           value="<?php echo htmlspecialchars($current_customer['phone'] ?? $_POST['phone'] ?? ''); ?>" placeholder="+91 98765 43210">
                                </div>
                                <div>
                                    <label class="lux-label" style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Email Address *</label>
                                    <input type="email" name="email" required class="lux-form-control" style="width: 100%;" 
                                           value="<?php echo htmlspecialchars($current_customer['email'] ?? $_POST['email'] ?? ''); ?>" placeholder="meera@example.com">
                                </div>
                            </div>
                        </div>

                        <!-- Residence Address -->
                        <div id="luxAddressWrap" style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow); margin-bottom: 24px;">
                            <h2 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 16px;">
                                3. Dining Residence
                            </h2>

                            <?php if (!empty($saved_addresses)): ?>
                                <div style="margin-bottom: 16px;">
                                    <select onchange="fillLuxAddress(this)" style="width: 100%; padding: 10px 14px; border: 1px solid var(--lux-border); border-radius: 4px; font-size: 12.5px; background: #FAF8F5; color: var(--lux-espresso);">
                                        <option value="">-- Choose saved residence address --</option>
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
                                    <label class="lux-label" style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Street Address / Residence Name *</label>
                                    <textarea name="address" id="luxAddrField" rows="2" class="lux-form-control" style="width: 100%;"><?php echo htmlspecialchars($_POST['address'] ?? ''); ?></textarea>
                                </div>
                                <div>
                                    <label class="lux-label" style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">City</label>
                                    <input type="text" name="city" id="luxCityField" value="New Delhi" class="lux-form-control" style="width: 100%;">
                                </div>
                                <div>
                                    <label class="lux-label" style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Pincode *</label>
                                    <input type="text" name="pincode" id="luxPincodeField" placeholder="110003" class="lux-form-control" style="width: 100%;" value="<?php echo htmlspecialchars($_POST['pincode'] ?? ''); ?>">
                                </div>
                                <div style="grid-column: span 2;">
                                    <label class="lux-label" style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Prominent Landmark (Optional)</label>
                                    <input type="text" name="landmark" id="luxLandmarkField" placeholder="Near Golf Links / Lodhi Estate" class="lux-form-control" style="width: 100%;" value="<?php echo htmlspecialchars($_POST['landmark'] ?? ''); ?>">
                                </div>
                                <?php if ($current_customer): ?>
                                    <div style="grid-column: span 2;">
                                        <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--lux-espresso); cursor: pointer;">
                                            <input type="checkbox" name="save_address" value="1" checked style="accent-color: var(--lux-espresso);">
                                            <span>Retain this residence address in my patron profile</span>
                                        </label>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>

                        <!-- Special Instructions -->
                        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow); margin-bottom: 24px;">
                            <h2 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 12px;">
                                Dietary &amp; Concierge Notes
                            </h2>
                            <textarea name="special_instructions" rows="2" class="lux-form-control" style="width: 100%;" 
                                      placeholder="Dietary precautions, private entrance instructions, or preferred serving notes..."><?php echo htmlspecialchars($_POST['special_instructions'] ?? ''); ?></textarea>
                        </div>

                        <!-- Payment Methods -->
                        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 28px; box-shadow: var(--lux-shadow);">
                            <h2 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 16px;">
                                4. Settlement Preference
                            </h2>

                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <?php if ($cod_enabled): ?>
                                    <label style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1.5px solid var(--lux-espresso); border-radius: 6px; background: #FAF7F2; cursor: pointer;">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <input type="radio" name="payment_method" value="cod" checked style="accent-color: var(--lux-espresso);">
                                            <div>
                                                <strong style="font-size: 13.5px; color: var(--lux-espresso); display: block;">Settlement on Delivery (Cash / UPI)</strong>
                                                <span style="font-size: 11.5px; color: var(--lux-muted);">Settle seamlessly with our chauffeur on arrival</span>
                                            </div>
                                        </div>
                                        <span style="font-size: 10px; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.1em;">ACTIVE</span>
                                    </label>
                                <?php endif; ?>

                                <?php if ($pickup_pay_enabled): ?>
                                    <label style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid var(--lux-border); border-radius: 6px; background: #ffffff; cursor: pointer;">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <input type="radio" name="payment_method" value="pay_at_pickup" style="accent-color: var(--lux-espresso);">
                                            <div>
                                                <strong style="font-size: 13.5px; color: var(--lux-espresso); display: block;">Settlement at Salon Counter</strong>
                                                <span style="font-size: 11.5px; color: var(--lux-muted);">Card / UPI upon collecting your hamper at the salon</span>
                                            </div>
                                        </div>
                                        <span style="font-size: 10px; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.1em;">ACTIVE</span>
                                    </label>
                                <?php endif; ?>

                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px dashed var(--lux-border); border-radius: 6px; background: #faf8f5;">
                                    <div>
                                        <strong style="font-size: 13.5px; color: var(--lux-muted); display: block;">Online Payment Gateway (Razorpay)</strong>
                                        <span style="font-size: 11.5px; color: var(--lux-muted);">Instant encrypted online settlement</span>
                                    </div>
                                    <button type="button" class="lux-btn-secondary" onclick="openPaymentModal()" style="padding: 6px 14px; font-size: 10px;">
                                        Preview Gateway
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Right: Review -->
                    <div>
                        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 26px; box-shadow: var(--lux-shadow); position: sticky; top: 90px;">
                            <h3 style="font-family: var(--lux-font-serif); font-size: 18px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 16px; border-bottom: 1px solid var(--lux-border); padding-bottom: 12px;">
                                Hamper Summary
                            </h3>

                            <div style="max-height: 240px; overflow-y: auto; margin-bottom: 16px;">
                                <?php foreach ($cart['items'] as $item): ?>
                                    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(44, 30, 26, 0.08); font-size: 13px;">
                                        <div>
                                            <span style="color: var(--lux-espresso); font-weight: 500;"><?php echo htmlspecialchars($item['name']); ?></span> &times; <?php echo $item['quantity']; ?>
                                            <?php if (!empty($item['customizations'])): ?>
                                                <div style="font-size: 11px; color: var(--lux-gold);">
                                                    ✦ <?php echo htmlspecialchars(implode(', ', array_map(fn($c) => $c['option'], $item['customizations']))); ?>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                        <span style="font-family: var(--lux-font-serif); color: var(--lux-espresso); font-weight: 600;"><?php echo $item['line_total_formatted']; ?></span>
                                    </div>
                                <?php endforeach; ?>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; margin-bottom: 20px;">
                                <div style="display: flex; justify-content: space-between; color: var(--lux-muted);">
                                    <span>Subtotal</span>
                                    <span style="color: var(--lux-espresso); font-weight: 500;"><?php echo $cart['subtotal_formatted']; ?></span>
                                </div>
                                <div style="display: flex; justify-content: space-between; color: var(--lux-muted);">
                                    <span>Concierge Delivery</span>
                                    <span id="luxCheckoutFee" style="color: <?php echo $cart['delivery_fee'] == 0 ? '#059669' : 'var(--lux-espresso)'; ?>; font-weight: 500;">
                                        <?php echo $cart['delivery_fee_formatted']; ?>
                                    </span>
                                </div>
                                <?php if ($cart['discount_amount'] > 0): ?>
                                    <div style="display: flex; justify-content: space-between; color: #059669;">
                                        <span>Privilege Reduction (<?php echo htmlspecialchars($cart['coupon']['code']); ?>)</span>
                                        <span>&minus;<?php echo $cart['discount_formatted']; ?></span>
                                    </div>
                                <?php endif; ?>
                                <div style="border-top: 1px solid var(--lux-border); padding-top: 14px; display: flex; justify-content: space-between; align-items: baseline;">
                                    <span style="font-family: var(--lux-font-serif); font-size: 16px; text-transform: uppercase; color: var(--lux-espresso);">Total Settlement</span>
                                    <span style="font-family: var(--lux-font-serif); font-size: 24px; font-weight: 600; color: var(--lux-espresso);" id="luxCheckoutTotal">
                                        <?php echo $cart['final_total_formatted']; ?>
                                    </span>
                                </div>
                            </div>

                            <button type="submit" class="lux-btn-primary" style="width: 100%; justify-content: center; padding: 15px; font-size: 11px;">
                                <span>Place Atelier Order</span>
                            </button>
                        </div>
                    </div>

                </div>
            </form>

        <?php endif; ?>

    </div>
</section>

<script>
function setLuxOrderType(type) {
    const wrap = document.getElementById('luxAddressWrap');
    const addr = document.getElementById('luxAddrField');
    const optDelivery = document.getElementById('luxOptDelivery');
    const optTakeaway = document.getElementById('luxOptTakeaway');
    const feeEl = document.getElementById('luxCheckoutFee');
    const totalEl = document.getElementById('luxCheckoutTotal');

    const subtotal = <?php echo (float)$cart['subtotal']; ?>;
    const discount = <?php echo (float)$cart['discount_amount']; ?>;
    const origFee = <?php echo (float)$cart['delivery_fee']; ?>;

    if (type === 'takeaway') {
        if (wrap) wrap.style.display = 'none';
        if (addr) addr.removeAttribute('required');
        optTakeaway.style.background = '#FAF7F2';
        optTakeaway.style.borderColor = 'var(--lux-espresso)';
        optDelivery.style.background = '#ffffff';
        optDelivery.style.borderColor = 'var(--lux-border)';

        if (feeEl) feeEl.textContent = 'Complimentary (Salon)';
        if (totalEl) totalEl.textContent = '₹' + Math.round(Math.max(0, subtotal - discount));
    } else {
        if (wrap) wrap.style.display = 'block';
        if (addr) addr.setAttribute('required', 'required');
        optDelivery.style.background = '#FAF7F2';
        optDelivery.style.borderColor = 'var(--lux-espresso)';
        optTakeaway.style.background = '#ffffff';
        optTakeaway.style.borderColor = 'var(--lux-border)';

        if (feeEl) feeEl.textContent = origFee === 0 ? 'Complimentary' : '₹' + Math.round(origFee);
        if (totalEl) totalEl.textContent = '₹' + Math.round(Math.max(0, (subtotal - discount) + origFee));
    }
}

function fillLuxAddress(sel) {
    if (!sel.value) return;
    try {
        const a = JSON.parse(sel.value);
        document.getElementById('luxAddrField').value = a.address_line || '';
        document.getElementById('luxCityField').value = a.city || 'New Delhi';
        document.getElementById('luxPincodeField').value = a.pincode || '';
        document.getElementById('luxLandmarkField').value = a.landmark || '';
    } catch(e) { console.error(e); }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
