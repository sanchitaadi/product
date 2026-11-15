<?php
$page_title = 'Good Food. Cute Moods.';
require_once __DIR__ . '/includes/header.php';
$featured_items = getFeaturedMenuItems(6);
?>

<!-- Hero Section -->
<section class="coq-hero">
    <div class="coq-container">
        <div class="coq-hero-grid">
            <div class="coq-hero-content">
                <div class="coq-hero-badge">
                    <span>🎀</span>
                    <span>NEW DELHI'S MOST AESTHETIC CAFE</span>
                </div>
                <h1 class="coq-hero-title">
                    Good food, soft light &amp; <span class="glow-word">cute moods</span> every day.
                </h1>
                <p class="coq-hero-desc">
                    Step into an enchanting sanctuary of blush tones, fresh flowers, and artisan comfort cuisine. From our signature pink sauce pasta to delicate strawberry chantilly tarts.
                </p>
                <div class="coq-hero-ctas">
                    <a href="menu.php" class="coq-btn-primary">
                        <span>Explore Our Menu</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                    <a href="reservation.php" class="coq-btn-secondary">
                        <i class="fa-regular fa-calendar-check" style="color: var(--coq-rose);"></i>
                        <span>Book a Table</span>
                    </a>
                </div>
                <div class="coq-hero-features-strip">
                    <div class="coq-feature-item">
                        <i class="fa-solid fa-seedling"></i>
                        <span>100% Fresh Farm Produce</span>
                    </div>
                    <div class="coq-feature-item">
                        <i class="fa-solid fa-heart"></i>
                        <span>Handmade Pasta &amp; Sourdough</span>
                    </div>
                    <div class="coq-feature-item">
                        <i class="fa-solid fa-camera-retro"></i>
                        <span>Pinterest-Ready Ambience</span>
                    </div>
                </div>
            </div>

            <!-- Hero Pinterest Collage -->
            <div class="coq-hero-collage">
                <div class="coq-collage-stack">
                    <div class="coq-pin-card pin-1">
                        <img src="../shared/assets/images/pink-sauce-pasta.webp" alt="Pink Sauce Pasta" loading="eager" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <div class="coq-pin-label">Signature Pink Sauce Rigatoni ✦ ₹299</div>
                    </div>
                    <div class="coq-pin-card pin-2">
                        <img src="../shared/assets/images/strawberry-cheesecake.webp" alt="Strawberry Cheesecake" loading="eager" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <div class="coq-pin-label">Strawberry Chantilly Cake ✦ ₹249</div>
                    </div>
                    <div class="pin-floating-tag">
                        <span>🌸 100% Cute Moods Guaranteed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Animated Marquee Banner -->
<div class="coq-marquee-wrap">
    <div class="coq-marquee-track">
        <div class="coq-marquee-content">
            <span>🎀 HANDCRAFTED PINK SAUCE PASTA</span>
            <span class="sep">✦</span>
            <span>🌸 AESTHETIC GARDEN SEATING</span>
            <span class="sep">✦</span>
            <span>🍰 MAHLESHWAR STRAWBERRY TARTS</span>
            <span class="sep">✦</span>
            <span>☕ ARTISAN COLD COFFEE &amp; BISCOFF SHAKES</span>
            <span class="sep">✦</span>
            <span>✨ PET FRIENDLY OUTDOOR PATIO</span>
            <span class="sep">✦</span>
            <span>💌 TABLE RESERVATIONS OPEN</span>
            <span class="sep">✦</span>
        </div>
        <div class="coq-marquee-content">
            <span>🎀 HANDCRAFTED PINK SAUCE PASTA</span>
            <span class="sep">✦</span>
            <span>🌸 AESTHETIC GARDEN SEATING</span>
            <span class="sep">✦</span>
            <span>🍰 MAHLESHWAR STRAWBERRY TARTS</span>
            <span class="sep">✦</span>
            <span>☕ ARTISAN COLD COFFEE &amp; BISCOFF SHAKES</span>
            <span class="sep">✦</span>
            <span>✨ PET FRIENDLY OUTDOOR PATIO</span>
            <span class="sep">✦</span>
            <span>💌 TABLE RESERVATIONS OPEN</span>
            <span class="sep">✦</span>
        </div>
    </div>
