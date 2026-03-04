"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Shirt, Target, ArrowRight, Calendar, Award, Flag } from "lucide-react";
import NewsFeed from "@/components/NewsFeed";
import { useAthleteBySlug, useAthletes } from "@/hooks/queries";
import { formatMatchDate } from "@/lib/utils";

function decodeEncodedIframes(html: string): string {
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
  const directMatch = html.match(/<iframe[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/i);
  if (directMatch) {
    const rest = html.replace(directMatch[0], "");
    return { iframeSrc: directMatch[1], cleanHtml: decodeEncodedIframes(rest) };
  }
  const encodedMatch = html.match(/&lt;iframe\b[^<]*?src=["']([^"']+)["'][^<]*?&gt;/i);
  if (encodedMatch) {
    const afterFirst = html.replace(/<pre[^>]*>[\s\S]*?&lt;iframe[\s\S]*?<\/pre>/i, "");
    return { iframeSrc: encodedMatch[1], cleanHtml: decodeEncodedIframes(afterFirst) };
  }
  return { iframeSrc: null, cleanHtml: decodeEncodedIframes(html) };
}

const FootballerPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { data: athlete, isLoading, isError } = useAthleteBySlug(slug);
  const { data: athletesData } = useAthletes();
  const otherPlayers = (athletesData?.data ?? []).filter((p) => p.slug !== slug).slice(0, 8);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="bg-card rounded-2xl border border-border h-[600px] animate-pulse" />
      </div>
    );
  }

  if (isError || !athlete) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="bg-card rounded-2xl border border-border p-8 text-center text-muted-foreground">
          Sportchi topilmadi
        </div>
      </div>
    );
  }

  const portrait = athlete.file?.thumbnails?.normal?.src ?? "";
  const { iframeSrc, cleanHtml } = extractIframe(athlete.biography ?? "");

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Back link */}
              <div className="px-5 sm:px-7 pt-5 pb-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary transition-colors font-body"
                >
                  <ArrowLeft size={14} /> Bosh sahifa
                </Link>
              </div>

              {/* Creative split: image left, info right */}
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Left: Portrait */}
                <div className="sm:w-[45%] relative">
                  <div className="aspect-[3/4] sm:aspect-auto sm:h-full relative overflow-hidden">
                    {portrait && (
                      <img
                        src={portrait}
                        alt={athlete.name}
                        className="w-full h-full object-cover"
                        style={{ minHeight: "460px" }}
                      />
                    )}
                    {/* Subtle gradient on right edge for blending */}
                    <div
                      className="absolute inset-0 hidden sm:block pointer-events-none"
                      style={{
                        background: "linear-gradient(to right, transparent 70%, hsl(var(--card)) 100%)",
                      }}
                    />
                    {/* Bottom gradient for mobile */}
                    <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Decorative number watermark */}
                    <div
                      className="absolute -left-2 bottom-[-10px] font-heading font-black text-white/[0.08] select-none pointer-events-none"
                      style={{ fontSize: "clamp(140px, 20vw, 220px)", lineHeight: 1 }}
                    >
                      {athlete.number}
                    </div>
                  </div>
                </div>

                {/* Right: Player info */}
                <div className="sm:w-[55%] flex flex-col justify-center px-5 sm:px-7 py-6 sm:py-8">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
                      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
                    >
                      {athlete.position}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-body">
                      <Shirt className="w-3 h-3" /> #{athlete.number}
                    </span>
                  </div>

                  {/* Name */}
                  <h1 className="text-3xl sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground mb-1">
                    {athlete.name}
                  </h1>
                  <p className="text-[13px] text-muted-foreground font-body mb-5">{athlete.full_name}</p>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: <Calendar size={13} />, label: "Tug'ilgan sana", value: athlete.birth_date ? formatMatchDate(athlete.birth_date) : "—" },
                      { icon: <MapPin size={13} />, label: "Tug'ilgan joy", value: athlete.birth_place },
                      { icon: <Flag size={13} />, label: "Joriy klub", value: athlete.current_club },
                      { icon: <Award size={13} />, label: "Bo'y", value: athlete.height },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/50 rounded-xl px-3 py-2.5 border border-border">
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                          {item.icon}
                          <span className="text-[10px] font-body uppercase tracking-wider">{item.label}</span>
                        </div>
                        <p className="text-[13px] font-heading font-bold text-foreground leading-tight">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* International stats */}
                  <div className="flex gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">⚽</span>
                      </div>
                      <div>
                        <div className="text-[20px] font-heading font-extrabold text-primary leading-none">{athlete.national_team_goals}</div>
                        <div className="text-[10px] text-muted-foreground font-body">Terma jamoa gollari</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">🏟️</span>
                      </div>
                      <div>
                        <div className="text-[20px] font-heading font-extrabold text-primary leading-none">{athlete.games_count}</div>
                        <div className="text-[10px] text-muted-foreground font-body">O'yinlar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio section — full width below */}
              <div className="px-6 sm:px-8 py-8 border-t border-border">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-1 h-6 rounded-full bg-primary" />
                  <h2 className="text-[20px] font-heading font-extrabold text-foreground">
                    Biografiya
                  </h2>
                </div>

                {/* YouTube iframe */}
                {iframeSrc && (
                  <div className="relative mb-6 rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={iframeSrc}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title={athlete.name}
                      />
                    </div>
                  </div>
                )}

                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                />
              </div>
            </article>

            {/* Other players section */}
            {otherPlayers.length > 0 && (
              <div className="mt-6 bg-card rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 pt-2 pb-2">
                  <div className="section-title">
                    <span>Boshqa sportchilar</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 pb-5">
                  {otherPlayers.map((p) => (
                    <Link
                      key={p.id}
                      href={`/footballer/${p.slug}`}
                      className="group rounded-xl overflow-hidden border border-border bg-background hover:border-primary transition-colors"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        {p.file?.thumbnails?.normal?.src && (
                          <img
                            src={p.file.thumbnails.normal.src}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <div className="text-highlight text-[9px] font-bold font-body uppercase tracking-wider">{p.current_club}</div>
                          <h3 className="text-white font-heading font-bold text-[13px] leading-tight mt-0.5">
                            {p.name}
                          </h3>
                        </div>
                        <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-heading font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Target size={9} /> {p.national_team_goals}
                        </div>
                      </div>
                      <div className="px-2.5 py-2 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-body">{p.position}</span>
                        <span className="text-[10px] text-primary font-bold font-body flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                          Ko'rish <ArrowRight size={10} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
          </div>

        </div>
      </div>
    </>
  );
};

export default FootballerPage;
