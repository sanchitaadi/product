-- ========================================================
-- PEACHY PLATE RESTAURANT E-COMMERCE & ORDERING SYSTEM SCHEMA
-- Brand: Peachy Plate - "GOOD FOOD. CUTE MOODS."
-- Location: 24, Garden Avenue, New Delhi, India
-- Compatible with MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.3+
-- Conventional Shared cPanel Hosting Ready
-- ========================================================

CREATE DATABASE IF NOT EXISTS `peachy_plate` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `peachy_plate`;

-- --------------------------------------------------------
-- Table: settings (Configurable Restaurant Settings)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
    `setting_key` VARCHAR(60) PRIMARY KEY,
    `setting_value` TEXT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('restaurant_name', 'Peachy Plate'),
('restaurant_tagline', 'GOOD FOOD. CUTE MOODS.'),
('restaurant_address', '24, Garden Avenue, New Delhi, India'),
('restaurant_phone', '+91 98765 43210 (dummy)'),
('restaurant_email', 'hello@peachyplate.example'),
('restaurant_hours', '11:00 AM – 11:00 PM'),
('currency_symbol', '₹'),
('delivery_charge', '50.00'),
('free_delivery_threshold', '599.00'),
('min_order_amount', '199.00'),
('orders_enabled', '1'),
('cod_enabled', '1'),
('pay_at_pickup_enabled', '1'),
('online_payment_enabled', '0'),
('smtp_host', 'mail.peachyplate.example'),
('smtp_port', '587'),
('smtp_user', 'notifications@peachyplate.example'),
('smtp_pass', ''),
('smtp_secure', 'tls'),
('email_from_name', 'Peachy Plate Concierge');

-- --------------------------------------------------------
-- Table: admins
-- --------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(60) NOT NULL UNIQUE,
    `email` VARCHAR(120) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(100) DEFAULT 'Restaurant Manager',
    `role` VARCHAR(30) DEFAULT 'superadmin',
    `last_login` DATETIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admins` (`username`, `email`, `password_hash`, `full_name`, `role`) VALUES
('admin', 'admin@peachyplate.example', '$2y$10$gDHjwL2cxvZ66wnVTzEU7edDLbYfkemPJ8i.1tGC.5B2ZJsAvaXCa', 'Peachy Plate Admin', 'superadmin');

-- --------------------------------------------------------
-- Table: customers
-- --------------------------------------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `phone` VARCHAR(25) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_email (`email`),
    INDEX idx_customer_phone (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `customers` (`full_name`, `email`, `phone`, `password_hash`) VALUES
('Aanya Sharma', 'aanya@example.com', '+91 98112 34567', '$2y$10$gDHjwL2cxvZ66wnVTzEU7edDLbYfkemPJ8i.1tGC.5B2ZJsAvaXCa');

-- --------------------------------------------------------
-- Table: customer_addresses
-- --------------------------------------------------------
DROP TABLE IF EXISTS `customer_addresses`;
CREATE TABLE `customer_addresses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `title` VARCHAR(50) DEFAULT 'Home',
    `address_line` TEXT NOT NULL,
    `city` VARCHAR(80) DEFAULT 'New Delhi',
    `pincode` VARCHAR(20) NOT NULL,
    `landmark` VARCHAR(120) NULL,
    `is_default` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `customer_addresses` (`customer_id`, `title`, `address_line`, `city`, `pincode`, `landmark`) VALUES
(1, 'Apartment', 'Tower B, Flat 402, Garden Residences', 'New Delhi', '110003', 'Near Lodhi Gardens');

