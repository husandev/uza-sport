"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSportPosts } from "@/hooks/queries";
import { formatPublishTime, getPageNumbers } from "@/lib/utils";

const PER_PAGE = 20;

const NewsPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSportPosts("oz", PER_PAGE, page);
  const posts = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  function goTo(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Barcha yangiliklar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {isLoading && Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 sm:px-6 py-5 flex gap-5 animate-pulse">
                  <div className="w-[110px] sm:w-[200px] h-[80px] sm:h-[130px] flex-shrink-0 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-2 pt-2">
                    <div className="h-3 bg-muted rounded w-1/4" />
                    <div className="h-5 bg-muted rounded w-full" />
                    <div className="h-5 bg-muted rounded w-4/5" />
                  </div>
                </div>
              ))}
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/article/${post.slug}`}
                  className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                >
                  <div className="w-[110px] sm:w-[200px] h-[80px] sm:h-[130px] flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={post.files?.thumbnails?.normal?.src}
                      loading="lazy"
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                        <span>{formatPublishTime(post.publish_time)}</span>
                        {post.category?.title && (
                          <>
                            <span className="text-muted-foreground/40">|</span>
                            <span className="text-primary font-medium">{post.category.title}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-[15px] sm:text-[20px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-2 font-body">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1 || isLoading}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {getPageNumbers(page, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-[13px]">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  disabled={isLoading}
                  className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-colors ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages || isLoading}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right: Tournament standings */}
        <div className="lg:col-span-4 space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
