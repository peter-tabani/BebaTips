"use client";

import { useState } from "react";
import Link from "next/link";
import type { Match } from "@/lib/types";

interface MatchTableProps {
  matches: Match[];
  showTips?: boolean;
}

const TABS = [
  "Main Games",
  "Betting Tips",
  "1X2 Tips",
  "Over/Under 2.5",
  "Both Teams to Score",
  "Correct Score",
  "Accumulators",
] as const;

export default function MatchTable({ matches, showTips = true }: MatchTableProps) {
  const [activeTab, setActiveTab] = useState<string>("Main Games");
  const [search, setSearch] = useState("");
  const [dateOffset, setDateOffset] = useState(0);

  const filtered = matches.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.homeTeam.toLowerCase().includes(q) ||
      m.awayTeam.toLowerCase().includes(q) ||
      m.league.toLowerCase().includes(q)
    );
  });

  const grouped = filtered.reduce(
    (acc, m) => {
      if (!acc[m.league]) acc[m.league] = [];
      acc[m.league].push(m);
      return acc;
    },
    {} as Record<string, Match[]>
  );

  const dateLabel = (() => {
    const d = new Date();
    d.setDate(d.getDate() + dateOffset);
    if (dateOffset === 0) return "Today";
    if (dateOffset === -1) return "Yesterday";
    if (dateOffset === 1) return "Tomorrow";
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  })();

  return (
    <div className="rounded bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4">
        <h1 className="section-title">Football Predictions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Free daily tips from major leagues — updated every morning
        </p>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
        <button
          type="button"
          onClick={() => setDateOffset((d) => d - 1)}
          className="rounded px-3 py-1 text-lg text-gray-600 hover:bg-gray-200"
          aria-label="Previous day"
        >
          &lsaquo;
        </button>
        <span className="text-sm font-semibold text-gray-700">{dateLabel}</span>
        <button
          type="button"
          onClick={() => setDateOffset((d) => d + 1)}
          className="rounded px-3 py-1 text-lg text-gray-600 hover:bg-gray-200"
          aria-label="Next day"
        >
          &rsaquo;
        </button>
      </div>

      <div className="overflow-x-auto border-b border-gray-200">
        <div className="flex min-w-max gap-0 px-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-3 py-2.5 text-xs font-medium transition ${
                activeTab === tab
                  ? "border-b-2 border-brand-green text-brand-green"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-200 px-4 py-2">
        <input
          type="search"
          placeholder="Search team or league..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
        />
      </div>

      {Object.entries(grouped).map(([league, leagueMatches]) => (
        <div key={league}>
          <div className="bg-brand-navy px-4 py-2">
            <h2 className="text-sm font-bold text-white">{league}</h2>
          </div>

          <div className="hidden md:grid md:grid-cols-[70px_1fr_100px_80px] md:gap-2 md:border-b md:border-gray-200 md:bg-gray-100 md:px-4 md:py-2 md:text-xs md:font-semibold md:uppercase md:text-gray-500">
            <span>Time</span>
            <span>Fixture</span>
            {showTips && <span>Tip</span>}
            <span className="text-right">Action</span>
          </div>

          {leagueMatches.map((match) => (
            <div
              key={match.id}
              className="match-row md:grid md:grid-cols-[70px_1fr_100px_80px] md:gap-2"
            >
              <span className="shrink-0 font-mono text-xs font-semibold text-gray-600 md:text-sm">
                {match.time}
              </span>
              <span className="min-w-0 flex-1 font-medium text-gray-800">
                {match.homeTeam}
                <span className="mx-1.5 text-gray-400">vs</span>
                {match.awayTeam}
              </span>
              {showTips && (
                <span className="shrink-0">
                  {match.tipType === "premium" ? (
                    <Link href="/premium" className="text-xs font-bold text-brand-green hover:underline">
                      VIP 🔒
                    </Link>
                  ) : (
                    <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-brand-accent">
                      {match.tip}
                    </span>
                  )}
                </span>
              )}
              <span className="shrink-0 text-right">
                <Link href={`/match/${match.id}`} className="btn-outline-green">
                  TIP
                </Link>
              </span>
            </div>
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="px-4 py-8 text-center text-sm text-gray-500">
          No matches found for this search.
        </p>
      )}
    </div>
  );
}
