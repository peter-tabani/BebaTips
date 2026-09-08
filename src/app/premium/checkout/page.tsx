"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { PREMIUM_PLANS } from "@/lib/constants";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "gold";
  const plan = PREMIUM_PLANS.find((p) => p.id === planId) || PREMIUM_PLANS[1];

  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-3xl">
          ✓
        </div>
        <h1 className="text-xl font-bold text-gray-800">Checkout Preview</h1>
        <p className="mt-2 text-sm text-gray-600">
          No payment request was sent to {phone}. Secure M-Pesa verification and delivery are still
          being connected for the KSH {plan.price} {plan.name} package.
        </p>
        <Link href="/" className="btn-green mt-6 inline-block">
          Back to Predictions
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded bg-white p-6 shadow-sm">
      <h1 className="text-lg font-bold text-gray-800">Checkout — {plan.name}</h1>
      <p className="mt-1 text-sm text-gray-500">
        {plan.odds} odds daily · KSH {plan.price}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            M-Pesa Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="07XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Select Plan</label>
          <div className="mt-2 space-y-2">
            {PREMIUM_PLANS.map((p) => (
              <Link
                key={p.id}
                href={`/premium/checkout?plan=${p.id}`}
                className={`block rounded border px-3 py-2 text-sm transition ${
                  p.id === plan.id
                    ? "border-brand-green bg-green-50 font-semibold"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {p.name} — KSH {p.price} ({p.odds} odds)
              </Link>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-green w-full py-3 text-base font-bold">
          PREVIEW KSH {plan.price} CHECKOUT
        </button>

        <p className="text-center text-[10px] text-gray-400">
          Preview only. This page does not currently collect money or deliver tips.
        </p>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <PageLayout showSidebars={false}>
      <Suspense fallback={<div className="py-12 text-center text-sm text-gray-500">Loading...</div>}>
        <CheckoutForm />
      </Suspense>
    </PageLayout>
  );
}
