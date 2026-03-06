"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Shield, Target, Info, Users } from "lucide-react";
import {
  StandingsResponse,
  ScorersResponse,
} from "@/hooks/queries/useStandings";
import { FixturesResponse } from "@/hooks/queries/useFixtures";
import { TeamInfoResponse, SquadResponse } from "@/lib/football";
import { translateTeamName } from "@/data/teamNamesUzByName";
import { translateRoundName } from "@/data/GroupNameUzTranslate";
import { translateVenueName } from "@/data/StadiumUzTranslate";
import { cn } from "@/lib/utils";

const FINISHED = ["FT", "AET", "PEN", "AWD", "WO"];

const MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const POSITION_ORDER = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];
const POSITION_UZ: Record<string, string> = {
  Goalkeeper: "Darvozabonlar",
  Defender: "Himoyachilar",
  Midfielder: "Yarim himoyachilar",
  Attacker: "Hujumchilar",
};

interface Props {
  teamId: number;
  standings: StandingsResponse | null;
  fixtures: FixturesResponse | null;
  scorers: ScorersResponse | null;
  teamInfo: TeamInfoResponse | null;
  squad: SquadResponse | null;
}

const TeamWCPage = ({
  teamId,
  standings,
  fixtures,
  scorers,
  teamInfo,
  squad,
}: Props) => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const info = teamInfo?.response[0];
  const teamName = info ? translateTeamName(info.team.name) : "Noma'lum jamoa";

  // Find group and standing for this team
  const allGroups = standings?.response[0]?.league.standings ?? [];
  const myGroup = allGroups.find((g) => g.some((t) => t.team.id === teamId));
  const myStanding = myGroup?.find((t) => t.team.id === teamId);

  // Fixtures
  const teamFixtures = (fixtures?.response ?? []).filter(
    (f) => f.teams.home.id === teamId || f.teams.away.id === teamId,
  );
  const pastMatches = teamFixtures
    .filter((f) => FINISHED.includes(f.fixture.status.short))
    .sort(
      (a, b) =>
        new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime(),
    );
  const upcomingMatches = teamFixtures
    .filter((f) => !FINISHED.includes(f.fixture.status.short))
    .sort(
      (a, b) =>
        new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime(),
    );
  const displayed = tab === "upcoming" ? upcomingMatches : pastMatches;

  // Team's scorers
  const teamScorers = (scorers?.response ?? []).filter(
    (s) => s.statistics[0]?.team.id === teamId,
  );

  // Squad grouped by position
  const players = squad?.response[0]?.players ?? [];
  const squadByPos = POSITION_ORDER.map((pos) => ({
    pos,
    label: POSITION_UZ[pos] ?? pos,
    players: players.filter((p) => p.position === pos),
  })).filter((g) => g.players.length > 0);

  const statsBar = myStanding
    ? [
        { label: "Ochkolar", value: myStanding.points },
        { label: "O'ynagan", value: myStanding.all.played },
        { label: "G'alaba", value: myStanding.all.win },
        { label: "Durrang", value: myStanding.all.draw },
        { label: "Mag'lubiyat", value: myStanding.all.lose },
        {
          label: "Gollar",
          value: `${myStanding.all.goals.for}:${myStanding.all.goals.against}`,
        },
        {
          label: "Gol farqi",
          value:
            myStanding.goalsDiff >= 0
              ? `+${myStanding.goalsDiff}`
              : myStanding.goalsDiff,
        },
      ]
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      {/* Back */}
      <Link
        href="/standings"
        className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary transition-colors mb-4 font-body"
      >
        <ArrowLeft size={13} /> Turnir jadvaliga qaytish
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* MAIN */}
        <div className="lg:col-span-8 space-y-5">
          {/* Hero card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden flex items-center justify-center py-8 sm:py-10">
              {/* Watermark logo */}
              {info?.team.logo && (
                <img
                  src={info.team.logo}
                  alt=""
                  className="absolute w-72 h-72 object-contain opacity-[0.07] pointer-events-none select-none"
                />
              )}
              <div className="relative flex flex-col sm:flex-row items-center gap-5 px-6">
                {info?.team.logo && (
                  <img
                    src={info.team.logo}
                    alt={teamName}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-2xl"
                  />
                )}
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    {myStanding && (
                      <span className="bg-highlight text-foreground text-[10px] font-heading font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {translateRoundName(myGroup?.[0]?.group ?? "")}
                      </span>
                    )}
                    {myStanding && (
                      <span className="bg-primary-foreground/15 text-primary-foreground text-[10px] font-heading font-bold px-2.5 py-1 rounded-full">
                        {myStanding.rank}-o'rin
                      </span>
                    )}
                  </div>
                  <h1 className="text-primary-foreground font-heading font-extrabold text-2xl sm:text-[36px] leading-[1.05] tracking-tight drop-shadow-lg">
                    {teamName}
                  </h1>
                  {info?.team.country && (
                    <p className="text-primary-foreground/65 text-[13px] font-body mt-1">
                      {info.team.country}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats bar */}
            {statsBar.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-7 divide-x divide-border border-t border-border">
                {statsBar.map((s, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center py-3.5 px-2",
                      i >= 4 && "hidden sm:flex",
                    )}
                  >
                    <span className="text-[20px] font-heading font-extrabold text-foreground leading-none">
                      {s.value}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wide mt-1 text-center">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Group table */}
          {myGroup && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <Shield size={14} className="text-primary" />
                <span className="text-[14px] font-bold text-foreground">
                  {translateRoundName(myGroup[0]?.group ?? "")} — guruh jadvali
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="text-muted-foreground text-[11px] border-b border-border/50 bg-muted/30">
                      <th className="text-left pl-5 py-2.5 font-semibold w-8">
                        #
                      </th>
                      <th className="text-left py-2.5 font-semibold min-w-[110px]">Jamoa</th>
                      <th className="text-center py-2.5 font-semibold w-10">
                        O'
                      </th>
                      <th className="text-center py-2.5 font-semibold w-10">
                        G'
                      </th>
                      <th className="text-center py-2.5 font-semibold w-10">
                        D
                      </th>
                      <th className="text-center py-2.5 font-semibold w-10">
                        M
                      </th>
                      <th className="text-center py-2.5 font-semibold w-14">
                        Gollar
                      </th>
                      <th className="text-center py-2.5 font-semibold w-10" title="Gol farqi">
                        +/-
                      </th>
                      <th className="text-center pr-5 py-2.5 font-bold w-10" title="Ochkolar">
                        O
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {myGroup.map((t, i) => {
                      const isThis = t.team.id === teamId;
                      const isQualify = i < 2;
                      return (
                        <tr
                          key={t.team.id}
                          className={cn(
                            "hover:bg-muted/50 transition-colors cursor-pointer",
                            isThis && "bg-primary/5",
                          )}
                          onClick={() =>
                            (window.location.href = `/wc-team/${t.team.id}`)
                          }
                        >
                          <td className="pl-5 py-3">
                            <div className="flex items-center gap-1.5">
                              <div
                                className={cn(
                                  "w-1 h-5 rounded-full",
                                  isQualify ? "bg-secondary" : "bg-transparent",
                                )}
                              />
                              <span
                                className={cn(
                                  "text-[12px] font-bold",
                                  isQualify
                                    ? "text-foreground"
                                    : "text-muted-foreground",
                                )}
                              >
                                {t.rank}
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              {t.team.logo && (
                                <img
                                  src={t.team.logo}
                                  alt={t.team.name}
                                  loading="lazy"
                                  className="w-5 h-5 object-contain"
                                />
                              )}

                              <span
                                className={cn(
                                  "text-[13px] whitespace-nowrap",
                                  isThis
                                    ? "font-bold text-primary"
                                    : "font-medium text-foreground",
                                )}
                              >
                                {translateTeamName(t.team.name)}
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-3 text-muted-foreground">
                            {t.all.played}
                          </td>
                          <td className="text-center py-3 font-medium">
                            {t.all.win}
                          </td>
                          <td className="text-center py-3 text-muted-foreground">
                            {t.all.draw}
                          </td>
                          <td className="text-center py-3 text-muted-foreground">
                            {t.all.lose}
                          </td>
                          <td className="text-center py-3">
                            {t.all.goals.for}:{t.all.goals.against}
                          </td>
                          <td className="text-center py-3 text-muted-foreground">
                            {t.goalsDiff >= 0 ? `+${t.goalsDiff}` : t.goalsDiff}
                          </td>
                          <td className="text-center pr-5 py-3 font-extrabold text-foreground">
                            {t.points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {squadByPos.length > 0 && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <Users size={14} className="text-primary" />
                <span className="text-[14px] font-bold text-foreground">
                  Jamoa tarkibi
                </span>
                <span className="ml-auto text-[12px] text-muted-foreground">
                  {players.length} o'yinchi
                </span>
              </div>

              <div className="p-4 space-y-5">
                {squadByPos.map(({ pos, label, players: group }) => (
                  <div key={pos}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-heading font-bold text-muted-foreground uppercase tracking-wider">
                        {label}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[11px] text-muted-foreground">
                        {group.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                      {group.map((player) => (
                        <Link
                          key={player.id}
                          href={`/wc-player/${player.id}`}
                          className="group flex flex-col items-center bg-background border border-border rounded-xl p-3 hover:border-primary hover:bg-muted/30 transition-all cursor-pointer"
                        >
                          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 ring-2 ring-border group-hover:ring-primary transition-colors">
                            <img
                              src={player.photo}
                              alt={player.name}
                              loading="lazy"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=1a2744&color=fff&size=64`;
                              }}
                            />
                            {player.number && (
                              <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                                {player.number}
                              </div>
                            )}
                          </div>
                          <span className="text-[12px] font-semibold text-foreground text-center leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {player.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-0.5">
                            {player.age} yosh
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Matches */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Calendar size={14} className="text-primary" />
              <span className="text-[14px] font-bold text-foreground flex-1">
                O'yinlar
              </span>
              <div className="flex gap-1">
                {(["upcoming", "past"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-bold transition-colors",
                      tab === t
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {t === "upcoming" ? "Kelgusi" : "O'tgan"}
                  </button>
                ))}
              </div>
            </div>

            {displayed.length === 0 ? (
              <div className="py-10 text-center text-[13px] text-muted-foreground">
                {tab === "upcoming"
                  ? "Kelgusi o'yinlar yo'q"
                  : "O'tgan o'yinlar yo'q"}
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {displayed.map((f) => {
                  const isHome = f.teams.home.id === teamId;
                  const opponent = isHome ? f.teams.away : f.teams.home;
                  const myGoals = isHome ? f.goals.home : f.goals.away;
                  const oppGoals = isHome ? f.goals.away : f.goals.home;
                  const isDone = FINISHED.includes(f.fixture.status.short);
                  const result =
                    isDone && myGoals !== null && oppGoals !== null
                      ? myGoals > oppGoals
                        ? "G'"
                        : myGoals < oppGoals
                          ? "M"
                          : "D"
                      : null;

                  return (
                    <div
                      key={f.fixture.id}
                      className="px-3 sm:px-5 py-3.5 flex items-center gap-3 hover:bg-muted/30 transition-colors"
                    >
                      {/* Date/time */}
                      <div className="min-w-[48px] text-center flex-shrink-0">
                        <div className="text-[11px] font-semibold text-foreground">
                          {fmtDate(f.fixture.date)}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {fmtTime(f.fixture.date)}
                        </div>
                      </div>

                      {/* Result badge */}
                      {result && (
                        <span
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0",
                            result === "G'"
                              ? "bg-secondary/20 text-secondary"
                              : result === "M"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {result}
                        </span>
                      )}

                      {/* Opponent */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <img
                          src={opponent.logo}
                          alt={opponent.name}
                          loading="lazy"
                          className="w-6 h-6 object-contain flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold truncate text-foreground">
                            {translateTeamName(opponent.name)}
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate">
                            {isHome ? "Uy" : "Mehmon"} ·{" "}
                            {translateRoundName(f.league.round)}
                            {f.fixture.venue.city
                              ? ` · ${translateVenueName(f.fixture.venue.city)}`
                              : ""}
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex-shrink-0 text-right">
                        {isDone ? (
                          <span className="text-[17px] font-extrabold font-heading text-foreground">
                            {myGoals} — {oppGoals}
                          </span>
                        ) : (
                          <span className="text-[13px] font-extrabold font-heading text-muted-foreground">
                            — : —
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Squad */}
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-5">
          {/* Team info */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Info size={14} className="text-primary" />
              <span className="text-[14px] font-bold text-foreground">
                Jamoa haqida
              </span>
            </div>
            <div className="divide-y divide-border/30">
              {[
                { label: "Davlat", value: info?.team.country },
                info?.team.founded
                  ? {
                      label: "Tashkil etilgan",
                      value: `${info.team.founded}-yil`,
                    }
                  : null,
                myGroup
                  ? {
                      label: "Guruh",
                      value: translateRoundName(myGroup[0]?.group ?? ""),
                    }
                  : null,
                myStanding
                  ? { label: "O'rin", value: `${myStanding.rank}-o'rin` }
                  : null,
                myStanding
                  ? { label: "Ochkolar", value: myStanding.points }
                  : null,
                myStanding
                  ? {
                      label: "Gol nisbati",
                      value: `${myStanding.all.goals.for}:${myStanding.all.goals.against}`,
                    }
                  : null,
                myStanding
                  ? {
                      label: "Gol farqi",
                      value:
                        myStanding.goalsDiff >= 0
                          ? `+${myStanding.goalsDiff}`
                          : myStanding.goalsDiff,
                    }
                  : null,
              ]
                .filter(Boolean)
                .map((item, i) => (
                  <div
                    key={i}
                    className="px-5 py-2.5 flex items-center justify-between"
                  >
                    <span className="text-[12px] text-muted-foreground">
                      {item!.label}
                    </span>
                    <span className="text-[13px] font-semibold text-foreground">
                      {item!.value}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Team scorers */}
          {teamScorers.length > 0 && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <Target size={14} className="text-primary" />
                <span className="text-[14px] font-bold text-foreground">
                  Jamoa bombardirlari
                </span>
              </div>
              <div className="divide-y divide-border/30">
                {teamScorers.map((s, i) => (
                  <Link
                    key={s.player.id}
                    href={`/wc-player/${s.player.id}`}
                    className="px-5 py-3 flex items-center gap-3 hover:bg-muted/40 transition-colors"
                  >
                    <span
                      className={cn(
                        "text-[12px] w-5 text-center font-bold flex-shrink-0",
                        i < 3 ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold truncate text-foreground">
                        {s.player.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] flex-shrink-0">
                      <span className="font-bold text-foreground">
                        {s.statistics[0]?.goals.total ?? 0} ⚽
                      </span>
                      <span className="text-muted-foreground">
                        {s.statistics[0]?.goals.assists ?? 0} 🅰️
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All matches count */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <div className="text-[22px] font-heading font-extrabold text-foreground">
                  {pastMatches.length}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                  O'tgan o'yin
                </div>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <div className="text-[22px] font-heading font-extrabold text-foreground">
                  {upcomingMatches.length}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                  Kelgusi o'yin
                </div>
              </div>
              {myStanding && (
                <>
                  <div className="bg-secondary/10 rounded-xl p-3 text-center">
                    <div className="text-[22px] font-heading font-extrabold text-secondary">
                      {myStanding.all.win}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                      G'alaba
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-3 text-center">
                    <div className="text-[22px] font-heading font-extrabold text-primary">
                      {myStanding.points}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                      Ochkolar
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamWCPage;
