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
import { useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, ZoomOut, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const articleData: Record<string, {
  title: string;
  lead: string;
  image: string;
  date: string;
  readTime: string;
  author: { name: string; role: string };
  category: string;
  tags: string[];
  body: { type: "text" | "image" | "quote" | "subtitle" | "table" | "telegram" | "instagram"; content: string; caption?: string; tableData?: { headers: string[]; rows: string[][] } }[];
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
    readTime: "12 daqiqa",
    author: { name: "Bobur Alimov", role: "Analitik" },
    category: "TAHLIL",
    tags: ["Xusanov", "Manchester Siti", "JCh-2026", "O'zbekiston", "Himoyachi", "FIFA"],
    body: [
      { type: "text", content: "Abduqodir Xusanov JCh-2026 da ajoyib o'ynayapti. FIFA statistikasiga ko'ra, u eng ko'p to'p qo'lga olgan, eng ko'p duelda g'alaba qozongan himoyachi hisoblanadi. 22 yoshli futbolchi Manchester Siti safida olgan tajribasi natijasida jahon arenasida o'zini to'liq namoyon qilmoqda." },
      { type: "subtitle", content: "Raqamlar gapiradi" },
      { type: "text", content: "FIFA rasmiy statistikasi bo'yicha Xusanov turnirning birinchi ikki turida barcha himoyachilar orasida eng yuqori ko'rsatkichlarga erishdi. Quyidagi jadvalda uning raqiblar bilan solishtirmali statistikasi keltirilgan:" },
      { type: "table", content: "", tableData: {
        headers: ["Ko'rsatkich", "Xusanov 🇺🇿", "Van Dijk 🇳🇱", "Dias 🇵🇹", "Romero 🇦🇷"],
        rows: [
          ["To'p qo'lga olish", "18", "12", "14", "11"],
          ["Havo dueli (g'alaba)", "9/11", "7/10", "6/9", "5/8"],
          ["Bloklangan zarbalar", "6", "3", "4", "2"],
          ["Uzatma aniqligi", "91%", "88%", "89%", "85%"],
          ["Duel g'alabalari", "14/17", "10/15", "11/16", "9/13"],
          ["FIFA reytingi", "8.7", "7.9", "8.1", "7.6"],
        ]
      }},
      { type: "image", content: galleryImg4, caption: "Xusanov turnirdagi eng yaxshi himoyachi — FIFA reytingi" },
      { type: "subtitle", content: "Pep Guardiola nima deydi?" },
      { type: "quote", content: "«Xusanov — dunyodagi eng yaxshi yosh himoyachilardan biri. U kelajakda futbol tarixini o'zgartirishi mumkin. Men uni Manchester Sitiga olib kelganimdan faxrlanaman.» — Pep Guardiola" },
      { type: "text", content: "Guardiola Xusanovni 2025 yilning yozida Lens klubidan 45 million evroga sotib olgan edi. Ko'pchilik bu transferni qimmat deb baholagan bo'lsa-da, Xusanov o'zining birinchi mavsumidayoq APL da eng yaxshi himoyachilardan biriga aylandi." },
      { type: "text", content: "Manchester Siti bosh murabbiyi qo'shimcha qilib shunday dedi: «Abduqodir juda tez o'rganadi. U har bir mashg'ulotda, har bir o'yinda yaxshilanib bormoqda. Uning aqli, tezligi va kuchi — bu kombinatsiya juda kam uchraydi. U bizning kelajagimiz.»" },
      { type: "subtitle", content: "O'zbekiston himoyasining tayanchiga aylandi" },
      { type: "text", content: "Terma jamoa bosh murabbiyi Srečko Katanec ham Xusanovning muhimligini ta'kidladi. Birinchi o'yinda Argentina hujumchilariga qarshi ajoyib o'ynagan Xusanov, ikkinchi o'yinda Kolumbiya hujumiga ham muvaffaqiyatli qarshilik ko'rsatdi." },
      { type: "image", content: photoImg1, caption: "Xusanov Argentina o'yinida Messiga qarshi pozitsiyada" },
      { type: "text", content: "Xusanovning o'yin uslubi zamonaviy himoyachi talablariga to'liq javob beradi. U nafaqat himoya qiladi, balki hujumni ham boshlaydi. Uning uzun uzatmalari va dribling qobiliyati jamoa uchun qo'shimcha qurol hisoblanadi." },
      { type: "subtitle", content: "Telegram kanalimiz reportaji" },
      { type: "text", content: "Bizning rasmiy Telegram kanalimizda Xusanovning eng yaxshi momentlari to'plami e'lon qilindi. Quyidagi videoda uning turnirdagi barcha muhim epizodlari jamlangan:" },
      { type: "telegram", content: "https://t.me/uaborontv/3251" },
      { type: "subtitle", content: "Xusanov haqida dunyoning fikri" },
      { type: "text", content: "Nafaqat Guardiola, balki jahonning boshqa yetakchi murabbiylari ham Xusanovni yuqori baholashmoqda. Carlo Ancelotti uni «kelajakning Sergio Ramosi» deb atadi, Jürgen Klopp esa «men ko'rgan eng intellektual yosh himoyachi» deb ta'rifladi." },
      { type: "table", content: "", tableData: {
        headers: ["Murabbiy", "Xusanov haqida fikr"],
        rows: [
          ["Carlo Ancelotti", "«Kelajakning Sergio Ramosi. Xarakterli, kuchli va aqlli.»"],
          ["Jürgen Klopp", "«Men ko'rgan eng intellektual yosh himoyachi.»"],
          ["Xavi Ernandes", "«U 22 da 30 yoshli himoyachidek o'ynaydi.»"],
          ["Mikel Arteta", "«Xusanov bilan o'ynash — har bir hujumchi uchun dahshat.»"],
        ]
      }},
      { type: "subtitle", content: "Ijtimoiy tarmoqlarda reaksiya" },
      { type: "text", content: "Xusanovning ajoyib o'yini nafaqat sport OAVlarida, balki ijtimoiy tarmoqlarda ham katta aks-sado berdi. Instagram'da uning o'yin momentlari millionlab ko'rishlar to'pladi:" },
      { type: "instagram", content: "https://www.instagram.com/reel/DGYExQoNMNw/" },
      { type: "text", content: "Shuningdek, Twitter'da #Khusanov hashtagi bir necha soat davomida trending bo'ldi. Dunyoning turli burchaklaridan futbol muxlislari Xusanovning mahoratiga qoyil qolishganini bildirdi." },
      { type: "subtitle", content: "Keyingi o'yinda nima kutilmoqda?" },
      { type: "text", content: "O'zbekiston terma jamoasi keyingi o'yinini Kolumbiyaga qarshi o'tkazadi. Bu o'yin guruhdan chiqish uchun hal qiluvchi ahamiyatga ega. Xusanov Kolumbiya hujumchilari — ayniqsa Luis Diaz va Rafael Santos Borrega qarshi yana bir ajoyib o'yin ko'rsatishi kutilmoqda." },
      { type: "text", content: "O'yin 14 iyun kuni mahalliy vaqt bilan 18:00 da boshlanadi. MetLife Stadium'da bo'ladigan bu o'yinga 80 mingdan ortiq tomoshabin kutilmoqda. O'zbekiston muxlislari allaqachon chipta sotib olishni boshlashdi va stadionni to'liq to'ldirish rejasi bor." },
      { type: "quote", content: "«Biz har bir o'yinda tarixni yozmoqdamiz. Kolumbiya o'yini — bizning eng muhim imtihonimiz bo'ladi. Lekin biz tayyor.» — Abduqodir Xusanov" },
      { type: "image", content: galleryImg2, caption: "O'zbekiston terma jamoasi guruh suratida — JCh-2026" },
      { type: "text", content: "Xusanovning bu turnirdagi yutuqlari nafaqat uning shaxsiy muvaffaqiyati, balki O'zbekiston futbolining rivojlanishi uchun muhim qadam hisoblanadi. U yosh futbolchilarga ilhom berib, O'zbekistondan ham jahon darajasidagi futbolchilar yetishib chiqishi mumkinligini isbotlamoqda." },
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
  const [lightbox, setLightbox] = useState<{ src: string; caption?: string; rect?: DOMRect } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);

  const openLightbox = useCallback((src: string, caption?: string, e?: React.MouseEvent<HTMLElement>) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    setImgLoaded(false);
    setLightbox({ src, caption, rect: rect || undefined });
    setZoom(1);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setZoom(1);
    setImgLoaded(false);
  }, []);

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
              <div className="relative mx-5 sm:mx-7 mb-6 rounded-xl overflow-hidden cursor-zoom-in" onClick={(e) => openLightbox(article.image, article.title, e)}>
                <div className="aspect-[2/1] sm:aspect-[21/9]">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                </div>
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
                          <img
                            src={block.content}
                            alt={block.caption || ""}
                            className="max-w-[85%] h-auto rounded-xl cursor-zoom-in hover:opacity-90 transition-opacity"
                            onClick={(e) => openLightbox(block.content, block.caption, e)}
                          />
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
                    if (block.type === "table" && block.tableData) {
                      return (
                        <div key={i} className="my-6 overflow-x-auto rounded-xl border border-border">
                          <table className="w-full text-[13px]">
                            <thead>
                              <tr className="bg-muted/60">
                                {block.tableData.headers.map((h, hi) => (
                                  <th key={hi} className={`px-4 py-3 font-bold text-foreground ${hi === 0 ? "text-left" : "text-center"} border-b border-border`}>
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {block.tableData.rows.map((row, ri) => (
                                <tr key={ri} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                  {row.map((cell, ci) => (
                                    <td key={ci} className={`px-4 py-2.5 ${ci === 0 ? "text-left font-medium text-foreground" : "text-center text-muted-foreground"}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    if (block.type === "telegram") {
                      return (
                        <div key={i} className="my-6 flex justify-center">
                          <div className="w-full max-w-[85%] rounded-xl overflow-hidden border border-border bg-muted/20">
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#2AABEE]/10 border-b border-border">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.28-.02-.12.02-2.02 1.28-5.7 3.77-.54.37-1.03.55-1.47.54-.48-.01-1.4-.27-2.09-.49-.84-.28-1.51-.42-1.45-.89.03-.25.38-.5 1.04-.78 4.07-1.77 6.79-2.94 8.15-3.5 3.88-1.62 4.69-1.9 5.21-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .37z" fill="#2AABEE"/></svg>
                              <span className="text-[12px] font-bold text-foreground">Telegram Video</span>
                            </div>
                            <div className="p-4">
                              <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                                <a href={block.content} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                                  <div className="w-14 h-14 rounded-full bg-[#2AABEE] flex items-center justify-center shadow-lg">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                                  </div>
                                  <span className="text-[12px] font-semibold">Telegramda ko'rish →</span>
                                </a>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-3 text-center">Xusanovning JCh-2026 dagi eng yaxshi momentlari</p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    if (block.type === "instagram") {
                      return (
                        <div key={i} className="my-6 flex justify-center">
                          <div className="w-full max-w-[85%] rounded-xl overflow-hidden border border-border bg-muted/20">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-border" style={{ background: "linear-gradient(135deg, rgba(131,58,180,0.08), rgba(253,29,29,0.08), rgba(252,176,69,0.08))" }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFDC80"/><stop offset="25%" stopColor="#F77737"/><stop offset="50%" stopColor="#E1306C"/><stop offset="75%" stopColor="#C13584"/><stop offset="100%" stopColor="#833AB4"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/></svg>
                              <span className="text-[12px] font-bold text-foreground">Instagram Reels</span>
                            </div>
                            <div className="p-4">
                              <div className="aspect-[9/16] max-h-[480px] rounded-lg bg-muted flex items-center justify-center mx-auto" style={{ maxWidth: "270px" }}>
                                <a href={block.content} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                                  <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)" }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                                  </div>
                                  <span className="text-[12px] font-semibold">Instagramda ko'rish →</span>
                                </a>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-3 text-center">Xusanovning eng yaxshi himoya momentlari 🔥</p>
                            </div>
                          </div>
                        </div>
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

      {/* Lightbox */}
      {lightbox && createPortal(
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
          {/* Controls */}
          <div
            className="absolute top-4 right-4 flex items-center gap-2 z-[10]"
            style={{ animation: "fade-in 0.3s ease-out 0.15s both" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white/70 text-xs font-mono min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
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

          {/* Image container */}
          <div
            className="relative z-[5] flex items-center justify-center"
            style={{
              animation: "lightbox-zoom-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading shimmer */}
            {!imgLoaded && (
              <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-white/5 backdrop-blur-md rounded-lg animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }} />
              </div>
            )}

            <img
              src={lightbox.src}
              alt={lightbox.caption || ""}
              className="max-w-[85vw] max-h-[80vh] rounded-lg transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoom})` }}
              draggable={false}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Caption */}
          {lightbox.caption && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full z-[10]"
              style={{ animation: "fade-in 0.3s ease-out 0.2s both" }}
            >
              📸 {lightbox.caption}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default ArticlePage;
