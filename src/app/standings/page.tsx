import StandingsPage from "@/views/StandingsPage";
import { getStandings } from "@/lib/football";

export default async function StandingsRoute() {
  const data = await getStandings();
  return <StandingsPage data={data} />;
}
