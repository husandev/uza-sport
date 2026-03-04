"use client";
import Link from "next/link";
import { Play, ImageOff } from "lucide-react";

interface PostCardProps {
  href: string;
  thumbnail?: string;
  title: string;
  description?: string;
  publishTime: string;
  category?: string;
  showPlayIcon?: boolean;
}

export default function PostCard({
  href,
  thumbnail,
  title,
  description,
  publishTime,
  category,
  showPlayIcon = false,
}: PostCardProps) {
  return (
    <Link
      href={href}
      className="px-4 sm:px-6 py-4 sm:py-5 flex gap-3 sm:gap-5 cursor-pointer hover:bg-muted/40 transition-colors group "
    >
      <div className={`w-[88px] sm:w-[160px] h-[66px] sm:h-[110px] flex-shrink-0 rounded-xl overflow-hidden relative bg-muted`}>
        {thumbnail ? (
          <img
            src={thumbnail}
            loading="lazy"
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <ImageOff size={20} className="text-muted-foreground/30" />
            <span className="text-[10px] text-muted-foreground/30 font-medium">Rasm yo'q</span>
          </div>
        )}
        {showPlayIcon && (
          <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={18} className="text-primary-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
            <span>{publishTime}</span>
            {/* {category && (
              <>
                <span className="text-muted-foreground/40">|</span>
                <span className="text-primary font-medium">{category}</span>
              </>
            )} */}
          </div>
          <h3 className="text-[13px] sm:text-[18px] font-bold text-foreground leading-[1] group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          {description && description !== "_" && (
            <div className="hidden sm:block mt-1.5">
              <p className="text-[13px] text-muted-foreground line-clamp-2 font-body">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
