import { Play, Eye } from "lucide-react";
import { videoPosts } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero5 from "@/assets/hero-5.jpg";

const thumbs = [hero1, hero2, hero3, hero5];

const VideoPosts = () => {
  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Видео</span>
        <a href="#" className="meta-link">Барчаси →</a>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {videoPosts.map((video, i) => (
          <div key={video.id} className="cursor-pointer group">
            <div className="aspect-video rounded overflow-hidden relative mb-1.5">
              <img src={thumbs[i]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                  <Play size={15} className="text-accent-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 bg-foreground/80 text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
                {video.duration}
              </span>
            </div>
            <h3 className="text-[12px] font-semibold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {video.title}
            </h3>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground mt-0.5">
              <Eye size={9} /> {video.views}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPosts;
