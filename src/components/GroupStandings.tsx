import { groupStandings } from "@/data/mockData";

const GroupStandings = () => {
  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Turnir jadvali</span>
        <a href="#" className="more-link">To'liq →</a>
      </div>

      <div className="space-y-4 overflow-y-auto pr-1 scrollbar-thin">
        {groupStandings.map((g) => (
          <div key={g.group}>
            {/* Group header */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-heading font-bold text-muted-foreground uppercase tracking-wider">
                {g.group} guruh
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <table className="w-full text-[12px] font-body">
              <thead>
                <tr className="text-muted-foreground text-[10px]">
                  <th className="text-left pl-1 py-1 font-medium w-4">#</th>
                  <th className="text-left py-1 font-medium">Jamoa</th>
                  <th className="text-center py-1 font-medium w-5">O'</th>
                  <th className="text-center py-1 font-medium w-5">G'</th>
                  <th className="text-center py-1 font-medium w-5">D</th>
                  <th className="text-center py-1 font-medium w-5">M</th>
                  <th className="text-center py-1 font-medium w-7">FT</th>
                  <th className="text-center pr-1 py-1 font-bold w-5">O</th>
                </tr>
              </thead>
              <tbody>
                {g.teams.map((team, i) => (
                  <tr
                    key={team.name}
                    className={`border-t border-border/50 hover:bg-muted/60 cursor-pointer transition-colors ${
                      i < 2 ? "border-l-2 border-l-secondary" : "border-l-2 border-l-transparent"
                    } ${team.flag === "🇺🇿" ? "bg-highlight/8 font-semibold" : ""}`}
                  >
                    <td className="pl-1 py-1.5 text-muted-foreground text-[11px]">{team.pos}</td>
                    <td className="py-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="text-xs">{team.flag}</span>
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
        ))}
      </div>
    </div>
  );
};

export default GroupStandings;
