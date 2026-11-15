<?php
$page_title = 'Reserve Your Table';
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
        'seating_area' => trim($_POST['seating_area'] ?? 'Coquette Window Booth'),
        'special_requests' => trim($_POST['special_requests'] ?? ''),
        'concept_source' => 'Concept A - Coquette Pinterest'
    ];

    // Server-side validation
    if (empty($submitted_data['name']) || strlen($submitted_data['name']) < 2) {
        $error_message = 'Please enter your full name (minimum 2 characters).';
    } elseif (empty($submitted_data['phone']) || strlen($submitted_data['phone']) < 8) {
        $error_message = 'Please provide a valid contact phone number.';
    } elseif (empty($submitted_data['email']) || !filter_var($submitted_data['email'], FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please provide a valid email address.';
    } elseif (empty($submitted_data['reservation_date'])) {
        $error_message = 'Please choose a reservation date.';
    } elseif (strtotime($submitted_data['reservation_date']) < strtotime(date('Y-m-d'))) {
        $error_message = 'Reservation date cannot be in the past.';
    } elseif (empty($submitted_data['reservation_time'])) {
        $error_message = 'Please choose a dining time slot.';
    } elseif (empty($submitted_data['guests']) || (int)$submitted_data['guests'] < 1 || (int)$submitted_data['guests'] > 30) {
        $error_message = 'Party size must be between 1 and 30 guests.';
    } else {
        // Save to Database via shared helper
        $res = saveReservation($submitted_data);
        if ($res['success']) {
            $success_message = 'Your table reservation request (Booking Ref #' . $res['id'] . ') has been securely recorded! Our dining concierge will verify table availability and send your confirmation SMS & Email shortly.';
            $submitted_data = []; // reset form
        } else {
            $error_message = $res['error'] ?? 'Unable to process reservation. Please check your details.';
        }
    }
}
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">💌 Reserve Your Sanctuary</span>
        <h1 class="coq-section-title">Book a <em>Table</em></h1>
        <p class="coq-section-subtitle">
            Whether it’s a romantic date night, cozy birthday feast, or weekend brunch with your favorites, we can't wait to host you.
        </p>
    </div>
</div>

