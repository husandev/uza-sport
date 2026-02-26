import { teams } from "@/data/mockData";

const TeamsSection = () => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="section-title">
        <span>Терма жамоалар</span>
        <a href="#" className="more-link">Барчаси →</a>
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
                {team.group} гуруҳ · #{team.rank}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsSection;
