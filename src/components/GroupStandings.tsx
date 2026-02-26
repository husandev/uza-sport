import { useState } from "react";
import { groupStandings } from "@/data/mockData";

const GroupStandings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Турнир жадвали</span>
        <a href="#" className="meta-link">Барчаси →</a>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border mb-0">
        {groupStandings.map((g, i) => (
          <button
            key={g.group}
            onClick={() => setActiveTab(i)}
            className={`px-2.5 py-1.5 text-[11px] font-semibold font-heading border-b-2 transition-colors ${
              i === activeTab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {g.group}
          </button>
        ))}
      </div>

      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-muted-foreground border-b border-border">
            <th className="text-left pl-2 pr-1 py-1 font-medium w-5">#</th>
            <th className="text-left px-1 py-1 font-medium">Жамоа</th>
            <th className="text-center px-1 py-1 font-medium w-5">Ў</th>
            <th className="text-center px-1 py-1 font-medium w-5">Ғ</th>
            <th className="text-center px-1 py-1 font-medium w-5">Д</th>
            <th className="text-center px-1 py-1 font-medium w-5">М</th>
            <th className="text-center px-1 py-1 font-medium w-7">ФТ</th>
            <th className="text-center pr-2 pl-1 py-1 font-bold w-5">О</th>
          </tr>
        </thead>
        <tbody>
          {groupStandings[activeTab].teams.map((team, i) => (
            <tr
              key={team.name}
              className={`border-b border-border last:border-0 hover:bg-muted/60 cursor-pointer ${
                i < 2 ? "border-l-2 border-l-secondary" : "border-l-2 border-l-transparent"
              } ${team.flag === "🇺🇿" ? "bg-highlight/10 font-semibold" : ""}`}
            >
              <td className="pl-2 pr-1 py-1.5 text-muted-foreground">{team.pos}</td>
              <td className="px-1 py-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{team.flag}</span>
                  <span>{team.name}</span>
                </span>
              </td>
              <td className="text-center px-1 py-1.5">{team.p}</td>
              <td className="text-center px-1 py-1.5">{team.w}</td>
              <td className="text-center px-1 py-1.5">{team.d}</td>
              <td className="text-center px-1 py-1.5">{team.l}</td>
              <td className="text-center px-1 py-1.5">{team.gd}</td>
              <td className="text-center pr-2 pl-1 py-1.5 font-bold">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupStandings;
