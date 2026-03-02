import TeamsPage from "@/views/TeamsPage";
import { getStandings } from "@/lib/football";

export default async function TeamsRoute() {
  const standings = await getStandings();
  return <TeamsPage standings={standings} />;
}
