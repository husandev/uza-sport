import { groupStandings } from "@/data/mockData";

const GroupStandings = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Turnir jadvali</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha guruhlar →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupStandings.map((group) => (
            <div key={group.group} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="bg-primary px-4 py-3">
                <h3 className="text-sm font-bold font-heading text-primary-foreground">
                  {group.group}
                </h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left px-4 py-2 font-medium">#</th>
                    <th className="text-left px-4 py-2 font-medium">Jamoa</th>
                    <th className="text-center px-2 py-2 font-medium">O</th>
                    <th className="text-center px-2 py-2 font-medium">G</th>
                    <th className="text-center px-2 py-2 font-medium">D</th>
                    <th className="text-center px-2 py-2 font-medium">M</th>
                    <th className="text-center px-2 py-2 font-medium">FT</th>
                    <th className="text-center px-2 py-2 font-medium font-bold">O</th>
                  </tr>
                </thead>
                <tbody>
                  {group.teams.map((team, i) => (
                    <tr
                      key={team.name}
                      className={`border-b border-border last:border-0 ${
                        i < 2 ? "bg-secondary/5" : ""
                      } ${team.name === "O'zbekiston" ? "bg-highlight/10 font-semibold" : ""}`}
                    >
                      <td className="px-4 py-2.5 font-medium">{team.pos}</td>
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{team.flag}</span>
                          {team.name}
                        </span>
                      </td>
                      <td className="text-center px-2 py-2.5">{team.played}</td>
                      <td className="text-center px-2 py-2.5">{team.won}</td>
                      <td className="text-center px-2 py-2.5">{team.drawn}</td>
                      <td className="text-center px-2 py-2.5">{team.lost}</td>
                      <td className="text-center px-2 py-2.5">{team.gd}</td>
                      <td className="text-center px-2 py-2.5 font-bold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupStandings;
