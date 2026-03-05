"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Target, ShieldCheck, ArrowRight } from "lucide-react";
import { useAthletes } from "@/hooks/queries";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";

const POSITIONS = ["Barchasi", "Darvozabon", "Himoyachi", "Yarim himoyachi", "Hujumchi"];

const POSITION_ICON: Record<string, React.ReactNode> = {
  Darvozabon: <ShieldCheck size={11} />,
  Himoyachi: <ShieldCheck size={11} />,
  "Yarim himoyachi": <Target size={11} />,
  Hujumchi: <Trophy size={11} />,
};

const HeroesPage = ({ standings }: { standings: StandingsResponse | null }) => {
  const { data, isLoading } = useAthletes();
  const [activePos, setActivePos] = useState("Barchasi");

  const all = data?.data ?? [];

  const featured = all[0];
  const filtered =
    activePos === "Barchasi"
      ? all
      : all.filter((p) => p.position === activePos);

  const gridPlayers = featured
    ? filtered.filter((p) => p.id !== featured.id)
    : filtered;

  if (isLoading) {
    return (
      <div className="container pt-4 pb-8 space-y-4">
        <div className="h-[340px] sm:h-[420px] rounded-2xl bg-muted animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-4 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main content */}
        <div className="lg:col-span-9 space-y-5">

          {/* Hero banner */}
          {featured && activePos === "Barchasi" && (
            <Link
              href={`/footballer/${featured.slug}`}
              className="relative block rounded-2xl overflow-hidden group shadow-xl"
            >
              {/* BG gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />

              {/* Big number watermark */}
              <div
                className="absolute right-[36%] bottom-0 font-heading font-black text-white/[0.06] select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(160px, 22vw, 280px)" }}
              >
                {featured.number}
              </div>

              <div className="relative flex flex-col sm:flex-row items-end sm:items-stretch min-h-[280px] sm:min-h-[360px]">
                {/* Player image */}
                <div className="absolute sm:relative right-0 bottom-0 sm:bottom-auto w-[55%] sm:w-[38%] h-full sm:h-auto">
                  <div className="sm:aspect-[3/4] h-full sm:h-auto relative">
                    {featured.file?.thumbnails?.normal?.src && (
                      <img
                        src={featured.file.thumbnails.normal.src}
                        alt={featured.name}
                        className="w-full h-full object-cover object-top sm:rounded-r-2xl transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    {/* blend left edge */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/20 to-transparent sm:block hidden" />
                    {/* blend bottom on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent sm:hidden" />
                  </div>
                </div>

                {/* Info */}
                <div className="relative z-10 flex-1 flex flex-col justify-end sm:justify-center p-6 sm:p-10 pb-8">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-highlight text-foreground text-[10px] font-heading font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
                      <Trophy size={11} />
                      Eng ko'p gol
                    </span>
                    <span className="text-primary-foreground/60 text-[11px] font-body">
                      #{featured.number} · {featured.position}
                    </span>
                  </div>

                  <h1 className="text-primary-foreground font-heading font-extrabold text-3xl sm:text-4xl lg:text-[52px] leading-[1.0] tracking-tight mb-2 drop-shadow-xl">
                    {featured.name}
                  </h1>
                  <p className="text-primary-foreground/60 text-[13px] font-body mb-6">
                    {featured.full_name}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-5 mb-7">
                    <div>
                      <div className="text-highlight text-[32px] font-heading font-extrabold leading-none">
                        {featured.national_team_goals}
                      </div>
                      <div className="text-primary-foreground/50 text-[11px] font-body uppercase tracking-wide mt-0.5">
                        Terma jamoa gollari
                      </div>
                    </div>
                    <div className="w-px h-10 bg-primary-foreground/20" />
                    <div>
                      <div className="text-primary-foreground text-[32px] font-heading font-extrabold leading-none">
                        {featured.games_count}
                      </div>
                      <div className="text-primary-foreground/50 text-[11px] font-body uppercase tracking-wide mt-0.5">
                        O'yinlar
                      </div>
                    </div>
                    <div className="w-px h-10 bg-primary-foreground/20 hidden sm:block" />
                    <div className="hidden sm:block">
                      <div className="text-primary-foreground text-[20px] font-heading font-extrabold leading-none">
                        {featured.current_club}
                      </div>
                      <div className="text-primary-foreground/50 text-[11px] font-body uppercase tracking-wide mt-0.5">
                        Joriy klub
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-primary-foreground/80 text-[13px] font-heading font-bold group-hover:gap-3 transition-all">
                    Batafsil ko'rish <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Filter bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                onClick={() => setActivePos(pos)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-heading font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                  activePos === pos
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {POSITION_ICON[pos]}
                {pos}
              </button>
            ))}
          </div>

          {/* Players grid */}
          {filtered.length === 0 ? (
            <div className="bg-card rounded-2xl p-10 text-center text-muted-foreground text-[14px]">
              Bu pozitsiyada o'yinchi topilmadi
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* When filter active, show featured too at top */}
              {(activePos !== "Barchasi" ? filtered : gridPlayers).map((player) => (
                <Link
                  key={player.id}
                  href={`/footballer/${player.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  {/* Photo */}
                  <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                    {player.file?.thumbnails?.normal?.src ? (
                      <img
                        src={player.file.thumbnails.normal.src}
                        alt={player.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Jersey number */}
                    <div className="absolute top-2.5 left-2.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-heading font-extrabold px-2 py-1 rounded-lg">
                      #{player.number}
                    </div>

                    {/* Goals badge */}
                    {Number(player.national_team_goals) > 0 && (
                      <div className="absolute top-2.5 right-2.5 bg-highlight/90 backdrop-blur-sm text-foreground text-[10px] font-heading font-extrabold px-2 py-1 rounded-lg flex items-center gap-0.5">
                        ⚽ {player.national_team_goals}
                      </div>
                    )}

                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-highlight text-[9px] font-bold font-body uppercase tracking-wide mb-0.5 truncate">
                        {player.current_club}
                      </div>
                      <h3 className="text-white font-heading font-extrabold text-[13px] leading-tight line-clamp-2 group-hover:text-highlight transition-colors">
                        {player.name}
                      </h3>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground font-body">
                      {player.position}
                    </span>
                    <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-body">
                      <span className="flex items-center gap-0.5">
                        🏟 {player.games_count}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar — desktop */}
        <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-4 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto scrollbar-thin">
          <GroupStandings data={standings} />
        </div>

        {/* Mobile only standings */}
        <div className="lg:hidden lg:col-span-12">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default HeroesPage;
