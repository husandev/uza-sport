import { topScorers } from "@/data/mockData";

const TopScorers = () => {
  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Бомбардирлар</span>
        <a href="#" className="meta-link">Барчаси →</a>
      </div>

      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-muted-foreground border-b border-border">
            <th className="text-left pl-2 pr-1 py-1 font-medium w-5">#</th>
            <th className="text-left px-1 py-1 font-medium">Футболчи</th>
            <th className="text-center px-1 py-1 font-medium w-7">Г</th>
            <th className="text-center pr-2 pl-1 py-1 font-medium w-7">А</th>
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
              <td className="pl-2 pr-1 py-1.5 text-muted-foreground">{p.pos}</td>
              <td className="px-1 py-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{p.flag}</span>
                  <span>{p.name}</span>
                </span>
              </td>
              <td className="text-center px-1 py-1.5 font-bold">{p.goals}</td>
              <td className="text-center pr-2 pl-1 py-1.5">{p.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScorers;
