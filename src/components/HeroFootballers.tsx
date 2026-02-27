import { Link } from "react-router-dom";
import { heroFootballers } from "@/data/mockData";
import { Trophy, ArrowRight } from "lucide-react";
import footballer1 from "@/assets/footballer-1.png";
import footballer2 from "@/assets/footballer-2.jpg";
import footballer3 from "@/assets/footballer-3.jpg";
import footballer4 from "@/assets/footballer-4.jpg";
import footballer5 from "@/assets/footballer-5.jpg";
import footballer6 from "@/assets/footballer-6.jpg";
import footballer7 from "@/assets/footballer-7.jpg";
import footballer8 from "@/assets/footballer-8.jpg";
import footballer9 from "@/assets/footballer-9.jpg";
import footballer10 from "@/assets/footballer-10.jpg";
import footballer11 from "@/assets/footballer-11.jpg";

const portraits = [footballer1, footballer2, footballer3, footballer4, footballer5, footballer6, footballer7, footballer8, footballer9, footballer10, footballer11];

const HeroFootballers = () => {
  const featured = heroFootballers[0];
  const rest = heroFootballers.slice(1);

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>O'zbek qahramonlari</span>
      </div>

      {/* Featured player - large card */}
      <Link to={`/footballer/${featured.id}`} className="relative rounded-xl overflow-hidden cursor-pointer group mb-3 block">
        <div className="aspect-[3/4] w-full">
          <img
            src={portraits[0]}
            alt={featured.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-heading font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
          <Trophy size={10} />
          #{featured.number} · {featured.position}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-highlight text-[11px] font-bold font-body mb-1">{featured.club}</div>
          <h3 className="text-white font-heading font-extrabold text-lg leading-tight mb-1.5">
            {featured.name}
          </h3>
          <p className="text-white/80 text-[13px] font-body leading-snug mb-2">
            {featured.headline}
          </p>
          <div className="flex items-center gap-1.5 text-highlight text-[12px] font-bold font-body group-hover:gap-2.5 transition-all">
            Maqolani o'qish <ArrowRight size={13} />
          </div>
        </div>
      </Link>

      {/* Other players - compact list */}
      <div className="space-y-2">
        {rest.map((player, i) => (
          <Link
            to={`/footballer/${player.id}`}
            key={player.id}
            className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors group"
          >
            {/* Portrait thumbnail */}
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-border group-hover:ring-primary transition-colors">
              <img
                src={portraits[i + 1]}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-heading font-bold text-foreground leading-tight group-hover:text-primary transition-colors truncate">
                {player.name}
              </h4>
              <p className="text-[11px] text-muted-foreground font-body truncate mt-0.5">
                {player.headline}
              </p>
            </div>

            {/* Stats badge */}
            <div className="flex-shrink-0 text-center">
              <div className="text-[15px] font-heading font-extrabold text-primary">{player.goals}</div>
              <div className="text-[9px] text-muted-foreground font-body uppercase">gol</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Button */}
      <Link
        to="/teams"
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-background border border-border text-foreground text-[13px] font-heading font-bold hover:bg-muted transition-colors"
      >
        Barchasi <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default HeroFootballers;
