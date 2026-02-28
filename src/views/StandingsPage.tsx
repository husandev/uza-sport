"use client";
import { useState } from "react";
import { topScorers } from "@/data/mockData";
import { Trophy, Target, Users } from "lucide-react";
import { StandingsResponse } from "@/hooks/queries/useStandings";

const StandingsPage = ({ data }: { data: StandingsResponse | null }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const groups = data?.standings
    .filter((s) => s.type === "TOTAL")
    .map((s) => ({
      group: s.group.replace("Group ", ""),
      teams: s.table
        .filter((t) => t.team.name !== null)
        .map((t) => ({
          pos: t.position,
          crest: t.team.crest,
          name: t.team.shortName ?? t.team.name ?? "—",
          tla: t.team.tla ?? "",
          p: t.playedGames,
          w: t.won,
          d: t.draw,
          l: t.lost,
          gollar: `${t.goalsFor}:${t.goalsAgainst}`,
          gd: t.goalDifference >= 0 ? `+${t.goalDifference}` : `${t.goalDifference}`,
          pts: t.points,
          isUzb: t.team.tla === "UZB",
        })),
    })) ?? [];

  const allGroups = groups.map((g) => g.group);
  const filtered = selectedGroup ? groups.filter((g) => g.group === selectedGroup) : groups;

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Turnir jadvali — JCh 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Full standings */}
        <div className="lg:col-span-8 space-y-4">

          {!data && (
            <div className="bg-card rounded-2xl shadow-sm p-10 text-center text-[14px] text-muted-foreground">
              Ma'lumot yuklanmadi. Qaytadan urinib ko'ring.
            </div>
          )}

          {data && (
            <>
              {/* Group filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-bold whitespace-nowrap transition-colors ${
                    selectedGroup === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  }`}
                >
                  Barcha guruhlar
                </button>
                {allGroups.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGroup(g)}
                    className={`px-3.5 py-2 rounded-lg text-[13px] font-bold whitespace-nowrap transition-colors ${
                      selectedGroup === g
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Groups */}
              {filtered.map((g) => (
                <div key={g.group} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                    <Trophy size={14} className="text-primary" />
                    <span className="text-[14px] font-bold text-foreground">{g.group} guruh</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px] font-body">
                      <thead>
                        <tr className="text-muted-foreground text-[11px] border-b border-border/50 bg-muted/30">
                          <th className="text-left pl-5 py-2.5 font-semibold w-8">#</th>
                          <th className="text-left py-2.5 font-semibold">Jamoa</th>
                          <th className="text-center py-2.5 font-semibold w-10">O'</th>
                          <th className="text-center py-2.5 font-semibold w-10">G'</th>
                          <th className="text-center py-2.5 font-semibold w-10">D</th>
                          <th className="text-center py-2.5 font-semibold w-10">M</th>
                          <th className="text-center py-2.5 font-semibold w-14">Gollar</th>
                          <th className="text-center py-2.5 font-semibold w-10">FT</th>
                          <th className="text-center pr-5 py-2.5 font-bold w-12">O</th>
                        </tr>
                      </thead>
                      <tbody>
                        {g.teams.map((team, i) => {
                          const isQualify = i < 2;
                          return (
                            <tr
                              key={`${g.group}-${team.pos}-${team.name}`}
                              className={`border-t border-border/30 hover:bg-muted/40 transition-colors cursor-pointer ${
                                team.isUzb ? "bg-primary/5" : ""
                              }`}
                            >
                              <td className="pl-5 py-3">
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-1 h-5 rounded-full ${isQualify ? "bg-secondary" : "bg-transparent"}`} />
                                  <span className={`text-[12px] ${isQualify ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                                    {team.pos}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="flex items-center gap-2.5">
                                  {team.crest && (
                                    <img src={team.crest} alt={team.name} className="w-5 h-5 object-contain" />
                                  )}
                                  <span className={`text-[13px] ${team.isUzb ? "font-bold text-primary" : "font-medium text-foreground"}`}>
                                    {team.name}
                                  </span>
                                </div>
                              </td>
                              <td className="text-center py-3 text-muted-foreground">{team.p}</td>
                              <td className="text-center py-3 font-medium">{team.w}</td>
                              <td className="text-center py-3 text-muted-foreground">{team.d}</td>
                              <td className="text-center py-3 text-muted-foreground">{team.l}</td>
                              <td className="text-center py-3 text-muted-foreground">{team.gollar}</td>
                              <td className="text-center py-3 text-muted-foreground">{team.gd}</td>
                              <td className="text-center pr-5 py-3">
                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[13px] font-extrabold ${
                                  isQualify ? "bg-secondary/10 text-secondary" : "text-foreground"
                                }`}>
                                  {team.pts}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-5 py-2 border-t border-border/30 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-[10px] text-muted-foreground">Pleyoffga chiqadi</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Top scorers */}
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Target size={14} className="text-primary" />
              <span className="text-[14px] font-bold text-foreground">Eng yaxshi hujumchilar</span>
            </div>
            <div className="divide-y divide-border/30">
              {topScorers.map((scorer) => {
                const isUzb = scorer.flag === "🇺🇿";
                return (
                  <div
                    key={scorer.pos}
                    className={`px-5 py-3 flex items-center gap-3 hover:bg-muted/40 transition-colors cursor-pointer ${
                      isUzb ? "bg-primary/5" : ""
                    }`}
                  >
                    <span className={`text-[12px] w-5 text-center font-bold ${
                      scorer.pos <= 3 ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {scorer.pos}
                    </span>
                    <span className="text-base">{scorer.flag}</span>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[13px] font-semibold ${isUzb ? "text-primary" : "text-foreground"}`}>
                        {scorer.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px]">
                      <span className="font-bold text-foreground">{scorer.goals} ⚽</span>
                      <span className="text-muted-foreground">{scorer.assists} 🅰️</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tournament info */}
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Users size={14} className="text-primary" />
              <span className="text-[14px] font-bold text-foreground">Turnir haqida</span>
            </div>
            <div className="px-5 py-4 space-y-3 text-[13px] font-body">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format</span>
                <span className="font-semibold text-foreground">48 jamoa</span>
              </div>
              <div className="flex justify-between border-t border-border/30 pt-3">
                <span className="text-muted-foreground">Guruhlar</span>
                <span className="font-semibold text-foreground">12 guruh × 4 jamoa</span>
              </div>
              <div className="flex justify-between border-t border-border/30 pt-3">
                <span className="text-muted-foreground">Pleyoffga</span>
                <span className="font-semibold text-foreground">Har guruhdan 2 ta</span>
              </div>
              <div className="flex justify-between border-t border-border/30 pt-3">
                <span className="text-muted-foreground">Boshlanishi</span>
                <span className="font-semibold text-foreground">11 iyun 2026</span>
              </div>
              <div className="flex justify-between border-t border-border/30 pt-3">
                <span className="text-muted-foreground">Final</span>
                <span className="font-semibold text-foreground">19 iyul 2026</span>
              </div>
              <div className="flex justify-between border-t border-border/30 pt-3">
                <span className="text-muted-foreground">Mezbonlar</span>
                <span className="font-semibold text-foreground">🇺🇸🇲🇽🇨🇦</span>
              </div>
            </div>
          </div>

          {/* Legend card */}
          <div className="bg-card rounded-2xl shadow-sm p-5">
            <h4 className="text-[13px] font-bold text-foreground mb-3">Izoh</h4>
            <div className="space-y-2 text-[12px] font-body text-muted-foreground">
              <div className="flex items-center gap-2"><span className="font-semibold text-foreground">O'</span> — O'yinlar soni</div>
              <div className="flex items-center gap-2"><span className="font-semibold text-foreground">G'</span> — G'alabalar</div>
              <div className="flex items-center gap-2"><span className="font-semibold text-foreground">D</span> — Duranglar</div>
              <div className="flex items-center gap-2"><span className="font-semibold text-foreground">M</span> — Mag'lubiyatlar</div>
              <div className="flex items-center gap-2"><span className="font-semibold text-foreground">FT</span> — Farq tafsiloti</div>
              <div className="flex items-center gap-2"><span className="font-semibold text-foreground">O</span> — Ochkolar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsPage;
