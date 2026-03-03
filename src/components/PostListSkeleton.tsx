"use client";

interface PostListSkeletonProps {
  count?: number;
}

export default function PostListSkeleton({ count = 5 }: PostListSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="px-5 sm:px-6 py-5 flex gap-5 animate-pulse">
          <div className="w-[110px] sm:w-[200px] h-[80px] sm:h-[130px] flex-shrink-0 rounded-xl bg-muted" />
          <div className="flex-1 space-y-2 pt-2">
            <div className="h-3 bg-muted rounded w-1/4" />
            <div className="h-5 bg-muted rounded w-full" />
            <div className="h-5 bg-muted rounded w-4/5" />
          </div>
        </div>
      ))}
    </>
  );
}
