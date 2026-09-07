"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("bebatips-cookies");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("bebatips-cookies", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark px-4 py-3 shadow-2xl">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-gray-300 sm:text-sm">
          We use cookies to improve your experience and show relevant ads. By continuing, you agree to our cookie policy.
        </p>
        <div className="flex shrink-0 gap-3">
          <Link href="/privacy" className="text-xs text-gray-400 hover:text-white">
            Privacy
          </Link>
          <button type="button" onClick={accept} className="btn-green px-5 py-1.5 text-xs">
            IT&apos;S OK
          </button>
        </div>
      </div>
    </div>
  );
}
