import { stadiums } from "@/data/mockData";
import stadium1 from "@/assets/stadium-1.jpg";
import stadium2 from "@/assets/stadium-2.jpg";
import stadium3 from "@/assets/stadium-3.jpg";

const imgs = [stadium1, stadium2, stadium3, stadium1, stadium2, stadium3];

const StadiumsSection = () => {
  return (
    <div className="bg-card rounded-lg p-4">
      <div className="section-title">
        <span>Стадионлар</span>
        <a href="#" className="more-link">Барчаси →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stadiums.slice(0, 3).map((stadium, i) => (
          <div key={stadium.id} className="cursor-pointer group">
            <div className="aspect-[16/10] rounded-md overflow-hidden mb-2 bg-muted">
              <img
                src={imgs[i]}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-[13px] font-bold font-heading text-foreground group-hover:text-link transition-colors">
              {stadium.name}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {stadium.country} {stadium.city} · {stadium.capacity} ўрин
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumsSection;
