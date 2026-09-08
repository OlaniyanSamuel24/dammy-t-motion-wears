# Dammy T & Motion Wears Marketplace

Production-oriented Next.js marketplace for contemporary African fashion. The storefront includes responsive product browsing, search/category filtering, product detail, wishlist, cart, authenticated checkout, Nigerian delivery zones, Prisma models, Cloudinary product uploads, and server-verified Paystack payments.

## Local setup

1. Install Node.js 20+ and PostgreSQL 14+.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, `AUTH_SECRET`, Paystack, and Cloudinary credentials.
3. Install and generate Prisma client:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Architecture

- `app/`: Next.js App Router pages and API routes
- `lib/products.ts`: demo catalog used for the fast storefront experience
- `lib/store.ts`: client cart and wishlist state with Zustand
- `prisma/schema.prisma`: PostgreSQL domain model for customers, sellers, products, orders, reviews, coupons, and notifications
- `/api/products`: active catalog filtering endpoint
- `/api/orders`: Zod-validated order creation endpoint
- `/api/payments/initialize`: authenticated Paystack transaction initialization in NGN kobo
- `/api/payments/verify`: authenticated server-side Paystack transaction verification
- `/api/payments/webhook`: HMAC-verified Paystack webhook with server re-verification
- `/api/seller/products/[id]/images`: authenticated Cloudinary upload/delete endpoint

## Deployment

Import the repository into Vercel, configure the environment variables from `.env.example`, use a hosted PostgreSQL provider, and run `npx prisma migrate deploy` during deployment. Set the Paystack webhook URL to `/api/payments/webhook` and configure the deployed callback URL. Do not expose `PAYSTACK_SECRET_KEY`, `CLOUDINARY_API_SECRET`, or `AUTH_SECRET` to the browser.

## Required environment variables

`DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

`NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is optional for the current server redirect flow. `PAYSTACK_SECRET_KEY`, Cloudinary API secret, and Auth secret are server-only. Never commit `.env` files.

## Development seed

`npm run db:seed` is idempotent for the demo category, seller, and product. It generates a temporary demo password unless `DEMO_ADMIN_PASSWORD` is supplied. Never use seeded demo accounts in production.
