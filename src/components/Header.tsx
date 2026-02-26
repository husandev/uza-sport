import { useState } from "react";
import { Menu, X, Search, Clock } from "lucide-react";

const navItems = [
  { label: "Asosiy", active: true },
  { label: "Yangiliklar" },
  { label: "Natijalar" },
  { label: "Jadval" },
  { label: "Statistika" },
  { label: "Terma jamoalar" },
  { label: "Stadionlar" },
  { label: "Maqolalar" },
  { label: "Video" },
  { label: "Foto" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="container flex items-center justify-between h-10">
          <a href="/" className="flex items-center gap-2">
            <span className="text-base font-heading font-black text-primary-foreground tracking-tight">
              WC2026
            </span>
            <span className="text-[10px] text-primary-foreground/60 font-body border-l border-primary-foreground/20 pl-2 hidden sm:block">
              UZA.UZ | O'zbekiston Milliy axborot agentligi
            </span>
          </a>
          <div className="flex items-center gap-3 text-primary-foreground/70 text-xs">
            <span className="hidden md:flex items-center gap-1">
              <Clock size={12} />
              26.02.2026 | 14:32
            </span>
            <button className="p-1 hover:text-primary-foreground transition-colors">
              <Search size={16} />
            </button>
            <button
              className="lg:hidden p-1 text-primary-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container">
          <nav className="hidden lg:flex items-center gap-0 overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`px-3 py-2.5 text-xs font-semibold font-heading uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                  item.active
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground/70 hover:text-foreground hover:border-border"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-card border-b border-border">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`block px-4 py-2.5 text-xs font-semibold font-heading uppercase tracking-wide border-l-3 ${
                item.active
                  ? "border-accent text-accent bg-accent/5"
                  : "border-transparent text-foreground/70 hover:bg-muted"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
