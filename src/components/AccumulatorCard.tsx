import type { AccumulatorTip } from "@/lib/types";

export default function AccumulatorCard({ acca }: { acca: AccumulatorTip }) {
  return (
    <div className="overflow-hidden rounded bg-white shadow-sm">
      <div className="flex items-center justify-between bg-brand-navy px-4 py-3">
        <h3 className="text-sm font-bold text-white">{acca.title}</h3>
        <div className="flex items-center gap-2">
          {acca.totalOdds ? (
            <span className="rounded bg-brand-green px-2 py-0.5 text-xs font-bold text-white">
              {acca.totalOdds} odds
            </span>
          ) : acca.badge ? (
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
              {acca.badge}
            </span>
          ) : null}
          {acca.result === "won" && (
            <span className="rounded bg-yellow-500 px-2 py-0.5 text-[10px] font-bold text-white">
              WON ✓
            </span>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {acca.legs.map((leg, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 text-sm">
            <span className="w-20 shrink-0 font-mono text-xs text-gray-500">
              {leg.date ? `${new Date(`${leg.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short" })} ` : ""}{leg.time}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-800">{leg.prediction}</p>
              <p className="truncate text-xs text-gray-500">
                {leg.match} · {leg.league}
              </p>
            </div>
          </div>
        ))}
      </div>

      {acca.result === "won" && (
        <div className="bg-pink-50 px-4 py-2 text-center text-xs font-semibold text-blue-700">
          {acca.totalOdds}/1 ACCA WINNER — posted Friday
        </div>
      )}
    </div>
  );
}
