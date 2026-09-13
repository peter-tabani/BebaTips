import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import MatchCentre from "@/components/MatchCentre";
import { getUpcomingMatches } from "@/lib/football-api";

export const metadata: Metadata = {
  title: "Football Match Centre — Fixtures, Results & Status",
  description: "Automatically refreshed football fixtures, match status and results from major leagues.",
};

export default async function LiveScoresPage() {
  const matches = await getUpcomingMatches(0);

  return (
    <PageLayout>
      <MatchCentre initialMatches={matches} />
    </PageLayout>
  );
}
