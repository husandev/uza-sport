# UZA WC2026 — Project Rules

> Bu fayl loyiha bo'yicha barcha qoidalar, konventsiyalar va arxitektura qarorlarini o'z ichiga oladi.
> Har bir yangi task bajarishdan oldin bu faylni o'qi. Yangi narsa qo'shganda — bu faylni yangilash majburiy.

---

## 1. TEXNOLOGIYALAR (Stack)

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.8 (strict: false)
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Animations**: Framer Motion 12
- **State**: React hooks + TanStack React Query 5
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Toasts**: Sonner
- **Themes**: next-themes (class strategy)
- **Package Manager**: npm

---

## 2. FAYL VA PAPKA TUZILMASI

```
src/
├── app/            → Next.js App Router routing (FAQAT wrapper pages + layout)
├── components/     → Reusable UI components
│   └── ui/         → shadcn/ui primitive components (o'zgartirma)
├── views/          → Page container components (src/pages/ emas — Next.js conflict)
├── data/           → mockData.ts (barcha mock ma'lumotlar)
├── hooks/          → Custom React hooks (use-mobile.tsx, use-toast.ts)
├── lib/            → Utility functions (utils.ts — cn())
├── assets/         → Rasmlar (hero, photo, gallery, footballer, stadium, logos)
└── app/globals.css → Global styles (CSS variables, Tailwind directives, custom classes)
```

### Kritik qoidalar:
- `src/pages/` papkasini HECH QACHON yaratma — Next.js Pages Router bilan conflict chiqadi
- `src/views/` — page komponentlar uchun
- `src/app/` — faqat thin wrapper + layout uchun

---

## 3. ROUTING QOIDALARI

### App Router strukturasi:
```
src/app/
├── page.tsx              → /
├── layout.tsx            → Root layout (Header, Footer, Providers)
├── not-found.tsx         → 404 page
├── globals.css           → Global styles
├── news/page.tsx         → /news
├── articles/page.tsx     → /articles
├── article/[id]/page.tsx → /article/:id
├── videos/page.tsx       → /videos
├── video/[id]/page.tsx   → /video/:id
├── photos/page.tsx       → /photos
├── results/page.tsx      → /results
├── standings/page.tsx    → /standings
├── teams/page.tsx        → /teams
├── team/[id]/page.tsx    → /team/:id
├── stadiums/page.tsx     → /stadiums
├── stadium/[id]/page.tsx → /stadium/:id
└── footballer/[id]/page.tsx → /footballer/:id
```

### Page wrapper pattern (src/app/*/page.tsx):
```tsx
import SomePage from "@/views/SomePage";

export default function SomeRoute() {
  return <SomePage />;
}
```

### Dynamic params (src/views/):
```tsx
"use client";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  // ...
}
```

---

## 4. KOMPONENT QOIDALARI

### "use client" directive:
- **Barcha interaktiv komponentlar** `"use client"` bilan boshlanishi shart
- Hooks ishlatiladigan har qanday komponent: `"use client"`
- Server component faqat: layout.tsx (root layout)

### Fayl nomlash:
- Komponentlar: **PascalCase** → `Header.tsx`, `HeroSlider.tsx`
- Hooklar: **camelCase** → `use-mobile.tsx`, `use-toast.ts`
- O'zgaruvchilar: **camelCase**
- Konstantlar: **UPPER_SNAKE_CASE** → `PER_PAGE`, `SLIDE_DURATION`

### Import tartibi:
```tsx
"use client";

// 1. React
import { useState, useEffect } from "react";

// 2. Next.js
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";

// 3. Third-party libraries
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";

// 4. Internal components (@/components/ui/...)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 5. Internal views/components (@/components/...)
import Header from "@/components/Header";

// 6. Data & utilities
import { mockData } from "@/data/mockData";
import { cn } from "@/lib/utils";

// 7. Assets
import heroImage from "@/assets/hero-1.jpg";
```

---

## 5. ROUTING & NAVIGATION

### react-router-dom YO'Q — next/navigation ishlatiladi:

| react-router-dom | Next.js |
|---|---|
| `import { Link } from "react-router-dom"` | `import Link from "next/link"` |
| `<Link to="/path">` | `<Link href="/path">` |
| `useLocation()` | `usePathname()` from next/navigation |
| `useParams()` | `useParams()` from next/navigation |
| `useNavigate()` | `useRouter()` from next/navigation |

### useParams pattern:
```tsx
const params = useParams();
const id = params.id as string;  // Type assertion kerak
```

### Active link detection:
```tsx
const pathname = usePathname();
const isActive = pathname === "/news";
```

---

## 6. RASM (IMAGE) QOIDALARI

