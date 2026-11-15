<?php
$page_title = 'Retro Gen-Z Flavor Sanctuary';
require_once __DIR__ . '/includes/header.php';
$featured_items = getFeaturedMenuItems(6);
?>

<!-- Hero Section -->
<section class="gen-hero">
    <div class="gen-container">
        <div class="gen-hero-grid">
            <div>
                <div style="display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap;">
                    <span class="gen-sticker sticker-yellow">⚡ 100% YUM</span>
                    <span class="gen-sticker sticker-red">NEW DELHI'S BOLDEST BITES</span>
                    <span class="gen-sticker sticker-white">VIBE CHECK: PASSED</span>
                </div>
                <h1 class="gen-hero-title">
                    GOOD FOOD.<br>
                    <span class="highlight-red">CUTE MOODS.</span><br>
                    ZERO CHILL.
                </h1>
                <p class="gen-hero-desc">
                    We took classic Italian comfort, dipped it in punchy Y2K nostalgia, and served it hot. Handcrafted pink sauce rigatoni, woodfired sourdough slices, and cold brews that hit just right.
                </p>
                <div class="gen-hero-ctas">
                    <a href="menu.php" class="gen-btn-primary">
                        <span>EXPLORE FULL MENU</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                    <a href="reservation.php" class="gen-btn-yellow">
                        <span>BOOK A SPOT</span>
                        <i class="fa-solid fa-fire"></i>
                    </a>
                </div>
                <div style="display: flex; gap: 20px; align-items: center; border-top: 2px dashed #d4d4d8; padding-top: 20px; font-weight: 700; font-size: 13px;">
                    <div>🔥 48hr Sourdough</div>
                    <div>🧀 Pugliese Burrata</div>
                    <div>🍧 Biscoff Thick Shakes</div>
                </div>
            </div>

            <!-- Hero Visual Frame with Stickers -->
            <div class="gen-hero-visual">
                <div class="gen-visual-box">
                    <span class="gen-sticker sticker-red gen-sticker-float-1">★ CHEF'S KISS ★</span>
                    <img src="../shared/assets/images/pink-sauce-pasta.webp" alt="Pink Sauce Rigatoni" loading="eager" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                    <span class="gen-sticker sticker-yellow gen-sticker-float-2">🔥 PINK SAUCE PASTA ₹299</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Retro Caution Tape Marquee -->
<div class="gen-marquee">
    <div class="gen-marquee-track">
        <div class="gen-marquee-content">
            <span>⚡ FRESH SOURDOUGH PIZZA</span>
            <span>★</span>
            <span>🍓 FRESH STRAWBERRY CHEESECAKE</span>
            <span>★</span>
            <span>🍝 VELVETY PINK SAUCE RIGATONI</span>
            <span>★</span>
            <span>☕ SHAKEN COLD ESPRESSO</span>
            <span>★</span>
            <span>🛹 RETRO DINER ENERGY</span>
            <span>★</span>
            <span>💥 24 GARDEN AVENUE NEW DELHI</span>
            <span>★</span>
        </div>
        <div class="gen-marquee-content">
            <span>⚡ FRESH SOURDOUGH PIZZA</span>
            <span>★</span>
            <span>🍓 FRESH STRAWBERRY CHEESECAKE</span>
            <span>★</span>
            <span>🍝 VELVETY PINK SAUCE RIGATONI</span>
            <span>★</span>
            <span>☕ SHAKEN COLD ESPRESSO</span>
            <span>★</span>
            <span>🛹 RETRO DINER ENERGY</span>
            <span>★</span>
            <span>💥 24 GARDEN AVENUE NEW DELHI</span>
            <span>★</span>
        </div>
    </div>
</div>