</div>

<!-- Featured Dishes -->
<section style="padding: 90px 0;">
    <div class="coq-container">
        <div class="coq-section-header">
            <span class="coq-tag-pill">🌸 Chef's Sweetheart Selection</span>
            <h2 class="coq-section-title">Irresistible bites crafted for <em>pure delight</em></h2>
            <p class="coq-section-subtitle">Every plate is composed with delicate aesthetics, rich flavors, and honest local ingredients that nourish your soul.</p>
        </div>

        <div class="coq-dishes-grid">
            <?php foreach ($featured_items as $dish): ?>
                <div class="coq-dish-card">
                    <div class="coq-dish-thumb-wrap">
                        <img src="<?php echo htmlspecialchars(getFoodImageUrl($dish['image_url'])); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="coq-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <?php if ($dish['is_bestseller']): ?>
                            <span class="coq-bestseller-badge"><span>🎀</span> Bestseller</span>
                        <?php endif; ?>
                        <div class="coq-veg-badge">
                            <span class="<?php echo $dish['is_veg'] ? 'dot-veg' : 'dot-nonveg'; ?>" title="<?php echo $dish['is_veg'] ? 'Vegetarian' : 'Non-Vegetarian'; ?>"></span>
                        </div>
                    </div>
                    <div class="coq-dish-body">
                        <span class="coq-dish-cat"><?php echo htmlspecialchars($dish['category']); ?></span>
                        <h3 class="coq-dish-title"><?php echo htmlspecialchars($dish['name']); ?></h3>
                        <p class="coq-dish-desc"><?php echo htmlspecialchars($dish['description']); ?></p>
                        <div class="coq-dish-footer">
                            <span class="coq-dish-price"><?php echo formatPrice($dish['price']); ?></span>
                            <a href="menu.php" class="coq-dish-action">View In Menu &rarr;</a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div style="text-align: center; margin-top: 50px;">
            <a href="menu.php" class="coq-btn-primary">
                <span>View Full 20+ Dish Menu</span>
                <i class="fa-solid fa-sparkles"></i>
            </a>
        </div>
    </div>
</section>

<!-- Restaurant Story Section -->
<section class="coq-story-section">
    <div class="coq-container">
        <div class="coq-story-grid">
            <div class="coq-story-frame">
                <img src="../shared/assets/images/restaurant-interior.webp" alt="Peachy Plate Cafe Interior" class="coq-story-img-main" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-story-img-badge">
                    <span class="num">100%</span>
                    <span class="label">Made With Love &amp;<br>Aesthetic Comfort</span>
                </div>
            </div>
            <div class="coq-story-content">
                <span class="coq-tag-pill">✨ The Peachy Story</span>
                <h2 class="coq-section-title">Where Parisian cafe charm meets <em>warm Delhi hospitality</em></h2>
                <p>
                    Peachy Plate was born out of a simple daydream: creating an uplifting haven where every corner feels like a page from your favorite Pinterest board, and every dish tastes like homemade perfection.
                </p>
                <p>
                    Nestled in Garden Avenue, our cafe blends delicate vintage romanticism with contemporary continental flavors. Whether you are catching up over pink lattes, celebrating an intimate birthday, or finding your creative flow in our sunlit corner booth, we are here to make your day prettier.
                </p>
                <div style="display: flex; gap: 16px; margin-top: 30px;">
                    <a href="about.php" class="coq-btn-primary">Read Our Story</a>
                    <a href="gallery.php" class="coq-btn-secondary">Tour Ambience</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Food Categories Grid -->
