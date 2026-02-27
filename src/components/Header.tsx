import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, TrendingUp, ArrowRight, Sparkles, Send, Instagram, Youtube, Twitter, Facebook, Linkedin } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import uzaLogo from "@/assets/uza-logo-solo.png";
import FootballAnim from "./FootballAnim";

const navItems = [
  { label: "Asosiy", href: "/" },
  { label: "Yangiliklar", href: "/news" },
  { label: "Maqolalar", href: "/articles" },
  { label: "Natijalar", href: "/results" },
  { label: "Jadval", href: "/standings" },
  { label: "Jamoalar", href: "/teams" },
  { label: "Stadionlar", href: "/stadiums" },
  { label: "Video", href: "/videos" },
  { label: "Foto", href: "/photos" },
];

const hotSearches = [
  "O'zbekiston — Kolumbiya",
  "Ronaldu JCh-2026",
  "K guruhi jadvali",
  "Shomurodov gollari",
  "Xusanov transfer",
];

const quickLinks = [
  { label: "JCh-2026 jadval", icon: "📊" },
  { label: "Bugungi o'yinlar", icon: "⚽" },
  { label: "Eng yaxshi hujumchilar", icon: "🏆" },
  { label: "Stadionlar ro'yxati", icon: "🏟️" },
];

const Header = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
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
          <Link to="/" className="flex items-center gap-2.5">
            <img src={uzaLogo} alt="UZA.uz" className="h-5" />
            <div className="h-5 w-px bg-border" />
            <FootballAnim />
            <span className="text-base font-heading font-extrabold text-foreground tracking-tight leading-none">
              WC2026
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Social icons */}
            <div className="hidden sm:flex items-center gap-0.5">
              {[
                { icon: Youtube, label: "YouTube" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Send, label: "Telegram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label={label}>
                  <Icon size={13} />
                </a>
              ))}
              {/* TikTok (no lucide icon, using SVG) */}
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="TikTok">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>

            {/* Search trigger */}
            <div ref={searchRef} className="relative">
              {!searchOpen ? (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 h-8 px-3 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground text-[12px] font-body transition-all hover:shadow-sm"
                >
                  <Search size={13} />
                  <span className="hidden sm:inline">Qidirish...</span>
                  <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background text-[9px] font-mono text-muted-foreground border border-border ml-1">
                    ⌘K
                  </kbd>
                </button>
              ) : (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 bg-foreground/30 backdrop-blur-md z-40" onClick={() => setSearchOpen(false)} />

                  {/* Search panel - centered command palette style */}
                  <div className="fixed left-1/2 top-[15%] -translate-x-1/2 z-50 w-[90vw] max-w-[520px]">
                    <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                      {/* Input */}
                      <div className="flex items-center gap-3 px-5 py-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Search size={15} className="text-primary" />
                        </div>
                        <input
                          ref={inputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Nima qidirmoqdasiz?"
                          className="flex-1 bg-transparent outline-none text-base font-body text-foreground placeholder:text-muted-foreground/60"
                        />
                        {searchQuery ? (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors"
                          >
                            <X size={12} className="text-muted-foreground" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setSearchOpen(false)}
                            className="px-2 py-1 rounded-md bg-muted text-[10px] font-body text-muted-foreground hover:bg-muted/80"
                          >
                            ESC
                          </button>
                        )}
                      </div>

                      <div className="h-px bg-border" />

                      {/* Trending */}
                      <div className="px-5 pt-4 pb-3">
                        <p className="flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-wider text-muted-foreground mb-3">
                          <TrendingUp size={12} />
                          Trenddagi
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {hotSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => setSearchQuery(term)}
                              className="px-3 py-1.5 text-[12px] font-body bg-muted/60 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-200"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="h-px bg-border" />

                      {/* Quick links */}
                      <div className="px-5 pt-3 pb-4">
                        <p className="flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
                          <Sparkles size={12} />
                          Tez havolalar
                        </p>
                        <div className="space-y-0.5">
                          {quickLinks.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => setSearchQuery(item.label)}
                              className="flex items-center gap-3 w-full px-3 py-2.5 text-[13px] font-body text-foreground hover:bg-muted rounded-xl transition-colors text-left group"
                            >
                              <span className="text-base">{item.icon}</span>
                              <span className="flex-1">{item.label}</span>
                              <ArrowRight size={13} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </div>
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
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${pathname === item.href || (item.href === "/" && pathname === "/") ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden nav-bar border-t border-primary-foreground/10 pb-1">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="nav-link block" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
