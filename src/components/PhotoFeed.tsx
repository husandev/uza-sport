import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import { Camera } from "lucide-react";

const photos = [
  { src: photo1, caption: "Стадион" },
  { src: photo2, caption: "Машғулот" },
  { src: photo3, caption: "Ғалаба" },
  { src: photo4, caption: "Мухлислар" },
];

const PhotoFeed = () => {
  return (
    <div>
      <div className="section-bar">
        <span className="section-label">Фото</span>
        <a href="#" className="meta-link">Барчаси →</a>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {photos.map((photo, i) => (
          <div key={i} className="relative aspect-square rounded overflow-hidden cursor-pointer group">
            <img src={photo.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-[10px] font-medium text-primary-foreground flex items-center gap-1">
                <Camera size={10} /> {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoFeed;