### Static image imports:
```tsx
import heroImage from "@/assets/hero-1.jpg";
// Next.js StaticImageData qaytaradi — .src kerak!

// HTML img teg bilan:
<img src={heroImage.src} alt="..." />

// Array uchun:
const images = [hero1.src, hero2.src, hero3.src];
// Keyin: <img src={images[index]} />
```

### MUHIM: `next/image` ishlatilmaydi — barcha rasmlar oddiy `<img>` tegi bilan

### Assets papkasi tuzilmasi:
- Hero: `hero-1.jpg` — `hero-5.jpg`
- Photos: `photo-1.jpg` — `photo-4.jpg`
- Gallery: `gallery-1.jpg` — `gallery-8.jpg`
- Footballers: `footballer-1.png` — `footballer-11.jpg`
- Stadiums: `stadium-1.jpg` — `stadium-3.jpg`
- Logos: `uza-logo-solo.png`, `oks-logo.png`

---

## 7. STYLING QOIDALARI

### CSS Variables (globals.css):
```css
--primary          /* dark blue */
--secondary        /* green */
--accent
--muted
--background
--foreground
--live             /* red — live match */
--highlight        /* yellow */
--link             /* light blue */
```

### Custom CSS classlar (globals.css da aniqlangan):
- `.section-title` — gradient bar accent bilan section sarlavhalar
- `.news-item` — left border animatsiyali hover card
- `.nav-link` / `.nav-link.active` — navigation styling
- `.fire-count` — engagement metric display
- `.ticker-wrapper` — match ticker background

### Utility function:
```tsx
import { cn } from "@/lib/utils";
// clsx + twMerge — Tailwind conflict-free merging
<div className={cn("base-class", condition && "conditional-class")} />
```

### Layout grid pattern:
```tsx
// 8-col main + 4-col sidebar (standard page layout)
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
  <div className="lg:col-span-8">/* Main content */</div>
  <div className="lg:col-span-4">/* Sidebar */</div>
</div>
```

### Responsive pattern:
- Mobile-first: default → `sm:` → `lg:` → `xl:`
- Hidden on mobile: `hidden lg:block`
- Direction change: `flex-col sm:flex-row`
- Container max-width: 1240px

### Typography:
- Body font: Inter
- Heading font: Oswald
- Tight headlines: `tracking-tight` (-0.025em to -0.04em)
- Font features: `font-feature-settings: "cv01", "cv02", ...`

---

## 8. MA'LUMOTLAR (DATA)

### Bitta markaziy fayl:
```
src/data/mockData.ts
```

### Mavjud export'lar:
- `matchTickerData` — Live/finished matches
- `heroSlides` — Featured articles carousel
- `newsFeed` — News items (12)
- `photoArticles` — Photo article metadata
- `sidebarArticles` — Featured sidebar articles (10)
- `groupStandings` — 12 groups × 4 teams
- `topScorers` — Top 5 scorers
- `videoPosts` — Featured videos (4)
- `heroFootballers` — 11 players
- `stadiums` — 16 WC venues
- `teams` — 12 teams

### Yangi ma'lumot qo'shish qoidasi:
- Har doim `mockData.ts` ga qo'sh
- Interface/type aniqlashni unutma
- Alohida fayl yaratma (yagona manba qoidasi)

---

## 9. STATE MANAGEMENT

### Oddiy UI state:
```tsx
const [isOpen, setIsOpen] = useState(false);
const [page, setPage] = useState(1);
```

### URL state (detail pages):
```tsx
const params = useParams();
const id = params.id as string;
```

### Server state (API calls):
```tsx
// TanStack React Query (configured in Providers.tsx)
import { useQuery } from "@tanstack/react-query";
```

### Pagination pattern:
```tsx
const PER_PAGE = 15;
const paginated = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

// Page change:
setPage(prev => prev + 1);
window.scrollTo({ top: 0, behavior: "smooth" });
```

---

## 10. ANIMATSIYALAR

### Framer Motion pattern:
```tsx
import { motion, AnimatePresence } from "framer-motion";

// Fade in:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
/>

// Slide:
<motion.div
  initial={{ x: -20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
/>
```

### CSS animations (globals.css da aniqlangan):
- `pulse-dot` — Live indicator pulsing
- `shimmer` — Loading state
- `lightbox-zoom-in` — Modal entrance
- `fade-in` — Gradual appearance
- `accordion-down` / `accordion-up` — Shadcn accordion

---

## 11. PROVIDERS TUZILMASI

### src/components/Providers.tsx:
```tsx
"use client";
// QueryClientProvider + TooltipProvider + Toaster + Sonner
// Root layout.tsx bu komponentni wrap qiladi
```

