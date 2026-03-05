"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Share2, Play, Eye, ZoomIn, ZoomOut, X as XIcon } from "lucide-react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePost } from "@/hooks/queries/usePosts";
import { useVideos } from "@/hooks/queries";

const MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

type BodySegment =
  | { type: "html"; content: string }
  | { type: "telegram"; url: string }
  | { type: "x"; url: string };

function parseEmbeds(html: string): BodySegment[] {
  const pattern = /\[(telegram|x)-(https?:\/\/[^\]]+)\]/g;
  const parts: BodySegment[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(html)) !== null) {
    if (m.index > last) parts.push({ type: "html", content: html.slice(last, m.index) });
    parts.push({ type: m[1] as "telegram" | "x", url: m[2] });
    last = m.index + m[0].length;
  }
  if (last < html.length) parts.push({ type: "html", content: html.slice(last) });
  return parts.length ? parts : [{ type: "html", content: html }];
}

function TelegramEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const match = url.match(/https:\/\/t\.me\/([^/]+)\/(\d+)/);

  useEffect(() => {
    if (!match || !containerRef.current) return;
    const postPath = `${match[1]}/${match[2]}`;
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-post", postPath);
    script.setAttribute("data-width", "100%");
    script.async = true;
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (!match) return null;
  return <div ref={containerRef} className="my-4" />;
}

function XEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweetId = url.match(/\/status\/(\d+)/)?.[1];

  useEffect(() => {
    if (!tweetId || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    const observer = new MutationObserver(() => {
      while (container.children.length > 1) {
        container.removeChild(container.firstChild!);
      }
    });
    observer.observe(container, { childList: true });

    const embed = () => {
      if (!container.isConnected) return;
      (window as any).twttr?.widgets?.createTweet(tweetId, container, { align: "center" });
    };

    if ((window as any).twttr?.widgets) {
      embed();
    } else {
      const existing = document.querySelector('script[src*="platform.twitter.com/widgets.js"]');
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = embed;
        document.head.appendChild(script);
      } else {
        const timer = setInterval(() => {
          if ((window as any).twttr?.widgets) {
            clearInterval(timer);
            embed();
          }
        }, 50);
        return () => { observer.disconnect(); clearInterval(timer); container.innerHTML = ""; };
      }
    }

    return () => { observer.disconnect(); container.innerHTML = ""; };
  }, [tweetId]);

  if (!tweetId) return null;
  return <div ref={containerRef} className="my-4 flex justify-center" />;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

function extractIframe(html: string): {
  iframeSrc: string | null;
  cleanHtml: string;
} {
  // 1. Real <iframe> tag
  const iframeMatch = html.match(/<iframe[\s\S]*?<\/iframe>/i);
  if (iframeMatch) {
    const srcMatch = iframeMatch[0].match(/\bsrc=["']([^"']+)["']/i);
    if (srcMatch) {
      return {
        iframeSrc: srcMatch[1],
        cleanHtml: html.replace(iframeMatch[0], ""),
      };
    }
  }

  // 2. HTML-encoded &lt;iframe&gt;&lt;/iframe&gt; (inside <p> or anywhere)
  const encodedMatch = html.match(/&lt;iframe[\s\S]*?&gt;&lt;\/iframe&gt;/i);
  if (encodedMatch) {
    const srcMatch = encodedMatch[0].match(/\bsrc=["']([^"']+)["']/i);
    if (srcMatch) {
      const cleanHtml = html
        .replace(
          /<p[^>]*>\s*&lt;iframe[\s\S]*?&gt;&lt;\/iframe&gt;\s*<\/p>/i,
          "",
        )
        .replace(encodedMatch[0], "");
      return { iframeSrc: srcMatch[1], cleanHtml };
    }
  }

  return { iframeSrc: null, cleanHtml: html };
}

const VideoArticlePage = ({
  standings,
}: {
  standings: StandingsResponse | null;
}) => {
  const params = useParams();
  const slug = params.slug as string;
  const { data: post, isLoading, isError } = usePost(slug);
  const { data: videosData } = useVideos(1);
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption?: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);

  const openLightbox = useCallback((src: string, caption?: string) => {
    setImgLoaded(false);
    setLightbox({ src, caption });
    setZoom(1);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setZoom(1);
    setImgLoaded(false);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox]);

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
      "_blank",
    );
  };

  const handleTelegram = () => {
    const url = getUrl();
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post?.title ?? "")}`,
      "_blank",
    );
  };

  const handleX = () => {
    const url = getUrl();
    window.open(
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post?.title ?? "")}`,
      "_blank",
    );
  };

  const handleInstagram = async () => {
    const url = getUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title, url });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main skeleton */}
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
              {/* Header */}
              <div className="px-5 sm:px-7 pt-6 pb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-5 bg-muted rounded-full w-20" />
                  <div className="h-3 bg-muted rounded w-24" />
                </div>
                <div className="space-y-2.5 mb-3">
                  <div className="h-7 bg-muted rounded w-full" />
                  <div className="h-7 bg-muted rounded w-[82%]" />
                </div>
                <div className="h-4 bg-muted rounded w-[68%]" />
              </div>
              {/* Video player */}
              <div className="mx-5 sm:mx-7 mb-6">
                <div className="aspect-video bg-muted rounded-xl" />
              </div>
              {/* Body */}
              <div className="px-5 sm:px-7 pb-7">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-border">
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-7 h-7 bg-muted rounded-full" />
                    ))}
                    <div className="w-20 h-7 bg-muted rounded-full" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[100, 90, 100, 78, 55].map((w, i) => (
                    <div
                      key={i}
                      className="h-4 bg-muted rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-2/5 mb-4" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-[65%]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Video topilmadi</h1>
        <Link
          href="/videos"
          className="text-primary mt-4 inline-block hover:underline"
        >
          ← Videolar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const thumbnail =
    post.files?.thumbnails?.front?.src ?? post.files?.thumbnails?.normal?.src;
  const rawHtml = post.body ?? post.content ?? "";
  const { iframeSrc, cleanHtml } = extractIframe(rawHtml);
  const bodyHtml = cleanHtml || null;
  const relatedVideos = (videosData?.data ?? [])
    .filter((v) => v.slug !== slug)
    .slice(0, 6);

  return (
    <>
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <article className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 sm:px-7 pt-6 pb-5">
              <div className="flex items-center gap-3 mb-4">
                {/* {post.category?.title && (
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
                  >
                    {post.category.title}
                  </span>
                )} */}
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publish_time)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground mb-3">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-[90%]">
                  {post.description}
                </p>
              )}
            </div>

            {/* Video player */}
            <div className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden">
              {iframeSrc ? (
                <div className="aspect-video">
                  <iframe
                    src={iframeSrc}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={post.title}
                  />
                </div>
              ) : (
                <div
                  className="aspect-video bg-muted relative cursor-pointer group"
                  onClick={() => thumbnail && openLightbox(thumbnail, post.title)}
                >
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play
                        size={28}
                        className="text-primary-foreground ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 sm:px-7 pb-7">
              {/* Meta + share */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.viewed !== undefined
                      ? `${post.viewed.toLocaleString()} ko'rish`
                      : "Ko'rishlar"}
                  </span>
                  {/* <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">🎬 Video</span> */}
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Facebook */}
                  <button
                    onClick={handleFacebook}
                    title="Facebookda ulashish"
                    className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  {/* Telegram */}
                  <button
                    onClick={handleTelegram}
                    title="Telegramda ulashish"
                    className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-[#2CA5E0] hover:text-white hover:border-[#2CA5E0] transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </button>
                  {/* X */}
                  <button
                    onClick={handleX}
                    title="X da ulashish"
                    className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.75l7.732-8.843-8.164-10.657H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                    </svg>
                  </button>
                  {/* Instagram */}
                  <button
                    onClick={handleInstagram}
                    title="Instagramda ulashish"
                    className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </button>
                  {/* Copy link */}
                  <button
                    onClick={handleCopyLink}
                    className="h-7 px-2.5 rounded-full bg-muted/60 border border-border flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors text-[10px] font-semibold"
                  >
                    <Share2 className="w-3 h-3" />
                    {copied ? "✓ Nusxalandi" : "Ulashish"}
                  </button>
                </div>
              </div>
              {iframeSrc && thumbnail && (
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <div
                    className="aspect-[2/1] sm:aspect-[21/9] cursor-zoom-in"
                    onClick={() => openLightbox(thumbnail, post.title)}
                  >
                    <img
                      src={thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
                  </div>
                </div>
              )}

              {/* Body */}
              {bodyHtml ? (
                <>
                  {parseEmbeds(bodyHtml).map((seg, i) =>
                    seg.type === "telegram" ? (
                      <TelegramEmbed key={i} url={seg.url} />
                    ) : seg.type === "x" ? (
                      <XEmbed key={i} url={seg.url} />
                    ) : (
                      <div
                        key={i}
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: seg.content }}
                      />
                    )
                  )}
                </>
              ) : (
                post.description && (
                  <p className="text-[14px] sm:text-[15px] leading-[1.85] text-foreground/85">
                    {post.description}
                  </p>
                )
              )}
            </div>
          </article>

          {/* Related videos */}
          {relatedVideos.length > 0 && (
            <div className="mt-6">
              <div className="section-title">
                <span>Boshqa videolar</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedVideos.map((rv) => (
                  <Link
                    key={rv.id}
                    href={`/video/${rv.slug}`}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:bg-muted/40 transition-colors group"
                  >
                    <div className="aspect-video relative bg-muted">
                      {rv.files?.thumbnails?.normal?.src && (
                        <img
                          src={rv.files.thumbnails.normal.src}
                          loading="lazy"
                          alt={rv.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play
                            size={14}
                            className="text-primary-foreground ml-0.5"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-[13px] font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {rv.title}
                      </h4>
                      {/* {rv.category?.title && (
                        <p className="text-[11px] text-muted-foreground mt-1">{rv.category.title}</p>
                      )} */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto scrollbar-thin space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>

    {lightbox && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.94)" }}
          onClick={closeLightbox}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2 z-[10]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white/70 text-xs font-mono min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button onClick={closeLightbox} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-2">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="relative z-[5] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {!imgLoaded && (
              <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-white/5 backdrop-blur-md rounded-lg animate-pulse" />
              </div>
            )}
            <img
              src={lightbox.src}
              loading="lazy"
              alt={lightbox.caption || ""}
              className="max-w-[85vw] max-h-[80vh] rounded-lg transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoom})` }}
              draggable={false}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
          {lightbox.caption && (
            <div className="fixed bottom-8 left-0 right-0 flex justify-center z-[10] pointer-events-none">
              <span className="text-white/80 text-sm bg-black/50 backdrop-blur-sm px-5 py-2 rounded-full text-center max-w-[80vw]">
                📸 {lightbox.caption}
              </span>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default VideoArticlePage;
