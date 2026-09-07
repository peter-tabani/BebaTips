import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { jackpots } from "@/lib/data";

export const metadata: Metadata = {
  title: "Jackpot Predictions — SportPesa & Betika",
  description: "Mega Jackpot and Midweek Jackpot predictions for SportPesa and Betika.",
};

export default function JackpotsPage() {
  return (
    <PageLayout>
      <div className="mb-4">
        <h1 className="section-title">Jackpot Predictions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Our analyst picks for this week&apos;s SportPesa Mega Jackpot and Betika Midweek Jackpot.
        </p>
      </div>

      <AdBanner slot="jackpot-top" format="leaderboard" className="mb-4" />

      {jackpots.map((jp) => (
        <div key={jp.name} className="mb-6 overflow-hidden rounded bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-brand-navy px-4 py-3">
            <div>
              <h2 className="text-sm font-bold text-white">
                {jp.provider} — {jp.name}
              </h2>
              <p className="text-xs text-gray-400">Prize: {jp.prize}</p>
            </div>
            <span className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white">
              Deadline: {jp.deadline}
            </span>
          </div>

          <div className="hidden grid-cols-[40px_1fr_60px] gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase text-gray-500 md:grid">
            <span>#</span>
            <span>Match</span>
            <span>Pick</span>
          </div>

          <div className="divide-y divide-gray-100">
            {jp.picks.map((pick, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 text-sm md:grid md:grid-cols-[40px_1fr_60px]"
              >
                <span className="w-6 shrink-0 text-xs text-gray-400">{i + 1}</span>
                <span className="min-w-0 flex-1 font-medium text-gray-800">{pick.match}</span>
                <span className="shrink-0">
                  {i < 3 ? (
                    <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-brand-accent">
                      {pick.prediction}
                    </span>
                  ) : (
                    <Link
                      href="/premium"
                      className="text-xs font-bold text-brand-green hover:underline"
                    >
                      VIP 🔒
                    </Link>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-center">
            <Link href="/premium" className="btn-green text-sm">
              UNLOCK ALL {jp.picks.length} PICKS — KSH 100
            </Link>
          </div>
        </div>
      ))}
    </PageLayout>
  );
}
