export interface Match {
  id: number;
  time: string;
  league: string;
  leagueCode: string;
  homeTeam: string;
  awayTeam: string;
  tip: string;
  tipType: "free" | "premium";
  odds?: string;
  status?: string;
  source?: "football-data" | "sports-db" | "fallback";
  analysis?: string;
  date?: string;
  leagueLogo?: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  matchday?: number;
  homeScore?: number | null;
  awayScore?: number | null;
}

export interface MatchResult {
  date: string;
  opponent: string;
  home: boolean;
  score: string;
  outcome: "W" | "D" | "L";
}

export interface MatchInjury {
  team: string;
  player: string;
  type?: string;
  reason?: string;
}

export interface MatchLineup {
  team: string;
  coach?: string;
  formation?: string;
  starters: string[];
  substitutes: string[];
}

export interface MatchInsights {
  provider: "api-football";
  fetchedAt: string;
  fixtureId: number;
  quota?: { remaining?: number; limit?: number };
  aiBriefing?: {
    provider: "deepseek";
    summary: string;
    angle: string;
    confidence: "low" | "medium" | "high";
    tips: string[];
    generatedAt: string;
  };
  recentForm: { team: string; results: MatchResult[] }[];
  headToHead: MatchResult[];
  injuries: MatchInjury[];
  lineups: MatchLineup[];
}

export interface LeagueStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: string[];
}

export interface AccumulatorTip {
  id: string;
  title: string;
  totalOdds?: string;
  badge?: string;
  legs: {
    time: string;
    prediction: string;
    match: string;
    league: string;
    date?: string;
    matchId?: number;
  }[];
  result?: "won" | "lost" | "pending";
}

export interface Bookmaker {
  rank: number;
  name: string;
  logo: string;
  bonus: string;
  url: string;
  color: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

export interface JackpotPrediction {
  provider: string;
  name: string;
  prize: string;
  picks: { match: string; prediction: string }[];
  deadline: string;
}
