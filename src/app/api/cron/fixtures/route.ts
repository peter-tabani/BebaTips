import { NextResponse } from "next/server";
import { getUpcomingGameweekMatches } from "@/lib/football-api";

export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const matches = await getUpcomingGameweekMatches(7);
  return NextResponse.json({
    ok: true,
    count: matches.length,
    refreshedAt: new Date().toISOString(),
  });
}
