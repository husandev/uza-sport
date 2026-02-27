import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { stadiums } from "@/data/mockData";
import GroupStandings from "@/components/GroupStandings";
import { useState } from "react";
import stadium1 from "@/assets/stadium-1.jpg";
import stadium2 from "@/assets/stadium-2.jpg";
import stadium3 from "@/assets/stadium-3.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

const images = [stadium1, stadium2, stadium3, hero1, hero2, gallery1, gallery2];

const buildArticle = (s: typeof stadiums[0], idx: number) => ({
  title: `${s.name}: JCh-2026 ning eng muhim maydonchalaridan biri`,
  lead: `${s.city} shahridagi ${s.name} stadioni ${s.capacity} tomoshabin sig'adi. Bu yerda JCh-2026 ning muhim o'yinlari o'tkaziladi.`,
  image: images[idx % images.length],
  date: "27 Fevral, 2026",
  readTime: "5 daqiqa",
  category: "STADION",
  body: [
    { type: "text" as const, content: `${s.name} — ${s.country} ${s.city} shahridagi zamonaviy stadion. U ${s.capacity} tomoshabinga mo'ljallangan va FIFA ning barcha standartlariga javob beradi.` },
    { type: "subtitle" as const, content: "Stadion tarixi va infratuzilmasi" },
    { type: "text" as const, content: `${s.name} stadioni ko'p yillar davomida turli sport tadbirlarini o'tkazib kelgan. JCh-2026 uchun stadion to'liq modernizatsiya qilingan: yangi o'rindiqlar, zamonaviy yoritish tizimi, VIP zonalar va media markaz qurilgan.` },
    { type: "image" as const, content: images[(idx + 1) % images.length], caption: `${s.name} — tashqi ko'rinish` },
    { type: "subtitle" as const, content: "O'tkaziladigan o'yinlar" },
    { type: "text" as const, content: `Bu stadion da guruh bosqichining bir nechta muhim o'yinlari, shuningdek chorak final o'yinlari o'tkazilishi rejalashtirilgan. FIFA ushbu stadionni eng yuqori toifaga kiritgan.` },
    { type: "quote" as const, content: `«${s.name} — dunyodagi eng yaxshi futbol stadionlaridan biri. Bu yerda o'yin o'tkazish har bir futbolchi uchun sharaf.» — FIFA prezidenti` },
    { type: "subtitle" as const, content: "Qanday borish mumkin?" },
    { type: "text" as const, content: `${s.city} shahridagi ${s.name} stadioniga metro, avtobus va taksi orqali borish mumkin. Stadion atrofida keng avtoturargoh mavjud. Eng yaqin aeroport stadiondan 30 daqiqalik masofada joylashgan.` },
    { type: "image" as const, content: images[(idx + 2) % images.length], caption: `${s.name} — ichki ko'rinish` },
  ],
});

const StadiumArticlePage = () => {
  const { id } = useParams();
  const idx = parseInt(id || "1") - 1;
  const stadium = stadiums[idx];
  const [copied, setCopied] = useState(false);

  if (!stadium) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Stadion topilmadi</h1>
        <Link to="/stadiums" className="text-primary mt-4 inline-block hover:underline">← Stadionlar ro'yxatiga qaytish</Link>
      </div>
    );
  }

  const article = buildArticle(stadium, idx);
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
                <span className="text-3xl">🏟️</span>
                <h1 className="text-2xl sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground">{article.title}</h1>
              </div>
              <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-[90%]">{article.lead}</p>
            </div>

            <div className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden">
              <div className="aspect-[2/1] sm:aspect-[21/9]">
                <img src={article.image} alt={stadium.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="px-5 sm:px-7 pb-7">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />1.2K ko'rish</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">{stadium.country} {stadium.city}</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">🏟️ {stadium.capacity} o'rin</span>
                </div>
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

          {/* Related stadiums */}
          <div className="mt-6">
            <div className="section-title"><span>Boshqa stadionlar</span></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stadiums.filter((_, ri) => ri !== idx).slice(0, 6).map((rs) => (
                <Link key={rs.id} to={`/stadium/${rs.id}`} className="bg-card rounded-xl border border-border overflow-hidden hover:bg-muted/40 transition-colors group">
                  <div className="aspect-[16/10]">
                    <img src={images[(rs.id - 1) % images.length]} alt={rs.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{rs.name}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">{rs.country} {rs.city} · {rs.capacity}</p>
                  </div>
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

export default StadiumArticlePage;
