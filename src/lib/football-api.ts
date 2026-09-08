import { API_FOOTBALL_BASE, FOOTBALL_DATA_BASE, MAJOR_LEAGUES, SPORTS_DB_BASE } from "./constants";
import type { AccumulatorTip, LeagueStanding, Match, MatchInjury, MatchInsights, MatchLineup, MatchResult } from "./types";
import { unstable_cache } from "next/cache";

interface ApiFootballFixture {
  fixture: { id: number; date: string };
  teams: { home: { id: number; name: string; winner?: boolean | null }; away: { id: number; name: string; winner?: boolean | null } };
  goals: { home: number | null; away: number | null };
}

interface ApiFootballResponse<T> { response?: T[]; errors?: Record<string, string>; }
interface ApiFootballInjury { team?: { name?: string }; player?: { name?: string }; type?: string; reason?: string; }
interface ApiFootballLineup { team?: { name?: string }; coach?: { name?: string }; formation?: string; startXI?: { player: { name: string } }[]; substitutes?: { player: { name: string } }[]; }
interface DeepSeekBriefing {
  summary?: string;
  angle?: string;
  confidence?: "low" | "medium" | "high";
}

const requestCachedDeepSeek = unstable_cache(
  async (prompt: string): Promise<string | null> => {
    const key = deepSeekKey();
    if (!key) return null;
    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          temperature: 0.1,
          max_tokens: 180,
          messages: [
            { role: "system", content: "You produce concise, evidence-bound football analysis." },
            { role: "user", content: prompt },
          ],
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) return null;
      const payload = (await response.json()) as { choices?: { message?: { content?: string } }[] };
      return payload.choices?.[0]?.message?.content?.trim() || null;
    } catch {
      return null;
    }
  },
  ["deepseek-match-briefing"],
  { revalidate: 86400 },
);

let apiFootballQuota: { remaining?: number; limit?: number } = {};

function apiFootballKey(): string | null {
  const key = process.env.API_FOOTBALL_KEY;
  return key && key !== "your_api_key_here" ? key : null;
}

function deepSeekKey(): string | null {
  const key = process.env.DEEPSEEK_API_KEY;
  return key && key !== "your_api_key_here" ? key : null;
}

async function fetchApiFootball<T>(path: string): Promise<T[] | null> {
  const key = apiFootballKey();
  if (!key || apiFootballQuota.remaining === 0) return null;
  try {
    const res = await fetch(`${API_FOOTBALL_BASE}${path}`, {
      headers: { "x-apisports-key": key },
      next: { revalidate: apiFootballRevalidate(path) },
    });
    const remaining = Number(res.headers.get("x-ratelimit-requests-remaining"));
    const limit = Number(res.headers.get("x-ratelimit-requests-limit"));
    if (Number.isFinite(remaining)) apiFootballQuota.remaining = remaining;
    if (Number.isFinite(limit)) apiFootballQuota.limit = limit;
    if (!res.ok) return null;
    const data = (await res.json()) as ApiFootballResponse<T>;
    return data.response || [];
  } catch {
    return null;
  }
}

function apiFootballRevalidate(path: string): number {
  if (path.includes("/fixtures/lineups")) return 300;
  if (path.includes("/injuries")) return 3600;
  if (path.includes("headtohead") || path.includes("last=5")) return 86400;
  return 900;
}

