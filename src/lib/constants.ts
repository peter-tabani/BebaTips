export const SITE_NAME = "BebaTips";
export const SITE_TAGLINE =
  "Expert football predictions & betting tips for Kenya and beyond";

export const NAV_LINKS = [
  { href: "/", label: "Predictions" },
  { href: "/accumulators", label: "Accumulators" },
  { href: "/premium", label: "Premium Tips" },
  { href: "/jackpots", label: "Jackpots" },
  { href: "/live-scores", label: "Live Scores" },
  { href: "/blog", label: "Blog" },
  { href: "/standings", label: "Standings" },
] as const;

export const MAJOR_LEAGUES = [
  { id: "PL", name: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: 2021 },
  { id: "CL", name: "Champions League", country: "Europe", flag: "🇪🇺", code: 2001 },
  { id: "EL", name: "Europa League", country: "Europe", flag: "🇪🇺", code: 2018 },
  { id: "BL1", name: "Bundesliga", country: "Germany", flag: "🇩🇪", code: 2002 },
  { id: "PD", name: "La Liga", country: "Spain", flag: "🇪🇸", code: 2014 },
  { id: "SA", name: "Serie A", country: "Italy", flag: "🇮🇹", code: 2019 },
  { id: "FL1", name: "Ligue 1", country: "France", flag: "🇫🇷", code: 2015 },
  { id: "DED", name: "Eredivisie", country: "Netherlands", flag: "🇳🇱", code: 2003 },
  { id: "PPL", name: "Primeira Liga", country: "Portugal", flag: "🇵🇹", code: 2017 },
  { id: "KPL", name: "Kenyan Premier League", country: "Kenya", flag: "🇰🇪", code: 0 },
] as const;

export const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";

export const PREMIUM_PLANS = [
  {
    id: "silver",
    name: "Silver Plan",
    odds: "3–5",
    price: 50,
    currency: "KSH",
    rating: 5,
    description:
      "Daily sure picks with 3–5 combined odds. Ideal for steady, consistent returns. Tips delivered instantly via SMS after purchase.",
    features: ["3–5 odds daily", "SMS delivery", "Major leagues covered", "Weekend specials"],
  },
  {
    id: "gold",
    name: "Gold Plan",
    odds: "5–8",
    price: 70,
    currency: "KSH",
    rating: 4.5,
    description:
      "Higher-value selections with 5–8 combined odds. Our most popular package among regular bettors on SportPesa and Betika.",
    features: ["5–8 odds daily", "SMS + WhatsApp", "Accumulator combos", "Priority support"],
    popular: true,
  },
  {
    id: "platinum",
    name: "Platinum Plan",
    odds: "8–15",
    price: 100,
    currency: "KSH",
    rating: 4,
    description:
      "Premium high-odds picks for experienced punters. Includes banker selections and jackpot companion tips.",
    features: ["8–15 odds daily", "Jackpot tips included", "VIP WhatsApp group", "Weekend mega acca"],
  },
] as const;
