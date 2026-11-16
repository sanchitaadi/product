<?php
/**
 * Migration Script: Convert Peachy Plate to Pure Packaged Food Products E-Commerce
 */
require_once __DIR__ . '/../config/db.php';

$db = getDbConnection();

echo "Starting Food Products Catalog Migration...\n";

// 1. Modify menu_items table structure
try {
    $db->exec("ALTER TABLE `menu_items` MODIFY COLUMN `category` VARCHAR(100) NOT NULL");
    echo "✓ Modified category column to VARCHAR(100)\n";
} catch (Exception $e) {
    echo "Note: " . $e->getMessage() . "\n";
}

try {
    $db->exec("ALTER TABLE `menu_items` ADD COLUMN `net_weight` VARCHAR(60) DEFAULT '250g' AFTER `image_url`");
    echo "✓ Added net_weight column\n";
} catch (Exception $e) {
    // Already exists
}

try {
    $db->exec("ALTER TABLE `menu_items` ADD COLUMN `shelf_life` VARCHAR(60) DEFAULT '9 Months' AFTER `net_weight`");
    echo "✓ Added shelf_life column\n";
} catch (Exception $e) {
    // Already exists
}

try {
    $db->exec("ALTER TABLE `menu_items` ADD COLUMN `dietary_tags` VARCHAR(255) DEFAULT '100% Organic, Vegan' AFTER `shelf_life`");
    echo "✓ Added dietary_tags column\n";
} catch (Exception $e) {
    // Already exists
}

// 2. Refresh Categories
$db->exec("DELETE FROM `categories`");
$catStmt = $db->prepare("INSERT INTO `categories` (`name`, `slug`, `description`, `display_order`) VALUES (?, ?, ?, ?)");
$catStmt->execute(['Artisan Snacks & Crisps', 'snacks-and-crisps', 'Slow-popped ancient grain crisps, roasted nuts, and savory pantry crunches', 1]);
$catStmt->execute(['Gourmet Sauces & Pantry', 'sauces-and-pantry', 'Small-batch pasta sauces, pesto jars, stone-milled risottos, and pizza kits', 2]);
$catStmt->execute(['Bean-to-Bar & Sweets', 'sweets-and-confections', 'Single-origin chocolates, Parisian macaron gift boxes, and fruit butters', 3]);
$catStmt->execute(['Craft Beverages & Tonics', 'craft-beverages', 'Cold-pressed prebiotic sodas, single-origin cold brews, and matcha tins', 4]);
echo "✓ Updated categories to 4 packaged food categories\n";

// 3. Update Settings to Food Product Brand
$db->prepare("UPDATE `settings` SET `setting_value` = 'Peachy Plate Gourmet Food Co.' WHERE `setting_key` = 'restaurant_name'")->execute();
$db->prepare("UPDATE `settings` SET `setting_value` = 'ARTISANAL PANTRY & FOOD PRODUCTS • SHIPPED NATIONWIDE' WHERE `setting_key` = 'restaurant_tagline'")->execute();

