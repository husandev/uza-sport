import { groupStandings } from "@/data/mockData";

const GroupStandings = () => {
  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Турнир жадвали</span>
      </div>

      {groupStandings.map((group) => (
        <div key={group.group} className="mb-3">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide py-1 border-b border-border font-heading">
            {group.group}
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left pl-1 py-1 font-medium w-4">#</th>
                <th className="text-left py-1 font-medium"></th>
                <th className="text-center py-1 font-medium w-4">И</th>
                <th className="text-center py-1 font-medium w-4">В</th>
                <th className="text-center py-1 font-medium w-4">Н</th>
                <th className="text-center py-1 font-medium w-4">П</th>
                <th className="text-center py-1 font-medium w-8">Мячи</th>
                <th className="text-center pr-1 py-1 font-bold w-4">О</th>
              </tr>
            </thead>
            <tbody>
              {group.teams.map((team, i) => (
                <tr
                  key={team.name}
                  className={`border-b border-border last:border-0 hover:bg-muted/60 cursor-pointer ${
                    team.flag === "🇺🇿" ? "bg-highlight/10 font-semibold" : ""
                  }`}
                >
                  <td className="pl-1 py-1 text-muted-foreground">{team.pos}</td>
                  <td className="py-1">
                    <span className="flex items-center gap-1">
                      <span className="text-xs">{team.flag}</span>
                      <span>{team.name}</span>
                    </span>
                  </td>
                  <td className="text-center py-1">{team.p}</td>
                  <td className="text-center py-1">{team.w}</td>
                  <td className="text-center py-1">{team.d}</td>
                  <td className="text-center py-1">{team.l}</td>
                  <td className="text-center py-1">{team.gd}</td>
                  <td className="text-center pr-1 py-1 font-bold">{team.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GroupStandings;
