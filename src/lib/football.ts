import { StandingsResponse, ScorersResponse } from "@/hooks/queries/useStandings";
import { FixturesResponse } from "@/hooks/queries/useFixtures";

const BASE_URL = "https://v3.football.api-sports.io";
const HEADERS = { "x-apisports-key": process.env.API_FOOTBALL_KEY! };
const CACHE = { next: { revalidate: 3600 } };

const LEAGUE_ID = 1;   // FIFA World Cup
const SEASON = 2022;   // TODO: 2026 ga o'zgartir (paid plan kerak yoki turnir boshlanganida)

export async function getStandings(): Promise<StandingsResponse | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/standings?league=${LEAGUE_ID}&season=${SEASON}`,
      { headers: HEADERS, ...CACHE }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Live fixtures — 60 soniya kesh (tez o'zgaradi)
export async function getLiveFixtures(): Promise<FixturesResponse | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/fixtures?live=all&league=${LEAGUE_ID}`,
      { headers: HEADERS, next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getFixtures(): Promise<FixturesResponse | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}`,
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
      `${BASE_URL}/players/topscorers?league=${LEAGUE_ID}&season=${SEASON}`,
      { headers: HEADERS, ...CACHE }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
