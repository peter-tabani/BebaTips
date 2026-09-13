import { NextResponse } from "next/server";
import { getMatchesForDate, getUpcomingGameweekMatches, getUpcomingMatches } from "@/lib/football-api";

function validDate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedOffset = Number(searchParams.get("offset") || "0");
  const offset = Number.isInteger(requestedOffset)
    ? Math.max(-7, Math.min(14, requestedOffset))
    : 0;

  const range = searchParams.get("range");
  const requestedDate = searchParams.get("date");
  const matches = range === "week"
    ? await getUpcomingGameweekMatches(7)
    : validDate(requestedDate)
      ? await getMatchesForDate(requestedDate)
      : await getUpcomingMatches(offset);
  return NextResponse.json(
    { matches, count: matches.length, offset, date: validDate(requestedDate) ? requestedDate : undefined, range: range === "week" ? "week" : "day" },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" } }
  );
}
