# POSNest — Point of Sale System

[![Demo](https://img.youtube.com/vi/a30GWHVmYWs/0.jpg)](https://youtu.be/a30GWHVmYWs)

> **For recruiters:** No login required — demo mode enabled.  
> Two separate repos: [frontend (Vercel)](https://github.com/KAESZAR/deploy_nextjs_pos) · backend (NestJS / Render)

Full-stack Point of Sale application built with **Next.js 15**, **NestJS**, and **PostgreSQL**. Features product management, shopping cart, coupon discounts, daily sales tracking with calendar filtering, and Cloudinary image uploads.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **State / Data** | Zustand + TanStack React Query |
| **Validation** | Zod |
| **UI** | react-calendar, react-dropzone, react-toastify |
| **Backend** | NestJS 10 · TypeORM · PostgreSQL |
| **Image Hosting** | Cloudinary |
| **Deployment** | Vercel (frontend) · Render (backend) |

---

## Features

- 🛍️ **Product Catalog** — Browse products by category
- 🛒 **Shopping Cart** — Add / remove items, adjust quantities
- 🏷️ **Coupon System** — Apply percentage-based discounts
- 📊 **Sales Dashboard** — View daily transactions with calendar filter
- 📦 **Inventory Control** — Automatic stock update on purchase
- ☁️ **Image Upload** — Cloudinary integration for product images
- 📱 **Responsive** — Mobile-friendly layout with Tailwind

---

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Backend running locally (see [backend repo](https://github.com/KAESZAR/pos-nest-backend))

### Setup

```bash
git clone https://github.com/KAESZAR/deploy_nextjs_pos.git
cd deploy_nextjs_pos
npm install
```

Create a `.env` file in the root:

```env
API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=http://localhost:3001
```

> ⚠️ Never commit `.env` files. The values above are for local development — set your own production URLs in your hosting dashboard (Vercel / Render).

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `API_URL` | Backend server URL (server-side) | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend URL exposed to client | `http://localhost:3000` |
| `NEXT_PUBLIC_DOMAIN` | Frontend URL (self-fetch for SSR) | `http://localhost:3001` |

> ⚠️ These are local development examples. Set your own production URLs in your hosting dashboard.

---

## Project Structure

```
app/
├── (store)/          # Customer-facing store pages
├── admin/
│   ├── products/     # Product CRUD
│   ├── sales/        # Sales dashboard with calendar
│   └── layout.tsx    # Admin layout
├── coupons/          # Coupon management
├── layout.tsx        # Root layout
└── providers.tsx     # React Query provider

src/
├── api.ts            # API client functions
├── schemas.ts        # Zod validation schemas
├── store.ts          # Zustand cart store
└── utils.ts          # Formatters & helpers

components/
├── cart/             # Shopping cart UI
├── products/         # Product display & forms
├── transactions/     # Sales summary components
└── ui/               # Reusable UI components
```

---

## Deployment

### Vercel

1. Push to GitHub and import into [Vercel](https://vercel.com)
2. Set environment variables in Vercel Dashboard:
   - `API_URL` → your Render backend URL (e.g. `https://your-app.onrender.com`)
   - `NEXT_PUBLIC_API_URL` → same backend URL
   - `NEXT_PUBLIC_DOMAIN` → your Vercel domain (e.g. `https://your-app.vercel.app`)
3. Deploy

---

## License

MIT
