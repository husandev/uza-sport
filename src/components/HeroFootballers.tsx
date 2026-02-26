import { heroFootballers } from "@/data/mockData";

const HeroFootballers = () => {
  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Ўзбек қаҳрамонлари</span>
        <a href="#" className="meta-link">Барчаси →</a>
      </div>

      <div className="space-y-0">
        {heroFootballers.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-2.5 py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/60 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/30 to-primary/15 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-heading font-bold text-primary">#{player.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-semibold text-foreground block">{player.name}</span>
              <span className="text-[10px] text-muted-foreground">{player.position} · <span className="text-secondary font-medium">{player.club}</span></span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-heading font-bold text-foreground">{player.goals}</span>
              <span className="block text-[9px] text-muted-foreground">гол</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFootballers;
