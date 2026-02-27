import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MATCH_DATE = new Date("2026-06-14T18:00:00");

function getTimeLeft() {
  const diff = MATCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const Digit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center px-3 sm:px-5">
    <div className="relative">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -24, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 24, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="block text-[34px] sm:text-[38px] font-black tabular-nums leading-none"
          style={{ color: "hsl(0 0% 100%)", textShadow: "0 0 20px hsl(var(--highlight) / 0.3)" }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span
      className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] mt-2"
      style={{ color: "hsl(0 0% 100% / 0.35)" }}
    >
      {label}
    </span>
  </div>
);

const ColonSeparator = () => (
  <div className="flex flex-col gap-2 -mt-3">
    <motion.div
      className="w-[5px] h-[5px] rounded-full"
      style={{ background: "hsl(var(--highlight))" }}
      animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="w-[5px] h-[5px] rounded-full"
      style={{ background: "hsl(var(--highlight))" }}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const MatchCountdown = () => {
  const [t, setT] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const totalDays = Math.max(0, Math.ceil((MATCH_DATE.getTime() - Date.now()) / 86400000));

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 1px 3px hsl(0 0% 0% / 0.04), 0 8px 30px hsl(0 0% 0% / 0.04)",
      }}
    >
      {/* Subtle grid pattern on card */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }} />

      {/* Top section */}
      <div className="relative z-10 px-5 pt-5 pb-4">
        <div className="flex items-start justify-between mb-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "hsl(var(--muted-foreground) / 0.45)" }}>
            ⚽ FIFA World Cup 2026
          </p>
          <motion.div
            className="px-3 py-1 rounded-full text-[11px] font-bold shrink-0"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
            whileHover={{ scale: 1.05 }}
          >
            14 Iyun
          </motion.div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <motion.span
            className="text-[26px]"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          >
            🇺🇿
          </motion.span>
          <span className="text-[15px] font-extrabold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            O'zbekiston
          </span>
          <motion.span
            className="text-[10px] font-black px-2 py-0.5 rounded-md"
            style={{ background: "hsl(var(--highlight) / 0.15)", color: "hsl(var(--highlight))" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            VS
          </motion.span>
          <span className="text-[15px] font-extrabold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            Kolumbiya
          </span>
          <motion.span
            className="text-[26px]"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            🇨🇴
          </motion.span>
        </div>

        <motion.p
          className="text-[24px] font-black mt-3"
          style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {totalDays} kun qoldi
        </motion.p>
      </div>

      {/* Countdown bar */}
      <div className="px-3 pb-3 relative z-10">
        <div
          className="relative rounded-2xl py-5 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(220 22% 12%), hsl(220 18% 18%))",
            boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.05), 0 6px 24px hsl(0 0% 0% / 0.2)",
          }}
        >
          {/* Animated gradient orb */}
          <motion.div
            className="absolute w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
              filter: "blur(30px)",
            }}
            animate={{
              x: [-40, 40, -40],
              y: [-20, 20, -20],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Secondary orb */}
          <motion.div
            className="absolute w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--highlight) / 0.1), transparent 70%)",
              filter: "blur(25px)",
            }}
            animate={{
              x: [30, -30, 30],
              y: [15, -15, 15],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dot grid pattern inside dark bar */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 0.5px, transparent 0)`,
            backgroundSize: "12px 12px",
          }} />

          {/* Horizontal scan line */}
          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--highlight) / 0.15), transparent)" }}
            animate={{ top: ["20%", "80%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Top edge glow */}
          <div className="absolute inset-x-0 top-0 h-px" style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--highlight) / 0.2), transparent)",
          }} />

          <div className="relative z-10 flex items-center justify-center">
            <Digit value={t.days} label="Kun" />
            <ColonSeparator />
            <Digit value={t.hours} label="Soat" />
            <ColonSeparator />
            <Digit value={t.minutes} label="Daqiqa" />
            <ColonSeparator />
            <Digit value={t.seconds} label="Soniya" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-5 pb-4 flex items-center justify-center">
        <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground) / 0.45)" }}>
          📅 14 Iyun, 2026 · 🕕 18:00 · Guruh bosqichi
        </span>
      </div>
    </div>
  );
};

export default MatchCountdown;
