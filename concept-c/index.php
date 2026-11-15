<?php
$page_title = 'The Luxury Atelier of Taste';
require_once __DIR__ . '/includes/header.php';
$featured_items = getFeaturedMenuItems(6);
?>

<!-- Hero Section -->
<section class="lux-hero">
    <div class="lux-container">
        <div class="lux-hero-grid">
            <div>
                <span class="lux-tag">An Atelier of Gentle Indulgence</span>
                <h1 class="lux-hero-title">
                    Where culinary poise meets <em>quiet, heartwarming beauty.</em>
                </h1>
                <p class="lux-hero-desc">
                    Peachy Plate reimagines Italian comfort and continental dining through the refined lens of modern haute cuisine. Delicate pink sauces, slow-simmered reductions, and hand-laminated pastries served in an atmosphere of serene, sun-dappled warmth.
                </p>
                <div class="lux-hero-ctas">
                    <a href="reservation.php" class="lux-btn-primary">
                        <span>Reserve Your Table</span>
                    </a>
                    <a href="menu.php" class="lux-btn-outline">
                        <span>Explore Carte du Jour</span>
                    </a>
                </div>
                <div class="lux-hero-stats">
                    <div class="lux-stat-item">
                        <strong>48 hr</strong>
                        <span>Sourdough Maturation</span>
                    </div>
                    <div class="lux-stat-item">
                        <strong>100%</strong>
                        <span>Bronze Die Pasta</span>
                    </div>
                    <div class="lux-stat-item">
                        <strong>4.9★</strong>
                        <span>Boutique Rating</span>
                    </div>
                </div>
            </div>

            <!-- Hero Image Showcase Frame -->
            <div class="lux-hero-frame">
                <div class="lux-hero-img-wrap">
                    <img src="../shared/assets/images/restaurant-interior.webp" alt="Peachy Plate Salon Interior" class="lux-hero-img" loading="eager" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                </div>
                <div class="lux-floating-card">
                    <span class="meta">Featured Presentation</span>
                    <span class="dish">Pink Sauce Rigatoni &bull; ₹299</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Tasting Selection -->
<section style="padding: 100px 0; background: #ffffff; border-top: 1px solid var(--lux-border); border-bottom: 1px solid var(--lux-border);">
    <div class="lux-container">
        <div class="lux-section-header">
            <span class="lux-tag">The Chef’s Portfolio</span>
            <h2 class="lux-section-title">Signatures of <em>Subtle Elegance</em></h2>
            <p class="lux-section-desc">
                Composed with harmonic balance: imported Italian Semola, fresh Pugliese burrata, and hand-selected seasonal herbs.
            </p>
        </div>

        <div class="lux-dishes-grid">
            <?php foreach ($featured_items as $dish): ?>
                <div class="lux-dish-card">
                    <div class="lux-dish-thumb-wrap">
                        <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="lux-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <?php if ($dish['is_bestseller']): ?>
                            <span class="lux-dish-badge-top">Signature</span>
                        <?php endif; ?>
                        <div class="lux-dietary-dot">
                            <span class="<?php echo $dish['is_veg'] ? 'dot-veg' : 'dot-nonveg'; ?>" style="width: 10px; height: 10px; border-radius: 50%; display: inline-block;"></span>
                        </div>
                    </div>
                    <div class="lux-dish-body">
                        <span class="lux-dish-cat"><?php echo htmlspecialchars($dish['category']); ?></span>
                        <h3 class="lux-dish-title"><?php echo htmlspecialchars($dish['name']); ?></h3>
                        <p class="lux-dish-desc"><?php echo htmlspecialchars($dish['description']); ?></p>
                        <div class="lux-dish-footer">
                            <span class="lux-dish-price"><?php echo formatPrice($dish['price']); ?></span>
                            <button type="button" class="lux-dish-action" onclick="openPaymentModal()">
                                Pre-Order
                            </button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div style="text-align: center; margin-top: 50px;">
            <a href="menu.php" class="lux-btn-primary">
                <span>View Complete Menu &amp; Cellar</span>
            </a>
        </div>
    </div>
</section>

<!-- The Maison Philosophy -->
<section style="padding: 110px 0;">
    <div class="lux-container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center;">
            <div style="position: relative;">
                <div style="border-radius: var(--lux-radius-lg); overflow: hidden; border: 1px solid var(--lux-border); height: 500px; box-shadow: var(--lux-shadow);">
                    <img src="../shared/assets/images/restaurant-dining.webp" alt="Maison Interior" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                </div>
            </div>
            <div>
                <span class="lux-tag">The Maison Story</span>
                <h2 class="lux-section-title" style="text-align: left;">An intimate sanctuary in the <em>capital's heart</em></h2>
                <p style="font-size: 15px; color: var(--lux-muted); line-height: 1.85; margin-bottom: 20px;">
                    Located on Garden Avenue, Peachy Plate was established as an intimate culinary atelier where modern aesthetic purity converges with deep gastronomic respect. We strip away the unnecessary noise of conventional fine dining, preserving only what matters: impeccable ingredient provenance, warm hospitality, and pure culinary honesty.
                </p>
                <p style="font-size: 15px; color: var(--lux-muted); line-height: 1.85; margin-bottom: 30px;">
                    Every sauce is reduced slowly over hours, every pasta dough is hand-kneaded from ancient wheat varieties, and our desserts embody the exacting discipline of French patisserie.
                </p>
                <a href="about.php" class="lux-btn-outline">Read Our Complete Story</a>
            </div>
        </div>
    </div>
</section>