-- --------------------------------------------------------
-- Table: categories
-- --------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `display_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`name`, `slug`, `description`, `display_order`) VALUES
('Starters', 'starters', 'Crisp bites, hand-cut fries, salads and artisan bruschettas', 1),
('Pizza and Pasta', 'pizza-and-pasta', '48hr fermented sourdough pizzas and bronze-die handcrafted pastas', 2),
('Main Course', 'main-course', 'Flame-grilled steaks, simmered risottos and continental platters', 3),
('Desserts', 'desserts', 'New York cheesecakes, tiramisu and Parisian macarons', 4),
('Beverages', 'beverages', 'Velvet cold brews, thick dessert shakes and botanical coolers', 5);

-- --------------------------------------------------------
-- Table: menu_items (Food Products)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE `menu_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category` ENUM('Starters', 'Main Course', 'Pizza and Pasta', 'Desserts', 'Beverages') NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `is_veg` TINYINT(1) DEFAULT 1,
    `is_bestseller` TINYINT(1) DEFAULT 0,
    `image_url` VARCHAR(500) NOT NULL,
    `calories` INT NULL,
    `preparation_time` VARCHAR(30) DEFAULT '15-20 mins',
    `is_available` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (`category`),
    INDEX idx_bestseller (`is_bestseller`),
    INDEX idx_available (`is_available`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_items` (`id`, `name`, `description`, `price`, `category`, `is_veg`, `is_bestseller`, `image_url`, `calories`, `preparation_time`) VALUES
-- Starters
(1, 'Truffle Fries', 'Crispy hand-cut golden Russet potatoes tossed in aromatic black truffle oil, Maldon sea salt & aged parmesan shavings, served with garlic herb aioli.', 199.00, 'Starters', 1, 1, 'truffle-fries.webp', 380, '12-15 mins'),
(2, 'Peach & Whipped Ricotta Bruschetta', 'Toasted artisan sourdough crostini layered with lemon-zested whipped ricotta, caramelized seasonal peaches, raw mountain honey & fresh mint microgreens.', 249.00, 'Starters', 1, 1, 'burrata-bruschetta.webp', 290, '10-12 mins'),
(3, 'Burrata & Heirloom Peach Salad', 'Creamy Pugliese burrata ball paired with charred peaches, heirloom cherry tomatoes, roasted pine nuts, and aged balsamic glaze.', 349.00, 'Starters', 1, 0, 'burrata-bruschetta.webp', 340, '10 mins'),
(4, 'Crispy Panko Avocado Bites', 'Golden crisp Hass avocado wedges dusted with smoked paprika and togarashi salt, accompanied by spicy sriracha cilantro dip.', 269.00, 'Starters', 1, 0, 'avocado-tartine.webp', 310, '12-15 mins'),

-- Pizza and Pasta
(5, 'Pink Sauce Pasta', 'Signature penne rigate enrobed in our velvety signature tomato cream rosa sauce, sun-dried cherry tomatoes, fresh sweet basil & dollop of mascarpone.', 299.00, 'Pizza and Pasta', 1, 1, 'pink-sauce-pasta.webp', 520, '15-18 mins'),
(6, 'Classic Neapolitan Margherita', 'Slow-fermented 48-hour sourdough base, San Marzano tomato reduction, fior di latte mozzarella, fragrant sweet basil & cold-pressed EVOO.', 349.00, 'Pizza and Pasta', 1, 1, 'margherita-pizza.webp', 680, '18-20 mins'),
(7, 'Quattro Formaggi & Fig Bianca', 'Artisan white pizza glazed with mozzarella, creamy gorgonzola, smoked provolone, fontina, caramelized Turkish figs & hot honey drizzle.', 419.00, 'Pizza and Pasta', 1, 0, 'wild-mushroom-pizza.webp', 740, '18-22 mins'),
(8, 'Pesto Genovese Penne', 'Bronze-cut rigatoni tossed in stone-ground Genovese basil pesto, roasted pine nuts, slow-roasted baby tomatoes, and grana padano flakes.', 329.00, 'Pizza and Pasta', 1, 0, 'truffle-tagliolini.webp', 490, '15-18 mins'),

