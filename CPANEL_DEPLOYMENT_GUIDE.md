# PEACHY PLATE 2.0 — CPANEL DEPLOYMENT & HOSTING GUIDE

**Brand:** Peachy Plate — *"GOOD FOOD. CUTE MOODS."*  
**Architecture:** Next.js Static Export + Native PHP 8+ REST API + MySQL PDO  
**Production Target:** Standard Shared cPanel Hosting (`public_html`)  
**Package:** `peachy_plate_2.0_cpanel.zip` (9.46 MB)  
**Node.js Process Required in Production:** **NONE (0% Node.js Dependency)**

---

## 1. ARCHITECTURE SUMMARY

Peachy Plate 2.0 uses a high-performance hybrid architecture specifically engineered for conventional shared cPanel hosting:

1. **Frontend:** 56 prerendered static pages generated with Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide React icons (`output: 'export'`). Served as static HTML, CSS, and JS assets by Apache web server.
2. **Backend:** Native PHP 8+ REST API layer located in `shared/api/` utilizing direct PDO prepared statements, transaction locking, and session persistence.
3. **Database:** Normalized MySQL database (`peachy_plate`) storing items, categories, options, orders, payments, coupons, reservations, customer accounts, reviews, contact messages, and site configuration.
4. **Security & URL Rewriting:** Production `.htaccess` handles clean routing, enforces trailing slashes, protects sensitive files (`db.php`, `database.sql`), and enables GZIP compression and HTTP caching.

---

## 2. PRODUCTION DIRECTORY STRUCTURE

When `peachy_plate_2.0_cpanel.zip` is extracted into `public_html/`, the folder structure is:

```
public_html/
├── .htaccess                      # Apache rewrite rules, security & gzip
├── index.html                     # Presentation Hub (Concept Showcase)
├── 404.html                       # Fallback 404 handler
├── _next/                         # Next.js static JS bundles & CSS
├── images/                        # High-resolution WebP food & interior assets
├── concept-a/                     # Concept A: Coquette Pinterest (13 pages)
│   ├── index.html
│   ├── menu/index.html
│   ├── cart/index.html
│   ├── checkout/index.html
│   ├── order-confirmation/index.html
│   ├── order-tracking/index.html
│   ├── account/index.html
│   ├── wishlist/index.html
│   ├── reviews/index.html
│   ├── reservations/index.html
│   ├── about/index.html
│   ├── gallery/index.html
│   └── contact/index.html
├── concept-b/                     # Concept B: Retro Gen-Z (13 pages)
│   └── ... (13 matching pages)
├── concept-c/                     # Concept C: Luxury Cute (13 pages)
│   └── ... (13 matching pages)
├── admin/                         # Restaurant SaaS Admin Dashboard (12 modules)
│   ├── index.html                 # Overview & Live Analytics
│   ├── login/index.html           # Admin Authentication Gate
│   ├── orders/index.html          # Order Management Drawer & Status
│   ├── menu/index.html            # Dish CRUD, 86'd stock toggle
│   ├── categories/index.html      # Category sequence & slug management
│   ├── customers/index.html       # Patron directory & spend metrics
│   ├── reservations/index.html    # Table booking approvals
│   ├── coupons/index.html         # Promo voucher builder (% / fixed)
│   ├── reviews/index.html         # Testimonial moderation queue
│   ├── gallery/index.html         # Media asset inspector
│   ├── analytics/index.html       # Concept head-to-head comparison
│   ├── settings/index.html        # Restaurant configuration & fees
│   └── profile/index.html         # Security & password update
├── shared/                        # PHP 8+ Backend & Shared Resources
│   ├── api/                       # REST API Endpoints
│   │   ├── admin.php              # SaaS metrics, orders, menu & settings
│   │   ├── auth.php               # Customer login, register & profile
│   │   ├── cart.php               # Cart state, item math & addons
│   │   ├── contact.php            # Concierge contact submissions
│   │   ├── coupon.php             # Promo code validation & discounts
│   │   ├── customization.php      # Dish options & variants
│   │   ├── menu.php               # Filterable catalog & search
│   │   ├── order.php              # Checkout order creation & tracking
│   │   ├── reservation.php        # Table booking requests
│   │   ├── reviews.php            # Patron review submission & feed
│   │   ├── settings.php           # Public restaurant configuration
│   │   ├── wishlist.php           # Customer favorites toggle
│   │   └── cors.php               # CORS & input payload parsing
│   ├── config/
│   │   └── db.php                 # MySQL PDO connection & business logic
│   └── assets/                    # Optimized WebP assets & SVGs
└── database/
    └── database.sql               # Complete MySQL schema & initial seed data
```

---

## 3. STEP-BY-STEP CPANEL DEPLOYMENT

