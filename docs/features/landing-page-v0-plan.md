# LuckyPlans Landing Page — V0 Implementation Plan

## Context

We need a public-facing landing page for **LuckyPlans (Trading Strategy Lab)**. The goal is a high-signal technical introduction — not a marketing page. V0 prioritizes clarity over aesthetics: clear positioning, present infrastructure modules, link to GitHub, and reserve space for future lab notes.

**Branch:** `feature/landing-page` (clean, no divergence from `main`)
**Stack already in place:** Next.js 16, HeroUI v3 beta, Tailwind CSS v4, Framer Motion, Inter font

---

## File Changes Overview

### Modify (3 files)
| File | What Changes |
|------|-------------|
| `styles/globals.css` | Add `@theme inline` font mapping, smooth scroll, selection styles |
| `app/layout.tsx` | Add `dark` class to `<html>`, full SEO metadata, fix viewport accessibility |
| `app/page.tsx` | Replace placeholder with landing page composition |

### Create (15 new files)
| File | Purpose |
|------|---------|
| `components/icons/types.ts` | Shared SVG prop interface |
| `components/icons/GitHubIcon.tsx` | GitHub SVG icon |
| `components/icons/ExternalLinkIcon.tsx` | External link arrow SVG |
| `components/icons/CpuIcon.tsx` | Backtesting Engine icon |
| `components/icons/ZapIcon.tsx` | Execution Layer icon |
| `components/icons/ChartBarIcon.tsx` | Analytics icon |
| `components/icons/ShieldCheckIcon.tsx` | On-chain Attestation icon |
| `components/landing/SectionContainer.tsx` | Reusable section wrapper (max-w-5xl, padding, scroll-mt) |
| `components/landing/Navbar.tsx` | Sticky nav with mobile menu (only client component) |
| `components/landing/HeroSection.tsx` | Headline, subtitle, 2 CTAs |
| `components/landing/ProblemSection.tsx` | 4 problem cards in 2x2 grid |
| `components/landing/InfrastructureSection.tsx` | 4 module cards with icons |
| `components/landing/ProofSection.tsx` | Artifact list (GitHub, docs, contract, version) |
| `components/landing/LabNotesSection.tsx` | Placeholder section with dashed border |
| `components/landing/Footer.tsx` | Minimal footer with brand + links |

---

## Design Decisions

- **Single-page scroll** at root `/` — all 5 sections on one page with anchor navigation
- **Dark theme** — `bg-neutral-950` page, `bg-neutral-900` cards, `green-400` accent (matches existing prod app patterns)
- **Server Components everywhere** except Navbar — near-zero client JS for Lighthouse > 90
- **Plain `<div>` cards** instead of HeroUI `Card` — avoids unnecessary client-side interactivity for static content
- **HeroUI used for:** Navbar (responsive mobile menu), Button (CTAs), Chip (badges), Link (external links with `isExternal`)
- **No new dependencies** — everything needed is already installed

---

## Section Content (Final Copy)

### Hero
- **Headline:** "Trading Strategy Lab"
- **Subtitle:** "Open infrastructure for backtesting, executing, and verifying trading strategies. Reproducible by design. Verifiable on-chain."
- **Primary CTA:** "View on GitHub" → GitHub repo
- **Secondary CTA:** "Read the Docs" → docs placeholder

### Problem Statement ("Why this exists")
1. Unverifiable performance — results are screenshots, no independent verification
2. Copy trading trust gap — no visibility into leader strategy performance
3. Irreproducible backtests — different engines/data/assumptions = different results
4. Fragmented tooling — no shared data model or verification layer

### Infrastructure ("What we're building")
1. **Backtesting Engine** — Deterministic backtesting, fixed seeds, versioned params
2. **Execution Layer** — Full order lifecycle tracking, every fill recorded
3. **Analytics & Reporting** — Sharpe ratio, drawdown, PnL curves, exportable
4. **On-chain Attestation** — Hash configs/results to Solana, independently verifiable

### Proof ("Artifacts")
- Repository link, Documentation link, Contract status, Version, Last updated

### Lab Notes
- Placeholder: "First entry publishing soon. Follow the repository for updates."

---

## Implementation Order

### Phase 1: Foundation
1. Update `styles/globals.css` — font mapping, smooth scroll, selection styles
2. Update `app/layout.tsx` — dark mode, full SEO metadata, fix viewport

### Phase 2: Icons & Shared Components
3. Create `components/icons/types.ts` + 6 icon components
4. Create `components/landing/SectionContainer.tsx`

### Phase 3: Page Sections (top to bottom)
5. Create `Navbar.tsx` (client component)
6. Create `HeroSection.tsx`
7. Create `ProblemSection.tsx`
8. Create `InfrastructureSection.tsx`
9. Create `ProofSection.tsx`
10. Create `LabNotesSection.tsx`
11. Create `Footer.tsx`

### Phase 4: Compose & Verify
12. Replace `app/page.tsx` with final composition
13. `npm install` → `npm run build` → `npm run lint` — must all pass
14. Manual check: responsive behavior, anchor links, mobile menu, external links

---

## Verification

1. **Build:** `npm run build` passes with zero errors
2. **Lint:** `npm run lint` passes
3. **Dev server:** `npm run dev` — all 5 sections render correctly
4. **Responsive:** Check at 375px, 768px, 1024px, 1440px widths
5. **Interactions:** Anchor links scroll smoothly, mobile menu opens/closes, external links open in new tab
6. **Lighthouse:** Performance > 90, Accessibility > 90, SEO > 90
7. **Content:** No lorem ipsum, no placeholder text except Lab Notes (intentional)
