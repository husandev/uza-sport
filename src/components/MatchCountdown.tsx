import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import flagUzb from "@/assets/flag-uzbekistan.webp";
import flagCol from "@/assets/flag-colombia.png";

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
  <div className="flex flex-col items-center px-2.5 sm:px-4">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="block text-[22px] sm:text-[26px] font-bold tabular-nums leading-none"
        style={{ color: "hsl(var(--primary))", textShadow: "0 0 20px hsl(var(--primary) / 0.15)" }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
    <span
      className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.2em] mt-1"
      style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}
    >
      {label}
    </span>
  </div>
);

const ColonSeparator = () => (
  <div className="flex flex-col gap-2 -mt-3">
    <motion.div
      className="w-[5px] h-[5px] rounded-full"
      style={{ background: "hsl(var(--primary) / 0.3)" }}
      animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="w-[5px] h-[5px] rounded-full"
      style={{ background: "hsl(var(--primary) / 0.3)" }}
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

  return (
    <div
      className="overflow-hidden relative"
      style={{
        borderRadius: "24px",
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 1px 3px hsl(0 0% 0% / 0.04), 0 8px 30px hsl(0 0% 0% / 0.04)",
      }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
        backgroundSize: "16px 16px",
      }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 pt-3 pb-2 flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: "hsl(var(--muted-foreground) / 0.45)" }}>
            ⚽ FIFA World Cup 2026
          </p>
          <motion.div
            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            whileHover={{ scale: 1.05 }}
          >
            14 Iyun
          </motion.div>
        </div>

        {/* Teams row */}
        <div className="px-4 pb-3 flex items-center justify-between">
          <motion.div
            className="flex flex-col items-center gap-1.5 flex-1"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-11 h-11 rounded-full overflow-hidden"
              style={{ boxShadow: "0 3px 12px hsl(210 60% 50% / 0.15), 0 0 0 2px hsl(var(--card)), 0 0 0 3px hsl(var(--border))" }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={flagUzb} alt="O'zbekiston" className="w-full h-full object-cover" />
            </motion.div>
            <div className="text-center">
              <p className="text-[11px] font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>O'zbekiston</p>
              <p className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>UZB</p>
            </div>
          </motion.div>

          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center mx-1 shrink-0"
            style={{ background: "hsl(var(--muted))", border: "1.5px solid hsl(var(--border))" }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[9px] font-bold" style={{ color: "hsl(var(--muted-foreground))" }}>VS</span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-1.5 flex-1"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="w-11 h-11 rounded-full overflow-hidden"
              style={{ boxShadow: "0 3px 12px hsl(45 80% 50% / 0.15), 0 0 0 2px hsl(var(--card)), 0 0 0 3px hsl(var(--border))" }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={flagCol} alt="Kolumbiya" className="w-full h-full object-cover" />
            </motion.div>
            <div className="text-center">
              <p className="text-[11px] font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>Kolumbiya</p>
              <p className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>COL</p>
            </div>
          </motion.div>
        </div>

        {/* Countdown bar */}
        <div className="px-8 pb-2.5">
          <div
            className="relative py-2.5 flex items-center justify-center overflow-hidden"
            style={{
              borderRadius: "33rem",
              background: "linear-gradient(145deg, hsl(var(--muted)), hsl(220 15% 95%))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.8), 0 2px 8px hsl(0 0% 0% / 0.04)",
            }}
          >
            <motion.div
              className="absolute w-28 h-28 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06), transparent 70%)", filter: "blur(20px)" }}
              animate={{ x: [-25, 25, -25], y: [-12, 12, -12] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
              backgroundSize: "12px 12px",
            }} />
            <div className="relative z-10 flex items-center justify-center">
              <Digit value={t.days} label="Kun" />
              <ColonSeparator />
              <Digit value={t.hours} label="Soat" />
              <ColonSeparator />
              <Digit value={t.minutes} label="Daq" />
              <ColonSeparator />
              <Digit value={t.seconds} label="Son" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-3 flex items-center justify-center">
          <span className="text-[10px] font-medium" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>
            📅 14 Iyun, 2026 · 🕕 18:00 · Guruh bosqichi
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
