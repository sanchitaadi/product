<?php
$page_title = 'Carte du Jour — Seasonal Culinary Menu & Ordering';
require_once __DIR__ . '/includes/header.php';

$all_dishes = getMenuItems();
$selected_category = $_GET['cat'] ?? 'all';

// Customization map
$db = getDbConnection();
$itemsWithCustoms = $db->query("
    SELECT DISTINCT item_id FROM customization_groups WHERE item_id IS NOT NULL
    UNION
    SELECT m.id FROM menu_items m JOIN customization_groups g ON g.category = m.category WHERE g.item_id IS NULL
")->fetchAll(PDO::FETCH_COLUMN);
$customSet = array_flip($itemsWithCustoms);
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Carte du Jour &bull; Atelier Cuisine</span>
        <h1 class="lux-section-title">The Culinary <em>Collection &amp; Order</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            A curated portfolio of artisan Italian preparations, delicate continental specialties, and bespoke confections. Available for private delivery or maison pickup.
        </p>
    </div>
</div>

<!-- Menu Section -->
<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <!-- Search, Diet & Sort Controls Bar -->
        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 18px 24px; margin-bottom: 36px; box-shadow: var(--lux-shadow);">
            <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
                
                <!-- Search Box -->
                <div style="position: relative; flex: 1; min-width: 260px;">
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--lux-muted); font-size: 14px;"></i>
                    <input type="text" id="luxMenuSearch" placeholder="Search creations (e.g., Truffle, Burrata, Tiramisu)..." 
                           style="width: 100%; padding: 11px 18px 11px 42px; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-full); font-family: inherit; font-size: 13px; outline: none; background: #FAF8F5;">
                </div>

                <!-- Diet Filter -->
                <div style="display: flex; gap: 6px; align-items: center;">
                    <button type="button" class="lux-diet-btn active" data-diet="all" style="background: var(--lux-espresso); color: #ffffff; border: 1px solid var(--lux-espresso); padding: 7px 16px; border-radius: var(--lux-radius-full); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer;">
                        All
                    </button>
                    <button type="button" class="lux-diet-btn" data-diet="veg" style="background: transparent; color: var(--lux-espresso); border: 1px solid var(--lux-border); padding: 7px 16px; border-radius: var(--lux-radius-full); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer;">
                        Vegetarian
                    </button>
                    <button type="button" class="lux-diet-btn" data-diet="nonveg" style="background: transparent; color: var(--lux-espresso); border: 1px solid var(--lux-border); padding: 7px 16px; border-radius: var(--lux-radius-full); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer;">
                        Meat &amp; Seafood
                    </button>
                </div>

                <!-- Sort Dropdown -->
                <div style="display: flex; align-items: center; gap: 8px;">
                    <label for="luxSortSelect" style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted);">Sort:</label>
                    <select id="luxSortSelect" style="padding: 9px 16px; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-full); font-family: inherit; font-size: 12.5px; background: #ffffff; color: var(--lux-espresso); cursor: pointer; outline: none;">
                        <option value="featured">✦ Maison Signatures First</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="alpha">Alphabetical (A &ndash; Z)</option>
                    </select>
                </div>

            </div>
        </div>

        <!-- Filter Tabs -->
        <div class="lux-filter-bar">
            <button type="button" class="lux-filter-btn <?php echo ($selected_category === 'all' || !$selected_category) ? 'active' : ''; ?>" data-filter="all">Complete Menu (<?php echo count($all_dishes); ?>)</button>
            <button type="button" class="lux-filter-btn <?php echo ($selected_category === 'Starters') ? 'active' : ''; ?>" data-filter="Starters">Starters &amp; Antipasti</button>
            <button type="button" class="lux-filter-btn <?php echo ($selected_category === 'Pizza and Pasta') ? 'active' : ''; ?>" data-filter="Pizza and Pasta">Pizza &amp; Bronze Pasta</button>
            <button type="button" class="lux-filter-btn <?php echo ($selected_category === 'Main Course') ? 'active' : ''; ?>" data-filter="Main Course">Plats Principaux</button>
            <button type="button" class="lux-filter-btn <?php echo ($selected_category === 'Desserts') ? 'active' : ''; ?>" data-filter="Desserts">Patisserie &amp; Desserts</button>
            <button type="button" class="lux-filter-btn <?php echo ($selected_category === 'Beverages') ? 'active' : ''; ?>" data-filter="Beverages">Cold Infusions &amp; Shakes</button>
        </div>

        <!-- Dishes Grid -->
        <div class="lux-dishes-grid" id="luxMenuContainer">
            <?php foreach ($all_dishes as $dish): 
                $hasCustom = isset($customSet[$dish['id']]);
                $isFav = isItemInWishlist($dish['id']);
            ?>
                <div class="lux-dish-card lux-menu-item" 
                     data-id="<?php echo (int)$dish['id']; ?>"
                     data-category="<?php echo htmlspecialchars($dish['category']); ?>"
                     data-diet="<?php echo $dish['is_veg'] ? 'veg' : 'nonveg'; ?>"
                     data-price="<?php echo (float)$dish['price']; ?>"
                     data-bestseller="<?php echo (int)$dish['is_bestseller']; ?>"
                     data-name="<?php echo htmlspecialchars(strtolower($dish['name'])); ?>"
                     data-desc="<?php echo htmlspecialchars(strtolower($dish['description'])); ?>">
                    
                    <div class="lux-dish-thumb-wrap">
                        <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="lux-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        
                        <?php if ($dish['is_bestseller']): ?>
                            <span class="lux-dish-badge-top">Signature</span>
                        <?php endif; ?>

                        <!-- Wishlist Button -->
                        <button type="button" class="lux-dish-fav-btn" onclick="toggleWishlist(<?php echo (int)$dish['id']; ?>, this)" title="Save to collection">
                            <i class="<?php echo $isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'; ?>" style="<?php echo $isFav ? 'color:#e11d48;' : ''; ?>"></i>
                        </button>

                        <div class="lux-dietary-dot">
                            <span class="<?php echo $dish['is_veg'] ? 'dot-veg' : 'dot-nonveg'; ?>" style="width: 10px; height: 10px; border-radius: 50%; display: inline-block;"></span>
                        </div>
                    </div>

                    <div class="lux-dish-body">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <span class="lux-dish-cat"><?php echo htmlspecialchars($dish['category']); ?></span>
                            <?php if ($hasCustom): ?>
                                <span style="font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-gold); font-weight: 600;">
                                    ✦ Tailored Options
                                </span>
                            <?php endif; ?>
                        </div>

                        <h3 class="lux-dish-title"><?php echo htmlspecialchars($dish['name']); ?></h3>
                        <p class="lux-dish-desc"><?php echo htmlspecialchars($dish['description']); ?></p>
                        
                        <?php if (!empty($dish['calories'])): ?>
                            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--lux-muted); margin-bottom: 12px;">
                                <?php echo (int)$dish['calories']; ?> kcal &bull; Scratch Prepared
                            </div>
                        <?php endif; ?>

                        <div class="lux-dish-footer">
                            <span class="lux-dish-price"><?php echo formatPrice($dish['price']); ?></span>
                            
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <?php if ($hasCustom): ?>
                                    <button type="button" class="lux-btn-custom" onclick="openCustomizationModal(<?php echo (int)$dish['id']; ?>)">
                                        Tailor ✦
                                    </button>
                                <?php endif; ?>

                                <button type="button" class="lux-dish-action" onclick="quickAddToCart(<?php echo (int)$dish['id']; ?>, this)">
                                    Order +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Empty Filter State -->
        <div id="luxEmptyState" style="display: none; background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 60px 24px; text-align: center; margin-top: 30px;">
            <span style="font-size: 32px;">🍸</span>
            <h3 style="font-family: var(--lux-font-serif); font-size: 22px; margin: 12px 0 6px;">No Creations Found</h3>
            <p style="color: var(--lux-muted); font-size: 13.5px; max-width: 400px; margin: 0 auto 20px;">
                No dishes match your specified criteria. Please adjust your search query or dietary filters.
            </p>
            <button type="button" class="lux-btn-secondary" onclick="resetLuxFilters()">Reset All Filters</button>
        </div>

        <!-- Dietary Consultation Notice -->
        <div style="margin-top: 80px; border: 1px solid var(--lux-border); background: #ffffff; border-radius: var(--lux-radius-md); padding: 40px; text-align: center; box-shadow: var(--lux-shadow);">
            <span class="lux-tag">Bespoke Dining</span>
            <h3 style="font-family: var(--lux-font-serif); font-size: 24px; font-weight: 500; margin: 10px 0;">Private Tasting Menus &amp; Dietary Tailoring</h3>
            <p style="max-width: 620px; margin: 0 auto 24px; font-size: 14px; color: var(--lux-muted); line-height: 1.8;">
                Our culinary team will be pleased to tailor our preparations to suit vegan, lactose-free, or gluten-sensitive dining. Please share your preferences when securing your reservation or order note.
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="reservation.php" class="lux-btn-primary">Reserve a Bespoke Table Experience</a>
                <button type="button" class="lux-btn-secondary" onclick="openCartDrawer()">View Hamper (<span class="peachy-cart-count"><?php echo $cart_details['item_count']; ?></span>)</button>
            </div>
        </div>

    </div>
