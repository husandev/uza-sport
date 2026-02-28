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

const images = [photo1.src, photo2.src, photo3.src, photo4.src, hero1.src, hero2.src, hero3.src, hero4.src, hero5.src, stadium1.src];

const categories = ["Tahlil", "Maqola", "Intervyu", "Fentezi", "Stadion", "Transfer", "Natija", ""];

const allNews = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  time: i < 3 ? `${(i + 1) * 5} daqiqa oldin` : i < 10 ? `Bugun, ${21 - i}:${String((i * 17) % 60).padStart(2, "0")}` : i < 20 ? `Kecha, ${18 - (i % 8)}:${String((i * 13) % 60).padStart(2, "0")}` : `${Math.floor(i / 10)} kun oldin`,
  category: categories[i % categories.length],
  title: [
    "O'zbekiston JCh-2026 da qanday o'ynaydi? Taktik tahlil",
    "Shomurodov Argentinaga gol urdi — bu tarixiy lahza",
    "Xusanov Manchester Siti safida JCh-2026 ga tayyorlanmoqda",
    "48 jamoali format: qanday o'zgarishlar kutilmoqda?",
    "MetLife Stadium — final mezboni. Eksklyuziv reportaj",
    "Mbappe JCh-2026 da yulduz bo'la oladimi?",
    "Eldor Shomurodov: «Biz tarixni yozishga tayyormiz»",
    "Chipta narxlari va xarid yo'llari — to'liq qo'llanma",
    "Guruh bosqichi taqvimi e'lon qilindi",
    "JCh-2026 fentezi ligasi — qanday ishtirok etish mumkin?",
    "Argentina terma jamoasi 26 nafar futbolchini e'lon qildi",
    "Fransiya Ispaniyani yirik hisobda mag'lub etdi",
    "FIFA yangi qoidalarni e'lon qildi — VAR tizimi yangilandi",
    "Braziliya va Germaniya — B guruhning asosiy favoritlari",
    "Nyu-Yorkda JCh-2026 boshlanishiga 100 kun qoldi",
    "O'zbekiston terma jamoasi ochiq mashg'ulot o'tkazdi",
    "Abduqodir Xusanov — JCh ning eng yaxshi himoyachisi",
    "Meksika stadionlari tayyor — ichki ko'rinish",
    "Terma jamoa safiga yangi futbolchilar chaqirildi",
    "JCh-2026 rasmiy to'pi taqdim etildi",
    "Volontyorlar dasturi ishga tushirildi",
    "Kubok shaharma-shahar sayohat qilmoqda",
    "Muxlislar festivali Nyu-Yorkda boshlandi",
    "Stadion ichidan eksklyuziv suratlar",
    "O'zbekiston — Kolumbiya: kutilayotgan duel",
    "Ronaldu JCh-2026 da so'nggi mavsumini o'taydi",
    "Superliga 2026 — yangi mavsum boshlanmoqda",
    "FIFA reytingi yangilandi — O'zbekiston ko'tarildi",
    "Jamoa kapitanlari uchrashuvi bo'lib o'tdi",
    "JCh-2026 medallari dizayni taqdim etildi",
  ][i % 30],
  subtitle: [
    "Hujum va himoya taktikalari.",
    "Tarixiy natija.",
    "Transfer va tayyorgarlik.",
    "Yangi format haqida.",
    "Stadion tayyor.",
    "Favoritlar haqida.",
    "To'liq intervyu.",
    "Qanday xarid qilish mumkin.",
    "Taqvim tayyor.",
    "Dedlayn — juma kuni.",
  ][i % 10],
  fires: ((i * 37 + 11) % 90) + 3,
}));

const PER_PAGE = 15;

const NewsPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allNews.length / PER_PAGE);
  const paginatedNews = allNews.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>


      <div className="container pt-4 pb-8">
        <div className="mb-5">
          <div className="section-title">
            <span>Barcha yangiliklar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Articles list */}
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {paginatedNews.map((article, i) => (
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

export default NewsPage;
