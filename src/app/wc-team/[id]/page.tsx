import TeamWCPage from "@/views/TeamWCPage";
import { getStandings, getFixtures, getScorers, getTeamInfo, getTeamSquad } from "@/lib/football";

export default async function TeamWCRoute({ params }: { params: { id: string } }) {
  const teamId = Number(params.id);
  const [standings, fixtures, scorers, teamInfo, squad] = await Promise.all([
    getStandings(),
    getFixtures(),
    getScorers(),
    getTeamInfo(teamId),
    getTeamSquad(teamId),
  ]);
  return (
    <TeamWCPage
      teamId={teamId}
      standings={standings}
      fixtures={fixtures}
      scorers={scorers}
      teamInfo={teamInfo}
      squad={squad}
    />
  );
}