// 4. Update 20 Products
$products = [
    [
        'id' => 1,
        'name' => 'Black Summer Truffle Sorghum Crisps',
        'category' => 'Artisan Snacks & Crisps',
        'description' => 'Ultra-light, slow-popped whole grain Andean sorghum dusted with wild Italian black summer truffle essence, cracked black pepper, and grey sea salt. Non-GMO, zero palm oil.',
        'price' => 249.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'truffle-fries.webp',
        'calories' => 135,
        'preparation_time' => '150g Pouch',
        'net_weight' => '150g Pouch',
        'shelf_life' => '9 Months',
        'dietary_tags' => 'Gluten-Free, Non-GMO, Vegan, Zero Palm Oil'
    ],
    [
        'id' => 2,
        'name' => 'Signature White Peach & Blossom Jam',
        'category' => 'Bean-to-Bar & Sweets',
        'description' => 'Artisanal small-batch fruit preserves simmered with sun-ripened orchard white peaches, organic lemon blossom honey, and natural fruit pectin in copper kettles.',
        'price' => 289.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'burrata-bruschetta.webp',
        'calories' => 45,
        'preparation_time' => '250g Glass Jar',
        'net_weight' => '250g Glass Jar',
        'shelf_life' => '12 Months',
        'dietary_tags' => '100% Organic, Preservative-Free, Vegan'
    ],
    [
        'id' => 3,
        'name' => 'Sun-Dried Heirloom Tomato Tapenade',
        'category' => 'Gourmet Sauces & Pantry',
        'description' => 'Rich savory spread crafted from slow-roasted heirloom cherry tomatoes, Kalamata olives, capers, cold-pressed virgin olive oil, and fresh garden thyme.',
        'price' => 329.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'burrata-bruschetta.webp',
        'calories' => 85,
        'preparation_time' => '220g Glass Jar',
        'net_weight' => '220g Glass Jar',
        'shelf_life' => '12 Months',
        'dietary_tags' => 'Gluten-Free, Vegan, Non-GMO'
    ],
    [
        'id' => 4,
        'name' => 'Smoked Avocado & Jalapeño Tortilla Chips',
        'category' => 'Artisan Snacks & Crisps',
        'description' => 'Stone-ground organic yellow corn tortilla chips seasoned with freeze-dried Hass avocado powder, smoked red jalapeño, and hand-harvested sea salt.',
        'price' => 219.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'avocado-tartine.webp',
        'calories' => 140,
        'preparation_time' => '140g Foil Bag',
        'net_weight' => '140g Foil Bag',
        'shelf_life' => '6 Months',
        'dietary_tags' => 'Gluten-Free, 100% Corn, Vegan'
    ],
    [
        'id' => 5,
        'name' => 'Slow-Simmered Tomato Cream Rosa Sauce',
        'category' => 'Gourmet Sauces & Pantry',
        'description' => 'Our signature pasta sauce simmered for 8 hours with San Marzano tomatoes, sweet Italian basil, slow-cooked shallots, and fresh mascarpone cream.',
        'price' => 299.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'pink-sauce-pasta.webp',
        'calories' => 110,
        'preparation_time' => '380g Glass Jar',
        'net_weight' => '380g Glass Jar',
        'shelf_life' => '18 Months',
        'dietary_tags' => 'Vegetarian, Gluten-Free, No Added Sugar'
    ],
    [
        'id' => 6,
        'name' => '48-Hr Slow-Fermented Sourdough Pizza Kit',
        'category' => 'Gourmet Sauces & Pantry',
        'description' => 'Gourmet home pizza kit containing 2 par-baked slow-fermented ancient grain sourdough crusts, San Marzano marinara pouch, and Italian oregano seasoning.',
        'price' => 449.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'margherita-pizza.webp',
        'calories' => 380,
        'preparation_time' => 'Kit for 2 Pizzas',
        'net_weight' => '550g Box',
        'shelf_life' => '3 Months',
        'dietary_tags' => 'Stone-Milled, Ancient Grain, Non-GMO'
    ],
    [
        'id' => 7,
        'name' => 'White Truffle & Wild Fig Finishing Glaze',
        'category' => 'Gourmet Sauces & Pantry',
        'description' => 'Aged Modena balsamic vinegar reduction infused with caramelized Turkish mission figs, white Alba truffle extract, and raw acacia honey.',
        'price' => 399.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'wild-mushroom-pizza.webp',
        'calories' => 60,
        'preparation_time' => '250ml Bottle',
        'net_weight' => '250ml Bottle',
        'shelf_life' => '24 Months',
        'dietary_tags' => 'Vegetarian, Gluten-Free, Aged 12 Years'
    ],
    [
        'id' => 8,
        'name' => 'Stone-Ground Genovese Basil Pesto',
        'category' => 'Gourmet Sauces & Pantry',
        'description' => 'Authentic small-batch pesto stone-ground in granite mortars with fresh Genovese sweet basil, toasted Mediterranean pine nuts, aged Grana Padano, and EVOO.',
        'price' => 349.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'truffle-tagliolini.webp',
        'calories' => 165,
        'preparation_time' => '200g Glass Jar',
        'net_weight' => '200g Glass Jar',
        'shelf_life' => '12 Months',
        'dietary_tags' => 'Vegetarian, Gluten-Free, Keto-Friendly'
    ],
    [
        'id' => 9,
        'name' => 'Rosemary Herb Smoked Chicken Jerky',
        'category' => 'Artisan Snacks & Crisps',
        'description' => 'Free-range lean chicken breast strips slow-smoked over hickory wood chips, marinated in garden rosemary, garlic emulsion, and coarse sea salt. 22g protein per pack.',
        'price' => 349.00,
        'is_veg' => 0,
        'is_bestseller' => 1,
        'image_url' => 'tuscan-chicken.webp',
        'calories' => 160,
        'preparation_time' => '80g Vacuum Pack',
        'net_weight' => '80g Vacuum Pack',
        'shelf_life' => '9 Months',
        'dietary_tags' => 'High Protein, Keto, Gluten-Free'
    ],
    [
        'id' => 10,
        'name' => 'Porcini & Portobello Risotto Meal Kit',
        'category' => 'Gourmet Sauces & Pantry',
        'description' => 'Artisanal Italian Carnaroli superfino rice blended with dried forest Porcini and Portobello mushrooms, shallot broth flakes, and saffron threads.',
        'price' => 379.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'saffron-risotto.webp',
        'calories' => 240,
        'preparation_time' => '350g Box (Serves 4)',
        'net_weight' => '350g Box',
        'shelf_life' => '18 Months',
        'dietary_tags' => 'Gluten-Free, 100% Italian Rice, Vegan'
    ],
    [
        'id' => 11,
        'name' => 'Wild Smoked Salmon Jerky Crisps',
        'category' => 'Artisan Snacks & Crisps',
        'description' => 'Wild-caught Alaskan salmon cured in brown sugar and sea salt, slowly hot-smoked over applewood and sliced into crisp jerky snacking strips. High in natural Omega-3s.',
        'price' => 499.00,
        'is_veg' => 0,
        'is_bestseller' => 1,
        'image_url' => 'citrus-salmon.webp',
        'calories' => 150,
        'preparation_time' => '75g Foil Pouch',
        'net_weight' => '75g Foil Pouch',
        'shelf_life' => '9 Months',
        'dietary_tags' => 'High Omega-3, Wild-Caught, Gluten-Free'
    ],
    [
        'id' => 12,
        'name' => 'Spiced Roasted Chickpea & Seed Crunch',
        'category' => 'Artisan Snacks & Crisps',
        'description' => 'Crunchy slow-roasted organic chickpeas, sprouted pumpkin seeds, and sunflower seeds tossed in smoked paprika, cumin, and sea salt.',
        'price' => 199.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'calamari-fritti.webp',
        'calories' => 130,
        'preparation_time' => '150g Tub',
        'net_weight' => '150g Tub',
        'shelf_life' => '6 Months',
        'dietary_tags' => 'High Fiber, Vegan, Gluten-Free'
    ],
    [
        'id' => 13,
        'name' => 'Strawberry Compote & Graham Cheesecake Jar',
        'category' => 'Bean-to-Bar & Sweets',
        'description' => 'Ambient dessert spread featuring Mahabaleshwar strawberry fruit reduction swirled with creamy cultured sweet cheese and buttery crushed biscuit crust.',
        'price' => 279.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'strawberry-cheesecake.webp',
        'calories' => 210,
        'preparation_time' => '250g Glass Jar',
        'net_weight' => '250g Glass Jar',
        'shelf_life' => '9 Months',
        'dietary_tags' => 'Vegetarian, Palm-Oil Free'
    ],
    [
        'id' => 14,
        'name' => 'Belgian Cocoa & Espresso Tiramisu Butter',
        'category' => 'Bean-to-Bar & Sweets',
        'description' => 'Velvety gourmet dessert spread made with slow-roasted hazelnuts, Arabica espresso extract, Belgian dark cocoa butter, and sweet mascarpone essence.',
        'price' => 319.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'espresso-tiramisu.webp',
        'calories' => 190,
        'preparation_time' => '250g Glass Jar',
        'net_weight' => '250g Glass Jar',
        'shelf_life' => '12 Months',
        'dietary_tags' => 'Vegetarian, Zero Palm Oil'
    ],
    [
        'id' => 15,
        'name' => 'Damask Rose & Pistachio Macaron Box',
        'category' => 'Bean-to-Bar & Sweets',
        'description' => 'Collector gift box of 6 delicate French almond macarons filled with aromatic Kannauj Damask rose buttercream and roasted Iranian pistachio ganache.',
        'price' => 399.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'parisian-macarons.webp',
        'calories' => 280,
        'preparation_time' => 'Gift Box (6 Pieces)',
        'net_weight' => '130g Gift Box',
        'shelf_life' => '30 Days',
        'dietary_tags' => 'Gluten-Free, 100% Almond Flour'
    ],
    [
        'id' => 16,
        'name' => 'Caramelized Peach & Cinnamon Fruit Butter',
        'category' => 'Bean-to-Bar & Sweets',
        'description' => 'Slow-cooked Himalayan yellow peaches reduced with Ceylon cinnamon bark, Madagascar bourbon vanilla, and unrefined raw cane jaggery.',
        'price' => 269.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'strawberry-cheesecake.webp',
        'calories' => 65,
        'preparation_time' => '260g Glass Jar',
        'net_weight' => '260g Glass Jar',
        'shelf_life' => '12 Months',
        'dietary_tags' => 'Vegan, Gluten-Free, Non-GMO'
    ],
    [
        'id' => 17,
        'name' => 'Belgian Lotus Biscoff Dessert Sauce',
        'category' => 'Bean-to-Bar & Sweets',
        'description' => 'Irresistibly smooth speculoos cookie squeeze sauce crafted from authentic caramelized Belgian biscuits, brown sugar syrup, and warm cinnamon.',
        'price' => 289.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'lotus-biscoff-shake.webp',
        'calories' => 180,
        'preparation_time' => '350g Squeeze Bottle',
        'net_weight' => '350g Squeeze Bottle',
        'shelf_life' => '12 Months',
        'dietary_tags' => 'Vegetarian, Ready-to-Drizzle'
    ],
    [
        'id' => 18,
        'name' => 'Velvet Single-Origin Cold Brew Concentrate',
        'category' => 'Craft Beverages & Tonics',
        'description' => '16-hour slow cold-drip extract from shade-grown Chikmagalur Arabica beans. Notes of dark chocolate and toasted almond. Makes 6 glasses.',
        'price' => 299.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'velvet-cold-coffee.webp',
        'calories' => 15,
        'preparation_time' => '500ml Glass Bottle',
        'net_weight' => '500ml Glass Bottle',
        'shelf_life' => '6 Months',
        'dietary_tags' => 'Zero Sugar, 100% Arabica, Vegan'
    ],
    [
        'id' => 19,
        'name' => 'Prebiotic White Peach & Hibiscus Soda',
        'category' => 'Craft Beverages & Tonics',
        'description' => 'Sparkling botanical craft tonic with real white peach puree, cold-brewed Egyptian hibiscus flowers, and plant-based chicory root prebiotic fiber. 35 calories.',
        'price' => 149.00,
        'is_veg' => 1,
        'is_bestseller' => 1,
        'image_url' => 'peach-hibiscus-cooler.webp',
        'calories' => 35,
        'preparation_time' => '330ml Can',
        'net_weight' => '330ml Can',
        'shelf_life' => '12 Months',
        'dietary_tags' => 'Prebiotic, Zero Refined Sugar, Vegan'
    ],
    [
        'id' => 20,
        'name' => 'Ceremonial Uji Matcha Latte Blend',
        'category' => 'Craft Beverages & Tonics',
        'description' => 'First-harvest stone-ground ceremonial green tea from Uji, Kyoto blended with coconut milk powder and dried wild strawberry crystals in a collectible tin.',
        'price' => 449.00,
        'is_veg' => 1,
        'is_bestseller' => 0,
        'image_url' => 'matcha-cloud-latte.webp',
        'calories' => 40,
        'preparation_time' => '100g Embossed Tin',
        'net_weight' => '100g Embossed Tin',
        'shelf_life' => '12 Months',
        'dietary_tags' => '100% Japanese Matcha, Vegan, High Antioxidants'
    ]
];

