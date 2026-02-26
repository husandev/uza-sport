import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import uzaLogo from "@/assets/uza-logo.png";

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

type Script = "cyrillic" | "latin";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [script, setScript] = useState<Script>("cyrillic");

  return (
    <header className="sticky top-0 z-50">
      {/* Top white bar */}
      <div className="bg-card">
        <div className="container flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-3">
            <img src={uzaLogo} alt="UZA.uz" className="h-8" />
            <div className="h-6 w-px bg-border" />
            <span className="text-lg font-heading font-extrabold text-foreground tracking-tight leading-none">
              WC2026
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* Script switcher */}
            <div className="relative flex items-center bg-muted rounded-full p-0.5 h-8">
              <div
                className="absolute top-0.5 bottom-0.5 rounded-full bg-primary shadow-md transition-all duration-300 ease-out"
                style={{
                  width: "calc(50% - 2px)",
                  left: script === "cyrillic" ? "2px" : "calc(50%)",
                }}
              />
              <button
                onClick={() => setScript("cyrillic")}
                className={`relative z-10 px-3 h-full text-[11px] font-heading font-bold uppercase tracking-wide rounded-full transition-colors duration-300 ${
                  script === "cyrillic"
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Кириллча
              </button>
              <button
                onClick={() => setScript("latin")}
                className={`relative z-10 px-3 h-full text-[11px] font-heading font-bold uppercase tracking-wide rounded-full transition-colors duration-300 ${
                  script === "latin"
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Lotincha
              </button>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center bg-muted rounded-xl overflow-hidden">
              <input
                type="text"
                placeholder={script === "cyrillic" ? "Қидириш..." : "Qidirish..."}
                className="px-4 py-2 text-sm w-52 bg-transparent outline-none font-body"
              />
              <button className="px-3 py-2 hover:bg-border transition-colors">
                <Search size={16} className="text-muted-foreground" />
              </button>
            </div>
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
