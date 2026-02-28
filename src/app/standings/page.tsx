import StandingsPage from "@/views/StandingsPage";
import { getStandings, getScorers } from "@/lib/football";

export default async function StandingsRoute() {
  const [data, scorers] = await Promise.all([getStandings(), getScorers()]);
  return <StandingsPage data={data} scorers={scorers} />;
}
