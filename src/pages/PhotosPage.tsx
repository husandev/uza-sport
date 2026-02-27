import { useState } from "react";
import { Camera, Heart, ChevronLeft, ChevronRight } from "lucide-react";
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
import footballer1 from "@/assets/footballer-1.png";
import footballer2 from "@/assets/footballer-2.jpg";
import footballer3 from "@/assets/footballer-3.jpg";
import footballer4 from "@/assets/footballer-4.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

const photos = [
  { src: photo1, caption: "O'zbekiston — Argentina o'yinidan", likes: 342 },
  { src: stadium1, caption: "MetLife stadioni", likes: 198 },
  { src: hero1, caption: "Terma jamoa safga tizilmoqda", likes: 256 },
  { src: gallery1, caption: "Muxlislar bayramda", likes: 445 },
  { src: photo2, caption: "Stadion tayyorligi", likes: 128 },
  { src: footballer1, caption: "Shomurodov intervyuda", likes: 415 },
  { src: hero2, caption: "Goldan keyingi shodlik", likes: 302 },
  { src: gallery2, caption: "Kechki mashg'ulot", likes: 167 },
  { src: stadium2, caption: "Rose Bowl stadioni", likes: 176 },
  { src: gallery3, caption: "G'alaba kubogi", likes: 523 },
  { src: photo3, caption: "Muxlislar kutib olishi", likes: 89 },
  { src: gallery4, caption: "Zarba lahzasi", likes: 387 },
  { src: hero3, caption: "Yarim final lahzalari", likes: 221 },
  { src: footballer2, caption: "Xusanov mashg'ulotda", likes: 187 },
  { src: gallery5, caption: "O'yin yuqoridan", likes: 294 },
  { src: hero4, caption: "Muxlislar bayroqlari", likes: 145 },
  { src: gallery6, caption: "Jamoa ruhi", likes: 312 },
  { src: stadium3, caption: "AT&T stadioni", likes: 163 },
  { src: footballer3, caption: "Urunov o'yin oldidan", likes: 278 },
  { src: gallery7, caption: "Stadion quyosh botishida", likes: 456 },
  { src: photo4, caption: "Terma jamoa mashg'uloti", likes: 94 },
  { src: gallery8, caption: "Futbol to'pi", likes: 201 },
  { src: hero5, caption: "Volontyorlar tayyorlanmoqda", likes: 112 },
  { src: footballer4, caption: "Shukurov g'alabani nishonlamoqda", likes: 334 },
];

const PER_PAGE = 24;

const PhotosPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(photos.length / PER_PAGE);
  const paginated = photos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const columns: typeof photos[] = [[], [], [], []];
  paginated.forEach((photo, i) => {
    columns[i % 4].push(photo);
  });

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Fotogalereya — JCh 2026</span>
        </div>
      </div>

      <div className="bg-card rounded-2xl px-4 pt-2 pb-6 shadow-sm">
        <div className="flex gap-3">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3">
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
                        (colIdx + i) % 3 === 0
                          ? "3/4"
                          : (colIdx + i) % 3 === 1
                          ? "1/1"
                          : "4/3",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="text-[12px] font-medium text-white flex items-center gap-1.5 font-body mb-1">
                      <Camera size={12} /> {photo.caption}
                    </span>
                    <span className="text-[11px] text-white/70 flex items-center gap-1 font-body">
                      <Heart size={10} className="fill-red-400 text-red-400" /> {photo.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-colors ${
                p === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotosPage;
