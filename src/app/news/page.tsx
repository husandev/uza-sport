import NewsPage from "@/views/NewsPage";
import { getStandings } from "@/lib/football";

export default async function NewsRoute() {
  const standings = await getStandings();
  return <NewsPage standings={standings} />;
}
