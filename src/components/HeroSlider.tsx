"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useTopPosts } from "@/hooks/queries/usePosts";

const SLIDE_DURATION = 6000;

const HeroSlider = () => {
  const { data: posts, isLoading } = useTopPosts();
  const slides = posts ?? [];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setProgress(0);
  }, [current]);

  const next = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered || slides.length === 0) return;
    const interval = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [next, isHovered, slides.length]);

  useEffect(() => {
    if (isHovered || slides.length === 0) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
      if (elapsed < SLIDE_DURATION) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, isHovered, slides.length]);

  // Reset current if slides shrink
  useEffect(() => {
    if (slides.length > 0 && current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  if (isLoading) {
    return (
      <div className="relative w-full overflow-hidden rounded-b-2xl">
        <div className="h-[280px] sm:h-[400px] lg:h-[560px] bg-muted animate-pulse" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  const slide = slides[current];
  const heroImage = slide.files?.thumbnails?.front?.src ?? slide.files?.thumbnails?.normal?.src;

  const nextSlides = [1, 2, 3].map((offset) => {
    const idx = (current + offset) % slides.length;
    return { ...slides[idx], index: idx };
  });

  return (
    <div
      className="relative w-full overflow-hidden rounded-b-2xl shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[280px] sm:h-[400px] lg:h-[560px] bg-foreground">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                clipPath: d > 0
                  ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                  : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                scale: 1.15,
                filter: "brightness(0.5)",
              }),
              center: {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                scale: 1,
                filter: "brightness(1)",
              },
              exit: (d: number) => ({
                clipPath: d > 0
                  ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                  : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                scale: 1.05,
                filter: "brightness(0.3)",
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={heroImage}
              alt={slide.title}
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover"
              initial={{ scale: 1, y: 0 }}
              animate={{ scale: 1.1, y: -15 }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />

            <div className="absolute top-0 right-[240px] bottom-0 w-px bg-gradient-to-b from-transparent via-primary-foreground/15 to-transparent hidden lg:block" />

            <div className="absolute bottom-0 left-0 right-0 lg:right-[260px] p-4 sm:p-6 lg:p-10 lg:pb-20 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.06, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="absolute -left-4 bottom-16 text-[180px] font-heading font-black text-primary-foreground leading-none select-none pointer-events-none hidden lg:block"
              >
                {String(current + 1).padStart(2, "0")}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest bg-live text-primary-foreground rounded-lg mb-4 sm:mb-5 font-heading shadow-lg shadow-live/30">
                  <TrendingUp size={12} />
                  {slide.category?.title ?? "Yangilik"}
                </span>
              </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                 className="text-primary-foreground text-3xl lg:text-[44px] font-heading font-extrabold leading-[1.1] mb-4 max-w-[620px] drop-shadow-xl line-clamp-4"
                >
                  {slide.title}
                </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="h-1 bg-highlight rounded-full mb-4"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              className="text-primary-foreground/70 text-[15px] mb-5 max-w-[520px] font-body leading-relaxed line-clamp-4"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={prev}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Oldingi slayd"
                    className="w-10 h-10 flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/25 text-primary-foreground rounded-xl transition-all backdrop-blur-md border border-primary-foreground/15"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Keyingi slayd"
                    className="w-10 h-10 flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/25 text-primary-foreground rounded-xl transition-all backdrop-blur-md border border-primary-foreground/15"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/article/${slide.slug}`}
                    className="inline-block px-5 py-2.5 bg-highlight text-foreground font-heading font-bold text-[13px] uppercase tracking-wide rounded-xl shadow-lg shadow-highlight/30 hover:shadow-highlight/50 transition-shadow"
                  >
                    Batafsil →
                  </Link>
                </motion.div>
                <div className="flex items-center gap-4 text-primary-foreground/50 text-[13px] font-body">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span className="hidden sm:inline">{slide.publish_time?.slice(0, 10)}</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right side — vertical thumbnail strip */}
        <div className="absolute right-0 top-0 bottom-0 hidden lg:flex flex-col w-[220px] z-20 bg-foreground/40 backdrop-blur-lg border-l border-primary-foreground/10">
          {nextSlides.map((ns, i) => {
            const nsImage = ns.files?.thumbnails?.normal?.src ?? ns.files?.thumbnails?.small?.src;
            return (
              <motion.div
                key={`thumb-${current}-${ns.index}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.45 }}
                onClick={() => goTo(ns.index)}
                className="relative flex-1 cursor-pointer group overflow-hidden border-b border-primary-foreground/10 last:border-b-0"
              >
                {nsImage && (
                  <img
                    src={nsImage}
                    alt={ns.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/20 group-hover:from-foreground/70 transition-all" />
                <div className="absolute top-0 left-0 w-[3px] h-full bg-highlight scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-[9px] text-highlight font-heading font-bold uppercase tracking-widest">
                    {ns.category?.title ?? ""}
                  </span>
                  <h4 className="text-primary-foreground text-[12px] font-heading font-bold leading-tight line-clamp-2 mt-1 group-hover:text-highlight transition-colors">
                    {ns.title}
                  </h4>
                </div>
                <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-primary-foreground/10 flex items-center justify-center">
                  <span className="text-[10px] font-heading font-bold text-primary-foreground/60">
                    {String(ns.index + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 lg:right-[220px] z-30">
          <div className="h-[3px] bg-primary-foreground/10">
            <motion.div
              className="h-full bg-gradient-to-r from-highlight to-highlight/60"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 bg-foreground/70 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className="relative group/dot">
                  <div className={`rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10 h-2.5 bg-highlight shadow-lg shadow-highlight/40"
                      : "w-2.5 h-2.5 bg-primary-foreground/25 hover:bg-primary-foreground/50"
                  }`} />
                  {i === current && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute inset-0 rounded-full ring-2 ring-highlight/30"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary-foreground/40 text-[11px] font-body hidden sm:inline">
                {isHovered ? "⏸ To'xtatildi" : "▶ Avto o'tish"}
              </span>
              <span className="text-primary-foreground/60 text-[13px] font-heading font-bold tracking-widest">
                {String(current + 1).padStart(2, "0")}
                <span className="text-primary-foreground/30"> / </span>
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
