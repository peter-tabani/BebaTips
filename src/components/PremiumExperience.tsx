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
    <div className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-5 py-7 text-white shadow-sm md:px-9 md:py-9">
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
        <div className="absolute right-8 top-1/2 h-20 w-32 -translate-y-1/2 rounded-l-full border border-r-0 border-white/10" aria-hidden="true" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green text-lg font-black text-white">
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

      <section className="py-7 md:py-9">
        <div className="mb-4 px-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Full access</p>
            <h2 className="mt-1 text-lg font-bold text-brand-navy">Choose a plan</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {standardPlans.map((plan) => {
            const featured = plan.period === "week";
            return (
              <article
                key={plan.id}
                className={`flex min-h-72 flex-col rounded-xl border p-5 ${featured ? "border-brand-green bg-brand-navy text-white shadow-md ring-1 ring-brand-green" : "border-gray-200 bg-white text-gray-900 shadow-sm"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-base font-bold ${featured ? "text-white" : "text-brand-navy"}`}>
                    {plan.period === "day" ? "Daily" : plan.period === "week" ? "Weekly" : plan.period === "month" ? "Monthly" : "Yearly"}
                  </h3>
                  {featured && <span className="rounded-full bg-brand-green/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-green">Most chosen</span>}
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
                <Link href={`/premium/checkout?plan=${plan.id}`} className={`mt-auto block rounded-lg px-3 py-3 text-center text-sm font-bold transition-colors ${featured ? "bg-brand-green text-white hover:bg-brand-accent" : "bg-brand-navy text-white hover:bg-brand-green"}`}>
                  Get {plan.name.toLowerCase()} access
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-10 border-t border-gray-300 pt-7">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-green">More options</p>
          <h2 className="mb-3 mt-1 text-lg font-bold text-brand-navy">Special packages</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {otherPlans.map((plan) => (
              <article key={plan.id} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-t-4 border-brand-green p-5">
                  <h3 className="text-sm font-bold text-brand-navy">{plan.name.replace(" Analysis", "")}</h3>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <p className="text-xl font-black text-gray-900">{price(plan)}</p>
                    <p className="text-xs text-gray-500">{accessLabels[plan.period]}</p>
                  </div>
                </div>
                <Link href={`/premium/checkout?plan=${plan.id}`} className="mt-auto border-t border-gray-100 bg-gray-50 px-5 py-3.5 text-xs font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white">
                  View package <span className="float-right" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-7 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[11px] leading-relaxed text-gray-500">
          Payment is not active yet. Selecting a plan opens a checkout preview. Tips are based on available match data and do not guarantee a result.
        </p>
      </section>
    </div>
  );
}
