import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Upcoming fixtures", detail: "Major leagues & match signals", image: "/images/tools/fixtures.avif" },
  { href: "/live-scores", label: "Match centre", detail: "Scores, status & schedule", image: "/images/tools/match-centre.avif" },
  { href: "/standings", label: "League tables", detail: "Form, goals & points", image: "/images/tools/league-tables.avif" },
  { href: "/calculator", label: "Odds calculator", detail: "Returns & implied chance", image: "/images/tools/odds-calculator.avif" },
  { href: "/blog", label: "Guides & previews", detail: "Original football analysis", image: "/images/tools/guides.avif" },
];

export default function PopularTools() {
  return (
    <aside className="overflow-hidden rounded bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-bold uppercase text-gray-700">Football tools</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded">
              <Image src={link.image} alt="" width={44} height={44} sizes="44px" className="h-full w-full object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-gray-800">{link.label}</span>
              <span className="block truncate text-xs text-gray-500">{link.detail}</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
