"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Share2,
  Eye,
  ImageOff,
  ZoomIn,
  ZoomOut,
  X as XIcon,
} from "lucide-react";
import NewsFeed from "@/components/NewsFeed";
import HeroFootballers from "@/components/HeroFootballers";
import SidebarArticles from "@/components/SidebarArticles";
import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePost } from "@/hooks/queries/usePosts";

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

function extractIframe(html: string): { iframeSrc: string | null; cleanHtml: string } {
  // Case 1: real <iframe> tag
  const iframeMatch = html.match(/<iframe[\s\S]*?<\/iframe>/i);
  if (iframeMatch) {
    const srcMatch = iframeMatch[0].match(/\bsrc=["']([^"']+)["']/i);
    if (srcMatch) {
      return { iframeSrc: srcMatch[1], cleanHtml: html.replace(iframeMatch[0], "") };
    }
  }

  // Case 2: HTML-encoded &lt;iframe&gt;&lt;/iframe&gt; (API ba'zan shunday qaytaradi)
  const encodedMatch = html.match(/&lt;iframe[\s\S]*?&gt;&lt;\/iframe&gt;/i);
  if (encodedMatch) {
    const srcMatch = encodedMatch[0].match(/\bsrc=["']([^"']+)["']/i);
    if (srcMatch) {
      // <p> ichida turgan bo'lsa, butun <p> ni olib tashlash
      const cleanHtml = html.replace(/<p[^>]*>\s*&lt;iframe[\s\S]*?&gt;&lt;\/iframe&gt;\s*<\/p>/i, "")
        .replace(encodedMatch[0], "");
      return { iframeSrc: srcMatch[1], cleanHtml };
    }
  }

  return { iframeSrc: null, cleanHtml: html };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

function formatReadTime(body?: string) {
  if (!body) return "3 daqiqa";
  const words = body.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} daqiqa`;
}

const ArticlePage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { data: post, isLoading, isError } = usePost(slug, "tags");

  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption?: string;
  } | null>(null);
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
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
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
              {/* Back link */}
              <div className="px-5 sm:px-7 pt-5 pb-2">
                <div className="h-3 bg-muted rounded w-20" />
              </div>
              {/* Header area */}
              <div className="px-5 sm:px-7 pt-4 pb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-5 bg-muted rounded-full w-20" />
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="h-3 bg-muted rounded w-16" />
                </div>
                <div className="space-y-2.5 mb-4">
                  <div className="h-7 bg-muted rounded w-full" />
                  <div className="h-7 bg-muted rounded w-[88%]" />
                  <div className="h-7 bg-muted rounded w-[72%]" />
                </div>
                <div className="h-4 bg-muted rounded w-[78%]" />
              </div>
              {/* Hero image */}
              <div className="mx-5 sm:mx-7 mb-6">
                <div className="aspect-[2/1] sm:aspect-[21/9] bg-muted rounded-xl" />
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
                <div className="space-y-4">
                  {[100, 88, 100, 75, 100, 92, 60].map((w, i) => (
                    <div
                      key={i}
                      className="h-4 bg-muted rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                  <div className="my-2" />
                  {[100, 85, 100, 70].map((w, i) => (
                    <div
                      key={i + 10}
                      className="h-4 bg-muted rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-2/5 mb-4" />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-16 h-14 bg-muted rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-1.5 pt-0.5">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-[70%]" />
                      <div className="h-3 bg-muted rounded w-[45%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border h-28 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Maqola topilmadi</h1>
        <Link
          href="/"
          className="text-primary mt-4 inline-block hover:underline"
        >
          ← Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  const heroImage =
    post.files?.thumbnails?.front?.src ?? post.files?.thumbnails?.normal?.src;
  const rawHtml = post.body ?? post.content ?? "";
  const { iframeSrc, cleanHtml } = extractIframe(rawHtml);
  const bodyHtml = cleanHtml || null;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Article */}
          <div className="lg:col-span-8">
            <article className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Category + Title */}
              <div className="px-5 sm:px-7 pt-6 pb-5">
                <div className="flex items-center gap-3 mb-4">
                  {post.tags?.[0] && (
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      }}
                    >
                      {post.tags[0].title}
                    </span>
                  )}
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.publish_time)}
                  </span>
                  {bodyHtml && (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatReadTime(bodyHtml)}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground mb-4">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-[90%]">
                    {post.description}
                  </p>
                )}
              </div>

              {/* Hero image */}
              <div className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden">
                {heroImage ? (
                  <div
                    className="aspect-[2/1] sm:aspect-[21/9] cursor-zoom-in"
                    onClick={() => openLightbox(heroImage, post.title)}
                  >
                    <img
                      src={heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
                  </div>
                ) : (
                  <div className="aspect-[2/1] sm:aspect-[21/9] bg-muted flex flex-col items-center justify-center gap-2">
                    <ImageOff size={32} className="text-muted-foreground/25" />
                    <span className="text-[12px] text-muted-foreground/40 font-medium">
                      Rasm yo'q
                    </span>
                  </div>
                )}
              </div>

              {/* Iframe video player */}

              <div className="px-5 sm:px-7 pb-7">
                {/* Meta + share row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.viewed !== undefined
                        ? `${post.viewed.toLocaleString()} ko'rish`
                        : ""}
                    </span>
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
                      className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:via-[#dc2743] hover:via-[#cc2366] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-colors"
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
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
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
                {iframeSrc && (
                  <div className="mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={iframeSrc}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title={post.title}
                      />
                    </div>
                  </div>
                )}
                {/* Article body */}
                {bodyHtml ? (
                  <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                  />
                ) : (
                  post.description && (
                    <p className="text-[14px] sm:text-[15px] leading-[1.85] text-foreground/85">
                      {post.description}
                    </p>
                  )
                )}
              </div>
            </article>

            {/* Related Posts */}
            <div className="mt-6">
              <SidebarArticles title="O'xshash maqolalar" />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <NewsFeed />
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-primary p-6 py-8 text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              <div className="text-[10px] uppercase font-heading font-bold tracking-wider opacity-80 mb-1">
                Reklama
              </div>
              <h3 className="font-heading font-extrabold text-base leading-tight mb-2">
                🏆 Superliga 2026 — yangi mavsum!
              </h3>
              <p className="text-[12px] font-body opacity-80 mb-3">
                O'zbekiston Superligasi o'yinlarini jonli tomosha qiling
              </p>
              <div className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-[12px] font-bold font-heading text-center py-2 rounded-lg">
                Batafsil →
              </div>
            </div>
            <HeroFootballers />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.94)",
            }}
            onClick={closeLightbox}
          >
            <div
              className="absolute top-4 right-4 flex items-center gap-2 z-[10]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white/70 text-xs font-mono min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-2"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative z-[5] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
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
          document.body,
        )}
    </>
  );
};

export default ArticlePage;
