import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import BookmakerAds from "@/components/BookmakerAds";

export const metadata: Metadata = {
  title: "Bookmaker Comparison & Affiliate Disclosure",
  description: "BebaTips bookmaker comparison area and disclosure policy for Kenyan football fans.",
};

export default function BookmakersPage() {
  return (
    <PageLayout showSidebars={false}>
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-[1fr_360px]">
        <article className="rounded bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Commercial section</p>
          <h1 className="mt-2 text-2xl font-black text-gray-900">Bookmaker comparison</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            No outbound bookmaker links are active yet. Before a partner is listed, BebaTips must verify its current Kenyan authorization, offer terms, age controls and responsible-gambling information.
          </p>
          <div className="mt-5 rounded border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
            Future commercial links will be labeled as sponsored. A commission may be earned when a visitor follows an eligible partner link. That must not influence factual comparison criteria.
          </div>
          <h2 className="mt-6 font-bold text-gray-900">Planned comparison criteria</h2>
          <ul className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
            <li>Kenyan licence verification</li>
            <li>Deposit and withdrawal methods</li>
            <li>Published offer terms</li>
            <li>Market and odds availability</li>
            <li>Responsible-play controls</li>
            <li>Customer support channels</li>
          </ul>
        </article>
        <BookmakerAds />
      </div>
    </PageLayout>
  );
}
