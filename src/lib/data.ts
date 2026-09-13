import type { AccumulatorTip, BlogPost, Bookmaker, JackpotPrediction } from "./types";

export const bookmakers: Bookmaker[] = [
  { rank: 1, name: "SportPesa", logo: "SP", bonus: "100% First Deposit", url: "#", color: "#006633" },
  { rank: 2, name: "Betika", logo: "BK", bonus: "50 KSH Free Bet", url: "#", color: "#e4002b" },
  { rank: 3, name: "1xBet", logo: "1X", bonus: "200% Bonus", url: "#", color: "#1a5276" },
  { rank: 4, name: "Betway", logo: "BW", bonus: "100% up to KSH 5,000", url: "#", color: "#00a826" },
  { rank: 5, name: "Mozzart Bet", logo: "MZ", bonus: "KSH 1,000 Bonus", url: "#", color: "#ff6600" },
  { rank: 6, name: "Odibets", logo: "OD", bonus: "150% Bonus", url: "#", color: "#003366" },
  { rank: 7, name: "22Bet", logo: "22", bonus: "100% Welcome", url: "#", color: "#0066cc" },
  { rank: 8, name: "Melbet", logo: "MB", bonus: "200% Bonus", url: "#", color: "#ffc107" },
];

export const dailyTips: Record<string, string> = {
  "Liverpool vs Nottingham Forest": "Over 2.5",
  "Arsenal vs Brighton": "1",
  "Chelsea vs Fulham": "GG",
  "Man City vs Brentford": "Over 2.5",
  "Real Madrid vs Getafe": "1",
  "Barcelona vs Rayo Vallecano": "Over 2.5",
  "Bayern Munich vs Freiburg": "1",
  "Dortmund vs Union Berlin": "GG",
  "Inter Milan vs Atalanta": "Over 2.5",
  "Juventus vs Lazio": "Under 3.5",
  "PSG vs Toulouse": "1",
  "Monaco vs Strasbourg": "GG",
  "Ajax vs PSV": "Over 2.5",
  "Benfica vs Porto": "1",
  "Gor Mahia vs AFC Leopards": "1",
};

