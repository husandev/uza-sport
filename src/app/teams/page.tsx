import type { Metadata } from "next";
import TeamsPage from "@/views/TeamsPage";
import { getStandings } from "@/lib/football";

export const metadata: Metadata = {
  title: "Terma jamoalar",
  description: "JCh-2026 ishtirokchi terma jamoalari, guruhlar va guruh jadvali.",
};

export default async function TeamsRoute() {
  const standings = await getStandings();
  return <TeamsPage standings={standings} />;
}
