import { MessageSquare } from "lucide-react";
import { newsFeed } from "@/data/mockData";

const NewsFeed = () => {
  return (
    <div>
      <div className="space-y-0">
        {newsFeed.map((item) => (
          <article
            key={item.id}
            className="py-1.5 border-b border-border last:border-0 cursor-pointer group"
          >
            <h3 className="text-[13px] font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-muted-foreground">{item.time}</span>
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
