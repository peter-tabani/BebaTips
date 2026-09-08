import PageLayout from "@/components/PageLayout";
import MatchTable from "@/components/MatchTable";
import WhyChooseUs from "@/components/WhyChooseUs";
import AdBanner from "@/components/AdBanner";
import AccumulatorCard from "@/components/AccumulatorCard";
import { buildGameweekShortlist, getUpcomingGameweekMatches } from "@/lib/football-api";
import Link from "next/link";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ league?: string }>;
}) {
  const { league } = await searchParams;
  const matches = await getUpcomingGameweekMatches(7);
  const featuredShortlist = buildGameweekShortlist(matches);

  return (
    <PageLayout>
      <MatchTable matches={matches} leagueFilter={league} />

      <AdBanner slot="mid-leaderboard" format="leaderboard" className="my-4" />

      <div className="rounded bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase text-gray-700">Gameweek Accumulator Watchlist</h2>
          <Link href="/accumulators" className="text-xs font-semibold text-brand-green hover:underline">
            View all →
          </Link>
        </div>
        {featuredShortlist ? (
          <>
            <p className="mb-3 text-xs text-gray-500">
              Automatically selected from upcoming fixtures with current table-form data. Combined odds are not shown because no live odds feed is connected.
            </p>
            <AccumulatorCard acca={featuredShortlist} />
          </>
        ) : (
          <p className="rounded border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
            The next form-based shortlist will appear when at least two upcoming matches have current table data.
          </p>
        )}
      </div>

      <WhyChooseUs />

      <section className="mt-6 rounded bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">
          BebaTips: Your Destination for Accurate Football Predictions
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
          <div>
            <h3 className="font-bold text-gray-800">Current data with visible methods</h3>
            <p className="mt-1">
              Fixture feeds and league tables refresh automatically. Where sufficient table data
              is available, BebaTips explains the points-per-game and home-advantage inputs behind
              its automated indicator instead of hiding the method.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Diverse Betting Markets</h3>
            <p className="mt-1">
              Whether you prefer Over/Under (1.5, 2.5, 3.5), Both Teams to Score, Home/Away wins,
              Double Chance, Correct Score, Accumulators, Handicap, or Bankers, use the data and
              calculators to understand the market and its risk before deciding whether to bet.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
