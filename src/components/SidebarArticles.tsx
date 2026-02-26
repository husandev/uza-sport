import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { sidebarArticles } from "@/data/mockData";

const SidebarArticles = () => {
  const [current, setCurrent] = useState(0);
  const total = sidebarArticles.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const article = sidebarArticles[current];

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 pt-4 pb-2">
        <div className="section-title">
          <span>Мақолалар</span>
          <a href="#" className="more-link">Барчаси →</a>
        </div>
      </div>

      {/* Carousel card */}
      <div className="relative px-4 pb-4">
        <div className="bg-gradient-to-br from-primary/8 to-primary/3 rounded-xl p-4 min-h-[120px] flex flex-col justify-between transition-all duration-300">
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-3">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 mt-3 text-[11px] text-muted-foreground font-body">
              <User size={10} />
              <span className="font-medium">{article.author}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1">
              {sidebarArticles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={prev}
                className="w-6 h-6 flex items-center justify-center rounded-md bg-muted hover:bg-primary/10 transition-colors"
              >
                <ChevronLeft size={12} className="text-muted-foreground" />
              </button>
              <button
                onClick={next}
                className="w-6 h-6 flex items-center justify-center rounded-md bg-muted hover:bg-primary/10 transition-colors"
              >
                <ChevronRight size={12} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarArticles;
