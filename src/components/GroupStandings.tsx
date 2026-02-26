import { useState } from "react";
import { groupStandings } from "@/data/mockData";

const GroupStandings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="section-title">
        <span>Турнир жадвали</span>
        <a href="#" className="more-link">Тўлиқ →</a>
      </div>

      {/* Group tabs */}
      <div className="flex gap-0 border-b border-border mb-2">
        {groupStandings.map((g, i) => (
          <button
            key={g.group}
            onClick={() => setActiveTab(i)}
            className={`px-3 py-2 text-[12px] font-heading font-semibold border-b-2 transition-colors ${
              i === activeTab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {g.group}
          </button>
        ))}
      </div>

      <table className="w-full text-[13px] font-body">
        <thead>
          <tr className="text-muted-foreground text-[11px]">
            <th className="text-left pl-1 py-2 font-medium w-5">#</th>
            <th className="text-left py-2 font-medium">Жамоа</th>
            <th className="text-center py-2 font-medium w-6">Ў</th>
            <th className="text-center py-2 font-medium w-6">Ғ</th>
            <th className="text-center py-2 font-medium w-6">Д</th>
            <th className="text-center py-2 font-medium w-6">М</th>
            <th className="text-center py-2 font-medium w-8">ФТ</th>
            <th className="text-center pr-1 py-2 font-bold w-6">О</th>
          </tr>
        </thead>
        <tbody>
          {groupStandings[activeTab].teams.map((team, i) => (
            <tr
              key={team.name}
              className={`border-t border-border hover:bg-muted/60 cursor-pointer transition-colors ${
                i < 2 ? "border-l-2 border-l-secondary" : "border-l-2 border-l-transparent"
              } ${team.flag === "🇺🇿" ? "bg-highlight/8 font-semibold" : ""}`}
            >
              <td className="pl-1 py-2.5 text-muted-foreground">{team.pos}</td>
              <td className="py-2.5">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{team.flag}</span>
                  <span className="text-[13px]">{team.name}</span>
                </span>
              </td>
              <td className="text-center py-2.5">{team.p}</td>
              <td className="text-center py-2.5">{team.w}</td>
              <td className="text-center py-2.5">{team.d}</td>
              <td className="text-center py-2.5">{team.l}</td>
              <td className="text-center py-2.5">{team.gd}</td>
              <td className="text-center pr-1 py-2.5 font-bold">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupStandings;
