"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Camera, Loader2 } from "lucide-react";
import Link from "next/link";
import PhotoLightbox from "@/components/PhotoLightbox";
import type { PhotosResponse } from "@/hooks/queries/usePhotos";

async function fetchPhotos(): Promise<PhotosResponse> {
  const res = await fetch(
    "https://api.uza.uz/api/v1/photo-bank?category_id=48&per_page=24&sort=-photo_bank.id%20&_f=json&_l=oz&page=1"
  );
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

const PhotoFeed = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos-feed"],
    queryFn: fetchPhotos,
  });

  const photos =
    data?.data.map((item) => ({
      src: item.files.thumbnails.normal.src,
      caption: item.files.description,
    })) ?? [];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  useEffect(() => {
    const handler = (e: Event) => setLightboxIndex((e as CustomEvent).detail);
    window.addEventListener("lightbox-goto", handler);
    return () => window.removeEventListener("lightbox-goto", handler);
  }, []);

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Fotogalereya</span>
        <Link href="/photos" className="more-link">
          Barchasi →
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-muted-foreground text-[13px]">
          Xatolik yuz berdi.
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2.5">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-2.5 relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={photo.src}
                loading="lazy"
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
                className="w-full bg-muted items-center justify-center text-muted-foreground flex-col gap-1 text-[11px]"
                style={{ display: "none", aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3" }}
              >
                <Camera size={16} className="opacity-40" />
                <span className="opacity-40">Surat yo'q</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <span className="text-[11px] font-medium text-white flex items-center gap-1.5 font-body mb-1">
                  <Camera size={11} /> {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

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
