import Link from "next/link";
import { PREMIUM_PLANS } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.floor(rating) ? "text-yellow-400" : star - 0.5 <= rating ? "text-yellow-400 opacity-60" : "text-gray-600"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function PremiumCard({
  plan,
}: {
  plan: (typeof PREMIUM_PLANS)[number];
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-brand-navy p-6 shadow-lg ${
        "popular" in plan && plan.popular ? "ring-2 ring-brand-green" : ""
      }`}
    >
      {"popular" in plan && plan.popular && (
        <span className="absolute right-4 top-0 rounded-b bg-brand-green px-3 py-1 text-[10px] font-bold uppercase text-white">
          Most Popular
        </span>
      )}

      <div
        className="pointer-events-none absolute -right-8 -top-8 text-[120px] font-black text-white opacity-[0.03]"
        aria-hidden
      >
        $
      </div>

      <div className="relative flex items-start justify-between">
        <span className="rounded-full bg-brand-green/20 px-3 py-1 text-xs font-bold text-brand-green">
          {plan.name}
        </span>
        <StarRating rating={plan.rating} />
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-gray-300">
        {plan.description}
      </p>

      <ul className="relative mt-4 space-y-1.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-brand-green">✓</span> {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex items-center justify-between">
        <Link
          href={`/premium/checkout?plan=${plan.id}`}
          className="btn-green px-6 py-2.5 text-sm font-bold"
        >
          BUY @ {plan.currency}. {plan.price}
        </Link>
        <span className="text-xs text-gray-500">{plan.odds} odds</span>
      </div>
    </div>
  );
}
