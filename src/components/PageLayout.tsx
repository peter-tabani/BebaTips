import AdBanner from "./AdBanner";
import PopularTools from "./PopularTools";
import SidebarLeagues from "./SidebarLeagues";
import MobileBottomNav from "./MobileBottomNav";

interface PageLayoutProps {
  children: React.ReactNode;
  showSidebars?: boolean;
}

export default function PageLayout({ children, showSidebars = true }: PageLayoutProps) {
  if (!showSidebars) {
    return <><div className="mx-auto max-w-[1400px] px-4 py-6 pb-24 md:pb-6">{children}</div><MobileBottomNav /></>;
  }

  return (
    <><div className="mx-auto max-w-[1400px] px-4 py-4 pb-24 md:pb-4">
      <AdBanner slot="top-leaderboard" format="leaderboard" className="mb-4 hidden md:flex" />
      <AdBanner slot="top-mobile" format="mobile" className="mb-4" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[180px_1fr_260px]">
        <div className="hidden space-y-4 lg:block">
          <SidebarLeagues />
          <AdBanner slot="left-skyscraper" format="skyscraper" />
        </div>

        <main className="min-w-0">{children}</main>

        <div className="hidden space-y-4 lg:block">
          <PopularTools />
          <AdBanner slot="right-rectangle" format="rectangle" />
        </div>
      </div>

      <div className="mt-4 lg:hidden">
        <PopularTools />
      </div>
    </div><MobileBottomNav /></>
  );
}
