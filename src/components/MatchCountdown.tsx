import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MATCH_DATE = new Date("2026-06-14T18:00:00");

const CountdownRing = ({ value, max, label }: { value: number; max: number; label: string }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-[48px] h-[48px] sm:w-[54px] sm:h-[54px]">
        {/* Background ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24" cy="24" r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="24" cy="24" r={radius}
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ scale: 1.3, opacity: 0, filter: "blur(4px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.7, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-sm sm:text-base font-black tabular-nums text-foreground"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
};

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

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-card border border-border"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.03)",
      }}
    >
      <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">

          {/* Left: UZB */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-foreground leading-none">O'zbekiston</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Terma jamoa</p>
            </div>
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-muted border border-border"
            >
              <span className="text-xl sm:text-2xl">🇺🇿</span>
            </div>
          </div>

          {/* Center: Rings countdown */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-1">
              ⚽ O'yingacha
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <CountdownRing value={timeLeft.days} max={365} label="Kun" />
              <CountdownRing value={timeLeft.hours} max={24} label="Soat" />
              <CountdownRing value={timeLeft.minutes} max={60} label="Daq" />
              <CountdownRing value={timeLeft.seconds} max={60} label="Son" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-medium text-muted-foreground/50 mt-1">
              14 Iyun, 2026 • 18:00
            </span>
          </div>

          {/* Right: COL */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-muted border border-border"
            >
              <span className="text-xl sm:text-2xl">🇨🇴</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-foreground leading-none">Kolumbiya</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Terma jamoa</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
