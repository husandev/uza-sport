import { useState, useRef, useEffect } from "react";
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

const hotSearches = [
  "Ўзбекистон — Колумбия",
  "Роналду ЖЧ-2026",
  "K гуруҳ жадвали",
  "Шомуродов голлари",
  "Хусанов трансфер",
];

const relatedSearches = [
  "ЖЧ-2026 жадвал",
  "Бугунги ўйинлар",
  "Энг яхши ҳужумчилар",
  "Стадионлар рўйхати",
];

type Script = "cyrillic" | "latin";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [script, setScript] = useState<Script>("cyrillic");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top white bar */}
      <div className="bg-card">
        <div className="container flex items-center justify-between h-12">
          <a href="/" className="flex items-center gap-2.5">
            <img src={uzaLogo} alt="UZA.uz" className="h-7" />
            <div className="h-5 w-px bg-border" />
            <span className="text-base font-heading font-extrabold text-foreground tracking-tight leading-none">
              WC2026
            </span>
          </a>

          <div className="flex items-center gap-2.5">
            {/* Script switcher */}
            <div className="relative flex items-center bg-muted rounded-full p-0.5 h-7">
              <div
                className="absolute top-0.5 bottom-0.5 rounded-full bg-primary shadow-md transition-all duration-300 ease-out"
                style={{
                  width: "calc(50% - 2px)",
                  left: script === "cyrillic" ? "2px" : "calc(50%)",
                }}
              />
              <button
                onClick={() => setScript("cyrillic")}
                className={`relative z-10 px-2.5 h-full text-[10px] font-heading font-bold uppercase tracking-wide rounded-full transition-colors duration-300 ${
                  script === "cyrillic"
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Кириллча
              </button>
              <button
                onClick={() => setScript("latin")}
                className={`relative z-10 px-2.5 h-full text-[10px] font-heading font-bold uppercase tracking-wide rounded-full transition-colors duration-300 ${
                  script === "latin"
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Lotincha
              </button>
            </div>

            {/* Apple-style Search */}
            <div ref={searchRef} className="relative hidden md:block">
              {!searchOpen ? (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <Search size={16} className="text-muted-foreground" />
                </button>
              ) : (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40" onClick={() => setSearchOpen(false)} />
                  
                  {/* Search panel */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-[420px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in">
                    {/* Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                      <Search size={16} className="text-muted-foreground shrink-0" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={script === "cyrillic" ? "Қидириш..." : "Qidirish..."}
                        className="flex-1 bg-transparent outline-none text-sm font-body text-foreground placeholder:text-muted-foreground"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/30 transition-colors"
                        >
                          <X size={10} className="text-muted-foreground" />
                        </button>
                      )}
                    </div>

                    {/* Hot searches */}
                    <div className="px-4 pt-3 pb-2">
                      <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        🔥 Тренддаги қидирувлар
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {hotSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-2.5 py-1 text-[11px] font-body bg-muted hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Related searches */}
                    <div className="px-4 pt-2 pb-3 border-t border-border mt-1">
                      <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Тез ҳаволалар
                      </p>
                      <div className="space-y-0.5">
                        {relatedSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="flex items-center gap-2 w-full px-2 py-1.5 text-[12px] font-body text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                          >
                            <Search size={12} className="text-muted-foreground shrink-0" />
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
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
