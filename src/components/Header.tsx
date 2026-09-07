"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark shadow-lg">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-brand-green text-lg font-black text-white">
            BT
          </span>
          <span className="hidden text-lg font-bold text-white sm:block">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href ? "nav-link-active" : "nav-link"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/premium"
          className="hidden rounded bg-brand-green px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-accent sm:block"
        >
          GET VIP TIPS
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-gray-800 bg-brand-dark px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2.5 text-sm ${pathname === link.href ? "font-semibold text-brand-green" : "text-gray-300"}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/premium"
            className="btn-green mt-3 block w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            GET VIP TIPS
          </Link>
        </nav>
      )}
    </header>
  );
}
