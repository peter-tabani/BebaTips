import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "League Standings",
  description: "Current standings for major European football leagues.",
};

const STANDINGS = [
  { pos: 1, team: "Liverpool", played: 3, won: 3, gd: 5, pts: 9 },
  { pos: 2, team: "Arsenal", played: 3, won: 2, gd: 4, pts: 7 },
  { pos: 3, team: "Chelsea", played: 3, won: 2, gd: 3, pts: 7 },
  { pos: 4, team: "Man City", played: 3, won: 2, gd: 2, pts: 6 },
  { pos: 5, team: "Tottenham", played: 3, won: 1, gd: 1, pts: 4 },
  { pos: 6, team: "Brighton", played: 3, won: 1, gd: 0, pts: 4 },
  { pos: 7, team: "Man United", played: 3, won: 1, gd: -1, pts: 3 },
  { pos: 8, team: "Aston Villa", played: 3, won: 1, gd: -1, pts: 3 },
];

export default function StandingsPage() {
  return (
    <PageLayout>
      <div className="rounded bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-4">
          <h1 className="section-title">Premier League Standings</h1>
          <p className="mt-1 text-sm text-gray-500">2025/26 Season — updated weekly</p>
        </div>

        <div className="overflow-x-auto">
          <table className="tips-table w-full text-sm">
            <thead>
              <tr className="bg-brand-navy text-left text-xs uppercase text-white">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Team</th>
                <th className="px-4 py-2">P</th>
                <th className="px-4 py-2">W</th>
                <th className="px-4 py-2">GD</th>
                <th className="px-4 py-2">Pts</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((row) => (
                <tr key={row.pos}>
                  <td className="px-4 py-2.5 font-semibold text-gray-500">{row.pos}</td>
                  <td className="px-4 py-2.5 font-medium">{row.team}</td>
                  <td className="px-4 py-2.5">{row.played}</td>
                  <td className="px-4 py-2.5">{row.won}</td>
                  <td className="px-4 py-2.5">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                  <td className="px-4 py-2.5 font-bold">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
