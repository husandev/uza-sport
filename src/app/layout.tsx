import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import MatchTicker, { TickerMatch } from "@/components/MatchTicker";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getFixtures, getLiveFixtures } from "@/lib/football";
import { teamNamesUzByName } from "@/data/teamNamesUzByName";
import { AFFixture } from "@/hooks/queries/useFixtures";

export const metadata: Metadata = {
  title: "UZA WC2026 — JCh-2026 maxsus loyihasi",
  description: "O'zbekiston terma jamoasi va Jahon chempionati 2026 haqida barcha yangiliklar",
};

const LIVE_STATUSES = ["1H", "2H", "HT", "ET", "BT", "P", "INT", "SUSP", "LIVE"];
const FINISHED_STATUSES = ["FT", "AET", "PEN", "AWD", "WO"];

function formatTickerTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function toTickerMatch(f: AFFixture): TickerMatch {
  const status = f.fixture.status.short;
  return {
    id: f.fixture.id,
    home: teamNamesUzByName[f.teams.home.name] ?? f.teams.home.name,
    away: teamNamesUzByName[f.teams.away.name] ?? f.teams.away.name,
    homeLogo: f.teams.home.logo,
    awayLogo: f.teams.away.logo,
    hScore: f.goals.home,
    aScore: f.goals.away,
    isLive: LIVE_STATUSES.includes(status),
    isFinished: FINISHED_STATUSES.includes(status),
    minute: f.fixture.status.elapsed !== null ? `${f.fixture.status.elapsed}'` : null,
    time: formatTickerTime(f.fixture.date),
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
    <html lang="uz">
      <body>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            <MatchTicker matches={matches} />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
