import { useState, useEffect } from "react";

const MATCH_DATE = new Date("2026-06-14T18:00:00"); // O'zbekiston vs Kolumbiya

const MatchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = MATCH_DATE.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { value: timeLeft.days, label: "Kun" },
    { value: timeLeft.hours, label: "Soat" },
    { value: timeLeft.minutes, label: "Daqiqa" },
    { value: timeLeft.seconds, label: "Soniya" },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary via-[hsl(210_55%_18%)] to-primary p-4 sm:p-5">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary-foreground rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        {/* Flags & teams */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🇺🇿</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/90">UZB</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-highlight uppercase tracking-wider">VS</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🇨🇴</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/90">COL</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-12 bg-primary-foreground/20" />

        {/* Match info */}
        <div className="flex flex-col items-center sm:items-start shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-highlight">
            FIFA Jahon Chempionati 2026
          </span>
          <span className="text-xs font-bold text-primary-foreground">
            O'zbekiston — Kolumbiya
          </span>
          <span className="text-[10px] text-primary-foreground/60">
            14 Iyun, 2026 • 18:00
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-12 bg-primary-foreground/20" />

        {/* Countdown */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {blocks.map((b, i) => (
            <div key={b.label} className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center">
                <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 rounded-lg w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-extrabold text-primary-foreground tabular-nums">
                    {String(b.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary-foreground/50 mt-1">
                  {b.label}
                </span>
              </div>
              {i < blocks.length - 1 && (
                <span className="text-primary-foreground/30 font-bold text-lg -mt-3">:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
