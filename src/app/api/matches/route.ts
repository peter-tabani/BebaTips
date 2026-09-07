import { NextResponse } from "next/server";
import { getUpcomingMatches } from "@/lib/football-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") || "0");

  const matches = await getUpcomingMatches(offset);
  return NextResponse.json({ matches, count: matches.length });
}