<!-- Pillars of Excellence -->
<section style="padding: 90px 0; background: var(--lux-bg-alt); border-top: 1px solid var(--lux-border); border-bottom: 1px solid var(--lux-border);">
    <div class="lux-container">
        <div class="lux-section-header">
            <span class="lux-tag">Boutique Standards</span>
            <h2 class="lux-section-title">The Four Tenets of <em>Peachy Plate</em></h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px;">
            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px 28px; box-shadow: var(--lux-shadow);">
                <span style="font-family: var(--lux-font-serif); font-size: 32px; color: var(--lux-peach-dark); display: block; margin-bottom: 14px;">I.</span>
                <h4 style="font-family: var(--lux-font-serif); font-size: 22px; color: var(--lux-espresso); margin-bottom: 10px;">Artisanal Heritage</h4>
                <p style="font-size: 13.5px; color: var(--lux-muted); line-height: 1.7;">Fresh bronze-die extruded pasta crafted daily with organic yolks and imported Italian semola flour.</p>
            </div>

            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px 28px; box-shadow: var(--lux-shadow);">
                <span style="font-family: var(--lux-font-serif); font-size: 32px; color: var(--lux-peach-dark); display: block; margin-bottom: 14px;">II.</span>
                <h4 style="font-family: var(--lux-font-serif); font-size: 22px; color: var(--lux-espresso); margin-bottom: 10px;">Unadulterated Purity</h4>
                <p style="font-size: 13.5px; color: var(--lux-muted); line-height: 1.7;">Zero artificial colors or enhancers. All delicate hues are coaxed naturally from organic root reductions.</p>
            </div>

            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px 28px; box-shadow: var(--lux-shadow);">
                <span style="font-family: var(--lux-font-serif); font-size: 32px; color: var(--lux-peach-dark); display: block; margin-bottom: 14px;">III.</span>
                <h4 style="font-family: var(--lux-font-serif); font-size: 22px; color: var(--lux-espresso); margin-bottom: 10px;">Bespoke Service</h4>
                <p style="font-size: 13.5px; color: var(--lux-muted); line-height: 1.7;">Attentive yet unobtrusive concierge service ensuring your table feels like your private sanctuary.</p>
            </div>

            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px 28px; box-shadow: var(--lux-shadow);">
                <span style="font-family: var(--lux-font-serif); font-size: 32px; color: var(--lux-peach-dark); display: block; margin-bottom: 14px;">IV.</span>
                <h4 style="font-family: var(--lux-font-serif); font-size: 22px; color: var(--lux-espresso); margin-bottom: 10px;">Botanical Patio</h4>
                <p style="font-size: 13.5px; color: var(--lux-muted); line-height: 1.7;">An enchanting shaded garden courtyard open for intimate afternoon teas and tranquil dinners.</p>
            </div>
        </div>
    </div>
</section>

<!-- Guest Accolades -->
<section style="padding: 100px 0;">
    <div class="lux-container">
        <div class="lux-section-header">
            <span class="lux-tag">Patron Experiences</span>
            <h2 class="lux-section-title">Words from <em>Our Guests</em></h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px; box-shadow: var(--lux-shadow);">
                <p style="font-family: var(--lux-font-serif); font-size: 19px; font-style: italic; color: var(--lux-espresso); line-height: 1.6; margin-bottom: 24px;">
                    &ldquo;Peachy Plate is that rare gem where quiet luxury meets genuine warmth. The Pink Sauce Pasta is arguably the finest in the NCR, and the service is impeccably poised.&rdquo;
                </p>
                <div>
                    <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Dr. Gayatri Varma</strong>
                    <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-muted); margin-top: 2px;">Senior Curator, National Gallery</span>
                </div>
            </div>

            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px; box-shadow: var(--lux-shadow);">
                <p style="font-family: var(--lux-font-serif); font-size: 19px; font-style: italic; color: var(--lux-espresso); line-height: 1.6; margin-bottom: 24px;">
                    &ldquo;The strawberry cheesecake and Norwegian salmon were executed to textbook perfection. Minimalist, elegant, and deeply calming after a hectic work week.&rdquo;
                </p>
                <div>
                    <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Raghav Singhal</strong>
                    <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-muted); margin-top: 2px;">Managing Director, Capital Advisory</span>
                </div>
            </div>

            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 36px; box-shadow: var(--lux-shadow);">
                <p style="font-family: var(--lux-font-serif); font-size: 19px; font-style: italic; color: var(--lux-espresso); line-height: 1.6; margin-bottom: 24px;">
                    &ldquo;An extraordinary dining room where every detail whispers sophistication. Perfect for anniversary dinners and meaningful conversations.&rdquo;
                </p>
                <div>
                    <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-espresso);">Priyanka Sen</strong>
                    <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-muted); margin-top: 2px;">Architecture Principal</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Reservation Callout -->
<section style="padding: 90px 0; background: var(--lux-espresso); color: #ffffff; text-align: center;">
    <div class="lux-container">
        <span class="lux-tag" style="color: var(--lux-peach);">Reservations Open</span>
        <h2 style="font-family: var(--lux-font-serif); font-size: clamp(34px, 4.5vw, 52px); font-weight: 400; margin: 16px 0;">
            Secure Your Table in <em>Our Salon</em>
        </h2>
        <p style="max-width: 580px; margin: 0 auto 36px; font-size: 15px; color: #b8aba2; line-height: 1.8;">
            We recommend booking 24 to 48 hours in advance for dinner seatings and weekend high tea services.
        </p>
        <a href="reservation.php" class="lux-btn-primary" style="background: #ffffff; color: var(--lux-espresso); border-color: #ffffff;">
            <span>Book Your Reservation</span>
        </a>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
