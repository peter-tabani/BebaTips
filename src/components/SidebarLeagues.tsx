import { MAJOR_LEAGUES } from "@/lib/constants";

export default function SidebarLeagues() {
  return (
    <aside className="rounded bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-bold uppercase text-gray-700">Top Leagues</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {MAJOR_LEAGUES.map((league) => (
          <li key={league.id}>
            <a
              href={`/?league=${league.id}`}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-gray-50"
            >
              <span className="text-lg">{league.flag}</span>
              <div>
                <span className="font-medium text-gray-800">{league.name}</span>
                <span className="block text-xs text-gray-500">{league.country}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
