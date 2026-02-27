import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, MessageCircle, ChevronRight, Eye } from "lucide-react";
import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import HeroFootballers from "@/components/HeroFootballers";
import heroImg1 from "@/assets/hero-1.jpg";
import heroImg2 from "@/assets/hero-2.jpg";
import heroImg3 from "@/assets/hero-3.jpg";
import heroImg4 from "@/assets/hero-4.jpg";
import galleryImg1 from "@/assets/gallery-1.jpg";
import galleryImg2 from "@/assets/gallery-2.jpg";
import galleryImg3 from "@/assets/gallery-3.jpg";
import galleryImg4 from "@/assets/gallery-4.jpg";
import photoImg1 from "@/assets/photo-1.jpg";
import photoImg2 from "@/assets/photo-2.jpg";
import photoImg3 from "@/assets/photo-3.jpg";
import photoImg4 from "@/assets/photo-4.jpg";
import { useState } from "react";

const articleData: Record<string, {
  title: string;
  lead: string;
  image: string;
  date: string;
  readTime: string;
  author: { name: string; role: string };
  category: string;
  tags: string[];
  body: { type: "text" | "image" | "quote" | "subtitle"; content: string; caption?: string }[];
}> = {
  "1": {
    title: "O'zbekiston Argentinaga qarshi: tarixiy o'yin davom etmoqda!",
    lead: "Eldor Shomurodov gol urdi, lekin Lionel Messi javob qaytardi. 67-daqiqada hisob 1:2. Bu o'yin O'zbekiston futboli tarixidagi eng muhim uchrashuvlardan biri bo'lishi mumkin.",
    image: heroImg1,
    date: "27 Fevral, 2026",
    readTime: "8 daqiqa",
    author: { name: "Jasur Raximov", role: "Sport sharhlovchi" },
    category: "JONLI",
    tags: ["O'zbekiston", "Argentina", "JCh-2026", "Shomurodov", "Messi"],
    body: [
      { type: "text", content: "Bugungi o'yin nafaqat O'zbekiston futboli, balki butun Markaziy Osiyo sportining tarixiy lahzasi bo'ldi. MetLife Stadionida 82 mingdan ortiq tomoshabin yig'ilgan holda, O'zbekiston terma jamoasi jahon chempioni Argentinaga qarshi maydonga tushdi." },
      { type: "subtitle", content: "Birinchi taym: ehtiyotkor boshlanish" },
      { type: "text", content: "O'yin boshidan O'zbekiston terma jamoasi mudofaaga e'tibor qaratdi. Bosh murabbiy strategiyasi aniq edi — tezkor kontratakalar orqali xavf solish. Abduqodir Xusanov himoya liniyasida ajoyib o'ynab, Messining bir nechta hujumini bartaraf etdi." },
      { type: "image", content: galleryImg1, caption: "Xusanov Messiga qarshi duelda — 34-daqiqa" },
      { type: "text", content: "32-daqiqada Eldor Shomurodov tarixiy golni urdi! Oston Urunov o'ng qanotdan uzatma berdi, Shomurodov esa bir tegish bilan to'pni darvoza burchagiga jo'natdi. Stadion gullab ketdi — O'zbekiston muxlislari hayajon bilan baqirishdi." },
      { type: "quote", content: "«Bu mening hayotimdagi eng muhim gol. Butun xalqimiz uchun urdim.» — Eldor Shomurodov" },
      { type: "subtitle", content: "Ikkinchi taym: Messi javob berdi" },
      { type: "text", content: "Ikkinchi taymda Argentina bosimni oshirdi. 55-daqiqada Messi o'zining mo'jizaviy chap oyog'idan gol urdi — to'p darvozabonning qo'lidan oshib, darvoza burchagiga kirib ketdi. 62-daqiqada yana Messi — bu safar erkin zarba, 2:1." },
      { type: "image", content: galleryImg2, caption: "Messining erkin zarbadan urgan goli — 62-daqiqa" },
      { type: "text", content: "Ammo O'zbekiston taslim bo'lmadi. 75-daqiqada Fayzullayev tezkor hujum boshlab, Shomurodovga uzatma berdi, lekin Argentina darvozaboni to'pni qo'lga oldi. O'yin oxirigacha keskin davom etdi." },
      { type: "subtitle", content: "Natija va xulosalar" },
      { type: "text", content: "1:2 mag'lubiyatiga qaramay, O'zbekiston terma jamoasi butun dunyoga o'zini ko'rsatdi. FIFA rasmiy saytida bu o'yin «turnirning eng hayajonli o'yini» deb baholandi. Keyingi o'yin — Kolumbiyaga qarshi, va bu o'yin guruhdan chiqish uchun hal qiluvchi bo'ladi." },
    ],
  },
  "2": {
    title: "Fransiya Ispaniyani yirik hisobda mag'lub etdi — 3:1",
    lead: "Kylian Mbappe dubl qildi, Ousmane Dembele esa golga assist berdi. Fransiya I guruhda yetakchilikni qo'lga kiritdi.",
    image: heroImg2,
    date: "26 Fevral, 2026",
    readTime: "6 daqiqa",
    author: { name: "Dilshod Karimov", role: "Yevropa futboli eksperti" },
    category: "NATIJA",
    tags: ["Fransiya", "Ispaniya", "Mbappe", "JCh-2026"],
    body: [
      { type: "text", content: "Fransiya va Ispaniya o'rtasidagi o'yin turnirning eng kutilgan uchrashuvlaridan biri edi. Ikkala jamoa ham guruh bosqichida g'alaba qozonish uchun kurashdi." },
      { type: "image", content: galleryImg3, caption: "Mbappe gol urgandan so'ng bayram qilmoqda" },
      { type: "text", content: "Mbappe birinchi golni 23-daqiqada urdi. Tez va o'tkir hujum natijasida u himoyachilarni chetlab o'tib, to'pni darvoza burchagiga jo'natdi. Ikkinchi gol esa 56-daqiqada — Dembele uzatmasidan keyin." },
    ],
  },
  "3": {
    title: "Abduqodir Xusanov — JCh-2026 ning eng yaxshi himoyachisi",
    lead: "FIFA rasmiy statistikasi bo'yicha Xusanov barcha himoyachilar orasida birinchi o'rinni egalladi. Manchester Siti yulduzi turnirda ajoyib o'ynayapti.",
    image: heroImg3,
    date: "26 Fevral, 2026",
    readTime: "5 daqiqa",
    author: { name: "Bobur Alimov", role: "Analitik" },
    category: "TAHLIL",
    tags: ["Xusanov", "Manchester Siti", "JCh-2026", "O'zbekiston"],
    body: [
      { type: "text", content: "Abduqodir Xusanov JCh-2026 da ajoyib o'ynayapti. FIFA statistikasiga ko'ra, u eng ko'p to'p qo'lga olgan, eng ko'p duelda g'alaba qozongan himoyachi hisoblanadi." },
      { type: "image", content: galleryImg4, caption: "Xusanov turnirdagi eng yaxshi himoyachi — FIFA reytingi" },
      { type: "quote", content: "«Xusanov — dunyodagi eng yaxshi yosh himoyachilardan biri. U kelajakda futbol tarixini o'zgartirishi mumkin.» — Pep Guardiola" },
      { type: "text", content: "22 yoshli himoyachi ikkita guruh o'yinida ham deyarli benuqson o'ynadi. Uning tezligi, pozitsiyani tanlash qobiliyati va havo duelidagi kuchi raqiblarni hayratda qoldirmoqda." },
    ],
  },
};

