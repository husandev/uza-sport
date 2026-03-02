import type { Metadata } from "next";
import ArticlesPage from "@/views/ArticlesPage";
import { getStandings } from "@/lib/football";

export const metadata: Metadata = {
  title: "Maqolalar",
  description: "JCh-2026 va O'zbekiston futboli haqida tahliliy maqolalar va materiallar.",
};

export default async function ArticlesRoute() {
  const standings = await getStandings();
  return <ArticlesPage standings={standings} />;
}
