import { Play, Eye } from "lucide-react";
import { videoPosts } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero5 from "@/assets/hero-5.jpg";

const thumbs = [hero1, hero2, hero3, hero5];

const VideoPosts = () => {
  return (
    <section className="py-8 md:py-12 bg-primary text-primary-foreground">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">Video postlar</h2>
          <a href="#" className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground">
            Barcha videolar →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videoPosts.map((video, i) => (
            <div
              key={video.id}
              className="rounded-lg overflow-hidden cursor-pointer group relative"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={thumbs[i]}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={20} className="text-accent-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-foreground/80 text-primary-foreground text-xs px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="pt-3">
                <h3 className="font-heading font-semibold text-sm leading-snug text-primary-foreground line-clamp-2">
                  {video.title}
                </h3>
                <span className="flex items-center gap-1 text-xs text-primary-foreground/60 mt-1">
                  <Eye size={12} /> {video.views} ko'rishlar
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoPosts;
