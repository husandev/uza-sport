import StadiumArticlePage from "@/views/StadiumArticlePage";
import { getStandings } from "@/lib/football";

export default async function StadiumRoute() {
  const standings = await getStandings();
  return <StadiumArticlePage standings={standings} />;
}
