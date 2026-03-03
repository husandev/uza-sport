import type { Metadata } from "next";
import ResultsPage from "@/views/ResultsPage";
import { getStandings, getFixtures } from "@/lib/football";

export const metadata: Metadata = {
  title: "Natijalar va o'yin jadvali",
  description:
    "JCh-2026 o'yin natijalari, jadval va kelgusi o'yinlar haqida ma'lumot.",
};

export default async function ResultsRoute() {
  const [standings, fixtures] = await Promise.all([
    getStandings(),
    getFixtures(),
  ]);
  return <ResultsPage standings={standings} fixtures={fixtures} />;
}
