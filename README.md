# BebaTips

Mobile-first football fixtures, league data, transparent match signals, betting tools, editorial content, and future premium analysis for Kenya.

## Features

- **Automatic gameweek fixtures** from an official major-league feed plus a public worldwide soccer feed
- **League and club logos** supplied automatically by the fixture providers
- **Transparent table-form signals** based on current points-per-game and home advantage
- **Multi-league standings** with W/D/L, goals, points and recent form
- **Free odds calculator** — returns, profit, implied probability and accumulator odds
- **Kenya and international premium plans** — daily, weekly, monthly and yearly pricing with 2–3 selections per covered match
- **Accumulator watchlist** — generated from upcoming matches with current table-form evidence; no invented odds
- **Jackpot predictions** — SportPesa Mega Jackpot & Betika Midweek
- **Blog** — SEO articles on betting strategy
- **Ad slots** — ready for Google AdSense (leaderboard, skyscraper, rectangle, mobile)
- **Bookmaker comparison framework** — outbound links stay disabled until licensing and offers are verified
- **Responsive** — works on desktop and mobile
- **WhatsApp button** — direct contact for premium subscribers
- **Responsible gambling** — persistent 18+ notice and practical guidance page

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), or use `npm run dev -- -p 3001` if port 3000 is occupied.

## Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `FOOTBALL_DATA_API_KEY` | Free key from [football-data.org](https://www.football-data.org/client/register) |
| `API_FOOTBALL_KEY` | Match form, injuries, lineups and head-to-head data |
| `DEEPSEEK_API_KEY` | Cached AI match briefings and premium selections |
| `CRON_SECRET` | Secures scheduled refresh endpoints |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, normally `https://bebatips.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number (no + prefix) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher ID |

With a key, major-league fixtures, standings and form signals refresh automatically. The homepage also merges TheSportsDB&apos;s public worldwide fixtures, while clearly labeled samples are used only during a complete upstream outage.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — next seven days of fixtures, logos and form signals |
| `/premium` | Premium tip plans |
| `/premium/checkout` | Checkout preview; no real payment yet |
| `/accumulators` | Live gameweek form shortlist |
| `/jackpots` | Jackpot predictions |
| `/live-scores` | Historical results, current matches and future fixtures with date filters |
| `/blog` | Betting articles |
| `/standings` | Multi-league tables and recent form |
| `/match/[id]` | Match detail + tip |
| `/calculator` | Returns, profit, probability and accumulator calculator |
| `/responsible-gambling` | Limits, warning signs and help guidance |
| `/bookmakers` | Review-only bookmaker comparison framework |

## Deploy

Works on Vercel, Netlify, or any Node.js host:

```bash
npm run build
npm start
```

## Next Steps

1. Connect `bebatips.com` to the Vercel project and update its DNS records
2. Supply the final fixture-feed documentation, credentials and permitted coverage
3. Integrate M-Pesa and an international payment gateway for real payments
4. Connect the chosen subscriber delivery channel (web account, WhatsApp, SMS or email)
5. Set up Google AdSense and replace ad slot IDs
6. Verify each operator&apos;s current Kenyan licence and advertising approval before activating any sponsored link
