import { MessageSquare } from "lucide-react";
import { photoArticles } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";

const images = [hero1, hero2, hero3, hero4, hero5, photo1, photo2, photo3, photo4];

const PhotoArticles = () => {
  const rows = [];
  for (let i = 0; i < photoArticles.length; i += 3) {
    rows.push(photoArticles.slice(i, i + 3));
  }

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Foto yangiliklar</span>
        <a href="#" className="more-link">Barchasi →</a>
      </div>

      <div className="space-y-5">
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {row.map((article, ci) => (
              <div key={article.id} className="cursor-pointer group">
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2.5 bg-muted">
                  <img
                    src={images[(ri * 3 + ci) % images.length].src}
                    loading="lazy"
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-[11px] text-muted-foreground font-body">{article.time}</span>
                <h3 className="text-sm font-bold leading-snug mt-1 text-foreground group-hover:text-link transition-colors font-heading">
                  {article.title}
                </h3>
                {article.comments > 0 && (
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1.5 font-body">
                    <MessageSquare size={10} /> {article.comments}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoArticles;
