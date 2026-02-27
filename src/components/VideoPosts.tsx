import { Play, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { videoPosts } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero5 from "@/assets/hero-5.jpg";

const thumbs = [hero1, hero2, hero3, hero5];

const VideoPosts = () => {
  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Video</span>
        <Link to="/videos" className="more-link">Barchasi →</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videoPosts.map((video, i) => (
          <div key={video.id} className="cursor-pointer group">
            <div className="aspect-video rounded-xl overflow-hidden relative mb-2.5 bg-muted">
              <img src={thumbs[i]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Play size={18} className="text-primary-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-foreground/80 text-primary-foreground text-[11px] px-2.5 py-0.5 rounded-lg font-medium font-body">
                {video.duration}
              </span>
            </div>
            <h3 className="text-sm font-bold leading-snug text-foreground group-hover:text-link transition-colors font-heading line-clamp-2">
              {video.title}
            </h3>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1.5 font-body">
              <Eye size={11} /> {video.views} ko'rish
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPosts;
