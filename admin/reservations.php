<?php
$page_title = 'Reservation Management';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$feedback = '';
$feedback_type = 'success';

// Handle status update
if (isset($_POST['update_status'])) {
    $res_id = (int)$_POST['reservation_id'];
    $new_status = $_POST['status'] ?? 'Pending';
    if (in_array($new_status, ['Pending', 'Confirmed', 'Cancelled'])) {
        $stmt = $db->prepare("UPDATE reservations SET status = :st WHERE id = :id");
        $stmt->execute([':st' => $new_status, ':id' => $res_id]);
        $feedback = "Reservation #{$res_id} status updated to '{$new_status}'.";
    }
}

// Handle delete
if (isset($_POST['delete_reservation'])) {
    $res_id = (int)$_POST['reservation_id'];
    $stmt = $db->prepare("DELETE FROM reservations WHERE id = :id");
    $stmt->execute([':id' => $res_id]);
    $feedback = "Reservation #{$res_id} deleted successfully.";
}

// Filter
$status_filter = $_GET['status'] ?? 'all';
$query = "SELECT * FROM reservations";
$params = [];
if ($status_filter && $status_filter !== 'all') {
    $query .= " WHERE status = :st";
    $params[':st'] = $status_filter;
}
$query .= " ORDER BY reservation_date DESC, reservation_time DESC";
$stmt = $db->prepare($query);
$stmt->execute($params);
$reservations = $stmt->fetchAll();
?>

<?php if (!empty($feedback)): ?>
    <div class="adm-alert adm-alert-success">
        <i class="fa-solid fa-check-circle"></i> <?php echo htmlspecialchars($feedback); ?>
    </div>
<?php endif; ?>

<!-- Filters & Actions -->
<div class="adm-card">
    <div class="adm-card-header">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="reservations.php?status=all" class="adm-btn <?php echo $status_filter === 'all' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                All (<?php echo count($reservations); ?>)
            </a>
            <a href="reservations.php?status=Pending" class="adm-btn <?php echo $status_filter === 'Pending' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Pending Review
            </a>
            <a href="reservations.php?status=Confirmed" class="adm-btn <?php echo $status_filter === 'Confirmed' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Confirmed
            </a>
            <a href="reservations.php?status=Cancelled" class="adm-btn <?php echo $status_filter === 'Cancelled' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Cancelled
            </a>
        </div>
        <div style="font-size: 13px; color: var(--adm-text-muted);">
            Real-time synchronization across all three concepts
        </div>
    </div>

    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>Ref #</th>
                    <th>Guest Information</th>
                    <th>Reservation Slot</th>
                    <th>Guests</th>
                    <th>Seating Preference</th>
                    <th>Source Concept</th>
                    <th>Status</th>
                    <th>Manage Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($reservations)): ?>
                    <tr>
                        <td colspan="9" style="text-align: center; color: var(--adm-text-muted); padding: 36px;">
                            No reservations found for the selected filter.
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($reservations as $r): ?>
                        <tr>
                            <td><strong>#<?php echo $r['id']; ?></strong></td>
                            <td>
                                <div style="font-weight: 700; color: var(--adm-text);"><?php echo htmlspecialchars($r['name']); ?></div>
                                <div style="font-size: 12px; color: var(--adm-text-muted);">
                                    <i class="fa-solid fa-phone" style="font-size: 10px;"></i> <?php echo htmlspecialchars($r['phone']); ?>
                                </div>
                                <div style="font-size: 12px; color: var(--adm-text-muted);">
                                    <i class="fa-regular fa-envelope" style="font-size: 10px;"></i> <?php echo htmlspecialchars($r['email']); ?>
                                </div>
                                <?php if (!empty($r['special_requests'])): ?>
                                    <div style="margin-top: 6px; font-size: 11px; background: #FFFBEB; border: 1px solid #FDE68A; padding: 4px 8px; border-radius: 4px; color: #92400E;">
                                        <strong>Note:</strong> <?php echo htmlspecialchars($r['special_requests']); ?>
                                    </div>
                                <?php endif; ?>
                            </td>
                            <td>
                                <div style="font-weight: 600;"><?php echo date('D, d M Y', strtotime($r['reservation_date'])); ?></div>
                                <div style="color: var(--adm-primary); font-weight: 700; font-size: 12px;"><?php echo htmlspecialchars($r['reservation_time']); ?></div>
                            </td>
                            <td>
                                <strong><?php echo (int)$r['guests']; ?></strong> Guests
                            </td>
                            <td>
                                <span style="font-size: 12px; color: var(--adm-text);"><?php echo htmlspecialchars($r['seating_area'] ?? 'Standard'); ?></span>
                            </td>
                            <td>
                                <span style="font-size: 11px; background: #F1F5F9; padding: 3px 8px; border-radius: 4px; font-weight: 600;">
                                    <?php echo htmlspecialchars($r['concept_source'] ?? 'Direct'); ?>
                                </span>
                            </td>
                            <td>
                                <?php
                                $statusClass = 'badge-pending';
                                if ($r['status'] === 'Confirmed') $statusClass = 'badge-confirmed';
                                if ($r['status'] === 'Cancelled') $statusClass = 'badge-cancelled';
                                ?>
                                <span class="badge-status <?php echo $statusClass; ?>">
                                    <?php echo htmlspecialchars($r['status']); ?>
                                </span>
                            </td>
                            <td>
                                <form method="POST" action="reservations.php" style="display: flex; gap: 4px;">
                                    <input type="hidden" name="reservation_id" value="<?php echo $r['id']; ?>">
                                    <select name="status" class="adm-form-control" style="padding: 4px 8px; font-size: 12px;" onchange="this.form.submit()">
                                        <option value="Pending" <?php echo $r['status'] === 'Pending' ? 'selected' : ''; ?>>Pending</option>
                                        <option value="Confirmed" <?php echo $r['status'] === 'Confirmed' ? 'selected' : ''; ?>>Confirmed</option>
                                        <option value="Cancelled" <?php echo $r['status'] === 'Cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                                    </select>
                                    <input type="hidden" name="update_status" value="1">
                                </form>
                            </td>
                            <td>
                                <form method="POST" action="reservations.php" onsubmit="return confirm('Are you sure you want to permanently delete reservation #<?php echo $r['id']; ?>?');">
                                    <input type="hidden" name="reservation_id" value="<?php echo $r['id']; ?>">
                                    <input type="hidden" name="delete_reservation" value="1">
                                    <button type="submit" class="adm-btn adm-btn-danger adm-btn-sm" title="Delete">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
