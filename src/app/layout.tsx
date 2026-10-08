import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResponsibleNotice from "@/components/ResponsibleNotice";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || SITE_URL),
  title: {
    default: `${SITE_NAME} | Football Predictions & Betting Tips`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Free football predictions, live scores, fixtures, accumulator tips and jackpot analysis for football fans in Kenya and beyond.",
  icons: {
    icon: "/images/bebatips-logo.png",
    apple: "/images/bebatips-logo.png",
  },
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
    title: `${SITE_NAME} | Football Predictions & Betting Tips`,
    description: "Free football predictions, live scores, fixtures, accumulator tips and jackpot analysis for football fans in Kenya and beyond.",
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "/images/bebatips-hero-desktop.png",
        width: 1800,
        height: 620,
        alt: "BebaTips football predictions, fixtures and betting tips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Football Predictions & Betting Tips`,
    description: "Free football predictions, live scores, fixtures, accumulator tips and jackpot analysis for football fans in Kenya and beyond.",
    images: ["/images/bebatips-hero-desktop.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  logo: `${SITE_URL}/images/bebatips-logo.png`,
                  sameAs: [
                    "https://x.com/BebaTipsKe",
                    "https://www.instagram.com/bebatipske",
                    "https://www.tiktok.com/@bebatips5",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  description: SITE_TAGLINE,
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: "en-KE",
                },
              ],
            }),
          }}
        />
        <Header />
        <ResponsibleNotice />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
