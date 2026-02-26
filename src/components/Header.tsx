import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";

const navItems = [
  { label: "Янгиликлар", href: "#", hasDropdown: true },
  { label: "Турнирлар", href: "#", hasDropdown: true },
  { label: "Жамоалар", href: "#", hasDropdown: true },
  { label: "Рейтинглар", href: "#", hasDropdown: true },
  { label: "Стадионлар", href: "#" },
  { label: "Видео", href: "#" },
  { label: "Фото", href: "#" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - white with logo */}
      <div className="bg-background border-b border-border">
        <div className="container flex items-center justify-between h-10">
          <a href="/" className="flex items-baseline gap-1">
            <span className="text-xl font-heading font-black text-foreground tracking-tight">
              WC2026
            </span>
            <span className="text-[10px] text-muted-foreground font-body">.uza.uz</span>
          </a>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center border border-border rounded-sm overflow-hidden">
              <input
                type="text"
                placeholder="Қидириш..."
                className="px-2 py-1 text-[12px] w-40 bg-background outline-none"
              />
              <button className="px-2 py-1 bg-muted hover:bg-border transition-colors">
                <Search size={14} className="text-muted-foreground" />
              </button>
            </div>
            <button className="text-[12px] text-link hover:underline flex items-center gap-1">
              <User size={13} /> Кириш
            </button>
          </div>
        </div>
      </div>

      {/* Green navigation bar */}
      <div className="nav-bar">
        <div className="container flex items-center justify-between">
          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label} {item.hasDropdown && "▾"}
              </a>
            ))}
          </nav>

          <a href="#" className="hidden lg:block px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-primary-foreground bg-accent hover:bg-accent/90 font-heading">
            Матчлар ▸
          </a>

          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden nav-bar border-t border-primary-foreground/10 pb-2">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
