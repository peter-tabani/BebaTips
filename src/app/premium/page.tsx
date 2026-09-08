import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PremiumCard from "@/components/PremiumCard";
import AdBanner from "@/components/AdBanner";
import { PREMIUM_PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Premium Tips — Buy VIP Football Predictions",
  description:
    "Review BebaTips Silver, Gold, and Platinum football analysis plans and their target odds ranges.",
};

export default function PremiumPage() {
  return (
    <PageLayout>
      <div className="mb-6 text-center">
        <h1 className="section-title">Premium Tips</h1>
        <p className="mt-2 text-sm text-gray-600">
          Preview the planned analysis packages. Payments and delivery will open only after secure M-Pesa verification is connected.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5">
        {PREMIUM_PLANS.map((plan) => (
          <PremiumCard key={plan.id} plan={plan} />
        ))}
      </div>

      <AdBanner slot="premium-bottom" format="leaderboard" className="mt-6" />

      <section className="mt-6 rounded bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-800">How It Works</h2>
        <ol className="mt-3 space-y-3 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">1</span>
            Pick Silver, Gold, or Platinum based on the odds range you want.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">2</span>
            Enter your phone number only after secure M-Pesa checkout is activated.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">3</span>
            Access will be released only after a payment is verified; delivery channels are still being configured.
          </li>
        </ol>
      </section>
    </PageLayout>
  );
}
