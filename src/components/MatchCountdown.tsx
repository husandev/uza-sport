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

const Digit = ({ value }: { value: number }) => (
  <div className="flex flex-col items-center">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 18, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="text-[32px] font-extrabold tabular-nums leading-none"
        style={{ color: "hsl(0 0% 100%)" }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
  </div>
);

const Divider = () => (
  <div className="w-px h-8 mx-1 opacity-25" style={{ background: "hsl(0 0% 100%)" }} />
);

const Label = ({ text }: { text: string }) => (
  <span className="text-[9px] font-semibold uppercase tracking-[0.15em] mt-1.5 opacity-50" style={{ color: "hsl(0 0% 100%)" }}>
    {text}
  </span>
);

const MatchCountdown = () => {
  const [t, setT] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const diffMs = MATCH_DATE.getTime() - Date.now();
  const totalDays = Math.max(0, Math.ceil(diffMs / 86400000));

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 1px 3px hsl(0 0% 0% / 0.04), 0 6px 24px hsl(0 0% 0% / 0.03)",
      }}
    >
      {/* Top section */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
              ⚽ FIFA World Cup 2026
            </p>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇺🇿</span>
              <span className="text-[15px] font-extrabold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
                O'zbekiston
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground) / 0.6)" }}>
                vs
              </span>
              <span className="text-[15px] font-extrabold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
                Kolumbiya
              </span>
              <span className="text-2xl">🇨🇴</span>
            </div>
          </div>
          <div
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold shrink-0"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            14 Iyun
          </div>
        </div>

        <p className="text-[22px] font-black mt-3" style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>
          {totalDays} kun qoldi
        </p>
      </div>

      {/* Countdown bar */}
      <div
        className="mx-3 mb-3 rounded-2xl px-2 py-4 flex items-center justify-center gap-0"
        style={{
          background: "linear-gradient(135deg, hsl(220 20% 14%), hsl(220 18% 20%))",
          boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 4px 20px hsl(0 0% 0% / 0.15)",
        }}
      >
        <div className="flex flex-col items-center px-4">
          <Digit value={t.days} />
          <Label text="Kun" />
        </div>
        <Divider />
        <div className="flex flex-col items-center px-4">
          <Digit value={t.hours} />
          <Label text="Soat" />
        </div>
        <Divider />
        <div className="flex flex-col items-center px-4">
          <Digit value={t.minutes} />
          <Label text="Daq" />
        </div>
        <Divider />
        <div className="flex flex-col items-center px-4">
          <Digit value={t.seconds} />
          <Label text="Son" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 flex items-center justify-center">
        <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
          📅 14 Iyun, 2026 · 🕕 18:00 · Guruh bosqichi
        </span>
      </div>
    </div>
  );
};

export default MatchCountdown;
