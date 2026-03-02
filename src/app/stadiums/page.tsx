import StadiumsPage from "@/views/StadiumsPage";
import { getStandings } from "@/lib/football";

export default async function StadiumsRoute() {
  const standings = await getStandings();
  return <StadiumsPage standings={standings} />;
}