### src/app/layout.tsx:
- Server component (no "use client")
- Metadata export
- HTML/body struktura
- Header, MatchTicker, ScrollToTop, Footer, Providers wrap

---

## 12. KOMPONENTLAR RO'YXATI

### Layout:
- `Header.tsx` — Sticky nav, search modal, social links
- `Footer.tsx` — Dark footer, branding, OKS tooltip
- `Layout.tsx` — Wrapper (children prop)
- `ScrollToTop.tsx` — Route-based scroll reset
- `Providers.tsx` — QueryClient + TooltipProvider wrapper

### Sections:
- `HeroSlider.tsx` — Animated carousel (clip-path + Ken Burns)
- `MatchTicker.tsx` — Live horizontal scroll ticker
- `NewsFeed.tsx` — Sidebar news list (12 items)
- `SidebarArticles.tsx` — Featured sidebar articles
- `HeroFootballers.tsx` — Player showcase grid
- `GroupStandings.tsx` — Tournament standings table
- `TopScorers.tsx` — Top scorers ranking
- `PhotoFeed.tsx` — Photo grid
- `PhotoArticles.tsx` — Photo article tiles
- `VideoPosts.tsx` — Video card list
- `TeamsSection.tsx` — Team showcase grid
- `StadiumsSection.tsx` — Stadium showcase
- `PhotoLightbox.tsx` — Full-screen lightbox (zoom, keyboard, slideshow)
- `FootballAnim.tsx` — Animated football icon

### UI (shadcn/ui — o'zgartirma):
`button, card, dialog, dropdown-menu, form, input, select, table, tabs, tooltip, badge, separator, sheet, avatar, checkbox, radio-group, scroll-area, skeleton, switch, textarea, toast, ...`

---

## 13. SAHIFALAR RO'YXATI (Views)

- `Index.tsx` — Home: hero slider + layout
- `NewsPage.tsx` — News list with pagination
- `ArticlesPage.tsx` — Articles with pagination
- `ArticlePage.tsx` — Single article detail
- `VideosPage.tsx` — Video list
- `VideoArticlePage.tsx` — Video detail
- `PhotosPage.tsx` — Photo gallery (masonry 4-col)
- `ResultsPage.tsx` — Match results/schedule
- `StandingsPage.tsx` — Group tables + scorers
- `TeamsPage.tsx` — Teams list
- `TeamArticlePage.tsx` — Team detail
- `StadiumsPage.tsx` — Stadiums list
- `StadiumArticlePage.tsx` — Stadium detail
- `FootballerPage.tsx` — Player profile

---

## 14. KONTENT KONVENTSIYASI

- **Til**: O'zbek (asosiy), ingliz (texnik)
- **Mavzu**: FIFA World Cup 2026, O'zbekiston milliy terimi
- **Vaqt formati**: "Bugun", "Kecha", relative times, "daqiqa", "soat", "kun"
- **Emoji**: Flaglar, sport ikonalar (⚽ 🏆 🏟️ 🎬 📸) faqat content ichida

---

## 15. KONFIGURATSIYA QOIDALARI

### next.config.js (CommonJS!):
```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
// ESM (export default) EMAS — next.config.ts ham yo'q
```

### postcss.config.js (CommonJS!):
```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
// ESM EMAS
```

### tsconfig.json:
- `"strict": false` — strict mode o'chiq
- `"@/*": ["./src/*"]` — path alias
- `"allowJs": true`

---

## 16. ASOSIY QOIDA — UI VA LOGIKAGA TEGMA

**Men faqat so'ralgan narsani bajaraman. Hech qachon:**
- UI dizaynini o'zgartirma (ranglar, o'lchamlar, layoutlar, animatsiyalar)
- Komponent mantiqini o'zgartirma
- Mavjud kodni "yaxshilash" bahonasida refaktor qilma
- So'ralmaganda yangi feature qo'shma
- So'ralmaganda CSS class yoki style o'zgartirma

**Ruxsat berilgan (faqat teknik xatolik tuzatish):**
- Hydration mismatch — framework xatosi
- Console error/warning — debug qoldiqlari
- Build xatosi — kompilyatsiya muammolari
- Siniq import — yo'q fayl yoki noto'g'ri yo'l

**Agar ikkilansam:** So'rayman, o'zim qaror qilmayman.

---

## 16b. YOZISH QOIDALARI (Code Quality)

