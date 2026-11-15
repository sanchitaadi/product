<?php
$page_title = 'Contact & Visit Us';
require_once __DIR__ . '/includes/header.php';

$success_message = '';
$error_message = '';
$contact_data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contact_data = [
        'name' => trim($_POST['name'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'phone' => trim($_POST['phone'] ?? ''),
        'subject' => trim($_POST['subject'] ?? 'General Inquiry'),
        'message' => trim($_POST['message'] ?? ''),
        'concept_source' => 'Concept A - Coquette Pinterest'
    ];

    if (empty($contact_data['name']) || strlen($contact_data['name']) < 2) {
        $error_message = 'Please provide your name.';
    } elseif (empty($contact_data['email']) || !filter_var($contact_data['email'], FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please enter a valid email address.';
    } elseif (empty($contact_data['message']) || strlen($contact_data['message']) < 10) {
        $error_message = 'Please write a message of at least 10 characters.';
    } else {
        $ok = saveContactMessage($contact_data);
        if ($ok) {
            $success_message = 'Thank you for reaching out! Your message has been safely delivered to our concierge team. We will get back to you within 24 hours.';
            $contact_data = [];
        } else {
            $error_message = 'Failed to send message. Please try again.';
        }
    }
}
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">📍 We Would Love To Meet You</span>
        <h1 class="coq-section-title">Get In <em>Touch</em></h1>
        <p class="coq-section-subtitle">
            Questions about private dining, event hosting, or general inquiries? Drop us a note or come visit our Garden Avenue cafe.
        </p>
    </div>
</div>

<!-- Contact & Visit Section -->
<section style="padding-bottom: 90px;">
    <div class="coq-container">
        <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 40px; align-items: start;">
            
            <!-- Contact Info Cards -->
            <div>
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 36px; box-shadow: var(--coq-shadow); margin-bottom: 24px;">
                    <span class="coq-tag-pill">🌸 Cafe Sanctuary</span>
                    <h3 style="font-family: var(--coq-font-serif); font-size: 24px; color: var(--coq-text); margin-bottom: 20px;">
                        Peachy Plate Delhi
                    </h3>
                    
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--coq-bg-soft); color: var(--coq-rose); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div>
                                <strong style="display: block; font-size: 14px; color: var(--coq-text);">Our Address</strong>
                                <p style="font-size: 13.5px; color: var(--coq-text-muted); line-height: 1.5; margin-top: 2px;">
                                    <?php echo RESTAURANT_ADDRESS; ?><br>
                                    <span style="font-size: 12px; color: var(--coq-rose-dark); font-weight: 500;">(Near Lodhi Art District &bull; Valet parking available)</span>
                                </p>
                            </div>
                        </div>

                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--coq-bg-soft); color: var(--coq-rose); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">
                                <i class="fa-solid fa-clock"></i>
                            </div>
                            <div>
                                <strong style="display: block; font-size: 14px; color: var(--coq-text);">Opening Hours</strong>
                                <p style="font-size: 13.5px; color: var(--coq-text-muted); line-height: 1.5; margin-top: 2px;">
                                    Monday &ndash; Sunday<br>
                                    <strong><?php echo RESTAURANT_HOURS; ?></strong>
                                </p>
                            </div>
                        </div>

                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--coq-bg-soft); color: var(--coq-rose); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <strong style="display: block; font-size: 14px; color: var(--coq-text);">Phone &amp; Inquiries</strong>
                                <p style="font-size: 13.5px; color: var(--coq-text-muted); line-height: 1.5; margin-top: 2px;">
                                    <?php echo RESTAURANT_PHONE; ?><br>
                                    <span style="font-size: 11px; color: #a08490;">(Temporary presentation number)</span>
                                </p>
                            </div>
                        </div>

                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--coq-bg-soft); color: var(--coq-rose); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div>
                                <strong style="display: block; font-size: 14px; color: var(--coq-text);">Email Concierge</strong>
                                <p style="font-size: 13.5px; color: var(--coq-text-muted); line-height: 1.5; margin-top: 2px;">
                                    <?php echo RESTAURANT_EMAIL; ?>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Direct Instant Chat Links -->
                    <div style="display: flex; gap: 12px; margin-top: 28px; padding-top: 24px; border-top: 1px dashed var(--coq-border);">
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener" class="coq-btn-primary" style="flex: 1; background: #25D366; box-shadow: 0 6px 18px rgba(37, 211, 102, 0.3);">
                            <i class="fa-brands fa-whatsapp" style="font-size: 16px;"></i>
                            <span>Chat on WhatsApp</span>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener" class="coq-btn-secondary" style="flex: 1;">
                            <i class="fa-brands fa-instagram" style="color: #E1306C;"></i>
                            <span>Instagram</span>
                        </a>
                    </div>
                </div>

                <!-- Google Map Embed Placeholder Card -->
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); overflow: hidden; box-shadow: var(--coq-shadow);">
                    <div style="height: 240px; background: #FFF0F4; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px;">
                        <!-- Stylized Map Graphic / Embed Frame -->
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; color: var(--coq-rose); font-size: 26px; box-shadow: var(--coq-shadow); margin-bottom: 12px; animation: floatTag 3s infinite;">
                            <i class="fa-solid fa-map-location-dot"></i>
                        </div>
                        <h4 style="font-family: var(--coq-font-serif); font-size: 17px; color: var(--coq-text); margin-bottom: 4px;">Garden Avenue Location Map</h4>
                        <p style="font-size: 12px; color: var(--coq-text-muted);">Interactive Google Map Placeholder &bull; Coordinates: 28.5921° N, 77.2201° E</p>
                    </div>
                    <div style="padding: 16px 20px; background: #FFF9FA; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--coq-border);">
                        <span style="font-size: 12px; font-weight: 600; color: var(--coq-rose-dark);">24, Garden Avenue, New Delhi</span>
                        <a href="https://maps.google.com" target="_blank" rel="noopener" style="font-size: 12px; font-weight: 600; color: var(--coq-text); text-decoration: underline;">Open in Maps &rarr;</a>
                    </div>
                </div>
            </div>

            <!-- Contact Form Card -->
            <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 40px; box-shadow: var(--coq-shadow);">
                <span class="coq-tag-pill">💌 Send Us A Note</span>
                <h3 style="font-family: var(--coq-font-serif); font-size: 26px; color: var(--coq-text); margin-bottom: 8px;">
                    We are all ears!
                </h3>
                <p style="font-size: 14px; color: var(--coq-text-muted); line-height: 1.6; margin-bottom: 24px;">
                    Planning a photoshoot, private event, birthday bash, or corporate tea? Let us know how we can make your visit magical.
                </p>

                <?php if (!empty($success_message)): ?>
                    <div class="coq-alert coq-alert-success">
                        <strong>Thank you!</strong> <?php echo htmlspecialchars($success_message); ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($error_message)): ?>
                    <div class="coq-alert coq-alert-error">
                        <strong>Notice:</strong> <?php echo htmlspecialchars($error_message); ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="contact.php">
                    <div class="coq-form-row">
                        <div class="coq-form-group">
                            <label for="contact_name">Your Name *</label>
                            <input type="text" id="contact_name" name="name" class="coq-form-control" placeholder="Aanya Sharma" value="<?php echo htmlspecialchars($contact_data['name'] ?? ''); ?>" required>
                        </div>
                        <div class="coq-form-group">
                            <label for="contact_email">Email Address *</label>
                            <input type="email" id="contact_email" name="email" class="coq-form-control" placeholder="aanya@example.com" value="<?php echo htmlspecialchars($contact_data['email'] ?? ''); ?>" required>
                        </div>
                    </div>

                    <div class="coq-form-row">
                        <div class="coq-form-group">
                            <label for="contact_phone">Phone (Optional)</label>
                            <input type="tel" id="contact_phone" name="phone" class="coq-form-control" placeholder="+91 98765 43210" value="<?php echo htmlspecialchars($contact_data['phone'] ?? ''); ?>">
                        </div>
                        <div class="coq-form-group">
                            <label for="contact_subject">Inquiry Subject *</label>
                            <select id="contact_subject" name="subject" class="coq-form-control" required>
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Private Event &amp; Party Booking">Private Event &amp; Party Booking</option>
                                <option value="Brand Collaboration / Content Shoot">Brand Collaboration / Content Shoot</option>
                                <option value="Catering &amp; Custom Cake Orders">Catering &amp; Custom Cake Orders</option>
                                <option value="Feedback &amp; Compliments">Feedback &amp; Compliments</option>
                            </select>
                        </div>
                    </div>

                    <div class="coq-form-group">
                        <label for="contact_message">Your Message *</label>
                        <textarea id="contact_message" name="message" class="coq-form-control" rows="5" placeholder="Tell us your questions, dates, guest counts, or custom ideas..." required><?php echo htmlspecialchars($contact_data['message'] ?? ''); ?></textarea>
                    </div>

                    <button type="submit" class="coq-btn-primary" style="width: 100%; padding: 15px; font-size: 15px;">
                        <span>Send Message</span>
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>

        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
