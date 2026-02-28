"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import stadium1 from "@/assets/stadium-1.jpg";

const images = [hero1.src, hero2.src, hero3.src, hero4.src, hero5.src, photo1.src, photo2.src, photo3.src, photo4.src, stadium1.src];

const allArticles = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  time: i < 3 ? `${(i + 1) * 8} daqiqa oldin` : i < 10 ? `Bugun, ${20 - i}:${String((i * 23) % 60).padStart(2, "0")}` : i < 20 ? `Kecha, ${17 - (i % 7)}:${String((i * 11) % 60).padStart(2, "0")}` : `${Math.floor(i / 10)} kun oldin`,
  category: ["Tahlil", "Sharh", "Intervyu", "Reportaj", "Tarix", "Taktika", "Prognoz", "Obzor"][i % 8],
  title: [
    "O'zbekiston futbolining yangi davri: JCh-2026 ga yo'l",
    "Shomurodov haqida bilmagan 10 ta fakt",
    "Xusanov — Yevropa futbolining yangi yulduzi",
    "JCh-2026 guruh bosqichi: kim kimga qarshi?",
    "MetLife Stadium: final uchun mukammal maydon",
    "Mbappe vs Haaland: kim yaxshiroq?",
    "O'zbekiston terma jamoasi: kuchli va zaif tomonlar",
    "FIFA reytingi nima uchun muhim?",
    "JCh-2026 da qo'llaniladigan yangi qoidalar",
    "Terma jamoa bosh murabbiyi strategiyasi",
    "Argentinaning JCh-2026 dagi maqsadlari",
    "Braziliya futboli: an'ana va zamonaviylik",
    "Stadionlar arxitekturasi: sport va san'at",
    "Futbolda VAR tizimi: foyda va zarar",
    "O'zbekiston — Kolumbiya: duel tahlili",
    "JCh tarixidagi eng yodda qolarli finallar",
    "Yosh futbolchilar uchun JCh imkoniyatlari",
    "Evropa chempionlari JCh-2026 da",
    "Afrika futboli: kutilmagan natijalar",
    "Osiyo vakillarining JCh dagi tarixi",
    "Eng kuchli himoya chiziqlari tahlili",
    "Hujum futboli: zamonaviy trendlar",
    "Bosh murabbiylar konfrontatsiyasi",
    "JCh-2026 — raqamlarda",
    "Futbol va texnologiyalar: kelajak qanday?",
    "O'zbekiston muxlislari — eng sodiq muxlislar",
    "Transfer oynasi: JCh oldidan kim qayerga ketdi?",
    "Penalty seriyalari: statistik tahlil",
    "JCh-2026 maskoti va brendi",
    "Futbol diplomatiyasi: sport va siyosat",
  ][i % 30],
  subtitle: [
    "Chuqur tahlil va ekspert fikrlari.",
    "Qiziqarli faktlar va hikoyalar.",
    "Eksklyuziv suhbat.",
    "Joydan reportaj.",
    "Tarixiy lavhalar.",
    "Taktik ko'rib chiqish.",
    "Ekspert bashoratlari.",
    "Batafsil sharh.",
  ][i % 8],
  fires: [45, 89, 23, 67, 12, 34, 56, 78, 15, 41][i % 10],
}));

const PER_PAGE = 15;

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allArticles.length / PER_PAGE);
  const paginated = allArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>


      <div className="container pt-4 pb-8">
        <div className="mb-5">
          <div className="section-title">
            <span>Barcha maqolalar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {paginated.map((article, i) => (
                  <Link
                    key={article.id}
                    href={`/article/${((article.id - 1) % 3) + 1}`}
                    className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                  >
                    <div className="w-[200px] h-[130px] flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={images[(i + (page - 1) * PER_PAGE) % images.length]}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                          <span>{article.time}</span>
                          {article.category && (
                            <>
                              <span className="text-muted-foreground/40">|</span>
                              <span className="text-primary font-medium">{article.category}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-[20px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-2 font-body">
                          {article.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground font-body">
                        {article.fires > 0 && (
                          <span className="flex items-center gap-0.5 text-primary">
                            <Flame size={11} /> {article.fires}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pagination */}
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
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
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
          </div>

          {/* Right: Tournament standings */}
          <div className="lg:col-span-4 space-y-4">
            <GroupStandings />
          </div>
        </div>
      </div>

    </>
  );
};

export default ArticlesPage;