$updateStmt = $db->prepare("
    INSERT INTO `menu_items` (id, name, category, description, price, is_veg, is_bestseller, image_url, calories, preparation_time, net_weight, shelf_life, dietary_tags, is_available)
    VALUES (:id, :name, :cat, :desc, :price, :is_veg, :is_best, :img, :cal, :prep, :net_weight, :shelf_life, :dietary_tags, 1)
    ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        category = VALUES(category),
        description = VALUES(description),
        price = VALUES(price),
        is_veg = VALUES(is_veg),
        is_bestseller = VALUES(is_bestseller),
        image_url = VALUES(image_url),
        calories = VALUES(calories),
        preparation_time = VALUES(preparation_time),
        net_weight = VALUES(net_weight),
        shelf_life = VALUES(shelf_life),
        dietary_tags = VALUES(dietary_tags),
        is_available = 1
");

foreach ($products as $p) {
    $updateStmt->execute([
        ':id' => $p['id'],
        ':name' => $p['name'],
        ':cat' => $p['category'],
        ':desc' => $p['description'],
        ':price' => $p['price'],
        ':is_veg' => $p['is_veg'],
        ':is_best' => $p['is_bestseller'],
        ':img' => $p['image_url'],
        ':cal' => $p['calories'],
        ':prep' => $p['preparation_time'],
        ':net_weight' => $p['net_weight'],
        ':shelf_life' => $p['shelf_life'],
        ':dietary_tags' => $p['dietary_tags']
    ]);
}

echo "✓ Successfully populated all 20 packaged food products with net weights and dietary tags!\n";
