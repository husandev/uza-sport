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

export interface PostTag {
  id: number;
  title: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  file_id: number;
  category_id: number;
  type?: number;
  publish_time: string;
  files: PostFile;
  category: PostCategory;
  tags?: PostTag[];
}

export interface PostsResponse {
  current_page: number;
  data: Post[];
  last_page: number;
  per_page: string;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export function useLastPosts(lang: string = "oz") {
  return useQuery({
    queryKey: ["posts", "last", lang],
    queryFn: () =>
      api.get<Post[]>(
        `/posts/category/2026-yilgi-fifa-jahon-chempionati/last?_f=json&_l=${lang}`,
      ),
  });
}

export function useTopPosts(lang: string = "oz") {
  return useQuery({
    queryKey: ["posts", "top", lang],
    queryFn: () =>
      api.get<PostsResponse>(
        `/posts/category/2026-yilgi-fifa-jahon-chempionati?filter[top]=1&platform=0&_f=json&_l=${lang}`,
      ),
  });
}

const SPORT_PER_PAGE = 20;

export function useSportPosts(
  lang: string = "oz",
  perPage: number = SPORT_PER_PAGE,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["posts", "category", "sport", lang, perPage, page],
    queryFn: () =>
      api.get<PostsResponse>(
        `/posts/category/2026-yilgi-fifa-jahon-chempionati?per_page=${perPage}&_f=json&_l=${lang}&page=${page}`,
      ),
    staleTime: 1000 * 60 * 2,
  });
}

export function useThemePosts(
  lang: string = "oz",
  perPage: number = SPORT_PER_PAGE,
  page: number = 1,
  THEME_ID: number,
  include?: string,
) {
  return useQuery({
    queryKey: ["posts", "theme", THEME_ID, lang, perPage, page, include],
    queryFn: () =>
      api.get<PostsResponse>(
        `/posts/category/2026-yilgi-fifa-jahon-chempionati?platform=0&filter[theme_id]=${THEME_ID}&per_page=${perPage}&sort=-publish_time&_f=json&_l=${lang}&page=${page}${include ? `&include=${include}` : ""}`,
      ),
    staleTime: 1000 * 60 * 2,
  });
}

export interface PostDetail extends Post {
  body?: string;
  content?: string;
  viewed?: number;
  theme_id?: number;
}

export function usePost(slug: string, include?: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () =>
      api.get<PostDetail>(
        `/posts/${slug}?_f=json&_l=oz${include ? `&include=${include}` : ""}`,
      ),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // Maqola matni kamdan-kam o'zgaradi — 5 daqiqa kesh
  });
}
