import type { Metadata } from "next";
import HeroesPage from "@/views/HeroesPage";
import { getStandings } from "@/lib/football";

export const metadata: Metadata = {
  title: "O'zbek qahramonlari",
  description: "JCh-2026 ga boruvchi O'zbekiston terma jamoasi futbolchilari — statistika va biografiyalar.",
};

export default async function HeroesRoute() {
  const standings = await getStandings();
  return <HeroesPage standings={standings} />;
}
