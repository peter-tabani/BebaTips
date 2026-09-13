"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SafeLogo from "./SafeLogo";
import type { Match } from "@/lib/types";

function nairobiDate(offset = 0): string {
  const target = new Date(Date.now() + offset * 86400000);
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Africa/Nairobi",
  }).formatToParts(target);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function readableDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function statusLabel(status?: string): string {
  return (status || "Scheduled").replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function MatchCentre({ initialMatches }: { initialMatches: Match[] }) {
  const [selectedDate, setSelectedDate] = useState(nairobiDate());
  const [matches, setMatches] = useState(initialMatches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedDate === nairobiDate()) {
      setMatches(initialMatches);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/matches?date=${encodeURIComponent(selectedDate)}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load matches");
        return response.json() as Promise<{ matches: Match[] }>;
      })
      .then((data) => setMatches(data.matches))
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError("Matches could not be loaded for this date. Please try again.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [initialMatches, selectedDate]);

  const leagues = useMemo(() => {
    return matches.reduce<Record<string, Match[]>>((groups, match) => {
      (groups[match.league] ||= []).push(match);
      return groups;
    }, {});
  }, [matches]);

  return (
    <div className="rounded bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4">
        <h1 className="section-title">Football Match Centre</h1>
        <p className="mt-1 text-sm text-gray-500">Browse past results, today&apos;s matches and future fixtures.</p>
      </div>

      <div className="border-b border-gray-200 bg-gray-50 px-3 py-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { label: "Yesterday", date: nairobiDate(-1) },
            { label: "Today", date: nairobiDate() },
            { label: "Tomorrow", date: nairobiDate(1) },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setSelectedDate(option.date)}
              className={`rounded px-3 py-1.5 text-xs font-semibold ${selectedDate === option.date ? "bg-brand-green text-white" : "border border-gray-200 bg-white text-gray-600 hover:border-brand-green"}`}
            >
              {option.label}
            </button>
          ))}
          <label className="relative rounded border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-brand-green">
            Calendar
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => event.target.value && setSelectedDate(event.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Choose match date"
            />
          </label>
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-gray-700">{readableDate(selectedDate)}</p>
      </div>

      {loading && <p className="px-4 py-3 text-center text-sm text-gray-500">Loading matches…</p>}
      {error && <p className="bg-red-50 px-4 py-3 text-center text-sm text-red-700">{error}</p>}

      {!loading && Object.entries(leagues).map(([league, leagueMatches]) => (
        <section key={league}>
          <div className="flex items-center gap-2 bg-brand-navy px-4 py-2 text-white">
            {leagueMatches[0]?.leagueLogo ? <SafeLogo src={leagueMatches[0].leagueLogo} alt={`${league} logo`} size={22} /> : <span>⚽</span>}
            <h2 className="text-sm font-bold">{league}</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {leagueMatches.map((match) => {
              const hasScore = match.homeScore != null && match.awayScore != null;
              return (
                <Link
                  key={match.id}
                  href={`/match/${match.id}?date=${encodeURIComponent(selectedDate)}`}
                  className="grid grid-cols-[54px_1fr_auto] items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                >
                  <span className="font-mono text-xs font-semibold text-gray-500">{hasScore ? "FT" : match.time}</span>
                  <span className="min-w-0 font-medium text-gray-800">
                    <span className="block truncate">{match.homeTeam}</span>
                    <span className="block truncate">{match.awayTeam}</span>
                  </span>
                  <span className="text-right">
                    {hasScore && <span className="block font-mono text-base font-bold text-gray-800">{match.homeScore} – {match.awayScore}</span>}
                    <span className="block text-[10px] font-semibold text-gray-500">{statusLabel(match.status)}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {!loading && matches.length === 0 && !error && (
        <p className="px-4 py-10 text-center text-sm text-gray-500">No matches were returned by the connected feeds for this date.</p>
      )}
    </div>
  );
}
