# 🍑 Peachy Plate — Packaged Food & D2C Brand Ecosystem
> **Next.js 16 (App Router) + React 19 + Tailwind CSS + Framer Motion**  
> Running on **`http://localhost:3001/`**  
> Repository: [https://github.com/sanchitaadi/product](https://github.com/sanchitaadi/product)

An enterprise-grade, multi-concept Direct-to-Consumer (D2C) packaged food product e-commerce ecosystem. Features **four complete, distinctly branded packaged food concepts** sharing unified product attributes (net weight, shelf life, nitrogen seals, dietary badges, wholesale/corporate gifting portals, and multi-pack variant selectors).

---

## 🏷️ The 4 Live Packaged Food Concepts

| Sample | Concept | Aesthetic & Palette | Flagship Packaged Products | Route |
| :--- | :--- | :--- | :--- | :--- |
| **Sample 01** | **Maison Reserve** | **Haute Cacao & Luxury Reserve Pantry**<br>Obsidian Noir (`#0A0B0E`), Slate, Warm Alabaster & Burnished Gold (`#C5A059`) | Single-Estate 85% Cacao Slabs, Wild Reserve Honeycombs, 24K Gold-Dusted Sablés, Cold-Drip Vanilla Bean Elixirs | `/concept-a/` |
| **Sample 02** | **Crunch Craft** | **Retro Gen-Z Functional Snacking**<br>Electric Cyan, Tangerine Orange, Butter Yellow, Neo-Brutalist Badges | Nitrogen-Flushed Sorghum Crisps, Air-Popped Chickpea Puffs, Sparkling Prebiotic Botanical Sodas | `/concept-b/` |
| **Sample 03** | **Flavourverse** | **Maximalist Pop-Art D2C Flavor Lab**<br>Acid Yellow, Electric Cyan, Hot Magenta, Halftone Dot Patterns | Habanero Hot Honey Squeeze Bottles, Sichuan Chili Crunch Jars, Sweet Umami Crunch Toppers | `/concept-c/` |
| **Sample 04** | **Pure Harvest Provisions** | **Regenerative Farmland Pantry**<br>Earthy Organic Sage, Forest Green, Warm Ochre & Raw Kraft Paper | Wood-Pressed Mustard & Olive Oils, Stone-Ground Almond Butters, Heirloom Millet Flours | `/concept-d/` |

---

## 📦 Key Packaged Food Features

* **Packaged Product Badging:** Net weight (g/ml), shelf life (months), dietary attributes (100% Vegan, Non-GMO, Gluten-Free), FSSAI certification, and nitrogen-sealed preservation badges on every product card.
* **Multi-Pack Variant Selectors:** Trial Pack (1x), Pantry 3-Pack Bundle (10% off), and Master Gifting Case (6x with custom wooden box).
* **Corporate & B2B Wholesale Portal:** Dedicated wholesale inquiry forms across all 4 concepts for bulk ordering, corporate gifting, custom labeling, and stockist distribution.
* **Cinematic Lightbox & Packaging Inspection:** High-resolution packaging zoom and product nutrition inspection modals.
* **Universal Cart Drawer & Checkout:** Real-time subtotal calculation, coupon discounts, free dispatch threshold progress bars, and dual fulfillment (Direct Dispatch vs Warehouse Pickup).
* **108 Pre-rendered Next.js Static Routes:** Fully exportable static HTML/CSS/JS with zero build warnings.

---

## 🚀 Quick Start (Port 3001)

### Option A: From Repository Root
```bash
npm install
npm run dev # Launches the Next.js app on http://localhost:3001
```

### Option B: From the `frontend` Directory
```bash
cd frontend
npm install
npm run dev # Launches the Next.js app on http://localhost:3001
```

Open **[http://localhost:3001](http://localhost:3001)** in your browser to view the application.

### Production Build / Static Export
```bash
npm run build
```
Generates an optimized static production export in `frontend/out/`.

---

## 🧭 Route Map

* **Main Hub:** `/`
* **Sample 01 (Maison Reserve):** `/concept-a/`
  * Shop/Menu: `/concept-a/menu/`
  * Packaging Atelier / About: `/concept-a/about/`
  * Packaging Vault Gallery: `/concept-a/gallery/`
  * Luxury Corporate Gifting: `/concept-a/reservations/`
  * Dispatch Desk: `/concept-a/contact/`
  * Cart & Checkout: `/concept-a/cart/`, `/concept-a/checkout/`
* **Sample 02 (Crunch Craft):** `/concept-b/` (and subpages)
* **Sample 03 (Flavourverse):** `/concept-c/` (and subpages)
* **Sample 04 (Pure Harvest Provisions):** `/concept-d/` (and subpages)

---

## 🛠️ Architecture

* **Framework:** Next.js 16 (App Router)
* **React Version:** React 19
* **Styling:** Tailwind CSS v4 + Framer Motion
* **Port:** 3001
* **Backend API (Optional):** PHP 8+ / SQLite located in `shared/api/` (runs on `http://localhost:8000`)
