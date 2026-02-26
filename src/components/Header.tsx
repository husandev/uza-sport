import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const navItems = [
  "Bosh sahifa",
  "Yangiliklar",
  "Natijalar",
  "Jadval",
  "Terma jamoalar",
  "Stadionlar",
  "Maqolalar",
  "Video",
  "Foto",
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xl font-heading font-black text-primary-foreground tracking-tight">
              WC2026
            </span>
            <span className="text-xs text-primary-foreground/70 font-body hidden sm:block">
              | UZA.UZ
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <Search size={20} />
          </button>
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-6 py-3 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
