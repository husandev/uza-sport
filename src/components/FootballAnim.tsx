import { motion } from "framer-motion";

const FootballAnim = () => {
  return (
    <div className="relative w-6 h-7 flex items-end justify-center">
      {/* Ball */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -10, 0, -6, 0, -3, 0],
          rotate: [0, -90, -180, -270, -360, -400, -360],
          scale: [1, 1.05, 0.92, 1.03, 0.95, 1.01, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
        }}
      >
        {/* Glow ring on bounce */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0px 0px hsl(var(--highlight) / 0)",
              "0 0 8px 2px hsl(var(--highlight) / 0.4)",
              "0 0 0px 0px hsl(var(--highlight) / 0)",
              "0 0 5px 1px hsl(var(--highlight) / 0.25)",
              "0 0 0px 0px hsl(var(--highlight) / 0)",
              "0 0 3px 1px hsl(var(--highlight) / 0.15)",
              "0 0 0px 0px hsl(var(--highlight) / 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
          }}
        />
        <span className="text-[15px] leading-none block" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))" }}>
          ⚽
        </span>
      </motion.div>

      {/* Dynamic shadow */}
      <motion.div
        className="absolute bottom-0 rounded-full bg-foreground/20"
        style={{ width: 10, height: 3 }}
        animate={{
          scaleX: [1, 0.5, 1, 0.6, 1, 0.75, 1],
          opacity: [0.3, 0.1, 0.3, 0.15, 0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
        }}
      />
    </div>
  );
};

export default FootballAnim;
