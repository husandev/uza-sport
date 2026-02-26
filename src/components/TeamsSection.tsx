import { teams } from "@/data/mockData";

const TeamsSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Terma jamoalar</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha jamoalar →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`bg-card rounded-lg border border-border p-4 text-center card-hover cursor-pointer ${
                team.name === "O'zbekiston" ? "ring-2 ring-secondary" : ""
              }`}
            >
              <span className="text-4xl block mb-2">{team.flag}</span>
              <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                {team.name}
              </h3>
              <p className="text-xs text-muted-foreground">{team.group}-guruh</p>
              <p className="text-xs text-muted-foreground mt-1">
                FIFA #{team.ranking}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
