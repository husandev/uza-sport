import Link from "next/link";
import { ScorersResponse } from "@/hooks/queries/useStandings";
import { translateTeamName } from "@/data/teamNamesUzByName";

interface Props {
  scorers: ScorersResponse | null;
}

const TopScorers = ({ scorers }: Props) => {
  const list = scorers?.response.slice(0, 5) ?? [];

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Bombardirlar</span>
        <Link href="/standings" className="more-link">To'liq →</Link>
      </div>

      {list.length === 0 ? (
        <p className="text-[13px] text-muted-foreground py-3 text-center">
          Turnir boshlanmagan — gollar yo'q
        </p>
      ) : (
        <table className="w-full text-[13px] font-body">
          <thead>
            <tr className="text-muted-foreground text-[11px]">
              <th className="text-left pl-1 py-2 font-medium w-5">#</th>
              <th className="text-left py-2 font-medium">Futbolchi</th>
              <th className="text-center py-2 font-medium w-8">Gol</th>
              <th className="text-center pr-1 py-2 font-medium w-8">As.</th>
            </tr>
          </thead>
          <tbody>
            {list.map((scorer, i) => {
              const stat = scorer.statistics[0];
              const isUzb = stat?.team.name === "Uzbekistan";
              return (
                <tr
                  key={scorer.player.id}
                  className={`border-t border-border hover:bg-muted/60 cursor-pointer transition-colors ${
                    isUzb ? "bg-highlight/8 font-semibold" : ""
                  }`}
                >
                  <td className="pl-1 py-2.5 text-muted-foreground">{i + 1}</td>
                  <td className="py-2.5">
                    <span className="flex items-center gap-1.5">
                      {stat?.team.logo && (
                        <img
                          src={stat.team.logo}
                          alt={stat.team.name}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      <span className={isUzb ? "text-primary" : ""}>{scorer.player.name}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground block pl-5">
                      {stat ? translateTeamName(stat.team.name) : ""}
                    </span>
                  </td>
                  <td className="text-center py-2.5 font-bold">{stat?.goals.total ?? 0}</td>
                  <td className="text-center pr-1 py-2.5 text-muted-foreground">
                    {stat?.goals.assists ?? 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopScorers;
