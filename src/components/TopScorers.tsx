import Link from "next/link";
import { Target } from "lucide-react";
import { ScorersResponse } from "@/hooks/queries/useStandings";
import { translateTeamName } from "@/data/teamNamesUzByName";

interface Props {
  scorers: ScorersResponse | null;
}

const TopScorers = ({ scorers }: Props) => {
  const list = scorers?.response.slice(0, 10) ?? [];

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center gap-2">
        <Target size={14} className="text-primary" />
        <span className="text-[14px] font-bold text-foreground flex-1">Eng yaxshi hujumchilar</span>
        <Link href="/standings" className="more-link">Barchasi →</Link>
      </div>

      {list.length === 0 ? (
        <p className="text-[13px] text-muted-foreground py-4 text-center">
          Turnir boshlanmagan — gollar yo'q
        </p>
      ) : (
        <div className="divide-y divide-border/30">
          {list.map((scorer, i) => {
            const stat = scorer.statistics[0];
            const isUzb = stat?.team.name === "Uzbekistan";
            const isTop3 = i < 3;
            return (
              <Link
                href={`/wc-player/${scorer.player.id}`}
                key={scorer.player.id}
                className={`px-5 py-3 flex items-center gap-3 hover:bg-muted/40 transition-colors ${isUzb ? "bg-primary/5" : ""}`}
              >
                <span className={`text-[12px] w-5 text-center font-bold ${isTop3 ? "text-primary" : "text-muted-foreground"}`}>
                  {i + 1}
                </span>
                {stat?.team.logo && (
                  <img
                    src={stat.team.logo}
                    loading="lazy"
                    alt={stat.team.name}
                    className="w-5 h-5 object-contain"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className={`text-[13px] font-semibold truncate ${isUzb ? "text-primary" : "text-foreground"}`}>
                    {scorer.player.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {stat ? translateTeamName(stat.team.name) : ""}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <span className="font-bold text-foreground">{stat?.goals.total ?? 0} ⚽</span>
                  <span className="text-muted-foreground">{stat?.goals.assists ?? 0} 🅰️</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopScorers;
