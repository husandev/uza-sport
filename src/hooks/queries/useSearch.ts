import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PostsResponse } from "./usePosts";

export function useSearch(q: string) {
  return useQuery({
    queryKey: ["search", q],
    queryFn: () =>
      api.get<PostsResponse>(
        `/posts/search?q=${encodeURIComponent(q)}&platform=0&per_page=8&slug=/category/2026-yilgi-fifa-jahon-chempionati&_f=json&_l=oz`
      ),
    enabled: q.trim().length >= 2,
    staleTime: 1000 * 60 * 2,
  });
}
