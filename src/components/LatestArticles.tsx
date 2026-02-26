import { MessageSquare, Clock } from "lucide-react";
import { latestArticles } from "@/data/mockData";

const LatestArticles = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">Maqolalar</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <div className="divide-y divide-border">
        {latestArticles.map((article) => (
          <article
            key={article.id}
            className="px-3 py-2.5 hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <h3 className="text-xs font-semibold text-foreground leading-snug mb-1 hover:text-accent transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>{article.author}</span>
              <span className="flex items-center gap-0.5"><Clock size={9} /> {article.readTime}</span>
              <span className="flex items-center gap-0.5"><MessageSquare size={9} /> {article.comments}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
