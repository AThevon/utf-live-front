# Under The Flow

Under The Flow is a fullstack web application for showcasing live music sessions recorded and produced by a small creative team.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Storage**: AWS S3
- **Styling**: Tailwind CSS
- **UI Library**: [HeroUI](https://www.heroui.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Email**: [Resend](https://resend.com/)
- **Fonts**: Google Fonts (Geist, Bebas Neue)

---

## Features

### Public Site
- Homepage with featured live sessions
- Artists directory with bio, images and social links
- Live sessions catalog with embedded YouTube videos
- Contact form with email notifications
- Responsive design with page transitions

### Admin Panel (`/admin`)
- Dashboard with stats overview
- Artists management (CRUD, images, social links)
- Live sessions management (CRUD, participants)
- Platforms management (social & music platforms)
- Authentication via Supabase Auth

---

## Project Structure

```
app/
├── (public)/          # Public routes with Header/Footer
│   ├── page.tsx       # Homepage
│   ├── artists/       # Artists pages
│   ├── live-sessions/ # Live sessions pages
│   ├── contact/       # Contact form
│   └── login/         # Auth page
├── (admin)/           # Admin routes with sidebar
│   └── admin/         # Admin panel
├── api/               # API routes
│   ├── admin/         # Admin CRUD endpoints
│   └── contact/       # Contact form endpoint
└── layout.tsx         # Root layout

components/
├── admin/             # Admin UI components
├── layout/            # Header, Footer, PageTransition
├── ui/                # Reusable UI components
└── audio/             # Music player components

lib/
├── db/                # Database queries (Supabase)
├── api/               # Data fetching functions
├── s3/                # S3 upload utilities
├── supabase/          # Supabase client setup
└── services/          # Business logic
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AWS S3
NEXT_PUBLIC_S3_BUCKET_URL=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=
S3_URL=

# Email (Resend)
RESEND_API_KEY=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=
MAIL_TO_ADDRESS=
MAIL_TO_NAME=
```

---

## Development

```bash
npm install
npm run dev
```

### Database Setup

1. Create a Supabase project
2. Run migrations from `supabase/migrations/`
3. Seed data with `supabase/seed.sql`

---

## Deployment

Deployed on **Vercel** with automatic CI/CD from the `main` branch.

Production: [https://undertheflow.com](https://undertheflow.com)
