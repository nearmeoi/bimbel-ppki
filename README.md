# Bimbel - Platform Persiapan SKD CPNS 2026

A modern, production-grade React web application designed for Indonesian civil-servant exam (SKD CPNS: TWK, TIU, TKP) preparation. Faithfully converted from Google Stitch static prototype into modular, accessible, and high-performance React components with Tailwind CSS.

---

## 🎯 Tech Stack

- **React 18** (Functional components + Hooks)
- **Vite** (Lightning-fast dev server & production bundler)
- **Tailwind CSS** (Centralized design tokens, neo-brutalist styling)
- **React Router v6** (Client-side routing with lazy loading & Suspense)
- **lucide-react** (Crisp vector icons replacing inline SVG dumps)
- **Recharts** (Interactive score progression & subject mastery charts)

---

## 🎨 Design Tokens

Centralized in `tailwind.config.js`:

| Token | Value | Description |
| :--- | :--- | :--- |
| **`primary`** | `#2239E5` | Royal Blue brand color |
| **`primary-hover`** | `#192BB3` | Darker blue hover state |
| **`accent`** | `#F9FF33` | Neon Yellow accent color |
| **`bglight`** | `#EEEEEE` | Page background light gray |
| **`surfacelight`**| `#F2F2F2` | Card & chip surface light gray |
| **`ink`** | `#000000` | Ink Black typography & 2px borders |
| **`gradient`** | `#A5B4FC` to `#6B7FFF` | Signature insight card gradient |
| **`medal-gold`** | `#FACC15` | Podium & badge gold rank 1 |
| **`medal-silver`**| `#D1D5DB` | Podium & badge silver rank 2 |
| **`medal-bronze`**| `#FB923C` | Podium & badge bronze rank 3 |
| **Border** | `2px solid #000000` | Signature neo-brutalist border |
| **Border Radius** | `neo: 24px`, `neo-lg: 32px`, `neo-top: 40px`, `chip: 16px`, `pill: 9999px` |
| **Focus Ring** | `0 0 0 2px #000, 0 0 0 5px #F9FF33` | 3px neon yellow with 2px black outline |
| **Typography** | `Poppins` via Google Fonts | Display, Headings (1-3), Section, Body, Caption |

---

## 🏛️ Signature Elements

1. **Header Pill Navigation with Downward Notch**: Royal blue top bar with pill navigation container (`bg-white/10`) featuring an active tab indicator with the signature triangle downward notch (`.nav-triangle`).
2. **Rounded-Top Gray Content Area**: Content container with `rounded-t-neo-top -mt-4` overlapping the blue header with top shadow.
3. **Tab-Cut Card Corner (`TabCutCard`)**: Inverted corner notch at top-right housing circular arrow buttons, constructed with mathematically seamless SVG borders (continuous 2px solid black stroke with 20px radius).
4. **Subject Card (`SubjectCard`)**: TWK, TIU, and TKP subject cards with crisp yellow geometric SVG shapes, progress chips (`Progres : 1/8 • 1 jam yang lalu`), and active elevations.
5. **Leaderboard Rows (`RankRow`)**: Compact cards and full table rows featuring overlapping gold, silver, and bronze medal badges on user avatars, plus pinned row styling for current user (`#24 Anda (User)`).
6. **Gradient Insight Card (`InsightCard`)**: Blue-violet gradient with advice copy and subtle background sparkles.
7. **Exam Focus Mode (`FocusLayout`)**: Minimalist header with live countdown timer (`role="timer" aria-live="polite"`), question selection, flagged state ("Tandai Ragu"), question navigation number grid, and mobile bottom sheet.

---

## 📂 Project Structure

