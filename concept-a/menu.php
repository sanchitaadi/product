<?php
$page_title = 'Artisan Menu & Cute Confections';
require_once __DIR__ . '/includes/header.php';

// Fetch all menu items from database
$all_dishes = getMenuItems();
$selected_category = $_GET['cat'] ?? 'all';

// Find which items have customizations for smart button rendering
$db = getDbConnection();
$itemsWithCustoms = $db->query("
    SELECT DISTINCT item_id FROM customization_groups WHERE item_id IS NOT NULL
    UNION
    SELECT m.id FROM menu_items m JOIN customization_groups g ON g.category = m.category WHERE g.item_id IS NULL
")->fetchAll(PDO::FETCH_COLUMN);
$customSet = array_flip($itemsWithCustoms);
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">🎀 Handcrafted with Love &bull; Made Fresh Daily</span>
        <h1 class="coq-section-title">The Peachy <em>Menu &amp; Feast</em></h1>
        <p class="coq-section-subtitle">
            Italian comfort classics, artisanal continental fare, and Parisian-inspired patisserie. Order directly for swift home delivery or table collection.
        </p>
    </div>
</div>

<!-- Menu & Ordering Section -->
<section style="padding-bottom: 90px;">
    <div class="coq-container">
        
        <!-- Live Search, Diet Switch, and Sort Bar -->
        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 20px 24px; box-shadow: var(--coq-shadow); margin-bottom: 30px;">
            <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
                
                <!-- Search Input -->
                <div style="position: relative; flex: 1; min-width: 260px;">
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--coq-rose);"></i>
                    <input type="text" id="menuSearchInput" placeholder="Search dishes (e.g., Pink Truffle, Burrata, Tiramisu)..." 
                           style="width: 100%; padding: 12px 18px 12px 42px; border-radius: var(--coq-radius-full); border: 1px solid var(--coq-border); font-family: inherit; font-size: 13.5px; outline: none; transition: var(--transition);">
                </div>

                <!-- Diet Filter (All, Veg, Non-Veg) -->
                <div style="display: flex; align-items: center; gap: 8px; background: var(--coq-bg-soft); padding: 5px; border-radius: var(--coq-radius-full);">
                    <button type="button" class="diet-filter-btn active" data-diet="all" style="border: none; background: transparent; padding: 7px 16px; border-radius: var(--coq-radius-full); font-size: 12.5px; font-weight: 600; cursor: pointer; color: var(--coq-text); transition: var(--transition);">
                        ✦ All
                    </button>
                    <button type="button" class="diet-filter-btn" data-diet="veg" style="border: none; background: transparent; padding: 7px 16px; border-radius: var(--coq-radius-full); font-size: 12.5px; font-weight: 600; cursor: pointer; color: var(--coq-text); transition: var(--transition);">
                        <span class="dot-veg" style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;"></span> Veg Only
                    </button>
                    <button type="button" class="diet-filter-btn" data-diet="nonveg" style="border: none; background: transparent; padding: 7px 16px; border-radius: var(--coq-radius-full); font-size: 12.5px; font-weight: 600; cursor: pointer; color: var(--coq-text); transition: var(--transition);">
                        <span class="dot-nonveg" style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;"></span> Non-Veg
                    </button>
                </div>

                <!-- Sort Dropdown -->
                <div style="display: flex; align-items: center; gap: 8px;">
                    <label for="menuSortSelect" style="font-size: 12.5px; color: var(--coq-text-muted); font-weight: 600;">Sort By:</label>
                    <select id="menuSortSelect" style="padding: 10px 16px; border-radius: var(--coq-radius-full); border: 1px solid var(--coq-border); font-family: inherit; font-size: 13px; outline: none; background: #ffffff; color: var(--coq-text); cursor: pointer;">
                        <option value="featured">🎀 Chef's Bestsellers First</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="alpha">Alphabetical (A &ndash; Z)</option>
                    </select>
                </div>

            </div>
        </div>

        <!-- Interactive Category Filter Bar -->
        <div class="coq-filter-bar">
            <button type="button" class="coq-filter-btn <?php echo ($selected_category === 'all' || !$selected_category) ? 'active' : ''; ?>" data-filter="all">
                ✦ All Creations (<?php echo count($all_dishes); ?>)
            </button>
            <button type="button" class="coq-filter-btn <?php echo ($selected_category === 'Starters') ? 'active' : ''; ?>" data-filter="Starters">
                🥗 Starters &amp; Small Plates
            </button>
            <button type="button" class="coq-filter-btn <?php echo ($selected_category === 'Pizza and Pasta') ? 'active' : ''; ?>" data-filter="Pizza and Pasta">
                🍝 Pizza &amp; Pasta
            </button>
            <button type="button" class="coq-filter-btn <?php echo ($selected_category === 'Main Course') ? 'active' : ''; ?>" data-filter="Main Course">
                🍽️ Main Course
            </button>
            <button type="button" class="coq-filter-btn <?php echo ($selected_category === 'Desserts') ? 'active' : ''; ?>" data-filter="Desserts">
                🍰 Desserts &amp; Bakery
            </button>
            <button type="button" class="coq-filter-btn <?php echo ($selected_category === 'Beverages') ? 'active' : ''; ?>" data-filter="Beverages">
                ☕ Shakes &amp; Beverages
            </button>
        </div>

        <!-- Dietary Indicator Legend -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 34px; font-size: 13px; color: var(--coq-text-muted); flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
                <span class="dot-veg" style="display: inline-block;"></span>
                <span>Vegetarian Friendly</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span class="dot-nonveg" style="display: inline-block;"></span>
                <span>Contains Meat / Poultry / Seafood</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span>🎀</span>
                <span>Guest Favorite / Chef's Bestseller</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--coq-rose);"></i>
                <span>Customizable add-ons &amp; sizes available</span>
            </div>
        </div>

        <!-- Dishes Grid -->
        <div class="coq-dishes-grid" id="coqMenuContainer">
            <?php foreach ($all_dishes as $dish): 
                $hasCustom = isset($customSet[$dish['id']]);
                $isFav = isItemInWishlist($dish['id']);
            ?>
                <div class="coq-dish-card menu-item-filterable" 
                     data-id="<?php echo (int)$dish['id']; ?>"
                     data-category="<?php echo htmlspecialchars($dish['category']); ?>"
                     data-diet="<?php echo $dish['is_veg'] ? 'veg' : 'nonveg'; ?>"
                     data-price="<?php echo (float)$dish['price']; ?>"
                     data-bestseller="<?php echo (int)$dish['is_bestseller']; ?>"
                     data-name="<?php echo htmlspecialchars(strtolower($dish['name'])); ?>"
                     data-desc="<?php echo htmlspecialchars(strtolower($dish['description'])); ?>">
                     
                    <div class="coq-dish-thumb-wrap">
                        <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="coq-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        
                        <?php if ($dish['is_bestseller']): ?>
                            <span class="coq-bestseller-badge"><span>🎀</span> Bestseller</span>
                        <?php endif; ?>

                        <!-- Wishlist Toggle Button -->
                        <button type="button" class="coq-dish-fav-btn" onclick="toggleWishlist(<?php echo (int)$dish['id']; ?>, this)" title="Add to favorites">
                            <i class="<?php echo $isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'; ?>" style="<?php echo $isFav ? 'color:#e11d48;' : ''; ?>"></i>
                        </button>

                        <div class="coq-veg-badge">
                            <span class="<?php echo $dish['is_veg'] ? 'dot-veg' : 'dot-nonveg'; ?>" title="<?php echo $dish['is_veg'] ? 'Vegetarian' : 'Non-Vegetarian'; ?>"></span>
                        </div>
                    </div>

                    <div class="coq-dish-body">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span class="coq-dish-cat"><?php echo htmlspecialchars($dish['category']); ?></span>
                            <?php if ($hasCustom): ?>
                                <span style="font-size: 10px; font-weight: 700; color: var(--coq-rose-dark); background: var(--coq-bg-soft); padding: 2px 8px; border-radius: var(--coq-radius-full); border: 1px dashed var(--coq-rose);">
                                    ✦ Customizable
                                </span>
                            <?php endif; ?>
                        </div>

                        <h3 class="coq-dish-title"><?php echo htmlspecialchars($dish['name']); ?></h3>
                        <p class="coq-dish-desc"><?php echo htmlspecialchars($dish['description']); ?></p>
                        
                        <?php if (!empty($dish['calories'])): ?>
                            <div style="font-size: 11px; color: var(--coq-text-muted); margin-bottom: 10px;">
                                <i class="fa-solid fa-fire-flame-curved" style="color: var(--coq-rose);"></i> approx. <?php echo (int)$dish['calories']; ?> kcal
                            </div>
                        <?php endif; ?>

                        <div class="coq-dish-footer">
                            <span class="coq-dish-price"><?php echo formatPrice($dish['price']); ?></span>
                            
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <?php if ($hasCustom): ?>
                                    <button type="button" class="coq-btn-custom" onclick="openCustomizationModal(<?php echo (int)$dish['id']; ?>)" title="Select toppings, sizes &amp; sauce">
                                        Customize ✦
                                    </button>
                                <?php endif; ?>

                                <button type="button" class="coq-dish-action" onclick="quickAddToCart(<?php echo (int)$dish['id']; ?>, this)" title="Add to feast cart">
                                    <span>Add +</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- No Dishes Found State (hidden by default) -->
        <div id="noDishesFound" style="display: none; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: var(--coq-radius-lg); border: 1px dashed var(--coq-border); margin-top: 20px;">
            <span style="font-size: 40px;">🧁</span>
            <h3 style="font-family: var(--coq-font-serif); font-size: 22px; color: var(--coq-text); margin: 12px 0 6px;">No Sweet Creations Found</h3>
            <p style="color: var(--coq-text-muted); font-size: 14px; max-width: 400px; margin: 0 auto 18px;">
                We couldn't find any dish matching your filter. Try adjusting your search query or dietary filter!
            </p>
            <button type="button" class="coq-btn-secondary" onclick="resetMenuFilters()">Reset All Filters</button>
        </div>

        <!-- Chef's Note Box -->
        <div style="margin-top: 60px; background: #FFF5F7; border: 2px dashed var(--coq-rose); border-radius: var(--coq-radius-lg); padding: 36px; text-align: center;">
            <span style="font-size: 32px;">🎀</span>
            <h3 style="font-family: var(--coq-font-serif); font-size: 22px; color: var(--coq-text); margin: 8px 0;">Special Dietary or Celebratory Requests?</h3>
            <p style="max-width: 620px; margin: 0 auto 20px; font-size: 14px; color: var(--coq-text-muted); line-height: 1.7;">
                Our culinary team happily accommodates gluten-sensitive, dairy-free, and vegan preferences upon request. Let us know in your order notes or reserve a private celebration table!
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="reservation.php" class="coq-btn-primary">Reserve a Custom Table Experience</a>
                <button type="button" class="coq-btn-secondary" onclick="openCartDrawer()">View Cart Feast (<span class="peachy-cart-count"><?php echo $cart_details['item_count']; ?></span>)</button>
            </div>
        </div>

    </div>
