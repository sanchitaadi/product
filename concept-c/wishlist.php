<?php
$page_title = 'Private Collection & Saved Selections 💖';
require_once __DIR__ . '/includes/header.php';

$wishlist_items = getWishlistItems();
?>

<!-- Page Header -->
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Personal Portfolio &bull; Favorites</span>
        <h1 class="lux-section-title">Saved Culinary <em>Collection</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Your handpicked selection of artisanal creations, seasonal mains, and Parisian patisserie.
        </p>
    </div>
</div>

<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <?php if (empty($wishlist_items)): ?>
            <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 70px 24px; text-align: center; max-width: 600px; margin: 0 auto; box-shadow: var(--lux-shadow);">
                <span style="font-size: 34px;">🍸</span>
                <h2 style="font-family: var(--lux-font-serif); font-size: 24px; font-weight: 500; color: var(--lux-espresso); margin: 12px 0 8px;">Your Collection is Empty</h2>
                <p style="color: var(--lux-muted); font-size: 14px; line-height: 1.8; max-width: 420px; margin: 0 auto 24px;">
                    Select the delicate heart icon on any culinary preparation to save it to your personal portfolio.
                </p>
                <a href="menu.php" class="lux-btn-primary">Explore Carte du Jour</a>
            </div>
        <?php else: ?>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 26px;">
                <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted); font-weight: 600;">
                    Curated Selections (<?php echo count($wishlist_items); ?>)
                </span>
                <a href="menu.php" style="color: var(--lux-espresso); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; text-decoration: none; font-weight: 600;">
                    + View Complete Menu
                </a>
            </div>

            <div class="lux-dishes-grid">
                <?php foreach ($wishlist_items as $dish): ?>
                    <div class="lux-dish-card" id="luxWishCard_<?php echo $dish['id']; ?>">
                        <div class="lux-dish-thumb-wrap">
                            <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="lux-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                            
                            <button type="button" class="lux-dish-fav-btn" onclick="removeLuxWish(<?php echo (int)$dish['id']; ?>)" title="Remove selection">
                                <i class="fa-solid fa-heart" style="color: #e11d48;"></i>
                            </button>

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
                                <button type="button" class="lux-dish-action" onclick="quickAddToCart(<?php echo (int)$dish['id']; ?>, this)">
                                    Move to Hamper +
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
async function removeLuxWish(itemId) {
    try {
        const formData = new FormData();
        formData.append('item_id', itemId);
        const res = await fetch('../shared/api/wishlist.php?action=toggle', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
            const card = document.getElementById('luxWishCard_' + itemId);
            if (card) {
                card.remove();
                if (document.querySelectorAll('.lux-dish-card').length === 0) {
                    window.location.reload();
                }
            }
            const badges = document.querySelectorAll('.peachy-wishlist-count');
            badges.forEach(b => {
                b.textContent = data.count;
                b.style.display = data.count > 0 ? 'inline-flex' : 'none';
            });
        }
    } catch(e) { console.error(e); }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
