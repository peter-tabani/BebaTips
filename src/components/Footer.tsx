import Link from "next/link";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import SocialIcon from "@/components/SocialIcon";
import BrandLogo from "@/components/BrandLogo";

const socialStyles = {
  X: "border border-white/20 bg-black",
  Facebook: "bg-[#1877f2]",
  Instagram: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
  TikTok: "border border-white/20 bg-black",
} as const;

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-dark text-gray-400">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <BrandLogo className="h-10 w-10" />
            <span className="text-lg font-bold text-white">{SITE_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed">
            Football fixtures, league tables, transparent statistical signals and practical odds tools for Kenyan fans.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-brand-green">Today&apos;s Predictions</Link></li>
            <li><Link href="/premium" className="hover:text-brand-green">Premium Tips</Link></li>
            <li><Link href="/jackpots" className="hover:text-brand-green">Jackpot Predictions</Link></li>
            <li><Link href="/accumulators" className="hover:text-brand-green">Accumulators</Link></li>
            <li><Link href="/blog" className="hover:text-brand-green">Betting Blog</Link></li>
            <li><Link href="/responsible-gambling" className="hover:text-brand-green">Responsible Gambling</Link></li>
            <li><Link href="/bookmakers" className="hover:text-brand-green">Bookmaker Comparison</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase text-white">Markets We Cover</h4>
          <p className="text-sm leading-relaxed">
            1X2 · Over/Under · BTTS · Correct Score · Double Chance · Handicap ·
            Accumulators · Bankers · SportPesa Mega Jackpot · Betika Midweek Jackpot
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase text-white">Follow BebaTips</h4>
          <ul className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow BebaTips on ${social.name} (${social.label})`}
                  title={`Follow us on ${social.name}`}
                  className="group flex min-w-28 items-center gap-2 rounded-full bg-white/5 py-1.5 pl-1.5 pr-3 text-sm text-gray-200 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform group-hover:scale-110 ${socialStyles[social.name]}`}
                  >
                    <SocialIcon name={social.name} />
                  </span>
                  <span className="font-semibold">{social.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 px-4 py-4 text-center text-xs">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. Gambling can be addictive. Please bet responsibly. 18+
        </p>
        <p className="mt-1">
          <Link href="/privacy" className="hover:text-brand-green">Privacy Policy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-brand-green">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
