<?php
$page_title = 'Pinterest Visual Gallery & Ambience';
require_once __DIR__ . '/includes/header.php';

// Gallery dataset with high resolution photography
$gallery_items = [
    [
        'title' => 'Signature Pink Sauce Rigatoni with Fresh Basil',
        'category' => 'food',
        'image' => '../shared/assets/images/pink-sauce-pasta.webp',
        'likes' => '2.4k'
    ],
    [
        'title' => 'Sunlit Dining Corner with Velvet Rose Booths',
        'category' => 'ambience',
        'image' => '../shared/assets/images/restaurant-interior.webp',
        'likes' => '3.1k'
    ],
    [
        'title' => 'Strawberry Chantilly Baked Cheesecake Slice',
        'category' => 'desserts',
        'image' => '../shared/assets/images/strawberry-cheesecake.webp',
        'likes' => '4.8k'
    ],
    [
        'title' => 'Afternoon High Tea Table Setting & Florals',
        'category' => 'moments',
        'image' => '../shared/assets/images/restaurant-dining.webp',
        'likes' => '1.9k'
    ],
    [
        'title' => 'Artisan Neapolitan Margherita Sourdough Pizza',
        'category' => 'food',
        'image' => '../shared/assets/images/margherita-pizza.webp',
        'likes' => '2.2k'
    ],
    [
        'title' => 'Rose Pistachio Parisian Macaron Box',
        'category' => 'desserts',
        'image' => '../shared/assets/images/parisian-macarons.webp',
        'likes' => '3.6k'
    ],
    [
        'title' => 'Golden Truffle Fries with Garlic Aioli Dip',
        'category' => 'food',
        'image' => '../shared/assets/images/truffle-fries.webp',
        'likes' => '1.7k'
    ],
    [
        'title' => 'Lotus Biscoff Thick Shake & Velvet Cold Brew',
        'category' => 'food',
        'image' => '../shared/assets/images/lotus-biscoff-shake.webp',
        'likes' => '2.9k'
    ],
    [
        'title' => 'Italian Tiramisu Paradiso with Belgian Cocoa Dusting',
        'category' => 'desserts',
        'image' => '../shared/assets/images/espresso-tiramisu.webp',
        'likes' => '3.3k'
    ],
    [
        'title' => 'Intimate Garden Courtyard Fairy Light Evenings',
        'category' => 'ambience',
        'image' => '../shared/assets/images/restaurant-garden.webp',
        'likes' => '2.7k'
    ],
    [
        'title' => 'Burrata & Charred Heirloom Peach Bruschetta',
        'category' => 'food',
        'image' => '../shared/assets/images/burrata-bruschetta.webp',
        'likes' => '1.5k'
    ],
    [
        'title' => 'Guests Celebrating Birthday Moments at Peachy Plate',
        'category' => 'moments',
        'image' => '../shared/assets/images/hero-coquette.webp',
        'likes' => '4.1k'
    ]
];
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">📸 Visual Moodboard</span>
        <h1 class="coq-section-title">The Pinterest <em>Gallery</em></h1>
        <p class="coq-section-subtitle">
            A visual love letter to pastel aesthetics, golden afternoons, and platefuls of pure indulgence. Click any image to view in high resolution.
        </p>
    </div>
</div>

<!-- Gallery Section -->
<section style="padding-bottom: 90px;">
    <div class="coq-container">
        <!-- Filter Tabs -->
        <div class="coq-filter-bar">
            <button type="button" class="coq-filter-btn active" data-filter="all">✦ All Pins (<?php echo count($gallery_items); ?>)</button>
            <button type="button" class="coq-filter-btn" data-filter="food">🍝 Food &amp; Pasta</button>
            <button type="button" class="coq-filter-btn" data-filter="desserts">🍰 Pastries &amp; Desserts</button>
            <button type="button" class="coq-filter-btn" data-filter="ambience">🌸 Cafe Ambience</button>
            <button type="button" class="coq-filter-btn" data-filter="moments">💌 Guest Moments</button>
        </div>

        <!-- Pinterest-like Grid -->
        <div class="coq-dishes-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
            <?php foreach ($gallery_items as $item): ?>
                <a href="#" class="coq-dish-card menu-item-filterable coq-gallery-trigger" 
                   data-category="<?php echo htmlspecialchars($item['category']); ?>"
                   data-img="<?php echo htmlspecialchars($item['image']); ?>"
                   data-caption="<?php echo htmlspecialchars($item['title']); ?>">
                    <div class="coq-dish-thumb-wrap" style="height: 300px; margin-bottom: 12px;">
                        <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="<?php echo htmlspecialchars($item['title']); ?>" class="coq-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <div class="coq-bestseller-badge">
                            <i class="fa-solid fa-heart" style="color: var(--coq-rose);"></i> <?php echo $item['likes']; ?> pins
                        </div>
                    </div>
                    <div style="padding: 4px 6px;">
                        <span class="coq-dish-cat"><?php echo strtoupper($item['category']); ?></span>
                        <h4 style="font-family: var(--coq-font-serif); font-size: 16px; color: var(--coq-text); line-height: 1.4; margin-top: 4px;">
                            <?php echo htmlspecialchars($item['title']); ?>
                        </h4>
                        <div style="margin-top: 8px; font-size: 12px; color: var(--coq-rose-dark); font-weight: 600;">
                            <span>Click to enlarge ✦</span>
                        </div>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>

        <div style="text-align: center; margin-top: 60px;">
            <p style="font-size: 15px; color: var(--coq-text-muted); margin-bottom: 20px;">Ready to create your own aesthetic memory?</p>
            <a href="reservation.php" class="coq-btn-primary">Book Your Table Experience</a>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