const relatedPosts = [
  { id: "2", title: "Fransiya Ispaniyani yirik hisobda mag'lub etdi — 3:1", image: heroImg2, category: "NATIJA", date: "26 Fevral" },
  { id: "3", title: "Abduqodir Xusanov — JCh-2026 ning eng yaxshi himoyachisi", image: heroImg3, category: "TAHLIL", date: "26 Fevral" },
  { id: "1", title: "O'zbekiston Argentinaga qarshi: tarixiy o'yin davom etmoqda!", image: heroImg1, category: "JONLI", date: "27 Fevral" },
  { id: "4", title: "48 jamoali format: qanday o'zgarishlar kutilmoqda?", image: heroImg4, category: "MAQOLA", date: "25 Fevral" },
  { id: "5", title: "MetLife Stadium — Jahon chempionati finalining mezboni", image: galleryImg1, category: "STADION", date: "25 Fevral" },
  { id: "6", title: "Mbappe JCh-2026 da yulduz bo'la oladimi?", image: heroImg2, category: "TAHLIL", date: "24 Fevral" },
  { id: "7", title: "Eldor Shomurodov: «Biz tarixni yozishga tayyormiz»", image: heroImg3, category: "INTERVYU", date: "24 Fevral" },
  { id: "8", title: "Guruh bosqichi taqvimi e'lon qilindi — barcha o'yinlar", image: heroImg1, category: "TAQVIM", date: "23 Fevral" },
  { id: "9", title: "Chipta narxlari va xarid yo'llari — to'liq qo'llanma", image: heroImg4, category: "QO'LLANMA", date: "23 Fevral" },
];

