import { Link } from "react-router-dom";
import { teams } from "@/data/mockData";

const TeamsSection = () => {
  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Terma jamoalar</span>
        <Link to="/teams" className="more-link">Barchasi →</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`flex items-center gap-2.5 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted transition-colors ${
              team.flag === "🇺🇿" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <span className="text-2xl">{team.flag}</span>
            <div>
              <span className="text-sm font-bold font-heading block leading-tight">{team.name}</span>
              <span className="text-[11px] text-muted-foreground font-body">
                {team.group} guruh · #{team.rank}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsSection;
