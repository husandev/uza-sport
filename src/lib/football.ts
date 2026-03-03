import { StandingsResponse, ScorersResponse } from "@/hooks/queries/useStandings";
import { FixturesResponse } from "@/hooks/queries/useFixtures";

export const LIVE_STATUSES = ["1H", "2H", "HT", "ET", "BT", "P", "INT", "SUSP", "LIVE"];
export const FINISHED_STATUSES = ["FT", "AET", "PEN", "AWD", "WO"];

const BASE_URL = "https://v3.football.api-sports.io";
const HEADERS = { "x-apisports-key": process.env.API_FOOTBALL_KEY! };
const CACHE = { next: { revalidate: 3600 } };

const SERVER_TIMEOUT_MS = 5000;

const LEAGUE_ID = 1; 
const SEASON = 2022;   

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), SERVER_TIMEOUT_MS)
  );
  return Promise.race([promise, timeout]);
}

export async function getStandings(): Promise<StandingsResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/standings?league=${LEAGUE_ID}&season=${SEASON}`, { headers: HEADERS, ...CACHE })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
export async function getLiveFixtures(): Promise<FixturesResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/fixtures?live=all&league=${LEAGUE_ID}`, { headers: HEADERS, next: { revalidate: 60 } })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getFixtures(): Promise<FixturesResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}`, { headers: HEADERS, ...CACHE })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getScorers(): Promise<ScorersResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/players/topscorers?league=${LEAGUE_ID}&season=${SEASON}`, { headers: HEADERS, ...CACHE })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
