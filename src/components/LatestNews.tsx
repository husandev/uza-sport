import { MessageSquare } from "lucide-react";
import { latestNews } from "@/data/mockData";

const LatestNews = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">So'nggi yangiliklar</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <div className="divide-y divide-border">
        {latestNews.map((news) => (
          <article
            key={news.id}
            className="px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors flex items-start gap-2"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-semibold text-secondary uppercase">{news.category}</span>
                <span className="text-[10px] text-muted-foreground">{news.time}</span>
              </div>
              <h3 className="text-xs font-semibold text-foreground leading-snug line-clamp-2 hover:text-accent transition-colors">
                {news.title}
              </h3>
            </div>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground shrink-0 mt-2">
              <MessageSquare size={10} />
              {news.comments}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
