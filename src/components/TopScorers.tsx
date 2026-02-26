import { topScorers } from "@/data/mockData";

const TopScorers = () => {
  return (
    <div className="bg-card rounded-lg p-4">
      <div className="section-title">
        <span>Бомбардирлар</span>
        <a href="#" className="more-link">Тўлиқ →</a>
      </div>

      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-muted-foreground text-[11px]">
            <th className="text-left pl-1 py-1.5 font-medium w-5">#</th>
            <th className="text-left py-1.5 font-medium">Футболчи</th>
            <th className="text-center py-1.5 font-medium w-8">Гол</th>
            <th className="text-center pr-1 py-1.5 font-medium w-8">Ас.</th>
          </tr>
        </thead>
        <tbody>
          {topScorers.map((p) => (
            <tr
              key={p.pos}
              className={`border-t border-border hover:bg-muted/60 cursor-pointer transition-colors ${
                p.flag === "🇺🇿" ? "bg-highlight/8 font-semibold" : ""
              }`}
            >
              <td className="pl-1 py-2 text-muted-foreground">{p.pos}</td>
              <td className="py-2">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{p.flag}</span>
                  <span>{p.name}</span>
                </span>
              </td>
              <td className="text-center py-2 font-bold">{p.goals}</td>
              <td className="text-center pr-1 py-2">{p.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScorers;