<section style="padding: 90px 0;">
    <div class="coq-container">
        <div class="coq-section-header">
            <span class="coq-tag-pill">🍰 Our Culinary Chapters</span>
            <h2 class="coq-section-title">Explore by <em>category</em></h2>
            <p class="coq-section-subtitle">From crispy golden starters to velvety dessert creations.</p>
        </div>

        <div class="coq-cat-grid">
            <a href="menu.php?cat=Starters" class="coq-cat-card">
                <img src="../shared/assets/images/truffle-fries.webp" alt="Starters" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-cat-overlay">
                    <h4>Starters</h4>
                    <span>Truffle fries &amp; bruschetta &rarr;</span>
                </div>
            </a>
            <a href="menu.php?cat=Pizza and Pasta" class="coq-cat-card">
                <img src="../shared/assets/images/pink-sauce-pasta.webp" alt="Pizza &amp; Pasta" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-cat-overlay">
                    <h4>Pizza &amp; Pasta</h4>
                    <span>Handcrafted rosa rigatoni &rarr;</span>
                </div>
            </a>
            <a href="menu.php?cat=Main Course" class="coq-cat-card">
                <img src="../shared/assets/images/citrus-salmon.webp" alt="Main Course" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-cat-overlay">
                    <h4>Main Course</h4>
                    <span>Grilled steaks &amp; risotto &rarr;</span>
                </div>
            </a>
            <a href="menu.php?cat=Desserts" class="coq-cat-card">
                <img src="../shared/assets/images/strawberry-cheesecake.webp" alt="Desserts" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-cat-overlay">
                    <h4>Desserts</h4>
                    <span>Cheesecakes &amp; macarons &rarr;</span>
                </div>
            </a>
            <a href="menu.php?cat=Beverages" class="coq-cat-card">
                <img src="../shared/assets/images/peach-hibiscus-cooler.webp" alt="Beverages" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-cat-overlay">
                    <h4>Beverages</h4>
                    <span>Cold brew &amp; Biscoff shakes &rarr;</span>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- Why Choose Us -->
<section style="padding: 80px 0; background: #FFF9FA;">
    <div class="coq-container">
        <div class="coq-section-header">
            <span class="coq-tag-pill">💖 The Peachy Difference</span>
            <h2 class="coq-section-title">Crafted with care, served with a <em>smile</em></h2>
        </div>

        <div class="coq-why-grid">
            <div class="coq-why-card">
                <div class="coq-why-icon"><i class="fa-solid fa-wheat-awn"></i></div>
                <h4>Slow-Cooked Authenticity</h4>
                <p>Sauces simmered for hours, artisan pastas kneaded daily, and fresh bakery dough fermented for 48 hours.</p>
            </div>
            <div class="coq-why-card">
                <div class="coq-why-icon"><i class="fa-solid fa-palette"></i></div>
                <h4>Instagrammable Interiors</h4>
                <p>Designed with pastel hues, soft ambient warm lighting, and floral styling made for your prettiest photos.</p>
            </div>
            <div class="coq-why-card">
                <div class="coq-why-icon"><i class="fa-solid fa-seedling"></i></div>
                <h4>Clean &amp; Wholesome</h4>
                <p>Zero palm oil, only pure unsalted butter, Himalayan rock salt, and ethically sourced organic greens.</p>
            </div>
            <div class="coq-why-card">
                <div class="coq-why-icon"><i class="fa-solid fa-paw"></i></div>
                <h4>Pet-Friendly Patio</h4>
                <p>Bring your furry companions to our sunlit garden courtyard with special complimentary puppy treats!</p>
            </div>
        </div>
    </div>
</section>