</section>

<!-- Script -->
<script>
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('luxMenuSearch');
    const sortSelect = document.getElementById('luxSortSelect');
    const dietButtons = document.querySelectorAll('.lux-diet-btn');
    const catButtons = document.querySelectorAll('.lux-filter-btn');
    const container = document.getElementById('luxMenuContainer');
    const cards = Array.from(document.querySelectorAll('.lux-menu-item'));
    const emptyState = document.getElementById('luxEmptyState');

    let currentCat = '<?php echo $selected_category; ?>' || 'all';
    let currentDiet = 'all';
    let query = '';
    let currentSort = 'featured';

    function filterDishes() {
        let count = 0;
        cards.forEach(card => {
            const cat = card.getAttribute('data-category');
            const diet = card.getAttribute('data-diet');
            const name = card.getAttribute('data-name') || '';
            const desc = card.getAttribute('data-desc') || '';

            const mCat = (currentCat === 'all' || cat === currentCat);
            const mDiet = (currentDiet === 'all' || diet === currentDiet);
            const mSearch = (query === '' || name.includes(query) || desc.includes(query));

            if (mCat && mDiet && mSearch) {
                card.style.display = 'flex';
                count++;
            } else {
                card.style.display = 'none';
            }
        });

        emptyState.style.display = count === 0 ? 'block' : 'none';

        const sorted = cards.slice().sort((a, b) => {
            if (currentSort === 'price_low') {
                return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
            } else if (currentSort === 'price_high') {
                return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
            } else if (currentSort === 'alpha') {
                return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            } else {
                const aBest = parseInt(a.getAttribute('data-bestseller') || 0);
                const bBest = parseInt(b.getAttribute('data-bestseller') || 0);
                if (bBest !== aBest) return bBest - aBest;
                return parseInt(a.getAttribute('data-id')) - parseInt(b.getAttribute('data-id'));
            }
        });
        sorted.forEach(c => container.appendChild(c));
    }

    if (searchInput) {
        searchInput.addEventListener('input', e => {
            query = e.target.value.trim().toLowerCase();
            filterDishes();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', e => {
            currentSort = e.target.value;
            filterDishes();
        });
    }

    catButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            catButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCat = this.getAttribute('data-filter');
            filterDishes();
        });
    });

    dietButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            dietButtons.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
                b.style.color = 'var(--lux-espresso)';
            });
            this.classList.add('active');
            this.style.background = 'var(--lux-espresso)';
            this.style.color = '#ffffff';
            currentDiet = this.getAttribute('data-diet');
            filterDishes();
        });
    });

    window.resetLuxFilters = function() {
        if (searchInput) searchInput.value = '';
        query = '';
        currentCat = 'all';
        currentDiet = 'all';
        currentSort = 'featured';

        catButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
        dietButtons.forEach(b => {
            const isAll = b.getAttribute('data-diet') === 'all';
            b.classList.toggle('active', isAll);
            b.style.background = isAll ? 'var(--lux-espresso)' : 'transparent';
            b.style.color = isAll ? '#ffffff' : 'var(--lux-espresso)';
        });
        if (sortSelect) sortSelect.value = 'featured';
        filterDishes();
    };

    filterDishes();
});
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