function comparableTeam(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

function teamsMatch(a: string, b: string): boolean {
  const left = comparableTeam(a);
  const right = comparableTeam(b);
  return left === right || left.includes(right) || right.includes(left);
}

function resultFromFixture(fixture: ApiFootballFixture, team: string): MatchResult {
  const home = teamsMatch(fixture.teams.home.name, team);
  const own = home ? fixture.goals.home : fixture.goals.away;
  const opponent = home ? fixture.teams.away.name : fixture.teams.home.name;
  const other = home ? fixture.goals.away : fixture.goals.home;
  const outcome = own === other ? "D" : own !== null && other !== null && own > other ? "W" : "L";
  return { date: fixture.fixture.date.slice(0, 10), opponent, home, score: `${own ?? "-"}-${other ?? "-"}`, outcome };
}

async function resolveApiFootballFixture(match: Match): Promise<ApiFootballFixture | null> {
  if (!match.date) return null;
  const fixtures = await fetchApiFootball<ApiFootballFixture>(`/fixtures?date=${match.date}`);
  return fixtures?.find((fixture) => teamsMatch(fixture.teams.home.name, match.homeTeam) && teamsMatch(fixture.teams.away.name, match.awayTeam)) || null;
}

async function generateDeepSeekBriefing(
  match: Match,
  recentForm: { team: string; results: MatchResult[] }[],
  headToHead: MatchResult[],
  injuries: MatchInjury[],
): Promise<MatchInsights["aiBriefing"]> {
  const key = deepSeekKey();
  if (!key) return undefined;

  const input = {
    fixture: `${match.homeTeam} vs ${match.awayTeam}`,
    competition: match.league,
    kickoffEAT: `${match.date || "upcoming"} ${match.time}`,
    tableSignal: match.analysis || "Unavailable",
    recentForm: recentForm.map((item) => ({
      team: item.team,
      results: item.results.map((result) => `${result.outcome} (${result.score})`),
    })),
    headToHead: headToHead.map((result) => `${result.date}: ${result.score} vs ${result.opponent}`),
    injuries: injuries.map((item) => `${item.player} (${item.team})${item.reason ? ` - ${item.reason}` : ""}`),
  };

  const prompt = `You are a careful football data analyst for BebaTips. Analyze only the supplied data; do not invent odds, injuries, lineups, or facts. Return valid JSON only with exactly three fields: summary (one concise sentence), angle (a cautious 2-5 word label such as Home edge, Away edge, Goals watch, or Avoid), and confidence (low, medium, or high). This is informational decision support, not a guarantee or financial advice. Data: ${JSON.stringify(input)}`;

  try {
    const content = await requestCachedDeepSeek(prompt);
    if (!content) return undefined;
    const parsed = JSON.parse(content.replace(/^```json\s*/i, "").replace(/\s*```$/i, "")) as DeepSeekBriefing;
    if (!parsed.summary || !parsed.angle || !parsed.confidence || !["low", "medium", "high"].includes(parsed.confidence)) return undefined;
    return {
      provider: "deepseek",
      summary: parsed.summary.slice(0, 320),
      angle: parsed.angle.slice(0, 40),
      confidence: parsed.confidence,
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return undefined;
  }
}

export async function getMatchInsights(match: Match): Promise<MatchInsights | null> {
  if (!apiFootballKey()) return null;
  const fixture = await resolveApiFootballFixture(match);
  if (!fixture) return null;
  const [homeRecent, awayRecent, h2h, injuries, lineups] = await Promise.all([
    fetchApiFootball<ApiFootballFixture>(`/fixtures?team=${fixture.teams.home.id}&last=5`),
    fetchApiFootball<ApiFootballFixture>(`/fixtures?team=${fixture.teams.away.id}&last=5`),
    fetchApiFootball<ApiFootballFixture>(`/fixtures/headtohead?h2h=${fixture.teams.home.id}-${fixture.teams.away.id}&last=5`),
    fetchApiFootball<ApiFootballInjury>(`/injuries?fixture=${fixture.fixture.id}`),
    fetchApiFootball<ApiFootballLineup>(`/fixtures/lineups?fixture=${fixture.fixture.id}`),
  ]);
  const recentForm = [
    { team: fixture.teams.home.name, results: (homeRecent || []).map((item) => resultFromFixture(item, fixture.teams.home.name)).reverse() },
    { team: fixture.teams.away.name, results: (awayRecent || []).map((item) => resultFromFixture(item, fixture.teams.away.name)).reverse() },
  ];
  const headToHead = (h2h || []).map((item) => resultFromFixture(item, fixture.teams.home.name)).reverse();
  const mappedInjuries = (injuries || []).map((item): MatchInjury => ({ team: item.team?.name || "", player: item.player?.name || "Unknown player", type: item.type, reason: item.reason })).filter((item) => item.team && item.player);
  const aiBriefing = await generateDeepSeekBriefing(match, recentForm, headToHead, mappedInjuries);
  return {
    provider: "api-football",
    fetchedAt: new Date().toISOString(),
    fixtureId: fixture.fixture.id,
    quota: apiFootballQuota,
    aiBriefing,
    recentForm,
    headToHead,
    injuries: mappedInjuries,
    lineups: (lineups || []).map((item): MatchLineup => ({ team: item.team?.name || "Unknown team", coach: item.coach?.name, formation: item.formation, starters: (item.startXI || []).map((row) => row.player.name), substitutes: (item.substitutes || []).map((row) => row.player.name) })),
  };
}

export async function warmUpcomingMatchInsights(limit = 12): Promise<{ attempted: number; refreshed: number }> {
  if (!apiFootballKey()) return { attempted: 0, refreshed: 0 };
  const matches = (await getUpcomingGameweekMatches(7))
    .filter((match) => match.source !== "fallback" && match.status !== "FINISHED")
    .slice(0, Math.max(1, Math.min(20, limit)));
  const results = await Promise.allSettled(matches.map((match) => getMatchInsights(match)));
  return { attempted: matches.length, refreshed: results.filter((result) => result.status === "fulfilled" && result.value !== null).length };
}

interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: string;
  competition: { code: string; name: string; emblem?: string };
  homeTeam: { id: number; name: string; shortName?: string; crest?: string };
  awayTeam: { id: number; name: string; shortName?: string; crest?: string };
  matchday?: number;
}

interface FootballDataStanding {
  position: number;
  team: { id: number; name: string; shortName?: string };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: string;
}

interface FootballDataStandingsResponse {
  standings?: { type: string; table: FootballDataStanding[] }[];
}

interface SportsDbEvent {
  idEvent: string;
  idLeague?: string;
  dateEvent: string;
  strTime?: string;
  strTimestamp?: string;
  strLeague: string;
  strHomeTeam: string;
  strAwayTeam: string;
  strStatus?: string;
  strLeagueBadge?: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
}

const SPORTS_DB_LEAGUES: Record<string, { code: string; name: string }> = {
  "English Premier League": { code: "PL", name: "Premier League" },
  "UEFA Champions League": { code: "CL", name: "Champions League" },
  "UEFA Europa League": { code: "EL", name: "Europa League" },
  "German Bundesliga": { code: "BL1", name: "Bundesliga" },
  "Spanish La Liga": { code: "PD", name: "La Liga" },
  "Italian Serie A": { code: "SA", name: "Serie A" },
  "French Ligue 1": { code: "FL1", name: "Ligue 1" },
  "Dutch Eredivisie": { code: "DED", name: "Eredivisie" },
  "Portuguese Primeira Liga": { code: "PPL", name: "Primeira Liga" },
};

function formatTime(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  });
}

