"use client";
import { useState, useEffect, useCallback } from "react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
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
import PhotoLightbox from "@/components/PhotoLightbox";

const photos = [
  { src: photo1.src, caption: "O'zbekiston — Argentina o'yinidan" },
  { src: stadium1.src, caption: "MetLife stadioni" },
  { src: hero1.src, caption: "Terma jamoa safga tizilmoqda" },
  { src: gallery1.src, caption: "Muxlislar bayramda" },
  { src: photo2.src, caption: "Stadion tayyorligi" },
  { src: footballer1.src, caption: "Shomurodov intervyuda" },
  { src: hero2.src, caption: "Goldan keyingi shodlik" },
  { src: gallery2.src, caption: "Kechki mashg'ulot" },
  { src: stadium2.src, caption: "Rose Bowl stadioni" },
  { src: gallery3.src, caption: "G'alaba kubogi" },
  { src: photo3.src, caption: "Muxlislar kutib olishi" },
  { src: gallery4.src, caption: "Zarba lahzasi" },
  { src: hero3.src, caption: "Yarim final lahzalari" },
  { src: footballer2.src, caption: "Xusanov mashg'ulotda" },
  { src: gallery5.src, caption: "O'yin yuqoridan" },
  { src: hero4.src, caption: "Muxlislar bayroqlari" },
  { src: gallery6.src, caption: "Jamoa ruhi" },
  { src: stadium3.src, caption: "AT&T stadioni" },
  { src: footballer3.src, caption: "Urunov o'yin oldidan" },
  { src: gallery7.src, caption: "Stadion quyosh botishida" },
  { src: photo4.src, caption: "Terma jamoa mashg'uloti" },
  { src: gallery8.src, caption: "Futbol to'pi" },
  { src: hero5.src, caption: "Volontyorlar tayyorlanmoqda" },
  { src: footballer4.src, caption: "Shukurov g'alabani nishonlamoqda" },
];

const PER_PAGE = 24;

const PhotosPage = () => {
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const totalPages = Math.ceil(photos.length / PER_PAGE);
  const paginated = photos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const columns: typeof photos[] = [[], [], [], []];
  paginated.forEach((photo, i) => {
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
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title"><span>Fotogalereya — JCh 2026</span></div>
      </div>

      <div className="bg-card rounded-2xl px-4 pt-2 pb-6 shadow-sm">
        <div className="flex gap-3">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3">
              {col.map((photo, rowIdx) => (
                <div key={rowIdx} className="relative rounded-xl overflow-hidden cursor-pointer group" onClick={() => setLightboxIndex(getFlatIndex(colIdx, rowIdx))}>
                  <img src={photo.src} alt={photo.caption} className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ aspectRatio: (colIdx + rowIdx) % 3 === 0 ? "3/4" : (colIdx + rowIdx) % 3 === 1 ? "1/1" : "4/3" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="text-[12px] font-medium text-white flex items-center gap-1.5 font-body"><Camera size={12} /> {photo.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={16} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-colors ${p === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{p}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronRight size={16} /></button>
        </div>
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox photos={photos} index={lightboxIndex} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} />
      )}
    </div>
  );
};

export default PhotosPage;
