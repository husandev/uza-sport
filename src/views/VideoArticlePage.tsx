"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Share2, Facebook, Twitter, MessageCircle, Play, Eye } from "lucide-react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { useState } from "react";
import { usePost } from "@/hooks/queries/usePosts";
import { useVideos } from "@/hooks/queries";

const MONTHS = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

function decodeEncodedIframes(html: string): string {
  // <pre><code>&lt;iframe ...&gt;&lt;/iframe&gt;</code></pre> → responsive iframe wrapper
  return html.replace(
    /<pre[^>]*>\s*<code[^>]*>\s*&lt;iframe\s([^<]*?)(?:allowfullscreen)?[^<]*?&gt;[\s\S]*?<\/pre>/gi,
    (_, attrs) =>
      `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5rem 0">` +
      `<iframe ${attrs.trim()} allowfullscreen ` +
      `style="position:absolute;top:0;left:0;width:100%;height:100%;border:0">` +
      `</iframe></div>`
  );
}

function extractIframe(html: string): { iframeSrc: string | null; cleanHtml: string } {
  // 1. Oddiy <iframe src="..."> tag
  const directMatch = html.match(/<iframe[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/i);
  if (directMatch) {
    const rest = html.replace(directMatch[0], "");
    return { iframeSrc: directMatch[1], cleanHtml: decodeEncodedIframes(rest) };
  }

  // 2. HTML-encoded &lt;iframe&gt; — API <pre><code> ichida encode qilib yuborsa
  const encodedMatch = html.match(/&lt;iframe\b[^<]*?src=["']([^"']+)["'][^<]*?&gt;/i);
  if (encodedMatch) {
    // Birinchi <pre> blokni olib tashla, qolganlarini decode qil
    const afterFirst = html.replace(/<pre[^>]*>[\s\S]*?&lt;iframe[\s\S]*?<\/pre>/i, "");
    return { iframeSrc: encodedMatch[1], cleanHtml: decodeEncodedIframes(afterFirst) };
  }

  return { iframeSrc: null, cleanHtml: decodeEncodedIframes(html) };
}

const VideoArticlePage = ({ standings }: { standings: StandingsResponse | null }) => {
  const params = useParams();
  const slug = params.slug as string;
  const { data: post, isLoading, isError } = usePost(slug);
  const { data: videosData } = useVideos(1);
  const [copied, setCopied] = useState(false);

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
              <div className="aspect-video bg-muted rounded-xl" />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-card rounded-2xl h-64 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Video topilmadi</h1>
        <Link href="/videos" className="text-primary mt-4 inline-block hover:underline">← Videolar ro'yxatiga qaytish</Link>
      </div>
    );
  }

  const thumbnail = post.files?.thumbnails?.front?.src ?? post.files?.thumbnails?.normal?.src;
  const rawHtml = post.body ?? post.content ?? "";
  const { iframeSrc, cleanHtml } = extractIframe(rawHtml);
  const bodyHtml = cleanHtml || null;
  const relatedVideos = (videosData?.data ?? []).filter((v) => v.slug !== slug).slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <article className="bg-card rounded-2xl border border-border overflow-hidden">
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
                <div className="aspect-video bg-muted relative cursor-pointer group">
                  {thumbnail && (
                    <img src={thumbnail} alt={post.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
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
                    {post.viewed !== undefined ? `${post.viewed.toLocaleString()} ko'rish` : "Ko'rishlar"}
                  </span>
                  {/* <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">🎬 Video</span> */}
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

              {/* Body */}
              {bodyHtml ? (
                <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
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
              <div className="section-title"><span>Boshqa videolar</span></div>
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
                          <Play size={14} className="text-primary-foreground ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-[13px] font-bold group-hover:text-primary transition-colors line-clamp-2">{rv.title}</h4>
                      {rv.category?.title && (
                        <p className="text-[11px] text-muted-foreground mt-1">{rv.category.title}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default VideoArticlePage;