function getTableSignal(
  raw: FootballDataMatch,
  table: Map<number, FootballDataStanding>
): Pick<Match, "tip" | "tipType" | "analysis"> | null {
  const home = table.get(raw.homeTeam.id);
  const away = table.get(raw.awayTeam.id);
  if (!home || !away || home.playedGames === 0 || away.playedGames === 0) return null;

  const homePointsPerGame = home.points / home.playedGames;
  const awayPointsPerGame = away.points / away.playedGames;
  const homeAdvantage = homePointsPerGame - awayPointsPerGame + 0.2;
  const tip =
    homeAdvantage >= 0.65 ? "1" : homeAdvantage >= 0.15 ? "1X" : homeAdvantage <= -0.45 ? "2" : "X2";

  return {
    tip,
    tipType: "free",
    analysis: `Table form: ${raw.homeTeam.shortName || raw.homeTeam.name} are ${home.position}${ordinal(home.position)} (${homePointsPerGame.toFixed(1)} pts/game); ${raw.awayTeam.shortName || raw.awayTeam.name} are ${away.position}${ordinal(away.position)} (${awayPointsPerGame.toFixed(1)} pts/game).`,
  };
}

function formatDateKey(utcDate: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Africa/Nairobi",
  }).formatToParts(new Date(utcDate));
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function ordinal(position: number): string {
  const remainder = position % 100;
  if (remainder >= 11 && remainder <= 13) return "th";
  if (position % 10 === 1) return "st";
  if (position % 10 === 2) return "nd";
  if (position % 10 === 3) return "rd";
  return "th";
}

