"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PRIMARY_LINKS = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/live-scores", label: "Live", icon: "●" },
  { href: "/accumulators", label: "Acca", icon: "✦" },
  { href: "/premium", label: "Premium", icon: "★" },
] as const;

const MORE_LINKS = [
  { href: "/jackpots", label: "Jackpots" },
  { href: "/standings", label: "Standings" },
  { href: "/calculator", label: "Odds calculator" },
  { href: "/blog", label: "Blog & guides" },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {moreOpen && (
        <div className="fixed inset-x-3 bottom-[4.75rem] z-50 rounded-xl border border-gray-200 bg-white p-2 shadow-xl md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {MORE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMoreOpen(false)} className="rounded-lg px-3 py-3 text-center text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-brand-green">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {PRIMARY_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${active ? "text-brand-green" : "text-gray-500"}`}>
                <span className={`text-lg leading-none ${active ? "scale-110" : ""}`}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
          <button type="button" onClick={() => setMoreOpen((open) => !open)} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${moreOpen ? "text-brand-green" : "text-gray-500"}`} aria-expanded={moreOpen}>
            <span className="text-lg leading-none">☰</span>
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
