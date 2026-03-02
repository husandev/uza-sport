"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

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
  time: string;
}

const MatchTicker = ({ matches }: { matches: TickerMatch[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const pauseAutoScrollRef = useRef(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setCanScrollRight(hasOverflow && !isAtEnd);
    setAtEnd(isAtEnd);
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

  const handleArrowClick = () => {
    const el = scrollRef.current;
    if (!el) return;
    pauseAutoScrollRef.current = true;
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const nextLeft = Math.min(el.scrollLeft + 300, maxScroll);
      el.scrollTo({ left: nextLeft, behavior: "smooth" });
    }
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
            maskImage: atEnd
              ? "none"
              : "linear-gradient(to right, black 0%, black calc(100% - 50px), transparent 100%)",
            WebkitMaskImage: atEnd
              ? "none"
              : "linear-gradient(to right, black 0%, black calc(100% - 50px), transparent 100%)",
          }}
        >
          <div ref={innerRef} className="flex items-stretch gap-0 w-max">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center gap-3 px-4 py-2.5 border-r border-primary-foreground/10 cursor-pointer hover:bg-primary-foreground/5 transition-colors"
              >
                <div className="flex flex-col items-center w-12">
                  {match.isLive ? (
                    <span className="text-highlight font-bold text-[11px] flex items-center gap-1">
                      <span className="live-dot" />
                      {match.minute ?? "LIVE"}
                    </span>
                  ) : match.isFinished ? (
                    <span className="text-primary-foreground/50 text-[10px] font-body">tugadi</span>
                  ) : (
                    <span className="text-primary-foreground/70 text-[11px] font-medium font-body">{match.time}</span>
                  )}
                </div>

                <div className="flex flex-col text-[12px] leading-snug gap-0.5 font-body">
                  <div className="flex items-center gap-2">
                    <img src={match.homeLogo} alt={match.home} className="w-4 h-4 object-contain" />
                    <span className="text-primary-foreground/90 font-semibold min-w-[80px]">{match.home}</span>
                    <span className={`font-bold min-w-[12px] text-center ${match.isLive ? "text-highlight" : "text-primary-foreground"}`}>
                      {match.hScore ?? "–"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={match.awayLogo} alt={match.away} className="w-4 h-4 object-contain" />
                    <span className="text-primary-foreground/90 font-semibold min-w-[80px]">{match.away}</span>
                    <span className={`font-bold min-w-[12px] text-center ${match.isLive ? "text-highlight" : "text-primary-foreground"}`}>
                      {match.aScore ?? "–"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        {(canScrollRight || atEnd) && (
          <button
            onClick={handleArrowClick}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center px-2 transition-opacity duration-300"
            aria-label={atEnd ? "Boshiga qaytish" : "O'ngga scroll qilish"}
          >
            <div className="w-8 h-8 rounded-lg bg-primary-foreground/15 hover:bg-primary-foreground/25 flex items-center justify-center transition-colors backdrop-blur-sm">
              {atEnd ? (
                <ChevronLeft size={16} className="text-primary-foreground" />
              ) : (
                <ChevronRight size={16} className="text-primary-foreground" />
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchTicker;
