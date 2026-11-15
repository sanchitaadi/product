<?php
$page_title = 'Book Your Spot at Peachy Plate';
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
        'seating_area' => trim($_POST['seating_area'] ?? 'Retro Diner Booth'),
        'special_requests' => trim($_POST['special_requests'] ?? ''),
        'concept_source' => 'Concept B - Retro Gen-Z'
    ];

    if (empty($submitted_data['name']) || strlen($submitted_data['name']) < 2) {
        $error_message = 'Please drop your full name.';
    } elseif (empty($submitted_data['phone']) || strlen($submitted_data['phone']) < 8) {
        $error_message = 'Please provide a valid phone number for SMS confirmation.';
    } elseif (empty($submitted_data['email']) || !filter_var($submitted_data['email'], FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please provide a valid email.';
    } elseif (empty($submitted_data['reservation_date'])) {
        $error_message = 'Select your hangout date.';
    } elseif (strtotime($submitted_data['reservation_date']) < strtotime(date('Y-m-d'))) {
        $error_message = 'Reservation date cannot be in the past.';
    } elseif (empty($submitted_data['reservation_time'])) {
        $error_message = 'Pick a time slot.';
    } elseif (empty($submitted_data['guests']) || (int)$submitted_data['guests'] < 1 || (int)$submitted_data['guests'] > 30) {
        $error_message = 'Party size must be between 1 and 30 guests.';
    } else {
        $res = saveReservation($submitted_data);
        if ($res['success']) {
            $success_message = 'SPOT RESERVED! Reference #' . $res['id'] . '. We got your booking in our database and our team will text your confirmation ASAP.';
            $submitted_data = [];
        } else {
            $error_message = $res['error'] ?? 'Could not lock in table. Please try again.';
        }
    }
}
?>

<!-- Page Header -->
<div style="background: var(--gen-red); color: #ffffff; border-bottom: 3px solid var(--gen-ink); padding: 50px 0 40px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-yellow" style="color: var(--gen-ink);">⚡ ZERO ADVANCE FEE</span>
        <h1 class="gen-section-title" style="color: #ffffff; margin-top: 10px;">SNAG YOUR TABLE</h1>
        <p style="font-size: 16px; font-weight: 600; opacity: 0.95; max-width: 600px; margin: 10px auto 0;">
            Bookings fill up fast during evenings and weekends. Lock in your table below!
        </p>
    </div>
</div>

