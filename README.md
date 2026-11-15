# 🍑 PEACHY PLATE — RESTAURANT E-COMMERCE & THREE DESIGN CONCEPTS SUITE
> **"GOOD FOOD. CUTE MOODS."**  
> Complete Restaurant E-Commerce, Online Ordering System & Three Distinct Visual Concepts Presentation  
> Location: 24, Garden Avenue, New Delhi, India &bull; Phone: +91 98765 43210 (dummy) &bull; Email: hello@peachyplate.example  

---

## 🌟 Executive Overview

This project delivers **three complete, distinct, fully functional restaurant ordering websites** for **Peachy Plate**, an artisan Italian & Continental cafe in New Delhi.

All three concepts share the **exact same normalized MySQL database, business logic, and PHP 8+ backend** while presenting completely different, bespoke UI/UX designs.

### The Three Independent Concepts:
1. **🌸 Concept A — Coquette Pinterest (`/concept-a/`):** Blush pink, soft peach, cream, floral bows, Playfair serif typography, polaroid photo cards, and dreamy pastel styling.
2. **⚡ Concept B — Retro Gen-Z (`/concept-b/`):** Cherry red, butter yellow, neo-brutalist 4px hard drop shadows, playful sticker badges, and high-energy horizontal scrolling tracks.
3. **🍸 Concept C — Luxury Cute (`/concept-c/`):** Warm champagne beige, espresso brown, fine hairline borders, Cormorant Garamond typography, and quiet luxury salon dining.

---

## 🛒 Complete E-Commerce & Ordering Features

### 1. Dynamic Food Menu Connected to MySQL
- Filter by category (*Starters*, *Pizza and Pasta*, *Main Course*, *Desserts*, *Beverages*).
- Live real-time search by food dish name and ingredients.
- Dietary toggle filter (*All*, *Pure Vegetarian 🟢*, *Non-Vegetarian 🔴*).
- Price sorting (*Default*, *Price: Low to High*, *Price: High to Low*).
- Bestseller badges, calorie counts, prep time, and chef's descriptions.
- Dynamic stock availability badge (out of stock items disabled automatically).
- Wishlist heart toggle and Quick Add / Customize modal triggers.

### 2. Add to Cart & Universal Cart Drawer
- Slide-out Cart Drawer accessible instantly across all pages.
- Add items, increment/decrement quantities, remove line items, or clear cart.
- Live item counter badges synced in navigation header and drawer.
- Server-side price recalculation — client-submitted prices are never trusted.
- Free Delivery Progress Bar (*"Add ₹XX more for FREE Delivery!"*).
- Dedicated full Cart Page (`/concept-a/cart.php`, `/concept-b/cart.php`, `/concept-c/cart.php`) with special cooking instructions and order note input.
- Hash-based line item keying (`md5(item_id + customizations + special_instructions)`) ensuring different toppings or sizes on identical dishes are preserved as separate line items.

### 3. Product Customization Engine
- Category-level and item-specific customization groups (single choice radio or multi-choice checkboxes).
- Crust / Pasta choice, extra cheese/sauce, spice level, beverage size & milk choice, sweetness levels.
- Real-time price delta recalculation in customization modal before adding to cart.

### 4. Checkout & Dual Order Fulfillment
- **Home Delivery:** Full address, city, pincode, landmark, and delivery rider instructions.
- **Takeaway / Pickup:** Pre-fills store address (*24, Garden Avenue, New Delhi*), zero delivery fee.
- Customer details (name, phone, email) with guest checkout supported or auto-fill for logged-in patrons.
- CSRF security tokens and strict server-side validation.

### 5. Coupon & Discount Engine
- Server-side coupon verification with usage limits, minimum order amounts, and date expiry checks.
- Pre-seeded active coupons:
  - `PEACHY20`: 20% off up to ₹150 (Min. order ₹399)
  - `WELCOME50`: Flat ₹50 off (Min. order ₹299)
- Instant subtotal deduction and dynamic total recalculation.

