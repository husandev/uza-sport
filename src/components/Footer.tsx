const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-black text-xl mb-3">WC2026</h3>
            <p className="text-sm text-primary-foreground/70">
              O'zbekiston Milliy axborot agentligi — FIFA Jahon chempionati 2026 maxsus loyihasi
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Bo'limlar</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Yangiliklar</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Natijalar</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Jadval</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Maqolalar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Ma'lumot</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Stadionlar</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terma jamoalar</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Chiptalar</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Ijtimoiy tarmoqlar</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-xs text-primary-foreground/50">
          © 2026 UZA.uz — O'zbekiston Milliy axborot agentligi. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
