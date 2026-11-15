<?php
$page_title = 'Saved Drops & Food Stash 💖⚡';
require_once __DIR__ . '/includes/header.php';

$wishlist_items = getWishlistItems();
?>

<!-- Page Header -->
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 46px 0 36px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">💖 SAVED DROPS &bull; FUTURE CRAVINGS</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">SAVED FOOD DROPS</h1>
        <p style="font-size: 15px; font-weight: 700; color: var(--gen-ink); max-width: 540px; margin: 8px auto 0;">
            Your personal vault of fire pink sauce pastas, loaded sides, and sweet desserts. Fire them to your cart whenever!
        </p>
    </div>
</div>

<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <?php if (empty($wishlist_items)): ?>
            <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 8px 8px 0px var(--gen-ink); border-radius: 16px; padding: 60px 24px; text-align: center; max-width: 580px; margin: 0 auto;">
                <div style="font-size: 44px; margin-bottom: 12px;">💔</div>
                <h2 style="font-family: var(--gen-font-display); font-size: 24px; text-transform: uppercase;">NO SAVED DROPS YET</h2>
                <p style="color: var(--gen-muted); font-weight: 600; font-size: 14.5px; line-height: 1.6; max-width: 400px; margin: 0 auto 24px;">
                    Hit the heart icon on any pizza, pasta or shake while browsing the menu to lock it into your saved stash!
                </p>
                <a href="menu.php" class="gen-btn-primary">CHECK MENU DROPS ⚡</a>
            </div>
        <?php else: ?>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <span style="font-family: var(--gen-font-display); font-size: 14px; font-weight: 800; text-transform: uppercase;">
                    LOCKED DROPS (<?php echo count($wishlist_items); ?>)
                </span>
                <a href="menu.php" class="gen-btn-yellow" style="padding: 6px 14px; font-size: 12px;">+ DISCOVER MORE DROPS</a>
            </div>

            <div class="gen-cards-grid">
                <?php foreach ($wishlist_items as $dish): ?>
                    <div class="gen-dish-card" id="genWishCard_<?php echo $dish['id']; ?>">
                        <div class="gen-dish-thumb-wrap">
                            <img src="<?php echo htmlspecialchars($dish['image_url']); ?>" alt="<?php echo htmlspecialchars($dish['name']); ?>" class="gen-dish-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                            
                            <button type="button" class="gen-dish-fav-btn" onclick="removeGenWish(<?php echo (int)$dish['id']; ?>)" title="Remove from stash">
                                <i class="fa-solid fa-heart" style="color: #e11d48;"></i>
                            </button>

                            <div class="gen-dish-veg">
                                <span class="<?php echo $dish['is_veg'] ? 'dot-veg' : 'dot-nonveg'; ?>" style="width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
                            </div>
                        </div>

                        <div class="gen-dish-body">
                            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--gen-red);"><?php echo htmlspecialchars($dish['category']); ?></span>
                            <h3 class="gen-dish-name"><?php echo htmlspecialchars($dish['name']); ?></h3>
                            <p class="gen-dish-desc"><?php echo htmlspecialchars($dish['description']); ?></p>

                            <div class="gen-dish-footer">
                                <span class="gen-dish-price"><?php echo formatPrice($dish['price']); ?></span>
                                <button type="button" class="gen-btn-yellow" onclick="quickAddToCart(<?php echo (int)$dish['id']; ?>, this)">
                                    + ADD TO STASH
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
async function removeGenWish(itemId) {
    try {
        const formData = new FormData();
        formData.append('item_id', itemId);
        const res = await fetch('../shared/api/wishlist.php?action=toggle', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
            const card = document.getElementById('genWishCard_' + itemId);
            if (card) {
                card.remove();
                if (document.querySelectorAll('.gen-dish-card').length === 0) {
                    window.location.reload();
                }
            }
            const badges = document.querySelectorAll('.peachy-wishlist-count');
            badges.forEach(b => {
                b.textContent = data.count;
                b.style.display = data.count > 0 ? 'inline-flex' : 'none';
            });
        }
    } catch (e) {
        console.error(e);
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
