"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Flag, Award, Activity, AlertTriangle } from "lucide-react";
import { WCPlayerResponse } from "@/lib/football";
import { translateTeamName } from "@/data/teamNamesUzByName";

const POSITION_UZ: Record<string, string> = {
  Goalkeeper: "Darvozabon",
  Defender: "Himoyachi",
  Midfielder: "Yarim himoyachi",
  Attacker: "Hujumchi",
};

const MONTHS = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];

function fmtBirth(dateStr: string | null) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

interface Props {
  playerId: number;
  playerData: WCPlayerResponse | null;
}

const WCPlayerPage = ({ playerData }: Props) => {
  const entry = playerData?.response[0];
  const player = entry?.player;
  const stats = entry?.statistics ?? [];
  const mainStat = stats[0];
  const teamId = mainStat?.team.id;
  const teamName = mainStat ? translateTeamName(mainStat.team.name) : null;
  const positionUz = mainStat ? (POSITION_UZ[mainStat.games.position] ?? mainStat.games.position) : null;

  if (!player) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-8 text-center">
        <p className="text-muted-foreground text-[14px]">O'yinchi ma'lumoti topilmadi</p>
        <Link href="/" className="text-primary text-[13px] mt-3 inline-block hover:underline">
          ← Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-4 pb-8">
      {/* Back */}
      {teamId && (
        <Link
          href={`/wc-team/${teamId}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary transition-colors mb-4 font-body"
        >
          <ArrowLeft size={13} /> {teamName ?? "Jamoaga qaytish"}
        </Link>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main */}
        <div className="lg:col-span-8 space-y-5">

          {/* Hero */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
              {/* Watermark */}
              <div
                className="absolute right-4 bottom-0 font-heading font-black text-white/[0.06] select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(100px,18vw,180px)" }}
              >
                {mainStat?.games.position?.[0] ?? "?"}
              </div>

              <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-5 px-6 pt-8 pb-6">
                {/* Photo */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-primary-foreground/20 flex-shrink-0 bg-primary/30">
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=1a2744&color=fff&size=144`;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="text-center sm:text-left pb-1">
                  {positionUz && (
                    <span className="inline-block bg-highlight text-foreground text-[10px] font-heading font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                      {positionUz}
                    </span>
                  )}
                  <h1 className="text-primary-foreground font-heading font-extrabold text-2xl sm:text-[34px] leading-[1.05] tracking-tight drop-shadow-lg">
                    {player.name}
                  </h1>
                  <p className="text-primary-foreground/60 text-[13px] font-body mt-1">
                    {player.firstname} {player.lastname}
                  </p>
                  {teamName && (
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                      {mainStat?.team.logo && (
                        <img src={mainStat.team.logo} alt={teamName} className="w-5 h-5 object-contain" />
                      )}
                      <span className="text-primary-foreground/80 text-[13px] font-semibold">{teamName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats bar */}
            {mainStat && (
              <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
                {[
                  { label: "O'yinlar", value: mainStat.games.appearences ?? 0 },
                  { label: "Gollar", value: mainStat.goals.total ?? 0 },
                  { label: "Uzatmalar", value: mainStat.goals.assists ?? 0 },
                  { label: "Daqiqa", value: mainStat.games.minutes ?? 0 },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center py-3.5 px-2">
                    <span className="text-[20px] font-heading font-extrabold text-foreground leading-none">{s.value}</span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wide mt-1">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detailed stats */}
          {mainStat && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <Activity size={14} className="text-primary" />
                <span className="text-[14px] font-bold text-foreground">Turnir statistikasi</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
                {[
                  { label: "Chiqishlar", value: mainStat.games.appearences ?? 0, icon: "🏟" },
                  { label: "Asosiy tarkib", value: mainStat.games.lineups ?? 0, icon: "📋" },
                  { label: "O'ynagan daqiqa", value: mainStat.games.minutes ?? 0, icon: "⏱" },
                  { label: "Gollar", value: mainStat.goals.total ?? 0, icon: "⚽" },
                  { label: "Uzatmalar", value: mainStat.goals.assists ?? 0, icon: "🅰️" },
                  { label: "Sariq kartalar", value: mainStat.cards.yellow ?? 0, icon: "🟨" },
                  { label: "Qizil kartalar", value: mainStat.cards.red ?? 0, icon: "🟥" },
                ].map((s, i) => (
                  <div key={i} className="bg-muted/40 rounded-xl p-3 flex items-center gap-3">
                    <span className="text-[20px] flex-shrink-0">{s.icon}</span>
                    <div>
                      <div className="text-[18px] font-heading font-extrabold text-foreground leading-none">{s.value}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-5">

          {/* Bio */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Award size={14} className="text-primary" />
              <span className="text-[14px] font-bold text-foreground">Shaxsiy ma'lumotlar</span>
            </div>
            <div className="divide-y divide-border/30">
              {[
                { icon: <Calendar size={12} />, label: "Tug'ilgan sana", value: fmtBirth(player.birth.date) },
                { icon: <MapPin size={12} />, label: "Tug'ilgan joy", value: player.birth.place ?? "—" },
                { icon: <Flag size={12} />, label: "Millati", value: player.nationality },
                { icon: <Award size={12} />, label: "Bo'y", value: player.height ?? "—" },
                { icon: <Award size={12} />, label: "Vazn", value: player.weight ?? "—" },
                { icon: <Activity size={12} />, label: "Yosh", value: `${player.age} yosh` },
                positionUz ? { icon: <Activity size={12} />, label: "Pozitsiya", value: positionUz } : null,
              ].filter(Boolean).map((item, i) => (
                <div key={i} className="px-5 py-2.5 flex items-center gap-3">
                  <span className="text-muted-foreground flex-shrink-0">{item!.icon}</span>
                  <span className="text-[12px] text-muted-foreground flex-1 min-w-0">{item!.label}</span>
                  <span className="text-[13px] font-semibold text-foreground flex-shrink-0 text-right">{item!.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Club stats if multiple teams */}
          {stats.length > 1 && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <AlertTriangle size={14} className="text-primary" />
                <span className="text-[14px] font-bold text-foreground">Boshqa jamoalar</span>
              </div>
              <div className="divide-y divide-border/30">
                {stats.slice(1).map((s, i) => (
                  <div key={i} className="px-5 py-3 flex items-center gap-3">
                    <img src={s.team.logo} alt={s.team.name} className="w-6 h-6 object-contain" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold truncate">{translateTeamName(s.team.name)}</div>
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      {s.goals.total ?? 0} ⚽ {s.goals.assists ?? 0} 🅰️
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to team */}
          {teamId && (
            <Link
              href={`/wc-team/${teamId}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-[13px] font-heading font-bold hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={14} /> {teamName} jamoasiga qaytish
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default WCPlayerPage;
