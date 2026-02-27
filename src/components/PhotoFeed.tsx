import { useState, useEffect, useCallback } from "react";
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
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import PhotoLightbox from "@/components/PhotoLightbox";

const photos = [
  { src: photo1, caption: "O'zbekiston — Argentina o'yinidan" },
  { src: stadium1, caption: "MetLife stadioni" },
  { src: hero1, caption: "Terma jamoa safga tizilmoqda" },
  { src: gallery1, caption: "Muxlislar bayramda" },
  { src: photo2, caption: "Stadion tayyorligi" },
  { src: footballer1, caption: "Shomurodov intervyuda" },
  { src: hero2, caption: "Goldan keyingi shodlik" },
  { src: gallery2, caption: "Kechki mashg'ulot" },
  { src: stadium2, caption: "Rose Bowl stadioni" },
  { src: gallery3, caption: "G'alaba kubogi" },
  { src: photo3, caption: "Muxlislar kutib olishi" },
  { src: gallery4, caption: "Zarba lahzasi" },
  { src: hero3, caption: "Yarim final lahzalari" },
  { src: footballer2, caption: "Xusanov mashg'ulotda" },
  { src: gallery5, caption: "O'yin yuqoridan" },
  { src: hero4, caption: "Muxlislar bayroqlari" },
  { src: gallery6, caption: "Jamoa ruhi" },
  { src: stadium3, caption: "AT&T stadioni" },
  { src: footballer3, caption: "Urunov o'yin oldidan" },
  { src: gallery7, caption: "Stadion quyosh botishida" },
  { src: photo4, caption: "Terma jamoa mashg'uloti" },
  { src: gallery8, caption: "Futbol to'pi" },
  { src: hero5, caption: "Volontyorlar tayyorlanmoqda" },
  { src: footballer4, caption: "Shukurov g'alabani nishonlamoqda" },
];

const PhotoFeed = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const columns: typeof photos[] = [[], [], [], []];
  photos.forEach((photo, i) => {
    columns[i % 4].push(photo);
  });

  const getFlatIndex = (colIdx: number, rowIdx: number) => rowIdx * 4 + colIdx;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const goNext = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)), []);

  useEffect(() => {
    const handler = (e: Event) => setLightboxIndex((e as CustomEvent).detail);
    window.addEventListener("lightbox-goto", handler);
    return () => window.removeEventListener("lightbox-goto", handler);
  }, []);

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Fotogalereya</span>
        <Link to="/photos" className="more-link">Barchasi →</Link>
      </div>

      <div className="flex gap-2.5">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-2.5">
            {col.map((photo, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setLightboxIndex(getFlatIndex(colIdx, i))}
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
                  <span className="text-[11px] font-medium text-white flex items-center gap-1.5 font-body mb-1">
                    <Camera size={11} /> {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
};

export default PhotoFeed;
