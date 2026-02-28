import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface PostFile {
  thumbnails: {
    small: { src: string };
    normal: { src: string };
    front: { src: string };
  };
}

export interface PostCategory {
  id: number;
  title: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  file_id: number;
  category_id: number;
  publish_time: string;
  files: PostFile;
  category: PostCategory;
}

export function useLastPosts(lang: string = "uz") {
  return useQuery({
    queryKey: ["posts", "last", lang],
    queryFn: () => api.get<Post[]>(`/posts/last?_f=json&_l=${lang}`),
  });
}
