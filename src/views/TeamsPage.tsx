"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { groupStandings } from "@/data/mockData";
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

// Build all teams from groupStandings with articles
const allTeams = groupStandings.flatMap((g) =>
  g.teams.map((team) => ({
    flag: team.flag,
    name: team.name,
    group: g.group,
  }))
);

const teamArticles = allTeams.map((team, i) => ({
  id: i + 1,
  flag: team.flag,
  name: team.name,
  group: team.group,
  title: [
    `${team.name} terma jamoasi: JCh-2026 ga tayyorgarlik`,
    `${team.name}: guruh bosqichida nimalar kutilmoqda?`,
    `${team.name} terma jamoasi tarkibi e'lon qilindi`,
    `${team.name}: kuchli va zaif tomonlari tahlili`,
  ][i % 4],
  subtitle: [
    `${team.group} guruhida raqobat qattiq bo'ladi.`,
    `Bosh murabbiy rejasi va taktikasi haqida.`,
    `Futbolchilar ro'yxati va asosiy tarkib.`,
    `Ekspertlar fikri va bashoratlar.`,
  ][i % 4],
  category: `${team.group} guruh`,
  time: [
    "Bugun, 14:00", "Bugun, 12:30", "Kecha, 19:00", "Kecha, 16:45",
    "2 kun oldin", "2 kun oldin", "3 kun oldin", "3 kun oldin",
  ][i % 8],
}));

const PER_PAGE = 15;

const TeamsPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(teamArticles.length / PER_PAGE);
  const paginated = teamArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <div className="container pt-4 pb-8">
        <div className="mb-5">
          <div className="section-title">
            <span>Barcha jamoalar — JCh 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {paginated.map((team, i) => (
                  <Link
                    key={team.id}
                    href={`/team/${team.id - 1}`}
                    className="px-5 sm:px-6 py-5 flex gap-5 cursor-pointer hover:bg-muted/40 transition-colors group block"
                  >
                    {/* Image */}
                    <div className="w-[200px] h-[130px] flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={images[(i + (page - 1) * PER_PAGE) % images.length]}
                        alt={team.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 font-body">
                          <span>{team.time}</span>
                          <span className="text-muted-foreground/40">|</span>
                          <span className="text-primary font-medium">{team.category}</span>
                        </div>
                        <div className="flex items-center gap-2.5 mb-1">
                          <span className="text-xl">{team.flag}</span>
                          <h3 className="text-[20px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {team.title}
                          </h3>
                        </div>
                        <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2 font-body">
                          {team.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground font-body">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold">
                          {team.flag} {team.name}
                        </span>
                        <span className="text-muted-foreground/40">•</span>
                        <span>{team.group} guruh</span>
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
            <GroupStandings data={standings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsPage;
