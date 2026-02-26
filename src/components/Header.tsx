import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const navItems = [
  { label: "Асосий", href: "#", active: true },
  { label: "Янгиликлар", href: "#" },
  { label: "Натижалар", href: "#" },
  { label: "Жадвал", href: "#" },
  { label: "Жамоалар", href: "#" },
  { label: "Стадионлар", href: "#" },
  { label: "Видео", href: "#" },
  { label: "Фото", href: "#" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top white bar */}
      <div className="bg-card border-b border-border">
        <div className="container flex items-center justify-between h-12">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">WC</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-heading font-bold text-foreground tracking-tight leading-none">
                WC2026
              </span>
              <span className="text-[9px] text-muted-foreground tracking-wider">UZA.UZ</span>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-muted rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Қидириш..."
                className="px-3 py-1.5 text-[13px] w-48 bg-transparent outline-none"
              />
              <button className="px-3 py-1.5 hover:bg-border transition-colors">
                <Search size={15} className="text-muted-foreground" />
              </button>
            </div>
            <button className="text-[13px] text-link hover:underline font-medium">Кириш</button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="nav-bar">
        <div className="container flex items-center">
          <button
            className="lg:hidden text-primary-foreground p-2.5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${item.active ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden nav-bar border-t border-primary-foreground/10 pb-1">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link block">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
