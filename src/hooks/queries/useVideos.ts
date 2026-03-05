import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PostsResponse } from "./usePosts";

export function useVideos(page: number = 1, perPage: number = 20) {
  return useQuery({
    queryKey: ["videos", page, perPage],
    queryFn: () =>
      api.get<PostsResponse>(`/posts/category/2026-yilgi-fifa-jahon-chempionati?platform=0&filter[type]=3&per_page=${perPage}&_f=json&_l=oz&page=${page}`),
    staleTime: 1000 * 60 * 5,
  });
}
