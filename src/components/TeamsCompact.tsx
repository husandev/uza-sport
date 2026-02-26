import { teams } from "@/data/mockData";

const TeamsCompact = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">Terma jamoalar</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <div className="grid grid-cols-4 gap-1 p-3 pt-0">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`text-center py-2 px-1 rounded-sm cursor-pointer hover:bg-muted transition-colors ${
              team.name === "O'zbekiston" ? "bg-highlight/10 ring-1 ring-highlight/30" : ""
            }`}
          >
            <span className="text-2xl block">{team.flag}</span>
            <span className="text-[10px] font-semibold text-foreground block mt-1 leading-tight">{team.name}</span>
            <span className="text-[9px] text-muted-foreground">{team.group}-guruh</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsCompact;
