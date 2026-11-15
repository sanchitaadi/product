<?php
$page_title = 'Find Us in New Delhi';
require_once __DIR__ . '/includes/header.php';

$success_message = '';
$error_message = '';
$contact_data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contact_data = [
        'name' => trim($_POST['name'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'phone' => trim($_POST['phone'] ?? ''),
        'subject' => trim($_POST['subject'] ?? 'General Drop'),
        'message' => trim($_POST['message'] ?? ''),
        'concept_source' => 'Concept B - Retro Gen-Z'
    ];

    if (empty($contact_data['name']) || strlen($contact_data['name']) < 2) {
        $error_message = 'Please drop your name.';
    } elseif (empty($contact_data['email']) || !filter_var($contact_data['email'], FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please provide a valid email.';
    } elseif (empty($contact_data['message']) || strlen($contact_data['message']) < 10) {
        $error_message = 'Your message needs at least 10 characters.';
    } else {
        $ok = saveContactMessage($contact_data);
        if ($ok) {
            $success_message = 'MESSAGE SENT! We got your ping and our diner team will reply within 24 hours.';
            $contact_data = [];
        } else {
            $error_message = 'Failed to submit. Please try again.';
        }
    }
}
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 50px 0 40px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ COME THROUGH</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">FIND PEACHY PLATE</h1>
        <p style="font-size: 16px; font-weight: 600; color: var(--gen-ink); max-width: 600px; margin: 10px auto 0;">
            Hit us up for brand collaborations, private shoots, birthday parties, or just to ask what's fresh today.
        </p>
    </div>
</div>

<!-- Contact & Info Section -->
<section style="padding: 60px 0 90px;">
    <div class="gen-container">
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: start;">
            
            <!-- Left Info Cards -->
            <div>
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 32px; margin-bottom: 24px;">
                    <span class="gen-sticker sticker-yellow" style="margin-bottom: 16px;">⚡ LOCATION HQ</span>
                    
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div>
                            <strong style="font-family: var(--gen-font-display); font-size: 14px; text-transform: uppercase;">ADDRESS</strong>
                            <p style="font-size: 14px; color: var(--gen-muted); font-weight: 600; margin-top: 4px;">
                                <?php echo RESTAURANT_ADDRESS; ?><br>
                                Near Lodhi Garden &bull; Valet Available
                            </p>
                        </div>

                        <div>
                            <strong style="font-family: var(--gen-font-display); font-size: 14px; text-transform: uppercase;">OPERATING HOURS</strong>
                            <p style="font-size: 14px; color: var(--gen-muted); font-weight: 600; margin-top: 4px;">
                                Open Daily &bull; <strong><?php echo RESTAURANT_HOURS; ?></strong>
                            </p>
                        </div>

                        <div>
                            <strong style="font-family: var(--gen-font-display); font-size: 14px; text-transform: uppercase;">DIRECT LINE</strong>
                            <p style="font-size: 14px; color: var(--gen-muted); font-weight: 600; margin-top: 4px;">
                                <?php echo RESTAURANT_PHONE; ?>
                            </p>
                        </div>

                        <div>
                            <strong style="font-family: var(--gen-font-display); font-size: 14px; text-transform: uppercase;">EMAIL</strong>
                            <p style="font-size: 14px; color: var(--gen-muted); font-weight: 600; margin-top: 4px;">
                                <?php echo RESTAURANT_EMAIL; ?>
                            </p>
                        </div>
                    </div>

                    <!-- Direct Chat CTAs -->
                    <div style="display: flex; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 2px dashed #d4d4d8;">
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener" class="gen-btn-yellow" style="flex: 1; justify-content: center; font-size: 13px;">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener" class="gen-btn-primary" style="flex: 1; justify-content: center; font-size: 13px;">
                            <i class="fa-brands fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>

                <!-- Styled Google Maps Placeholder -->
                <div style="border: 3px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); overflow: hidden; background: #ffffff;">
                    <div style="height: 220px; background: var(--gen-yellow-light); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; border-bottom: 2px solid var(--gen-ink);">
                        <span style="font-size: 38px;">📍</span>
                        <h4 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin-top: 6px;">MAP EMBED PLACEHOLDER</h4>
                        <p style="font-size: 12px; font-weight: 700; color: var(--gen-muted);">24, Garden Avenue, New Delhi, India</p>
                    </div>
                    <div style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; font-weight: 700;">GPS: 28.5921° N, 77.2201° E</span>
                        <a href="https://maps.google.com" target="_blank" rel="noopener" style="font-size: 12px; font-weight: 800; text-decoration: underline; color: var(--gen-red);">OPEN GOOGLE MAPS &rarr;</a>
                    </div>
                </div>
            </div>

            <!-- Right Contact Form -->
            <div class="gen-form-box" style="margin: 0;">
                <span class="gen-sticker sticker-red">⚡ SEND A PING</span>
                <h3 style="font-family: var(--gen-font-display); font-size: 26px; text-transform: uppercase; margin: 12px 0;">DROP US A LINE</h3>
                <p style="font-size: 14px; font-weight: 600; color: var(--gen-muted); margin-bottom: 24px;">
                    Have questions about private dining, menu allergens, or creator collabs? Shoot us a message!
                </p>

                <?php if (!empty($success_message)): ?>
                    <div style="background: #bbf7d0; border: 2px solid var(--gen-ink); border-radius: 8px; padding: 14px; margin-bottom: 20px; font-weight: 700; color: #166534;">
                        ⚡ <?php echo htmlspecialchars($success_message); ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($error_message)): ?>
                    <div style="background: #fecaca; border: 2px solid var(--gen-ink); border-radius: 8px; padding: 14px; margin-bottom: 20px; font-weight: 700; color: #991b1b;">
                        ⚠️ <?php echo htmlspecialchars($error_message); ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="contact.php">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="gen-form-group">
                            <label for="name">YOUR NAME *</label>
                            <input type="text" id="name" name="name" class="gen-form-control" placeholder="Rohan Kapoor" value="<?php echo htmlspecialchars($contact_data['name'] ?? ''); ?>" required>
                        </div>
                        <div class="gen-form-group">
                            <label for="email">EMAIL *</label>
                            <input type="email" id="email" name="email" class="gen-form-control" placeholder="rohan@example.com" value="<?php echo htmlspecialchars($contact_data['email'] ?? ''); ?>" required>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="gen-form-group">
                            <label for="phone">PHONE NUMBER</label>
                            <input type="tel" id="phone" name="phone" class="gen-form-control" placeholder="+91 98765 43210" value="<?php echo htmlspecialchars($contact_data['phone'] ?? ''); ?>">
                        </div>
                        <div class="gen-form-group">
                            <label for="subject">SUBJECT *</label>
                            <select id="subject" name="subject" class="gen-form-control" required>
                                <option value="Creator Shoot / Brand Collab">Creator Shoot / Brand Collab</option>
                                <option value="Private Diner Booking">Private Diner Booking</option>
                                <option value="General Question">General Question</option>
                                <option value="Catering &amp; Party Boxes">Catering &amp; Party Boxes</option>
                            </select>
                        </div>
                    </div>

                    <div class="gen-form-group">
                        <label for="message">MESSAGE *</label>
                        <textarea id="message" name="message" class="gen-form-control" rows="5" placeholder="Tell us what's up..." required><?php echo htmlspecialchars($contact_data['message'] ?? ''); ?></textarea>
                    </div>

                    <button type="submit" class="gen-btn-primary" style="width: 100%; justify-content: center; padding: 15px;">
                        <span>TRANSMIT MESSAGE ⚡</span>
                    </button>
                </form>
            </div>

        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
