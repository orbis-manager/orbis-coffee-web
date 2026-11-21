# Orbis Coffee

Marketing website for Orbis Coffee, built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Supports Vietnamese and English via a custom `[locale]` routing setup.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Fonts: Playfair Display (display/headline) + Plus Jakarta Sans (body/UI), loaded via `next/font/google`
- Custom i18n (`vi` / `en`) via `src/proxy.ts` + `src/app/[locale]`
- Reusable UI components in `src/components/ui/`

## Deploy

Deployed on [Vercel](https://vercel.com). Pushing to `main` triggers a production deploy.
