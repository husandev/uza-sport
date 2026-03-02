import { useQuery } from "@tanstack/react-query";
import type { PostsResponse } from "./usePosts";

async function fetchVideos(page: number): Promise<PostsResponse> {
  const res = await fetch(
    `https://api.uza.uz/api/v1/posts/video?per_page=20&_f=json&_l=oz&page=${page}`
  );
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export function useVideos(page: number = 1) {
  return useQuery({
    queryKey: ["videos", page],
    queryFn: () => fetchVideos(page),
  });
}
