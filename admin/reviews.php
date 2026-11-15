<?php
$page_title = 'Review Moderation & Ratings Feed';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$msg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $rev_id = (int)($_POST['review_id'] ?? 0);
    if ($_POST['action'] === 'approve') {
        $db->prepare("UPDATE reviews SET status = 'approved' WHERE id = :id")->execute([':id' => $rev_id]);
        $msg = 'Review approved and published.';
    } elseif ($_POST['action'] === 'reject') {
        $db->prepare("UPDATE reviews SET status = 'rejected' WHERE id = :id")->execute([':id' => $rev_id]);
        $msg = 'Review hidden/rejected.';
    } elseif ($_POST['action'] === 'delete') {
        $db->prepare("DELETE FROM reviews WHERE id = :id")->execute([':id' => $rev_id]);
        $msg = 'Review permanently deleted.';
    }
}

$reviews = $db->query("SELECT * FROM reviews ORDER BY id DESC")->fetchAll();
?>

<?php if (!empty($msg)): ?>
    <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--adm-radius); padding: 14px 20px; margin-bottom: 24px; color: #065F46; font-size: 13.5px;">
        <i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($msg); ?>
    </div>
<?php endif; ?>

<div class="adm-card">
    <div class="adm-card-header">
        <h3 class="adm-card-title">Customer Reviews &amp; Ratings (<?php echo count($reviews); ?>)</h3>
    </div>
    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>Ref</th>
                    <th>Patron</th>
                    <th>Rating</th>
                    <th>Recommended Dish</th>
                    <th>Review Content</th>
                    <th>Concept Source</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($reviews)): ?>
                    <tr><td colspan="8" style="text-align: center; color: var(--adm-text-muted); padding: 30px;">No reviews submitted yet.</td></tr>
                <?php else: ?>
                    <?php foreach ($reviews as $rev): ?>
                        <tr>
                            <td>#<?php echo $rev['id']; ?></td>
                            <td>
                                <strong><?php echo htmlspecialchars($rev['customer_name']); ?></strong>
                                <div style="font-size: 11px; color: var(--adm-text-muted);"><?php echo htmlspecialchars($rev['customer_email']); ?></div>
                            </td>
                            <td>
                                <span style="color: #F59E0B; font-size: 14px; letter-spacing: 1px;">
                                    <?php echo str_repeat('★', (int)$rev['rating']); ?>
                                </span>
                            </td>
                            <td>
                                <span style="font-size: 12px; font-weight: 600; color: #e11d48;">
                                    <?php echo htmlspecialchars($rev['dish_recommended'] ?: 'General Dining'); ?>
                                </span>
                            </td>
                            <td style="max-width: 320px; font-size: 13px; line-height: 1.5;">
                                "<?php echo htmlspecialchars($rev['review_text']); ?>"
                            </td>
                            <td>
                                <span style="font-size: 11.5px; font-weight: 600;">
                                    <?php echo htmlspecialchars($rev['concept_source'] ?? 'Direct'); ?>
                                </span>
                            </td>
                            <td>
                                <span class="adm-badge <?php echo $rev['status'] === 'approved' ? 'adm-badge-success' : ($rev['status'] === 'rejected' ? 'adm-badge-danger' : 'adm-badge-warning'); ?>">
                                    <?php echo ucfirst($rev['status']); ?>
                                </span>
                            </td>
                            <td>
                                <div style="display: flex; gap: 6px;">
                                    <?php if ($rev['status'] !== 'approved'): ?>
                                        <form method="POST" action="reviews.php" style="display: inline;">
                                            <input type="hidden" name="action" value="approve">
                                            <input type="hidden" name="review_id" value="<?php echo $rev['id']; ?>">
                                            <button type="submit" class="adm-btn adm-btn-sm adm-btn-primary" title="Approve">
                                                <i class="fa-solid fa-check"></i>
                                            </button>
                                        </form>
                                    <?php endif; ?>

                                    <?php if ($rev['status'] !== 'rejected'): ?>
                                        <form method="POST" action="reviews.php" style="display: inline;">
                                            <input type="hidden" name="action" value="reject">
                                            <input type="hidden" name="review_id" value="<?php echo $rev['id']; ?>">
                                            <button type="submit" class="adm-btn adm-btn-outline adm-btn-sm" title="Reject">
                                                <i class="fa-solid fa-ban"></i>
                                            </button>
                                        </form>
                                    <?php endif; ?>

                                    <form method="POST" action="reviews.php" style="display: inline;" onsubmit="return confirm('Delete this review?');">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="review_id" value="<?php echo $rev['id']; ?>">
                                        <button type="submit" class="adm-btn adm-btn-danger adm-btn-sm" title="Delete">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
