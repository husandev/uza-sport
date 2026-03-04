"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { usePhotos } from "@/hooks/queries";
import PhotoLightbox from "@/components/PhotoLightbox";

type Photo = { src: string; caption: string };

const PhotosPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = usePhotos();

  const photos =
    data?.pages.flatMap((page) =>
      page.data.map((item) => ({
        src: item.files.thumbnails.normal.src,
        caption: item.files.description,
      }))
    ) ?? [];

  const openLightbox = useCallback(
    (flatIdx: number) => {
      const pages = data?.pages ?? [];
      let accumulated = 0;
      for (let p = 0; p < pages.length; p++) {
        const pagePhotos = pages[p].data.map((item) => ({
          src: item.files.thumbnails.normal.src,
          caption: item.files.description,
        }));
        if (flatIdx < accumulated + pagePhotos.length) {
          setLightboxPhotos(pagePhotos);
          setLightboxIndex(flatIdx - accumulated);
          return;
        }
        accumulated += pagePhotos.length;
      }
    },
    [data]
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const handler = (e: Event) => setLightboxIndex((e as CustomEvent).detail);
    window.addEventListener("lightbox-goto", handler);
    return () => window.removeEventListener("lightbox-goto", handler);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + lightboxPhotos.length) % lightboxPhotos.length : null)),
    [lightboxPhotos.length]
  );
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % lightboxPhotos.length : null)),
    [lightboxPhotos.length]
  );

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Fotogalereya — JCh 2026</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-muted-foreground">
          Xatolik yuz berdi. Qayta urinib ko'ring.
        </div>
      ) : (
        <>
          <div className="bg-card rounded-2xl px-4 pt-2 pb-6 shadow-sm">
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-3 relative rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3" }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const placeholder = target.nextElementSibling as HTMLElement | null;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full bg-muted items-center justify-center text-muted-foreground flex-col gap-2 text-[12px]"
                    style={{ display: "none", aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3" }}
                  >
                    <Camera size={20} className="opacity-40" />
                    <span className="opacity-40">Surat yo'q</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="text-[12px] font-medium text-white flex items-center gap-1.5 font-body">
                      <Camera size={12} /> {photo.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={sentinelRef} className="h-8" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin text-primary" size={24} />
            </div>
          )}
        </>
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={lightboxPhotos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
};

export default PhotosPage;
