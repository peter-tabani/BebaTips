import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AccumulatorCard from "@/components/AccumulatorCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { buildGameweekShortlist, getUpcomingGameweekMatches } from "@/lib/football-api";

export const metadata: Metadata = {
  title: "Accumulator Tips — Daily Football Accas",
  description: "Free and premium accumulator tips for Premier League, La Liga, Serie A and more.",
};

export default async function AccumulatorsPage() {
  const matches = await getUpcomingGameweekMatches(7);
  const shortlist = buildGameweekShortlist(matches, 6);
  return (
    <PageLayout>
      <div className="mb-4">
        <h1 className="section-title">Accumulator Tips</h1>
        <p className="mt-1 text-sm text-gray-500">
          A current gameweek shortlist built from upcoming fixtures and available table form.
        </p>
      </div>

      <AdBanner slot="acca-top" format="leaderboard" className="mb-4" />

      {shortlist ? (
        <div className="space-y-3">
          <p className="rounded border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-relaxed text-blue-800">
            This is a data-led watchlist, not a bookmaker bet slip. It refreshes with the fixture feed; verify team news and prices before making any decision.
          </p>
          <AccumulatorCard acca={shortlist} />
        </div>
      ) : (
        <p className="rounded bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
          No evidence-backed gameweek shortlist is available yet. Upcoming fixtures remain visible on the predictions page.
        </p>
      )}

      <div className="mt-6 rounded bg-brand-navy p-6 text-center">
        <h2 className="text-lg font-bold text-white">Want Higher-Odds Accas?</h2>
        <p className="mt-2 text-sm text-gray-300">
          Premium subscribers receive additional accumulator analysis according to their selected access period.
        </p>
        <Link href="/premium" className="btn-green mt-4 inline-block">
          GET VIP ACCAS
        </Link>
      </div>
    </PageLayout>
  );
}