```
bimbel/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Static assets & icons
│   ├── components/
│   │   ├── ui/              # 14 Reusable UI Primitives
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Chip.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── MedalBadge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ProgressRing.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── Tabs.jsx
│   │   │   └── Toast.jsx
│   │   ├── layout/          # Layout Shells
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AppHeader.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── FocusLayout.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileBottomNav.jsx
│   │   │   └── PageShell.jsx
│   │   └── cards/           # Reusable Cards
│   │       ├── InsightCard.jsx
│   │       ├── OutlineCard.jsx
│   │       ├── PricingCard.jsx
│   │       ├── RankRow.jsx
│   │       ├── StatCard.jsx
│   │       ├── SubjectCard.jsx
│   │       ├── TabCutCard.jsx
│   │       └── TryOutItem.jsx
│   ├── context/             # Global Contexts
│   │   ├── AuthContext.jsx  # Auth & profile state, synced to localStorage
│   │   └── ExamContext.jsx  # Active exam state, answers, timer & evaluation
│   ├── data/                # Mock Data (JSON)
│   │   ├── analitik.json
│   │   ├── dashboard.json
│   │   ├── jadwal.json
│   │   ├── materi.json
│   │   ├── paket.json
│   │   ├── rangking.json
│   │   └── soal.json
│   ├── features/            # Feature-Specific Modules
│   │   └── dashboard/
│   │       ├── DashboardHeader.jsx
│   │       ├── LeaderboardSidebar.jsx
│   │       ├── MateriSection.jsx
│   │       └── PengumumanCarousel.jsx
│   ├── hooks/               # Custom Hooks
│   │   ├── useLocalStorage.js
│   │   ├── useMediaQuery.js
│   │   └── useTimer.js
│   ├── pages/               # Routed Screens
│   │   ├── admin/           # Admin Management Screens (Code-Split)
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminJadwalPage.jsx
│   │   │   ├── AdminMateriPage.jsx
│   │   │   ├── AdminPenggunaPage.jsx
│   │   │   ├── AdminPengumumanPage.jsx
│   │   │   └── AdminSoalPage.jsx
│   │   ├── auth/            # Authentication Screens
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── AnalitikPage.jsx # Charts & diagnosis (Code-Split)
│   │   ├── CheckoutPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ExamPage.jsx
│   │   ├── HasilPage.jsx
│   │   ├── JadwalPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LatihanPage.jsx
│   │   ├── MateriDetailPage.jsx
│   │   ├── MateriPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── PaketPage.jsx
│   │   ├── PembahasanPage.jsx
│   │   ├── ProfilPage.jsx
│   │   └── RangkingPage.jsx
│   ├── routes/              # React Router v6 Configuration
│   │   └── AppRoutes.jsx
│   ├── utils/               # Formatting & Passing Grade Calculations
│   │   └── formatters.js
│   ├── App.jsx              # App Root Provider Tree
│   ├── index.css            # Tailwind Base, Focus Rings & Custom Scrollbar
│   └── main.jsx             # React DOM Mounting
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🚦 Available Routes

| Route | Description |
| :--- | :--- |
| `/` | Landing page (Hero pitch, features, package CTA) |
| `/masuk` | Login screen with email/password + Google auth |
| `/daftar` | Account registration screen |
| `/lupa-password` | Password recovery link dispatch screen |
| `/onboarding` | 3-step target instansi & score range wizard |
| `/dashboard` | Student main dashboard (Stats, carousel, subjects, top 5, insight) |
| `/materi` | Module catalog with search and TWK/TIU/TKP category filters |
| `/materi/:id` | Video player, chapter list, summary tabs |
| `/latihan` | Simulation set cards with rules modal |
| `/latihan/:id/kerjakan` | Focus mode CAT exam with live timer & question number grid |
| `/hasil/:id` | Evaluated scores, passing grade breakdown, and temporary rank |
| `/hasil/:id/pembahasan` | Question-by-question review with answer key & solutions |
| `/rangking` | Top 3 podium pedestals & national ranking table |
| `/jadwal` | Tryout calendar with registration toggles |
| `/analitik` | Recharts score progress line chart & weak topic diagnosis |
| `/paket` | Membership plans with popular ribbon |
| `/paket/checkout` | Payment method selection, promo code, and success confirmation |
| `/profil` | Target instansi dropdown, target score range slider (311–550) |
| `/admin/*` | Administrative portal (Bank Soal with Live Preview, Materi, Pengumuman, Jadwal, Pengguna) |

---

## 🚀 How to Run & Verify

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Production Build & Verification
```bash
npm run build
```
Verify the optimized bundles with code-split chunks for `AnalitikPage` and all `Admin` sub-pages.

---

## ♿ Accessibility & Quality Standards

- **Touch Targets**: Minimum 44px on all buttons, links, inputs, and mobile navigation items.
- **Focus Rings**: 3px neon yellow with 2px black outline (`focus-visible:ring-3 focus-visible:ring-accent`) with 150ms smooth transition.
- **Live Timers**: Accessible `role="timer"` with `aria-live="polite"` announcing countdown updates.
- **Modal Dialogs**: Trapped keyboard focus, `Escape` key close listener, and backdrop dismissal.
- **Mobile Responsiveness**: Desktop-first (1440px), fluid tablet breakpoints (768px), and mobile (390px) with zero horizontal overflow.
- **Icon Labels**: All icon-only buttons include descriptive `aria-label`s.
