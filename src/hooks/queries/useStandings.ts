// API-Football v3 types

export interface AFTeam {
  id: number;
  name: string;
  logo: string;
}

export interface AFStandingEntry {
  rank: number;
  team: AFTeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: string | null;
  status: string;
  description: string | null;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: { for: number; against: number };
  };
  update: string;
}

export interface StandingsResponse {
  response: Array<{
    league: {
      id: number;
      name: string;
      season: number;
      standings: AFStandingEntry[][];
    };
  }>;
}

export interface AFScorerEntry {
  player: {
    id: number;
    name: string;
    nationality: string;
  };
  statistics: Array<{
    team: AFTeam;
    goals: {
      total: number;
      assists: number | null;
    };
  }>;
}

export interface ScorersResponse {
  response: AFScorerEntry[];
}
