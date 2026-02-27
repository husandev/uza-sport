import { topScorers } from "@/data/mockData";

const TopScorers = () => {
  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Bombardirlar</span>
        <a href="#" className="more-link">To'liq →</a>
      </div>

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
          {topScorers.map((p) => (
            <tr
              key={p.pos}
              className={`border-t border-border hover:bg-muted/60 cursor-pointer transition-colors ${
                p.flag === "🇺🇿" ? "bg-highlight/8 font-semibold" : ""
              }`}
            >
              <td className="pl-1 py-2.5 text-muted-foreground">{p.pos}</td>
              <td className="py-2.5">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{p.flag}</span>
                  <span>{p.name}</span>
                </span>
              </td>
              <td className="text-center py-2.5 font-bold">{p.goals}</td>
              <td className="text-center pr-1 py-2.5">{p.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScorers;
