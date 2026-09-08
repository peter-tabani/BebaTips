import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { getLeagueStandings } from "@/lib/football-api";
import type { LeagueStanding } from "@/lib/types";
import Link from "next/link";
import { MAJOR_LEAGUES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "League Standings",
  description: "Current standings for major European football leagues.",
};

const STANDINGS: LeagueStanding[] = [
  { position: 1, team: "Liverpool", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 7, goalsAgainst: 2, goalDifference: 5, points: 9, form: ["W", "W", "W"] },
  { position: 2, team: "Arsenal", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 7, form: ["W", "W", "D"] },
  { position: 3, team: "Chelsea", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 3, goalDifference: 3, points: 7, form: ["W", "D", "W"] },
  { position: 4, team: "Man City", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, goalDifference: 2, points: 6, form: ["W", "L", "W"] },
];

const TABLE_LEAGUES = MAJOR_LEAGUES.filter((league) => ["PL", "PD", "SA", "BL1", "FL1", "PPL", "DED"].includes(league.id));

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ league?: string }>;
}) {
  const { league: requestedLeague } = await searchParams;
  const selectedLeague = TABLE_LEAGUES.find((league) => league.id === requestedLeague) || TABLE_LEAGUES[0];
  const liveStandings = await getLeagueStandings(selectedLeague.id);
  const standings = liveStandings || (selectedLeague.id === "PL" ? STANDINGS : []);

  return (
    <PageLayout>
      <div className="rounded bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-4">
          <h1 className="section-title">{selectedLeague.name} Standings</h1>
          <p className="mt-1 text-sm text-gray-500">
            {liveStandings ? "Automatically updated from current league data" : "Sample standings — add a free data key for live updates"}
          </p>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-gray-200 bg-gray-50 px-3 py-2">
          {TABLE_LEAGUES.map((league) => (
            <Link
              key={league.id}
              href={`/standings?league=${league.id}`}
              className={`shrink-0 rounded px-3 py-1.5 text-xs font-semibold ${league.id === selectedLeague.id ? "bg-brand-green text-white" : "text-gray-600 hover:bg-gray-200"}`}
            >
              {league.name}
            </Link>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="tips-table w-full text-sm">
            <thead>
              <tr className="bg-brand-navy text-left text-xs uppercase text-white">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Team</th>
                <th className="px-4 py-2">P</th>
                <th className="px-4 py-2">W</th>
                <th className="px-3 py-2">D</th>
                <th className="px-3 py-2">L</th>
                <th className="px-3 py-2">GF</th>
                <th className="px-3 py-2">GA</th>
                <th className="px-4 py-2">GD</th>
                <th className="px-4 py-2">Pts</th>
                <th className="px-4 py-2">Last 5</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.position}>
                  <td className="px-4 py-2.5 font-semibold text-gray-500">{row.position}</td>
                  <td className="px-4 py-2.5 font-medium">{row.team}</td>
                  <td className="px-4 py-2.5">{row.played}</td>
                  <td className="px-4 py-2.5">{row.won}</td>
                  <td className="px-3 py-2.5">{row.drawn}</td>
                  <td className="px-3 py-2.5">{row.lost}</td>
                  <td className="px-3 py-2.5">{row.goalsFor}</td>
                  <td className="px-3 py-2.5">{row.goalsAgainst}</td>
                  <td className="px-4 py-2.5">{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                  <td className="px-4 py-2.5 font-bold">{row.points}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1">
                      {(row.form || []).map((result, index) => (
                        <span
                          key={`${result}-${index}`}
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${result === "W" ? "bg-emerald-500" : result === "L" ? "bg-red-500" : "bg-gray-400"}`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {standings.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-500">No table is available for this league on the current data plan.</p>
        )}
      </div>
    </PageLayout>
  );
}
