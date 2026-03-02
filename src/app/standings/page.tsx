import type { Metadata } from "next";
import StandingsPage from "@/views/StandingsPage";
import { getStandings, getScorers } from "@/lib/football";

export const metadata: Metadata = {
  title: "Guruh jadvali va bombardirlar",
  description: "JCh-2026 guruhlar jadvali, bombardirlar reytingi va statistika.",
};

export default async function StandingsRoute() {
  const [data, scorers] = await Promise.all([getStandings(), getScorers()]);
  return <StandingsPage data={data} scorers={scorers} />;
}
