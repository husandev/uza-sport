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
    { value: timeLeft.days, label: "KUN" },
    { value: timeLeft.hours, label: "SOAT" },
    { value: timeLeft.minutes, label: "DAQ" },
    { value: timeLeft.seconds, label: "SON" },
  ];

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f0f4f8 50%, #e8eef5 100%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
        border: "1px solid hsl(var(--border))",
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px),
                          radial-gradient(circle at 80% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 py-4 px-4 sm:px-6">
        {/* Main layout */}
        <div className="flex items-center justify-between gap-3">

          {/* Left: Uzbekistan */}
          <div className="flex items-center gap-2.5 flex-1 justify-end">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-foreground leading-none">O'zbekiston</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Terma jamoa</p>
            </div>
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)",
              }}
            >
              <span className="text-xl sm:text-2xl">🇺🇿</span>
            </div>
          </div>

          {/* Center: Countdown */}
          <div className="flex flex-col items-center gap-1 px-2 sm:px-4">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-primary/60 leading-none">
              O'yingacha
            </span>

            <div className="flex items-center gap-1">
              {blocks.map((b, i) => (
                <div key={b.label} className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <div
                      className="relative w-10 h-11 sm:w-12 sm:h-13 rounded-lg flex items-center justify-center overflow-hidden"
                      style={{
                        background: "linear-gradient(180deg, #ffffff 0%, #f7f8fa 100%)",
                        boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.05), 0 0 0 1px hsl(var(--border))",
                      }}
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={b.value}
                          initial={{ y: -8, opacity: 0, scale: 0.9 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: 8, opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="text-lg sm:text-xl font-black tabular-nums text-primary"
                        >
                          {String(b.value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.1em] text-muted-foreground/60 mt-1">
                      {b.label}
                    </span>
                  </div>
                  {i < blocks.length - 1 && (
                    <span className="text-primary/25 font-black text-sm -mt-3 mx-px">:</span>
                  )}
                </div>
              ))}
            </div>

            <span className="text-[8px] sm:text-[9px] font-semibold text-muted-foreground/50 leading-none mt-0.5">
              14 Iyun • 18:00
            </span>
          </div>

          {/* Right: Colombia */}
          <div className="flex items-center gap-2.5 flex-1">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)",
              }}
            >
              <span className="text-xl sm:text-2xl">🇨🇴</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-foreground leading-none">Kolumbiya</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Terma jamoa</p>
            </div>
          </div>

        </div>

        {/* Bottom accent line */}
        <div className="mt-3 h-[2px] rounded-full overflow-hidden bg-border/50">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--highlight)), hsl(var(--secondary)))" }}
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
