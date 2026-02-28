import Link from "next/link";
import { stadiums } from "@/data/mockData";
import stadium1 from "@/assets/stadium-1.jpg";
import stadium2 from "@/assets/stadium-2.jpg";
import stadium3 from "@/assets/stadium-3.jpg";

const imgs = [stadium1, stadium2, stadium3, stadium1, stadium2, stadium3];

const StadiumsSection = () => {
  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Stadionlar</span>
        <Link href="/stadiums" className="more-link">Barchasi →</Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stadiums.slice(0, 6).map((stadium, i) => (
          <Link key={stadium.id} href={`/stadium/${stadium.id}`} className="cursor-pointer group">
            <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2.5 bg-muted">
              <img
                src={imgs[i].src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-sm font-bold font-heading text-foreground group-hover:text-link transition-colors">
              {stadium.name}
            </h3>
            <p className="text-[12px] text-muted-foreground mt-1 font-body">
              {stadium.country} {stadium.city} · {stadium.capacity} o'rin
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StadiumsSection;
