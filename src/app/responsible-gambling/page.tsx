import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Responsible Gambling — Limits, Warning Signs & Help",
  description: "Practical responsible-gambling guidance for adults using football betting information.",
};

const WARNING_SIGNS = [
  "Betting with money needed for food, rent, school fees or debt payments",
  "Increasing stakes to recover a previous loss",
  "Hiding betting activity or borrowing money to continue",
  "Feeling anxious, angry or unable to stop when planned",
];

export default function ResponsibleGamblingPage() {
  return (
    <PageLayout showSidebars={false}>
      <article className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="bg-brand-navy p-6 text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Adults 18+ only</p>
          <h1 className="mt-2 text-2xl font-black md:text-3xl">Keep football betting within your limits</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">
            Betting is entertainment, not income. Every bet can lose, and no prediction model or tip can remove that risk.
          </p>
        </header>

        <div className="space-y-7 p-6 md:p-8">
          <section>
            <h2 className="text-lg font-bold text-gray-900">Before you place a bet</h2>
            <ul className="mt-3 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
              <li className="rounded border border-gray-200 p-4"><strong>Set a cash limit.</strong><br />Use only money you can afford to lose.</li>
              <li className="rounded border border-gray-200 p-4"><strong>Set a time limit.</strong><br />Do not let live markets keep you online.</li>
              <li className="rounded border border-gray-200 p-4"><strong>Do not chase.</strong><br />A previous loss does not make the next bet more likely to win.</li>
              <li className="rounded border border-gray-200 p-4"><strong>Take breaks.</strong><br />Avoid betting when stressed, upset or under the influence.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900">Warning signs</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {WARNING_SIGNS.map((sign) => <li key={sign} className="flex gap-2"><span className="font-bold text-red-500">•</span>{sign}</li>)}
            </ul>
          </section>

          <section className="rounded bg-amber-50 p-5">
            <h2 className="font-bold text-amber-950">If betting is becoming difficult</h2>
            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              Stop betting, ask each operator to close or self-exclude your account, block gambling payments where your provider supports it, and speak to someone you trust. Seek qualified local counselling or medical help if gambling is affecting your safety, finances or wellbeing.
            </p>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
