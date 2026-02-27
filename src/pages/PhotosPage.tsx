import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Play, Pause, Maximize2 } from "lucide-react";
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

const PER_PAGE = 24;

/* ─── Lightbox Component ─── */
const PhotoLightbox = ({
  index,
  onClose,
  onPrev,
  onNext,
  total,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  total: number;
}) => {
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const photo = photos[index];

  // Reset zoom & loaded on photo change
  useEffect(() => {
    setZoom(1);
    setImgLoaded(false);
  }, [index]);

  // Slideshow
  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        onNext();
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, onNext]);

  const zoomIn = () => setZoom((z) => Math.min(3, z + 0.5));
  const zoomOut = () => setZoom((z) => Math.max(0.5, z - 0.5));
  const resetZoom = () => setZoom(1);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log("Fullscreen not supported");
    }
  }, []);

  // Listen for fullscreen change
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) onClose();
      if (e.key === "ArrowLeft") { setPlaying(false); onPrev(); }
      if (e.key === "ArrowRight") { setPlaying(false); onNext(); }
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(0.5, z - 0.25));
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, toggleFullscreen]);
  const controlBtn = "w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors";

  return createPortal(
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: 99999 }}
      className="flex flex-col bg-black"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" onClick={onClose} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm font-body">
            {index + 1} / {total}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Play / Pause */}
          <button onClick={() => setPlaying(!playing)} className={controlBtn} title={playing ? "To'xtatish" : "Slaydshow"}>
            {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          {/* Zoom out */}
          <button onClick={zoomOut} className={controlBtn} title="Kichiklashtirish" disabled={zoom <= 0.5}>
            <ZoomOut size={16} />
          </button>
          {/* Zoom level */}
          <button onClick={resetZoom} className="text-white/60 text-xs font-mono min-w-[40px] text-center hover:text-white transition-colors" title="Asl o'lcham">
            {Math.round(zoom * 100)}%
          </button>
          {/* Zoom in */}
          <button onClick={zoomIn} className={controlBtn} title="Kattalashtirish" disabled={zoom >= 3}>
            <ZoomIn size={16} />
          </button>
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className={controlBtn} title={isFullscreen ? "Fullscreendan chiqish" : "Fullscreen"}>
            <Maximize2 size={15} />
          </button>
          {/* Close */}
          <button onClick={onClose} className={`${controlBtn} ml-1`} title="Yopish">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-16 overflow-hidden" onClick={onClose}>
        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); setPlaying(false); onPrev(); }}
          className="absolute left-3 sm:left-5 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Image */}
        <div
          className="relative flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: "lightbox-fade-in 0.25s ease-out" }}
        >
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
            </div>
          )}
          <img
            key={index}
            src={photo.src}
            alt={photo.caption}
            className="max-w-[85vw] max-h-[72vh] rounded-lg transition-transform duration-200 ease-out select-none"
            style={{ transform: `scale(${zoom})`, opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
            draggable={false}
          />
        </div>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); setPlaying(false); onNext(); }}
          className="absolute right-3 sm:right-5 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Bottom: caption + likes + progress */}
      <div className="relative z-10 px-4 sm:px-6 pb-4 pt-2">
        {/* Slideshow progress bar */}
        {playing && (
          <div className="w-full max-w-md mx-auto mb-3 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/60 rounded-full"
              style={{
                animation: "slideshow-progress 3s linear infinite",
              }}
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-1.5">
          <p className="text-white text-sm font-medium font-body flex items-center gap-2">
            <Camera size={14} className="text-white/60" />
            {photo.caption}
          </p>
        </div>

        {/* Thumbnail strip */}
        <div className="flex items-center justify-center gap-1.5 mt-3 overflow-x-auto max-w-full pb-1">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => { setPlaying(false); }}
              className={`w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                i === index ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-80"
              }`}
              // We use a wrapper click that also changes the index
              onClickCapture={() => {
                // This triggers re-render with new index via parent
                const event = new CustomEvent("lightbox-goto", { detail: i });
                window.dispatchEvent(event);
              }}
            >
              <img src={p.src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes lightbox-fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideshow-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>,
    document.body
  );
};

/* ─── Photos Page ─── */
const PhotosPage = () => {
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const totalPages = Math.ceil(photos.length / PER_PAGE);
  const paginated = photos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const columns: typeof photos[] = [[], [], [], []];
  paginated.forEach((photo, i) => {
    columns[i % 4].push(photo);
  });

  // Map column+row index back to flat index
  const getFlatIndex = (colIdx: number, rowIdx: number) => {
    return rowIdx * 4 + colIdx;
  };

  const openLightbox = (flatIdx: number) => {
    setLightboxIndex(flatIdx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const goNext = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)), []);

  // Listen for thumbnail goto events
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      setLightboxIndex(idx);
    };
    window.addEventListener("lightbox-goto", handler);
    return () => window.removeEventListener("lightbox-goto", handler);
  }, []);

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
              {col.map((photo, rowIdx) => (
                <div
                  key={rowIdx}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(getFlatIndex(colIdx, rowIdx))}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                      aspectRatio:
                        (colIdx + rowIdx) % 3 === 0
                          ? "3/4"
                          : (colIdx + rowIdx) % 3 === 1
                          ? "1/1"
                          : "4/3",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="text-[12px] font-medium text-white flex items-center gap-1.5 font-body">
                      <Camera size={12} /> {photo.caption}
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          total={photos.length}
        />
      )}
    </div>
  );
};

export default PhotosPage;
