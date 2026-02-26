import { useState } from "react";
import { groupStandings } from "@/data/mockData";

const GroupStandings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">Turnir jadvali</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      {/* Group tabs */}
      <div className="flex border-b border-border px-3 gap-0 overflow-x-auto">
        {groupStandings.map((g, i) => (
          <button
            key={g.group}
            onClick={() => setActiveTab(i)}
            className={`px-3 py-1.5 text-[11px] font-semibold font-heading whitespace-nowrap border-b-2 transition-colors ${
              i === activeTab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {g.group}
          </button>
        ))}
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="text-muted-foreground border-b border-border">
            <th className="text-left pl-3 pr-1 py-1.5 font-medium w-6">#</th>
            <th className="text-left px-1 py-1.5 font-medium">Jamoa</th>
            <th className="text-center px-1 py-1.5 font-medium w-6">O</th>
            <th className="text-center px-1 py-1.5 font-medium w-6">G</th>
            <th className="text-center px-1 py-1.5 font-medium w-6">D</th>
            <th className="text-center px-1 py-1.5 font-medium w-6">M</th>
            <th className="text-center px-1 py-1.5 font-medium w-8">FT</th>
            <th className="text-center pr-3 pl-1 py-1.5 font-bold w-6">O</th>
          </tr>
        </thead>
        <tbody>
          {groupStandings[activeTab].teams.map((team, i) => (
            <tr
              key={team.name}
              className={`border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer ${
                i < 2 ? "border-l-2 border-l-secondary" : "border-l-2 border-l-transparent"
              } ${team.name === "O'zbekiston" ? "bg-highlight/8 font-semibold" : ""}`}
            >
              <td className="pl-3 pr-1 py-1.5 font-medium text-muted-foreground">{team.pos}</td>
              <td className="px-1 py-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{team.flag}</span>
                  <span className="text-foreground">{team.name}</span>
                </span>
              </td>
              <td className="text-center px-1 py-1.5">{team.p}</td>
              <td className="text-center px-1 py-1.5">{team.w}</td>
              <td className="text-center px-1 py-1.5">{team.d}</td>
              <td className="text-center px-1 py-1.5">{team.l}</td>
              <td className="text-center px-1 py-1.5">{team.gd}</td>
              <td className="text-center pr-3 pl-1 py-1.5 font-bold">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupStandings;
