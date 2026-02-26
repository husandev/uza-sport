import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquare, Flame, Clock } from "lucide-react";
import { heroSlides } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const images = [hero1, hero2, hero3, hero4, hero5];

const SLIDE_DURATION = 6000;

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setProgress(0);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % heroSlides.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [next]);

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
      if (elapsed < SLIDE_DURATION) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  const slide = heroSlides[current];

  // Get next 2 slides for thumbnails
  const nextSlides = [1, 2].map(offset => {
    const idx = (current + offset) % heroSlides.length;
    return { ...heroSlides[idx], image: images[idx], index: idx };
  });

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
      {/* Main slider area */}
      <div className="relative h-[420px] lg:h-[480px] bg-foreground">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                clipPath: d > 0
                  ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                  : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                scale: 1.1,
              }),
              center: {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                scale: 1,
              },
              exit: (d: number) => ({
                clipPath: d > 0
                  ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                  : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                scale: 1.05,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            {/* Ken Burns zoom effect */}
            <motion.img
              src={images[current]}
              alt=""
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />

            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-foreground/10" />

            {/* Content with staggered animations */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 lg:pb-8 z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-live text-primary-foreground rounded-lg mb-4 font-heading">
                  <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
                  {slide.category}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-primary-foreground text-2xl lg:text-4xl font-heading font-extrabold leading-[1.15] mb-3 max-w-[650px] drop-shadow-lg"
              >
                {slide.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="text-primary-foreground/70 text-[15px] mb-4 max-w-[550px] font-body leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center gap-5 text-primary-foreground/60 text-[13px] font-body"
              >
                <span className="flex items-center gap-1.5">
                  <Flame size={14} className="text-highlight" /> {slide.fires}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={14} /> {slide.comments}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> 2 соат олдин
                </span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side thumbnails - next slides preview */}
        <div className="absolute right-4 top-4 bottom-20 hidden lg:flex flex-col gap-3 w-[200px] z-20">
          {nextSlides.map((ns, i) => (
            <motion.div
              key={`thumb-${ns.index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
              onClick={() => goTo(ns.index)}
              className="relative flex-1 rounded-xl overflow-hidden cursor-pointer group border-2 border-primary-foreground/20 hover:border-primary-foreground/50 transition-all shadow-lg"
            >
              <img
                src={ns.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <span className="text-[10px] text-highlight font-heading font-bold uppercase tracking-wider">
                  {ns.category}
                </span>
                <h4 className="text-primary-foreground text-[12px] font-heading font-bold leading-tight line-clamp-2 mt-0.5">
                  {ns.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation arrows — always visible */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/25 text-primary-foreground rounded-xl transition-all backdrop-blur-md border border-primary-foreground/10 z-20 hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 lg:right-[232px] top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/25 text-primary-foreground rounded-xl transition-all backdrop-blur-md border border-primary-foreground/10 z-20 hover:scale-110 active:scale-95"
        >
          <ChevronRight size={22} />
        </button>

        {/* Bottom bar: slide counter + progress + dots */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {/* Progress bar */}
          <div className="h-[3px] bg-primary-foreground/10">
            <motion.div
              className="h-full bg-highlight"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Slide indicators */}
          <div className="flex items-center justify-between px-6 lg:px-10 py-2.5 bg-foreground/60 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === current
                      ? "w-8 h-2 bg-highlight"
                      : "w-2 h-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>
            <span className="text-primary-foreground/50 text-[12px] font-heading font-bold tracking-wider">
              {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
