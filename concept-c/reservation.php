<?php
$page_title = 'Table Reservations & Private Dining';
require_once __DIR__ . '/includes/header.php';

$success_message = '';
$error_message = '';
$submitted_data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitted_data = [
        'name' => trim($_POST['name'] ?? ''),
        'phone' => trim($_POST['phone'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'reservation_date' => trim($_POST['reservation_date'] ?? ''),
        'reservation_time' => trim($_POST['reservation_time'] ?? ''),
        'guests' => trim($_POST['guests'] ?? ''),
        'seating_area' => trim($_POST['seating_area'] ?? 'Salon Privé'),
        'special_requests' => trim($_POST['special_requests'] ?? ''),
        'concept_source' => 'Concept C - Luxury Cute'
    ];

    if (empty($submitted_data['name']) || strlen($submitted_data['name']) < 2) {
        $error_message = 'Please provide your full name.';
    } elseif (empty($submitted_data['phone']) || strlen($submitted_data['phone']) < 8) {
        $error_message = 'Please provide a valid contact number.';
    } elseif (empty($submitted_data['email']) || !filter_var($submitted_data['email'], FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please enter a valid email address.';
    } elseif (empty($submitted_data['reservation_date'])) {
        $error_message = 'Please choose a dining date.';
    } elseif (strtotime($submitted_data['reservation_date']) < strtotime(date('Y-m-d'))) {
        $error_message = 'Reservation date cannot be in the past.';
    } elseif (empty($submitted_data['reservation_time'])) {
        $error_message = 'Please choose a seating time.';
    } elseif (empty($submitted_data['guests']) || (int)$submitted_data['guests'] < 1 || (int)$submitted_data['guests'] > 30) {
        $error_message = 'Party size must be between 1 and 30 guests.';
    } else {
        $res = saveReservation($submitted_data);
        if ($res['success']) {
            $success_message = 'Your table reservation request (Ref #' . $res['id'] . ') has been securely recorded in our reservation database. Our head maître d\' will verify table allocation and contact you with confirmation shortly.';
            $submitted_data = [];
        } else {
            $error_message = $res['error'] ?? 'Unable to process table request. Please verify your details.';
        }
    }
}
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Bespoke Hospitality</span>
        <h1 class="lux-section-title">Table <em>Reservations</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            We invite you to experience our salon for intimate lunches, milestone celebrations, and tranquil dinners.
        </p>
    </div>
</div>

<!-- Reservation Form -->
<section style="padding: 70px 0 100px;">
    <div class="lux-container">
        <div class="lux-form-box">
            
            <?php if (!empty($success_message)): ?>
                <div style="background: #FAF8F5; border: 1px solid #C98772; border-radius: var(--lux-radius-sm); padding: 24px; margin-bottom: 30px;">
                    <span class="lux-tag">Reservation Recorded</span>
                    <h3 style="font-family: var(--lux-font-serif); font-size: 22px; color: var(--lux-espresso); margin: 6px 0 10px;">Thank you for choosing Peachy Plate</h3>
                    <p style="font-size: 14px; color: var(--lux-muted); line-height: 1.7;"><?php echo htmlspecialchars($success_message); ?></p>
                    <p style="font-size: 12px; color: var(--lux-peach-dark); margin-top: 10px; font-weight: 600;">Concierge Inquiries: <?php echo RESTAURANT_PHONE; ?></p>
                </div>
            <?php endif; ?>

            <?php if (!empty($error_message)): ?>
                <div style="background: #FDF2F2; border: 1px solid #F87171; border-radius: var(--lux-radius-sm); padding: 16px 20px; margin-bottom: 24px; font-size: 13.5px; color: #991B1B;">
                    <strong>Notice:</strong> <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="reservation.php">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div class="lux-form-group">
                        <label for="name">Guest Name *</label>
                        <input type="text" id="name" name="name" class="lux-form-control" placeholder="Aanya Sharma" value="<?php echo htmlspecialchars($submitted_data['name'] ?? ''); ?>" required>
                    </div>
                    <div class="lux-form-group">
                        <label for="phone">Contact Telephone *</label>
                        <input type="tel" id="phone" name="phone" class="lux-form-control" placeholder="+91 98765 43210" value="<?php echo htmlspecialchars($submitted_data['phone'] ?? ''); ?>" required>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div class="lux-form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" class="lux-form-control" placeholder="guest@example.com" value="<?php echo htmlspecialchars($submitted_data['email'] ?? ''); ?>" required>
                    </div>
                    <div class="lux-form-group">
                        <label for="guests">Party Size *</label>
                        <select id="guests" name="guests" class="lux-form-control" required>
                            <option value="">Select number of patrons</option>
                            <?php for ($g = 1; $g <= 12; $g++): ?>
                                <option value="<?php echo $g; ?>" <?php echo (isset($submitted_data['guests']) && (int)$submitted_data['guests'] === $g) ? 'selected' : ($g === 2 ? 'selected' : ''); ?>>
                                    <?php echo $g; ?> <?php echo $g === 1 ? 'Guest (Solo Tasting)' : ($g === 2 ? 'Guests (Intimate Table)' : 'Guests'); ?>
                                </option>
                            <?php endfor; ?>
                            <option value="15">13–15 Guests (Private Salon)</option>
                            <option value="20">16–20 Guests (Full Maison Buyout)</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div class="lux-form-group">
                        <label for="reservation_date">Preferred Date *</label>
                        <input type="date" id="reservation_date" name="reservation_date" class="lux-form-control" min="<?php echo date('Y-m-d'); ?>" value="<?php echo htmlspecialchars($submitted_data['reservation_date'] ?? date('Y-m-d', strtotime('+1 day'))); ?>" required>
                    </div>
                    <div class="lux-form-group">
                        <label for="reservation_time">Seating Service *</label>
                        <select id="reservation_time" name="reservation_time" class="lux-form-control" required>
                            <option value="">Select seating time</option>
                            <optgroup label="Luncheon Service">
                                <option value="12:30 PM">12:30 PM</option>
                                <option value="01:30 PM">01:30 PM</option>
                                <option value="02:30 PM">02:30 PM</option>
                            </optgroup>
                            <optgroup label="Afternoon High Tea">
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="05:00 PM">05:00 PM</option>
                            </optgroup>
                            <optgroup label="Dinner Service">
                                <option value="07:00 PM" selected>07:00 PM</option>
                                <option value="08:00 PM">08:00 PM</option>
                                <option value="09:00 PM">09:00 PM</option>
                                <option value="09:30 PM">09:30 PM</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <div class="lux-form-group">
                    <label for="seating_area">Salon Atmosphere Preference</label>
                    <select id="seating_area" name="seating_area" class="lux-form-control">
                        <option value="Salon Privé" selected>Salon Privé — Quiet, velvet banquettes with warm low light</option>
                        <option value="Botanical Conservatory Patio">Botanical Conservatory Patio — Shaded open-air courtyard</option>
                        <option value="The Chef's Atelier Counter">The Chef's Atelier Counter — Direct culinary view</option>
                    </select>
                </div>

                <div class="lux-form-group">
                    <label for="special_requests">Dietary Considerations &amp; Celebrations</label>
                    <textarea id="special_requests" name="special_requests" class="lux-form-control" rows="3" placeholder="Kindly advise us of any allergies, milestone occasions (anniversary, birthday), or specific wine pairings..."><?php echo htmlspecialchars($submitted_data['special_requests'] ?? ''); ?></textarea>
                </div>

                <div style="background: var(--lux-bg-alt); border-radius: var(--lux-radius-sm); padding: 14px 18px; margin-bottom: 28px; font-size: 12.5px; color: var(--lux-muted); line-height: 1.6;">
                    <strong>Complimentary Reservation:</strong> Table reservations do not require an advance deposit. Tables are politely held for twenty minutes.
                </div>

                <button type="submit" class="lux-btn-primary" style="width: 100%; justify-content: center; padding: 16px;">
                    <span>Confirm Reservation Request</span>
                </button>
            </form>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
