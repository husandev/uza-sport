import { Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { sidebarArticles } from "@/data/mockData";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import stadium1 from "@/assets/stadium-1.jpg";

const images = [photo1, photo2, photo3, photo4, hero1, hero2, hero3, hero4, hero5, stadium1];

const SidebarArticles = () => {
  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 pt-2 pb-2">
        <div className="section-title">
          <span>Maqolalar</span>
          <Link to="/articles" className="more-link">Barchasi →</Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {sidebarArticles.map((article, i) => (
          <Link
            key={article.id}
            to={`/article/${((article.id - 1) % 3) + 1}`}
            className="px-5 py-4 flex gap-4 cursor-pointer hover:bg-muted/40 transition-colors group block"
          >
            {/* Left: image */}
            <div className="w-[140px] h-[95px] flex-shrink-0 rounded-xl overflow-hidden">
              <img
                src={images[i % images.length]}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right: text */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1.5 font-body">
                  <span>{article.time}</span>
                  {article.category && (
                    <>
                      <span className="text-muted-foreground/40">|</span>
                      <span className="text-primary font-medium">{article.category}</span>
                    </>
                  )}
                </div>
                <h3 className="text-[19px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {article.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground font-body">
                <span>{article.subtitle}</span>
                {article.fires > 0 && (
                  <span className="flex items-center gap-0.5 text-primary">
                    <Flame size={10} /> {article.fires}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarArticles;
