import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MATCH_DATE = new Date("2026-06-14T18:00:00");

const CountdownRing = ({ value, max, label, delay = 0 }: { value: number; max: number; label: string; delay?: number }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const gradientId = `ring-${label}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[46px] h-[46px]">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          <motion.circle
            cx="22" cy="22" r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ scale: 1.2, opacity: 0, filter: "blur(3px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(3px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[15px] font-black tabular-nums text-foreground"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-muted-foreground mt-1">
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
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)" }}
    >
      {/* Subtle decorative dots */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 0.5px, transparent 0.5px)",
        backgroundSize: "12px 12px",
      }} />

      <div className="relative z-10 px-5 py-4">
        {/* Top: Teams face-off */}
        <div className="flex items-center justify-center gap-6 mb-3">
          {/* UZB */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center">
              <span className="text-lg">🇺🇿</span>
            </div>
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-foreground leading-none">O'zbekiston</p>
              <p className="text-[9px] text-muted-foreground/60 mt-px">Terma jamoa</p>
            </div>
          </div>

          {/* VS badge */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
              boxShadow: "0 2px 8px hsl(var(--primary) / 0.25)",
            }}
          >
            <span className="text-[9px] font-black text-primary-foreground tracking-wider">VS</span>
          </div>

          {/* COL */}
          <div className="flex items-center gap-2.5">
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-foreground leading-none">Kolumbiya</p>
              <p className="text-[9px] text-muted-foreground/60 mt-px">Terma jamoa</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center">
              <span className="text-lg">🇨🇴</span>
            </div>
          </div>
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/60">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary/70">⚽ O'yingacha qoldi</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Bottom: Countdown rings centered */}
        <div className="flex items-center justify-center gap-3">
          <CountdownRing value={timeLeft.days} max={365} label="Kun" />
          <div className="flex flex-col gap-1 -mt-3">
            <motion.div className="w-[3px] h-[3px] rounded-full bg-primary/30" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.div className="w-[3px] h-[3px] rounded-full bg-primary/30" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
          </div>
          <CountdownRing value={timeLeft.hours} max={24} label="Soat" delay={0.1} />
          <div className="flex flex-col gap-1 -mt-3">
            <motion.div className="w-[3px] h-[3px] rounded-full bg-primary/30" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.div className="w-[3px] h-[3px] rounded-full bg-primary/30" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
          </div>
          <CountdownRing value={timeLeft.minutes} max={60} label="Daq" delay={0.2} />
          <div className="flex flex-col gap-1 -mt-3">
            <motion.div className="w-[3px] h-[3px] rounded-full bg-primary/30" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.div className="w-[3px] h-[3px] rounded-full bg-primary/30" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
          </div>
          <CountdownRing value={timeLeft.seconds} max={60} label="Son" delay={0.3} />
        </div>

        {/* Date pill */}
        <div className="flex justify-center mt-3">
          <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground/60">
            📅 14 Iyun, 2026 · 🕕 18:00
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
