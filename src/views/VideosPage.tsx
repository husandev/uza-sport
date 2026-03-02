"use client";
import { useState } from "react";
import Link from "next/link";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useVideos } from "@/hooks/queries";

function formatTime(publishTime: string): string {
  const date = new Date(publishTime.replace(" ", "T"));
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  if (diffMin < 60) return `${diffMin} daqiqa oldin`;
  if (diffHour < 24)
    return `Bugun, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  if (diffDay === 1)
    return `Kecha, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  return `${diffDay} kun oldin`;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  )
    pages.push(p);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

const VideosPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useVideos(page);
  const videos = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  function goTo(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Barcha videolar — JCh 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="px-5 sm:px-6 py-5 flex gap-5 animate-pulse"
                  >
                    <div className="w-[200px] h-[130px] flex-shrink-0 rounded-xl bg-muted" />
                    <div className="flex-1 space-y-2 pt-2">
                      <div className="h-3 bg-muted rounded w-1/4" />
                      <div className="h-5 bg-muted rounded w-full" />
                      <div className="h-5 bg-muted rounded w-4/5" />
                    </div>
                  </div>
                ))}
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/video/${video.slug}`}
                  className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                >
                  <div className="w-[200px] h-[130px] flex-shrink-0 rounded-xl overflow-hidden relative bg-muted">
                    {video.files?.thumbnails?.normal?.src && (
                      <img
                        src={video.files.thumbnails.normal.src}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play
                          size={18}
                          className="text-primary-foreground ml-0.5"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 h-[130px] overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                        <span>{formatTime(video.publish_time)}</span>
                        {video.category?.title && (
                          <>
                            <span className="text-muted-foreground/40">|</span>
                            <span className="text-primary font-medium">
                              {video.category.title}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="text-[20px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      {video.description && video.description !== "_" && (
                        <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-2 font-body">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-5">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1 || isLoading}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {getPageNumbers(page, totalPages).map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-9 h-9 flex items-center justify-center text-muted-foreground text-[13px]"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  disabled={isLoading}
                  className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-colors ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages || isLoading}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
