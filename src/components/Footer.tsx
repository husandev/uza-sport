const Footer = () => {
  return (
    <footer className="bg-primary mt-4">
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-sm mb-2">WC2026</h3>
            <p className="text-primary-foreground/60 text-[11px] leading-relaxed">
              UZA.uz — O'zbekiston Milliy axborot agentligi. FIFA Jahon chempionati 2026 maxsus loyihasi.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-[11px] mb-2 uppercase">Bo'limlar</h4>
            <ul className="space-y-1 text-[11px] text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary-foreground">Yangiliklar</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Natijalar</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Jadval</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Maqolalar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-[11px] mb-2 uppercase">Ma'lumot</h4>
            <ul className="space-y-1 text-[11px] text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary-foreground">Stadionlar</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Terma jamoalar</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Chiptalar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-[11px] mb-2 uppercase">Ijtimoiy</h4>
            <ul className="space-y-1 text-[11px] text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary-foreground">Telegram</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Instagram</a></li>
              <li><a href="#" className="hover:text-primary-foreground">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-4 pt-3 text-center text-[10px] text-primary-foreground/40">
          © 2026 UZA.uz — Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
