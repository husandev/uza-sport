import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface AthleteFile {
  thumbnails: {
    small: { src: string };
    normal: { src: string };
    front: { src: string };
  };
}

export interface Athlete {
  id: number;
  name: string;
  slug: string;
  full_name: string;
  number: number;
  position: string;
  birth_date: string;
  birth_place: string;
  current_club: string;
  height: string;
  national_team_goals: number;
  games_count: number;
  biography: string;
  file_id: number;
  sort: number;
  status: number;
  file?: AthleteFile;
}

export interface AthletesResponse {
  data: Athlete[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const THIRTY_MIN = 1000 * 60 * 30;

export function useAthletes(perPage?: number) {
  return useQuery({
    queryKey: ["athletes", perPage ?? "all"],
    queryFn: () =>
      api.get<AthletesResponse>(
        `/athletes?include=file&filter[status]=1&sort=sort${perPage ? `&per_page=${perPage}` : ""}`
      ),
    staleTime: THIRTY_MIN,
  });
}

export function useAthleteBySlug(slug: string) {
  return useQuery({
    queryKey: ["athlete", "slug", slug],
    queryFn: () => api.get<Athlete>(`/athletes/slug/${slug}?include=file`),
    enabled: !!slug,
    staleTime: THIRTY_MIN,
  });
}
