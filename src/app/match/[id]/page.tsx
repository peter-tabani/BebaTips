import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { getUpcomingMatches } from "@/lib/football-api";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const matches = await getUpcomingMatches(0);
  const match = matches.find((m) => m.id === Number(id));

  if (!match) notFound();

  return (
    <PageLayout>
      <div className="rounded bg-white p-6 shadow-sm">
        <p className="text-xs text-gray-500">{match.league} · {match.time}</p>
        <h1 className="mt-2 text-2xl font-bold text-gray-800">
          {match.homeTeam} vs {match.awayTeam}
        </h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded border border-gray-200 p-4">
            <h2 className="text-xs font-bold uppercase text-gray-500">Free Tip</h2>
            {match.tipType === "free" ? (
              <p className="mt-2 text-2xl font-bold text-brand-green">{match.tip}</p>
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                This pick is available on our{" "}
                <Link href="/premium" className="font-semibold text-brand-green hover:underline">
                  Premium plan
                </Link>
                .
              </p>
            )}
          </div>
          <div className="rounded border border-gray-200 p-4">
            <h2 className="text-xs font-bold uppercase text-gray-500">Match Info</h2>
            <p className="mt-2 text-sm text-gray-600">Kickoff: {match.time} EAT</p>
            <p className="text-sm text-gray-600">Status: {match.status || "Scheduled"}</p>
          </div>
        </div>

        <div className="mt-6 rounded bg-gray-50 p-4 text-sm text-gray-600">
          <p>
            Our analysts review form, injuries, and head-to-head stats before every pick.
            For the full analysis and combined odds, check our{" "}
            <Link href="/accumulators" className="text-brand-green hover:underline">accumulators</Link>{" "}
            or subscribe to{" "}
            <Link href="/premium" className="text-brand-green hover:underline">premium tips</Link>.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