-- Main Course
(9, 'Grilled Herb Chicken Steak', 'Tender free-range chicken breast marinated in garden rosemary & thyme, flame-grilled and served over potato mousseline with glazed baby carrots & pepper jus.', 449.00, 'Main Course', 0, 1, 'tuscan-chicken.webp', 580, '20-25 mins'),
(10, 'Wild Forest Mushroom Risotto', 'Slow-simmered Carnaroli rice with Porcini and Portobello mushrooms, shallot butter, dry white wine reduction, finished with truffle emulsion.', 389.00, 'Main Course', 1, 0, 'saffron-risotto.webp', 460, '18-22 mins'),
(11, 'Pan-Seared Norwegian Salmon', 'Crispy skin salmon fillet atop sautéed French beans, roasted baby potatoes, and a luscious pink peppercorn citrus beurre blanc.', 699.00, 'Main Course', 0, 1, 'citrus-salmon.webp', 520, '20-25 mins'),
(12, 'Roasted Mediterranean Veggie Bowl', 'Charred courgettes, bell peppers, Kalamata olives, warm organic quinoa, spiced chickpea falafel, and beetroot tahini dressing.', 359.00, 'Main Course', 1, 0, 'calamari-fritti.webp', 410, '15-18 mins'),

-- Desserts
(13, 'Strawberry Chantilly Cheesecake', 'Silky New York style baked cheesecake on buttery graham crust, topped with fresh Mahabaleshwar strawberry compote & vanilla chantilly.', 249.00, 'Desserts', 1, 1, 'strawberry-cheesecake.webp', 410, 'Instant'),
(14, 'Tiramisu Paradiso', 'Delicate Savoiardi sponge biscuits steeped in freshly brewed espresso and amaretto essence, layered with whipped mascarpone sabayon and Belgian cocoa.', 289.00, 'Desserts', 1, 1, 'espresso-tiramisu.webp', 440, 'Instant'),
(15, 'Rose Pistachio Parisian Macarons', 'A delicate trio of crisp French almond shells filled with fragrant Damask rose buttercream and roasted Iranian pistachio ganache.', 199.00, 'Desserts', 1, 0, 'parisian-macarons.webp', 280, 'Instant'),
(16, 'Warm Peach & Cinnamon Tart', 'Flaky puff pastry tart stuffed with caramelized peaches, almond frangipane, served with artisanal Madagascar vanilla bean gelato.', 259.00, 'Desserts', 1, 0, 'strawberry-cheesecake.webp', 360, '10-12 mins'),

-- Beverages
(17, 'Lotus Biscoff Thick Shake', 'Creamy ice cream blended with authentic Belgian Biscoff spread, crushed spiced cookies, topped with whipped cream and caramel ribbon.', 229.00, 'Beverages', 1, 1, 'lotus-biscoff-shake.webp', 420, '8 mins'),
(18, 'Classic Velvet Cold Coffee', 'Slow-brewed Arabica single-origin espresso shaken over ice with condensed milk, whole milk, and crowned with silky coffee crema.', 179.00, 'Beverages', 1, 1, 'velvet-cold-coffee.webp', 210, '5 mins'),
(19, 'Sparkling Peach Hibiscus Cooler', 'Cold-brewed organic Egyptian hibiscus tea infused with white peach purée, fresh mint leaves, sparkling spring water and lemon wheel.', 189.00, 'Beverages', 1, 1, 'peach-hibiscus-cooler.webp', 110, '5 mins'),
(20, 'Matcha Blossom Cloud Latte', 'Ceremonial grade Uji matcha whisked with oat milk, layered over delicate wild strawberry syrup, served iced with dried rose petals.', 219.00, 'Beverages', 1, 0, 'matcha-cloud-latte.webp', 160, '6 mins');

