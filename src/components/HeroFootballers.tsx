"use client";

import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { useAthletes } from "@/hooks/queries";

const HeroFootballers = () => {
  const { data, isLoading } = useAthletes();
  const athletes = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-muted rounded mb-3 mt-2" />
        <div className="aspect-[3/4] w-full bg-muted rounded-xl mb-3" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="w-14 h-14 rounded-full bg-muted flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-2.5 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (athletes.length === 0) return null;

  const sorted = [...athletes].sort(
    (a, b) =>
      Number(b.national_team_goals ?? 0) - Number(a.national_team_goals ?? 0),
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>O'zbek qahramonlari</span>
      </div>

      {/* Featured player - large card */}
      <Link
        href={`/footballer/${featured.slug}`}
        className="relative rounded-xl overflow-hidden cursor-pointer group mb-3 block"
      >
        <div className="aspect-[3/4] w-full">
          <img
            src={featured.file?.thumbnails?.normal?.src}
            loading="lazy"
            alt={featured.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-heading font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
          <Trophy size={10} />#{featured.number} · {featured.position}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-highlight text-[11px] font-bold font-body mb-1">
            {featured.current_club}
          </div>
          <h3 className="text-white font-heading font-extrabold text-lg leading-tight mb-1.5">
            {featured.name}
          </h3>
          <p className="text-white/80 text-[13px] font-body leading-snug mb-2">
            {featured.position}
          </p>
          <div className="flex items-center gap-1.5 text-highlight text-[12px] font-bold font-body group-hover:gap-2.5 transition-all">
            Maqolani o'qish <ArrowRight size={13} />
          </div>
        </div>
      </Link>

      {/* Other players - compact list */}
      <div className="space-y-2">
        {rest.map((player) => (
          <Link
            href={`/footballer/${player.slug}`}
            key={player.id}
            className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors group"
          >
            {/* Portrait thumbnail */}
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-border group-hover:ring-primary transition-colors">
              <img
                src={player.file?.thumbnails?.normal?.src}
                loading="lazy"
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-heading font-bold text-foreground leading-tight group-hover:text-primary transition-colors truncate">
                {player.name}
              </h4>
              <p className="text-[11px] text-muted-foreground font-body truncate mt-0.5">
                {player.current_club}
              </p>
            </div>

            {/* Stats badge */}
            <div className="flex-shrink-0 text-center">
              <div className="text-[15px] font-heading font-extrabold text-primary">
                {player.national_team_goals}
              </div>
              <div className="text-[9px] text-muted-foreground font-body uppercase">
                gol
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Button */}
      <Link
        href="/teams"
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-background border border-border text-foreground text-[13px] font-heading font-bold hover:bg-muted transition-colors"
      >
        Barchasi <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default HeroFootballers;
