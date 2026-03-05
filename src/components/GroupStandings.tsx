"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { translateTeamName } from "@/data/teamNamesUzByName";
import { translateRoundName } from "@/data/GroupNameUzTranslate";

interface Props {
  data?: StandingsResponse | null;
}

const GroupStandings = ({ data = null }: Props) => {
  const router = useRouter();
  const groups = data?.response[0]?.league.standings.map((groupArr) => ({
    group: groupArr[0]?.group ?? "",
    teams: groupArr
      .filter((t) => t.team.name !== null)
      .map((t) => ({
        id: t.team.id,
        pos: t.rank,
        name: translateTeamName(t.team.name),
        crest: t.team.logo,
        p: t.all.played,
        w: t.all.win,
        d: t.all.draw,
        l: t.all.lose,
        gd: t.goalsDiff >= 0 ? `+${t.goalsDiff}` : `${t.goalsDiff}`,
        pts: t.points,
        isUzb: t.team.name === "Uzbekistan",
      })),
  })) ?? [];

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Turnir jadvali</span>
        <Link href="/standings" className="more-link">To'liq →</Link>
      </div>

      {!data && (
        <div className="py-8 text-center text-[13px] text-muted-foreground">Ma'lumot yuklanmadi</div>
      )}

      {data && (
        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.group}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-heading font-bold text-muted-foreground uppercase tracking-wider">
                  {translateRoundName(g.group)}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="overflow-x-auto">
              <table className="w-full text-[12px] font-body">
                <thead>
                  <tr className="text-muted-foreground text-[10px]">
                    <th className="text-left pl-1 py-1 font-medium w-4">#</th>
                    <th className="text-left py-1 font-medium">Jamoa</th>
                    <th className="text-center py-1 font-medium w-5">O'</th>
                    <th className="text-center py-1 font-medium w-5">G'</th>
                    <th className="text-center py-1 font-medium w-5">D</th>
                    <th className="text-center py-1 font-medium w-5">M</th>
                    <th className="text-center py-1 font-medium w-7" title="Gol farqi">+/-</th>
                    <th className="text-center pr-1 py-1 font-bold w-5" title="Ochkolar">O</th>
                  </tr>
                </thead>
                <tbody>
                  {g.teams.map((team, i) => (
                    <tr
                      key={`${g.group}-${team.pos}-${team.name}`}
                      onClick={() => router.push(`/wc-team/${team.id}`)}
                      className={`border-t border-border/50 hover:bg-muted/60 cursor-pointer transition-colors ${
                        i < 2 ? "border-l-2 border-l-secondary" : "border-l-2 border-l-transparent"
                      } ${team.isUzb ? "bg-highlight/8 font-semibold" : ""}`}
                    >
                      <td className="pl-1 py-1.5 text-muted-foreground text-[11px]">{team.pos}</td>
                      <td className="py-1.5">
                        <span className="flex items-center gap-1.5">
                          {team.crest && (
                            <img src={team.crest} loading="lazy" alt={team.name} className="w-4 h-4 object-contain" />
                          )}
                          <span className="text-[12px]">{team.name}</span>
                        </span>
                      </td>
                      <td className="text-center py-1.5">{team.p}</td>
                      <td className="text-center py-1.5">{team.w}</td>
                      <td className="text-center py-1.5">{team.d}</td>
                      <td className="text-center py-1.5">{team.l}</td>
                      <td className="text-center py-1.5">{team.gd}</td>
                      <td className="text-center pr-1 py-1.5 font-bold">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupStandings;
