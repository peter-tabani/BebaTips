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
  const localPreviewEnabled =
    process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_AD_PREVIEW === "true";
  const previewImage =
    format === "skyscraper"
      ? "/ads/tucheze_ad3.png"
      : format === "rectangle"
        ? "/ads/tucheze_ad2.png"
        : format === "mobile"
          ? "/ads/tucheze_ad.png"
          : "/ads/tucheze_ad.png";
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isConfigured = adsenseClient && !adsenseClient.includes("xxxxxxxx");

  if (localPreviewEnabled) {
    const isTopBanner = slot === "top-leaderboard" || slot === "top-mobile";
    const previewSizeClass =
      isTopBanner
        ? format === "mobile"
          ? "relative mx-auto flex aspect-[3/1] w-full max-w-[450px] items-center justify-center overflow-hidden rounded md:hidden"
          : "relative mx-auto flex aspect-[3200/620] w-full max-w-[850px] items-center justify-center overflow-hidden rounded"
        : format === "skyscraper"
        ? "ad-slot min-h-[600px] w-full max-w-[160px] !bg-transparent"
        : format === "rectangle"
          ? "ad-slot min-h-[250px] !bg-transparent"
          : format === "mobile"
            ? "ad-slot min-h-[50px] md:hidden !bg-transparent"
            : "ad-slot-leaderboard !bg-transparent";

    return (
      <div className={`${previewSizeClass} ${className}`}>
        <img
          src={previewImage}
          alt="Tucheze football betting advertisement local preview"
          className={
            isTopBanner
              ? "h-full w-full object-cover"
              : "h-full max-h-[600px] w-full object-contain"
          }
        />
        <span className="absolute right-1 top-1 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
          Local preview
        </span>
      </div>
    );
  }

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
