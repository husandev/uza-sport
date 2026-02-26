import { MapPin, Users } from "lucide-react";
import { stadiums } from "@/data/mockData";
import stadium1 from "@/assets/stadium-1.jpg";
import stadium2 from "@/assets/stadium-2.jpg";
import stadium3 from "@/assets/stadium-3.jpg";

const stadiumImages = [stadium1, stadium2, stadium3];

const StadiumsSection = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Stadionlar</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha stadionlar →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stadiums.map((stadium, i) => (
            <div
              key={stadium.id}
              className="bg-card rounded-lg border border-border overflow-hidden card-hover cursor-pointer group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={stadiumImages[i]}
                  alt={stadium.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-foreground text-base mb-2">
                  {stadium.name}
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {stadium.city}, {stadium.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {stadium.capacity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StadiumsSection;
