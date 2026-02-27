import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GroupStandings from "@/components/GroupStandings";
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

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container pt-4 pb-8">
        {/* Page title */}
        <div className="mb-5">
          <div className="section-title">
            <span>Barcha yangiliklar</span>
          </div>
        </div>

        {/* 2-column layout: articles left, standings right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Articles list */}
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {sidebarArticles.map((article, i) => (
                  <Link
                    key={article.id}
                    to={`/article/${((article.id - 1) % 3) + 1}`}
                    className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                  >
                    {/* Image */}
                    <div className="w-[200px] h-[130px] flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={images[i % images.length]}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                          <span>{article.time}</span>
                          {article.category && (
                            <>
                              <span className="text-muted-foreground/40">|</span>
                              <span className="text-primary font-medium">{article.category}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-[20px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-2 font-body">
                          {article.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground font-body">
                        {article.fires > 0 && (
                          <span className="flex items-center gap-0.5 text-primary">
                            <Flame size={11} /> {article.fires}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tournament standings */}
          <div className="lg:col-span-4 space-y-4">
            <GroupStandings />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;
