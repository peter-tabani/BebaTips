# BebaTips Handoff

## Project snapshot

BebaTips is a Next.js 15 App Router website for Kenyan football predictions and betting tips. It is a compact, single-repository app using React 19, TypeScript, Tailwind CSS, and no database or authentication layer.

The source code is the source of truth. The exported Cursor conversation is preserved in `docs/cursor_bebatips_website_creation.md` for historical context only.

## Current functionality

- Responsive dark/green football information layout with header, footer, internal-tool sidebars, ad placeholders, cookie banner, responsible-play notice, and WhatsApp CTA.
- Routes for predictions (`/`), accumulators, jackpots, match centre, blog/articles, multi-league standings, calculator, match details, premium previews, bookmaker review, responsible gambling, privacy, and terms.
- The homepage merges a seven-day football-data.org feed with TheSportsDB's worldwide daily soccer feed, deduplicates matching fixtures, and isolates provider timeouts. Hardcoded fixtures appear only if both feeds fail.
- League and club emblems are read from provider responses. The sidebar also uses football-data.org competition emblems; local logo downloads are not required.
- Hardcoded demo data still supplies jackpot picks, blog posts, and bookmaker listings. The homepage and `/accumulators` no longer use the old static Liverpool/Arsenal accumulator.
- Premium checkout is explicitly labeled as a preview. It does not contact M-Pesa, persist an order, verify payment, or send tips.
- Homepage fixture controls are functional: selected leagues filter by URL, date navigation loads the corresponding fixture day, market tabs filter applicable tips, and match detail links retain the selected day.
- With the optional football-data.org key, the app automatically refreshes multi-league standings and derives a transparent table-form signal from the two teams' current points-per-game and home advantage.
- The homepage integration uses one bulk seven-day football-data request plus seven parallel public daily-feed requests. Current table requests are cached and form the evidence for major-league signals.
- Worldwide matches lacking usable standings display `Stats soon`; the app does not turn team names into fake predictions. The gameweek accumulator watchlist only selects future official-feed matches with a current table-form explanation and does not invent combined odds.
- Research findings and source evidence are stored under `docs/research/`; the user-facing strategy is `docs/BEBATIPS_GROWTH_STRATEGY.md`.

## Important implementation locations

- `src/app/page.tsx`: homepage and predictions table.
- `src/components/MatchTable.tsx`: client-side search, date buttons, tabs, and match links.
- `src/lib/football-api.ts`: bulk football-data.org fetch, worldwide TheSportsDB merge, fixture deduplication, badges, cached standings, live gameweek shortlist and sample outage data.
- `src/lib/data.ts`: demo tips, accumulators, blog, jackpot, and bookmaker data.
- `src/lib/constants.ts`: navigation, league definitions, premium plans, and API base URL.
- `src/app/premium/checkout/page.tsx`: explicitly non-paying checkout preview.
- `src/app/calculator/page.tsx` and `src/components/BetCalculator.tsx`: local odds/returns calculator.
- `src/components/AdBanner.tsx`: AdSense placeholder/configuration branch.

## Known gaps and technical debt

- No real M-Pesa Daraja STK Push, callback, payment verification, order storage, or SMS/WhatsApp delivery.
- No-key fixture data is subject to the public provider's availability, coverage, and rate limit. Do not label fallback picks as live or data-driven.
- Standings fall back to a short labeled Premier League sample when the provider is unavailable. The match centre is not a second-by-second premium live-score service.
- Bookmaker URLs are `#`; ad slot IDs are placeholder strings and the AdSense script is not included.
- API fetching has no schema validation or durable monitoring. The public worldwide feed is useful but may be incomplete or temporarily unreachable.
- `npm run lint` currently passes, but its `next lint` script is deprecated in newer Next.js versions.

## Verification baseline

- Git baseline: `master`, commit `3ca06e7` (`Initial BebaTips checkpoint before Codex takeover`).
- Working tree was clean during takeover.
- `npm run build` passes; Next reports the expected generated routes and 18 static pages including generated blog pages.
- `npm run lint` passes with a deprecation notice about `next lint`.
- After the data reliability, calculator, responsible-play and commercial-separation work, `npm run lint` and the 21-page `npm run build` pass.
- Gameweek runtime baseline on 2026-09-07: 106 future fixtures over seven dates and 16 competitions; all 106 had league and club emblems, and 67 had current table-form signals. Homepage and accumulator routes returned HTTP 200 after adding the provider CDN wildcard.

## Recommended next step

Add a quota-aware API-Football adapter for selected match-detail pages (recent form, H2H, injuries and lineups), then add source health/freshness metadata. After that, build the server-side premium purchase workflow with durable orders, Daraja callback verification and delivery.

## Configuration

See `.env.example` for `FOOTBALL_DATA_API_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and `NEXT_PUBLIC_ADSENSE_CLIENT`. Do not commit real credentials.
