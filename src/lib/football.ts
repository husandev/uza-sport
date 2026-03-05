import { cache } from "react";
import { StandingsResponse, ScorersResponse } from "@/hooks/queries/useStandings";
import { FixturesResponse } from "@/hooks/queries/useFixtures";

export interface TeamInfoResponse {
  response: Array<{
    team: { id: number; name: string; country: string; founded: number | null; national: boolean; logo: string };
    venue: { name: string | null; city: string | null; capacity: number | null };
  }>;
}

export interface SquadPlayer {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}

export interface SquadResponse {
  response: Array<{
    team: { id: number; name: string; logo: string };
    players: SquadPlayer[];
  }>;
}

export interface WCPlayerResponse {
  response: Array<{
    player: {
      id: number;
      name: string;
      firstname: string;
      lastname: string;
      age: number;
      birth: { date: string | null; place: string | null; country: string | null };
      nationality: string;
      height: string | null;
      weight: string | null;
      photo: string;
    };
    statistics: Array<{
      team: { id: number; name: string; logo: string };
      games: { appearences: number | null; lineups: number | null; minutes: number | null; position: string };
      goals: { total: number | null; assists: number | null };
      cards: { yellow: number | null; red: number | null };
    }>;
  }>;
}

export const LIVE_STATUSES = ["1H", "2H", "HT", "ET", "BT", "P", "INT", "SUSP", "LIVE"];
export const FINISHED_STATUSES = ["FT", "AET", "PEN", "AWD", "WO"];

const BASE_URL = "https://v3.football.api-sports.io";
const HEADERS = { "x-apisports-key": process.env.API_FOOTBALL_KEY! };
const CACHE = { next: { revalidate: 3600 } };
const CACHE_30MIN = { next: { revalidate: 1800 } };
const CACHE_5MIN = { next: { revalidate: 300 } };

const SERVER_TIMEOUT_MS = 5000;

const LEAGUE_ID = 1; 
const SEASON = 2026;   

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), SERVER_TIMEOUT_MS)
  );
  return Promise.race([promise, timeout]);
}

export const getStandings = cache(async (): Promise<StandingsResponse | null> => {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/standings?league=${LEAGUE_ID}&season=${SEASON}`, { headers: HEADERS, ...CACHE })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});
export async function getLiveFixtures(): Promise<FixturesResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/fixtures?live=all&league=${LEAGUE_ID}`, { headers: HEADERS, next: { revalidate: 30 } })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const getFixtures = cache(async (): Promise<FixturesResponse | null> => {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}`, { headers: HEADERS, ...CACHE_30MIN })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});

export async function getTeamInfo(id: number): Promise<TeamInfoResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/teams?id=${id}`, { headers: HEADERS, ...CACHE })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getTeamSquad(id: number): Promise<SquadResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/players/squads?team=${id}`, { headers: HEADERS, ...CACHE })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getWCPlayer(id: number): Promise<WCPlayerResponse | null> {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/players?id=${id}&season=${SEASON}`, { headers: HEADERS, ...CACHE })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const getScorers = cache(async (): Promise<ScorersResponse | null> => {
  try {
    const res = await withTimeout(
      fetch(`${BASE_URL}/players/topscorers?league=${LEAGUE_ID}&season=${SEASON}`, { headers: HEADERS, ...CACHE_5MIN })
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});
