import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, MessageCircle, Play } from "lucide-react";
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

const videoArticles = [
  { id: 1, title: "O'zbekiston — Kolumbiya: o'yin sharhi", subtitle: "JCh-2026 guruh bosqichidagi eng muhim o'yinning to'liq tahlili.", category: "O'yin sharhi", flag: "🇺🇿" },
  { id: 2, title: "Messi JCh-2026 da — barcha gollari", subtitle: "Lionel Messining jahon chempionatidagi eng yaxshi lahzalari.", category: "Gollar", flag: "🇦🇷" },
  { id: 3, title: "Shomurodov — eng yaxshi momentlar", subtitle: "Eldor Shomurodovning terma jamoadagi eng yorqin o'yinlari.", category: "Futbolchi", flag: "🇺🇿" },
  { id: 4, title: "Braziliya vs Germaniya: klassik qayta ko'rish", subtitle: "Jahon chempionatlari tarixidagi eng yodda qolarli o'yinlardan biri.", category: "Klassik", flag: "🇧🇷" },
  { id: 5, title: "JCh-2026 stadionlari — virtual tur", subtitle: "AQSh, Meksika va Kanadadagi barcha stadionlarni ko'ring.", category: "Stadionlar", flag: "🇺🇸" },
  { id: 6, title: "K guruhi tahlili — ekspertlar bahsi", subtitle: "O'zbekiston guruhidagi raqiblar va imkoniyatlar haqida.", category: "Tahlil", flag: "🇺🇿" },
  { id: 7, title: "Xusanov — Evropadagi eng yaxshi himoyachi", subtitle: "Abdukodir Xusanovning klubi va terma jamoadagi o'yini.", category: "Futbolchi", flag: "🇺🇿" },
  { id: 8, title: "Fransiya terma jamoasi — yangi avlod", subtitle: "Mbappe boshchiligidagi Fransiya JCh-2026 ga qanday tayyorlanmoqda.", category: "Terma jamoa", flag: "🇫🇷" },
  { id: 9, title: "JCh-2026 ochilish marosimi — kutilayotganlar", subtitle: "Tarixdagi eng katta ochilish marosimi qanday bo'ladi?", category: "Marosim", flag: "🌍" },
  { id: 10, title: "Ispaniya — tiki-taka qaytadimi?", subtitle: "Ispaniya terma jamoasining yangi uslubi va taktikasi.", category: "Tahlil", flag: "🇪🇸" },
  { id: 11, title: "Eng chiroyli gollar — JCh tarixi", subtitle: "Jahon chempionatlari tarixidagi top-20 eng go'zal gol.", category: "Gollar", flag: "⚽" },
  { id: 12, title: "O'zbekiston yo'li — JCh-2026 ga qanday chiqdik", subtitle: "Saralash bosqichidan final bosqichigacha bo'lgan yo'l.", category: "Tarix", flag: "🇺🇿" },
  { id: 13, title: "Ronaldu — so'nggi jahon chempionati?", subtitle: "Kristiano Ronalduning JCh-2026 dagi rejasi va maqsadlari.", category: "Futbolchi", flag: "🇵🇹" },
  { id: 14, title: "Angliya — chempion bo'la oladimi?", subtitle: "Angliya terma jamoasining kuchli va zaif tomonlari.", category: "Tahlil", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: 15, title: "MetLife Stadium — JCh final maydoni", subtitle: "Final o'yini o'tkaziladigan stadion haqida batafsil.", category: "Stadionlar", flag: "🇺🇸" },
];

const buildBody = (v: typeof videoArticles[0], idx: number) => [
  { type: "text" as const, content: v.subtitle + " Bu videoda barcha muhim lahzalar, gollar va eng yaxshi epizodlar jamlangan." },
  { type: "subtitle" as const, content: "Video sharhi" },
  { type: "text" as const, content: `Ushbu videoda ${v.title.toLowerCase()} mavzusida batafsil ma'lumot berilgan. Ekspertlar fikricha, bu JCh-2026 ning eng muhim mavzularidan biri hisoblanadi. Video professional operatorlar tomonidan suratga olingan va sifatli montaj qilingan.` },
  { type: "image" as const, content: images[(idx + 1) % images.length], caption: `${v.title} — video kadrdan lahza` },
  { type: "subtitle" as const, content: "Muhim lahzalar" },
  { type: "text" as const, content: "Videoning eng qiziqarli lahzalari orasida ajoyib gollar, drammatik epizodlar va futbolchilarning emotsional reaktsiyalari alohida o'rin egallaydi. Har bir lahza alohida tahlil qilingan va sekinlashtirilgan holda ko'rsatilgan." },
  { type: "quote" as const, content: `«Bu video futbol muxlislari uchun haqiqiy sovg'a. Har bir kadr alohida e'tibor bilan tanlangan.» — Video muallifi` },
  { type: "text" as const, content: "Videoni to'liq ko'rish uchun yuqoridagi pleyer tugmasini bosing. Siz shuningdek videoni ijtimoiy tarmoqlarda ulashishingiz mumkin." },
  { type: "image" as const, content: images[(idx + 2) % images.length], caption: "O'yin lahzalaridan" },
];

const VideoArticlePage = () => {
  const { id } = useParams();
  const idx = parseInt(id || "1") - 1;
  const video = videoArticles[idx];
  const [copied, setCopied] = useState(false);

  if (!video) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Video topilmadi</h1>
        <Link to="/videos" className="text-primary mt-4 inline-block hover:underline">← Videolar ro'yxatiga qaytish</Link>
      </div>
    );
  }

  const body = buildBody(video, idx);
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <article className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 sm:px-7 pt-6 pb-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
                  {video.category}
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />27 Fevral, 2026</span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />5 daqiqa</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{video.flag}</span>
                <h1 className="text-2xl sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground">{video.title}</h1>
              </div>
              <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-[90%]">{video.subtitle}</p>
            </div>

            {/* Video hero with play button */}
            <div className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden cursor-pointer group">
              <div className="aspect-video">
                <img src={images[idx % images.length]} alt={video.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="px-5 sm:px-7 pb-7">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />3.5K ko'rish</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">🎬 Video</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Facebook className="w-3 h-3" /></button>
                  <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Twitter className="w-3 h-3" /></button>
                  <button className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><MessageCircle className="w-3 h-3" /></button>
                  <button onClick={handleShare} className="h-7 px-2.5 rounded-full bg-muted/60 border border-border flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors text-[10px] font-semibold"><Share2 className="w-3 h-3" />{copied ? "✓" : "Ulashish"}</button>
                </div>
              </div>

              <div className="space-y-5 max-w-none">
                {body.map((block, i) => {
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

          {/* Related videos */}
          <div className="mt-6">
            <div className="section-title"><span>Boshqa videolar</span></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {videoArticles.filter((_, ri) => ri !== idx).slice(0, 6).map((rv) => (
                <Link key={rv.id} to={`/video/${rv.id}`} className="bg-card rounded-xl border border-border overflow-hidden hover:bg-muted/40 transition-colors group">
                  <div className="aspect-video relative">
                    <img src={images[(rv.id - 1) % images.length]} alt={rv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center"><Play size={14} className="text-primary-foreground ml-0.5" fill="currentColor" /></div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-[13px] font-bold group-hover:text-primary transition-colors line-clamp-2">{rv.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">{rv.category}</p>
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

export default VideoArticlePage;
