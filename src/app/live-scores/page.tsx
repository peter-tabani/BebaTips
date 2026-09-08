import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { getUpcomingMatches } from "@/lib/football-api";

export const metadata: Metadata = {
  title: "Football Match Centre — Fixtures, Results & Status",
  description: "Automatically refreshed football fixtures, match status and results from major leagues.",
};

export default async function LiveScoresPage() {
  const matches = await getUpcomingMatches(0);

  return (
    <PageLayout>
      <div className="rounded bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-4">
          <h1 className="section-title">Football Match Centre</h1>
          <p className="mt-1 text-sm text-gray-500">Latest available matchday across major leagues · automatically refreshed</p>
        </div>

        <div className="divide-y divide-gray-100">
          {matches.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-4 px-4 py-3 text-sm"
            >
              <span className="w-14 shrink-0 font-mono text-xs text-gray-500">{m.time}</span>
              <span className="w-28 shrink-0 truncate text-xs text-gray-400">{m.league}</span>
              <span className="min-w-0 flex-1 font-medium">
                {m.homeTeam} vs {m.awayTeam}
              </span>
              <span className="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                {m.status || "Scheduled"}
              </span>
            </div>
          ))}
        </div>
        {matches.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-500">No major-league matches are available in the current feed window.</p>
        )}
      </div>
    </PageLayout>
  );
}