### 6. Payment Architecture (Coming Soon + COD / Pickup)
- **Cash on Delivery (COD):** Active & configurable from Admin CMS.
- **Pay at Pickup:** Active & configurable from Admin CMS.
- **Online Payment Gateway (Razorpay / UPI / Cards):** Marked **"Coming Soon"** with an authentic modal interface detailing future payment options. Zero advance charges during client testing.

### 7. Order Lifecycle & Live Order Tracking
- Unique human-readable Order Number generation (`PP-YYYY-XXXXXX`).
- Database transaction handling (`PDO::beginTransaction` / `commit` / `rollBack`).
- Live tracking lookup by Order ID + Phone Number.
- Visual status timeline: **Pending &rarr; Accepted &rarr; Preparing &rarr; Ready / Out for delivery &rarr; Delivered &rarr; Cancelled**.
- Live countdown ETA and direct WhatsApp Concierge dispatch link.

### 8. Customer Accounts & Patron Sanctuary
- Registration, login, profile management, and session authentication.
- Order History portal with itemized bill breakdown and 1-click **"Reorder"** link.
- Saved address book with instant default selection.
- Personal Wishlist / Saved Favorites page.
- Community Reviews Wall with 5-star rating submission and admin moderation.

---

## 🎛️ Central Admin Dashboard (`/admin/`)

Accessible at `http://localhost:8000/admin/login.php`  
- **Username:** `admin`  
- **Password:** `admin123`  

### Admin CMS Modules:
- **Dashboard Overview (`/admin/index.php`):** Live KPI cards for Total Revenue, Total Orders, Pending Orders, Table Bookings, Registered Customers, and Recent Order Stream.
- **Order Dispatch Manager (`/admin/orders.php`):** Filter by status (*All, Pending, Accepted, Preparing, Ready, Out for delivery, Delivered, Cancelled*), live pending badge counter, instant status updater, expandable order items breakdown with customizations, and direct invoice links.
- **Printable Tax Invoice (`/admin/invoice.php?order=PP-XXXX`):** Professional thermal/A4 restaurant receipt with restaurant branding, customer details, itemized table, customizations, discounts, delivery fee, taxes, and print action.
- **Customer CRM (`/admin/customers.php`):** View registered patrons, contact info, total orders placed, aggregate spend, and saved addresses.
- **Coupon Manager (`/admin/coupons.php`):** Create new coupons (percentage or fixed discount), set minimum order amounts, expiry dates, and usage limits; toggle active/inactive status.
- **Review Moderation (`/admin/reviews.php`):** Approve, reject, or delete customer dining reviews.
- **Restaurant & E-Commerce Settings (`/admin/settings.php`):** Configure store name, phone, email, operating hours, delivery fees, free delivery threshold, minimum order amount, online ordering toggle (pause kitchen), COD toggle, and Pay at Pickup toggle.
- **Menu Items Manager (`/admin/menu.php`):** Full CRUD for dishes, categories, prices, images, and bestseller flags.
- **Table Reservations (`/admin/reservations.php`):** Manage table bookings across all three concepts.

---

## 📑 Complete Website Pages Directory (36+ Pages)

| Page Purpose | Concept A (Coquette) | Concept B (Retro Gen-Z) | Concept C (Luxury Cute) |
|---|---|---|---|
| **Home** | `concept-a/index.php` | `concept-b/index.php` | `concept-c/index.php` |
| **Menu / Live Ordering** | `concept-a/menu.php` | `concept-b/menu.php` | `concept-c/menu.php` |
| **Dedicated Cart** | `concept-a/cart.php` | `concept-b/cart.php` | `concept-c/cart.php` |
| **Checkout & Dispatch** | `concept-a/checkout.php` | `concept-b/checkout.php` | `concept-c/checkout.php` |
| **Order Confirmation** | `concept-a/order-confirmation.php` | `concept-b/order-confirmation.php` | `concept-c/order-confirmation.php` |
| **Live Order Tracking** | `concept-a/order-tracking.php` | `concept-b/order-tracking.php` | `concept-c/order-tracking.php` |
| **Customer Account / Orders** | `concept-a/account.php` | `concept-b/account.php` | `concept-c/account.php` |
| **Saved Wishlist** | `concept-a/wishlist.php` | `concept-b/wishlist.php` | `concept-c/wishlist.php` |
| **Community Reviews** | `concept-a/reviews.php` | `concept-b/reviews.php` | `concept-c/reviews.php` |
| **Table Reservations** | `concept-a/reservation.php` | `concept-b/reservation.php` | `concept-c/reservation.php` |
| **About Us** | `concept-a/about.php` | `concept-b/about.php` | `concept-c/about.php` |
| **Photo Gallery** | `concept-a/gallery.php` | `concept-b/gallery.php` | `concept-c/gallery.php` |
| **Contact** | `concept-a/contact.php` | `concept-b/contact.php` | `concept-c/contact.php` |

