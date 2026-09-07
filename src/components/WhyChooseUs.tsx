const FEATURES = [
  {
    icon: "✓",
    title: "Premium Football Tips",
    text: "Daily 3+ odds, 5+ odds, and 15+ odds packages with guaranteed returns of 3–15x your stake.",
  },
  {
    icon: "$",
    title: "Jackpot Predictions",
    text: "SportPesa Mega Jackpot and Betika Midweek Jackpot picks from analysts who track form and injuries.",
  },
  {
    icon: "📊",
    title: "Betting Strategies",
    text: "Bankroll management guides, market analysis, and a betting blog with resources for every level.",
  },
  {
    icon: "⏱",
    title: "Instant SMS Delivery",
    text: "Purchased tips land on your phone within seconds via SMS — no app download needed.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mt-6 rounded bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
        Why Choose Us
      </p>
      <h2 className="mt-2 text-xl font-bold text-brand-green md:text-2xl">
        Best Football Predictions &amp; Betting Tips in Kenya
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        BebaTips brings together Kenya&apos;s sharpest football analysts to deliver predictions
        you can actually use. We cover the Premier League, Champions League, Kenyan Premier League,
        and 40+ international leagues with a focus on markets that pay — Over/Under, BTTS, 1X2,
        and accumulators.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title}>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              {f.icon}
            </div>
            <h3 className="text-sm font-bold text-gray-800">{f.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
