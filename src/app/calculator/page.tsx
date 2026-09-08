import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import BetCalculator from "@/components/BetCalculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Bet Calculator — Returns, Profit & Accumulator Odds",
  description: "Free Kenyan betting calculator for decimal odds, potential returns, profit, implied probability and accumulator odds.",
};

export default function CalculatorPage() {
  return (
    <PageLayout>
      <header className="mb-5 rounded-lg bg-brand-navy p-5 text-white shadow-sm md:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Free betting tools</p>
        <h1 className="mt-2 text-2xl font-black md:text-3xl">Odds &amp; Returns Calculator</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
          Check what decimal odds mean before placing a bet. Calculations happen on your device and do not require an account.
        </p>
      </header>

      <BetCalculator />
      <AdBanner slot="calculator-mid" format="leaderboard" className="my-5" />

      <section className="rounded-lg bg-white p-5 shadow-sm md:p-7">
        <h2 className="text-lg font-bold text-gray-900">How the numbers work</h2>
        <div className="mt-4 grid gap-5 text-sm leading-relaxed text-gray-600 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-gray-800">Potential return</h3>
            <p className="mt-1">Stake × decimal odds. This includes your original stake and only applies if the selection wins.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Implied probability</h3>
            <p className="mt-1">100 ÷ decimal odds. It describes the break-even chance implied by the price before bookmaker margin.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Accumulator risk</h3>
            <p className="mt-1">Combined odds multiply, but every leg must win. Adding selections increases the chance that one result loses the ticket.</p>
          </div>
        </div>
        <p className="mt-5 rounded border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          Calculator outputs are mathematical estimates, not recommendations or guaranteed returns. Gambling can be addictive. Adults 18+ only.
        </p>
      </section>
    </PageLayout>
  );
}