- **Root Presentation Showcase:** `index.html` (Presentation Hub linking all concepts and admin portal).

---

## 🔌 Unified REST APIs (`/shared/api/`)

All AJAX endpoints accept both `multipart/form-data` and `application/json`:
- `GET/POST /shared/api/cart.php?action=get|add|update_qty|remove|clear`
- `GET /shared/api/customization.php?item_id=X`
- `POST /shared/api/coupon.php?action=apply|remove`
- `POST /shared/api/wishlist.php?action=toggle|count`

---

## 🧪 Automated Regression & Integration Testing

A comprehensive integration test script is included at `test_system.php`.  
Run it anytime with:
```powershell
& "C:\xampp\php\php.exe" -f "c:\Users\Aadi\Downloads\restaurant-concepts\test_system.php"
```
It tests:
1. Cart API initialization and retrieval
2. Product customization options inspection
3. Adding items with server-side price delta calculation
4. Applying coupon codes (`PEACHY20`) with threshold validation
5. Wishlist toggle and count verification
6. CSRF extraction and order placement transaction
7. Live customer order tracking with status timeline
8. Admin login and order discovery in kitchen dispatch list
9. Updating order status to "Preparing" with live sync to customer tracking
10. Tax invoice rendering with itemized breakdown
11. HTTP 200 checks across all concept and admin pages

---

## 🚀 Running the Project Locally

The project is running on the local PHP server:
- **Showcase Hub:** [http://localhost:8000/index.html](http://localhost:8000/index.html)
- **Concept A (Coquette Pinterest):** [http://localhost:8000/concept-a/index.php](http://localhost:8000/concept-a/index.php)
- **Concept B (Retro Gen-Z):** [http://localhost:8000/concept-b/index.php](http://localhost:8000/concept-b/index.php)
- **Concept C (Luxury Cute):** [http://localhost:8000/concept-c/index.php](http://localhost:8000/concept-c/index.php)
- **Admin CMS Dashboard:** [http://localhost:8000/admin/login.php](http://localhost:8000/admin/login.php) (User: `admin` | Pass: `admin123`)

To restart the server manually:
```powershell
& "C:\xampp\php\php.exe" -S 0.0.0.0:8000 -t "c:\Users\Aadi\Downloads\restaurant-concepts"
```

---

## 🌐 cPanel Production Deployment Guide

Deploying to standard shared cPanel hosting:
1. **Create MySQL Database:** In cPanel &rarr; MySQL Databases, create a database and user with full privileges.
2. **Import Database Schema:** Open phpMyAdmin, select the database, and import `database/database.sql`.
3. **Configure Database:** In `shared/config/db.php`, update `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS`.
4. **Upload Files:** Upload the repository contents to `public_html/` (or a subdomain).
5. **Change Admin Password:** In `/admin/settings.php` or directly in phpMyAdmin, update the admin password hash.

---

## 🔒 Security Standards Implemented
- **100% Prepared PDO Statements:** Complete SQL injection immunity across all queries.
- **CSRF Protection:** Cryptographic tokens verified on all state-changing POST forms.
- **XSS Escaping:** `htmlspecialchars` on all customer inputs and dynamic renders.
- **Server-Side Price Integrity:** Cart and order totals are computed strictly from database prices, never from client requests.
- **Atomic Transactions:** Order creation uses `PDO::beginTransaction`, `commit`, and `rollBack` to prevent orphan items.
- **Session Authentication:** Role-based access control protecting all `/admin/` routes.