function mapMatch(raw: FootballDataMatch, table = new Map<number, FootballDataStanding>()): Match {
  const home = raw.homeTeam.shortName || raw.homeTeam.name;
  const away = raw.awayTeam.shortName || raw.awayTeam.name;
  const signal = getTableSignal(raw, table);
  const tip = signal?.tip || "Stats soon";

  return {
    id: raw.id,
    time: formatTime(raw.utcDate),
    league: raw.competition.name,
    leagueCode: raw.competition.code,
    homeTeam: home,
    awayTeam: away,
    tip,
    tipType: "free",
    status: raw.status,
    source: "football-data",
    analysis: signal?.analysis,
    date: formatDateKey(raw.utcDate),
    leagueLogo: raw.competition.emblem,
    homeTeamLogo: raw.homeTeam.crest,
    awayTeamLogo: raw.awayTeam.crest,
    matchday: raw.matchday,
  };
}

function sportsDbTime(raw: SportsDbEvent): string {
  const timestamp = raw.strTimestamp || `${raw.dateEvent}T${raw.strTime || "00:00:00"}Z`;
  return formatTime(timestamp);
}

function mapSportsDbMatch(raw: SportsDbEvent): Match | null {
  if (!raw.strLeague || !raw.strHomeTeam || !raw.strAwayTeam) return null;
  const knownLeague = SPORTS_DB_LEAGUES[raw.strLeague];
  const league = knownLeague || {
    code: `TSDB-${raw.idLeague || raw.strLeague.toUpperCase().replace(/[^A-Z0-9]/g, "-")}`,
    name: raw.strLeague,
  };

  return {
    id: -Math.abs(Number(raw.idEvent)),
    time: sportsDbTime(raw),
    league: league.name,
    leagueCode: league.code,
    homeTeam: raw.strHomeTeam,
    awayTeam: raw.strAwayTeam,
    tip: "Stats soon",
    tipType: "free",
    status: raw.strStatus || "Scheduled",
    source: "sports-db",
    date: raw.dateEvent,
    leagueLogo: raw.strLeagueBadge,
    homeTeamLogo: raw.strHomeTeamBadge,
    awayTeamLogo: raw.strAwayTeamBadge,
  };
}

const FALLBACK_MATCHES: Match[] = [
  { id: 1, time: "14:30", league: "Premier League", leagueCode: "PL", homeTeam: "Liverpool", awayTeam: "Nottm Forest", tip: "Over 2.5", tipType: "free", source: "fallback" },
  { id: 2, time: "17:00", league: "Premier League", leagueCode: "PL", homeTeam: "Arsenal", awayTeam: "Brighton", tip: "1", tipType: "free", source: "fallback" },
  { id: 3, time: "17:00", league: "Premier League", leagueCode: "PL", homeTeam: "Chelsea", awayTeam: "Fulham", tip: "GG", tipType: "free", source: "fallback" },
  { id: 4, time: "19:30", league: "Premier League", leagueCode: "PL", homeTeam: "Man City", awayTeam: "Brentford", tip: "Over 2.5", tipType: "free", source: "fallback" },
  { id: 5, time: "18:00", league: "La Liga", leagueCode: "PD", homeTeam: "Real Madrid", awayTeam: "Getafe", tip: "1", tipType: "free", source: "fallback" },
  { id: 6, time: "20:45", league: "La Liga", leagueCode: "PD", homeTeam: "Barcelona", awayTeam: "Rayo Vallecano", tip: "Over 2.5", tipType: "premium", source: "fallback" },
  { id: 7, time: "16:30", league: "Bundesliga", leagueCode: "BL1", homeTeam: "Bayern Munich", awayTeam: "Freiburg", tip: "1", tipType: "free", source: "fallback" },
  { id: 8, time: "16:30", league: "Bundesliga", leagueCode: "BL1", homeTeam: "Dortmund", awayTeam: "Union Berlin", tip: "GG", tipType: "premium", source: "fallback" },
  { id: 9, time: "20:45", league: "Serie A", leagueCode: "SA", homeTeam: "Inter Milan", awayTeam: "Atalanta", tip: "Over 2.5", tipType: "free", source: "fallback" },
  { id: 10, time: "20:45", league: "Serie A", leagueCode: "SA", homeTeam: "Juventus", awayTeam: "Lazio", tip: "Under 3.5", tipType: "premium", source: "fallback" },
  { id: 11, time: "21:00", league: "Ligue 1", leagueCode: "FL1", homeTeam: "PSG", awayTeam: "Toulouse", tip: "1", tipType: "free", source: "fallback" },
  { id: 12, time: "19:00", league: "Ligue 1", leagueCode: "FL1", homeTeam: "Monaco", awayTeam: "Strasbourg", tip: "GG", tipType: "premium", source: "fallback" },
  { id: 13, time: "18:45", league: "Eredivisie", leagueCode: "DED", homeTeam: "Ajax", awayTeam: "PSV", tip: "Over 2.5", tipType: "free", source: "fallback" },
  { id: 14, time: "21:15", league: "Primeira Liga", leagueCode: "PPL", homeTeam: "Benfica", awayTeam: "Porto", tip: "1", tipType: "premium", source: "fallback" },
  { id: 15, time: "15:00", league: "Kenyan Premier League", leagueCode: "KPL", homeTeam: "Gor Mahia", awayTeam: "AFC Leopards", tip: "1", tipType: "free", source: "fallback" },
];

