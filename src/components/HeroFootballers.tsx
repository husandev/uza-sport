import { heroFootballers } from "@/data/mockData";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const avatars = [hero1, hero2, hero3, hero4];

const HeroFootballers = () => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="section-title">
        <span>Ўзбек қаҳрамонлари</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {heroFootballers.map((player, i) => (
          <div
            key={player.id}
            className="relative rounded-xl overflow-hidden cursor-pointer group h-40"
          >
            <img
              src={avatars[i]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="text-primary-foreground font-heading font-bold text-sm leading-tight">
                {player.name}
              </div>
              <div className="text-primary-foreground/60 text-[11px] mt-0.5 font-body">
                {player.position} · <span className="text-highlight font-semibold">{player.club}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-primary-foreground/80 text-[11px] font-medium font-body">
                  #{player.number}
                </span>
                <span className="text-highlight text-[11px] font-bold font-body">
                  {player.goals} гол
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFootballers;
