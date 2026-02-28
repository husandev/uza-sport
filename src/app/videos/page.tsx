import VideosPage from "@/views/VideosPage";
import { getStandings } from "@/lib/football";

export default async function VideosRoute() {
  const standings = await getStandings();
  return <VideosPage standings={standings} />;
}
