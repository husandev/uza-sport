import { Flame, MessageSquare, Clock } from "lucide-react";
import { newsFeed } from "@/data/mockData";

const NewsFeed = () => {
  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Янгиликлар</span>
        <a href="#" className="meta-link">Барчаси →</a>
      </div>

      <div className="space-y-0">
        {newsFeed.map((item) => (
          <article
            key={item.id}
            className="flex items-start gap-2 py-2 border-b border-border last:border-0 cursor-pointer group"
          >
            <span className="text-[11px] text-muted-foreground w-10 shrink-0 pt-0.5">{item.time}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                {item.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0 pt-0.5">
              {item.fires > 0 && (
                <span className="fire-count text-[11px]">
                  <Flame size={11} /> {item.fires}
                </span>
              )}
              <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                <MessageSquare size={10} /> {item.comments}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
