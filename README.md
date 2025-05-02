
# Under The Flow

Under The Flow is a fullstack web application for showcasing live music sessions recorded and produced by a small creative team. This repository contains the frontend codebase built with Next.js 15.

---

## 📦 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom design tokens
- **UI Library**: [@heroui/react](https://www.npmjs.com/package/@heroui/react)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: Google Fonts (Geist, Bebas Neue, Geist Mono)

---

## 🔌 Integrations

- **Analytics**: Google Analytics (via `@next/third-parties/google`)
- **SEO**: Structured metadata via `metadata` API in Next.js
- **PWA**: Basic support via `site.webmanifest` and mobile meta tags
- **Deployment**: Vercel (CI/CD on `main` push)

---

## 🧠 Core Features

- Dynamic routing with App Router
- Custom page transitions and intro animations
- Responsive UI with layout components (Header, Footer, Overlay)
- Embedded video sessions from YouTube
- Image optimizations and proper favicon setup
- Semantic metadata and Open Graph tags
- Global providers setup via `app/providers.tsx`

---

## 📁 Project Structure Highlights

- `app/`: App Router entrypoint with layout and page definitions
- `components/layout`: Header, Footer, PageTransition, IntroOverlay, TooltipWrapper
- `public/`: Includes all favicon, manifest and social preview images
- `styles/`: Tailwind base styles and globals

---

## 🚀 Deployment

This project is continuously deployed on **Vercel** from the main Git branch.

Production URL: [https://undertheflow.com](https://undertheflow.com)

---

## 🧪 Dev Setup

```bash
pnpm install
pnpm dev
```

Required Node version: `>=18`

---

