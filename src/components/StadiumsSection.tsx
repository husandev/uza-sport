"use client";
import Link from "next/link";
import { useThemePosts } from "@/hooks/queries";

const StadiumsSection = () => {
  const { data } = useThemePosts("oz", 6, 1, 227, "tags");
  const stadiums = data?.data ?? [];

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm h-[570px] ">
      <div className="section-title">
        <span>Stadionlar</span>
        <Link href="/stadiums" className="more-link">Barchasi →</Link>
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-auto scrollbar-thin h-[490px]">
        {stadiums.map((stadium) => (
          <Link key={stadium.id} href={`/article/${stadium.slug}`} className="cursor-pointer group">
            <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2.5 bg-muted">
              <img
                src={stadium.files?.thumbnails?.normal?.src}
                loading="lazy"
                alt={stadium.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-sm font-bold font-heading text-foreground group-hover:text-link transition-colors line-clamp-2">
              {stadium.title}
            </h3>
            {stadium.tags && stadium.tags.length > 0 && (
              <p className="text-[12px] text-muted-foreground mt-1 font-body">
                {stadium.tags[0]?.title}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StadiumsSection;
