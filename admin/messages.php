<?php
$page_title = 'Contact Inquiries & Feedback';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$feedback = '';

// Handle status update
if (isset($_POST['update_msg_status'])) {
    $msg_id = (int)$_POST['message_id'];
    $st = $_POST['status'] ?? 'New';
    if (in_array($st, ['New', 'Read', 'Replied'])) {
        $stmt = $db->prepare("UPDATE contact_messages SET status = :st WHERE id = :id");
        $stmt->execute([':st' => $st, ':id' => $msg_id]);
        $feedback = "Inquiry #{$msg_id} status updated to '{$st}'.";
    }
}

// Handle delete
if (isset($_POST['delete_msg'])) {
    $msg_id = (int)$_POST['message_id'];
    $stmt = $db->prepare("DELETE FROM contact_messages WHERE id = :id");
    $stmt->execute([':id' => $msg_id]);
    $feedback = "Inquiry #{$msg_id} deleted successfully.";
}

// Filter
$status_filter = $_GET['status'] ?? 'all';
$query = "SELECT * FROM contact_messages";
$params = [];
if ($status_filter && $status_filter !== 'all') {
    $query .= " WHERE status = :st";
    $params[':st'] = $status_filter;
}
$query .= " ORDER BY created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute($params);
$messages = $stmt->fetchAll();
?>

<?php if (!empty($feedback)): ?>
    <div class="adm-alert adm-alert-success">
        <i class="fa-solid fa-check-circle"></i> <?php echo htmlspecialchars($feedback); ?>
    </div>
<?php endif; ?>

<div class="adm-card">
    <div class="adm-card-header">
        <div style="display: flex; gap: 8px;">
            <a href="messages.php?status=all" class="adm-btn <?php echo $status_filter === 'all' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                All (<?php echo count($messages); ?>)
            </a>
            <a href="messages.php?status=New" class="adm-btn <?php echo $status_filter === 'New' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                New Unread
            </a>
            <a href="messages.php?status=Read" class="adm-btn <?php echo $status_filter === 'Read' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Read
            </a>
            <a href="messages.php?status=Replied" class="adm-btn <?php echo $status_filter === 'Replied' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Replied
            </a>
        </div>
        <div style="font-size: 12px; color: var(--adm-text-muted);">
            Inquiries received across all design concepts
        </div>
    </div>

    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>Ref</th>
                    <th>Sender Information</th>
                    <th>Subject</th>
                    <th>Full Message</th>
                    <th>Source Concept</th>
                    <th>Received At</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($messages)): ?>
                    <tr>
                        <td colspan="8" style="text-align: center; color: var(--adm-text-muted); padding: 36px;">
                            No inquiries found for this view.
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($messages as $m): ?>
                        <tr>
                            <td><strong>#<?php echo $m['id']; ?></strong></td>
                            <td>
                                <div style="font-weight: 700; color: var(--adm-text);"><?php echo htmlspecialchars($m['name']); ?></div>
                                <div style="font-size: 12px; color: var(--adm-text-muted);"><?php echo htmlspecialchars($m['email']); ?></div>
                                <?php if (!empty($m['phone'])): ?>
                                    <div style="font-size: 11px; color: var(--adm-text-muted);"><?php echo htmlspecialchars($m['phone']); ?></div>
                                <?php endif; ?>
                            </td>
                            <td><strong><?php echo htmlspecialchars($m['subject']); ?></strong></td>
                            <td style="max-width: 380px; font-size: 13px; color: var(--adm-text); line-height: 1.5;">
                                <?php echo nl2br(htmlspecialchars($m['message'])); ?>
                            </td>
                            <td>
                                <span style="font-size: 11px; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-weight: 600;">
                                    <?php echo htmlspecialchars($m['concept_source'] ?? 'Website'); ?>
                                </span>
                            </td>
                            <td style="font-size: 12px; color: var(--adm-text-muted);">
                                <?php echo date('d M Y, H:i', strtotime($m['created_at'])); ?>
                            </td>
                            <td>
                                <form method="POST" action="messages.php">
                                    <input type="hidden" name="message_id" value="<?php echo $m['id']; ?>">
                                    <select name="status" class="adm-form-control" style="padding: 4px 8px; font-size: 12px;" onchange="this.form.submit()">
                                        <option value="New" <?php echo $m['status'] === 'New' ? 'selected' : ''; ?>>New</option>
                                        <option value="Read" <?php echo $m['status'] === 'Read' ? 'selected' : ''; ?>>Read</option>
                                        <option value="Replied" <?php echo $m['status'] === 'Replied' ? 'selected' : ''; ?>>Replied</option>
                                    </select>
                                    <input type="hidden" name="update_msg_status" value="1">
                                </form>
                            </td>
                            <td>
                                <div style="display: flex; gap: 6px;">
                                    <a href="mailto:<?php echo htmlspecialchars($m['email']); ?>?subject=Re:%20<?php echo urlencode($m['subject']); ?>" class="adm-btn adm-btn-outline adm-btn-sm" title="Reply via Email">
                                        <i class="fa-solid fa-reply"></i>
                                    </a>
                                    <form method="POST" action="messages.php" onsubmit="return confirm('Delete message #<?php echo $m['id']; ?>?');">
                                        <input type="hidden" name="message_id" value="<?php echo $m['id']; ?>">
                                        <input type="hidden" name="delete_msg" value="1">
                                        <button type="submit" class="adm-btn adm-btn-danger adm-btn-sm" title="Delete">
                                            <i class="fa-solid fa-trash"></i>
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
