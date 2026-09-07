import PageLayout from "@/components/PageLayout";
import MatchTable from "@/components/MatchTable";
import WhyChooseUs from "@/components/WhyChooseUs";
import AdBanner from "@/components/AdBanner";
import AccumulatorCard from "@/components/AccumulatorCard";
import { getUpcomingMatches } from "@/lib/football-api";
import { accumulators } from "@/lib/data";
import Link from "next/link";

export default async function HomePage() {
  const matches = await getUpcomingMatches(0);

  return (
    <PageLayout>
      <MatchTable matches={matches} />

      <AdBanner slot="mid-leaderboard" format="leaderboard" className="my-4" />

      <div className="rounded bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase text-gray-700">Featured Accumulator</h2>
          <Link href="/accumulators" className="text-xs font-semibold text-brand-green hover:underline">
            View all →
          </Link>
        </div>
        <AccumulatorCard acca={accumulators[0]} />
      </div>

      <WhyChooseUs />

      <section className="mt-6 rounded bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">
          BebaTips: Your Destination for Accurate Football Predictions
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600">
          <div>
            <h3 className="font-bold text-gray-800">Unrivaled Accuracy and Expertise</h3>
            <p className="mt-1">
              Our team of seasoned analysts studies form tables, injury reports, and head-to-head
              records before every pick. We cover the English Premier League, Serie A, La Liga,
              Bundesliga, Ligue 1, and dozens more — including the Kenyan Premier League.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Diverse Betting Markets</h3>
            <p className="mt-1">
              Whether you prefer Over/Under (1.5, 2.5, 3.5), Both Teams to Score, Home/Away wins,
              Double Chance, Correct Score, Accumulators, Handicap, or Bankers — we have tips for
              every market on SportPesa, Betika, and Betway.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
