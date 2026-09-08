const FEATURES = [
  {
    icon: "✓",
    title: "Transparent Match Signals",
    text: "See the table-form basis behind automated match indicators instead of unsupported promises.",
  },
  {
    icon: "$",
    title: "Jackpot Predictions",
    text: "Organized jackpot match cards with room for form notes and independently reviewed selections.",
  },
  {
    icon: "📊",
    title: "Betting Strategies",
    text: "Bankroll management guides, market analysis, and a betting blog with resources for every level.",
  },
  {
    icon: "⏱",
    title: "Fast Mobile Experience",
    text: "Check fixtures, league tables, match signals and calculators from a lightweight mobile layout.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mt-6 rounded bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
        Why Choose Us
      </p>
      <h2 className="mt-2 text-xl font-bold text-brand-green md:text-2xl">
        Football data and betting tools built for Kenyan fans
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        BebaTips brings fixtures, current tables, simple statistical signals and practical odds
        tools into one mobile-friendly place. Signals explain their data basis and should be used
        as information—not as a promise that a match or ticket will win.
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