<!-- Reservation Form -->
<section style="padding: 60px 0 90px;">
    <div class="gen-container">
        <div class="gen-form-box">
            
            <?php if (!empty($success_message)): ?>
                <div style="background: #bbf7d0; border: 2.5px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                    <div style="font-family: var(--gen-font-display); font-size: 20px; font-weight: 900; color: #166534; margin-bottom: 6px;">
                        ⚡ YOU'RE IN!
                    </div>
                    <p style="font-weight: 600; color: #14532d;"><?php echo htmlspecialchars($success_message); ?></p>
                    <p style="font-size: 13px; margin-top: 8px;">Got immediate questions? Call us: <strong><?php echo RESTAURANT_PHONE; ?></strong></p>
                </div>
            <?php endif; ?>

            <?php if (!empty($error_message)): ?>
                <div style="background: #fecaca; border: 2.5px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: 12px; padding: 18px; margin-bottom: 24px; font-weight: 700; color: #991b1b;">
                    ⚠️ <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="reservation.php">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="gen-form-group">
                        <label for="name">YOUR NAME *</label>
                        <input type="text" id="name" name="name" class="gen-form-control" placeholder="Aarav Sharma" value="<?php echo htmlspecialchars($submitted_data['name'] ?? ''); ?>" required>
                    </div>
                    <div class="gen-form-group">
                        <label for="phone">PHONE NUMBER *</label>
                        <input type="tel" id="phone" name="phone" class="gen-form-control" placeholder="+91 98765 43210" value="<?php echo htmlspecialchars($submitted_data['phone'] ?? ''); ?>" required>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="gen-form-group">
                        <label for="email">EMAIL ADDRESS *</label>
                        <input type="email" id="email" name="email" class="gen-form-control" placeholder="aarav@example.com" value="<?php echo htmlspecialchars($submitted_data['email'] ?? ''); ?>" required>
                    </div>
                    <div class="gen-form-group">
                        <label for="guests">SQUAD SIZE (GUESTS) *</label>
                        <select id="guests" name="guests" class="gen-form-control" required>
                            <option value="">Choose party size</option>
                            <?php for ($g = 1; $g <= 12; $g++): ?>
                                <option value="<?php echo $g; ?>" <?php echo (isset($submitted_data['guests']) && (int)$submitted_data['guests'] === $g) ? 'selected' : ($g === 2 ? 'selected' : ''); ?>>
                                    <?php echo $g; ?> <?php echo $g === 1 ? 'Solo Dining' : ($g === 2 ? '2 Person Duo' : 'Guests Squad'); ?>
                                </option>
                            <?php endfor; ?>
                            <option value="15">13–15 Guests (Birthday/Party)</option>
                            <option value="20">16–20 Guests (Full Gang)</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="gen-form-group">
                        <label for="reservation_date">DATE *</label>
                        <input type="date" id="reservation_date" name="reservation_date" class="gen-form-control" min="<?php echo date('Y-m-d'); ?>" value="<?php echo htmlspecialchars($submitted_data['reservation_date'] ?? date('Y-m-d', strtotime('+1 day'))); ?>" required>
                    </div>
                    <div class="gen-form-group">
                        <label for="reservation_time">TIME SLOT *</label>
                        <select id="reservation_time" name="reservation_time" class="gen-form-control" required>
                            <option value="">Select time</option>
                            <option value="12:00 PM">12:00 PM (Lunch)</option>
                            <option value="01:00 PM">01:00 PM (Lunch)</option>
                            <option value="02:30 PM">02:30 PM (Late Lunch)</option>
                            <option value="04:30 PM">04:30 PM (Afternoon Shake Hour)</option>
                            <option value="06:30 PM">06:30 PM (Sunset)</option>
                            <option value="07:30 PM" selected>07:30 PM (Dinner Rush)</option>
                            <option value="08:30 PM">08:30 PM (Prime Time)</option>
                            <option value="09:30 PM">09:30 PM (Late Bites)</option>
                            <option value="10:00 PM">10:00 PM (Last Call)</option>
                        </select>
                    </div>
                </div>

                <div class="gen-form-group">
                    <label for="seating_area">SEATING ZONE PREFERENCE</label>
                    <select id="seating_area" name="seating_area" class="gen-form-control">
                        <option value="Retro Neon Diner Booth" selected>⚡ Retro Neon Diner Booth (Inside, AC, High Vibe)</option>
                        <option value="Open Air Garden Patio">🌿 Open-Air Garden Courtyard (Pet-friendly)</option>
                        <option value="Bar Counter High Chairs">☕ Bar Counter High Chairs (Quick Bites &amp; Brews)</option>
                    </select>
                </div>

                <div class="gen-form-group">
                    <label for="special_requests">SPECIAL REQUESTS / BIRTHDAYS / ALLERGIES</label>
                    <textarea id="special_requests" name="special_requests" class="gen-form-control" rows="3" placeholder="Tell us if someone has a birthday, dietary allergies, or needs pet water bowl..."><?php echo htmlspecialchars($submitted_data['special_requests'] ?? ''); ?></textarea>
                </div>

                <div style="background: var(--gen-yellow-light); border: 2px solid var(--gen-ink); border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; font-weight: 700;">
                    ⚡ <strong>NO ADVANCE PAYMENT:</strong> All table bookings are 100% free! Pay at your table with Cash, UPI, or Card after you feast.
                </div>

                <button type="submit" class="gen-btn-primary" style="width: 100%; justify-content: center; padding: 16px; font-size: 16px;">
                    <span>CONFIRM &amp; LOCK TABLE ⚡</span>
                </button>
            </form>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
