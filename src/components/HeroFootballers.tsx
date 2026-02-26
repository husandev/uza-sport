import { motion } from "framer-motion";
import { heroFootballers } from "@/data/mockData";

const HeroFootballers = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">O'zbek qahramonlari</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha futbolchilar →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {heroFootballers.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg border border-border overflow-hidden card-hover cursor-pointer"
            >
              <div className="bg-gradient-to-br from-secondary/20 to-primary/10 p-6 text-center">
                <span className="text-5xl">🇺🇿</span>
                <div className="mt-2 text-3xl font-heading font-black text-primary">
                  #{player.number}
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading font-bold text-foreground text-base">
                  {player.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{player.position}</p>
                <p className="text-xs text-secondary font-semibold mt-1">{player.club}</p>
                <div className="mt-3 inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-foreground">{player.goals}</span>
                  <span className="text-xs text-muted-foreground">gol</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroFootballers;
