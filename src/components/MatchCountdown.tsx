import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MATCH_DATE = new Date("2026-06-14T18:00:00");

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
    <div className="relative rounded-2xl overflow-hidden" style={{
      background: "linear-gradient(135deg, hsl(210 65% 14%) 0%, hsl(210 65% 22%) 40%, hsl(210 55% 18%) 70%, hsl(145 55% 28%) 100%)",
    }}>
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, hsl(45 100% 51%), transparent 70%)" }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, white, transparent 70%)" }} />
        {/* Field lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-primary-foreground/[0.06] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary-foreground/[0.04] rounded-full" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary-foreground/[0.04]" />
      </div>

      <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-6">
        {/* Top label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-highlight/40" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-highlight">
            ⚽ FIFA Jahon Chempionati 2026
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-highlight/40" />
        </div>

        {/* Teams & Countdown row */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {/* Uzbekistan */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-3xl">🇺🇿</span>
            </div>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-primary-foreground">
              O'zbekiston
            </span>
          </div>

          {/* VS + Countdown center */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-highlight/20 blur-xl rounded-full" />
              <span className="relative text-sm font-black text-highlight tracking-widest">VS</span>
            </div>

            {/* Countdown blocks */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {blocks.map((b, i) => (
                <div key={b.label} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex flex-col items-center">
                    <div
                      className="relative rounded-xl w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center overflow-hidden"
                      style={{
                        background: "linear-gradient(180deg, hsl(210 65% 20% / 0.8) 0%, hsl(210 65% 12% / 0.9) 100%)",
                        boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 4px 12px hsl(210 65% 10% / 0.5)",
                        border: "1px solid hsl(0 0% 100% / 0.08)",
                      }}
                    >
                      {/* Shine line */}
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-primary-foreground/[0.06]" />
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={b.value}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="text-xl sm:text-2xl font-black text-primary-foreground tabular-nums"
                        >
                          {String(b.value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] text-primary-foreground/40 mt-1.5">
                      {b.label}
                    </span>
                  </div>
                  {i < blocks.length - 1 && (
                    <div className="flex flex-col gap-1.5 -mt-4">
                      <div className="w-1 h-1 rounded-full bg-highlight/60" />
                      <div className="w-1 h-1 rounded-full bg-highlight/60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Colombia */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-3xl">🇨🇴</span>
            </div>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-primary-foreground">
              Kolumbiya
            </span>
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex items-center justify-center mt-4">
          <div className="bg-primary-foreground/[0.06] backdrop-blur-sm border border-primary-foreground/[0.08] rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] text-primary-foreground/50 font-medium">
              📅 14 Iyun, 2026
            </span>
            <div className="w-px h-3 bg-primary-foreground/10" />
            <span className="text-[10px] sm:text-[11px] text-primary-foreground/50 font-medium">
              🕕 18:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
