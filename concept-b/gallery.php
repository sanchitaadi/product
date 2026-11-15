<?php
$page_title = 'The Photo Feed & Drop Log';
require_once __DIR__ . '/includes/header.php';

$gallery_items = [
    [
        'title' => 'Pink Sauce Rigatoni with Burrata Melt',
        'category' => 'food',
        'image' => '../shared/assets/images/pink-sauce-pasta.webp',
        'sticker' => 'TOP DISH'
    ],
    [
        'title' => 'Retro Booths & Neon Lighting Ambience',
        'category' => 'ambience',
        'image' => '../shared/assets/images/restaurant-interior.webp',
        'sticker' => 'THE SPACE'
    ],
    [
        'title' => 'Fresh Strawberry Cheesecake Slice',
        'category' => 'desserts',
        'image' => '../shared/assets/images/strawberry-cheesecake.webp',
        'sticker' => 'SWEET DROP'
    ],
    [
        'title' => 'Friends Hanging Out at Garden Patio',
        'category' => 'moments',
        'image' => '../shared/assets/images/restaurant-dining.webp',
        'sticker' => 'SQUAD'
    ],
    [
        'title' => '48hr Fermented Neapolitan Pizza',
        'category' => 'food',
        'image' => '../shared/assets/images/margherita-pizza.webp',
        'sticker' => 'WOODFIRE'
    ],
    [
        'title' => 'Lotus Biscoff Shake with Cookie Crumbs',
        'category' => 'food',
        'image' => '../shared/assets/images/lotus-biscoff-shake.webp',
        'sticker' => 'FIRE SHAKE'
    ],
    [
        'title' => 'Rose Pistachio French Macarons Box',
        'category' => 'desserts',
        'image' => '../shared/assets/images/parisian-macarons.webp',
        'sticker' => 'PARISIAN'
    ],
    [
        'title' => 'Truffle Parmesan Hand-cut Fries',
        'category' => 'food',
        'image' => '../shared/assets/images/truffle-fries.webp',
        'sticker' => 'CRISPY'
    ],
    [
        'title' => 'Velvet Iced Cold Coffee Shaken',
        'category' => 'food',
        'image' => '../shared/assets/images/velvet-cold-coffee.webp',
        'sticker' => 'COLD BREW'
    ],
    [
        'title' => 'Tiramisu Paradiso with Cocoa Powder',
        'category' => 'desserts',
        'image' => '../shared/assets/images/espresso-tiramisu.webp',
        'sticker' => 'CLASSIC'
    ],
    [
        'title' => 'Open-air Courtyard Evening Lights',
        'category' => 'ambience',
        'image' => '../shared/assets/images/restaurant-garden.webp',
        'sticker' => 'NIGHT VIBE'
    ],
    [
        'title' => 'Burrata & Peach Bruschetta Platter',
        'category' => 'food',
        'image' => '../shared/assets/images/burrata-bruschetta.webp',
        'sticker' => 'FRESH'
    ]
];
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 50px 0 40px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ INSTA FEED</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">THE PHOTO DROP FEED</h1>
        <p style="font-size: 16px; font-weight: 600; color: var(--gen-ink); max-width: 600px; margin: 10px auto 0;">
            Food porn, diner aesthetics, and late night energy. Click any card to expand.
        </p>
    </div>
</div>

<!-- Gallery Grid -->
<section style="padding: 60px 0 90px;">
    <div class="gen-container">
        <!-- Filter Tabs -->
        <div class="gen-filter-bar">
            <button type="button" class="gen-filter-btn active" data-filter="all">⚡ ALL PICS (<?php echo count($gallery_items); ?>)</button>
            <button type="button" class="gen-filter-btn" data-filter="food">🍕 FOOD DROPS</button>
            <button type="button" class="gen-filter-btn" data-filter="desserts">🍰 SWEET DROPS</button>
            <button type="button" class="gen-filter-btn" data-filter="ambience">🛹 DINER VIBE</button>
            <button type="button" class="gen-filter-btn" data-filter="moments">🔥 SQUAD</button>
        </div>

        <div class="gen-cards-grid">
            <?php foreach ($gallery_items as $item): ?>
                <a href="#" class="gen-dish-card gen-menu-item gen-gallery-trigger"
                   data-category="<?php echo htmlspecialchars($item['category']); ?>"
                   data-img="<?php echo htmlspecialchars($item['image']); ?>"
                   data-caption="<?php echo htmlspecialchars($item['title']); ?>">
                    <div class="gen-dish-thumb-wrap" style="height: 280px;">
                        <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="<?php echo htmlspecialchars($item['title']); ?>" class="gen-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <span class="gen-sticker sticker-yellow" style="position: absolute; top: 10px; left: 10px; font-size: 10px;">
                            <?php echo htmlspecialchars($item['sticker']); ?>
                        </span>
                    </div>
                    <div style="padding: 4px;">
                        <h4 class="gen-dish-name" style="font-size: 17px;"><?php echo htmlspecialchars($item['title']); ?></h4>
                        <span style="font-size: 12px; font-weight: 800; color: var(--gen-red);">CLICK TO ZOOM ⚡</span>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
