import { topScorers } from "@/data/mockData";

const TopScorers = () => {
  return (
    <div className="mt-4">
      <div className="section-bar">
        <span className="section-label">Бомбардирлар</span>
      </div>

      <table className="w-full text-[11px]">
        <thead>
          <tr className="text-muted-foreground">
            <th className="text-left pl-1 py-1 font-medium w-4">#</th>
            <th className="text-left py-1 font-medium">Футболчи</th>
            <th className="text-center py-1 font-medium w-5">Г</th>
            <th className="text-center pr-1 py-1 font-medium w-5">А</th>
          </tr>
        </thead>
        <tbody>
          {topScorers.map((p) => (
            <tr
              key={p.pos}
              className={`border-b border-border last:border-0 hover:bg-muted/60 cursor-pointer ${
                p.flag === "🇺🇿" ? "bg-highlight/10 font-semibold" : ""
              }`}
            >
              <td className="pl-1 py-1 text-muted-foreground">{p.pos}</td>
              <td className="py-1">
                <span className="flex items-center gap-1">
                  <span className="text-xs">{p.flag}</span>
                  <span>{p.name}</span>
                </span>
              </td>
              <td className="text-center py-1 font-bold">{p.goals}</td>
              <td className="text-center pr-1 py-1">{p.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScorers;