-- --------------------------------------------------------
-- Table: customization_groups
-- --------------------------------------------------------
DROP TABLE IF EXISTS `customization_groups`;
CREATE TABLE `customization_groups` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `item_id` INT NULL, -- NULL applies to category or specific item
    `category` VARCHAR(50) NULL,
    `title` VARCHAR(100) NOT NULL,
    `type` ENUM('single', 'multiple') DEFAULT 'single',
    `is_required` TINYINT(1) DEFAULT 0,
    `min_select` INT DEFAULT 0,
    `max_select` INT DEFAULT 1,
    INDEX idx_item_id (`item_id`),
    INDEX idx_category (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `customization_groups` (`id`, `item_id`, `category`, `title`, `type`, `is_required`, `min_select`, `max_select`) VALUES
(1, NULL, 'Pizza and Pasta', 'Crust / Pasta Choice', 'single', 1, 1, 1),
(2, NULL, 'Pizza and Pasta', 'Extra Indulgences', 'multiple', 0, 0, 3),
(3, NULL, 'Pizza and Pasta', 'Spice Level', 'single', 0, 0, 1),
(4, NULL, 'Beverages', 'Size & Milk Choice', 'single', 1, 1, 1),
(5, NULL, 'Beverages', 'Sweetness Level', 'single', 0, 0, 1),
(6, NULL, 'Desserts', 'Plating Add-ons', 'multiple', 0, 0, 2);

-- --------------------------------------------------------
-- Table: customization_options
-- --------------------------------------------------------
DROP TABLE IF EXISTS `customization_options`;
CREATE TABLE `customization_options` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `group_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price_delta` DECIMAL(10,2) DEFAULT 0.00,
    `is_default` TINYINT(1) DEFAULT 0,
    `is_available` TINYINT(1) DEFAULT 1,
    FOREIGN KEY (`group_id`) REFERENCES `customization_groups`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `customization_options` (`group_id`, `name`, `price_delta`, `is_default`) VALUES
-- Group 1: Crust / Pasta Choice
(1, 'Regular Artisan Dough / Penne Rigate', 0.00, 1),
(1, 'Gluten-Friendly Multigrain (+₹50)', 50.00, 0),
(1, 'Hand-rolled Fresh Fettuccine (+₹40)', 40.00, 0),

-- Group 2: Extra Indulgences
(2, 'Fresh Buffalo Burrata Dollop (+₹90)', 90.00, 0),
(2, 'Extra San Marzano Sauce (+₹40)', 40.00, 0),
(2, 'Shaved Black Truffle Snow (+₹120)', 120.00, 0),

-- Group 3: Spice Level
(3, 'Mild & Creamy (Standard)', 0.00, 1),
(3, 'Medium Arrabbiata Warmth', 0.00, 0),
(3, 'Hot Peperoncino Kick 🔥', 0.00, 0),

-- Group 4: Beverage Size & Milk
(4, 'Regular (350ml) / Whole Milk', 0.00, 1),
(4, 'Large Cloud (500ml) (+₹40)', 40.00, 0),
(4, 'Oat Milk Replacement (+₹45)', 45.00, 0),
(4, 'Almond Milk Replacement (+₹45)', 45.00, 0),

-- Group 5: Sweetness
(5, 'Standard Sweetness', 0.00, 1),
(5, 'Less Sweet (50%)', 0.00, 0),
(5, 'Zero Added Sugar', 0.00, 0),

-- Group 6: Desserts Add-ons
(6, 'Madagascar Vanilla Bean Gelato Scoop (+₹70)', 70.00, 0),
(6, 'Warm Belgian Chocolate Ganache (+₹50)', 50.00, 0);

-- --------------------------------------------------------
-- Table: coupons
-- --------------------------------------------------------
DROP TABLE IF EXISTS `coupons`;
CREATE TABLE `coupons` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `description` VARCHAR(255) NULL,
    `discount_type` ENUM('percentage', 'fixed') DEFAULT 'percentage',
    `discount_value` DECIMAL(10,2) NOT NULL,
    `min_order_amount` DECIMAL(10,2) DEFAULT 0.00,
    `max_discount` DECIMAL(10,2) NULL,
    `usage_limit` INT DEFAULT 1000,
    `usage_count` INT DEFAULT 0,
    `valid_from` DATE NOT NULL,
    `valid_to` DATE NOT NULL,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `coupons` (`code`, `description`, `discount_type`, `discount_value`, `min_order_amount`, `max_discount`, `valid_from`, `valid_to`) VALUES
('PEACHY20', 'Get 20% off on all orders above ₹499 (Max ₹150)', 'percentage', 20.00, 499.00, 150.00, CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 60 DAY)),
('FLAVOR100', 'Flat ₹100 off on feasts above ₹799', 'fixed', 100.00, 799.00, 100.00, CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 60 DAY)),
('WELCOME10', '10% instant discount for new patrons', 'percentage', 10.00, 299.00, 80.00, CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 90 DAY));

