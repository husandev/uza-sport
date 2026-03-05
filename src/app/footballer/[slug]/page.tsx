import FootballerPage from "@/views/FootballerPage";
import { getScorers } from "@/lib/football";

export default async function FootballerRoute() {
  const scorers = await getScorers();
  return <FootballerPage scorers={scorers} />;
}
