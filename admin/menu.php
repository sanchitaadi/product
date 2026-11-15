<?php
$page_title = 'Menu Items Management';
require_once __DIR__ . '/includes/header.php';

$db = getDbConnection();
$feedback = '';
$feedback_type = 'success';

// Handle Add Item
if (isset($_POST['add_dish'])) {
    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $price = (float)($_POST['price'] ?? 0);
    $category = $_POST['category'] ?? 'Starters';
    $is_veg = isset($_POST['is_veg']) ? 1 : 0;
    $is_bestseller = isset($_POST['is_bestseller']) ? 1 : 0;
    $image_url = trim($_POST['image_url'] ?? '');
    $calories = !empty($_POST['calories']) ? (int)$_POST['calories'] : null;

    if (!empty($name) && $price > 0 && !empty($image_url)) {
        $stmt = $db->prepare("
            INSERT INTO menu_items (name, description, price, category, is_veg, is_bestseller, image_url, calories)
            VALUES (:name, :desc, :price, :cat, :veg, :best, :img, :cal)
        ");
        $stmt->execute([
            ':name' => $name,
            ':desc' => $description,
            ':price' => $price,
            ':cat' => $category,
            ':veg' => $is_veg,
            ':best' => $is_bestseller,
            ':img' => $image_url,
            ':cal' => $calories
        ]);
        $feedback = "New dish '{$name}' created successfully!";
    } else {
        $feedback = "Please provide dish name, valid price, and image URL.";
        $feedback_type = 'error';
    }
}

// Handle Edit Item
if (isset($_POST['edit_dish'])) {
    $id = (int)$_POST['dish_id'];
    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $price = (float)($_POST['price'] ?? 0);
    $category = $_POST['category'] ?? 'Starters';
    $is_veg = isset($_POST['is_veg']) ? 1 : 0;
    $is_bestseller = isset($_POST['is_bestseller']) ? 1 : 0;
    $image_url = trim($_POST['image_url'] ?? '');
    $calories = !empty($_POST['calories']) ? (int)$_POST['calories'] : null;

    if (!empty($name) && $price > 0) {
        $stmt = $db->prepare("
            UPDATE menu_items SET name = :name, description = :desc, price = :price, category = :cat,
            is_veg = :veg, is_bestseller = :best, image_url = :img, calories = :cal
            WHERE id = :id
        ");
        $stmt->execute([
            ':name' => $name,
            ':desc' => $description,
            ':price' => $price,
            ':cat' => $category,
            ':veg' => $is_veg,
            ':best' => $is_bestseller,
            ':img' => $image_url,
            ':cal' => $calories,
            ':id' => $id
        ]);
        $feedback = "Dish #{$id} ('{$name}') updated successfully!";
    }
}

// Handle Delete
if (isset($_POST['delete_dish'])) {
    $id = (int)$_POST['dish_id'];
    $stmt = $db->prepare("DELETE FROM menu_items WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $feedback = "Menu item #{$id} has been removed.";
}

// Filter
$cat_filter = $_GET['cat'] ?? 'all';
$query = "SELECT * FROM menu_items";
$params = [];
if ($cat_filter && $cat_filter !== 'all') {
    $query .= " WHERE category = :cat";
    $params[':cat'] = $cat_filter;
}
$query .= " ORDER BY category ASC, is_bestseller DESC, id ASC";
$stmt = $db->prepare($query);
$stmt->execute($params);
$dishes = $stmt->fetchAll();

// Check if editing specific item
$edit_item = null;
if (isset($_GET['edit_id'])) {
    $edit_stmt = $db->prepare("SELECT * FROM menu_items WHERE id = :id LIMIT 1");
    $edit_stmt->execute([':id' => (int)$_GET['edit_id']]);
    $edit_item = $edit_stmt->fetch();
}
?>

<?php if (!empty($feedback)): ?>
    <div class="adm-alert <?php echo $feedback_type === 'success' ? 'adm-alert-success' : 'adm-alert-error'; ?>">
        <i class="fa-solid fa-bell"></i> <?php echo htmlspecialchars($feedback); ?>
    </div>
<?php endif; ?>

<!-- Dish Form Card (Add or Edit) -->
<div class="adm-card">
    <div class="adm-card-header">
        <h3 class="adm-card-title">
            <i class="fa-solid fa-plus-circle" style="color: var(--adm-primary);"></i>
            <?php echo $edit_item ? 'Edit Menu Dish #' . $edit_item['id'] : 'Add New Dish to Live Menu'; ?>
        </h3>
        <?php if ($edit_item): ?>
            <a href="menu.php" class="adm-btn adm-btn-outline adm-btn-sm">Cancel Edit &rarr;</a>
        <?php endif; ?>
    </div>
    <div class="adm-card-body">
        <form method="POST" action="menu.php">
            <?php if ($edit_item): ?>
                <input type="hidden" name="dish_id" value="<?php echo $edit_item['id']; ?>">
                <input type="hidden" name="edit_dish" value="1">
            <?php else: ?>
                <input type="hidden" name="add_dish" value="1">
            <?php endif; ?>

            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;">
                <div class="adm-form-group">
                    <label>Dish Name *</label>
                    <input type="text" name="name" class="adm-form-control" placeholder="e.g. Pink Sauce Pasta" value="<?php echo htmlspecialchars($edit_item['name'] ?? ''); ?>" required>
                </div>
                <div class="adm-form-group">
                    <label>Price in INR (₹) *</label>
                    <input type="number" step="1" name="price" class="adm-form-control" placeholder="299" value="<?php echo htmlspecialchars($edit_item['price'] ?? ''); ?>" required>
                </div>
                <div class="adm-form-group">
                    <label>Category *</label>
                    <select name="category" class="adm-form-control" required>
                        <option value="Starters" <?php echo ($edit_item['category'] ?? '') === 'Starters' ? 'selected' : ''; ?>>Starters</option>
                        <option value="Pizza and Pasta" <?php echo ($edit_item['category'] ?? '') === 'Pizza and Pasta' ? 'selected' : ''; ?>>Pizza and Pasta</option>
                        <option value="Main Course" <?php echo ($edit_item['category'] ?? '') === 'Main Course' ? 'selected' : ''; ?>>Main Course</option>
                        <option value="Desserts" <?php echo ($edit_item['category'] ?? '') === 'Desserts' ? 'selected' : ''; ?>>Desserts</option>
                        <option value="Beverages" <?php echo ($edit_item['category'] ?? '') === 'Beverages' ? 'selected' : ''; ?>>Beverages</option>
                    </select>
                </div>
            </div>

            <div class="adm-form-group">
                <label>Description &amp; Ingredients *</label>
                <textarea name="description" class="adm-form-control" rows="2" placeholder="Velvety signature tomato cream rosa sauce with sweet basil..." required><?php echo htmlspecialchars($edit_item['description'] ?? ''); ?></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 2.5fr 1fr 1.5fr; gap: 16px; align-items: center;">
                <div class="adm-form-group">
                    <label>Food Photo Image Filename or URL *</label>
                    <input type="text" name="image_url" class="adm-form-control" placeholder="pink-sauce-pasta.webp or https://..." value="<?php echo htmlspecialchars($edit_item['image_url'] ?? ''); ?>" required>
                </div>
                <div class="adm-form-group">
                    <label>Calories (kcal)</label>
                    <input type="number" name="calories" class="adm-form-control" placeholder="450" value="<?php echo htmlspecialchars($edit_item['calories'] ?? ''); ?>">
                </div>
                <div style="display: flex; gap: 18px; margin-top: 10px;">
                    <label style="display: flex; align-items: center; gap: 6px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" name="is_veg" value="1" <?php echo (!isset($edit_item) || $edit_item['is_veg']) ? 'checked' : ''; ?>>
                        <span>Vegetarian</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 6px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" name="is_bestseller" value="1" <?php echo (!empty($edit_item['is_bestseller'])) ? 'checked' : ''; ?>>
                        <span>Bestseller</span>
                    </label>
                </div>
            </div>

            <button type="submit" class="adm-btn adm-btn-primary" style="margin-top: 10px;">
                <i class="fa-solid fa-save"></i> <?php echo $edit_item ? 'Update Dish Changes' : 'Publish Dish to Menu'; ?>
            </button>
        </form>
    </div>
</div>

<!-- Dishes List -->
<div class="adm-card">
    <div class="adm-card-header">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="menu.php?cat=all" class="adm-btn <?php echo $cat_filter === 'all' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                All (<?php echo count($dishes); ?>)
            </a>
            <a href="menu.php?cat=Starters" class="adm-btn <?php echo $cat_filter === 'Starters' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Starters
            </a>
            <a href="menu.php?cat=Pizza and Pasta" class="adm-btn <?php echo $cat_filter === 'Pizza and Pasta' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Pizza &amp; Pasta
            </a>
            <a href="menu.php?cat=Main Course" class="adm-btn <?php echo $cat_filter === 'Main Course' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Main Course
            </a>
            <a href="menu.php?cat=Desserts" class="adm-btn <?php echo $cat_filter === 'Desserts' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Desserts
            </a>
            <a href="menu.php?cat=Beverages" class="adm-btn <?php echo $cat_filter === 'Beverages' ? 'adm-btn-primary' : 'adm-btn-outline'; ?> adm-btn-sm">
                Beverages
            </a>
        </div>
        <div style="font-size: 12px; color: var(--adm-text-muted);">
            Changes appear instantly across Concept A, Concept B, and Concept C menus.
        </div>
    </div>

    <div class="adm-table-wrap">
        <table class="adm-table">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Dish Details</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Diet</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($dishes as $d): ?>
                    <tr>
                        <td style="width: 70px;">
                            <img src="<?php echo htmlspecialchars($d['image_url']); ?>" alt="" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                        </td>
                        <td>
                            <div style="font-weight: 700; color: var(--adm-text); font-size: 15px;"><?php echo htmlspecialchars($d['name']); ?></div>
                            <div style="font-size: 12px; color: var(--adm-text-muted); max-width: 420px; line-height: 1.4; margin-top: 2px;">
                                <?php echo htmlspecialchars($d['description']); ?>
                            </div>
                        </td>
                        <td>
                            <span style="font-size: 11px; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-weight: 600;">
                                <?php echo htmlspecialchars($d['category']); ?>
                            </span>
                        </td>
                        <td>
                            <strong style="color: var(--adm-primary); font-size: 16px;"><?php echo formatPrice($d['price']); ?></strong>
                        </td>
                        <td>
                            <?php if ($d['is_veg']): ?>
                                <span style="color: #16a34a; font-weight: 700; font-size: 11px;">🟢 VEG</span>
                            <?php else: ?>
                                <span style="color: #dc2626; font-weight: 700; font-size: 11px;">🔴 NON-VEG</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($d['is_bestseller']): ?>
                                <span style="background: #FFE4E6; color: #E11D48; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">
                                    ★ BESTSELLER
                                </span>
                            <?php else: ?>
                                <span style="color: #94a3b8; font-size: 11px;">Standard</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <div style="display: flex; gap: 6px;">
                                <a href="menu.php?edit_id=<?php echo $d['id']; ?>" class="adm-btn adm-btn-outline adm-btn-sm" title="Edit">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a>
                                <form method="POST" action="menu.php" onsubmit="return confirm('Delete dish \'<?php echo addslashes($d['name']); ?>\' from menu?');">
                                    <input type="hidden" name="dish_id" value="<?php echo $d['id']; ?>">
                                    <input type="hidden" name="delete_dish" value="1">
                                    <button type="submit" class="adm-btn adm-btn-danger adm-btn-sm" title="Delete">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