-- --------------------------------------------------------
-- Table: orders
-- --------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_number` VARCHAR(32) NOT NULL UNIQUE,
    `customer_id` INT NULL,
    `customer_name` VARCHAR(120) NOT NULL,
    `customer_email` VARCHAR(150) NOT NULL,
    `customer_phone` VARCHAR(25) NOT NULL,
    `order_type` ENUM('delivery', 'takeaway') DEFAULT 'delivery',
    `delivery_address` TEXT NULL,
    `city` VARCHAR(80) DEFAULT 'New Delhi',
    `pincode` VARCHAR(20) NULL,
    `landmark` VARCHAR(120) NULL,
    `special_instructions` TEXT NULL,
    `subtotal` DECIMAL(10,2) NOT NULL,
    `delivery_fee` DECIMAL(10,2) DEFAULT 0.00,
    `discount_amount` DECIMAL(10,2) DEFAULT 0.00,
    `coupon_code` VARCHAR(50) NULL,
    `final_total` DECIMAL(10,2) NOT NULL,
    `order_status` ENUM('Pending', 'Accepted', 'Preparing', 'Ready for pickup', 'Out for delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    `concept_source` VARCHAR(50) DEFAULT 'Concept A - Coquette',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_number (`order_number`),
    INDEX idx_customer_phone (`customer_phone`),
    INDEX idx_status (`order_status`),
    INDEX idx_created_at (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: order_items
-- --------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `item_id` INT NOT NULL,
    `item_name` VARCHAR(150) NOT NULL,
    `unit_price` DECIMAL(10,2) NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `total_price` DECIMAL(10,2) NOT NULL,
    `customizations_summary` TEXT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: order_item_customizations
-- --------------------------------------------------------
DROP TABLE IF EXISTS `order_item_customizations`;
CREATE TABLE `order_item_customizations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_item_id` INT NOT NULL,
    `group_title` VARCHAR(100) NOT NULL,
    `option_name` VARCHAR(100) NOT NULL,
    `price_delta` DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (`order_item_id`) REFERENCES `order_items`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: payments
-- --------------------------------------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL UNIQUE,
    `payment_method` ENUM('cod', 'pay_at_pickup', 'online_coming_soon') NOT NULL,
    `payment_status` ENUM('unpaid', 'paid', 'pending', 'refunded') DEFAULT 'unpaid',
    `amount` DECIMAL(10,2) NOT NULL,
    `transaction_reference` VARCHAR(100) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: coupon_usage
-- --------------------------------------------------------
DROP TABLE IF EXISTS `coupon_usage`;
CREATE TABLE `coupon_usage` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `coupon_id` INT NOT NULL,
    `order_id` INT NOT NULL,
    `customer_email` VARCHAR(150) NOT NULL,
    `used_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: reservations
