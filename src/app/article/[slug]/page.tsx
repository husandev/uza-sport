import ArticlePage from "@/views/ArticlePage";
import { getScorers } from "@/lib/football";

export default async function ArticleRoute() {
  const scorers = await getScorers();
  return <ArticlePage scorers={scorers} />;
}
