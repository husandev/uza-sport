import { StandingsResponse } from "@/hooks/queries/useStandings";

export async function getStandings(): Promise<StandingsResponse | null> {
  try {
    const res = await fetch(
      `${process.env.FOOTBALL_API_URL}/competitions/WC/standings`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY!,
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
