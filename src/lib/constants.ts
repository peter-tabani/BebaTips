export const SITE_NAME = "BebaTips";
export const SITE_URL = "https://bebatips.com";
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
  { id: "PD", name: "La Liga", country: "Spain", flag: "🇪🇸", code: 2014, emblem: "https://crests.football-data.org/PD.png" },
  { id: "SA", name: "Serie A", country: "Italy", flag: "🇮🇹", code: 2019, emblem: "https://crests.football-data.org/SA.png" },
  { id: "BL1", name: "Bundesliga", country: "Germany", flag: "🇩🇪", code: 2002, emblem: "https://crests.football-data.org/BL1.png" },
  { id: "CL", name: "Champions League", country: "Europe", flag: "🇪🇺", code: 2001, emblem: "https://crests.football-data.org/CL.png" },
  { id: "EL", name: "Europa League", country: "Europe", flag: "🇪🇺", code: 2018, emblem: "https://crests.football-data.org/EL.png" },
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
    id: "local-daily",
    name: "Daily",
    category: "standard",
    period: "day",
    price: 50,
    currency: "KES",
    description: "One-day access to local and international football analysis.",
    features: ["2–3 tips per covered match", "Form-based reasoning", "Daily access"],
  },
  {
    id: "local-weekly",
    name: "Weekly",
    category: "standard",
    period: "week",
    price: 200,
    currency: "KES",
    description: "Seven days of local and international football analysis.",
    features: ["2–3 tips per covered match", "Form-based reasoning", "7-day access"],
    popular: true,
  },
  {
    id: "local-monthly",
    name: "Monthly",
    category: "standard",
    period: "month",
    price: 500,
    currency: "KES",
    description: "Thirty days of local and international football analysis.",
    features: ["2–3 tips per covered match", "Local and international games", "30-day access"],
  },
  {
    id: "local-yearly",
    name: "Yearly",
    category: "standard",
    period: "year",
    price: 4000,
    currency: "KES",
    description: "One year of local and international football analysis.",
    features: ["2–3 tips per covered match", "Local and international games", "365-day access"],
  },
  {
    id: "jackpot-monthly",
    name: "Jackpot Monthly",
    category: "jackpot",
    period: "month",
    price: 200,
    currency: "KES",
    description: "Monthly jackpot analysis for supported Kenyan pools.",
    features: ["Pool-by-pool analysis", "Selection reasoning", "Monthly access"],
  },
  {
    id: "fixed-local-monthly",
    name: "Fixed Matches Analysis Monthly",
    category: "fixed",
    period: "month",
    price: 2000,
    currency: "KES",
    description: "High-detail monthly match analysis. Outcomes are never guaranteed.",
    features: ["2–3 tips per covered match", "Expanded evidence notes", "No guaranteed outcomes"],
  },
  {
    id: "fixed-local-yearly",
    name: "Fixed Matches Analysis Yearly",
    category: "fixed",
    period: "year",
    price: 20000,
    currency: "KES",
    description: "Annual high-detail match analysis. Outcomes are never guaranteed.",
    features: ["2–3 tips per covered match", "Expanded evidence notes", "No guaranteed outcomes"],
  },
] as const;

export const SOCIAL_LINKS = [
  { name: "X", href: "https://x.com/BebaTipsKe", label: "@BebaTipsKe" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61594427064452", label: "BebaTips" },
  { name: "Instagram", href: "https://www.instagram.com/bebatipske", label: "@bebatipske" },
  { name: "TikTok", href: "https://www.tiktok.com/@bebatips5", label: "@bebatips5" },
] as const;
