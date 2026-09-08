"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SafeLogo from "./SafeLogo";
import type { Match } from "@/lib/types";

interface MatchTableProps {
  matches: Match[];
  showTips?: boolean;
  leagueFilter?: string;
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

function matchesActiveTab(match: Match, activeTab: string) {
  if (activeTab === "Main Games" || activeTab === "Betting Tips") return true;

  if (activeTab === "1X2 Tips") {
    return ["1", "X", "2", "1X", "X2", "12"].includes(match.tip);
  }

  if (activeTab === "Over/Under 2.5") {
    return /^(Over|Under) 2\.5$/.test(match.tip);
  }

  if (activeTab === "Both Teams to Score") return match.tip === "GG";

  // Correct-score and accumulator picks are published separately, not inferred from a fixture.
  return false;
}

export default function MatchTable({ matches, showTips = true, leagueFilter }: MatchTableProps) {
  const [activeTab, setActiveTab] = useState<string>("Main Games");
  const [search, setSearch] = useState("");
  const [dateOffset, setDateOffset] = useState(0);
  const [visibleMatches, setVisibleMatches] = useState(matches);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [displayLimit, setDisplayLimit] = useState(120);
  useEffect(() => {
    if (dateOffset === 0) {
      setVisibleMatches(matches);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setLoadError("");

    fetch(`/api/matches?offset=${dateOffset}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load fixtures");
        return response.json() as Promise<{ matches: Match[] }>;
      })
      .then((data) => setVisibleMatches(data.matches))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError("Fixtures could not be refreshed. Please try another day.");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [dateOffset, matches]);

  useEffect(() => setDisplayLimit(120), [activeTab, search, dateOffset, leagueFilter]);

  const filtered = visibleMatches.filter((m) => {
    if (leagueFilter && m.leagueCode !== leagueFilter) return false;
    if (!matchesActiveTab(m, activeTab)) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.homeTeam.toLowerCase().includes(q) ||
      m.awayTeam.toLowerCase().includes(q) ||
      m.league.toLowerCase().includes(q)
    );
  });

  const displayed = filtered.slice(0, displayLimit);
  const grouped = displayed.reduce(
    (acc, m) => {
      const date = m.date || "Upcoming";
      if (!acc[date]) acc[date] = {};
      if (!acc[date][m.league]) acc[date][m.league] = [];
      acc[date][m.league].push(m);
      return acc;
    },
    {} as Record<string, Record<string, Match[]>>
  );

  const hasMultipleDates = new Set(visibleMatches.map((match) => match.date).filter(Boolean)).size > 1;

  const dateLabel = (() => {
    const d = new Date();
    d.setDate(d.getDate() + dateOffset);
    if (dateOffset === 0) {
      if (hasMultipleDates) return `Next 7 days · ${visibleMatches.length} fixtures`;
      const shownDate = visibleMatches[0]?.date;
      const today = d.toISOString().split("T")[0];
      if (shownDate && shownDate !== today) {
        return `Next fixtures · ${new Date(`${shownDate}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}`;
      }
      return "Today";
    }
    if (dateOffset === -1) return "Yesterday";
    if (dateOffset === 1) return "Tomorrow";
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  })();

  return (
    <div className="rounded bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="relative -mx-4 mb-3 aspect-[1800/620] overflow-hidden rounded-t md:aspect-[3200/620]">
          <Image
            src="/images/bebatips-hero-mobile.png"
            alt="BebaTips — Fixtures, tips and the edge"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 0px"
            className="block object-cover object-bottom md:hidden"
          />
          <Image
            src="/images/bebatips-hero-desktop.png"
            alt="BebaTips — Fixtures, tips and the edge"
            fill
            priority
            sizes="(min-width: 768px) 100vw, 0px"
            className="hidden object-cover md:block"
          />
        </div>
        {visibleMatches.some((match) => match.source === "football-data") && (
          <p className="mt-1 text-[11px] font-medium text-emerald-600">● Live feeds connected</p>
        )}
        {visibleMatches.every((match) => match.source === "sports-db") && (
          <p className="mt-1 text-[11px] font-medium text-blue-600">● Worldwide fixtures · refreshed automatically</p>
        )}
        {visibleMatches.every((match) => match.source === "fallback") && (
          <p className="mt-1 text-xs font-medium text-amber-600">● Sample fixtures · live providers are temporarily unavailable</p>
        )}
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

      {dateOffset !== 0 && matches.length > 0 && (
        <button
          type="button"
          onClick={() => setDateOffset(0)}
          className="w-full border-b border-gray-200 bg-green-50 px-4 py-2 text-xs font-semibold text-brand-green hover:bg-green-100"
        >
          Return to the full gameweek
        </button>
      )}

      {leagueFilter && (
        <div className="flex items-center justify-between border-b border-gray-200 bg-green-50 px-4 py-2 text-xs text-gray-700">
          <span>Showing {leagueFilter} fixtures</span>
          <Link href="/" className="font-semibold text-brand-green hover:underline">
            Show all leagues
          </Link>
        </div>
      )}

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

      {Object.entries(grouped).map(([date, leagues]) => (
        <div key={date}>
          {(hasMultipleDates || dateOffset !== 0) && date !== "Upcoming" && (
            <div className="sticky top-[60px] z-10 border-y border-gray-200 bg-white px-4 py-2.5">
              <h2 className="text-sm font-bold text-gray-800">
                {new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>
            </div>
          )}

          {Object.entries(leagues).map(([league, leagueMatches]) => (
          <div key={`${date}-${league}`}>
          <div className="flex items-center gap-2 bg-brand-navy px-4 py-2">
            {leagueMatches[0]?.leagueLogo ? (
              <SafeLogo
                src={leagueMatches[0].leagueLogo}
                alt={`${league} logo`}
                size={22}
                className="text-white"
              />
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-white">⚽</span>
            )}
            <h3 className="text-sm font-bold text-white">{league}</h3>
            {leagueMatches[0]?.matchday && (
              <span className="ml-auto text-[10px] font-medium text-gray-300">Matchday {leagueMatches[0].matchday}</span>
            )}
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
                <span className="inline-flex items-center gap-1.5">
                  {match.homeTeamLogo && <SafeLogo src={match.homeTeamLogo} alt={`${match.homeTeam} logo`} size={18} />}
                  {match.homeTeam}
                </span>
                <span className="mx-1.5 text-gray-400">vs</span>
                <span className="inline-flex items-center gap-1.5">
                  {match.awayTeamLogo && <SafeLogo src={match.awayTeamLogo} alt={`${match.awayTeam} logo`} size={18} />}
                  {match.awayTeam}
                </span>
              </span>
              {showTips && (
                <span className="shrink-0">
                  {match.tipType === "premium" ? (
                    <Link href="/premium" className="text-xs font-bold text-brand-green hover:underline">
                      VIP 🔒
                    </Link>
                  ) : match.tip === "Stats soon" ? (
                    <span className="text-[10px] font-medium text-gray-400">Stats soon</span>
                  ) : (
                    <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-brand-accent">
                      {match.tip}
                    </span>
                  )}
                </span>
              )}
              <span className="shrink-0 text-right">
                <Link
                  href={`/match/${match.id}?${hasMultipleDates && dateOffset === 0 ? "range=week" : `offset=${dateOffset}`}`}
                  className="btn-outline-green"
                >
                  TIP
                </Link>
              </span>
            </div>
          ))}
        </div>
          ))}
        </div>
      ))}

      {filtered.length > displayed.length && (
        <div className="border-t border-gray-200 p-4 text-center">
          <button type="button" onClick={() => setDisplayLimit((limit) => limit + 120)} className="btn-outline-green">
            Show more fixtures ({filtered.length - displayed.length} remaining)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="px-4 py-8 text-center text-sm text-gray-500">
          {activeTab === "Correct Score" || activeTab === "Accumulators"
            ? "These picks are published on their dedicated pages."
            : "No major-league fixtures are available for this date and filter."}
        </p>
      )}

      {isLoading && (
        <p className="border-t border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
          Loading fixtures…
        </p>
      )}

      {loadError && (
        <p className="border-t border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {loadError}
        </p>
      )}
    </div>
  );
}
