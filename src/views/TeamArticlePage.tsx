"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Eye, Share2, ImageOff } from "lucide-react";
import { groupStandings } from "@/data/mockData";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const images = [hero1.src, hero2.src, hero3.src, hero4.src, hero5.src, photo1.src, photo2.src, gallery1.src, gallery2.src, gallery3.src];

const allTeams = groupStandings.flatMap((g) =>
  g.teams.map((team) => ({
    flag: team.flag,
    name: team.name,
    group: g.group,
    w: team.w, d: team.d, l: team.l, gd: team.gd, pts: team.pts,
  }))
);

const buildArticle = (team: typeof allTeams[0], idx: number) => ({
  title: `${team.name} terma jamoasi: JCh-2026 da qanday imkoniyatlari bor?`,
  lead: `${team.name} ${team.group} guruhida o'yin olib bormoqda. Terma jamoa tarkibi, taktikasi va kuchli tomonlari haqida batafsil.`,
  image: images[idx % images.length],
  date: "27 Fevral, 2026",
  readTime: "7 daqiqa",
  category: `${team.group} GURUH`,
  body: [
    { type: "text" as const, content: `${team.name} terma jamoasi JCh-2026 da ${team.group} guruhida ishtirok etmoqda. Jamoa hozirgi holatda ${team.pts} ochko to'plab, guruhda o'z o'rnini mustahkamlamoqda.` },
    { type: "subtitle" as const, content: "Guruh bosqichidagi natijalar" },
    { type: "text" as const, content: `Hozirgi statistika: ${team.w} g'alaba, ${team.d} durrang, ${team.l} mag'lubiyat. Gol farqi: ${team.gd}. Jamoa har bir o'yinda o'z darajasini ko'rsatmoqda.` },
    { type: "image" as const, content: images[(idx + 1) % images.length], caption: `${team.name} terma jamoasi JCh-2026 da` },
    { type: "subtitle" as const, content: "Kuchli tomonlari" },
    { type: "text" as const, content: `${team.name} terma jamoasining asosiy kuchi jamoaviy o'yinda. Bosh murabbiy o'z taktikasini aniq belgilab, har bir futbolchiga o'z vazifasini tushuntirgan. Himoya liniyasi barqaror, hujumda esa tezkor kontratakalar asosiy qurol hisoblanadi.` },
    { type: "quote" as const, content: `«Biz har bir o'yinga g'alaba uchun chiqamiz. Muxlislarimiz bizga kuch beradi.» — ${team.name} terma jamoasi sardori` },
    { type: "subtitle" as const, content: "Keyingi o'yinlar" },
    { type: "text" as const, content: `${team.name} keyingi o'yinida ${team.group} guruhidagi raqibiga qarshi maydonga tushadi. Bu o'yin guruhdan chiqish uchun hal qiluvchi ahamiyatga ega bo'lishi mumkin. Muxlislar katta umid bilan kutmoqda.` },
    { type: "image" as const, content: images[(idx + 2) % images.length], caption: `${team.name} muxlislari stadion da` },
  ],
});

const relatedTeams = allTeams.slice(0, 6);

const TeamArticlePage = ({ standings }: { standings: StandingsResponse | null }) => {
  const params = useParams(); const id = params.id as string;
  const idx = parseInt(id || "0");
  const team = allTeams[idx];
  const [copied, setCopied] = useState(false);

  if (!team) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Jamoa topilmadi</h1>
        <Link href="/teams" className="text-primary mt-4 inline-block hover:underline">← Jamoalar ro'yxatiga qaytish</Link>
      </div>
    );
  }

  const article = buildArticle(team, idx);
  const getUrl = () => (typeof window !== "undefined" ? window.location.href : "");
  const handleFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, "_blank");
  const handleTelegram = () => window.open(`https://t.me/share/url?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(article.title)}`, "_blank");
  const handleX = () => window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(article.title)}`, "_blank");
  const handleInstagram = async () => { if (navigator.share) { try { await navigator.share({ title: article.title, url: getUrl() }); } catch {} } else { navigator.clipboard.writeText(getUrl()); setCopied(true); setTimeout(() => setCopied(false), 2000); } };
  const handleCopyLink = () => { navigator.clipboard.writeText(getUrl()); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <article className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 sm:px-7 pt-6 pb-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
                  {article.category}
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{team.flag}</span>
                <h1 className="text-2xl sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground">{article.title}</h1>
              </div>
              <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-[90%]">{article.lead}</p>
            </div>

            <div className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden">
              {article.image ? (
                <div className="aspect-[2/1] sm:aspect-[21/9]">
                  <img src={article.image} alt={team.name} className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
              ) : (
                <div className="aspect-[2/1] sm:aspect-[21/9] bg-muted flex flex-col items-center justify-center gap-2">
                  <ImageOff size={32} className="text-muted-foreground/25" />
                  <span className="text-[12px] text-muted-foreground/40 font-medium">Rasm yo'q</span>
                </div>
              )}
            </div>

            <div className="px-5 sm:px-7 pb-7">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Eye className="w-3 h-3" />1.8K ko'rish</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={handleFacebook} title="Facebookda ulashish" className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button onClick={handleTelegram} title="Telegramda ulashish" className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-[#2CA5E0] hover:text-white hover:border-[#2CA5E0] transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  </button>
                  <button onClick={handleX} title="X da ulashish" className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.75l7.732-8.843-8.164-10.657H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
                  </button>
                  <button onClick={handleInstagram} title="Instagramda ulashish" className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </button>
                  <button onClick={handleCopyLink} className="h-7 px-2.5 rounded-full bg-muted/60 border border-border flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors text-[10px] font-semibold"><Share2 className="w-3 h-3" />{copied ? "✓ Nusxalandi" : "Ulashish"}</button>
                </div>
              </div>

              <div className="space-y-5 max-w-none">
                {article.body.map((block, i) => {
                  if (block.type === "text") return <p key={i} className="text-[14px] sm:text-[15px] leading-[1.85] text-foreground/85">{block.content}</p>;
                  if (block.type === "subtitle") return <h2 key={i} className="text-[18px] sm:text-[20px] font-extrabold text-foreground mt-3">{block.content}</h2>;
                  if (block.type === "quote") return <blockquote key={i} className="border-l-4 border-primary pl-5 py-3 my-4 bg-muted/30 rounded-r-xl"><p className="text-[14px] italic text-foreground/80 leading-relaxed">{block.content}</p></blockquote>;
                  if (block.type === "image") return (
                    <figure key={i} className="my-5 flex flex-col items-center">
                      <img src={block.content} alt={block.caption || ""} className="max-w-[85%] h-auto rounded-xl" />
                      {block.caption && <figcaption className="text-[12px] text-muted-foreground mt-2.5 text-center">{block.caption}</figcaption>}
                    </figure>
                  );
                  return null;
                })}
              </div>
            </div>
          </article>

          {/* Related teams */}
          <div className="mt-6">
            <div className="section-title"><span>Boshqa jamoalar</span></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedTeams.filter((_, ri) => ri !== idx).slice(0, 6).map((rt, ri) => (
                <Link key={ri} href={`/team/${allTeams.indexOf(rt)}`} className="bg-card rounded-xl border border-border p-4 hover:bg-muted/40 transition-colors group">
                  <span className="text-2xl">{rt.flag}</span>
                  <h4 className="text-sm font-bold mt-2 group-hover:text-primary transition-colors">{rt.name}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">{rt.group} guruh · {rt.pts} ochko</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto scrollbar-thin space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default TeamArticlePage;
