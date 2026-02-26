import { MessageSquare } from "lucide-react";
import { sidebarArticles } from "@/data/mockData";

const SidebarArticles = () => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="section-title">
        <span>Мақолалар</span>
        <a href="#" className="more-link">Барчаси →</a>
      </div>

      <div>
        {sidebarArticles.map((article) => (
          <div key={article.id} className="news-item px-1">
            <h3 className="text-sm font-semibold text-foreground leading-snug hover:text-link transition-colors cursor-pointer">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1.5 font-body">
              <span className="font-medium">{article.author}</span>
              <span className="flex items-center gap-0.5">
                <MessageSquare size={10} /> {article.comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarArticles;
