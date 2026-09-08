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
  { href: "/calculator", label: "Calculator" },
] as const;

export const MAJOR_LEAGUES = [
  { id: "PL", name: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: 2021, emblem: "https://crests.football-data.org/PL.png" },
  { id: "CL", name: "Champions League", country: "Europe", flag: "🇪🇺", code: 2001, emblem: "https://crests.football-data.org/CL.png" },
  { id: "EL", name: "Europa League", country: "Europe", flag: "🇪🇺", code: 2018, emblem: "https://crests.football-data.org/EL.png" },
  { id: "BL1", name: "Bundesliga", country: "Germany", flag: "🇩🇪", code: 2002, emblem: "https://crests.football-data.org/BL1.png" },
  { id: "PD", name: "La Liga", country: "Spain", flag: "🇪🇸", code: 2014, emblem: "https://crests.football-data.org/PD.png" },
  { id: "SA", name: "Serie A", country: "Italy", flag: "🇮🇹", code: 2019, emblem: "https://crests.football-data.org/SA.png" },
  { id: "FL1", name: "Ligue 1", country: "France", flag: "🇫🇷", code: 2015, emblem: "https://crests.football-data.org/FL1.png" },
  { id: "DED", name: "Eredivisie", country: "Netherlands", flag: "🇳🇱", code: 2003, emblem: "https://crests.football-data.org/ED.png" },
  { id: "PPL", name: "Primeira Liga", country: "Portugal", flag: "🇵🇹", code: 2017, emblem: "https://crests.football-data.org/PPL.png" },
  { id: "KPL", name: "Kenyan Premier League", country: "Kenya", flag: "🇰🇪", code: 0, emblem: null },
] as const;

export const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";
export const SPORTS_DB_BASE = "https://www.thesportsdb.com/api/v1/json/123";
export const API_FOOTBALL_BASE = "https://v3.football.api-sports.io";

export const PREMIUM_PLANS = [
  {
    id: "silver",
    name: "Silver Plan",
    odds: "3–5",
    price: 50,
    currency: "KSH",
    rating: 5,
    description:
      "A compact daily selection targeting 3–5 combined decimal odds, with the reasoning shown for each leg.",
    features: ["3–5 target odds", "Selection reasoning", "Major leagues covered", "Weekend review"],
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
    features: ["5–8 target odds", "Selection reasoning", "Accumulator combinations", "Result tracking"],
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
    features: ["8–15 target odds", "Jackpot companion analysis", "Method notes", "Weekend accumulator"],
  },
] as const;
