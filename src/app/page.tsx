import type { Metadata } from "next";
import Index from "@/views/Index";
import { getStandings, getFixtures, getScorers, FINISHED_STATUSES } from "@/lib/football";
import { NextMatchData } from "@/components/MatchCountdown";
import { translateTeamName } from "@/data/teamNamesUzByName";

export const metadata: Metadata = {
  title: "Bosh sahifa — O'zbekiston va JCh-2026",
  description:
    "O'zbekiston terma jamoasi va Jahon chempionati 2026 so'nggi yangiliklar, natijalar va jadval.",
};

export default async function HomePage() {
  const [standings, fixtures, scorers] = await Promise.all([
    getStandings(),
    getFixtures(),
    getScorers(),
  ]);

  const allList = fixtures?.response ?? [];
  const uzbFixtures = allList.filter(
    (f) =>
      f.teams.home.name === "Uzbekistan" || f.teams.away.name === "Uzbekistan",
  );
  const upcoming = uzbFixtures
    .filter((f) => !FINISHED_STATUSES.includes(f.fixture.status.short))
    .sort(
      (a, b) =>
        new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime(),
    );

  const nextFixture = upcoming[0] ?? null;
  const nextMatch: NextMatchData | null = nextFixture
    ? {
        date: nextFixture.fixture.date,
        homeName: translateTeamName(nextFixture.teams.home.name),
        awayName: translateTeamName(nextFixture.teams.away.name),
        homeLogo: nextFixture.teams.home.logo,
        awayLogo: nextFixture.teams.away.logo,
        homeId: nextFixture.teams.home.id,
        awayId: nextFixture.teams.away.id,
        venue: nextFixture.fixture.venue.name,
        round: nextFixture.league.round,
      }
    : null;

  return <Index standings={standings} nextMatch={nextMatch} scorers={scorers} />;
}
