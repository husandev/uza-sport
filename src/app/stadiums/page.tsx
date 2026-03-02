import type { Metadata } from "next";
import StadiumsPage from "@/views/StadiumsPage";
import { getStandings } from "@/lib/football";

export const metadata: Metadata = {
  title: "Stadionlar",
  description: "JCh-2026 o'yin maydonlari — AQSh, Kanada va Meksikodagi 16 ta stadion haqida.",
};

export default async function StadiumsRoute() {
  const standings = await getStandings();
  return <StadiumsPage standings={standings} />;
}
