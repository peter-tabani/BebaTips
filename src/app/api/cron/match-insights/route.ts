import { NextResponse } from "next/server";
import { warmUpcomingMatchInsights } from "@/lib/football-api";

export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await warmUpcomingMatchInsights();
  return NextResponse.json({ ok: true, ...result, refreshedAt: new Date().toISOString() });
}
