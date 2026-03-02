import type { Metadata } from "next";
import Index from "@/views/Index";
import { getStandings, getFixtures } from "@/lib/football";
import { teamNamesUzByName } from "@/data/teamNamesUzByName";
import { NextMatchData } from "@/components/MatchCountdown";

export const metadata: Metadata = {
  title: "Bosh sahifa — O'zbekiston va JCh-2026",
  description: "O'zbekiston terma jamoasi va Jahon chempionati 2026 so'nggi yangiliklar, natijalar va jadval.",
};

const FINISHED_STATUSES = ["FT", "AET", "PEN", "AWD", "WO"];

export default async function HomePage() {
  const [standings, fixtures] = await Promise.all([getStandings(), getFixtures()]);

  const allList = fixtures?.response ?? [];
  const uzbFixtures = allList.filter(
    (f) => f.teams.home.name === "Uzbekistan" || f.teams.away.name === "Uzbekistan"
  );
  const upcoming = uzbFixtures
    .filter((f) => !FINISHED_STATUSES.includes(f.fixture.status.short))
    .sort((a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime());

  const nextFixture = upcoming[0] ?? null;
  const nextMatch: NextMatchData | null = nextFixture
    ? {
        date: nextFixture.fixture.date,
        homeName: teamNamesUzByName[nextFixture.teams.home.name] ?? nextFixture.teams.home.name,
        awayName: teamNamesUzByName[nextFixture.teams.away.name] ?? nextFixture.teams.away.name,
        homeLogo: nextFixture.teams.home.logo,
        awayLogo: nextFixture.teams.away.logo,
        venue: nextFixture.fixture.venue.name,
        round: nextFixture.league.round,
      }
    : null;

  return <Index standings={standings} nextMatch={nextMatch} />;
}
