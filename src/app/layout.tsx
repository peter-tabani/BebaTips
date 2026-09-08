import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResponsibleNotice from "@/components/ResponsibleNotice";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Football Predictions & Betting Tips`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  keywords: [
    "football predictions",
    "betting tips Kenya",
    "SportPesa tips",
    "Betika jackpot",
    "free football tips",
    "premium tips SMS",
    "accumulator tips",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <ResponsibleNotice />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
