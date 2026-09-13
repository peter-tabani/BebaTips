import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PremiumCard from "@/components/PremiumCard";
import AdBanner from "@/components/AdBanner";
import { PREMIUM_PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Premium Tips — Local & International Plans",
  description:
    "Review BebaTips daily, weekly, monthly and yearly football analysis plans for Kenya and international readers.",
};

const PLAN_GROUPS = [
  { key: "local", title: "Kenya subscriptions", description: "Pay in Kenyan shillings for local and international match coverage.", plans: PREMIUM_PLANS.filter((plan) => plan.category === "standard" && plan.market === "Kenya") },
  { key: "international", title: "International subscriptions", description: "USD plans for readers outside Kenya.", plans: PREMIUM_PLANS.filter((plan) => plan.category === "standard" && plan.market === "International") },
  { key: "jackpot", title: "Jackpot package", description: "A separate monthly package for supported Kenyan jackpot pools.", plans: PREMIUM_PLANS.filter((plan) => plan.category === "jackpot") },
  { key: "fixed", title: "High-detail match analysis", description: "Expanded analysis packages formerly requested as “fixed matches.” BebaTips does not claim that any match or outcome is fixed or guaranteed.", plans: PREMIUM_PLANS.filter((plan) => plan.category === "fixed") },
] as const;

export default function PremiumPage() {
  return (
    <PageLayout>
      <div className="mb-6 text-center">
        <h1 className="section-title">Premium Tips</h1>
        <p className="mt-2 text-sm text-gray-600">
          Each covered match includes 2–3 data-backed market selections. Payments and subscriber access will open after secure checkout and delivery are connected.
        </p>
      </div>

      <div className="space-y-8">
        {PLAN_GROUPS.map((group) => (
          <section key={group.key}>
            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-800">{group.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{group.description}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {group.plans.map((plan) => <PremiumCard key={plan.id} plan={plan} />)}
            </div>
          </section>
        ))}
      </div>

      <AdBanner slot="premium-bottom" format="leaderboard" className="mt-6" />

      <section className="mt-6 rounded bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-800">How It Works</h2>
        <ol className="mt-3 space-y-3 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">1</span>
            Choose a Kenya or international access period, or a specialist analysis package.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">2</span>
            Use M-Pesa for Kenya plans or the international gateway once payment credentials are connected.
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
