interface AdBannerProps {
  slot: string;
  format?: "leaderboard" | "skyscraper" | "rectangle" | "mobile";
  className?: string;
}

const SIZES: Record<string, string> = {
  leaderboard: "728 × 90",
  skyscraper: "160 × 600",
  rectangle: "300 × 250",
  mobile: "320 × 50",
};

export default function AdBanner({ slot, format = "leaderboard", className = "" }: AdBannerProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isConfigured = adsenseClient && !adsenseClient.includes("xxxxxxxx");

  if (isConfigured) {
    return (
      <div className={`ad-slot ${className}`}>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={adsenseClient}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  const sizeClass =
    format === "skyscraper"
      ? "ad-slot-skyscraper"
      : format === "rectangle"
        ? "ad-slot min-h-[250px]"
        : format === "mobile"
          ? "ad-slot min-h-[50px] md:hidden"
          : "ad-slot-leaderboard";

  return (
    <div className={`${sizeClass} ${className}`}>
      <div className="p-4">
        <span className="absolute right-1 top-1 rounded bg-red-500 px-1 text-[9px] font-bold text-white">
          Ad
        </span>
        <p className="text-gray-500">Advertisement</p>
        <p className="mt-1 text-[10px] text-gray-400">{SIZES[format]}</p>
        <p className="mt-2 text-[10px] text-gray-300">Slot: {slot}</p>
      </div>
    </div>
  );
}
