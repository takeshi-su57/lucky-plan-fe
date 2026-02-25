# Foundation Setup Plan

## Context
The repo has been cleaned of most feature code. The existing `providers.tsx` has dead imports (RainbowKit, Wagmi, notistack, old subscription hooks) and `layout.tsx` references deleted fonts/styles. We need a clean foundation with: HeroUI v3 (beta), Tailwind CSS v4, TanStack Query v5, Apollo Client v4, Next.js 16 App Router.

**User decisions:**
- Strip all old providers (RainbowKit, Wagmi, notistack, subscriptions)
- Keep existing `hooks/` directory as-is
- Use `next/font/google` (Inter) for fonts
- HeroUI v3 beta with default theme

## Step 1: Clean up package.json
Remove unused dependencies:
- `@rainbow-me/rainbowkit`, `@rainbow-me/rainbowkit-siwe-next-auth`
- `wagmi`, `viem`
- `notistack`
- `chart.js`, `@types/chart.js`
- `ml-regression-simple-linear`
- `react-json-view-lite`
- `apollo-upload-client`, `@types/apollo-upload-client`
- `pako`, `@types/pako`
- `react-number-format`
- `react-virtuoso`
- `rxjs`
- `react-use`
- `nanoid`
- `dayjs`
- `react-icons`
- `autoprefixer` (not needed with Tailwind v4 + @tailwindcss/postcss)

Add:
- `@heroui/react@beta`, `@heroui/styles@beta` (replace `@heroui/react@^2.8.5`)

Keep as-is (already latest):
- `@apollo/client@^4.0.9`, `graphql@^16.12.0`, `graphql-ws@^6.0.6`
- `@tanstack/react-query@^5.90.10`
- `next@^16.1.6`, `react@^19.2.1`, `react-dom@^19.2.1`
- `tailwindcss@4.1.17`, `@tailwindcss/postcss@^4.1.17`
- `framer-motion` (HeroUI dependency)
- `tailwind-merge`, `use-debounce`, `server-only`

## Step 2: Create globals.css
File: `styles/globals.css`
```css
@import "tailwindcss";
@import "@heroui/styles";
```
Import order matters — tailwindcss must come first.

## Step 3: Create provider files

### `lib/apollo/client.ts` — Apollo Client config
- HttpLink with `NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API`
- GraphQLWsLink with `NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_WSS`
- Split link (subscription → ws, rest → http)
- Auth header injection via SetContextLink
- InMemoryCache (clean, no old type policies)
- Export singleton `apolloClient`

### `lib/apollo/apollo-provider.tsx` — "use client" wrapper
- Wraps children with `<ApolloProvider>`

### `lib/query/client.ts` — QueryClient config
- Sensible defaults: `staleTime: 60_000`, `retry: 1`, `refetchOnWindowFocus: false`
- Export singleton `queryClient`

### `lib/query/query-provider.tsx` — "use client" wrapper
- Wraps children with `<QueryClientProvider>`
- Include `<ReactQueryDevtools>` in dev only

### `lib/providers/theme-provider.tsx` — "use client" wrapper
- Wraps children with `<HeroUIProvider>` (default theme, dark mode via class)

### `lib/providers/index.tsx` — "use client" composed provider
- Composes: QueryProvider → ApolloProvider → ThemeProvider → children

## Step 4: Update layout.tsx
File: `app/layout.tsx`
- Use `next/font/google` with Inter font
- Import `@/styles/globals.css`
- Remove parallel route slots (topbar, sidebar, statusbar)
- Simple `<html lang="en" className="dark">` + `<body>` + `<Providers>`
- Minimal shell — no sidebar/topbar/statusbar layout (that's feature work)

## Step 5: Update page.tsx
File: `app/page.tsx`
- Simple placeholder page (remove redirect to `/plans`)
- Render a HeroUI Button to validate the setup works

## Step 6: Create route group structure
Create placeholder directories with `.gitkeep`:
- `app/(public)/` — future public/landing pages
- `app/(app)/` — future authenticated app pages
- `components/ui/` — shared UI components

## Step 7: Update tsconfig.json
Clean up paths:
- Keep `@/*` → `./*`
- Update `@/components/*` → `./components/*`
- Update `@/lib/*` → `./lib/*`
- Remove dead paths: `@/app-components/*`, `@/app-actions/*`
- Keep `@/gql/*` → `./graphql/gql/*`
- Keep `@/app-hooks/*` → `./hooks/*` (user wants to keep hooks/)

## Step 8: Clean up old providers.tsx
Delete `app/providers.tsx` (replaced by `lib/providers/index.tsx`)

## Step 9: Install dependencies & verify build
- Run `npm install`
- Run `npm run build` — must pass with zero errors
- Verify dev server starts correctly

## Files Modified
- `package.json` — dependency cleanup + HeroUI v3 beta
- `styles/globals.css` — new (Tailwind + HeroUI imports)
- `lib/apollo/client.ts` — new
- `lib/apollo/apollo-provider.tsx` — new
- `lib/query/client.ts` — new
- `lib/query/query-provider.tsx` — new
- `lib/providers/theme-provider.tsx` — new
- `lib/providers/index.tsx` — new
- `app/layout.tsx` — rewritten
- `app/page.tsx` — rewritten
- `app/providers.tsx` — deleted
- `tsconfig.json` — path cleanup

## Verification
1. `npm install` succeeds
2. `npm run build` passes
3. `npm run dev` starts without errors
4. Page loads with HeroUI Button rendering correctly
5. No console errors related to providers
