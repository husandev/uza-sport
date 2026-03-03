"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { useSportPosts } from "@/hooks/queries";
import { formatPublishTime } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import PostListSkeleton from "@/components/PostListSkeleton";
import Pagination from "@/components/Pagination";

const PER_PAGE = 20;

const ArticlesPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSportPosts("oz", PER_PAGE, page);
  const posts = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  return (
    <>
      <div className="container pt-4 pb-8">
        <div className="mb-5">
          <div className="section-title">
            <span>Barcha maqolalar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {isLoading && <PostListSkeleton />}
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    href={`/article/${post.slug}`}
                    thumbnail={post.files?.thumbnails?.normal?.src}
                    title={post.title}
                    description={post.description}
                    publishTime={formatPublishTime(post.publish_time)}
                    category={post.category?.title}
                  />
                ))}
              </div>
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} isLoading={isLoading} />
          </div>

          {/* Right: Tournament standings */}
          <div className="lg:col-span-4 space-y-4">
            <GroupStandings data={standings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesPage;