### Step 1: Upload Archive to cPanel File Manager
1. Log in to your **cPanel Dashboard**.
2. Open **File Manager** and navigate into the `public_html/` directory (or your target addon domain / subdomain folder).
3. Click **Upload** in the top toolbar.
4. Select `peachy_plate_2.0_cpanel.zip`.
5. Once uploaded, right-click `peachy_plate_2.0_cpanel.zip` and select **Extract** to `public_html/`.
6. Ensure hidden files (`.htaccess`) are visible by clicking **Settings** (top right) -> Check **Show Hidden Files (dotfiles)** -> Click **Save**.

### Step 2: Create MySQL Database & User
1. In cPanel, click **MySQL Database Wizard**.
2. **Step 1: Create A Database:** Enter a database name (e.g., `peachy_plate` resulting in `cpaneluser_peachy_plate`).
3. **Step 2: Create Database Users:** Enter username (e.g., `peachy_admin`) and generate a strong password. Note down the password.
4. **Step 3: Add User to Database:** Check **ALL PRIVILEGES** and click **Make Changes**.

### Step 3: Import Database Schema via phpMyAdmin
1. In cPanel, open **phpMyAdmin**.
2. Select your newly created database (`cpaneluser_peachy_plate`) on the left sidebar.
3. Click the **Import** tab in the top navigation.
4. Click **Choose File** and select `database.sql` (found inside `public_html/database/database.sql` or from your local project).
5. Ensure Character set is `utf8mb4` and click **Import** (or **Go**).
6. Verify that 11 tables are populated: `admins`, `categories`, `contact_messages`, `coupons`, `customer_addresses`, `customers`, `menu_items`, `order_customizations`, `order_items`, `orders`, `payments`, `reviews`, `settings`.

### Step 4: Configure Database Credentials in `shared/config/db.php`
1. Open cPanel File Manager and browse to `public_html/shared/config/db.php`.
2. Right-click `db.php` and click **Edit**.
3. Update the database constants with your cPanel database details:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'cpaneluser_peachy_plate'); // Replace with your cPanel DB name
define('DB_USER', 'cpaneluser_peachy_admin'); // Replace with your cPanel DB user
define('DB_PASS', 'YourSecurePasswordHere');   // Replace with your DB password
define('DB_PORT', '3306');
define('DB_CHARSET', 'utf8mb4');
```

4. Click **Save Changes**.

### Step 5: Verify PHP Version
1. In cPanel, open **Select PHP Version** or **MultiPHP Manager**.
2. Ensure your domain is set to **PHP 8.1**, **PHP 8.2**, or **PHP 8.3**.
3. Ensure the following standard PHP extensions are enabled (all standard on cPanel):
   - `pdo`
   - `pdo_mysql`
   - `json`
   - `mbstring`
   - `session`
   - `curl`

---

## 4. DEFAULT CREDENTIALS

### Administrator Access
- **Admin Portal URL:** `https://yourdomain.com/admin/login/`
- **Username:** `admin`
- **Password:** `admin123`
- *Note:* Immediately update your password under **Admin > Profile & Security** after first login.

### Patron Demo Account
- **Patron Portal URL:** `https://yourdomain.com/concept-a/account/`
- **Email:** `aanya@example.com`
- **Password:** `admin123`

### Promotional Coupon
- **Code:** `PEACHY20` (20% discount on orders above ₹499, capped at ₹150)

---

## 5. CLIENT PRESENTATION ACCESS MATRIX

| Concept Persona | Aesthetic / Vibe | Main URL | Menu URL |
|---|---|---|---|
| **Presentation Hub** | All 3 Concepts + Live Admin | `https://yourdomain.com/` | N/A |
| **Concept A** | Coquette Pinterest (Blush & Peach) | `https://yourdomain.com/concept-a/` | `/concept-a/menu/` |
| **Concept B** | Retro Gen-Z (Cherry Red & Butter) | `https://yourdomain.com/concept-b/` | `/concept-b/menu/` |
| **Concept C** | Luxury Cute (Champagne & Atelier) | `https://yourdomain.com/concept-c/` | `/concept-c/menu/` |
| **SaaS Admin** | Operational Command Center | `https://yourdomain.com/admin/` | `/admin/menu/` |

---

## 6. PRODUCTION VERIFICATION & TROUBLESHOOTING

1. **White screen or 404 on deep links:** Ensure `.htaccess` was uploaded and extracted into `public_html/`. The `.htaccess` file rewrites clean URLs to their corresponding `.html` and directory endpoints.
2. **Database Connection Error:** Verify `DB_NAME`, `DB_USER`, and `DB_PASS` in `shared/config/db.php`. Ensure the user has been granted `ALL PRIVILEGES` on the database in cPanel MySQL Database Wizard.
3. **Session Loss on Add to Cart:** Ensure your browser is visiting the site via `https://` (or `http://` consistently without switching protocols). The session cookies are configured with `SameSite=Lax`.
4. **Image Display:** All 31 visual assets are served directly from `/images/` and `/shared/assets/images/` without requiring external third-party CDNs.
