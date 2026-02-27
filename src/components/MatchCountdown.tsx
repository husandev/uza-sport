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
  <div className="flex flex-col items-center px-3 sm:px-5">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -24, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: 24, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="block text-[34px] sm:text-[38px] font-black tabular-nums leading-none"
        style={{ color: "hsl(var(--primary))", textShadow: "0 0 20px hsl(var(--primary) / 0.15)" }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
    <span
      className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] mt-2"
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
      className="rounded-2xl overflow-hidden relative"
      style={{
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
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "hsl(var(--muted-foreground) / 0.45)" }}>
            ⚽ FIFA World Cup 2026
          </p>
          <motion.div
            className="px-3 py-1 rounded-full text-[11px] font-bold"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            whileHover={{ scale: 1.05 }}
          >
            14 Iyun
          </motion.div>
        </div>

        {/* Teams row */}
        <div className="px-5 pb-4 flex items-center justify-between">
          {/* UZB */}
          <motion.div
            className="flex flex-col items-center gap-2 flex-1"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 4px 16px hsl(210 60% 50% / 0.2), 0 0 0 3px hsl(var(--card)), 0 0 0 5px hsl(var(--border))",
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={flagUzb} alt="O'zbekiston" className="w-full h-full object-cover" />
            </motion.div>
            <div className="text-center">
              <p className="text-[13px] font-extrabold" style={{ color: "hsl(var(--foreground))" }}>O'zbekiston</p>
              <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>UZB</p>
            </div>
          </motion.div>

          {/* VS */}
          <motion.div
            className="w-11 h-11 rounded-full flex items-center justify-center mx-2 shrink-0"
            style={{
              background: "hsl(var(--muted))",
              border: "2px solid hsl(var(--border))",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[11px] font-black" style={{ color: "hsl(var(--muted-foreground))" }}>VS</span>
          </motion.div>

          {/* COL */}
          <motion.div
            className="flex flex-col items-center gap-2 flex-1"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 4px 16px hsl(45 80% 50% / 0.2), 0 0 0 3px hsl(var(--card)), 0 0 0 5px hsl(var(--border))",
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={flagCol} alt="Kolumbiya" className="w-full h-full object-cover" />
            </motion.div>
            <div className="text-center">
              <p className="text-[13px] font-extrabold" style={{ color: "hsl(var(--foreground))" }}>Kolumbiya</p>
              <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>COL</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="px-5 mb-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(var(--muted-foreground) / 0.35)" }}>
              O'yingacha qoldi
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
          </div>
        </div>

        {/* Countdown bar — light */}
        <div className="px-3 pb-3">
          <div
            className="relative rounded-2xl py-5 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsl(var(--muted)), hsl(220 15% 95%))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.8), 0 2px 8px hsl(0 0% 0% / 0.04)",
            }}
          >
            {/* Soft animated orb */}
            <motion.div
              className="absolute w-36 h-36 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06), transparent 70%)", filter: "blur(25px)" }}
              animate={{ x: [-30, 30, -30], y: [-15, 15, -15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
              backgroundSize: "14px 14px",
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
        <div className="px-5 pb-4 flex items-center justify-center">
          <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground) / 0.45)" }}>
            📅 14 Iyun, 2026 · 🕕 18:00 · Guruh bosqichi
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown;
