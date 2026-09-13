import Link from "next/link";
import { PREMIUM_PLANS } from "@/lib/constants";

type Plan = (typeof PREMIUM_PLANS)[number];

function price(plan: Plan): string {
  return `KES ${plan.price.toLocaleString("en-KE")}`;
}

const standardPlans = PREMIUM_PLANS.filter((plan) => plan.category === "standard");
const otherPlans = PREMIUM_PLANS.filter((plan) => plan.category !== "standard");

const accessLabels: Record<string, string> = {
  day: "1 day",
  week: "7 days",
  month: "30 days",
  year: "365 days",
};

export default function PremiumExperience() {
  return (
    <div className="overflow-hidden border border-gray-200 bg-[#f4f6f5]">
      <div className="relative overflow-hidden border-b-4 border-brand-green bg-brand-navy px-5 py-7 text-white md:px-8 md:py-9">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" aria-hidden="true" />
        <div className="absolute right-16 top-0 h-full border-l border-white/10" aria-hidden="true" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-brand-green text-lg font-black text-white shadow-[0_4px_0_#1f8f4b]">
            BT
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">BebaTips</p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight md:text-3xl">Premium tips</h1>
          </div>
        </div>
        <p className="relative mt-4 max-w-xl text-sm leading-6 text-gray-300">
          Get 2–3 selections for covered matches. Pick the access period that suits you.
        </p>
      </div>

      <section className="px-4 py-6 md:px-8 md:py-8">
        <div className="mb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Full access</p>
            <h2 className="mt-1 text-lg font-bold text-brand-navy">Choose a plan</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {standardPlans.map((plan) => {
            const featured = plan.period === "week";
            return (
              <article
                key={plan.id}
                className={`flex min-h-64 flex-col border-t-4 p-4 md:p-5 ${featured ? "border-brand-green bg-brand-navy text-white shadow-md" : "border-brand-navy bg-white text-gray-900"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-base font-bold ${featured ? "text-white" : "text-brand-navy"}`}>
                    {plan.period === "day" ? "Daily" : plan.period === "week" ? "Weekly" : plan.period === "month" ? "Monthly" : "Yearly"}
                  </h3>
                  {featured && <span className="text-[10px] font-bold uppercase tracking-wide text-brand-green">Most chosen</span>}
                </div>
                <p className={`mt-3 text-2xl font-black tracking-tight md:text-3xl ${featured ? "text-white" : "text-gray-900"}`}>{price(plan)}</p>
                <dl className={`mt-5 border-y py-3 text-xs ${featured ? "border-white/10 text-gray-300" : "border-gray-100 text-gray-600"}`}>
                  <div className="flex justify-between gap-2">
                    <dt>Access</dt>
                    <dd className={`font-bold ${featured ? "text-white" : "text-brand-navy"}`}>{accessLabels[plan.period]}</dd>
                  </div>
                  <div className="mt-2 flex justify-between gap-2">
                    <dt>Per match</dt>
                    <dd className={`font-bold ${featured ? "text-white" : "text-brand-navy"}`}>2–3 tips</dd>
                  </div>
                </dl>
                <p className={`mt-3 text-[11px] leading-4 ${featured ? "text-gray-400" : "text-gray-500"}`}>Local and international fixtures</p>
                <Link href={`/premium/checkout?plan=${plan.id}`} className={`mt-auto block px-3 py-2.5 text-center text-xs font-bold ${featured ? "bg-brand-green text-white hover:bg-brand-accent" : "bg-brand-navy text-white hover:bg-brand-green"}`}>
                  Get {plan.name.toLowerCase()} access
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-9 border-t border-gray-300 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-green">More options</p>
          <h2 className="mb-3 mt-1 text-lg font-bold text-brand-navy">Special packages</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {otherPlans.map((plan) => (
              <article key={plan.id} className="flex flex-col border border-gray-200 bg-white">
                <div className="border-l-4 border-brand-green p-4">
                  <h3 className="text-sm font-bold text-brand-navy">{plan.name.replace(" Analysis", "")}</h3>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <p className="text-xl font-black text-gray-900">{price(plan)}</p>
                    <p className="text-xs text-gray-500">{accessLabels[plan.period]}</p>
                  </div>
                </div>
                <Link href={`/premium/checkout?plan=${plan.id}`} className="mt-auto border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white">
                  View package <span className="float-right" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-6 border-l-2 border-gray-300 pl-3 text-[11px] leading-relaxed text-gray-500">
          Payment is not active yet. Selecting a plan opens a checkout preview. Tips are based on available match data and do not guarantee a result.
        </p>
      </section>
    </div>
  );
}
