const Footer = () => {
  return (
    <footer className="bg-primary mt-3">
      <div className="container py-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-primary-foreground/50">
          <span className="font-heading font-bold text-primary-foreground text-sm">WC2026 <sup className="text-[8px] text-primary-foreground/40">uza.uz</sup></span>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-primary-foreground">Янгиликлар</a>
            <a href="#" className="hover:text-primary-foreground">Натижалар</a>
            <a href="#" className="hover:text-primary-foreground">Жадвал</a>
            <a href="#" className="hover:text-primary-foreground">Стадионлар</a>
            <a href="#" className="hover:text-primary-foreground">Жамоалар</a>
            <a href="#" className="hover:text-primary-foreground">Telegram</a>
            <a href="#" className="hover:text-primary-foreground">Instagram</a>
          </div>
          <span>© 2026 UZA.uz</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
