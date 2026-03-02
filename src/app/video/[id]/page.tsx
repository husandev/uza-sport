import VideoArticlePage from "@/views/VideoArticlePage";
import { getStandings } from "@/lib/football";

export default async function VideoRoute() {
  const standings = await getStandings();
  return <VideoArticlePage standings={standings} />;
}
