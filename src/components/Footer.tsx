const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-3">
      <div className="container py-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <span className="font-heading font-bold text-foreground text-sm">WC2026<span className="text-[9px] text-muted-foreground font-normal">.uza.uz</span></span>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-foreground">Янгиликлар</a>
            <a href="#" className="hover:text-foreground">Натижалар</a>
            <a href="#" className="hover:text-foreground">Жадвал</a>
            <a href="#" className="hover:text-foreground">Стадионлар</a>
            <a href="#" className="hover:text-foreground">Telegram</a>
          </div>
          <span>© 2026 UZA.uz</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
