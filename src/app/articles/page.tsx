import ArticlesPage from "@/views/ArticlesPage";
import { getStandings } from "@/lib/football";

export default async function ArticlesRoute() {
  const standings = await getStandings();
  return <ArticlesPage standings={standings} />;
}
