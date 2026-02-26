import { motion } from "framer-motion";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";

const photos = [
  { src: photo1, caption: "Stadion maydonchasi", span: "col-span-2 row-span-2" },
  { src: photo2, caption: "Mashg'ulot", span: "col-span-1 row-span-1" },
  { src: photo3, caption: "G'alaba bayram", span: "col-span-1 row-span-1" },
  { src: photo4, caption: "Muxlislar", span: "col-span-2 row-span-1" },
];

const PhotoFeed = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Fotogalereya</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha rasmlar →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`${photo.span} relative rounded-lg overflow-hidden cursor-pointer group`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-sm font-medium text-primary-foreground">
                  {photo.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoFeed;
