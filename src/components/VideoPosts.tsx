"use client";
import { Play, Eye } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { PostsResponse } from "@/hooks/queries/usePosts";

async function fetchVideos(): Promise<PostsResponse> {
  const res = await fetch(
    "https://api.uza.uz/api/v1/posts/video?per_page=4&_f=json&_l=oz&page=1"
  );
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

const VideoPosts = () => {
  const { data } = useQuery({
    queryKey: ["videos-feed"],
    queryFn: fetchVideos,
  });

  const videos = data?.data ?? [];

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Video</span>
        <Link href="/videos" className="more-link">Barchasi →</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video:any) => (
          <Link key={video.id} href={`/video/${video.slug}`} className="cursor-pointer group">
            <div className="aspect-video rounded-xl overflow-hidden relative mb-2.5 bg-muted">
              {video.files?.thumbnails?.normal?.src && (
                <img
                  src={video.files.thumbnails.normal.src}
                  loading="lazy"
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Play size={18} className="text-primary-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold leading-snug text-foreground group-hover:text-link transition-colors font-heading line-clamp-2">
              {video.title}
            </h3>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1.5 font-body">
              <Eye size={11} /> {video.viewed} ko'rish
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoPosts;
