"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, MessageCircle, Eye } from "lucide-react";
import NewsFeed from "@/components/NewsFeed";
import HeroFootballers from "@/components/HeroFootballers";
import SidebarArticles from "@/components/SidebarArticles";
import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, ZoomOut, X as XIcon } from "lucide-react";
import { usePost } from "@/hooks/queries/usePosts";

const MONTHS = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];

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
  const { data: post, isLoading, isError } = usePost(slug);

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
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 animate-pulse space-y-4">
            <div className="bg-card rounded-2xl p-7 space-y-4">
              <div className="h-4 bg-muted rounded w-1/5" />
              <div className="h-8 bg-muted rounded w-full" />
              <div className="h-8 bg-muted rounded w-4/5" />
              <div className="aspect-[2/1] bg-muted rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <div className="bg-card rounded-2xl h-64 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Maqola topilmadi</h1>
        <Link href="/" className="text-primary mt-4 inline-block hover:underline">← Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  const heroImage = post.files?.thumbnails?.front?.src ?? post.files?.thumbnails?.normal?.src;
  const bodyHtml = post.body ?? post.content;

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
                  {post.category?.title && (
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
                      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
                    >
                      {post.category.title}
                    </span>
                  )}
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{formatDate(post.publish_time)}
                  </span>
                  {bodyHtml && (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />{formatReadTime(bodyHtml)}
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
              {heroImage && (
                <div
                  className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden cursor-zoom-in"
                  onClick={() => openLightbox(heroImage, post.title)}
                >
                  <div className="aspect-[2/1] sm:aspect-[21/9]">
                    <img
                      src={heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
                </div>
              )}

              <div className="px-5 sm:px-7 pb-7">
                {/* Meta + share row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.viewed !== undefined ? `${post.viewed.toLocaleString()} ko'rish` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Facebook className="w-3 h-3" />
                    </button>
                    <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Twitter className="w-3 h-3" />
                    </button>
                    <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <MessageCircle className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="h-7 px-2.5 rounded-full bg-muted/60 border border-border flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors text-[10px] font-semibold"
                    >
                      <Share2 className="w-3 h-3" />
                      {copied ? "✓" : "Ulashish"}
                    </button>
                  </div>
                </div>

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
              <div className="text-[10px] uppercase font-heading font-bold tracking-wider opacity-80 mb-1">Reklama</div>
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
      {lightbox && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.94)" }}
          onClick={closeLightbox}
        >
          <div
            className="absolute top-4 right-4 flex items-center gap-2 z-[10]"
            onClick={(e) => e.stopPropagation()}
          >
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

export default ArticlePage;
