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
        $error_msg = 'Security token expired. Please try again.';
    } else {
        $_POST['concept_source'] = 'Concept B — Retro Gen-Z';
        $result = createOrder($_POST);
        if ($result['success']) {
            header('Location: order-confirmation.php?order=' . urlencode($result['order_number']));
            exit;
        } else {
            $error_msg = $result['error'] ?? 'Check all fields and try again.';
        }
    }
}

$page_title = 'Drop Checkout & Dispatch ⚡';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 46px 0 36px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ DISPATCH DETAILS &bull; SAFE TRANSIT</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">FINALIZE FOOD DISPATCH</h1>
        <p style="font-size: 15px; font-weight: 700; color: var(--gen-ink); max-width: 540px; margin: 8px auto 0;">
            Drop your delivery spot or choose store pickup. We fire orders within 5 minutes of booking!
        </p>
    </div>
</div>

<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <?php if (!empty($error_msg)): ?>
            <div style="background: #fee2e2; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 10px; padding: 14px 20px; margin-bottom: 24px; color: #991b1b; font-weight: 800; font-size: 13.5px;">
                ⚠️ <?php echo htmlspecialchars($error_msg); ?>
            </div>
        <?php endif; ?>

        <?php if (!getSetting('orders_enabled', '1')): ?>
            <div style="background: #fef08a; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 12px; padding: 24px; margin-bottom: 30px; text-align: center;">
                <h3 style="font-family: var(--gen-font-display); font-size: 22px; text-transform: uppercase; margin: 0 0 6px;">ORDERS TEMPORARILY PAUSED</h3>
                <p style="font-weight: 700; margin: 0; font-size: 14px;">Our diner ovens are at peak heat right now. Call <?php echo RESTAURANT_PHONE; ?> for immediate table seating!</p>
            </div>
        <?php else: ?>

            <form method="POST" action="checkout.php" id="genCheckoutForm">
                <input type="hidden" name="csrf_token" value="<?php echo getCsrfToken(); ?>">

                <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 36px; align-items: start;">
                    
                    <!-- Left: Form -->
                    <div>
                        
                        <!-- Order Type -->
                        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                            <h2 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0 0 16px;">
                                1. DISPATCH TYPE
                            </h2>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 3px solid var(--gen-ink); background: var(--gen-yellow); border-radius: 12px; cursor: pointer;" id="optDelivery">
                                    <input type="radio" name="order_type" value="delivery" checked onchange="setGenOrderType('delivery')" style="accent-color: var(--gen-red);">
                                    <div>
                                        <strong style="display: block; font-family: var(--gen-font-display); font-size: 14px;">🛵 HOME DELIVERY</strong>
                                        <span style="font-size: 11.5px; font-weight: 700; color: var(--gen-muted);">Direct to your doorstep</span>
                                    </div>
                                </label>

                                <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid var(--gen-ink); background: #ffffff; border-radius: 12px; cursor: pointer;" id="optTakeaway">
                                    <input type="radio" name="order_type" value="takeaway" onchange="setGenOrderType('takeaway')" style="accent-color: var(--gen-red);">
                                    <div>
                                        <strong style="display: block; font-family: var(--gen-font-display); font-size: 14px;">🛍️ DINER PICKUP</strong>
                                        <span style="font-size: 11.5px; font-weight: 700; color: var(--gen-muted);">Grab at 24 Garden Ave</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Contact Details -->
                        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h2 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0;">
                                    2. RIDER CONTACT INFO
                                </h2>
                                <?php if ($current_customer): ?>
                                    <span class="gen-sticker sticker-yellow" style="font-size: 10px;">VIP: <?php echo htmlspecialchars($current_customer['full_name']); ?></span>
                                <?php endif; ?>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                                <div style="grid-column: span 2;">
                                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">FULL NAME *</label>
                                    <input type="text" name="name" required class="gen-form-control" style="width: 100%;" 
                                           value="<?php echo htmlspecialchars($current_customer['full_name'] ?? $_POST['name'] ?? ''); ?>" placeholder="e.g. Kabir Sethi">
                                </div>
                                <div>
                                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">PHONE NUMBER *</label>
                                    <input type="tel" name="phone" required class="gen-form-control" style="width: 100%;" 
                                           value="<?php echo htmlspecialchars($current_customer['phone'] ?? $_POST['phone'] ?? ''); ?>" placeholder="+91 98765 43210">
                                </div>
                                <div>
                                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">EMAIL ADDRESS *</label>
                                    <input type="email" name="email" required class="gen-form-control" style="width: 100%;" 
                                           value="<?php echo htmlspecialchars($current_customer['email'] ?? $_POST['email'] ?? ''); ?>" placeholder="kabir@example.com">
                                </div>
                            </div>
                        </div>

                        <!-- Address Section -->
                        <div id="genAddressWrap" style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                            <h2 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0 0 16px;">
                                3. DROP DESTINATION
                            </h2>

                            <?php if (!empty($saved_addresses)): ?>
                                <div style="margin-bottom: 14px;">
                                    <select onchange="fillGenAddress(this)" style="width: 100%; padding: 10px; border: 2px solid var(--gen-ink); border-radius: 8px; font-weight: 700; font-size: 13px; background: var(--gen-cream);">
                                        <option value="">-- Choose from your saved spots --</option>
                                        <?php foreach ($saved_addresses as $saddr): ?>
                                            <option value="<?php echo htmlspecialchars(json_encode($saddr)); ?>">
                                                <?php echo htmlspecialchars($saddr['address_line'] . ', ' . $saddr['city'] . ' (' . $saddr['pincode'] . ')'); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            <?php endif; ?>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                                <div style="grid-column: span 2;">
                                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">HOUSE / APARTMENT / STREET *</label>
                                    <textarea name="address" id="genAddrLine" rows="2" class="gen-form-control" style="width: 100%;"><?php echo htmlspecialchars($_POST['address'] ?? ''); ?></textarea>
                                </div>
                                <div>
                                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">CITY</label>
                                    <input type="text" name="city" id="genCity" value="New Delhi" class="gen-form-control" style="width: 100%;">
                                </div>
                                <div>
                                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">PINCODE *</label>
                                    <input type="text" name="pincode" id="genPincode" placeholder="110001" class="gen-form-control" style="width: 100%;" value="<?php echo htmlspecialchars($_POST['pincode'] ?? ''); ?>">
                                </div>
                                <div style="grid-column: span 2;">
                                    <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">LANDMARK (OPTIONAL)</label>
                                    <input type="text" name="landmark" id="genLandmark" placeholder="Near Hauz Khas Metro" class="gen-form-control" style="width: 100%;" value="<?php echo htmlspecialchars($_POST['landmark'] ?? ''); ?>">
                                </div>
                                <?php if ($current_customer): ?>
                                    <div style="grid-column: span 2;">
                                        <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; cursor: pointer;">
                                            <input type="checkbox" name="save_address" value="1" checked style="accent-color: var(--gen-red);">
                                            <span>Save this location for future drops</span>
                                        </label>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>

                        <!-- Special Instructions -->
                        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                            <h2 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0 0 10px;">
                                DROP NOTES / INSTRUCTIONS
                            </h2>
                            <textarea name="special_instructions" rows="2" class="gen-form-control" style="width: 100%;" 
                                      placeholder="Rider instructions, buzzer codes, gate password, or spice levels..."><?php echo htmlspecialchars($_POST['special_instructions'] ?? ''); ?></textarea>
                        </div>

                        <!-- Payment Option -->
                        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px;">
                            <h2 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0 0 16px;">
                                4. PAYMENT TYPE
                            </h2>

                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <?php if ($cod_enabled): ?>
                                    <label style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border: 3px solid var(--gen-ink); border-radius: 10px; background: var(--gen-yellow); cursor: pointer;">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <input type="radio" name="payment_method" value="cod" checked style="accent-color: var(--gen-red);">
                                            <div>
                                                <strong style="font-family: var(--gen-font-display); font-size: 14px; text-transform: uppercase;">💵 CASH ON DELIVERY / UPI</strong>
                                                <span style="font-size: 11px; font-weight: 700; color: var(--gen-muted); display: block;">Pay cash or scan UPI QR on arrival</span>
                                            </div>
                                        </div>
                                        <span class="gen-sticker sticker-green" style="font-size: 10px;">READY</span>
                                    </label>
                                <?php endif; ?>

                                <?php if ($pickup_pay_enabled): ?>
                                    <label style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border: 2px solid var(--gen-ink); border-radius: 10px; background: #ffffff; cursor: pointer;">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <input type="radio" name="payment_method" value="pay_at_pickup" style="accent-color: var(--gen-red);">
                                            <div>
                                                <strong style="font-family: var(--gen-font-display); font-size: 14px; text-transform: uppercase;">🏪 PAY AT PICKUP COUNTER</strong>
                                                <span style="font-size: 11px; font-weight: 700; color: var(--gen-muted); display: block;">Card / Cash / UPI at store register</span>
                                            </div>
                                        </div>
                                        <span class="gen-sticker sticker-green" style="font-size: 10px;">READY</span>
                                    </label>
                                <?php endif; ?>

                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border: 2px dashed #a1a1aa; border-radius: 10px; background: #f4f4f5;">
                                    <div>
                                        <strong style="font-family: var(--gen-font-display); font-size: 13.5px; text-transform: uppercase; color: #52525b;">💳 ONLINE PAYMENT (RAZORPAY GATEWAY)</strong>
                                        <span style="font-size: 11px; color: #71717a; display: block;">Automated UPI / NetBanking connection</span>
                                    </div>
                                    <button type="button" class="gen-btn-yellow" onclick="openPaymentModal()" style="padding: 6px 12px; font-size: 10px;">
                                        PREVIEW
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Right: Summary -->
                    <div>
                        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px; position: sticky; top: 90px;">
                            <h3 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 0 0 16px; border-bottom: 2px solid var(--gen-ink); padding-bottom: 12px;">
                                DISPATCH OVERVIEW
                            </h3>

                            <div style="max-height: 240px; overflow-y: auto; margin-bottom: 16px;">
                                <?php foreach ($cart['items'] as $item): ?>
                                    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e4e4e7; font-size: 13px; font-weight: 700;">
                                        <div>
                                            <span><?php echo htmlspecialchars($item['name']); ?></span> &times; <?php echo $item['quantity']; ?>
                                            <?php if (!empty($item['customizations'])): ?>
                                                <div style="font-size: 10.5px; color: var(--gen-red);">
                                                    ⚡ <?php echo htmlspecialchars(implode(', ', array_map(fn($c) => $c['option'], $item['customizations']))); ?>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                        <span><?php echo $item['line_total_formatted']; ?></span>
                                    </div>
                                <?php endforeach; ?>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13.5px; font-weight: 700; margin-bottom: 18px;">
                                <div style="display: flex; justify-content: space-between; color: var(--gen-muted);">
                                    <span>SUBTOTAL</span>
                                    <span><?php echo $cart['subtotal_formatted']; ?></span>
                                </div>
                                <div style="display: flex; justify-content: space-between; color: var(--gen-muted);">
                                    <span>DELIVERY FEE</span>
                                    <span id="genCheckoutFee"><?php echo $cart['delivery_fee_formatted']; ?></span>
                                </div>
                                <?php if ($cart['discount_amount'] > 0): ?>
                                    <div style="display: flex; justify-content: space-between; color: #059669;">
                                        <span>DISCOUNT (<?php echo htmlspecialchars($cart['coupon']['code']); ?>)</span>
                                        <span>&minus;<?php echo $cart['discount_formatted']; ?></span>
                                    </div>
                                <?php endif; ?>
                                <div style="border-top: 2px solid var(--gen-ink); padding-top: 12px; display: flex; justify-content: space-between; align-items: baseline;">
                                    <span style="font-family: var(--gen-font-display); font-size: 16px; text-transform: uppercase;">DUE TOTAL</span>
                                    <span style="font-family: var(--gen-font-display); font-size: 24px; font-weight: 900; color: var(--gen-red);" id="genCheckoutTotal">
                                        <?php echo $cart['final_total_formatted']; ?>
                                    </span>
                                </div>
                            </div>

                            <button type="submit" class="gen-btn-primary" style="width: 100%; justify-content: center; padding: 15px; font-size: 16px;">
                                <span>FIRE MY ORDER ⚡</span>
                            </button>
                        </div>
                    </div>

                </div>
            </form>

        <?php endif; ?>

    </div>