async function fetchMatches(
  apiKey: string,
  dateFrom: string,
  dateTo: string
): Promise<FootballDataMatch[]> {
  const url = `${FOOTBALL_DATA_BASE}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  const res = await fetch(url, {
    headers: { "X-Auth-Token": apiKey },
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.matches || [];
}

async function fetchLeagueTable(
  competitionCode: string,
  apiKey: string
): Promise<FootballDataStanding[]> {
  const url = `${FOOTBALL_DATA_BASE}/competitions/${competitionCode}/standings`;
  const res = await fetch(url, {
    headers: { "X-Auth-Token": apiKey },
    next: { revalidate: 900 },
  });
  if (!res.ok) return [];

  const data = (await res.json()) as FootballDataStandingsResponse;
  return data.standings?.find((standing) => standing.type === "TOTAL")?.table || [];
}

async function fetchSportsDbMatches(date: string): Promise<Match[]> {
  const url = `${SPORTS_DB_BASE}/eventsday.php?d=${date}&s=Soccer`;
  const res = await fetch(url, {
    next: { revalidate: 900 },
    signal: AbortSignal.timeout(6500),
  });
  if (!res.ok) return [];

  const data = (await res.json()) as { events?: SportsDbEvent[] };
  return (data.events || [])
    .map(mapSportsDbMatch)
    .filter((match): match is Match => match !== null)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function dateFromOffset(offset: number): string {
  const target = new Date();
  target.setHours(12, 0, 0, 0);
  target.setDate(target.getDate() + offset);
  return formatDateKey(target.toISOString());
}

function addDays(date: string, days: number): string {
  const target = new Date(`${date}T12:00:00Z`);
  target.setUTCDate(target.getUTCDate() + days);
  return target.toISOString().split("T")[0];
}

function fixtureKey(match: Match): string {
  const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `${match.date}|${normalise(match.homeTeam)}|${normalise(match.awayTeam)}`;
}

function mergeMatches(primary: Match[], secondary: Match[]): Match[] {
  const fixtures = new Map<string, Match>();
  for (const match of [...secondary, ...primary]) fixtures.set(fixtureKey(match), match);
  return [...fixtures.values()].sort((a, b) =>
    `${a.date || ""}T${a.time}`.localeCompare(`${b.date || ""}T${b.time}`)
  );
}

async function mapFootballDataMatches(rawMatches: FootballDataMatch[], apiKey: string): Promise<Match[]> {
  if (rawMatches.length === 0) return [];
  const competitionCodes = [...new Set(rawMatches.map((match) => match.competition.code))];
  const tables = await Promise.all(
    competitionCodes.map(async (code) => [code, await fetchLeagueTable(code, apiKey)] as const)
  );
  const tablesByCompetition = new Map(
    tables.map(([code, table]) => [code, new Map(table.map((row) => [row.team.id, row]))])
  );
  return rawMatches.map((match) => mapMatch(match, tablesByCompetition.get(match.competition.code)));
}

export async function getUpcomingGameweekMatches(days = 7): Promise<Match[]> {
  const safeDays = Math.max(1, Math.min(7, days));
  const startDate = dateFromOffset(0);
  const dateKeys = Array.from({ length: safeDays }, (_, index) => addDays(startDate, index));
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  const publicRequest = Promise.allSettled(dateKeys.map(fetchSportsDbMatches)).then((results) =>
    results.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
  );

  let officialMatches: Match[] = [];
  if (apiKey && apiKey !== "your_api_key_here") {
    try {
      const majorLeagueCodes = new Set(MAJOR_LEAGUES.map((league) => league.id));
      const raw = (await fetchMatches(apiKey, startDate, addDays(startDate, safeDays))).filter(
        (match) =>
          majorLeagueCodes.has(match.competition.code as (typeof MAJOR_LEAGUES)[number]["id"]) &&
          ["SCHEDULED", "TIMED", "IN_PLAY", "PAUSED"].includes(match.status)
      );
      officialMatches = await mapFootballDataMatches(raw, apiKey);
    } catch {
      // The worldwide public feed can still populate the gameweek.
    }
  }

  const publicMatches = await publicRequest;
  const upcoming = mergeMatches(officialMatches, publicMatches).filter(
    (match) => !match.date || dateKeys.includes(match.date)
  );
  return upcoming.length > 0 ? upcoming : FALLBACK_MATCHES;
}

export async function getUpcomingMatches(dateOffset = 0): Promise<Match[]> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  const dateStr = dateFromOffset(dateOffset);
  const targetDate = new Date(`${dateStr}T12:00:00Z`);
  const endDate = new Date(targetDate);
  if (dateOffset === 0) endDate.setDate(endDate.getDate() + 7);
  const endDateStr = endDate.toISOString().split("T")[0];

  if (apiKey && apiKey !== "your_api_key_here") {
    try {
    const majorLeagueCodes = new Set(MAJOR_LEAGUES.map((league) => league.id));
    const availableMatches = (await fetchMatches(apiKey, dateStr, endDateStr)).filter(
      (match) =>
        majorLeagueCodes.has(match.competition.code as (typeof MAJOR_LEAGUES)[number]["id"]) &&
        ["SCHEDULED", "TIMED", "IN_PLAY", "PAUSED", "FINISHED"].includes(match.status)
    ).sort((a, b) => a.utcDate.localeCompare(b.utcDate));
    const selectedDate = dateOffset === 0 && availableMatches[0]
      ? formatDateKey(availableMatches[0].utcDate)
      : dateStr;
    const allMatches = availableMatches.filter((match) => formatDateKey(match.utcDate) === selectedDate);

    if (allMatches.length > 0) {
      return (await mapFootballDataMatches(allMatches, apiKey))
        .sort((a, b) => a.time.localeCompare(b.time));
    }
    // An empty successful response means this provider has no matching
    // fixtures for the requested date. Continue to the public secondary
    // feed instead of hiding fixtures that may be available there.
    } catch {
      // Continue to the public fixture feed when the configured provider is unavailable.
    }
  }

  try {
    const publicMatches = await fetchSportsDbMatches(dateStr);
    return publicMatches;
  } catch {
    // The static data below keeps the site usable during a public-feed outage.
  }

  return FALLBACK_MATCHES;
}

export async function getLeagueStandings(competitionCode = "PL"): Promise<LeagueStanding[] | null> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") return null;

  try {
    const table = await fetchLeagueTable(competitionCode, apiKey);
    return table.map((row) => ({
      position: row.position,
      team: row.team.shortName || row.team.name,
      played: row.playedGames,
      won: row.won,
      drawn: row.draw,
      lost: row.lost,
      goalsFor: row.goalsFor,
      goalsAgainst: row.goalsAgainst,
      goalDifference: row.goalDifference,
      points: row.points,
      form: row.form?.split(",").filter(Boolean).slice(-5),
    }));
  } catch {
    return null;
  }
}

export function buildGameweekShortlist(matches: Match[], limit = 4): AccumulatorTip | null {
  const candidates = matches.filter(
    (match) => match.source === "football-data" && Boolean(match.analysis) && match.tip !== "Stats soon"
  );
  if (candidates.length < 2) return null;

  const selected: Match[] = [];
  const usedLeagues = new Set<string>();
  for (const match of candidates) {
    if (!usedLeagues.has(match.leagueCode)) {
      selected.push(match);
      usedLeagues.add(match.leagueCode);
    }
    if (selected.length === limit) break;
  }
  for (const match of candidates) {
    if (selected.length === limit) break;
    if (!selected.some((item) => item.id === match.id)) selected.push(match);
  }

  return {
    id: `gameweek-${selected[0].date || "upcoming"}`,
    title: "Upcoming gameweek form shortlist",
    badge: "Live fixtures",
    result: "pending",
    legs: selected.map((match) => ({
      time: match.time,
      date: match.date,
      prediction: match.tip,
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      league: match.league,
      matchId: match.id,
    })),
  };
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
