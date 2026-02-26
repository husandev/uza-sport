import { Clock } from "lucide-react";
import { latestNews } from "@/data/mockData";

const LatestNews = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">So'nggi yangiliklar</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha yangiliklar →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestNews.map((news) => (
            <article
              key={news.id}
              className="bg-card rounded-lg border border-border p-5 card-hover cursor-pointer"
            >
              <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-semibold rounded mb-3">
                {news.category}
              </span>
              <h3 className="font-heading font-bold text-foreground text-sm leading-snug mb-2 line-clamp-3">
                {news.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {news.excerpt}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {news.date}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
