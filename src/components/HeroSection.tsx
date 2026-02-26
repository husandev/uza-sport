import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, MessageSquare } from "lucide-react";
import { heroArticles } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const images = [hero1, hero2, hero3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % 1), []);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((p) => (p + 1) % 1), 6000);
    return () => clearInterval(interval);
  }, []);

  const mainArticle = heroArticles[0];
  const sideArticles = heroArticles.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
      {/* Main large card */}
      <div className="lg:col-span-3 relative rounded overflow-hidden cursor-pointer group h-[320px]">
        <img
          src={hero1}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="news-title text-primary-foreground text-xl md:text-2xl mb-1">
            {mainArticle.title}
          </h2>
          <p className="text-primary-foreground/70 text-xs mb-2">{mainArticle.subtitle}</p>
          <div className="flex items-center gap-3">
            <span className="fire-count">
              <Flame size={13} /> {mainArticle.fires}
            </span>
            <span className="flex items-center gap-1 text-primary-foreground/50 text-xs">
              <MessageSquare size={12} /> +{mainArticle.comments}
            </span>
          </div>
        </div>
      </div>

      {/* Side cards */}
      <div className="lg:col-span-2 flex flex-col gap-2">
        {sideArticles.map((article, i) => (
          <div
            key={article.id}
            className="relative rounded overflow-hidden cursor-pointer group flex-1 min-h-[155px]"
          >
            <img
              src={images[i + 1]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="news-title text-primary-foreground text-sm mb-0.5">
                {article.title}
              </h3>
              <p className="text-primary-foreground/60 text-[11px] mb-1.5">{article.subtitle}</p>
              <div className="flex items-center gap-3">
                <span className="fire-count text-[11px]">
                  <Flame size={11} /> {article.fires}
                </span>
                <span className="flex items-center gap-1 text-primary-foreground/50 text-[11px]">
                  <MessageSquare size={10} /> +{article.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
