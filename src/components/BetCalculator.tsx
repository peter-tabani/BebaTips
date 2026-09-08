"use client";

import { useMemo, useState } from "react";

function toPositiveNumber(value: string, minimum = 0): number | null {
  const number = Number(value.replace(/,/g, ""));
  return Number.isFinite(number) && number > minimum ? number : null;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-KE", { maximumFractionDigits: 2 }).format(value);
}

export default function BetCalculator() {
  const [stake, setStake] = useState("100");
  const [odds, setOdds] = useState("2.10");
  const [accaOdds, setAccaOdds] = useState("1.45, 1.70, 2.05");

  const single = useMemo(() => {
    const validStake = toPositiveNumber(stake);
    const validOdds = toPositiveNumber(odds, 1);
    if (!validStake || !validOdds) return null;
    const returns = validStake * validOdds;
    return {
      returns,
      profit: returns - validStake,
      probability: 100 / validOdds,
    };
  }, [stake, odds]);

  const accumulator = useMemo(() => {
    const legs = accaOdds
      .split(/[\s,;]+/)
      .map((value) => toPositiveNumber(value, 1))
      .filter((value): value is number => value !== null);
    const validStake = toPositiveNumber(stake);
    if (!validStake || legs.length < 2) return null;
    const combinedOdds = legs.reduce((total, value) => total * value, 1);
    const returns = validStake * combinedOdds;
    return { legs: legs.length, combinedOdds, returns, profit: returns - validStake };
  }, [accaOdds, stake]);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Single bet</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900">Returns &amp; implied probability</h2>
          </div>
          <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">Decimal odds</span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-gray-700">
            Stake (KSH)
            <input
              inputMode="decimal"
              value={stake}
              onChange={(event) => setStake(event.target.value)}
              className="mt-1.5 w-full rounded border border-gray-300 px-3 py-2.5 font-mono text-base focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Decimal odds
            <input
              inputMode="decimal"
              value={odds}
              onChange={(event) => setOdds(event.target.value)}
              className="mt-1.5 w-full rounded border border-gray-300 px-3 py-2.5 font-mono text-base focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            />
          </label>
        </div>

        {single ? (
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Result label="Total return" value={`KSH ${formatMoney(single.returns)}`} />
            <Result label="Profit" value={`KSH ${formatMoney(single.profit)}`} />
            <Result label="Implied chance" value={`${single.probability.toFixed(1)}%`} />
          </div>
        ) : (
          <p className="mt-5 rounded bg-amber-50 p-3 text-sm text-amber-800">Enter a stake above 0 and decimal odds above 1.00.</p>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Accumulator</p>
        <h2 className="mt-1 text-lg font-bold text-gray-900">Combined odds calculator</h2>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">Enter two or more decimal odds separated by commas or spaces.</p>

        <label className="mt-5 block text-sm font-semibold text-gray-700">
          Leg odds
          <textarea
            rows={3}
            value={accaOdds}
            onChange={(event) => setAccaOdds(event.target.value)}
            className="mt-1.5 w-full resize-none rounded border border-gray-300 px-3 py-2.5 font-mono text-base focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          />
        </label>

        {accumulator ? (
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Result label={`${accumulator.legs} legs`} value={`${accumulator.combinedOdds.toFixed(2)} odds`} />
            <Result label="Total return" value={`KSH ${formatMoney(accumulator.returns)}`} />
            <Result label="Profit" value={`KSH ${formatMoney(accumulator.profit)}`} />
          </div>
        ) : (
          <p className="mt-5 rounded bg-amber-50 p-3 text-sm text-amber-800">Enter at least two valid decimal odds above 1.00.</p>
        )}
      </section>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded bg-brand-navy p-3 text-center">
      <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-white sm:text-base">{value}</p>
    </div>
  );
}
