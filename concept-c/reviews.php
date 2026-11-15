<?php
$page_title = 'Patron Accolades & Gastronomic Reviews';
require_once __DIR__ . '/includes/header.php';

$submit_success = false;
$submit_error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_review') {
    $_POST['concept_source'] = 'Concept C — Luxury Cute';
    $result = submitReview($_POST);
    if ($result['success']) {
        $submit_success = true;
    } else {
        $submit_error = $result['error'] ?? 'Please fill all required inputs.';
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
<div style="padding: 70px 0 50px; text-align: center; border-bottom: 1px solid var(--lux-border); background: var(--lux-bg-alt);">
    <div class="lux-container">
        <span class="lux-tag">Patron Accolades &bull; Reflections</span>
        <h1 class="lux-section-title">Refined <em>Accolades &amp; Reviews</em></h1>
        <p class="lux-section-desc" style="max-width: 600px; margin: 0 auto;">
            Reflections from patrons who have experienced our atelier dining salon and private residential deliveries.
        </p>
    </div>
</div>

<section style="padding: 60px 0 100px;">
    <div class="lux-container">

        <!-- Summary Bar -->
        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 30px; box-shadow: var(--lux-shadow); margin-bottom: 40px; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
            <div style="text-align: center;">
                <div style="font-family: var(--lux-font-serif); font-size: 42px; font-weight: 500; color: var(--lux-espresso); line-height: 1;">
                    <?php echo $avgRating; ?> / 5.0
                </div>
                <div style="color: #D4AF37; font-size: 16px; margin: 6px 0; letter-spacing: 2px;">★★★★★</div>
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted);">Maison Patron Score</span>
            </div>
            <div style="text-align: center;">
                <div style="font-family: var(--lux-font-serif); font-size: 42px; font-weight: 500; color: var(--lux-espresso); line-height: 1;">
                    <?php echo count($reviews); ?>+
                </div>
                <div style="color: #059669; font-size: 13px; font-weight: 600; margin: 6px 0;">Patron Verified</div>
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted);">Accolades Recorded</span>
            </div>
            <div style="text-align: center;">
                <div style="font-family: var(--lux-font-serif); font-size: 42px; font-weight: 500; color: var(--lux-gold); line-height: 1;">
                    100%
                </div>
                <div style="color: var(--lux-espresso); font-size: 13px; font-weight: 600; margin: 6px 0;">Artisanal Scratch Prep</div>
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-muted);">Zero Pre-Made Sauces</span>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 40px; align-items: start;">
            
            <!-- Feed -->
            <div>
                <h2 style="font-family: var(--lux-font-serif); font-size: 22px; font-weight: 500; color: var(--lux-espresso); margin: 0 0 20px;">
                    Recent Patron Accolades
                </h2>

                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <?php foreach ($reviews as $rev): ?>
                        <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 26px; box-shadow: var(--lux-shadow);">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                <div>
                                    <div style="color: #D4AF37; font-size: 13px; margin-bottom: 4px; letter-spacing: 2px;">
                                        <?php echo str_repeat('★', (int)$rev['rating']); ?><?php echo str_repeat('☆', 5 - (int)$rev['rating']); ?>
                                    </div>
                                    <strong style="font-family: var(--lux-font-serif); font-size: 17px; font-weight: 500; color: var(--lux-espresso);">
                                        <?php echo htmlspecialchars($rev['customer_name']); ?>
                                    </strong>
                                </div>
                                <span style="font-size: 11.5px; color: var(--lux-muted);">
                                    <?php echo date('M j, Y', strtotime($rev['created_at'])); ?>
                                </span>
                            </div>

                            <p style="font-size: 14px; color: var(--lux-muted); line-height: 1.8; margin: 0 0 14px; font-style: italic;">
                                "<?php echo htmlspecialchars($rev['review_text']); ?>"
                            </p>

                            <?php if (!empty($rev['dish_recommended'])): ?>
                                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--lux-gold); font-weight: 600; border: 1px solid var(--lux-border); padding: 4px 10px; border-radius: 20px; background: #FAF7F2;">
                                    ✦ Recommendation: <?php echo htmlspecialchars($rev['dish_recommended']); ?>
                                </span>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Form -->
            <div>
                <div style="background: #ffffff; border: 1px solid var(--lux-border); border-radius: var(--lux-radius-md); padding: 30px; box-shadow: var(--lux-shadow); position: sticky; top: 90px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <span class="lux-tag">Share Your Reflection</span>
                        <h3 style="font-family: var(--lux-font-serif); font-size: 20px; font-weight: 500; color: var(--lux-espresso); margin: 8px 0 4px;">
                            Submit an Accolade
                        </h3>
                        <p style="font-size: 12.5px; color: var(--lux-muted); margin: 0;">
                            Your perspective guides our culinary brigade and fellow patrons.
                        </p>
                    </div>

                    <?php if ($submit_success): ?>
                        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 4px; padding: 18px; text-align: center; color: #166534;">
                            <div style="font-size: 24px; margin-bottom: 6px;">🍸</div>
                            <h4 style="font-family: var(--lux-font-serif); font-size: 18px; font-weight: 500; margin: 0 0 4px;">Accolade Recorded</h4>
                            <p style="margin: 0; font-size: 13px;">Thank you for contributing to our atelier dining archive.</p>
                        </div>
                    <?php else: ?>

                        <?php if (!empty($submit_error)): ?>
                            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px; color: #9F1239; font-size: 12px;">
                                <?php echo htmlspecialchars($submit_error); ?>
                            </div>
                        <?php endif; ?>

                        <form method="POST" action="reviews.php">
                            <input type="hidden" name="action" value="add_review">

                            <!-- Rating -->
                            <div style="margin-bottom: 16px; text-align: center;">
                                <label style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 6px;">Evaluation Rating *</label>
                                <div style="display: inline-flex; gap: 8px; font-size: 22px; color: #E5E7EB; cursor: pointer;" id="luxStarWrap">
                                    <span class="lux-r-star" data-rating="1" onclick="setLuxRating(1)">★</span>
                                    <span class="lux-r-star" data-rating="2" onclick="setLuxRating(2)">★</span>
                                    <span class="lux-r-star" data-rating="3" onclick="setLuxRating(3)">★</span>
                                    <span class="lux-r-star" data-rating="4" onclick="setLuxRating(4)">★</span>
                                    <span class="lux-r-star active" data-rating="5" onclick="setLuxRating(5)">★</span>
                                </div>
                                <input type="hidden" name="rating" id="luxRatingInput" value="5">
                            </div>

                            <div style="margin-bottom: 12px;">
                                <label style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 4px;">Your Name *</label>
                                <input type="text" name="customer_name" required placeholder="Meera Singhania" 
                                       value="<?php echo htmlspecialchars($current_customer['full_name'] ?? ''); ?>"
                                       class="lux-form-control" style="width: 100%;">
                            </div>

                            <div style="margin-bottom: 12px;">
                                <label style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 4px;">Email (Confidential) *</label>
                                <input type="email" name="customer_email" required placeholder="meera@example.com" 
                                       value="<?php echo htmlspecialchars($current_customer['email'] ?? ''); ?>"
                                       class="lux-form-control" style="width: 100%;">
                            </div>

                            <div style="margin-bottom: 12px;">
                                <label style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 4px;">Recommended Plate</label>
                                <input type="text" name="dish_recommended" placeholder="e.g. Pink Vodka Rigatoni" 
                                       class="lux-form-control" style="width: 100%;">
                            </div>

                            <div style="margin-bottom: 18px;">
                                <label style="display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--lux-muted); margin-bottom: 4px;">Accolade Reflection *</label>
                                <textarea name="review_text" required rows="3" placeholder="Share your experience regarding flavor balance, presentation, or service..." 
                                          class="lux-form-control" style="width: 100%;"></textarea>
                            </div>

                            <button type="submit" class="lux-btn-primary" style="width: 100%; justify-content: center; padding: 13px;">
                                <span>Record Accolade</span>
                            </button>
                        </form>

                    <?php endif; ?>
                </div>
            </div>

        </div>

    </div>
</section>

<script>
function setLuxRating(val) {
    document.getElementById('luxRatingInput').value = val;
    const stars = document.querySelectorAll('.lux-r-star');
    stars.forEach((s, idx) => {
        s.style.color = (idx < val) ? '#D4AF37' : '#E5E7EB';
    });
}
document.addEventListener('DOMContentLoaded', () => setLuxRating(5));
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
