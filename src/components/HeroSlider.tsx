import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroNews } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const images = [hero1, hero2, hero3, hero4, hero5];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % heroNews.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + heroNews.length) % heroNews.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative h-[280px] md:h-[340px] overflow-hidden rounded-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img src={images[current]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="inline-block px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold font-heading uppercase rounded-sm mb-1.5">
              {heroNews[current].category}
            </span>
            <h2 className="text-base md:text-xl font-heading font-bold text-primary-foreground leading-tight max-w-xl">
              {heroNews[current].title}
            </h2>
            <p className="mt-1 text-xs text-primary-foreground/70 max-w-lg line-clamp-1">
              {heroNews[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-foreground/30 hover:bg-foreground/50 text-primary-foreground rounded-sm transition-colors">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-foreground/30 hover:bg-foreground/50 text-primary-foreground rounded-sm transition-colors">
        <ChevronRight size={18} />
      </button>

      {/* Tabs at bottom */}
      <div className="absolute bottom-0 right-0 flex">
        {heroNews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-6 h-1 transition-all ${
              i === current ? "bg-accent" : "bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
