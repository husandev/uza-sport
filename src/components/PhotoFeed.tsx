import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";

const photos = [
  { src: photo1, caption: "Stadion maydonchasi" },
  { src: photo2, caption: "Mashg'ulot" },
  { src: photo3, caption: "G'alaba bayram" },
  { src: photo4, caption: "Muxlislar" },
];

const PhotoFeed = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">Fotogalereya</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <div className="grid grid-cols-2 gap-1 p-3 pt-0">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer group"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-[10px] font-medium text-primary-foreground">{photo.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoFeed;
