import { MessageSquare } from "lucide-react";
import { sidebarArticles } from "@/data/mockData";

const SidebarArticles = () => {
  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Мақолалар</span>
        <a href="#" className="meta-link">Барчаси →</a>
      </div>

      <div className="space-y-0">
        {sidebarArticles.map((article) => (
          <article
            key={article.id}
            className="py-2 border-b border-border last:border-0 cursor-pointer group"
          >
            <h3 className="text-[13px] font-semibold text-foreground leading-snug group-hover:text-accent transition-colors mb-1">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>{article.author}</span>
              <span className="flex items-center gap-0.5">
                <MessageSquare size={10} /> {article.comments}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SidebarArticles;
