"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Play, Pause, Maximize2 } from "lucide-react";

export type LightboxPhoto = { src: string; caption: string };

const PhotoLightbox = ({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    setZoom(1);
    setImgLoaded(false);
    setImgError(false);
    // Check if image is already cached by the browser
    const t = setTimeout(() => {
      if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
        setImgLoaded(true);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [index]);

  // Auto-scroll thumbnail strip to keep active thumb visible
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => onNext(), 3000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, onNext]);

  const zoomIn = () => setZoom((z) => Math.min(3, z + 0.5));
  const zoomOut = () => setZoom((z) => Math.max(0.5, z - 0.5));
  const resetZoom = () => setZoom(1);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) { await containerRef.current.requestFullscreen(); setIsFullscreen(true); }
      else { await document.exitFullscreen(); setIsFullscreen(false); }
    } catch { /* fullscreen not supported */ }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

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
    <div ref={containerRef} style={{ position: "fixed", inset: 0, zIndex: 99999 }} className="flex flex-col bg-black">
      <div className="absolute inset-0 bg-black/95" onClick={onClose} />

      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3">
        <span className="text-white/60 text-sm font-body">{index + 1} / {photos.length}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPlaying(!playing)} className={controlBtn}>{playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}</button>
          <button onClick={zoomOut} className={controlBtn} disabled={zoom <= 0.5}><ZoomOut size={16} /></button>
          <button onClick={resetZoom} className="text-white/60 text-xs font-mono min-w-[40px] text-center hover:text-white transition-colors">{Math.round(zoom * 100)}%</button>
          <button onClick={zoomIn} className={controlBtn} disabled={zoom >= 3}><ZoomIn size={16} /></button>
          <button onClick={toggleFullscreen} className={controlBtn}><Maximize2 size={15} /></button>
          <button onClick={onClose} className={`${controlBtn} ml-1`}><X size={18} /></button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-16 overflow-hidden" onClick={onClose}>
        <button onClick={(e) => { e.stopPropagation(); setPlaying(false); onPrev(); }} className="absolute left-3 sm:left-5 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
          <ChevronLeft size={22} />
        </button>

        <div className="relative flex items-center justify-center" onClick={(e) => e.stopPropagation()} style={{ animation: "lightbox-fade-in 0.25s ease-out" }}>
          {!imgLoaded && !imgError && (
            <div className="flex items-center justify-center w-[85vw] max-w-[600px] h-[50vh]">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
            </div>
          )}
          {imgError && (
            <div className="flex flex-col items-center justify-center w-[85vw] max-w-[600px] h-[50vh] gap-3 text-white/40">
              <Camera size={48} />
              <span className="text-sm font-body">Surat yo'q</span>
            </div>
          )}
          <img
            ref={imgRef}
            key={index}
            src={photo.src}
            alt={photo.caption}
            className="max-w-[85vw] max-h-[72vh] rounded-lg transition-transform duration-200 ease-out select-none"
            style={{ transform: `scale(${zoom})`, opacity: imgLoaded && !imgError ? 1 : 0, position: imgError ? "absolute" : "relative" }}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true); }}
            draggable={false}
          />
        </div>

        <button onClick={(e) => { e.stopPropagation(); setPlaying(false); onNext(); }} className="absolute right-3 sm:right-5 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="relative z-10 px-4 sm:px-6 pb-4 pt-2">
        {playing && <div className="w-full max-w-md mx-auto mb-3 h-0.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-white/60 rounded-full" style={{ animation: "slideshow-progress 3s linear infinite" }} /></div>}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-white text-sm font-medium font-body flex items-center gap-2"><Camera size={14} className="text-white/60" />{photo.caption}</p>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-3 overflow-x-auto max-w-full pb-1">
          {photos.map((p, i) => (
            <button key={i} ref={i === index ? activeThumbRef : undefined} onClick={() => setPlaying(false)} onClickCapture={() => { const event = new CustomEvent("lightbox-goto", { detail: i }); window.dispatchEvent(event); }}
              className={`mt-1 w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all duration-200 bg-white/10 ${i === index ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}>
              <img
                src={p.src}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const placeholder = target.nextElementSibling as HTMLElement | null;
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
              <span className="w-full h-full items-center justify-center text-white/40 text-[8px]" style={{ display: "none" }}>
                <Camera size={12} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lightbox-fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideshow-progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>,
    document.body
  );
};

export default PhotoLightbox;