export const accumulators: AccumulatorTip[] = [
  {
    id: "acca-1",
    title: "Saturday Premier League Acca",
    totalOdds: "12.4",
    result: "pending",
    legs: [
      { time: "14:30", prediction: "Liverpool Win", match: "Liverpool vs Nottm Forest", league: "EPL" },
      { time: "17:00", prediction: "Over 2.5 Goals", match: "Arsenal vs Brighton", league: "EPL" },
      { time: "17:00", prediction: "Both Teams Score", match: "Chelsea vs Fulham", league: "EPL" },
      { time: "19:30", prediction: "Man City Win", match: "Man City vs Brentford", league: "EPL" },
    ],
  },
  {
    id: "acca-2",
    title: "La Liga & Serie A Combo",
    totalOdds: "8.7",
    result: "won",
    legs: [
      { time: "18:00", prediction: "Real Madrid Win", match: "Real Madrid vs Getafe", league: "La Liga" },
      { time: "20:45", prediction: "Over 2.5 Goals", match: "Inter vs Atalanta", league: "Serie A" },
      { time: "20:45", prediction: "Barcelona Win", match: "Barcelona vs Rayo", league: "La Liga" },
    ],
  },
  {
    id: "acca-3",
    title: "Safe Bankers (Low Risk)",
    totalOdds: "3.2",
    result: "pending",
    legs: [
      { time: "16:30", prediction: "Bayern Win", match: "Bayern vs Freiburg", league: "Bundesliga" },
      { time: "21:00", prediction: "PSG Win", match: "PSG vs Toulouse", league: "Ligue 1" },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "sportpesa-mega-jackpot-guide-2026",
    title: "How to Play SportPesa Mega Jackpot — Complete Guide for 2026",
    excerpt:
      "Everything you need to know about picking Mega Jackpot games, stake amounts, and how our premium analysis can support your decisions.",
    date: "2026-08-27",
    category: "Jackpots",
    readTime: "6 min",
  },
  {
    slug: "bankroll-management-kenya",
    title: "Bankroll Management: Stop Losing Money on Football Bets",
    excerpt:
      "Most Kenyan punters lose because they chase losses. Here is a simple staking plan that works with KSH 500 or KSH 50,000.",
    date: "2026-08-24",
    category: "Strategy",
    readTime: "8 min",
  },
  {
    slug: "premier-league-weekend-preview",
    title: "Premier League Matchday Preview — Who to Back This Weekend",
    excerpt:
      "Form guide, head-to-head stats, and our top picks for every Saturday and Sunday fixture in the English top flight.",
    date: "2026-08-22",
    category: "Predictions",
    readTime: "5 min",
  },
  {
    slug: "both-teams-to-score-tips",
    title: "BTTS Tips: When Both Teams to Score Actually Pays Off",
    excerpt:
      "Not every high-scoring league is good for BTTS. We break down the stats behind our GG picks.",
    date: "2026-08-19",
    category: "Markets",
    readTime: "4 min",
  },
];

export const jackpots: JackpotPrediction[] = [
  {
    provider: "SportPesa",
    name: "Mega Jackpot",
    prize: "KSH 100,000,000+",
    deadline: "Saturday 15:00 EAT",
    picks: [
      { match: "Liverpool vs Nottm Forest", prediction: "1" },
      { match: "Arsenal vs Brighton", prediction: "1" },
      { match: "Chelsea vs Fulham", prediction: "X" },
      { match: "Man City vs Brentford", prediction: "1" },
      { match: "Tottenham vs Everton", prediction: "1" },
      { match: "West Ham vs Crystal Palace", prediction: "2" },
      { match: "Wolves vs Newcastle", prediction: "2" },
      { match: "Aston Villa vs Leicester", prediction: "1" },
      { match: "Bournemouth vs Ipswich", prediction: "1" },
      { match: "Southampton vs Nottm Forest", prediction: "X" },
      { match: "Real Madrid vs Getafe", prediction: "1" },
      { match: "Barcelona vs Rayo", prediction: "1" },
      { match: "Bayern vs Freiburg", prediction: "1" },
      { match: "Dortmund vs Union Berlin", prediction: "1" },
      { match: "Inter vs Atalanta", prediction: "1" },
      { match: "Juventus vs Lazio", prediction: "X" },
      { match: "PSG vs Toulouse", prediction: "1" },
    ],
  },
  {
    provider: "Betika",
    name: "Midweek Jackpot",
    prize: "KSH 15,000,000",
    deadline: "Wednesday 18:00 EAT",
    picks: [
      { match: "Ajax vs PSV", prediction: "1" },
      { match: "Benfica vs Porto", prediction: "X" },
      { match: "Monaco vs Strasbourg", prediction: "1" },
      { match: "Sevilla vs Villarreal", prediction: "2" },
      { match: "Roma vs Napoli", prediction: "2" },
      { match: "Leverkusen vs Stuttgart", prediction: "1" },
      { match: "Marseille vs Lyon", prediction: "1" },
      { match: "Celtic vs Rangers", prediction: "1" },
      { match: "Galatasaray vs Fenerbahce", prediction: "X" },
      { match: "Braga vs Sporting", prediction: "2" },
      { match: "Club Brugge vs Anderlecht", prediction: "1" },
      { match: "Red Star vs Partizan", prediction: "1" },
      { match: "Feyenoord vs Utrecht", prediction: "1" },
      { match: "Lille vs Nice", prediction: "1" },
      { match: "Fiorentina vs Bologna", prediction: "X" },
    ],
  },
];

export function getTipForMatch(home: string, away: string): string {
  const key = `${home} vs ${away}`;
  const reverseKey = `${away} vs ${home}`;

  if (dailyTips[key]) return dailyTips[key];
  if (dailyTips[reverseKey]) return dailyTips[reverseKey];

  const tips = ["Over 2.5", "GG", "1", "Under 3.5", "2", "1X", "X2"];
  const hash = (home + away).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return tips[hash % tips.length];
}
