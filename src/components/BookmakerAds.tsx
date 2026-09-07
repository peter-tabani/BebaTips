import { bookmakers } from "@/lib/data";

export default function BookmakerAds() {
  return (
    <aside className="rounded bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-bold uppercase text-gray-700">Top Bookmakers</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {bookmakers.map((bm) => (
          <a
            key={bm.rank}
            href={bm.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-gray-50"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-xs font-bold text-white"
              style={{ backgroundColor: bm.color }}
            >
              {bm.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">{bm.rank}º</span>
                <span className="truncate text-sm font-semibold text-gray-800">{bm.name}</span>
              </div>
              <span className="text-xs font-medium text-brand-green">{bm.bonus}</span>
            </div>
            <span className="btn-green shrink-0 px-2 py-1 text-[10px]">GET NOW</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
