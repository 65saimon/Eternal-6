# Eternal 6 — Timeless Elegance
### Premium Modest Fashion & Hand Art Boutique (Chattogram, Bangladesh)

An artisanal, production-ready full-stack luxury e-commerce and booking platform for **Eternal 6** (`fb.com/eternalsix6`), a boutique modest fashion house and hand-art studio based in **Chittagong (Chattogram), Bangladesh**.

Built with a bespoke luxury aesthetic (Ivory `#FFF9F2`, Champagne Gold `#D6B878`, Deep Espresso `#342722`, custom 6-petal *moti* pearl emblem), zero-dependency local SQLite database (production-ready for Postgres), server-side price revalidation, Cash on Delivery + bKash/Nagad flows, automated delivery tier computation, mehendi booking desk, and an executive admin control plane.

---

## 💎 Brand Identity & Visual Assets

- **Brand:** Eternal 6 - Timeless Elegance
- **Tagline:** *Timeless Elegance* (and *"Grace in Every Drape"*)
- **Location:** Chittagong, Bangladesh
- **Official Channels:**
  - Facebook: [Eternal 6 - Timeless Elegance](https://www.facebook.com/eternalsix6)
  - Instagram: [@eternal6six](https://www.instagram.com/eternal6six)
  - WhatsApp: `+880 1606-266496`
  - Email: `eternal6six@gmail.com`
- **Official Logo Asset:**
  - Official embossed metallic gold 6-petal flower emblem on textured charcoal slate (`public/images/logo/eternal6-logo.png`).
- **Asset Provenance:**
  - 27 original promotional posters and photos extracted directly from the official Facebook archive into `public/images/eternal6/`.
  - 21 high-resolution focal crops created via PowerShell script in `public/images/eternal6/crops/` for hero showcases, catalog tiles, and zoom galleries.
  - Complete asset mapping and price audit documented in `docs/asset_inventory.md`.

---

## 🛠 Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS custom luxury tokens & shimmer animations (`src/app/globals.css`)
- **Typography:** *Cormorant Garamond* (editorial serif headings) + *Montserrat* (refined modern sans body)
- **Database & ORM:** Prisma ORM v6.4 with zero-dependency SQLite database (`prisma/dev.db`), easily swappable to PostgreSQL/Supabase by changing `provider` in `prisma/schema.prisma`
- **State Management:** React Context (`CartContext` and `WishlistContext`) with local storage persistence
- **Security:**
  - Unguessable order numbers (`ET6-2026-XXXX`)
  - Unguessable mehendi booking references (`BK6-XXXX`)
  - Server-side inventory & price revalidation (cart tampering impossible)
  - Customer phone masking on public order confirmations
  - Two-factor verification for order tracking (Order Number + Bangladeshi Phone Number required)
  - Protected admin API routes (`Authorization: Bearer <key>` or cookie)

---

## 📦 Key Functional Workflows

### 1. Customer Storefront & Catalog
- **Homepage (`/`)**: Hero banner with authentic photography, Curated Collections carousel, Pearl Edit luxury mosaic, bestseller grid, mehendi & hand-art preview, brand heritage story, and verified Facebook customer reviews.
- **Shop Catalog (`/shop`)**: Instant search, fabric filter (Georgette, Muna Jori, Zafran, Cotton, Embroidered Linen), collection filter, price range slider, wishlist toggling, and quick-view modal.
- **Collection Pages (`/collections/[slug]`)**: Editorial landings for *The Bridal Edit*, *Everyday Grace*, *Handcrafted Art*, and *Festive Radiance*.
- **Product Detail (`/products/[slug]`)**: Multi-angle image zoom gallery, color/size variant selector, dynamic stock status badge, "Add to Bag", instant "Buy Now", direct WhatsApp pre-filled order inquiry, and collapsible delivery/care accordions.

### 2. Shopping Bag & Checkout
- **Cart (`/cart`)**: Real-time quantity adjustment, Chittagong (৳70) vs Outside Chittagong (৳130) delivery calculator, and free delivery threshold tracker (free for orders above ৳2,500).
- **Checkout (`/checkout`)**: Delivery address form with Bangladeshi district selection, delivery notes, and payment options:
  - **Cash on Delivery (COD)**
  - **bKash Personal / Merchant Send Money** (with instruction box and TrxID entry)
  - **Nagad Send Money** (with instruction box and TrxID entry)
- **Order Confirmation (`/order-confirmation/[id]`)**: Masked customer receipt with printable invoice format and instant WhatsApp follow-up button.
- **Live Order Tracking (`/track-order`)**: Stepper timeline (`confirmed` → `processing` → `shipped` → `delivered`) requiring both Order Number and Customer Phone Number.

### 3. Mehendi & Hand-Art Studio
- **Hand Art Hub (`/hand-art`)**: Bridal Mehendi, Non-Bridal Party Art, Sacred Islamic Canvas Calligraphy, and Custom Veil Embroidery showcase with verified price tiers.
- **Booking Desk (`/hand-art/book`)**: Dedicated booking form collecting event date, time, location, and design preference, generating reference code (`BK6-XXXX`).

### 4. Executive Admin Control Plane (`/admin`)
- **Login (`/admin/login`)**: Authenticated with secret admin key (`eternal6_luxury_admin_2026`).
- **Dashboard Overview**: Metrics on orders today, pending confirmations, total paid revenue, outstanding COD receivables, and low-stock warnings.
- **Order Management**: Search, filter by status or payment method, update order status, mark paid, print packing slips.
- **Manual Social Order Entry**: Ability to log orders received through **Facebook Messenger** or **WhatsApp**, maintaining unified inventory and accounting.
- **Catalog Management**: Add/edit products, adjust stock, toggle "Pearl Edit" featured badge.
- **Booking Requests**: Review and manage bridal and party mehendi appointments.
- **Store Settings**: Live configuration of delivery charges, WhatsApp support number, and announcement banner text.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 20+)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
The repository comes pre-configured with a populated SQLite database (`prisma/dev.db`). If you wish to re-seed or reset the database:
```bash
# Push schema changes
npx prisma db push

# Seed 23 authentic products, 6 hand-art packages, real reviews, and store settings
node prisma/seed.mjs
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔐 Credentials & Environment Variables

| Variable | Default Value | Description |
|---|---|---|
| `DATABASE_URL` | `"file:./dev.db"` | Path to SQLite database file |
| `ADMIN_KEY` | `"eternal6_luxury_admin_2026"` | Passphrase for `/admin` login and API authentication |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `"8801606266496"` | Official WhatsApp sales number for floating button & direct inquiry |

---

## 📄 Legal & Compliance Pages
- **Shipping Policy:** `/policies/shipping` (Chittagong ৳70 within 24–48 hrs; Nationwide ৳130 via Steadfast/Pathao within 3–5 days; Free over ৳2,500)
- **Returns & Exchanges:** `/policies/returns` (7-day replacement for manufacturing defects, parcel opening video verification)
- **Privacy Policy:** `/policies/privacy` (Strict data privacy, phone masking, zero third-party data sales)
- **Terms of Service:** `/policies/terms` (Governed by laws of the People's Republic of Bangladesh)

---

© 2026 Eternal 6. All Rights Reserved. Timeless Elegance • Chattogram, Bangladesh.
