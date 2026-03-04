"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { formatMatchTime } from "@/lib/utils";

const MONTHS_SHORT = ["Yan","Fev","Mar","Apr","May","Iyn","Iyl","Avg","Sen","Okt","Noy","Dek"];

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

export interface TickerMatch {
  id: number;
  home: string;
  away: string;
  homeLogo: string;
  awayLogo: string;
  hScore: number | null;
  aScore: number | null;
  isLive: boolean;
  isFinished: boolean;
  minute: string | null;
  date: string;
}

const MatchTicker = ({ matches }: { matches: TickerMatch[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const pauseAutoScrollRef = useRef(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(hasOverflow && !isAtEnd);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Auto-scroll until end
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;

    const step = () => {
      if (!pauseAutoScrollRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft < maxScroll) {
          el.scrollLeft += 0.4;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    const pause = () => { pauseAutoScrollRef.current = true; };
    const resume = () => { pauseAutoScrollRef.current = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    animationId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  const handlePrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    pauseAutoScrollRef.current = true;
    el.scrollTo({ left: Math.max(el.scrollLeft - 300, 0), behavior: "smooth" });
  };

  const handleNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    pauseAutoScrollRef.current = true;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(el.scrollLeft + 300, maxScroll), behavior: "smooth" });
  };

  if (matches.length === 0) return null;

  return (
    <div className="ticker-wrapper relative">
      <div className="container relative flex items-stretch">
        {/* Static label */}
        <div className="z-10 flex items-center shrink-0">
          <div className="flex items-center px-4 py-2.5 text-[11px] font-heading font-bold text-primary-foreground uppercase tracking-wider shrink-0 bg-primary/50 backdrop-blur-sm rounded-r-lg">
            <span className="live-dot mr-2" />
            Jonli
          </div>
        </div>

        {/* Scrolling area with edge masks */}
        <div
          ref={scrollRef}
          className="overflow-hidden flex-1 min-w-0"
          style={{
            maskImage: canScrollLeft && canScrollRight
              ? "linear-gradient(to right, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)"
              : canScrollLeft
              ? "linear-gradient(to right, transparent 0%, black 50px, black 100%)"
              : canScrollRight
              ? "linear-gradient(to right, black 0%, black calc(100% - 50px), transparent 100%)"
              : "none",
            WebkitMaskImage: canScrollLeft && canScrollRight
              ? "linear-gradient(to right, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)"
              : canScrollLeft
              ? "linear-gradient(to right, transparent 0%, black 50px, black 100%)"
              : canScrollRight
              ? "linear-gradient(to right, black 0%, black calc(100% - 50px), transparent 100%)"
              : "none",
          }}
        >
          <div className="flex items-stretch gap-0 w-max">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center gap-3 px-4 py-2.5 border-r border-primary-foreground/10 cursor-pointer hover:bg-primary-foreground/5 transition-colors"
              >
                <div className="flex flex-col items-center w-12">
                  {match.isLive ? (
                    <span className="text-highlight font-bold text-[11px] flex items-center gap-1">
                      <span className="live-dot" />
                      {match.minute ?? "JONLI"}
                    </span>
                  ) : match.isFinished ? (
                    <span className="text-primary-foreground/50 text-[10px] font-body">tugadi</span>
                  ) : (
                    <>
                      <span className="text-primary-foreground/50 text-[9px] font-medium font-body" suppressHydrationWarning>
                        {formatShortDate(match.date)}
                      </span>
                      <span className="text-primary-foreground/70 text-[11px] font-bold font-body" suppressHydrationWarning>
                        {formatMatchTime(match.date)}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-col text-[12px] leading-snug gap-0.5 font-body">
                  <div className="flex items-center gap-2">
                    <img src={match.homeLogo} loading="lazy" alt={match.home} className="w-4 h-4 object-contain" />
                    <span className="text-primary-foreground/90 font-semibold min-w-[60px] sm:min-w-[80px]">{match.home}</span>
                    <span className={`font-bold min-w-[12px] text-center ${match.isLive ? "text-highlight" : "text-primary-foreground"}`}>
                      {match.hScore ?? "–"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={match.awayLogo} loading="lazy" alt={match.away} className="w-4 h-4 object-contain" />
                    <span className="text-primary-foreground/90 font-semibold min-w-[60px] sm:min-w-[80px]">{match.away}</span>
                    <span className={`font-bold min-w-[12px] text-center ${match.isLive ? "text-highlight" : "text-primary-foreground"}`}>
                      {match.aScore ?? "–"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={handlePrev}
            className="absolute left-[96px] top-0 bottom-0 z-10 flex items-center px-2"
            aria-label="Chapga scroll qilish"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-foreground/15 hover:bg-primary-foreground/25 flex items-center justify-center transition-colors backdrop-blur-sm">
              <ChevronLeft size={16} className="text-primary-foreground" />
            </div>
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center px-2"
            aria-label="O'ngga scroll qilish"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-foreground/15 hover:bg-primary-foreground/25 flex items-center justify-center transition-colors backdrop-blur-sm">
              <ChevronRight size={16} className="text-primary-foreground" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchTicker;
