"use client";
import { useState } from "react";
import Link from "next/link";
import GroupStandings from "@/components/GroupStandings";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import stadium1 from "@/assets/stadium-1.jpg";

const images = [hero1.src, hero2.src, hero3.src, hero4.src, hero5.src, photo1.src, photo2.src, photo3.src, photo4.src, stadium1.src];

const videoArticles = [
  { id: 1, title: "O'zbekiston — Kolumbiya: o'yin sharhi", subtitle: "JCh-2026 guruh bosqichidagi eng muhim o'yinning to'liq tahlili.", category: "O'yin sharhi", time: "Bugun, 14:00", flag: "🇺🇿" },
  { id: 2, title: "Messi JCh-2026 da — barcha gollari", subtitle: "Lionel Messining jahon chempionatidagi eng yaxshi lahzalari.", category: "Gollar", time: "Bugun, 12:30", flag: "🇦🇷" },
  { id: 3, title: "Shomurodov — eng yaxshi momentlar", subtitle: "Eldor Shomurodovning terma jamoadagi eng yorqin o'yinlari.", category: "Futbolchi", time: "Kecha, 19:00", flag: "🇺🇿" },
  { id: 4, title: "Braziliya vs Germaniya: klassik qayta ko'rish", subtitle: "Jahon chempionatlari tarixidagi eng yodda qolarli o'yinlardan biri.", category: "Klassik", time: "Kecha, 16:45", flag: "🇧🇷" },
  { id: 5, title: "JCh-2026 stadionlari — virtual tur", subtitle: "AQSh, Meksika va Kanadadagi barcha stadionlarni ko'ring.", category: "Stadionlar", time: "2 kun oldin", flag: "🇺🇸" },
  { id: 6, title: "K guruhi tahlili — ekspertlar bahsi", subtitle: "O'zbekiston guruhidagi raqiblar va imkoniyatlar haqida.", category: "Tahlil", time: "2 kun oldin", flag: "🇺🇿" },
  { id: 7, title: "Xusanov — Evropadagi eng yaxshi himoyachi", subtitle: "Abdukodir Xusanovning klubi va terma jamoadagi o'yini.", category: "Futbolchi", time: "3 kun oldin", flag: "🇺🇿" },
  { id: 8, title: "Fransiya terma jamoasi — yangi avlod", subtitle: "Mbappe boshchiligidagi Fransiya JCh-2026 ga qanday tayyorlanmoqda.", category: "Terma jamoa", time: "3 kun oldin", flag: "🇫🇷" },
  { id: 9, title: "JCh-2026 ochilish marosimi — kutilayotganlar", subtitle: "Tarixdagi eng katta ochilish marosimi qanday bo'ladi?", category: "Marosim", time: "4 kun oldin", flag: "🌍" },
  { id: 10, title: "Ispaniya — tiki-taka qaytadimi?", subtitle: "Ispaniya terma jamoasining yangi uslubi va taktikasi.", category: "Tahlil", time: "4 kun oldin", flag: "🇪🇸" },
  { id: 11, title: "Eng chiroyli gollar — JCh tarixi", subtitle: "Jahon chempionatlari tarixidagi top-20 eng go'zal gol.", category: "Gollar", time: "5 kun oldin", flag: "⚽" },
  { id: 12, title: "O'zbekiston yo'li — JCh-2026 ga qanday chiqdik", subtitle: "Saralash bosqichidan final bosqichigacha bo'lgan yo'l.", category: "Tarix", time: "5 kun oldin", flag: "🇺🇿" },
  { id: 13, title: "Ronaldu — so'nggi jahon chempionati?", subtitle: "Kristiano Ronalduning JCh-2026 dagi rejasi va maqsadlari.", category: "Futbolchi", time: "6 kun oldin", flag: "🇵🇹" },
  { id: 14, title: "Angliya — chempion bo'la oladimi?", subtitle: "Angliya terma jamoasining kuchli va zaif tomonlari.", category: "Tahlil", time: "6 kun oldin", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: 15, title: "MetLife Stadium — JCh final maydoni", subtitle: "Final o'yini o'tkaziladigan stadion haqida batafsil.", category: "Stadionlar", time: "1 hafta oldin", flag: "🇺🇸" },
];

const PER_PAGE = 12;

const VideosPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(videoArticles.length / PER_PAGE);
  const paginated = videoArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Barcha videolar — JCh 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {paginated.map((video, i) => (
                <Link
                  key={video.id}
                  href={`/video/${video.id}`}
                  className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                >
                  {/* Image with play icon */}
                  <div className="w-[200px] h-[130px] flex-shrink-0 rounded-xl overflow-hidden relative">
                    <img
                      src={images[(i + (page - 1) * PER_PAGE) % images.length]}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={18} className="text-primary-foreground ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                        <span>{video.time}</span>
                        <span className="text-muted-foreground/40">|</span>
                        <span className="text-primary font-medium">{video.category}</span>
                      </div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-xl">{video.flag}</span>
                        <h3 className="text-[20px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                      </div>
                      <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2 font-body">
                        {video.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground font-body">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">
                        🎬 Video
                      </span>
                      <span className="text-muted-foreground/40">•</span>
                      <span>{video.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-colors ${
                    p === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <GroupStandings />
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
