<?php
$page_title = 'The Maison Location & Inquiries';
require_once __DIR__ . '/includes/header.php';

$success_message = '';
$error_message = '';
$contact_data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contact_data = [
        'name' => trim($_POST['name'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'phone' => trim($_POST['phone'] ?? ''),
        'subject' => trim($_POST['subject'] ?? 'Private Dining Inquiry'),
        'message' => trim($_POST['message'] ?? ''),
        'concept_source' => 'Concept C - Luxury Cute'
    ];

    if (empty($contact_data['name']) || strlen($contact_data['name']) < 2) {
        $error_message = 'Please provide your name.';
    } elseif (empty($contact_data['email']) || !filter_var($contact_data['email'], FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please provide a valid email.';
    } elseif (empty($contact_data['message']) || strlen($contact_data['message']) < 10) {
        $error_message = 'Your message must be at least 10 characters.';
    } else {
        $ok = saveContactMessage($contact_data);
        if ($ok) {
            $success_message = 'Your inquiry has been received by our guest relations concierge. A member of our management team will reply within 24 hours.';
            $contact_data = [];
        } else {
            $error_message = 'Unable to send message. Please try again.';
        }
    }
}
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Liaison &amp; Concierge</span>
        <h1 class="lux-section-title">Visit &amp; <em>Inquire</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Our concierge team remains at your disposal for private buyout inquiries, bespoke dinner menus, and cellar requests.
        </p>
    </div>
</div>

<!-- Contact & Location Section -->
<section style="padding: 70px 0 100px;">
    <div class="lux-container">
        <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 50px; align-items: start;">
            
            <!-- Left Info Cards -->
            <div>
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px; box-shadow: var(--lux-shadow); margin-bottom: 30px;">
                    <span class="lux-tag">The Address</span>
                    <h3 style="font-family: var(--lux-font-serif); font-size: 26px; color: var(--lux-espresso); margin-bottom: 24px;">Peachy Plate Maison</h3>
                    
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-peach-dark);">Location</strong>
                            <p style="font-size: 14px; color: var(--lux-muted); line-height: 1.6; margin-top: 4px;">
                                <?php echo RESTAURANT_ADDRESS; ?><br>
                                Valet parking service provided at the courtyard portico.
                            </p>
                        </div>

                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-peach-dark);">Service Hours</strong>
                            <p style="font-size: 14px; color: var(--lux-muted); line-height: 1.6; margin-top: 4px;">
                                Monday through Sunday<br>
                                <strong><?php echo RESTAURANT_HOURS; ?></strong>
                            </p>
                        </div>

                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-peach-dark);">Concierge Telephone</strong>
                            <p style="font-size: 14px; color: var(--lux-muted); line-height: 1.6; margin-top: 4px;">
                                <?php echo RESTAURANT_PHONE; ?>
                            </p>
                        </div>

                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-peach-dark);">Electronic Mail</strong>
                            <p style="font-size: 14px; color: var(--lux-muted); line-height: 1.6; margin-top: 4px;">
                                <?php echo RESTAURANT_EMAIL; ?>
                            </p>
                        </div>
                    </div>

                    <div style="display: flex; gap: 14px; margin-top: 30px; padding-top: 24px; border-top: 1px solid var(--lux-border);">
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener" class="lux-btn-outline" style="flex: 1; justify-content: center; font-size: 11px;">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener" class="lux-btn-outline" style="flex: 1; justify-content: center; font-size: 11px;">
                            <i class="fa-brands fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>

                <!-- Google Maps Placeholder Frame -->
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); overflow: hidden; box-shadow: var(--lux-shadow);">
                    <div style="height: 240px; background: var(--lux-bg-alt); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; border-bottom: 1px solid var(--lux-border);">
                        <span style="font-size: 32px; color: var(--lux-peach-dark);">📍</span>
                        <h4 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; margin-top: 8px;">Garden Avenue Atelier Map</h4>
                        <p style="font-size: 12px; color: var(--lux-muted);">Interactive Map Embed Placeholder &bull; Coordinates: 28.5921° N, 77.2201° E</p>
                    </div>
                    <div style="padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
                        <span style="color: var(--lux-espresso);">24, Garden Avenue, New Delhi</span>
                        <a href="https://maps.google.com" target="_blank" rel="noopener" style="color: var(--lux-peach-dark); font-weight: 600; text-decoration: underline;">Open Navigation &rarr;</a>
                    </div>
                </div>
            </div>

            <!-- Right Contact Form -->
            <div class="lux-form-box" style="margin: 0;">
                <span class="lux-tag">Direct Transmission</span>
                <h3 style="font-family: var(--lux-font-serif); font-size: 28px; color: var(--lux-espresso); margin: 8px 0 12px;">Send an Inquiry</h3>
                <p style="font-size: 14px; color: var(--lux-muted); line-height: 1.8; margin-bottom: 28px;">
                    Whether planning a private buyout, celebratory luncheon, or requiring custom tasting menus, our team looks forward to assisting you.
                </p>

                <?php if (!empty($success_message)): ?>
                    <div style="background: #FAF8F5; border: 1px solid #C98772; border-radius: var(--lux-radius-sm); padding: 18px; margin-bottom: 24px; font-size: 14px; color: var(--lux-espresso);">
                        <?php echo htmlspecialchars($success_message); ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($error_message)): ?>
                    <div style="background: #FDF2F2; border: 1px solid #F87171; border-radius: var(--lux-radius-sm); padding: 16px; margin-bottom: 24px; font-size: 13.5px; color: #991B1B;">
                        <?php echo htmlspecialchars($error_message); ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="contact.php">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="lux-form-group">
                            <label for="name">Guest Name *</label>
                            <input type="text" id="name" name="name" class="lux-form-control" placeholder="Aanya Sharma" value="<?php echo htmlspecialchars($contact_data['name'] ?? ''); ?>" required>
                        </div>
                        <div class="lux-form-group">
                            <label for="email">Email Address *</label>
                            <input type="email" id="email" name="email" class="lux-form-control" placeholder="aanya@example.com" value="<?php echo htmlspecialchars($contact_data['email'] ?? ''); ?>" required>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="lux-form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" class="lux-form-control" placeholder="+91 98765 43210" value="<?php echo htmlspecialchars($contact_data['phone'] ?? ''); ?>">
                        </div>
                        <div class="lux-form-group">
                            <label for="subject">Nature of Inquiry *</label>
                            <select id="subject" name="subject" class="lux-form-control" required>
                                <option value="Private Dining &amp; Salon Buyout">Private Dining &amp; Salon Buyout</option>
                                <option value="Corporate Hosting &amp; High Tea">Corporate Hosting &amp; High Tea</option>
                                <option value="Press &amp; Editorial Inquiries">Press &amp; Editorial Inquiries</option>
                                <option value="General Concierge Assistance">General Concierge Assistance</option>
                            </select>
                        </div>
                    </div>

                    <div class="lux-form-group">
                        <label for="message">Detailed Note *</label>
                        <textarea id="message" name="message" class="lux-form-control" rows="5" placeholder="Please elaborate on your proposed dates, party sizes, or private dining wishes..." required><?php echo htmlspecialchars($contact_data['message'] ?? ''); ?></textarea>
                    </div>

                    <button type="submit" class="lux-btn-primary" style="width: 100%; justify-content: center; padding: 16px;">
                        <span>Transmit Message to Maison</span>
                    </button>
                </form>
            </div>

        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
