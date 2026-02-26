import { User, Clock, BookOpen } from "lucide-react";
import { latestArticles } from "@/data/mockData";

const LatestArticles = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Maqolalar</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha maqolalar →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestArticles.map((article) => (
            <article
              key={article.id}
              className="bg-card rounded-lg border border-border overflow-hidden card-hover cursor-pointer group"
            >
              <div className="h-2 bg-secondary" />
              <div className="p-5">
                <h3 className="font-heading font-bold text-foreground text-base leading-snug mb-3 group-hover:text-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} /> {article.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
