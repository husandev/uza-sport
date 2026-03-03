import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import MatchTicker, { TickerMatch } from "@/components/MatchTicker";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getFixtures, getLiveFixtures, LIVE_STATUSES, FINISHED_STATUSES } from "@/lib/football";
import { AFFixture } from "@/hooks/queries/useFixtures";
import { translateTeamName } from "@/data/teamNamesUzByName";
import { formatMatchTime } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wc2026.uza.uz"),
  title: {
    default: "UZA WC2026 — Jahon chempionati 2026",
    template: "%s | UZA WC2026",
  },
  description:
    "O'zbekiston terma jamoasi va FIFA Jahon chempionati 2026 haqida barcha yangiliklar, natijalar, jadval va statistika.",
  keywords: [
    "Jahon chempionati 2026",
    "O'zbekiston terma jamoasi",
    "WC2026",
    "FIFA",
    "futbol",
    "JCh-2026",
  ],
  authors: [{ name: "UZA.uz" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://wc2026.uza.uz",
    siteName: "UZA WC2026",
    title: "UZA WC2026 — Jahon chempionati 2026",
    description:
      "O'zbekiston terma jamoasi va FIFA Jahon chempionati 2026 haqida barcha yangiliklar, natijalar, jadval va statistika.",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "UZA WC2026" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UZA WC2026 — Jahon chempionati 2026",
    description:
      "O'zbekiston terma jamoasi va FIFA Jahon chempionati 2026 haqida barcha yangiliklar.",
    images: ["/og-image.jpg"],
  },
};

function toTickerMatch(f: AFFixture): TickerMatch {
  const status = f.fixture.status.short;
  return {
    id: f.fixture.id,
    home: translateTeamName(f.teams.home.name),
    away: translateTeamName(f.teams.away.name),
    homeLogo: f.teams.home.logo,
    awayLogo: f.teams.away.logo,
    hScore: f.goals.home,
    aScore: f.goals.away,
    isLive: LIVE_STATUSES.includes(status),
    isFinished: FINISHED_STATUSES.includes(status),
    minute:
      f.fixture.status.elapsed !== null ? `${f.fixture.status.elapsed}'` : null,
    time: formatMatchTime(f.fixture.date),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Hozir live o'yinlar bormi?
  const liveFixtures = await getLiveFixtures();
  const liveList = liveFixtures?.response ?? [];

  let matches: TickerMatch[];

  if (liveList.length > 0) {
    // Faqat live o'yinlarni ko'rsat
    matches = liveList.map(toTickerMatch);
  } else {
    // Live yo'q — bugungi va yaqin 3 kunlik o'yinlarni ko'rsat
    const allFixtures = await getFixtures();
    const allList = allFixtures?.response ?? [];

    const now = Date.now();
    const threeDays = 3 * 24 * 60 * 60 * 1000;

    const recent = allList.filter((f) => {
      const diff = now - new Date(f.fixture.date).getTime();
      return Math.abs(diff) <= threeDays;
    });

    // Agar yaqin 3 kunda o'yin bo'lmasa — barcha o'yinlarni ko'rsat
    matches = (recent.length > 0 ? recent : allList).map(toTickerMatch);
  }

  return (
    <html lang="uz" className={inter.variable}>
      <body>
        <Providers>
          <div className="min-h-screen bg-background">
            <ErrorBoundary>
              <Header />
            </ErrorBoundary>
            <ErrorBoundary>
              <MatchTicker matches={matches} />
            </ErrorBoundary>
            <ScrollToTop />
            <main>
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
        </Providers>
      </body>
    </html>
  );
}
