import WCPlayerPage from "@/views/WCPlayerPage";
import { getWCPlayer } from "@/lib/football";

export default async function WCPlayerRoute({ params }: { params: { id: string } }) {
  const playerId = Number(params.id);
  const playerData = await getWCPlayer(playerId);
  return <WCPlayerPage playerId={playerId} playerData={playerData} />;
}
