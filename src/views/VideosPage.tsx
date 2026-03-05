"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { useVideos } from "@/hooks/queries";
import { formatPublishTime } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import PostListSkeleton from "@/components/PostListSkeleton";
import Pagination from "@/components/Pagination";

const VideosPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useVideos(page);
  const videos = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Barcha videolar — JCh 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {isLoading && <PostListSkeleton />}
              {videos.map((video) => (
                <PostCard
                  key={video.id}
                  href={`/video/${video.slug}`}
                  thumbnail={video.files?.thumbnails?.normal?.src}
                  title={video.title}
                  description={video.description}
                  publishTime={formatPublishTime(video.publish_time)}
                  category={video.category?.title}
                  showPlayIcon
                />
              ))}
            </div>
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} isLoading={isLoading} />
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto scrollbar-thin space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
