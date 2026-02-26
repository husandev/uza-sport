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
import stadium2 from "@/assets/stadium-2.jpg";
import stadium3 from "@/assets/stadium-3.jpg";
import footballer1 from "@/assets/footballer-1.jpg";
import footballer2 from "@/assets/footballer-2.jpg";
import footballer3 from "@/assets/footballer-3.jpg";
import footballer4 from "@/assets/footballer-4.jpg";
import { Camera, Heart } from "lucide-react";

const photos = [
  { src: photo1, caption: "Ўзбекистон — Аргентина ўйинидан", likes: 342 },
  { src: stadium1, caption: "MetLife стадиони", likes: 198 },
  { src: hero1, caption: "Терма жамоа сафга тизилмоқда", likes: 256 },
  { src: photo2, caption: "Стадион тайёрлиги", likes: 128 },
  { src: footballer1, caption: "Шомуродов интервьюда", likes: 415 },
  { src: hero2, caption: "Голдан кейинги шодлик", likes: 302 },
  { src: stadium2, caption: "Rose Bowl стадиони", likes: 176 },
  { src: photo3, caption: "Мухлислар кутиб олиши", likes: 89 },
  { src: hero3, caption: "Ярим финал лаҳзалари", likes: 221 },
  { src: footballer2, caption: "Хусанов машғулотда", likes: 187 },
  { src: hero4, caption: "Мухлислар байроқлари", likes: 145 },
  { src: stadium3, caption: "AT&T стадиони", likes: 163 },
  { src: footballer3, caption: "Урунов ўйин олдидан", likes: 278 },
  { src: photo4, caption: "Терма жамоа машғулоти", likes: 94 },
  { src: hero5, caption: "Волонтёрлар тайёрланмоқда", likes: 112 },
  { src: footballer4, caption: "Шукуров ғалабани нишонламоқда", likes: 334 },
];

const PhotoFeed = () => {
  // Split photos into 4 columns with varying heights
  const columns: typeof photos[] = [[], [], [], []];
  photos.forEach((photo, i) => {
    columns[i % 4].push(photo);
  });

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Фотогалерея</span>
        <a href="#" className="more-link">Барчаси →</a>
      </div>

      <div className="flex gap-2.5">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-2.5">
            {col.map((photo, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{
                    aspectRatio:
                      // Vary aspect ratios to create masonry effect
                      (colIdx + i) % 3 === 0
                        ? "3/4"
                        : (colIdx + i) % 3 === 1
                        ? "1/1"
                        : "4/3",
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <span className="text-[11px] font-medium text-white flex items-center gap-1.5 font-body mb-1">
                    <Camera size={11} /> {photo.caption}
                  </span>
                  <span className="text-[10px] text-white/70 flex items-center gap-1 font-body">
                    <Heart size={9} className="fill-red-400 text-red-400" /> {photo.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoFeed;
