import { heroFootballers } from "@/data/mockData";

const HeroFootballers = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">O'zbek qahramonlari</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <div className="divide-y divide-border">
        {heroFootballers.map((player) => (
          <div
            key={player.id}
            className="px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-heading font-bold text-primary">#{player.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-foreground">{player.name}</h3>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{player.position}</span>
                <span className="text-secondary font-medium">{player.club}</span>
              </div>
            </div>
            <div className="text-center shrink-0">
              <span className="text-sm font-heading font-bold text-foreground">{player.goals}</span>
              <span className="block text-[9px] text-muted-foreground">gol</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFootballers;
