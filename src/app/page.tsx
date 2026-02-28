import Index from "@/views/Index";
import { getStandings } from "@/lib/football";

export default async function HomePage() {
  const standings = await getStandings();
  return <Index standings={standings} />;
}
