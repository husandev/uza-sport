import { StandingsResponse, ScorersResponse } from "@/hooks/queries/useStandings";

const HEADERS = { "X-Auth-Token": process.env.FOOTBALL_API_KEY! };
const CACHE = { next: { revalidate: 3600 } };

export async function getStandings(): Promise<StandingsResponse | null> {
  try {
    const res = await fetch(
      `${process.env.FOOTBALL_API_URL}/competitions/WC/standings`,
      { headers: HEADERS, ...CACHE }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getScorers(): Promise<ScorersResponse | null> {
  try {
    const res = await fetch(
      `${process.env.FOOTBALL_API_URL}/competitions/WC/scorers?limit=10`,
      { headers: HEADERS, ...CACHE }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
