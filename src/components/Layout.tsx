import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import MatchTicker, { TickerMatch } from "@/components/MatchTicker";
import { getFixtures, getLiveFixtures } from "@/lib/football";
import { AFFixture } from "@/hooks/queries/useFixtures";
import { translateTeamName } from "@/data/teamNamesUzByName";
export const metadata: Metadata = {
  title: "UZA WC2026 — JCh-2026 maxsus loyihasi",
  description:
    "O'zbekiston terma jamoasi va Jahon chempionati 2026 haqida barcha yangiliklar",
};

const LIVE_STATUSES = [
  "1H",
  "2H",
  "HT",
  "ET",
  "BT",
  "P",
  "INT",
  "SUSP",
  "LIVE",
];
const FINISHED_STATUSES = ["FT", "AET", "PEN", "AWD", "WO"];

function formatTickerTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

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
    time: formatTickerTime(f.fixture.date),
  };
}
const  Layout = async ({ children }: { children: React.ReactNode }) => {
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
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker matches={matches} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
