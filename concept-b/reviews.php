<?php
$page_title = 'Community Vibe Checks & Reviews 🔥';
require_once __DIR__ . '/includes/header.php';

$submit_success = false;
$submit_error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_review') {
    $_POST['concept_source'] = 'Concept B — Retro Gen-Z';
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
<div style="background: var(--gen-yellow); border-bottom: 3px solid var(--gen-ink); padding: 46px 0 36px; text-align: center;">
    <div class="gen-container">
        <span class="gen-sticker sticker-red">🔥 100% REAL REVIEWS &bull; ZERO FILTER</span>
        <h1 class="gen-section-title" style="margin-top: 10px;">COMMUNITY VIBE CHECKS</h1>
        <p style="font-size: 15px; font-weight: 700; color: var(--gen-ink); max-width: 540px; margin: 8px auto 0;">
            Read what our food crew across Delhi has to say about our sourdough crusts, pasta bowls, and dessert boxes.
        </p>
    </div>
</div>

<section style="padding: 50px 0 90px;">
    <div class="gen-container">

        <!-- Stat Highlights -->
        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 24px; margin-bottom: 36px; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
            <div style="text-align: center;">
                <div style="font-family: var(--gen-font-display); font-size: 42px; font-weight: 900; color: var(--gen-red); line-height: 1;">
                    <?php echo $avgRating; ?> / 5.0
                </div>
                <div style="color: #F59E0B; font-size: 18px; margin: 4px 0;">★★★★★</div>
                <span style="font-family: var(--gen-font-display); font-size: 11px; font-weight: 800; text-transform: uppercase;">COMMUNITY RATING</span>
            </div>
            <div style="text-align: center;">
                <div style="font-family: var(--gen-font-display); font-size: 42px; font-weight: 900; color: var(--gen-ink); line-height: 1;">
                    <?php echo count($reviews); ?>+
                </div>
                <div style="color: #059669; font-size: 13px; font-weight: 800; margin: 4px 0;">VERIFIED EATS</div>
                <span style="font-family: var(--gen-font-display); font-size: 11px; font-weight: 800; text-transform: uppercase;">PATRON CHECKS</span>
            </div>
            <div style="text-align: center;">
                <div style="font-family: var(--gen-font-display); font-size: 42px; font-weight: 900; color: var(--gen-yellow); line-height: 1; -webkit-text-stroke: 2px var(--gen-ink);">
                    100%
                </div>
                <div style="color: var(--gen-red); font-size: 13px; font-weight: 800; margin: 4px 0;">BIG FLAVOR</div>
                <span style="font-family: var(--gen-font-display); font-size: 11px; font-weight: 800; text-transform: uppercase;">FRESH KITCHEN</span>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 36px; align-items: start;">
            
            <!-- Left: Feed -->
            <div>
                <h2 style="font-family: var(--gen-font-display); font-size: 20px; text-transform: uppercase; margin: 0 0 20px;">
                    THE LATEST VIBE CHECKS
                </h2>

                <div style="display: flex; flex-direction: column; gap: 18px;">
                    <?php foreach ($reviews as $rev): ?>
                        <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 4px 4px 0px var(--gen-ink); border-radius: 14px; padding: 22px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                <div>
                                    <div style="color: #F59E0B; font-size: 14px; margin-bottom: 2px;">
                                        <?php echo str_repeat('★', (int)$rev['rating']); ?><?php echo str_repeat('☆', 5 - (int)$rev['rating']); ?>
                                    </div>
                                    <strong style="font-family: var(--gen-font-display); font-size: 16px; text-transform: uppercase;">
                                        <?php echo htmlspecialchars($rev['customer_name']); ?>
                                    </strong>
                                </div>
                                <span style="font-size: 11px; font-weight: 700; color: var(--gen-muted);">
                                    <?php echo date('d M Y', strtotime($rev['created_at'])); ?>
                                </span>
                            </div>

                            <p style="font-size: 14px; font-weight: 600; color: var(--gen-ink); line-height: 1.5; margin: 0 0 12px;">
                                "<?php echo htmlspecialchars($rev['review_text']); ?>"
                            </p>

                            <?php if (!empty($rev['dish_recommended'])): ?>
                                <span class="gen-sticker sticker-red" style="font-size: 10px;">
                                    ⚡ SHOUTOUT: <?php echo htmlspecialchars($rev['dish_recommended']); ?>
                                </span>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Right: Submit Form -->
            <div>
                <div style="background: #ffffff; border: 3px solid var(--gen-ink); box-shadow: 6px 6px 0px var(--gen-ink); border-radius: 16px; padding: 26px; position: sticky; top: 90px;">
                    <div style="text-align: center; margin-bottom: 18px;">
                        <span class="gen-sticker sticker-yellow">⚡ DROP YOUR TAKE</span>
                        <h3 style="font-family: var(--gen-font-display); font-size: 18px; text-transform: uppercase; margin: 10px 0 4px;">
                            SUBMIT A VIBE CHECK
                        </h3>
                        <p style="font-size: 12.5px; font-weight: 600; color: var(--gen-muted); margin: 0;">
                            Let the crew know what hit hardest on your plate.
                        </p>
                    </div>

                    <?php if ($submit_success): ?>
                        <div style="background: #dcfce7; border: 2px solid var(--gen-ink); border-radius: 10px; padding: 18px; text-align: center; color: #166534; font-weight: 700;">
                            <div style="font-size: 28px; margin-bottom: 6px;">⚡</div>
                            <h4 style="font-family: var(--gen-font-display); font-size: 16px; text-transform: uppercase; margin: 0 0 4px;">VIBE RECORDED!</h4>
                            <p style="margin: 0; font-size: 13px;">Your review is live on our community feed.</p>
                        </div>
                    <?php else: ?>

                        <?php if (!empty($submit_error)): ?>
                            <div style="background: #fee2e2; border: 2px solid var(--gen-red); border-radius: 8px; padding: 8px 12px; margin-bottom: 14px; color: #991b1b; font-size: 12px; font-weight: 700;">
                                <?php echo htmlspecialchars($submit_error); ?>
                            </div>
                        <?php endif; ?>

                        <form method="POST" action="reviews.php">
                            <input type="hidden" name="action" value="add_review">

                            <!-- Rating -->
                            <div style="margin-bottom: 14px; text-align: center;">
                                <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">YOUR RATING *</label>
                                <div style="display: inline-flex; gap: 8px; font-size: 24px; color: #d4d4d8; cursor: pointer;" id="genStarContainer">
                                    <span class="gen-r-star" data-rating="1" onclick="setGenRating(1)">★</span>
                                    <span class="gen-r-star" data-rating="2" onclick="setGenRating(2)">★</span>
                                    <span class="gen-r-star" data-rating="3" onclick="setGenRating(3)">★</span>
                                    <span class="gen-r-star" data-rating="4" onclick="setGenRating(4)">★</span>
                                    <span class="gen-r-star active" data-rating="5" onclick="setGenRating(5)">★</span>
                                </div>
                                <input type="hidden" name="rating" id="genRatingInput" value="5">
                            </div>

                            <div style="margin-bottom: 10px;">
                                <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">YOUR NAME *</label>
                                <input type="text" name="customer_name" required placeholder="Kabir S." 
                                       value="<?php echo htmlspecialchars($current_customer['full_name'] ?? ''); ?>"
                                       class="gen-form-control" style="width: 100%;">
                            </div>

                            <div style="margin-bottom: 10px;">
                                <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">EMAIL (PRIVATE) *</label>
                                <input type="email" name="customer_email" required placeholder="kabir@example.com" 
                                       value="<?php echo htmlspecialchars($current_customer['email'] ?? ''); ?>"
                                       class="gen-form-control" style="width: 100%;">
                            </div>

                            <div style="margin-bottom: 10px;">
                                <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">FAVORITE DISH</label>
                                <input type="text" name="dish_recommended" placeholder="e.g. Sourdough Truffle Pizza" 
                                       class="gen-form-control" style="width: 100%;">
                            </div>

                            <div style="margin-bottom: 16px;">
                                <label style="display: block; font-family: var(--gen-font-display); font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 4px;">VIBE REVIEW *</label>
                                <textarea name="review_text" required rows="3" placeholder="Tell Delhi how fire the food was..." 
                                          class="gen-form-control" style="width: 100%;"></textarea>
                            </div>

                            <button type="submit" class="gen-btn-primary" style="width: 100%; justify-content: center; padding: 13px;">
                                <span>POST VIBE CHECK 🔥</span>
                            </button>
                        </form>

                    <?php endif; ?>
                </div>
            </div>

        </div>

    </div>
</section>

<script>
function setGenRating(val) {
    document.getElementById('genRatingInput').value = val;
    const stars = document.querySelectorAll('.gen-r-star');
    stars.forEach((s, idx) => {
        s.style.color = (idx < val) ? '#F59E0B' : '#d4d4d8';
    });
}
document.addEventListener('DOMContentLoaded', () => setGenRating(5));
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
