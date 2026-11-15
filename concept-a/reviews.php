<?php
$page_title = 'Love Notes & Guest Reviews 💌';
require_once __DIR__ . '/includes/header.php';

$submit_success = false;
$submit_error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_review') {
    $_POST['concept_source'] = 'Concept A — Coquette Pinterest';
    $result = submitReview($_POST);
    if ($result['success']) {
        $submit_success = true;
    } else {
        $submit_error = $result['error'] ?? 'Please fill in all required fields.';
    }
}

$reviews = getApprovedReviews(20);
$totalRating = 0;
foreach ($reviews as $r) {
    $totalRating += (int)$r['rating'];
}
$avgRating = count($reviews) > 0 ? round($totalRating / count($reviews), 1) : 5.0;
?>

<!-- Page Header -->
<div class="coq-page-header">
    <div class="coq-container">
        <span class="coq-tag-pill">💌 Patron Testimonials &bull; Pure Love</span>
        <h1 class="coq-section-title">Love Notes &amp; <em>Guest Reviews</em></h1>
        <p class="coq-section-subtitle">
            What food lovers and aesthetic seekers in New Delhi say about their dining and delivery experience at Peachy Plate.
        </p>
    </div>
</div>

<section style="padding-bottom: 90px;">
    <div class="coq-container">

        <!-- Rating Summary Bar -->
        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 30px; box-shadow: var(--coq-shadow); margin-bottom: 40px; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
            <div style="text-align: center;">
                <div style="font-family: var(--coq-font-serif); font-size: 48px; font-weight: 700; color: var(--coq-text); line-height: 1;">
                    <?php echo $avgRating; ?>
                </div>
                <div style="color: #F59E0B; font-size: 18px; margin: 6px 0;">
                    ★★★★★
                </div>
                <span style="font-size: 12.5px; color: var(--coq-text-muted);">Overall Dining Rating</span>
            </div>

            <div style="height: 50px; width: 1px; background: var(--coq-border);" class="coq-hide-mobile"></div>

            <div style="text-align: center;">
                <div style="font-family: var(--coq-font-serif); font-size: 36px; font-weight: 700; color: var(--coq-rose-dark); line-height: 1;">
                    100%
                </div>
                <div style="color: #059669; font-size: 14px; margin: 6px 0; font-weight: 600;">
                    Fresh Organic Ingredients
                </div>
                <span style="font-size: 12.5px; color: var(--coq-text-muted);">Prepared To Order</span>
            </div>

            <div style="height: 50px; width: 1px; background: var(--coq-border);" class="coq-hide-mobile"></div>

            <div style="text-align: center;">
                <div style="font-family: var(--coq-font-serif); font-size: 36px; font-weight: 700; color: var(--coq-text); line-height: 1;">
                    <?php echo count($reviews); ?>+
                </div>
                <div style="color: var(--coq-rose); font-size: 14px; margin: 6px 0; font-weight: 600;">
                    Verified Patron Accolades
                </div>
                <span style="font-size: 12.5px; color: var(--coq-text-muted);">From Delhi &amp; Beyond</span>
            </div>
        </div>

        <!-- Layout: Reviews Grid (Left 2fr) + Write Review Card (Right 1fr) -->
        <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 36px; align-items: start;" class="coq-reviews-grid">
            
            <!-- Left: Reviews Feed -->
            <div>
                <h2 style="font-family: var(--coq-font-serif); font-size: 22px; color: var(--coq-text); margin: 0 0 20px;">
                    Recent Love Notes
                </h2>

                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <?php foreach ($reviews as $rev): ?>
                        <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 24px; box-shadow: var(--coq-shadow); position: relative;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                <div>
                                    <div style="color: #F59E0B; font-size: 14px; margin-bottom: 4px; letter-spacing: 2px;">
                                        <?php echo str_repeat('★', (int)$rev['rating']); ?><?php echo str_repeat('☆', 5 - (int)$rev['rating']); ?>
                                    </div>
                                    <strong style="font-family: var(--coq-font-serif); font-size: 17px; color: var(--coq-text);">
                                        <?php echo htmlspecialchars($rev['customer_name']); ?>
                                    </strong>
                                </div>
                                <span style="font-size: 12px; color: var(--coq-text-muted);">
                                    <?php echo date('M j, Y', strtotime($rev['created_at'])); ?>
                                </span>
                            </div>

                            <p style="font-size: 14px; color: var(--coq-text-muted); line-height: 1.6; margin: 0 0 12px; font-style: italic;">
                                "<?php echo htmlspecialchars($rev['review_text']); ?>"
                            </p>

                            <?php if (!empty($rev['dish_recommended'])): ?>
                                <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 600; color: var(--coq-rose-dark); background: var(--coq-bg-soft); padding: 4px 10px; border-radius: var(--coq-radius-full); border: 1px dashed var(--coq-rose);">
                                    <span>🎀 Recommended:</span>
                                    <span><?php echo htmlspecialchars($rev['dish_recommended']); ?></span>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Right: Submit Review Form -->
            <div>
                <div style="background: #ffffff; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-lg); padding: 28px; box-shadow: var(--coq-shadow); position: sticky; top: 90px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <span style="font-size: 28px;">💌</span>
                        <h3 style="font-family: var(--coq-font-serif); font-size: 20px; color: var(--coq-text); margin: 6px 0;">
                            Leave a Love Note
                        </h3>
                        <p style="font-size: 13px; color: var(--coq-text-muted); margin: 0;">
                            Dined with us or enjoyed a delivery box? Share your cute moments with the community!
                        </p>
                    </div>

                    <?php if ($submit_success): ?>
                        <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--coq-radius-md); padding: 18px; text-align: center; color: #065F46; font-size: 14px;">
                            <i class="fa-solid fa-heart" style="color: #e11d48; font-size: 24px; margin-bottom: 8px;"></i>
                            <h4 style="margin: 0 0 4px; font-family: var(--coq-font-serif); font-size: 18px;">Thank You!</h4>
                            <p style="margin: 0;">Your love note has been recorded and posted to our community wall.</p>
                        </div>
                    <?php else: ?>

                        <?php if (!empty($submit_error)): ?>
                            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--coq-radius-sm); padding: 10px 14px; margin-bottom: 16px; color: #9F1239; font-size: 12.5px;">
                                <?php echo htmlspecialchars($submit_error); ?>
                            </div>
                        <?php endif; ?>

                        <form method="POST" action="reviews.php">
                            <input type="hidden" name="action" value="add_review">

                            <!-- Rating Selector -->
                            <div style="margin-bottom: 16px; text-align: center;">
                                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--coq-text); margin-bottom: 6px;">Your Rating *</label>
                                <div style="display: inline-flex; gap: 8px; font-size: 24px; color: #CBD5E1; cursor: pointer;" id="starRatingContainer">
                                    <span class="rating-star" data-rating="1" onclick="setRating(1)">★</span>
                                    <span class="rating-star" data-rating="2" onclick="setRating(2)">★</span>
                                    <span class="rating-star" data-rating="3" onclick="setRating(3)">★</span>
                                    <span class="rating-star" data-rating="4" onclick="setRating(4)">★</span>
                                    <span class="rating-star active" data-rating="5" onclick="setRating(5)">★</span>
                                </div>
                                <input type="hidden" name="rating" id="reviewRatingInput" value="5">
                            </div>

                            <div style="margin-bottom: 12px;">
                                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--coq-text); margin-bottom: 4px;">Your Name *</label>
                                <input type="text" name="customer_name" required placeholder="e.g. Radhika Kapoor" 
                                       value="<?php echo htmlspecialchars($current_customer['full_name'] ?? ''); ?>"
                                       class="coq-input" style="width: 100%; padding: 10px 12px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 13.5px;">
                            </div>

                            <div style="margin-bottom: 12px;">
                                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--coq-text); margin-bottom: 4px;">Email (kept private) *</label>
                                <input type="email" name="customer_email" required placeholder="radhika@example.com" 
                                       value="<?php echo htmlspecialchars($current_customer['email'] ?? ''); ?>"
                                       class="coq-input" style="width: 100%; padding: 10px 12px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 13.5px;">
                            </div>

                            <div style="margin-bottom: 12px;">
                                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--coq-text); margin-bottom: 4px;">Favorite Dish Recommended</label>
                                <input type="text" name="dish_recommended" placeholder="e.g. Pink Ribbon Fettuccine" 
                                       class="coq-input" style="width: 100%; padding: 10px 12px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 13.5px;">
                            </div>

                            <div style="margin-bottom: 18px;">
                                <label style="display: block; font-size: 12.5px; font-weight: 600; color: var(--coq-text); margin-bottom: 4px;">Your Review Note *</label>
                                <textarea name="review_text" required rows="3" placeholder="Tell us about the flavors, presentation, or ambience..." 
                                          class="coq-input" style="width: 100%; padding: 10px 12px; border: 1px solid var(--coq-border); border-radius: var(--coq-radius-sm); font-size: 13.5px;"></textarea>
                            </div>

                            <button type="submit" class="coq-btn-primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 14px;">
                                <span>Post Love Note 💌</span>
                            </button>
                        </form>

                    <?php endif; ?>
                </div>
            </div>

        </div>

    </div>
</section>

<script>
function setRating(val) {
    document.getElementById('reviewRatingInput').value = val;
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((s, idx) => {
        if (idx < val) {
            s.style.color = '#F59E0B';
        } else {
            s.style.color = '#CBD5E1';
        }
    });
}
document.addEventListener('DOMContentLoaded', () => setRating(5));
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