</section>

<script>
function setGenOrderType(type) {
    const wrap = document.getElementById('genAddressWrap');
    const addr = document.getElementById('genAddrLine');
    const optDelivery = document.getElementById('optDelivery');
    const optTakeaway = document.getElementById('optTakeaway');
    const feeEl = document.getElementById('genCheckoutFee');
    const totalEl = document.getElementById('genCheckoutTotal');

    const subtotal = <?php echo (float)$cart['subtotal']; ?>;
    const discount = <?php echo (float)$cart['discount_amount']; ?>;
    const origFee = <?php echo (float)$cart['delivery_fee']; ?>;

    if (type === 'takeaway') {
        if (wrap) wrap.style.display = 'none';
        if (addr) addr.removeAttribute('required');
        optTakeaway.style.background = 'var(--gen-yellow)';
        optTakeaway.style.borderWidth = '3px';
        optDelivery.style.background = '#ffffff';
        optDelivery.style.borderWidth = '2px';

        if (feeEl) feeEl.textContent = 'FREE (Pickup)';
        if (totalEl) totalEl.textContent = '₹' + Math.round(Math.max(0, subtotal - discount));
    } else {
        if (wrap) wrap.style.display = 'block';
        if (addr) addr.setAttribute('required', 'required');
        optDelivery.style.background = 'var(--gen-yellow)';
        optDelivery.style.borderWidth = '3px';
        optTakeaway.style.background = '#ffffff';
        optTakeaway.style.borderWidth = '2px';

        if (feeEl) feeEl.textContent = origFee === 0 ? 'FREE' : '₹' + Math.round(origFee);
        if (totalEl) totalEl.textContent = '₹' + Math.round(Math.max(0, (subtotal - discount) + origFee));
    }
}

function fillGenAddress(sel) {
    if (!sel.value) return;
    try {
        const a = JSON.parse(sel.value);
        document.getElementById('genAddrLine').value = a.address_line || '';
        document.getElementById('genCity').value = a.city || 'New Delhi';
        document.getElementById('genPincode').value = a.pincode || '';
        document.getElementById('genLandmark').value = a.landmark || '';
    } catch(e) { console.error(e); }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