<!-- Customer Testimonials -->
<section style="padding: 90px 0;">
    <div class="coq-container">
        <div class="coq-section-header">
            <span class="coq-tag-pill">💌 Sweet Love Notes</span>
            <h2 class="coq-section-title">What our guests are <em>saying</em></h2>
        </div>

        <div class="coq-testi-grid">
            <div class="coq-testi-card">
                <div class="coq-stars">★★★★★</div>
                <p class="coq-testi-quote">
                    &ldquo;Peachy Plate is easily the prettiest cafe in New Delhi! The pink sauce pasta is deeply creamy without feeling heavy, and the strawberry cheesecake tastes heavenly.&rdquo;
                </p>
                <div class="coq-testi-author">
                    <img src="../shared/assets/images/avatar-1.webp" alt="Aanya Roy" class="coq-testi-avatar" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                    <div class="coq-testi-meta">
                        <strong>Aanya Roy</strong>
                        <span>Lifestyle &amp; Fashion Blogger</span>
                    </div>
                </div>
            </div>

            <div class="coq-testi-card">
                <div class="coq-stars">★★★★★</div>
                <p class="coq-testi-quote">
                    &ldquo;Booked a window booth for my best friend’s birthday. The team had set up cute floral bows and fairy lights. Their Biscoff shake and truffle fries are top notch!&rdquo;
                </p>
                <div class="coq-testi-author">
                    <img src="../shared/assets/images/avatar-2.webp" alt="Meera Sen" class="coq-testi-avatar" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                    <div class="coq-testi-meta">
                        <strong>Meera Sen</strong>
                        <span>Architect &amp; Interior Designer</span>
                    </div>
                </div>
            </div>

            <div class="coq-testi-card">
                <div class="coq-stars">★★★★★</div>
                <p class="coq-testi-quote">
                    &ldquo;Finally a cafe where the food is just as exceptional as the aesthetics. The burrata peach salad and Norwegian salmon were cooked to absolute Michelin standard perfection.&rdquo;
                </p>
                <div class="coq-testi-author">
                    <img src="../shared/assets/images/avatar-3.webp" alt="Kabir Verma" class="coq-testi-avatar" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                    <div class="coq-testi-meta">
                        <strong>Kabir Verma</strong>
                        <span>Food Critic &amp; Columnist</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Instagram Moodboard Grid -->
<section style="padding-bottom: 70px;">
    <div class="coq-container">
        <div class="coq-section-header">
            <span class="coq-tag-pill">📸 @peachyplate.delhi</span>
            <h2 class="coq-section-title">Follow the <em>peach aesthetic</em></h2>
            <p class="coq-section-subtitle">Tag us in your sweetest moments to get featured on our feed.</p>
        </div>

        <div class="coq-insta-grid">
            <div class="coq-insta-item">
                <img src="../shared/assets/images/truffle-tagliolini.webp" alt="Pasta Bowl" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-insta-hover"><i class="fa-solid fa-heart"></i> 1.4k</div>
            </div>
            <div class="coq-insta-item">
                <img src="../shared/assets/images/espresso-tiramisu.webp" alt="Tiramisu" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-insta-hover"><i class="fa-solid fa-heart"></i> 2.1k</div>
            </div>
            <div class="coq-insta-item">
                <img src="../shared/assets/images/velvet-cold-coffee.webp" alt="Iced Coffee" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-insta-hover"><i class="fa-solid fa-heart"></i> 980</div>
            </div>
            <div class="coq-insta-item">
                <img src="../shared/assets/images/parisian-macarons.webp" alt="Macarons" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-insta-hover"><i class="fa-solid fa-heart"></i> 3.2k</div>
            </div>
            <div class="coq-insta-item">
                <img src="../shared/assets/images/margherita-pizza.webp" alt="Sourdough Pizza" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-insta-hover"><i class="fa-solid fa-heart"></i> 1.8k</div>
            </div>
            <div class="coq-insta-item">
                <img src="../shared/assets/images/peach-hibiscus-cooler.webp" alt="Peach Cooler" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="coq-insta-hover"><i class="fa-solid fa-heart"></i> 1.1k</div>
            </div>
        </div>

        <!-- Hours & Location Preview Strip -->
        <div class="coq-info-strip">
            <div class="coq-info-col">
                <h4>📍 Find Our Sanctuary</h4>
                <p><?php echo RESTAURANT_ADDRESS; ?><br>Complimentary valet parking available</p>
            </div>
            <div class="coq-info-col">
                <h4>⏰ Cafe Hours</h4>
                <p>Monday to Sunday<br><?php echo RESTAURANT_HOURS; ?></p>
            </div>
            <div class="coq-info-col">
                <h4>💌 Table Inquiries</h4>
                <p><?php echo RESTAURANT_PHONE; ?><br><?php echo RESTAURANT_EMAIL; ?></p>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
