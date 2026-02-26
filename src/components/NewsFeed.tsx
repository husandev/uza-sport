import { MessageSquare, Flame } from "lucide-react";
import { newsFeed } from "@/data/mockData";

const NewsFeed = () => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="section-title">
        <span>Сўнги янгиликлар</span>
        <a href="#" className="more-link">Барчаси →</a>
      </div>

      <div>
        {newsFeed.map((item) => (
          <div key={item.id} className="news-item px-1">
            <h3>{item.title}</h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[11px] text-muted-foreground font-medium font-body">{item.time}</span>
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
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
