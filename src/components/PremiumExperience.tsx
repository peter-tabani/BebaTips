"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PREMIUM_PLANS } from "@/lib/constants";

type Market = "Kenya" | "International";
type Plan = (typeof PREMIUM_PLANS)[number];

function priceLabel(plan: Plan): string {
  return plan.currency === "USD" ? `$${plan.price}` : `KES ${plan.price.toLocaleString("en-KE")}`;
}

function periodLabel(period: string): string {
  return period === "day" ? "day" : period === "week" ? "week" : period === "month" ? "month" : "year";
}

function PlanCard({ plan, featured = false }: { plan: Plan; featured?: boolean }) {
  return (
    <article className={`relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${featured ? "border-brand-green bg-brand-navy text-white shadow-lg shadow-brand-green/10" : "border-gray-200 bg-white text-gray-800"}`}>
      {featured && <span className="absolute right-4 top-0 rounded-b-lg bg-brand-green px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">Best rhythm</span>}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${featured ? "text-brand-green" : "text-gray-400"}`}>{plan.period} access</p>
          <h3 className="mt-2 text-lg font-bold">{plan.name.replace("International ", "")}</h3>
        </div>
        <span className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${featured ? "bg-white/10" : "bg-green-50"}`}>{plan.period === "day" ? "◷" : plan.period === "week" ? "◒" : plan.period === "month" ? "◉" : "✦"}</span>
      </div>
      <div className="mt-5 flex items-end gap-2">
        <span className={`text-3xl font-black tracking-tight ${featured ? "text-white" : "text-brand-navy"}`}>{priceLabel(plan)}</span>
        <span className={`pb-1 text-xs ${featured ? "text-gray-300" : "text-gray-500"}`}>/ {periodLabel(plan.period)}</span>
      </div>
      <p className={`mt-3 text-xs leading-relaxed ${featured ? "text-gray-300" : "text-gray-500"}`}>{plan.description}</p>
      <ul className="mt-4 space-y-2">
        {plan.features.map((feature) => <li key={feature} className={`flex gap-2 text-xs ${featured ? "text-gray-200" : "text-gray-600"}`}><span className="font-bold text-brand-green">✓</span>{feature}</li>)}
      </ul>
      <Link href={`/premium/checkout?plan=${plan.id}`} className={`mt-auto pt-5 text-center text-xs font-bold uppercase tracking-wider ${featured ? "btn-green" : "rounded-lg border border-brand-green px-4 py-2.5 text-brand-green hover:bg-green-50"}`}>
        Choose {plan.period} access
      </Link>
    </article>
  );
}

export default function PremiumExperience() {
  const [market, setMarket] = useState<Market>("Kenya");
  const standardPlans = useMemo(() => PREMIUM_PLANS.filter((plan) => plan.category === "standard" && plan.market === market), [market]);
  const specialistPlans = useMemo(() => PREMIUM_PLANS.filter((plan) => plan.category !== "standard" && plan.market === market), [market]);

  return (
    <div className="space-y-6">
      <section className="relative isolate overflow-hidden rounded-2xl bg-brand-navy px-5 py-7 text-white shadow-xl md:px-10 md:py-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[32px] border-brand-green/10" />
        <div className="pointer-events-none absolute -bottom-28 left-1/2 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green"><span className="h-2 w-2 rounded-full bg-brand-green" /> BebaTips Pro</div>
            <h1 className="max-w-xl text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">Read the match before you read the odds.</h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-300 md:text-base">A calmer, sharper matchroom for people who want the evidence behind every selection—not a wall of noise.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold text-gray-200">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">2–3 selections per match</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Form + context</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Updated for EAT kick-off</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Today&apos;s board</span><span className="rounded bg-brand-green/20 px-2 py-1 text-[10px] font-bold text-brand-green">LIVE DATA</span></div>
            <div className="space-y-3 py-4">
              {["Home form", "Away form", "Team news", "Market angles"].map((item, index) => <div key={item} className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/15 text-xs font-bold text-brand-green">0{index + 1}</span><span className="text-sm text-gray-200">{item}</span><span className="ml-auto h-1.5 w-12 rounded-full bg-brand-green/60" /></div>)}
            </div>
            <div className="rounded-xl bg-black/20 p-3"><p className="text-[10px] uppercase tracking-wider text-gray-500">The BebaTips difference</p><p className="mt-1 text-xs leading-relaxed text-gray-300">Every briefing is tied to the match data available at refresh time.</p></div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-end md:justify-between">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">Choose your matchroom</p><h2 className="mt-1 text-2xl font-black tracking-tight text-brand-navy">Simple access. Serious context.</h2><p className="mt-1 text-sm text-gray-500">Select your billing market to see the right currency and plans.</p></div>
          <div className="flex rounded-xl bg-gray-100 p-1" role="tablist" aria-label="Subscription market">
            {(["Kenya", "International"] as Market[]).map((option) => <button key={option} type="button" role="tab" aria-selected={market === option} onClick={() => setMarket(option)} className={`rounded-lg px-4 py-2 text-xs font-bold transition ${market === option ? "bg-brand-navy text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>{option === "Kenya" ? "🇰🇪 Kenya · KES" : "🌍 International · USD"}</button>)}
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {standardPlans.map((plan) => <PlanCard key={plan.id} plan={plan} featured={plan.period === "week"} />)}
        </div>
        <p className="mt-4 text-center text-[11px] text-gray-400">Payment and access delivery are being connected. Selecting a plan opens a checkout preview.</p>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">Specialist rooms</p><h2 className="mt-1 text-xl font-black text-brand-navy">Go deeper when the fixture deserves it.</h2></div><span className="hidden text-xs text-gray-400 sm:block">Optional add-ons</span></div>
        <div className="grid gap-4 md:grid-cols-2">
          {specialistPlans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
        </div>
      </section>

      <section className="grid gap-3 rounded-2xl bg-[#e4f5e8] p-5 md:grid-cols-3 md:p-6">
        {[{ n: "01", title: "Pick your lane", text: "Choose a short daily read or settle into a weekly, monthly or yearly rhythm." }, { n: "02", title: "Read the evidence", text: "Get the form, context and 2–3 market angles prepared for each covered match." }, { n: "03", title: "Decide for yourself", text: "Use the information responsibly. No selection is a guarantee of a result." }].map((step) => <div key={step.n} className="flex gap-3"><span className="text-xs font-black text-brand-green">{step.n}</span><div><h3 className="text-sm font-bold text-brand-navy">{step.title}</h3><p className="mt-1 text-xs leading-relaxed text-gray-600">{step.text}</p></div></div>)}
      </section>
    </div>
  );
}
