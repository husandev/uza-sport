"use client";
import Link from "next/link";
import { useSportPosts } from "@/hooks/queries";
import { formatPublishTime } from "@/lib/utils";

const SidebarArticles = ({ title = "Maqolalar" }: { title?: string }) => {
  const { data, isLoading } = useSportPosts("oz", 10);
  const posts = data?.data ?? [];

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 pt-2 pb-2">
        <div className="section-title">
          <span>{title}</span>
          <Link href="/articles" className="more-link">Barchasi →</Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {isLoading && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-5 py-4 flex gap-4 animate-pulse">
            <div className="w-[140px] h-[95px] flex-shrink-0 rounded-xl bg-muted" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-4/5" />
            </div>
          </div>
        ))}

        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/article/${post.slug}`}
            className="px-5 py-4 flex gap-4 cursor-pointer hover:bg-muted/40 transition-colors group block"
          >
            {/* Left: image */}
            <div className="w-[140px] h-[95px] flex-shrink-0 rounded-xl overflow-hidden">
              <img
                src={post.files?.thumbnails?.normal?.src}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right: text */}
            <div className="flex-1 min-w-0 h-[95px] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1.5 font-body">
                  <span>{formatPublishTime(post.publish_time)}</span>
                  {post.category?.title && (
                    <>
                      <span className="text-muted-foreground/40">|</span>
                      <span className="text-primary font-medium">{post.category.title}</span>
                    </>
                  )}
                </div>
                <h3 className="text-[19px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 ">
                  {post.title}
                </h3>
                <p className="text-[12px] text-muted-foreground mt-1 line-clamp-2 font-body leading-snug">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarArticles;
