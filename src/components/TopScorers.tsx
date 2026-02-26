import { topScorers } from "@/data/mockData";

const TopScorers = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">Bombardirlar</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="text-muted-foreground border-b border-border">
            <th className="text-left pl-3 pr-1 py-1.5 font-medium w-6">#</th>
            <th className="text-left px-1 py-1.5 font-medium">Futbolchi</th>
            <th className="text-center px-1 py-1.5 font-medium w-8">G</th>
            <th className="text-center pr-3 pl-1 py-1.5 font-medium w-8">A</th>
          </tr>
        </thead>
        <tbody>
          {topScorers.map((player) => (
            <tr
              key={player.pos}
              className={`border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer ${
                player.name === "E. Shomurodov" ? "bg-highlight/8 font-semibold" : ""
              }`}
            >
              <td className="pl-3 pr-1 py-1.5 font-medium text-muted-foreground">{player.pos}</td>
              <td className="px-1 py-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{player.flag}</span>
                  <span className="text-foreground">{player.name}</span>
                </span>
              </td>
              <td className="text-center px-1 py-1.5 font-bold">{player.goals}</td>
              <td className="text-center pr-3 pl-1 py-1.5">{player.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScorers;
