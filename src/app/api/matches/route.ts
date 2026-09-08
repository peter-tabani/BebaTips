import { NextResponse } from "next/server";
import { getUpcomingGameweekMatches, getUpcomingMatches } from "@/lib/football-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedOffset = Number(searchParams.get("offset") || "0");
  const offset = Number.isInteger(requestedOffset)
    ? Math.max(-7, Math.min(14, requestedOffset))
    : 0;

  const range = searchParams.get("range");
  const matches = range === "week" ? await getUpcomingGameweekMatches(7) : await getUpcomingMatches(offset);
  return NextResponse.json(
    { matches, count: matches.length, offset, range: range === "week" ? "week" : "day" },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" } }
  );
}