const ArticlePage = () => {
  const { id } = useParams();
  const article = articleData[id || "1"];
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Maqola topilmadi</h1>
          <Link to="/" className="text-primary mt-4 inline-block hover:underline">← Bosh sahifaga qaytish</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = relatedPosts.filter((p) => p.id !== id).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker />

      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Main Article */}
          <div className="lg:col-span-8">

            <article className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Category + Title — above image */}
              <div className="px-5 sm:px-7 pt-6 pb-5">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
                  >
                    {article.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                </div>

                <h1 className="text-2xl sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground mb-4">
                  {article.title}
                </h1>

                <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-[90%]">
                  {article.lead}
                </p>
              </div>

              {/* Hero image — cinematic aspect */}
              <div className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden">
                <div className="aspect-[2/1] sm:aspect-[21/9]">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                {/* Subtle vignette */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
              </div>

              <div className="px-5 sm:px-7 pb-7">
                {/* Meta + share row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-border">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />2.4K ko'rish</span>
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
                <div className="space-y-5 max-w-none">
                  {article.body.map((block, i) => {
                    if (block.type === "text") {
                      return (
                        <p key={i} className="text-[14px] sm:text-[15px] leading-[1.85] text-foreground/85">
                          {block.content}
                        </p>
                      );
                    }
                    if (block.type === "subtitle") {
                      return (
                        <h2 key={i} className="text-lg sm:text-xl font-extrabold text-foreground mt-8 mb-2 flex items-center gap-2">
                          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-secondary shrink-0" />
                          {block.content}
                        </h2>
                      );
                    }
                    if (block.type === "image") {
                      return (
                        <figure key={i} className="my-6 flex flex-col items-center">
                          <img src={block.content} alt={block.caption || ""} className="max-w-[85%] h-auto rounded-xl" />
                          {block.caption && (
                            <figcaption className="text-[11px] text-muted-foreground mt-2.5 text-center italic">
                              📸 {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <blockquote
                          key={i}
                          className="relative my-6 py-4 px-5 rounded-xl bg-muted/40 border-l-[3px]"
                          style={{ borderLeftColor: "hsl(var(--primary))" }}
                        >
                          <p className="text-[13px] sm:text-[14px] leading-relaxed text-foreground/80 italic font-medium">
                            {block.content}
                          </p>
                        </blockquote>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-5 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author */}
                <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground leading-none">{article.author.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{article.author.role}</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Posts — below article */}
            <div className="mt-6 bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 pt-2 pb-2">
                <div className="section-title">
                  <span>O'xshash maqolalar</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {filtered.map((post) => (
                  <Link
                    key={post.id}
                    to={`/article/${post.id}`}
                    className="px-5 py-4 flex gap-4 cursor-pointer hover:bg-muted/40 transition-colors group block"
                  >
                    <div className="w-[140px] h-[95px] flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1.5 font-body">
                          <span>{post.date}</span>
                          <span className="text-muted-foreground/40">|</span>
                          <span className="text-primary font-medium">{post.category}</span>
                        </div>
                        <h3 className="text-[19px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-3">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-6 py-8 text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              <div className="text-[10px] uppercase font-heading font-bold tracking-wider opacity-80 mb-1">Reklama</div>
              <h3 className="font-heading font-extrabold text-base leading-tight mb-2">
                ⚽ FIFA 2026 chiptalari sotuvda!
              </h3>
              <p className="text-[12px] font-body opacity-80 mb-3">
                O'zbekiston terma jamoasi o'yinlariga chipta oling
              </p>
              <div className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-[12px] font-bold font-heading text-center py-2 rounded-lg">
                Chipta olish →
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticlePage;
