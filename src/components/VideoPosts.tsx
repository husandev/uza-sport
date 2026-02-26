import { Play, Eye } from "lucide-react";
import { videoPosts } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero5 from "@/assets/hero-5.jpg";

const thumbs = [hero1, hero2, hero3, hero5];

const VideoPosts = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">Video</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <div className="divide-y divide-border">
        {videoPosts.map((video, i) => (
          <div
            key={video.id}
            className="px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors flex items-center gap-3"
          >
            <div className="w-24 h-14 rounded-sm overflow-hidden relative shrink-0">
              <img src={thumbs[i]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                <Play size={14} className="text-primary-foreground" fill="currentColor" />
              </div>
              <span className="absolute bottom-0.5 right-0.5 bg-foreground/80 text-primary-foreground text-[9px] px-1 rounded-sm">
                {video.duration}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                {video.title}
              </h3>
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground mt-1">
                <Eye size={9} /> {video.views}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPosts;
