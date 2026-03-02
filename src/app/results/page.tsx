import ResultsPage from "@/views/ResultsPage";
import { getStandings, getFixtures } from "@/lib/football";

export default async function ResultsRoute() {
  const [standings, fixtures] = await Promise.all([getStandings(), getFixtures()]);
  return <ResultsPage standings={standings} fixtures={fixtures} />;
}
