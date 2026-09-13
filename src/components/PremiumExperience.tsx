import Link from "next/link";
import { PREMIUM_PLANS } from "@/lib/constants";

type Plan = (typeof PREMIUM_PLANS)[number];

function price(plan: Plan): string {
  return `KES ${plan.price.toLocaleString("en-KE")}`;
}

const standardPlans = PREMIUM_PLANS.filter((plan) => plan.category === "standard");
const otherPlans = PREMIUM_PLANS.filter((plan) => plan.category !== "standard");

export default function PremiumExperience() {
  return (
    <div className="border border-gray-200 bg-[#f7f8f7] px-4 py-6 md:px-8 md:py-8">
      <div className="mb-5 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-brand-navy">Premium tips</h1>
        <p className="mt-1 text-sm text-gray-600">Choose how long you want access.</p>
      </div>

      <section>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {standardPlans.map((plan) => {
            return (
              <article key={plan.id} className="flex min-h-56 flex-col border border-gray-200 bg-white p-4 md:p-5">
                <h2 className="text-base font-bold text-brand-navy">{plan.period === "day" ? "Daily" : plan.period === "week" ? "Weekly" : plan.period === "month" ? "Monthly" : "Yearly"}</h2>
                <p className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">{price(plan)}</p>
                <p className="mt-4 text-xs leading-relaxed text-gray-600">2–3 tips per covered match</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">Local and international fixtures</p>
                <Link href={`/premium/checkout?plan=${plan.id}`} className="mt-auto block bg-brand-navy px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-brand-green">
                  Choose {plan.period}
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-base font-bold text-brand-navy">Other packages</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {otherPlans.map((plan) => (
              <article key={plan.id} className="flex flex-col border border-gray-200 bg-white p-4">
                <h3 className="text-sm font-bold text-gray-800">{plan.name.replace(" Analysis", "")}</h3>
                <p className="mt-2 text-xl font-extrabold text-brand-navy">{price(plan)}</p>
                <p className="mt-2 text-xs text-gray-500">Access for one {plan.period}</p>
                <Link href={`/premium/checkout?plan=${plan.id}`} className="mt-4 border border-brand-navy px-4 py-2 text-center text-xs font-bold text-brand-navy hover:bg-brand-navy hover:text-white">Choose package</Link>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-gray-500">
          Payment is not active yet. Selecting a plan opens a checkout preview. Tips are based on available match data and do not guarantee a result.
        </p>
      </section>
    </div>
  );
}
