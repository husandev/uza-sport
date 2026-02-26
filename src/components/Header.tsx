import { useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";

const navItems = [
  { label: "Асосий", href: "#", active: true },
  { label: "Янгиликлар", href: "#" },
  { label: "Футбол", href: "#" },
  { label: "Натижалар", href: "#" },
  { label: "Жадвал", href: "#" },
  { label: "Стадионлар", href: "#" },
  { label: "Жамоалар", href: "#" },
  { label: "Мақолалар", href: "#" },
  { label: "Видео", href: "#" },
  { label: "Фото", href: "#" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary">
      <div className="container flex items-center justify-between h-11">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-primary-foreground/70 hover:text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a href="/" className="flex items-baseline gap-1.5">
            <span className="text-lg font-heading font-black text-primary-foreground tracking-tight">
              WC2026
            </span>
            <sup className="text-[9px] text-primary-foreground/40 font-body">uza.uz</sup>
          </a>
        </div>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-0 ml-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-3 py-3 text-[13px] font-medium transition-colors ${
                item.active
                  ? "text-secondary"
                  : "text-primary-foreground/75 hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2 text-primary-foreground/60">
          <button className="p-1.5 hover:text-primary-foreground transition-colors">
            <Search size={17} />
          </button>
          <button className="p-1.5 hover:text-primary-foreground transition-colors hidden sm:block">
            <Bell size={17} />
          </button>
          <button className="p-1.5 hover:text-primary-foreground transition-colors">
            <User size={17} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-primary border-t border-primary-foreground/10 pb-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-4 py-2 text-[13px] font-medium ${
                item.active
                  ? "text-secondary"
                  : "text-primary-foreground/75 hover:text-primary-foreground"
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
