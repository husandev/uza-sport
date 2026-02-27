import { Flame, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { newsFeed } from "@/data/mockData";

const NewsFeed = () => {
  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-2 pb-2">
        <div className="section-title">
          <span>So'ngi yangiliklar</span>
          <a href="#" className="more-link">Barchasi →</a>
        </div>
      </div>

      {/* News list */}
      <div className="px-1.5 pb-3">
        {newsFeed.map((item) => (
          <Link key={item.id} to={`/article/${((item.id - 1) % 3) + 1}`} className="news-item group block">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
