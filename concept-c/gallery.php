<?php
$page_title = 'The Photographic Collection';
require_once __DIR__ . '/includes/header.php';

$gallery_items = [
    [
        'title' => 'Pink Sauce Penne Rigate with Basil Mascarpone',
        'category' => 'food',
        'image' => '../shared/assets/images/pink-sauce-pasta.webp',
        'tag' => 'Signature Plat'
    ],
    [
        'title' => 'Sun-dappled Velvet Salon Seating',
        'category' => 'ambience',
        'image' => '../shared/assets/images/restaurant-interior.webp',
        'tag' => 'Maison Interior'
    ],
    [
        'title' => 'Strawberry Chantilly Gateau with Bourbon Vanilla',
        'category' => 'desserts',
        'image' => '../shared/assets/images/strawberry-cheesecake.webp',
        'tag' => 'Patisserie'
    ],
    [
        'title' => 'Private Dining Salon Table Setting',
        'category' => 'moments',
        'image' => '../shared/assets/images/restaurant-dining.webp',
        'tag' => 'Art de la Table'
    ],
    [
        'title' => 'Woodfired Neapolitan Pizza with Fior di Latte',
        'category' => 'food',
        'image' => '../shared/assets/images/margherita-pizza.webp',
        'tag' => 'Woodfire'
    ],
    [
        'title' => 'Damask Rose & Iranian Pistachio Macarons',
        'category' => 'desserts',
        'image' => '../shared/assets/images/parisian-macarons.webp',
        'tag' => 'Patisserie'
    ],
    [
        'title' => 'Black Truffle Russet Pommes Frites',
        'category' => 'food',
        'image' => '../shared/assets/images/truffle-fries.webp',
        'tag' => 'Antipasto'
    ],
    [
        'title' => 'Lotus Biscoff Cream Shake with Caramel Dust',
        'category' => 'food',
        'image' => '../shared/assets/images/lotus-biscoff-shake.webp',
        'tag' => 'Infusion'
    ],
    [
        'title' => 'Espresso Tiramisu Paradiso with Valrhona Dust',
        'category' => 'desserts',
        'image' => '../shared/assets/images/espresso-tiramisu.webp',
        'tag' => 'Dolci'
    ],
    [
        'title' => 'Botanical Courtyard Evening Lighting',
        'category' => 'ambience',
        'image' => '../shared/assets/images/restaurant-garden.webp',
        'tag' => 'Courtyard'
    ],
    [
        'title' => 'Charred Peach & Burrata Bruschetta Composition',
        'category' => 'food',
        'image' => '../shared/assets/images/burrata-bruschetta.webp',
        'tag' => 'Antipasto'
    ],
    [
        'title' => 'Bespoke Celebration Evening at the Salon',
        'category' => 'moments',
        'image' => '../shared/assets/images/restaurant-dining.webp',
        'tag' => 'Moments'
    ]
];
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Curated Imagery</span>
        <h1 class="lux-section-title">The Visual <em>Portfolio</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            A refined lens on gastronomy, architectural light, and the gentle rhythm of dining at Peachy Plate.
        </p>
    </div>
</div>

<!-- Gallery Section -->
<section style="padding: 70px 0 100px;">
    <div class="lux-container">
        <!-- Filter Tabs -->
        <div class="lux-filter-bar">
            <button type="button" class="lux-filter-btn active" data-filter="all">The Whole Collection (<?php echo count($gallery_items); ?>)</button>
            <button type="button" class="lux-filter-btn" data-filter="food">Plates &amp; Cuisine</button>
            <button type="button" class="lux-filter-btn" data-filter="desserts">Patisserie &amp; Sweets</button>
            <button type="button" class="lux-filter-btn" data-filter="ambience">Architectural Interior</button>
            <button type="button" class="lux-filter-btn" data-filter="moments">Private Dining</button>
        </div>

        <!-- Grid -->
        <div class="lux-dishes-grid">
            <?php foreach ($gallery_items as $item): ?>
                <a href="#" class="lux-dish-card lux-menu-item lux-gallery-trigger"
                   data-category="<?php echo htmlspecialchars($item['category']); ?>"
                   data-img="<?php echo htmlspecialchars($item['image']); ?>"
                   data-caption="<?php echo htmlspecialchars($item['title']); ?>">
                    <div class="lux-dish-thumb-wrap" style="height: 290px;">
                        <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="<?php echo htmlspecialchars($item['title']); ?>" class="lux-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        <span class="lux-dish-badge-top"><?php echo htmlspecialchars($item['tag']); ?></span>
                    </div>
                    <div style="padding: 4px 0;">
                        <h4 class="lux-dish-title" style="font-size: 19px;"><?php echo htmlspecialchars($item['title']); ?></h4>
                        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-peach-dark); font-weight: 600;">Enlarge Plate &rarr;</span>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
