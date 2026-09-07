import { FOOTBALL_DATA_BASE, MAJOR_LEAGUES } from "./constants";
import { getTipForMatch } from "./data";
import type { Match } from "./types";

interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: string;
  competition: { code: string; name: string };
  homeTeam: { name: string; shortName?: string };
  awayTeam: { name: string; shortName?: string };
}

function formatTime(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  });
}

function mapMatch(raw: FootballDataMatch): Match {
  const home = raw.homeTeam.shortName || raw.homeTeam.name;
  const away = raw.awayTeam.shortName || raw.awayTeam.name;
  const tip = getTipForMatch(home, away);

  return {
    id: raw.id,
    time: formatTime(raw.utcDate),
    league: raw.competition.name,
    leagueCode: raw.competition.code,
    homeTeam: home,
    awayTeam: away,
    tip,
    tipType: tip === "1" || tip === "Over 2.5" ? "free" : "premium",
    status: raw.status,
  };
}

const FALLBACK_MATCHES: Match[] = [
  { id: 1, time: "14:30", league: "Premier League", leagueCode: "PL", homeTeam: "Liverpool", awayTeam: "Nottm Forest", tip: "Over 2.5", tipType: "free" },
  { id: 2, time: "17:00", league: "Premier League", leagueCode: "PL", homeTeam: "Arsenal", awayTeam: "Brighton", tip: "1", tipType: "free" },
  { id: 3, time: "17:00", league: "Premier League", leagueCode: "PL", homeTeam: "Chelsea", awayTeam: "Fulham", tip: "GG", tipType: "free" },
  { id: 4, time: "19:30", league: "Premier League", leagueCode: "PL", homeTeam: "Man City", awayTeam: "Brentford", tip: "Over 2.5", tipType: "free" },
  { id: 5, time: "18:00", league: "La Liga", leagueCode: "PD", homeTeam: "Real Madrid", awayTeam: "Getafe", tip: "1", tipType: "free" },
  { id: 6, time: "20:45", league: "La Liga", leagueCode: "PD", homeTeam: "Barcelona", awayTeam: "Rayo Vallecano", tip: "Over 2.5", tipType: "premium" },
  { id: 7, time: "16:30", league: "Bundesliga", leagueCode: "BL1", homeTeam: "Bayern Munich", awayTeam: "Freiburg", tip: "1", tipType: "free" },
  { id: 8, time: "16:30", league: "Bundesliga", leagueCode: "BL1", homeTeam: "Dortmund", awayTeam: "Union Berlin", tip: "GG", tipType: "premium" },
  { id: 9, time: "20:45", league: "Serie A", leagueCode: "SA", homeTeam: "Inter Milan", awayTeam: "Atalanta", tip: "Over 2.5", tipType: "free" },
  { id: 10, time: "20:45", league: "Serie A", leagueCode: "SA", homeTeam: "Juventus", awayTeam: "Lazio", tip: "Under 3.5", tipType: "premium" },
  { id: 11, time: "21:00", league: "Ligue 1", leagueCode: "FL1", homeTeam: "PSG", awayTeam: "Toulouse", tip: "1", tipType: "free" },
  { id: 12, time: "19:00", league: "Ligue 1", leagueCode: "FL1", homeTeam: "Monaco", awayTeam: "Strasbourg", tip: "GG", tipType: "premium" },
  { id: 13, time: "18:45", league: "Eredivisie", leagueCode: "DED", homeTeam: "Ajax", awayTeam: "PSV", tip: "Over 2.5", tipType: "free" },
  { id: 14, time: "21:15", league: "Primeira Liga", leagueCode: "PPL", homeTeam: "Benfica", awayTeam: "Porto", tip: "1", tipType: "premium" },
  { id: 15, time: "15:00", league: "Kenyan Premier League", leagueCode: "KPL", homeTeam: "Gor Mahia", awayTeam: "AFC Leopards", tip: "1", tipType: "free" },
];

async function fetchLeagueMatches(
  leagueCode: number,
  apiKey: string,
  dateFrom: string,
  dateTo: string
): Promise<FootballDataMatch[]> {
  const url = `${FOOTBALL_DATA_BASE}/competitions/${leagueCode}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  const res = await fetch(url, {
    headers: { "X-Auth-Token": apiKey },
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.matches || [];
}

export async function getUpcomingMatches(dateOffset = 0): Promise<Match[]> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dateOffset);
  const dateStr = targetDate.toISOString().split("T")[0];

  if (!apiKey || apiKey === "your_api_key_here") {
    return FALLBACK_MATCHES;
  }

  try {
    const leagues = MAJOR_LEAGUES.filter((l) => l.code > 0);
    const results = await Promise.all(
      leagues.map((l) => fetchLeagueMatches(l.code, apiKey, dateStr, dateStr))
    );

    const allMatches = results.flat().filter((m) => m.status === "SCHEDULED" || m.status === "TIMED");

    if (allMatches.length === 0) {
      return FALLBACK_MATCHES;
    }

    return allMatches
      .map(mapMatch)
      .sort((a, b) => a.time.localeCompare(b.time));
  } catch {
    return FALLBACK_MATCHES;
  }
}

export function groupMatchesByLeague(matches: Match[]): Record<string, Match[]> {
  return matches.reduce(
    (groups, match) => {
      const key = match.league;
      if (!groups[key]) groups[key] = [];
      groups[key].push(match);
      return groups;
    },
    {} as Record<string, Match[]>
  );
}