### DO:
- Har yangi komponent `"use client"` dan boshlash (agar hooks/events bo'lsa)
- `cn()` utility ishlatish className uchun
- shadcn/ui komponentlardan foydalanish (alohida UI yaratma)
- `mockData.ts` ga yangi data qo'shish
- Pagination uchun `PER_PAGE` konstanta
- `params.id as string` type assertion

### DON'T:
- `src/pages/` papka yaratma
- `react-router-dom` import qilma
- `next/image` ishlatma (barcha rasmlar `<img src={img.src} />`)
- `export default` ni `postcss.config.js` yoki `next.config.js` da ishlatma
- Yangi CSS fayl yaratma — `globals.css` ga qo'sh
- `useState(Date.now())` yoki `useState(getTimeLeft())` serverda ishlatma — hydration mismatch chiqadi

### Hydration mismatch oldini olish:
`Date.now()`, `Math.random()`, yoki boshqa server/client da farq qiladigan qiymatlar bilan state boshlama.
Buning o'rniga `useEffect` ichida o'rnat:
```tsx
// XATO:
const [t, setT] = useState(getTimeLeft());

// TO'G'RI:
const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
useEffect(() => {
  setT(getTimeLeft());
  const id = setInterval(() => setT(getTimeLeft()), 1000);
  return () => clearInterval(id);
}, []);
```

`Math.random()` ni komponent tashqarisidagi (modul darajasidagi) ma'lumotlarda ISHLATMA:
```ts
// XATO — server va client har xil qiymat generatsiya qiladi:
fires: Math.floor(Math.random() * 90) + 3,

// TO'G'RI — i ga asoslangan deterministik formula:
fires: ((i * 37 + 11) % 90) + 3,
// Yoki statik massivdan:
fires: [45, 89, 23, 67, 12, 34, 56, 78, 15, 41][i % 10],
```

---

## 17. YANGI NARSA QO'SHGANDA (Checklist)

### Yangi sahifa qo'shganda:
- [ ] `src/app/newpage/page.tsx` — thin wrapper
- [ ] `src/views/NewPage.tsx` — actual component (+ `"use client"`)
- [ ] `src/data/mockData.ts` — yangi data
- [ ] `src/components/Header.tsx` — nav linkni qo'sh (agar kerak)
- [ ] Bu `rules.md` ni yangilash (Routes bo'limi)

### Yangi komponent qo'shganda:
- [ ] `src/components/ComponentName.tsx`
- [ ] `"use client"` directive (agar hooks/events bo'lsa)
- [ ] `cn()` ishlatish className uchun
- [ ] Bu `rules.md` ni yangilash (Komponentlar bo'limi)

### Yangi data qo'shganda:
- [ ] Faqat `src/data/mockData.ts` ga qo'sh
- [ ] TypeScript interface/type aniqlash
- [ ] Bu `rules.md` ni yangilash (Ma'lumotlar bo'limi)

---

## 18. COMMANDS

```bash
npm run dev    # next dev (localhost:3000)
npm run build  # next build
npm run start  # next start
```

---

## 19. GIT COMMIT CONVENTIONS

Recent commits pattern:
- "Add [feature name]"
- "Changes" (kichik o'zgarishlar)
- "Fix [issue]"

---

*Bu fayl har bir yangi task qo'shilganda yangilanishi shart.*
*Oxirgi yangilanish: Next.js migratsiya — barcha 14 route ishlayapti.*

## 20. API VA TANSTACK QUERY

### Environment variables:
- `.env.local` — lokal (git ignore, `*.local` bor .gitignore da)
- `.env.example` — namuna (git da saqlanadi, haqiqiy qiymat yo'q)
- API URL: `process.env.NEXT_PUBLIC_API_URL`

### Base API client (`src/lib/api.ts`):
```ts
import { api } from "@/lib/api";

// GET
const data = await api.get<ResponseType>("/endpoint");

// POST
const result = await api.post<ResponseType>("/endpoint", { key: "value" });
// PUT / PATCH / DELETE ham mavjud
```

### Query hooks (`src/hooks/queries/`):
- Barcha API hooklar `src/hooks/queries/` papkasida
- Har endpoint uchun alohida fayl: `useNews.ts`, `useArticles.ts` va h.k.
- `src/hooks/queries/index.ts` dan re-export qilish

### Hook yozish pattern:
```ts
// src/hooks/queries/useNews.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => api.get<NewsItem[]>("/news"),
  });
}
```

### QueryClient konfiguratsiyasi (Providers.tsx):
- staleTime: 5 daqiqa
- retry: 1
- refetchOnWindowFocus: false
- DevTools: ReactQueryDevtools (faqat dev da ko'rinadi)

### Mock → API o'tish:
Komponentda mockData ni hook bilan almashtir, import ni keyin olib tashlash mumkin.

---

*Bu fayl har bir yangi task qo'shilganda yangilanishi shart.*
*Oxirgi yangilanish: TanStack Query + API infratuzilmasi qo'shildi.*
