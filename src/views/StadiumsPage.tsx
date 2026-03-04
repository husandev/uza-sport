"use client";
import { useState } from "react";
import Link from "next/link";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { stadiums } from "@/data/mockData";
import Pagination from "@/components/Pagination";
import { ImageOff } from "lucide-react";
import stadium1 from "@/assets/stadium-1.jpg";
import stadium2 from "@/assets/stadium-2.jpg";
import stadium3 from "@/assets/stadium-3.jpg";

const images = [stadium1.src, stadium2.src, stadium3.src];

const stadiumArticles = stadiums.map((s, i) => ({
  id: s.id,
  name: s.name,
  city: s.city,
  capacity: s.capacity,
  country: s.country,
  title: [
    `${s.name}: JCh-2026 ning eng yirik maydonchasi`,
    `${s.name} stadioni – tarix va zamonaviylik`,
    `${s.name}: ${s.city} shahridagi futbol maskani`,
    `${s.name} – JCh-2026 o'yinlariga tayyor`,
  ][i % 4],
  subtitle: [
    `${s.city} shahridagi ushbu stadion ${s.capacity} tomoshabin sig'adi.`,
    `Stadion modernizatsiya qilindi va JCh talablariga javob beradi.`,
    `Eng muhim guruh va pleyoff o'yinlari shu yerda o'tkaziladi.`,
    `Zamonaviy infratuzilma va qulay joylashuv.`,
  ][i % 4],
  time: [
    "Bugun, 14:00", "Bugun, 12:30", "Kecha, 19:00", "Kecha, 16:45",
    "2 kun oldin", "2 kun oldin", "3 kun oldin", "3 kun oldin",
  ][i % 8],
}));

const PER_PAGE = 12;

const StadiumsPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(stadiumArticles.length / PER_PAGE);
  const paginated = stadiumArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Barcha stadionlar — JCh 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {paginated.map((stadium, i) => (
                <Link
                  key={stadium.id}
                  href={`/stadium/${stadium.id}`}
                  className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                >
                  {/* Image */}
                  <div className="w-[90px] sm:w-[160px] lg:w-[200px] h-[68px] sm:h-[110px] lg:h-[130px] flex-shrink-0 rounded-xl overflow-hidden relative bg-muted">
                    <img
                      src={images[(i + (page - 1) * PER_PAGE) % images.length]}
                      loading="lazy"
                      alt={stadium.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
                      <ImageOff size={20} className="text-muted-foreground/30" />
                      <span className="text-[10px] text-muted-foreground/30 font-medium">Rasm yo'q</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                        <span>{stadium.time}</span>
                        <span className="text-muted-foreground/40">|</span>
                        <span className="text-primary font-medium">Stadion</span>
                      </div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-xl">{stadium.country}</span>
                        <h3 className="text-[14px] sm:text-[18px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {stadium.title}
                        </h3>
                      </div>
                      <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2 font-body">
                        {stadium.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground font-body">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">
                        🏟️ {stadium.capacity} o'rin
                      </span>
                      <span className="text-muted-foreground/40">•</span>
                      <span>{stadium.country} {stadium.city}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default StadiumsPage;
