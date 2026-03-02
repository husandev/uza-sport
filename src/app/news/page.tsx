import type { Metadata } from "next";
import NewsPage from "@/views/NewsPage";
import { getStandings } from "@/lib/football";

export const metadata: Metadata = {
  title: "Yangiliklar",
  description: "O'zbekiston va Jahon chempionati 2026 bo'yicha so'nggi sport yangiliklari.",
};

export default async function NewsRoute() {
  const standings = await getStandings();
  return <NewsPage standings={standings} />;
}