<!-- Featured Dishes Grid -->
<section style="padding: 90px 0;">
    <div class="gen-container">
        <div class="gen-section-header">
            <span class="gen-sticker sticker-yellow">⚡ HOT DROPS</span>
            <h2 class="gen-section-title">TOP TIER TASTE ONLY</h2>
            <p class="gen-section-desc">Handmade comfort cuisine engineered for maximum dopamine.</p>
        </div>

        <div class="gen-cards-grid">
            <?php foreach ($featured_items as $dish): ?>
                <div class="gen-dish-card">
                    <div class="gen-dish-thumb-wrap">
                        <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="gen-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <div class="gen-dish-veg">
                            <span class="<?php echo $dish['is_veg'] ? 'dot-veg' : 'dot-nonveg'; ?>" style="width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
                        </div>
                        <?php if ($dish['is_bestseller']): ?>
                            <span class="gen-sticker sticker-red" style="position: absolute; bottom: 8px; left: 8px; font-size: 10px; padding: 3px 8px;">★ BESTSELLER</span>
                        <?php endif; ?>
                    </div>
                    <div class="gen-dish-body">
                        <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--gen-red); margin-bottom: 4px;"><?php echo htmlspecialchars($dish['category']); ?></span>
                        <h3 class="gen-dish-name"><?php echo htmlspecialchars($dish['name']); ?></h3>
                        <p class="gen-dish-desc"><?php echo htmlspecialchars($dish['description']); ?></p>
                        <div class="gen-dish-footer">
                            <span class="gen-dish-price"><?php echo formatPrice($dish['price']); ?></span>
                            <button type="button" class="gen-btn-yellow" style="padding: 6px 14px; font-size: 12px;" onclick="openPaymentModal()">
                                DROP IN CART ⚡
                            </button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div style="text-align: center; margin-top: 50px;">
            <a href="menu.php" class="gen-btn-primary" style="font-size: 16px; padding: 14px 32px;">
                <span>EXPLORE ALL 20+ DISHES</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- Horizontal Scrolling Food Drop Preview -->
<section style="padding: 70px 0; background: var(--gen-bg-alt); border-top: 3px solid var(--gen-ink); border-bottom: 3px solid var(--gen-ink);">
    <div class="gen-container">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <div>
                <span class="gen-sticker sticker-red">⚡ HORIZONTAL DISH TRACK</span>
                <h3 style="font-family: var(--gen-font-display); font-size: 28px; text-transform: uppercase; margin-top: 8px;">TRENDING FLAVORS ON TIKTOK</h3>
            </div>
            <div style="font-size: 13px; font-weight: 800; color: var(--gen-muted);">SCROLL HORIZONTALLY &rarr;</div>
        </div>

        <div class="gen-horiz-scroll-wrap">
            <div class="gen-dish-card" style="min-width: 300px; flex-shrink: 0;">
                <div class="gen-dish-thumb-wrap" style="height: 190px;">
                    <img src="../shared/assets/images/lotus-biscoff-shake.webp" class="gen-dish-thumb" alt="Lotus Shake" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                </div>
                <h4 class="gen-dish-name" style="font-size: 18px;">Lotus Biscoff Shake</h4>
                <p class="gen-dish-desc">Thick Belgian cookie cream with caramel ribbons.</p>
                <div class="gen-dish-footer">
                    <span class="gen-dish-price">₹229</span>
                    <span class="gen-sticker sticker-yellow" style="font-size: 10px;">TOP SHAKE</span>
                </div>
            </div>

            <div class="gen-dish-card" style="min-width: 300px; flex-shrink: 0;">
                <div class="gen-dish-thumb-wrap" style="height: 190px;">
                    <img src="../shared/assets/images/truffle-fries.webp" class="gen-dish-thumb" alt="Truffle Fries" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                </div>
                <h4 class="gen-dish-name" style="font-size: 18px;">Truffle Parmesan Fries</h4>
                <p class="gen-dish-desc">Crispy Russets drenched in black truffle snow.</p>
                <div class="gen-dish-footer">
                    <span class="gen-dish-price">₹199</span>
                    <span class="gen-sticker sticker-red" style="font-size: 10px;">CRAZY CRISP</span>
                </div>
            </div>

            <div class="gen-dish-card" style="min-width: 300px; flex-shrink: 0;">
                <div class="gen-dish-thumb-wrap" style="height: 190px;">
                    <img src="../shared/assets/images/margherita-pizza.webp" class="gen-dish-thumb" alt="Pizza" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                </div>
                <h4 class="gen-dish-name" style="font-size: 18px;">Neapolitan Margherita</h4>
                <p class="gen-dish-desc">San Marzano tomatoes &amp; fresh fior di latte melt.</p>
                <div class="gen-dish-footer">
                    <span class="gen-dish-price">₹349</span>
                    <span class="gen-sticker sticker-yellow" style="font-size: 10px;">48HR DOUGH</span>
                </div>
            </div>

            <div class="gen-dish-card" style="min-width: 300px; flex-shrink: 0;">
                <div class="gen-dish-thumb-wrap" style="height: 190px;">
                    <img src="../shared/assets/images/strawberry-cheesecake.webp" class="gen-dish-thumb" alt="Strawberry Cheesecake" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                </div>
                <h4 class="gen-dish-name" style="font-size: 18px;">Strawberry Cheesecake</h4>
                <p class="gen-dish-desc">Silky NY slice with fresh Mahabaleshwar berries.</p>
                <div class="gen-dish-footer">
                    <span class="gen-dish-price">₹249</span>
                    <span class="gen-sticker sticker-orange" style="font-size: 10px;">ICONIC SWEET</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- The Vibe Story Intro -->
