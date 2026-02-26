import { MapPin, Users } from "lucide-react";
import { stadiums } from "@/data/mockData";
import stadium1 from "@/assets/stadium-1.jpg";
import stadium2 from "@/assets/stadium-2.jpg";
import stadium3 from "@/assets/stadium-3.jpg";

const stadiumImages = [stadium1, stadium2, stadium3];

const StadiumsSection = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">Stadionlar</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3 pt-0">
        {stadiums.slice(0, 3).map((stadium, i) => (
          <div key={stadium.id} className="cursor-pointer group">
            <div className="aspect-[3/2] overflow-hidden rounded-sm mb-1.5">
              <img src={stadiumImages[i]} alt={stadium.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-[11px] font-semibold text-foreground leading-tight">{stadium.name}</h3>
            <span className="text-[10px] text-muted-foreground">{stadium.city}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumsSection;