</section>

<!-- Menu Interactive Filtering Script -->
<script>
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('menuSearchInput');
    const sortSelect = document.getElementById('menuSortSelect');
    const dietButtons = document.querySelectorAll('.diet-filter-btn');
    const catButtons = document.querySelectorAll('.coq-filter-btn');
    const container = document.getElementById('coqMenuContainer');
    const cards = Array.from(document.querySelectorAll('.menu-item-filterable'));
    const emptyState = document.getElementById('noDishesFound');

    let currentCategory = '<?php echo $selected_category; ?>' || 'all';
    let currentDiet = 'all';
    let searchQuery = '';
    let currentSort = 'featured';

    function filterAndSortDishes() {
        let visibleCount = 0;

        cards.forEach(card => {
            const cat = card.getAttribute('data-category');
            const diet = card.getAttribute('data-diet');
            const name = card.getAttribute('data-name') || '';
            const desc = card.getAttribute('data-desc') || '';

            const matchesCategory = (currentCategory === 'all' || cat === currentCategory);
            const matchesDiet = (currentDiet === 'all' || diet === currentDiet);
            const matchesSearch = (searchQuery === '' || name.includes(searchQuery) || desc.includes(searchQuery));

            if (matchesCategory && matchesDiet && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }

        // Sorting visible cards
        const sorted = cards.slice().sort((a, b) => {
            if (currentSort === 'price_low') {
                return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
            } else if (currentSort === 'price_high') {
                return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
            } else if (currentSort === 'alpha') {
                return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            } else { // featured / bestseller
                const aBest = parseInt(a.getAttribute('data-bestseller') || 0);
                const bBest = parseInt(b.getAttribute('data-bestseller') || 0);
                if (bBest !== aBest) return bBest - aBest;
                return parseInt(a.getAttribute('data-id')) - parseInt(b.getAttribute('data-id'));
            }
        });

        sorted.forEach(card => container.appendChild(card));
    }

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            searchQuery = e.target.value.trim().toLowerCase();
            filterAndSortDishes();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function (e) {
            currentSort = e.target.value;
            filterAndSortDishes();
        });
    }

    catButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            catButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-filter');
            filterAndSortDishes();
        });
    });

    dietButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            dietButtons.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
                b.style.color = 'var(--coq-text)';
            });
            this.classList.add('active');
            this.style.background = '#ffffff';
            this.style.color = 'var(--coq-rose-dark)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            currentDiet = this.getAttribute('data-diet');
            filterAndSortDishes();
        });
    });

    window.resetMenuFilters = function() {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        currentCategory = 'all';
        currentDiet = 'all';
        currentSort = 'featured';

        catButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
        dietButtons.forEach(b => {
            const isAll = b.getAttribute('data-diet') === 'all';
            b.classList.toggle('active', isAll);
            b.style.background = isAll ? '#ffffff' : 'transparent';
            b.style.color = isAll ? 'var(--coq-rose-dark)' : 'var(--coq-text)';
        });
        if (sortSelect) sortSelect.value = 'featured';

        filterAndSortDishes();
    };

    filterAndSortDishes();
});
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
