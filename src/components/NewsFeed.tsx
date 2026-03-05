"use client";

import { Clock } from "lucide-react";
import Link from "next/link";
import { useThemePosts } from "@/hooks/queries/usePosts";
import { formatPublishTime } from "@/lib/utils";

const NewsFeed = () => {
  const { data, isLoading } = useThemePosts("oz", 15, 1, 231);
  const items = data?.data ?? [];

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 pt-2 pb-2">
        <div className="section-title">
          <span>So'ngi yangiliklar</span>
          <Link href="/news" className="more-link">Barchasi →</Link>
        </div>
      </div>

      <div className="px-1.5 pb-3">
        {isLoading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="news-item animate-pulse">
            <div className="h-4 bg-muted rounded w-full mb-1.5" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/4 mt-1.5" />
          </div>
        ))}

        {!isLoading && items.map((item) => (
          <Link key={item.id} href={`/article/${item.slug}`} className="news-item group block">
            <h3 className="line-clamp-2">{item.title}</h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium font-body">
                <Clock size={10} />
                {formatPublishTime(item.publish_time)}
              </span>
              {/* {item.category?.title && (
                <span className="text-[11px] text-primary font-medium font-body">
                  {item.category.title}
                </span>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
