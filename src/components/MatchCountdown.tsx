import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MATCH_DATE = new Date("2026-06-14T18:00:00");

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="relative w-[54px] h-[62px] rounded-xl flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--primary)), hsl(210 65% 16%))",
        boxShadow: "0 4px 20px hsl(var(--primary) / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
      }}
    >
      {/* Glass reflection */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl"
        style={{ background: "linear-gradient(180deg, hsl(0 0% 100% / 0.15), transparent)" }}
      />
      {/* Center divider line */}
      <div className="absolute inset-x-1 top-1/2 h-px bg-black/20" />

      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 text-[26px] font-black tabular-nums leading-none"
          style={{ color: "hsl(0 0% 100%)", textShadow: "0 2px 8px hsl(0 0% 0% / 0.3)" }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span
      className="text-[9px] font-bold uppercase tracking-[0.18em] mt-2"
      style={{ color: "hsl(var(--muted-foreground))" }}
    >
      {label}
    </span>
  </div>
);

const Separator = () => (
  <div className="flex flex-col items-center gap-1.5 -mt-4">
    <motion.div
      className="w-[5px] h-[5px] rounded-full"
      style={{ background: "hsl(var(--primary))" }}
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="w-[5px] h-[5px] rounded-full"
      style={{ background: "hsl(var(--primary))" }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

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
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(165deg, hsl(var(--card)), hsl(220 15% 94%))",
        boxShadow: "0 1px 3px hsl(0 0% 0% / 0.06), 0 8px 32px hsl(0 0% 0% / 0.04)",
        border: "1px solid hsl(var(--border))",
      }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
        backgroundSize: "16px 16px",
      }} />

      <div className="relative z-10">
        {/* Header bar */}
        <div
          className="px-4 py-2.5 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(210 65% 28%))",
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "hsl(var(--highlight))" }}>
            ⚽ FIFA World Cup 2026
          </span>
        </div>

        <div className="px-4 pt-5 pb-4">
          {/* Teams */}
          <div className="flex items-center justify-between mb-5">
            {/* UZB */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(210 80% 95%), hsl(145 50% 93%))",
                  boxShadow: "0 2px 12px hsl(var(--primary) / 0.12)",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <span className="text-3xl">🇺🇿</span>
              </div>
              <div className="text-center">
                <p className="text-[13px] font-extrabold uppercase tracking-wide leading-none" style={{ color: "hsl(var(--foreground))" }}>
                  O'zbekiston
                </p>
                <p className="text-[9px] font-medium mt-0.5" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
                  UZB
                </p>
              </div>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center mx-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  boxShadow: "0 4px 16px hsl(var(--primary) / 0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "2px solid hsl(var(--highlight) / 0.4)" }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[11px] font-black tracking-wider" style={{ color: "hsl(0 0% 100%)" }}>VS</span>
              </div>
            </div>

            {/* COL */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(45 100% 93%), hsl(210 60% 93%))",
                  boxShadow: "0 2px 12px hsl(45 100% 50% / 0.12)",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <span className="text-3xl">🇨🇴</span>
              </div>
              <div className="text-center">
                <p className="text-[13px] font-extrabold uppercase tracking-wide leading-none" style={{ color: "hsl(var(--foreground))" }}>
                  Kolumbiya
                </p>
                <p className="text-[9px] font-medium mt-0.5" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
                  COL
                </p>
              </div>
            </div>
          </div>

          {/* Countdown label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
              O'yingacha qoldi
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
          </div>

          {/* Countdown */}
          <div className="flex items-start justify-center gap-2.5">
            <CountdownUnit value={timeLeft.days} label="Kun" />
            <Separator />
            <CountdownUnit value={timeLeft.hours} label="Soat" />
            <Separator />
            <CountdownUnit value={timeLeft.minutes} label="Daqiqa" />
            <Separator />
            <CountdownUnit value={timeLeft.seconds} label="Soniya" />
          </div>

          {/* Bottom info */}
          <div className="flex justify-center mt-4">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: "hsl(var(--muted) / 0.6)",
                border: "1px solid hsl(var(--border) / 0.6)",
              }}
            >
              <span className="text-[11px] font-semibold" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
                📅 14 Iyun, 2026
              </span>
              <div className="w-px h-3" style={{ background: "hsl(var(--border))" }} />
              <span className="text-[11px] font-semibold" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
                🕕 18:00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