<section style="padding: 100px 0;">
    <div class="gen-container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center;">
            <div style="position: relative;">
                <div style="background: var(--gen-red); border: 3px solid var(--gen-ink); box-shadow: var(--gen-shadow-lg); border-radius: var(--gen-radius-lg); padding: 16px; transform: rotate(-2deg);">
                    <img src="../shared/assets/images/restaurant-interior.webp" alt="Retro Gen-Z Diner" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';" style="border-radius: var(--gen-radius-md); border: 2px solid var(--gen-ink); height: 420px; width: 100%; object-fit: cover;">
                </div>
                <span class="gen-sticker sticker-yellow" style="position: absolute; bottom: -15px; left: 30px; font-size: 14px;">📍 24, GARDEN AVE, DELHI</span>
            </div>
            <div>
                <span class="gen-sticker sticker-yellow">🛹 THE ORIGIN</span>
                <h2 class="gen-section-title" style="text-align: left;">BUILT FOR FOODIES WHO REFUSE BORING DINING</h2>
                <p style="font-size: 17px; color: var(--gen-muted); margin: 20px 0; line-height: 1.7;">
                    Peachy Plate is our antidote to bland cafes. We created a loud, joyful space where the music is lively, the food is unapologetically rich, and every table has that electric main character energy.
                </p>
                <div style="display: flex; gap: 14px; margin-top: 24px;">
                    <a href="about.php" class="gen-btn-primary">DISCOVER OUR VIBE</a>
                    <a href="gallery.php" class="gen-btn-yellow">CHECK THE FEED</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Why Choose Us -->
<section style="padding: 80px 0; background: #ffffff; border-top: 3px solid var(--gen-ink); border-bottom: 3px solid var(--gen-ink);">
    <div class="gen-container">
        <div class="gen-section-header">
            <span class="gen-sticker sticker-red">⚡ WHY PEACHY HITS DIFFERENT</span>
            <h2 class="gen-section-title">THE STANDARDS WE NEVER BREAK</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
            <div style="border: 2px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 28px; background: var(--gen-bg);">
                <div style="font-size: 32px; margin-bottom: 12px;">🍅</div>
                <h4 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase;">100% REAL SAUCES</h4>
                <p style="color: var(--gen-muted); font-size: 14px; margin-top: 8px;">No canned shortcuts. Real San Marzano tomatoes and cream simmered slow for velvety perfection.</p>
            </div>
            <div style="border: 2px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 28px; background: var(--gen-bg-alt);">
                <div style="font-size: 32px; margin-bottom: 12px;">🍕</div>
                <h4 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase;">48HR COLD FERMENT</h4>
                <p style="color: var(--gen-muted); font-size: 14px; margin-top: 8px;">Light, airy sourdough crusts with blistered leopard spots that won't leave you feeling bloated.</p>
            </div>
            <div style="border: 2px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 28px; background: var(--gen-bg);">
                <div style="font-size: 32px; margin-bottom: 12px;">☕</div>
                <h4 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase;">SPECIALTY BEANS</h4>
                <p style="color: var(--gen-muted); font-size: 14px; margin-top: 8px;">Chikmagalur single-origin beans, pulled fresh through our espresso machine for zero bitterness.</p>
            </div>
            <div style="border: 2px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 28px; background: var(--gen-bg-alt);">
                <div style="font-size: 32px; margin-bottom: 12px;">🐶</div>
                <h4 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase;">PETS WELCOME</h4>
                <p style="color: var(--gen-muted); font-size: 14px; margin-top: 8px;">Outdoor courtyard is 100% pup friendly with water bowls and organic peanut butter pup-cups!</p>
            </div>
        </div>
    </div>
