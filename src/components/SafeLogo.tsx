"use client";

import Image from "next/image";
import { useState } from "react";

interface SafeLogoProps {
  src?: string | null;
  alt?: string;
  size?: number;
  fallback?: string;
  className?: string;
}

export default function SafeLogo({
  src,
  alt = "",
  size = 22,
  fallback = "⚽",
  className = "",
}: SafeLogoProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center text-[11px] ${className}`}
        style={{ width: size, height: size }}
      >
        {fallback}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
