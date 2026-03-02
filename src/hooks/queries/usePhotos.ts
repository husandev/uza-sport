import { useInfiniteQuery } from "@tanstack/react-query";

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

const PHOTO_API_URL = "https://api.uza.uz/api/v1/photo-bank";

async function fetchPhotos(page: number): Promise<PhotosResponse> {
  const url = `${PHOTO_API_URL}?category_id=36&per_page=32&sort=-photo_bank.id%20&_f=json&_l=oz&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export function usePhotos() {
  return useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam }) => fetchPhotos(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
  });
}
