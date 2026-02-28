import { useQuery } from "@tanstack/react-query";

export interface StandingTeam {
  position: number;
  team: {
    id: number | null;
    name: string | null;
    shortName: string | null;
    tla: string | null;
    crest: string | null;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Standing {
  stage: string;
  type: string;
  group: string;
  table: StandingTeam[];
}

export interface StandingsResponse {
  standings: Standing[];
}

export function useStandings() {
  return useQuery({
    queryKey: ["standings", "WC"],
    queryFn: async (): Promise<StandingsResponse> => {
      const res = await fetch("/api/standings");
      if (!res.ok) throw new Error("Failed to fetch standings");
      return res.json();
    },
    staleTime: 1000 * 60 * 60,
  });
}
