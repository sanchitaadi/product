<?php
$page_title = 'Saved Favorites & Wishlist 💖';
require_once __DIR__ . '/includes/header.php';

$wishlist_items = getWishlistItems();
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">💖 Handpicked Obsessions</span>
        <h1 class="coq-section-title">Saved <em>Aesthetic Favorites</em></h1>
        <p class="coq-section-subtitle">
            Your personal wishlist of handcrafted confections, artisan pastas, and dreamy beverages. Order whenever your heart desires.
        </p>
    </div>
</div>

<section style="padding-bottom: 90px;">
    <div class="coq-container">

        <?php if (empty($wishlist_items)): ?>
            <div style="background: #ffffff; border: 2px dashed var(--coq-border); border-radius: var(--coq-radius-lg); padding: 70px 24px; text-align: center; max-width: 600px; margin: 0 auto; box-shadow: var(--coq-shadow);">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: #FFF0F3; color: var(--coq-rose); display: flex; align-items: center; justify-content: center; font-size: 34px; margin: 0 auto 20px;">
                    💖
                </div>
                <h2 style="font-family: var(--coq-font-serif); font-size: 26px; color: var(--coq-text); margin-bottom: 12px;">Your Wishlist is Empty</h2>
                <p style="color: var(--coq-text-muted); font-size: 14.5px; line-height: 1.6; max-width: 420px; margin: 0 auto 26px;">
                    Tap the little heart on any pasta, dessert or beverage card while browsing to save it here for later!
                </p>
                <a href="menu.php" class="coq-btn-primary">
                    <span>Explore Our Menu</span>
                    <i class="fa-solid fa-sparkles"></i>
                </a>
            </div>
        <?php else: ?>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <p style="color: var(--coq-text-muted); font-size: 14px; margin: 0;">
                    Showing <strong><?php echo count($wishlist_items); ?></strong> saved treats in your collection:
                </p>
                <a href="menu.php" style="color: var(--coq-rose-dark); font-size: 13.5px; font-weight: 600; text-decoration: none;">
                    + Discover More Dishes
                </a>
            </div>

            <div class="coq-dishes-grid" id="wishlistContainer">
                <?php foreach ($wishlist_items as $dish): ?>
                    <div class="coq-dish-card" id="wishlistCard_<?php echo $dish['id']; ?>">
                        <div class="coq-dish-thumb-wrap">
                            <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="coq-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                            
                            <!-- Wishlist Toggle (Active Heart) -->
                            <button type="button" class="coq-dish-fav-btn" onclick="removeWishlistItem(<?php echo (int)$dish['id']; ?>)" title="Remove from wishlist">
                                <i class="fa-solid fa-heart" style="color: #e11d48;"></i>
                            </button>

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
                                <button type="button" class="coq-dish-action" onclick="quickAddToCart(<?php echo (int)$dish['id']; ?>, this)">
                                    <span>Move to Cart +</span>
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

        <?php endif; ?>

    </div>
</section>

<script>
async function removeWishlistItem(itemId) {
    try {
        const formData = new FormData();
        formData.append('item_id', itemId);
        const res = await fetch('../shared/api/wishlist.php?action=toggle', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            const card = document.getElementById('wishlistCard_' + itemId);
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.remove();
                    if (document.querySelectorAll('.coq-dish-card').length === 0) {
                        window.location.reload();
                    }
                }, 300);
            }
            const badges = document.querySelectorAll('.peachy-wishlist-count');
            badges.forEach(b => {
                b.textContent = data.count;
                b.style.display = data.count > 0 ? 'inline-flex' : 'none';
            });
        }
    } catch (err) {
        console.error(err);
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
