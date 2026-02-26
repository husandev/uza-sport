import uzaLogo from "@/assets/uza-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary mt-6">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src={uzaLogo} alt="UZA.uz" className="h-7 brightness-0 invert opacity-70" />
              <div className="h-5 w-px bg-primary-foreground/20" />
              <span className="text-primary-foreground font-heading font-extrabold text-xl">WC2026</span>
            </div>
            <p className="text-primary-foreground/40 text-[13px] max-w-md font-body">
              Ўзбекистон Республикаси Миллий ахборот агентлиги — ЖЧ-2026 махсус лойиҳаси
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-primary-foreground/50 font-body">
            <a href="#" className="hover:text-primary-foreground transition-colors">Янгиликлар</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Натижалар</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Жадвал</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Стадионлар</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Telegram</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Instagram</a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-5 pt-5 text-[12px] text-primary-foreground/30 font-body">
          © 2026 UZA.uz — Ўзбекистон Миллий ахборот агентлиги
        </div>
      </div>
    </footer>
  );
};

export default Footer;
