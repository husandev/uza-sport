import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, MessageCircle, Bookmark, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import Footer from "@/components/Footer";
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

  const filtered = relatedPosts.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker />

      {/* Breadcrumb */}
      <div className="container pt-4 pb-2">
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Bosh sahifa</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{article.category}</span>
        </div>
      </div>

      <article className="container pb-8">
        <div className="max-w-[780px] mx-auto">

          {/* Category badge */}
          <div className="mb-3">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-primary-foreground"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
            >
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-black leading-[1.15] tracking-tight text-foreground mb-4">
            {article.title}
          </h1>

          {/* Lead */}
          <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground mb-5">
            {article.lead}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-5 mb-5 border-b border-border">
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime} o'qish</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <User className="w-3.5 h-3.5" />
              <span className="font-semibold text-foreground">{article.author.name}</span>
              <span>— {article.author.role}</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden mb-8 border border-border">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
          </div>

          {/* Article body */}
          <div className="space-y-5">
            {article.body.map((block, i) => {
              if (block.type === "text") {
                return (
                  <p key={i} className="text-[15px] leading-[1.8] text-foreground/85">
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
                  <figure key={i} className="my-6">
                    <div className="rounded-xl overflow-hidden border border-border">
                      <img src={block.content} alt={block.caption || ""} className="w-full h-auto object-cover" />
                    </div>
                    {block.caption && (
                      <figcaption className="text-[11px] text-muted-foreground mt-2 text-center italic">
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
                    className="relative my-6 py-4 px-5 rounded-xl bg-muted/50 border-l-[3px]"
                    style={{ borderLeftColor: "hsl(var(--primary))" }}
                  >
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-foreground/80 italic font-medium">
                      {block.content}
                    </p>
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-border">
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

          {/* Share & Author */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-bold text-foreground">{article.author.name}</p>
                <p className="text-[11px] text-muted-foreground">{article.author.role}</p>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground mr-1">Ulashish:</span>
              <button className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleShare}
                className="h-8 px-3 rounded-full bg-muted border border-border flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors text-[11px] font-semibold"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? "Nusxalandi!" : "Havola"}
              </button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-10">
            <h3 className="section-title mb-4">
              <span>O'xshash maqolalar</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/article/${post.id}`}
                  className="group rounded-xl overflow-hidden bg-card border border-border card-hover"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary">{post.category}</span>
                    <h4 className="text-[13px] font-bold text-foreground leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground mt-1.5 block">{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Bosh sahifaga qaytish
            </Link>
          </div>

        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticlePage;
