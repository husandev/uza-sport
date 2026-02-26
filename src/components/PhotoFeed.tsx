import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import stadium1 from "@/assets/stadium-1.jpg";
import { Camera, Heart } from "lucide-react";

const photos = [
  { src: photo1, caption: "Ўзбекистон — Аргентина ўйинидан", likes: 342, tall: true },
  { src: photo2, caption: "Стадион тайёрлиги", likes: 128, tall: false },
  { src: hero1, caption: "Терма жамоа сафга тизилмоқда", likes: 256, tall: false },
  { src: photo3, caption: "Мухлислар кутиб олиши", likes: 89, tall: true },
  { src: hero2, caption: "Голдан кейинги шодлик", likes: 415, tall: false },
  { src: stadium1, caption: "Метлайф стадиони", likes: 198, tall: false },
  { src: hero3, caption: "Ярим финал лаҳзалари", likes: 302, tall: true },
  { src: photo4, caption: "Терма жамоа машғулоти", likes: 176, tall: false },
  { src: hero4, caption: "Мухлислар байроқлари", likes: 221, tall: false },
  { src: hero5, caption: "Волонтёрлар", likes: 94, tall: false },
];

const PhotoFeed = () => {
  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Фотогалерея</span>
        <a href="#" className="more-link">Барчаси →</a>
      </div>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                photo.tall ? "aspect-[3/4]" : "aspect-square"
              }`}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <span className="text-[12px] font-medium text-white flex items-center gap-1.5 font-body mb-1.5">
                <Camera size={12} /> {photo.caption}
              </span>
              <span className="text-[11px] text-white/70 flex items-center gap-1 font-body">
                <Heart size={10} className="fill-red-400 text-red-400" /> {photo.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoFeed;