<!-- Reservation Section -->
<section style="padding-bottom: 90px;">
    <div class="coq-container">
        <div class="coq-reservation-wrap">
            
            <?php if (!empty($success_message)): ?>
                <div class="coq-alert coq-alert-success">
                    <div style="font-size: 20px; margin-bottom: 6px;">🎀 Reservation Received!</div>
                    <p><?php echo htmlspecialchars($success_message); ?></p>
                    <div style="margin-top: 14px; font-size: 13px;">
                        Need immediate assistance? Call us directly at <strong><?php echo RESTAURANT_PHONE; ?></strong> or message via <a href="https://wa.me/919876543210" target="_blank" style="text-decoration: underline; font-weight: 600;">WhatsApp</a>.
                    </div>
                </div>
            <?php endif; ?>

            <?php if (!empty($error_message)): ?>
                <div class="coq-alert coq-alert-error">
                    <strong>Notice:</strong> <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="reservation.php" id="coqReservationForm">
                <div class="coq-form-row">
                    <div class="coq-form-group">
                        <label for="name">Your Name *</label>
                        <input type="text" id="name" name="name" class="coq-form-control" placeholder="e.g. Aanya Sharma" value="<?php echo htmlspecialchars($submitted_data['name'] ?? ''); ?>" required>
                    </div>
                    <div class="coq-form-group">
                        <label for="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" class="coq-form-control" placeholder="+91 98765 43210" value="<?php echo htmlspecialchars($submitted_data['phone'] ?? ''); ?>" required>
                    </div>
                </div>

                <div class="coq-form-row">
                    <div class="coq-form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" class="coq-form-control" placeholder="hello@example.com" value="<?php echo htmlspecialchars($submitted_data['email'] ?? ''); ?>" required>
                    </div>
                    <div class="coq-form-group">
                        <label for="guests">Number of Guests *</label>
                        <select id="guests" name="guests" class="coq-form-control" required>
                            <option value="">Select party size</option>
                            <?php for ($g = 1; $g <= 12; $g++): ?>
                                <option value="<?php echo $g; ?>" <?php echo (isset($submitted_data['guests']) && (int)$submitted_data['guests'] === $g) ? 'selected' : ($g === 2 ? 'selected' : ''); ?>>
                                    <?php echo $g; ?> <?php echo $g === 1 ? 'Guest (Solo Retreat)' : ($g === 2 ? 'Guests (Intimate Table)' : 'Guests'); ?>
                                </option>
                            <?php endfor; ?>
                            <option value="15">13–15 Guests (Large Gathering)</option>
                            <option value="20">16–20 Guests (Party Booking)</option>
                        </select>
                    </div>
                </div>

                <div class="coq-form-row">
                    <div class="coq-form-group">
                        <label for="reservation_date">Reservation Date *</label>
                        <input type="date" id="reservation_date" name="reservation_date" class="coq-form-control" min="<?php echo date('Y-m-d'); ?>" value="<?php echo htmlspecialchars($submitted_data['reservation_date'] ?? date('Y-m-d', strtotime('+1 day'))); ?>" required>
                    </div>
                    <div class="coq-form-group">
                        <label for="reservation_time">Preferred Time Slot *</label>
                        <select id="reservation_time" name="reservation_time" class="coq-form-control" required>
                            <option value="">Choose arrival time</option>
                            <optgroup label="Lunch &amp; Afternoon">
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="12:30 PM">12:30 PM</option>
                                <option value="01:00 PM">01:00 PM</option>
                                <option value="01:30 PM">01:30 PM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="02:30 PM">02:30 PM</option>
                            </optgroup>
                            <optgroup label="Afternoon Tea &amp; Coffee">
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="04:30 PM">04:30 PM</option>
                                <option value="05:00 PM">05:00 PM</option>
                                <option value="05:30 PM">05:30 PM</option>
                            </optgroup>
                            <optgroup label="Dinner Experience">
                                <option value="07:00 PM" selected>07:00 PM</option>
                                <option value="07:30 PM">07:30 PM</option>
                                <option value="08:00 PM">08:00 PM</option>
                                <option value="08:30 PM">08:30 PM</option>
                                <option value="09:00 PM">09:00 PM</option>
                                <option value="09:30 PM">09:30 PM</option>
                                <option value="10:00 PM">10:00 PM</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <div class="coq-form-group">
                    <label for="seating_area">Preferred Dining Ambience</label>
                    <select id="seating_area" name="seating_area" class="coq-form-control">
                        <option value="Coquette Window Booth" selected>🌸 Coquette Window Booth (Velvet seating &amp; soft light)</option>
                        <option value="Fairy Light Garden Patio">🌿 Fairy Light Garden Patio (Open-air, pet friendly)</option>
                        <option value="Intimate Sweetheart Table">🕯️ Intimate Sweetheart Table (Perfect for couples &amp; dates)</option>
                        <option value="Main Dining Salon">🍽️ Main Dining Salon (Spacious &amp; festive)</option>
                    </select>
                </div>

                <div class="coq-form-group">
                    <label for="special_requests">Special Requests / Celebrations / Food Allergies</label>
                    <textarea id="special_requests" name="special_requests" class="coq-form-control" rows="3" placeholder="Tell us if you are celebrating a birthday, anniversary, or have dietary preferences like gluten-free, nut-free, or vegan..."><?php echo htmlspecialchars($submitted_data['special_requests'] ?? ''); ?></textarea>
                </div>

                <!-- Terms and Payment notice -->
                <div style="background: #FFF8FA; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; color: var(--coq-text-muted); display: flex; align-items: flex-start; gap: 10px;">
                    <i class="fa-solid fa-circle-info" style="color: var(--coq-rose); margin-top: 3px;"></i>
                    <span><strong>100% Free Reservation:</strong> No advance booking deposit is required. Your table will be lovingly held for 15 minutes past your arrival time. Payments for your meals are made at the cafe.</span>
                </div>

                <button type="submit" class="coq-btn-primary" style="width: 100%; padding: 16px; font-size: 16px;">
                    <span>Submit Table Reservation</span>
                    <i class="fa-solid fa-heart"></i>
                </button>
            </form>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
