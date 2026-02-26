import { useRef, useEffect, useState } from "react";
import { matchTickerData } from "@/data/mockData";

const MatchTicker = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Check if content overflows
    if (inner.scrollWidth > container.clientWidth) {
      setShouldScroll(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldScroll || !scrollRef.current) return;

    const container = scrollRef.current;
    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // px per frame
    let paused = false;

    const step = () => {
      if (!paused) {
        scrollPos += speed;
        if (scrollPos >= container.scrollWidth - container.clientWidth) {
          scrollPos = 0;
        }
        container.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(step);
    };

    const pause = () => { paused = true; };
    const resume = () => {
      paused = false;
      scrollPos = container.scrollLeft;
    };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    animationId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, [shouldScroll]);

  return (
    <div className="ticker-wrapper relative">
      <div className="container relative">
        {/* Static label */}
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center">
          <div className="flex items-center px-4 py-2.5 text-[11px] font-heading font-bold text-primary-foreground uppercase tracking-wider shrink-0 bg-primary/50 backdrop-blur-sm rounded-r-lg">
            <span className="live-dot mr-2" />
            Жонли
          </div>
        </div>

        {/* Scrolling area with edge masks */}
        <div
          ref={scrollRef}
          className="overflow-hidden pl-[90px]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0px, black 100px, black calc(100% - 40px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0px, black 100px, black calc(100% - 40px), transparent 100%)",
          }}
        >
          <div ref={innerRef} className="flex items-stretch gap-0 w-max">
            {matchTickerData[0].matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center gap-3 px-4 py-2.5 border-r border-primary-foreground/10 cursor-pointer hover:bg-primary-foreground/5 transition-colors"
              >
                <div className="flex flex-col items-center w-12">
                  {match.live ? (
                    <span className="text-highlight font-bold text-[11px] flex items-center gap-1">
                      <span className="live-dot" />
                      {match.minute}
                    </span>
                  ) : match.hScore !== null ? (
                    <span className="text-primary-foreground/50 text-[10px] font-body">тугади</span>
                  ) : (
                    <span className="text-primary-foreground/70 text-[11px] font-medium font-body">{match.time}</span>
                  )}
                </div>

                <div className="flex flex-col text-[12px] leading-snug gap-0.5 font-body">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{match.hFlag}</span>
                    <span className="text-primary-foreground/90 font-semibold min-w-[80px]">{match.home}</span>
                    <span className={`font-bold min-w-[12px] text-center ${match.live ? "text-highlight" : "text-primary-foreground"}`}>
                      {match.hScore ?? "–"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{match.aFlag}</span>
                    <span className="text-primary-foreground/90 font-semibold min-w-[80px]">{match.away}</span>
                    <span className={`font-bold min-w-[12px] text-center ${match.live ? "text-highlight" : "text-primary-foreground"}`}>
                      {match.aScore ?? "–"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchTicker;
