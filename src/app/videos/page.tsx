import type { Metadata } from "next";
import VideosPage from "@/views/VideosPage";
import { getStandings } from "@/lib/football";

export const metadata: Metadata = {
  title: "Videolar",
  description: "JCh-2026 va O'zbekiston terma jamoasi haqida video materiallar va highlights.",
};

export default async function VideosRoute() {
  const standings = await getStandings();
  return <VideosPage standings={standings} />;
}
