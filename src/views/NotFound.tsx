"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-[hsl(210,65%,14%)] -mb-10">
      {/* 404 watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="font-heading font-black text-white/[0.035]"
          style={{ fontSize: "clamp(180px, 32vw, 360px)", lineHeight: 1 }}
        >
          404
        </span>
      </div>

      {/* Glow blobs */}
      <div className="absolute top-8 right-12 w-48 h-48 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 left-10 w-36 h-36 rounded-full bg-highlight/10 blur-2xl pointer-events-none" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        {/* Bouncing ball */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[72px] mb-5 leading-none"
          aria-hidden
        >
          ⚽
        </motion.div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
          <span className="text-highlight text-[11px] font-heading font-bold uppercase tracking-[0.18em]">
            Ofsayd!
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-extrabold text-white leading-[1.05] tracking-tight mb-3">
          Sahifa topilmadi
        </h1>

        {/* Subtext */}
        <p className="text-white/55 text-[15px] sm:text-[17px] font-body leading-relaxed max-w-[420px] mx-auto mb-8">
          Siz izlayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan.
          Bosh sahifaga qaytib, kerakli ma'lumotni toping.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-[14px] px-6 py-3 rounded-xl transition-colors"
          >
            <Home size={15} /> Bosh sahifaga qaytish
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-heading font-bold text-[14px] px-6 py-3 rounded-xl transition-colors"
          >
            Yangiliklar <ArrowRight size={15} />
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="h-px w-14 bg-white/15" />
          <span className="text-[11px] font-body uppercase tracking-widest text-white/25">
            FIFA 2026 Jahon Kubogi
          </span>
          <div className="h-px w-14 bg-white/15" />
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
