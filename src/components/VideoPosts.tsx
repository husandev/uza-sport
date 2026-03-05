"use client";
import { useRef, useEffect } from "react";
import { Play, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useVideos } from "@/hooks/queries";

const AUTO_DELAY = 3500;

const VideoPosts = () => {
  const { data } = useVideos(1, 8);
  const videos = data?.data ?? [];
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getCardW = () => {
    const card = trackRef.current?.querySelector("a");
    return card ? card.getBoundingClientRect().width + 16 : 280;
  };

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const cardW = getCardW();
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (dir === "right" && el.scrollLeft >= maxScroll - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir === "right" ? cardW : -cardW, behavior: "smooth" });
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => scroll("right"), AUTO_DELAY);
  };

  useEffect(() => {
    if (videos.length === 0) return;
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [videos.length]);

  const handleManual = (dir: "left" | "right") => {
    scroll(dir);
    resetTimer();
  };

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Video</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleManual("left")}
            className="w-7 h-7 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            aria-label="Oldingi"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => handleManual("right")}
            className="w-7 h-7 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            aria-label="Keyingi"
          >
            <ChevronRight size={15} />
          </button>
          <Link href="/videos" className="more-link">Barchasi →</Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        {videos.map((video: any) => (
          <Link
            key={video.id}
            href={`/video/${video.slug}`}
            className="cursor-pointer group flex-shrink-0 w-[calc(50%-8px)] snap-start"
          >
            <div className="aspect-video rounded-xl overflow-hidden relative mb-2.5 bg-muted">
              {video.files?.thumbnails?.normal?.src && (
                <img
                  src={video.files.thumbnails.normal.src}
                  loading="lazy"
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Play size={16} className="text-primary-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-foreground/60 backdrop-blur-sm text-primary-foreground text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-body">
                <Play size={9} fill="currentColor" /> Video
              </div>
            </div>
            <h3 className="text-[13px] font-bold leading-snug text-foreground group-hover:text-primary transition-colors font-heading line-clamp-2">
              {video.title}
            </h3>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1 font-body">
              <Eye size={10} /> {video.viewed} ko'rish
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoPosts;
