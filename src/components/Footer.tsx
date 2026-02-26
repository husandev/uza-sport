import uzaLogo from "@/assets/uza-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary mt-6">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <img src={uzaLogo} alt="UZA.uz" className="h-5 brightness-0 invert opacity-70" />
            <div className="h-4 w-px bg-primary-foreground/20" />
            <span className="text-primary-foreground font-heading font-bold text-sm">WC2026</span>
            <span className="text-primary-foreground/30 text-[11px] font-body hidden sm:inline">
              — ЖЧ-2026 махсус лойиҳаси
            </span>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-primary-foreground/50 font-body">
            <a href="#" className="hover:text-primary-foreground transition-colors">Янгиликлар</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Жадвал</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Telegram</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Instagram</a>
            <span className="text-primary-foreground/25">© 2026 UZA.uz</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