-- --------------------------------------------------------
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL,
    `phone` VARCHAR(25) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `reservation_date` DATE NOT NULL,
    `reservation_time` VARCHAR(20) NOT NULL,
    `guests` INT NOT NULL,
    `seating_area` VARCHAR(50) DEFAULT 'Indoor Dining',
    `special_requests` TEXT NULL,
    `concept_source` VARCHAR(50) DEFAULT 'Concept A - Coquette',
    `status` ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (`reservation_date`),
    INDEX idx_status (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: reviews
-- --------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NULL,
    `customer_name` VARCHAR(120) NOT NULL,
    `customer_email` VARCHAR(150) NULL,
    `rating` TINYINT NOT NULL DEFAULT 5,
    `dish_recommended` VARCHAR(150) NULL,
    `review_text` TEXT NOT NULL,
    `concept_source` VARCHAR(50) DEFAULT 'Direct Website',
    `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample authentic reviews
INSERT INTO `reviews` (`customer_name`, `rating`, `dish_recommended`, `review_text`, `concept_source`, `status`) VALUES
('Simran Malhotra', 5, 'Pink Sauce Pasta', 'The pink sauce pasta was velvety and rich with fresh basil notes. Delivered in 30 minutes hot and fresh in beautiful pastel packaging!', 'Concept A - Coquette', 'approved'),
('Kabir Sen', 5, 'Lotus Biscoff Shake', 'Biscoff shake is completely insane! Heavy cookie crumble on top. Neapolitan pizza crust had that authentic blister crunch.', 'Concept B - Retro Gen-Z', 'approved'),
('Devina Roy', 5, 'Strawberry Chantilly Cheesecake', 'A pristine dining experience. The cheesecake was light as a cloud with real mountain strawberries. Truly a boutique culinary treasure in Delhi.', 'Concept C - Luxury Cute', 'approved'),
('Aditya Nair', 5, 'Truffle Fries & Salmon', 'Crispiest truffle fries in South Delhi. Ordered delivery for an anniversary dinner and everything arrived pristine.', 'Concept A - Coquette', 'approved');

-- --------------------------------------------------------
-- Table: wishlist
-- --------------------------------------------------------
DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE `wishlist` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `item_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_customer_item (`customer_id`, `item_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`item_id`) REFERENCES `menu_items`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `wishlist` (`customer_id`, `item_id`) VALUES (1, 5), (1, 13);

-- --------------------------------------------------------
-- Table: contact_messages
-- --------------------------------------------------------
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(25) NULL,
    `subject` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `concept_source` VARCHAR(50) DEFAULT 'Direct Website',
    `status` ENUM('New', 'Read', 'Replied') DEFAULT 'New',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Seed Sample Order for Demonstration
-- --------------------------------------------------------
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `order_type`, `delivery_address`, `city`, `pincode`, `landmark`, `subtotal`, `delivery_fee`, `discount_amount`, `coupon_code`, `final_total`, `order_status`, `concept_source`) VALUES
(1, 'PP-2026-8492', 1, 'Aanya Sharma', 'aanya@example.com', '+91 98112 34567', 'delivery', 'Tower B, Flat 402, Garden Residences', 'New Delhi', '110003', 'Near Lodhi Gardens', 548.00, 0.00, 109.60, 'PEACHY20', 438.40, 'Preparing', 'Concept A - Coquette');

INSERT INTO `order_items` (`id`, `order_id`, `item_id`, `item_name`, `unit_price`, `quantity`, `total_price`, `customizations_summary`) VALUES
(1, 1, 5, 'Pink Sauce Pasta', 299.00, 1, 299.00, 'Regular Artisan Dough; Mild & Creamy'),
(2, 1, 13, 'Strawberry Chantilly Cheesecake', 249.00, 1, 249.00, 'Standard');

INSERT INTO `payments` (`order_id`, `payment_method`, `payment_status`, `amount`) VALUES
(1, 'cod', 'unpaid', 438.40);

INSERT INTO `coupon_usage` (`coupon_id`, `order_id`, `customer_email`) VALUES
(1, 1, 'aanya@example.com');
