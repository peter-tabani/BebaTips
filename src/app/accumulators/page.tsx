import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AccumulatorCard from "@/components/AccumulatorCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { accumulators } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accumulator Tips — Daily Football Accas",
  description: "Free and premium accumulator tips for Premier League, La Liga, Serie A and more.",
};

export default function AccumulatorsPage() {
  return (
    <PageLayout>
      <div className="mb-4">
        <h1 className="section-title">Accumulator Tips</h1>
        <p className="mt-1 text-sm text-gray-500">
          Multi-match combos with combined odds. Updated daily before kickoff.
        </p>
      </div>

      <AdBanner slot="acca-top" format="leaderboard" className="mb-4" />

      <div className="space-y-4">
        {accumulators.map((acca) => (
          <AccumulatorCard key={acca.id} acca={acca} />
        ))}
      </div>

      <div className="mt-6 rounded bg-brand-navy p-6 text-center">
        <h2 className="text-lg font-bold text-white">Want Higher-Odds Accas?</h2>
        <p className="mt-2 text-sm text-gray-300">
          Gold and Platinum subscribers get exclusive accumulator combos with 8–15 combined odds.
        </p>
        <Link href="/premium" className="btn-green mt-4 inline-block">
          GET VIP ACCAS
        </Link>
      </div>
    </PageLayout>
  );
}
