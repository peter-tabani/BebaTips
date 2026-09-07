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
}

export interface AccumulatorTip {
  id: string;
  title: string;
  totalOdds: string;
  legs: {
    time: string;
    prediction: string;
    match: string;
    league: string;
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
