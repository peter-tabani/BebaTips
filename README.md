# BebaTips

Football predictions and betting tips website — built for traffic, clicks, and premium tip sales.

## Features

- **Daily predictions** from major leagues (Premier League, La Liga, Serie A, Bundesliga, etc.)
- **Premium tips** — Silver, Gold, Platinum plans with M-Pesa checkout flow
- **Accumulators** — daily multi-match combos
- **Jackpot predictions** — SportPesa Mega Jackpot & Betika Midweek
- **Blog** — SEO articles on betting strategy
- **Ad slots** — ready for Google AdSense (leaderboard, skyscraper, rectangle, mobile)
- **Bookmaker affiliate section** — ranked list with bonus offers
- **Responsive** — works on desktop and mobile
- **WhatsApp button** — direct contact for premium subscribers
- **Cookie consent** — GDPR-style banner

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `FOOTBALL_DATA_API_KEY` | Free key from [football-data.org](https://www.football-data.org/client/register) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number (no + prefix) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher ID |

Without an API key, the site uses realistic fallback match data.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — match predictions table |
| `/premium` | Premium tip plans |
| `/premium/checkout` | M-Pesa payment flow |
| `/accumulators` | Accumulator tips |
| `/jackpots` | Jackpot predictions |
| `/live-scores` | Today's fixtures |
| `/blog` | Betting articles |
| `/standings` | League table |
| `/match/[id]` | Match detail + tip |

## Deploy

Works on Vercel, Netlify, or any Node.js host:

```bash
npm run build
npm start
```

## Next Steps

1. Register for a [football-data.org](https://www.football-data.org/) API key
2. Set up Google AdSense and replace ad slot IDs
3. Integrate M-Pesa STK Push (Safaricom Daraja API) for real payments
4. Connect an SMS gateway (Africa's Talking, Twilio) for tip delivery
5. Replace bookmaker `#` links with your affiliate URLs
