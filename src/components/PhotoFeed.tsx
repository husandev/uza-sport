import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import { Camera } from "lucide-react";

const photos = [
  { src: photo1, caption: "Ўзбекистон — Аргентина ўйинидан" },
  { src: photo2, caption: "Стадион тайёрлиги" },
  { src: photo3, caption: "Мухлислар кутиб олиши" },
  { src: photo4, caption: "Терма жамоа машғулоти" },
  { src: hero4, caption: "Метлайф стадиони" },
  { src: hero5, caption: "Волонтёрлар" },
];

const PhotoFeed = () => {
  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Фотогалерея</span>
        <a href="#" className="more-link">Барчаси →</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
            <img src={photo.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-[12px] font-medium text-primary-foreground flex items-center gap-1.5 font-body">
                <Camera size={12} /> {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoFeed;