</section>

<!-- Testimonials -->
<section style="padding: 90px 0;">
    <div class="gen-container">
        <div class="gen-section-header">
            <span class="gen-sticker sticker-yellow">⚡ THE WORD ON THE STREET</span>
            <h2 class="gen-section-title">WHAT THE SQUAD IS SAYING</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
            <div style="background: #ffffff; border: 2.5px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 30px;">
                <div style="color: var(--gen-red); font-size: 18px; margin-bottom: 12px;">★★★★★</div>
                <p style="font-weight: 700; font-size: 16px; line-height: 1.5; margin-bottom: 18px;">
                    &ldquo;Obsessed with the Pink Sauce Pasta! Best comfort meal in South Delhi hands down. The sticker aesthetic is super fire.&rdquo;
                </p>
                <span class="gen-sticker sticker-yellow" style="font-size: 11px;">Rhea Chadha &bull; Content Creator</span>
            </div>

            <div style="background: #ffffff; border: 2.5px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 30px;">
                <div style="color: var(--gen-red); font-size: 18px; margin-bottom: 12px;">★★★★★</div>
                <p style="font-weight: 700; font-size: 16px; line-height: 1.5; margin-bottom: 18px;">
                    &ldquo;That Biscoff Shake cured my burnout. The energy here is unmatched, great playlist and friendly staff!&rdquo;
                </p>
                <span class="gen-sticker sticker-red" style="font-size: 11px;">Aryan Kapoor &bull; UI Designer</span>
            </div>

            <div style="background: #ffffff; border: 2.5px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 30px;">
                <div style="color: var(--gen-red); font-size: 18px; margin-bottom: 12px;">★★★★★</div>
                <p style="font-weight: 700; font-size: 16px; line-height: 1.5; margin-bottom: 18px;">
                    &ldquo;Brought my golden retriever to the courtyard. Amazing food, quick service, and super cool vibes.&rdquo;
                </p>
                <span class="gen-sticker sticker-orange" style="font-size: 11px;">Karan &amp; Simba &bull; Delhi Local</span>
            </div>
        </div>
    </div>
</section>

<!-- Location & CTA Strip -->
<section style="padding: 60px 0; background: var(--gen-red); color: #ffffff; border-top: 3px solid var(--gen-ink); border-bottom: 3px solid var(--gen-ink);">
    <div class="gen-container" style="text-align: center;">
        <span class="gen-sticker sticker-yellow" style="color: var(--gen-ink); font-size: 13px;">⚡ HUNGRY YET?</span>
        <h2 style="font-family: var(--gen-font-display); font-size: clamp(34px, 5vw, 52px); text-transform: uppercase; margin: 14px 0;">GRAB YOUR SEAT AT PEACHY PLATE</h2>
        <p style="max-width: 600px; margin: 0 auto 30px; font-size: 17px; font-weight: 500; opacity: 0.95;">
            24, Garden Avenue, New Delhi &bull; Open Daily 11:00 AM – 11:00 PM &bull; Call: <?php echo RESTAURANT_PHONE; ?>
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="reservation.php" class="gen-btn-yellow" style="font-size: 16px; padding: 14px 32px;">RESERVE TABLE NOW</a>
            <a href="menu.php" class="gen-btn-primary" style="background: #ffffff; color: var(--gen-ink); font-size: 16px; padding: 14px 32px;">VIEW FULL MENU</a>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
