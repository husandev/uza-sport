import TeamArticlePage from "@/views/TeamArticlePage";
import { getStandings } from "@/lib/football";

export default async function TeamRoute() {
  const standings = await getStandings();
  return <TeamArticlePage standings={standings} />;
}
