<?php
$page_title = 'The Official Menu Drops & Online Ordering ⚡';
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
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 50px 0 40px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">⚡ 100% FLAVOR HEAVY &bull; SERVED FRESH DAILY</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">THE OFFICIAL MENU DROPS</h1>
        <p style="font-size: 16px; font-weight: 600; color: var(--gen-ink); max-width: 600px; margin: 10px auto 0;">
            Woodfired sourdough pizza, pink vodka rigatoni, loaded fries, and confections that hit different. Order straight for rapid delivery or pickup!
        </p>
    </div>
</div>

<!-- Menu Section -->
<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <!-- Search, Diet & Sort Controls Bar -->
        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 5px 5px 0px var(--gen-ink); border-radius: 16px; padding: 20px 24px; margin-bottom: 36px;">
            <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
                
                <!-- Search Box -->
                <div style="position: relative; flex: 1; min-width: 260px;">
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--gen-red); font-size: 16px;"></i>
                    <input type="text" id="genMenuSearch" placeholder="SEARCH DISH DROPS (e.g., Pink Truffle, Burger, Tiramisu)..." 
                           style="width: 100%; padding: 12px 18px 12px 44px; border: 2px solid var(--gen-ink); border-radius: 10px; font-family: inherit; font-size: 13.5px; font-weight: 700; outline: none; background: #FAF8F2;">
                </div>

                <!-- Diet Switcher -->
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button type="button" class="gen-diet-btn active" data-diet="all" style="background: var(--gen-yellow); border: 2px solid var(--gen-ink); box-shadow: 2px 2px 0px var(--gen-ink); padding: 8px 14px; border-radius: 8px; font-weight: 800; font-size: 12px; cursor: pointer;">
                        ⚡ ALL
                    </button>
                    <button type="button" class="gen-diet-btn" data-diet="veg" style="background: #ffffff; border: 2px solid var(--gen-ink); box-shadow: 2px 2px 0px var(--gen-ink); padding: 8px 14px; border-radius: 8px; font-weight: 800; font-size: 12px; cursor: pointer;">
                        🟢 VEG ONLY
                    </button>
                    <button type="button" class="gen-diet-btn" data-diet="nonveg" style="background: #ffffff; border: 2px solid var(--gen-ink); box-shadow: 2px 2px 0px var(--gen-ink); padding: 8px 14px; border-radius: 8px; font-weight: 800; font-size: 12px; cursor: pointer;">
                        🔴 NON-VEG
                    </button>
                </div>

                <!-- Sort Dropdown -->
                <div style="display: flex; align-items: center; gap: 8px;">
                    <label for="genSortSelect" style="font-family: var(--gen-font-display); font-size: 12px; font-weight: 800; text-transform: uppercase;">SORT:</label>
                    <select id="genSortSelect" style="padding: 10px 14px; border: 2px solid var(--gen-ink); border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: 700; background: #ffffff; cursor: pointer; outline: none;">
                        <option value="featured">🔥 BESTSELLERS FIRST</option>
                        <option value="price_low">PRICE: LOW TO HIGH</option>
                        <option value="price_high">PRICE: HIGH TO LOW</option>
                        <option value="alpha">A TO Z</option>
                    </select>
                </div>

            </div>
        </div>

        <!-- Retro Filter Bar -->
        <div class="gen-filter-bar">
            <button type="button" class="gen-filter-btn <?php echo ($selected_category === 'all' || !$selected_category) ? 'active' : ''; ?>" data-filter="all">⚡ ALL DROPS (<?php echo count($all_dishes); ?>)</button>
            <button type="button" class="gen-filter-btn <?php echo ($selected_category === 'Starters') ? 'active' : ''; ?>" data-filter="Starters">🍟 STARTERS &amp; SIDES</button>
            <button type="button" class="gen-filter-btn <?php echo ($selected_category === 'Pizza and Pasta') ? 'active' : ''; ?>" data-filter="Pizza and Pasta">🍕 PIZZA &amp; PASTA</button>
            <button type="button" class="gen-filter-btn <?php echo ($selected_category === 'Main Course') ? 'active' : ''; ?>" data-filter="Main Course">🥩 MAIN COURSE</button>
            <button type="button" class="gen-filter-btn <?php echo ($selected_category === 'Desserts') ? 'active' : ''; ?>" data-filter="Desserts">🍰 DESSERTS</button>
            <button type="button" class="gen-filter-btn <?php echo ($selected_category === 'Beverages') ? 'active' : ''; ?>" data-filter="Beverages">🥤 SHAKES &amp; COFFEE</button>
        </div>

        <!-- Menu Grid -->
        <div class="gen-cards-grid" id="genMenuContainer">
            <?php foreach ($all_dishes as $dish): 
                $hasCustom = isset($customSet[$dish['id']]);
                $isFav = isItemInWishlist($dish['id']);
            ?>
                <div class="gen-dish-card gen-menu-item" 
                     data-id="<?php echo (int)$dish['id']; ?>"
                     data-category="<?php echo htmlspecialchars($dish['category']); ?>"
                     data-diet="<?php echo $dish['is_veg'] ? 'veg' : 'nonveg'; ?>"
                     data-price="<?php echo (float)$dish['price']; ?>"
                     data-bestseller="<?php echo (int)$dish['is_bestseller']; ?>"
                     data-name="<?php echo htmlspecialchars(strtolower($dish['name'])); ?>"
                     data-desc="<?php echo htmlspecialchars(strtolower($dish['description'])); ?>">
                    
                    <div class="gen-dish-thumb-wrap">
                        <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="gen-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        
                        <!-- Wishlist Toggle -->
                        <button type="button" class="gen-dish-fav-btn" onclick="toggleWishlist(<?php echo (int)$dish['id']; ?>, this)" title="Save drop">
                            <i class="<?php echo $isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'; ?>" style="<?php echo $isFav ? 'color:#e11d48;' : ''; ?>"></i>
                        </button>

                        <div class="gen-dish-veg">
                            <span class="<?php echo $dish['is_veg'] ? 'dot-veg' : 'dot-nonveg'; ?>" style="width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
                        </div>

                        <?php if ($dish['is_bestseller']): ?>
                            <span class="gen-sticker sticker-red" style="position: absolute; bottom: 8px; left: 8px; font-size: 10px; padding: 3px 8px;">★ BESTSELLER</span>
                        <?php endif; ?>
                    </div>

                    <div class="gen-dish-body">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--gen-red);"><?php echo htmlspecialchars($dish['category']); ?></span>
                            <?php if ($hasCustom): ?>
                                <span class="gen-sticker sticker-yellow" style="font-size: 9px; padding: 2px 6px;">CUSTOMIZE</span>
                            <?php endif; ?>
                        </div>

                        <h3 class="gen-dish-name"><?php echo htmlspecialchars($dish['name']); ?></h3>
                        <p class="gen-dish-desc"><?php echo htmlspecialchars($dish['description']); ?></p>
                        
                        <?php if (!empty($dish['calories'])): ?>
                            <div style="font-size: 12px; font-weight: 700; color: var(--gen-muted); margin-bottom: 12px;">
                                ⚡ <?php echo (int)$dish['calories']; ?> kcal
                            </div>
                        <?php endif; ?>

                        <div class="gen-dish-footer">
                            <span class="gen-dish-price"><?php echo formatPrice($dish['price']); ?></span>
                            
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <?php if ($hasCustom): ?>
                                    <button type="button" class="gen-btn-custom" onclick="openCustomizationModal(<?php echo (int)$dish['id']; ?>)">
                                        CUSTOMIZE ⚡
                                    </button>
                                <?php endif; ?>

                                <button type="button" class="gen-btn-yellow" style="padding: 8px 14px; font-size: 12px;" onclick="quickAddToCart(<?php echo (int)$dish['id']; ?>, this)">
                                    + ADD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Empty Filter State -->
        <div id="genEmptyState" style="display: none; background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: 12px; padding: 60px 20px; text-align: center; margin-top: 30px;">
            <span style="font-size: 40px;">🍟</span>
            <h3 style="font-family: var(--gen-font-display); font-size: 24px; text-transform: uppercase; margin: 12px 0 6px;">NO DROPS MATCHED</h3>
            <p style="color: var(--gen-muted); font-weight: 600; font-size: 14px; max-width: 400px; margin: 0 auto 20px;">
                Nothing matched your current search filters. Hit the reset button to view the full fire menu!
            </p>
            <button type="button" class="gen-btn-primary" onclick="resetGenFilters()">RESET ALL FILTERS ⚡</button>
        </div>

        <!-- Bottom Banner -->
        <div style="margin-top: 60px; background: var(--gen-bg-alt); border: 3px solid var(--gen-ink); box-shadow: var(--gen-shadow); border-radius: var(--gen-radius-md); padding: 36px; text-align: center;">
            <span class="gen-sticker sticker-red">⚡ PRIVATE PARTY / BULK ORDERS</span>
            <h3 style="font-family: var(--gen-font-display); font-size: 24px; text-transform: uppercase; margin: 12px 0;">HOSTING YOUR CREW AT PEACHY?</h3>
            <p style="max-width: 600px; margin: 0 auto 20px; font-size: 15px; color: var(--gen-muted); font-weight: 600;">
                Pre-book our garden patio for birthdays, launches, or college reunions. Custom dessert platters available.
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="reservation.php" class="gen-btn-primary">LOCK IN YOUR RESERVATION ⚡</a>
                <button type="button" class="gen-btn-yellow" onclick="openCartDrawer()">VIEW STASH (<span class="peachy-cart-count"><?php echo $cart_details['item_count']; ?></span>)</button>
            </div>
        </div>
    </div>
</section>

<!-- Filter Script -->
<script>
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('genMenuSearch');
    const sortSelect = document.getElementById('genSortSelect');
    const dietButtons = document.querySelectorAll('.gen-diet-btn');
    const catButtons = document.querySelectorAll('.gen-filter-btn');
    const container = document.getElementById('genMenuContainer');
    const cards = Array.from(document.querySelectorAll('.gen-menu-item'));
    const emptyState = document.getElementById('genEmptyState');

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
                b.style.background = '#ffffff';
            });
            this.classList.add('active');
            this.style.background = 'var(--gen-yellow)';
            currentDiet = this.getAttribute('data-diet');
            filterDishes();
        });
    });

    window.resetGenFilters = function() {
        if (searchInput) searchInput.value = '';
        query = '';
        currentCat = 'all';
        currentDiet = 'all';
        currentSort = 'featured';

        catButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
        dietButtons.forEach(b => {
            const isAll = b.getAttribute('data-diet') === 'all';
            b.classList.toggle('active', isAll);
            b.style.background = isAll ? 'var(--gen-yellow)' : '#ffffff';
        });
        if (sortSelect) sortSelect.value = 'featured';
        filterDishes();
    };

    filterDishes();
});
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
