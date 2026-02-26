import { teams } from "@/data/mockData";

const TeamsSection = () => {
  return (
    <div className="bg-card rounded-lg p-4">
      <div className="section-title">
        <span>Терма жамоалар</span>
        <a href="#" className="more-link">Барчаси →</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`flex items-center gap-2.5 p-2.5 rounded-md border border-border cursor-pointer hover:bg-muted transition-colors ${
              team.flag === "🇺🇿" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <span className="text-2xl">{team.flag}</span>
            <div>
              <span className="text-[13px] font-bold font-heading block leading-tight">{team.name}</span>
              <span className="text-[10px] text-muted-foreground">
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
