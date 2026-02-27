import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, MessageCircle, ArrowRight } from "lucide-react";
import { groupStandings } from "@/data/mockData";
import GroupStandings from "@/components/GroupStandings";
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

const images = [hero1, hero2, hero3, hero4, hero5, photo1, photo2, gallery1, gallery2, gallery3];

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

const TeamArticlePage = () => {
  const { id } = useParams();
  const idx = parseInt(id || "0");
  const team = allTeams[idx];
  const [copied, setCopied] = useState(false);

  if (!team) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Jamoa topilmadi</h1>
        <Link to="/teams" className="text-primary mt-4 inline-block hover:underline">← Jamoalar ro'yxatiga qaytish</Link>
      </div>
    );
  }

  const article = buildArticle(team, idx);
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };

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
              <div className="aspect-[2/1] sm:aspect-[21/9]">
                <img src={article.image} alt={team.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="px-5 sm:px-7 pb-7">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Eye className="w-3 h-3" />1.8K ko'rish</span>
                <div className="flex items-center gap-1.5">
                  <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Facebook className="w-3 h-3" /></button>
                  <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Twitter className="w-3 h-3" /></button>
                  <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><MessageCircle className="w-3 h-3" /></button>
                  <button onClick={handleShare} className="h-7 px-2.5 rounded-full bg-muted/60 border border-border flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors text-[10px] font-semibold"><Share2 className="w-3 h-3" />{copied ? "✓" : "Ulashish"}</button>
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
                <Link key={ri} to={`/team/${allTeams.indexOf(rt)}`} className="bg-card rounded-xl border border-border p-4 hover:bg-muted/40 transition-colors group">
                  <span className="text-2xl">{rt.flag}</span>
                  <h4 className="text-sm font-bold mt-2 group-hover:text-primary transition-colors">{rt.name}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">{rt.group} guruh · {rt.pts} ochko</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <GroupStandings />
        </div>
      </div>
    </div>
  );
};

export default TeamArticlePage;
