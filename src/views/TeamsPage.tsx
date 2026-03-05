"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { useThemePosts } from "@/hooks/queries";
import { formatPublishTime } from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import PostListSkeleton from "@/components/PostListSkeleton";

const PER_PAGE = 20;

const TeamsPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useThemePosts("oz", PER_PAGE, page, 229, "tags");
  const posts = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  return (
    <>
      <div className="container pt-4 pb-8">
        <div className="mb-5">
          <div className="section-title">
            <span>Barcha jamoalar — JCh 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {isLoading && <PostListSkeleton />}
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/article/${post.slug}`}
                    className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                  >
                    {/* Image */}
                    <div className="w-[110px] sm:w-[200px] h-[80px] sm:h-[130px] flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                      <img
                        src={post.files?.thumbnails?.normal?.src}
                        loading="lazy"
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                          <span>{formatPublishTime(post.publish_time)}</span>
                          {/* {post.category?.title && (
                            <>
                              <span className="text-muted-foreground/40">|</span>
                              <span className="text-primary font-medium">{post.category.title}</span>
                            </>
                          )} */}
                        </div>
                        <h3 className="text-[15px] sm:text-[20px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2 font-body">
                          {post.description}
                        </p>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground font-body">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">
                            {post.tags[1]?.title}
                          </span>
                          <span className="text-muted-foreground/40">•</span>
                          <span>{post.tags[0]?.title}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} isLoading={isLoading} />
          </div>

          {/* Right: Tournament standings */}
          <div className="lg:col-span-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto scrollbar-thin space-y-4">
            <GroupStandings data={standings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsPage;
