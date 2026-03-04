import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PostsResponse } from "./usePosts";

export function useVideos(page: number = 1) {
  return useQuery({
    queryKey: ["videos", page],
    queryFn: () =>
      api.get<PostsResponse>(`/posts/video?per_page=20&_f=json&_l=oz&page=${page}`),
    staleTime: 1000 * 60 * 5,
  });
}
