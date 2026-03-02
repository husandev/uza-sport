import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface PhotoFile {
  description: string;
  thumbnails: {
    normal: { src: string };
  };
}

export interface PhotoItem {
  id: number;
  files: PhotoFile;
}

export interface PhotosResponse {
  current_page: number;
  data: PhotoItem[];
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
}

export function usePhotos() {
  return useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam }) =>
      api.get<PhotosResponse>(
        `/photo-bank?category_id=36&per_page=32&sort=-photo_bank.id%20&_f=json&_l=oz&page=${pageParam}`
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
  });
}
