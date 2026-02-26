import { MessageSquare, Flame, Clock } from "lucide-react";
import { newsFeed } from "@/data/mockData";

const NewsFeed = () => {
  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="section-title">
          <span>Сўнги янгиликлар</span>
          <a href="#" className="more-link">Барчаси →</a>
        </div>
      </div>

      {/* News list */}
      <div className="px-1.5 pb-3">
        {newsFeed.map((item, index) => (
          <div key={item.id} className="news-item group">
            <div className="flex items-start gap-3">
              {/* Number indicator */}
              <span className="text-[22px] font-heading font-extrabold text-muted-foreground/30 group-hover:text-primary/40 transition-colors leading-none mt-0.5 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              
              <div className="flex-1 min-w-0">
                <h3 className="line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium font-body">
                    <Clock size={10} />
                    {item.time}
                  </span>
                  {item.fires > 0 && (
                    <span className="fire-count">
                      <Flame size={11} /> {item.fires}
                    </span>
                  )}
                  <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                    <MessageSquare size={10} /> {item.comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
