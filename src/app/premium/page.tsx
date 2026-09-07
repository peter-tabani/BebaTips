import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PremiumCard from "@/components/PremiumCard";
import AdBanner from "@/components/AdBanner";
import { PREMIUM_PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Premium Tips — Buy VIP Football Predictions",
  description:
    "Subscribe to BebaTips Silver, Gold, or Platinum plans. Daily sure odds delivered via SMS. From KSH 50.",
};

export default function PremiumPage() {
  return (
    <PageLayout>
      <div className="mb-6 text-center">
        <h1 className="section-title">Premium Tips</h1>
        <p className="mt-2 text-sm text-gray-600">
          Choose a plan, pay via M-Pesa, and receive today&apos;s picks instantly on your phone.
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
            Pay via M-Pesa — enter your phone number at checkout.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">3</span>
            Receive your tips via SMS within 60 seconds. Gold &amp; Platinum also get WhatsApp delivery.
          </li>
        </ol>
      </section>
    </PageLayout>
  );
}
