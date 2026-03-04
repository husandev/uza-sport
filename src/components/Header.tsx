"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import uzaLogo from "@/assets/uza-logo-solo.png";
import FootballAnim from "./FootballAnim";
import { useSearch } from "@/hooks/queries";
import { formatPublishTime } from "@/lib/utils";

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
  { label: "JCh-2026 jadval", icon: "📊", href: "/standings" },
  { label: "Bugungi o'yinlar", icon: "⚽", href: "/results" },
  { label: "Eng yaxshi hujumchilar", icon: "🏆", href: "/standings" },
  { label: "Stadionlar ro'yxati", icon: "🏟️", href: "/stadiums" },
];

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(searchQuery.trim()), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ⌘K / Ctrl+K + Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const { data: searchData, isLoading: searchLoading } = useSearch(debouncedQ);
  const searchResults = searchData?.data ?? [];
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <header className="sticky top-0 z-50">
      {/* Top white bar */}
      <div className="bg-card">
        <div className="container flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2.5">
            <img src={uzaLogo.src} alt="UZA.uz" className="h-5" />
            <div className="h-5 w-px bg-border" />
            <FootballAnim />
            <span className="text-base font-heading font-extrabold text-foreground tracking-tight leading-none">
              WC2026
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Social icons */}
            <div className="hidden sm:flex items-center gap-0.5">
              <a href="#" aria-label="Facebook" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-[#1877F2] transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Telegram" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-[#2CA5E0] transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="#" aria-label="X" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.75l7.732-8.843-8.164-10.657H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-[#E1306C] transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
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
                  <div
                    className="fixed inset-0 bg-foreground/30 backdrop-blur-md z-40"
                    onClick={() => setSearchOpen(false)}
                  />

                  {/* Search panel - centered command palette style */}
                  <div
                    className="fixed left-1/2 top-[15%] -translate-x-1/2 z-50 w-[90vw] max-w-[520px]"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Qidiruv"
                  >
                    <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                      {/* Input */}
                      <div className="flex items-center gap-3 px-5 py-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Search size={15} className="text-primary" />
                        </div>
                        <input
                          ref={inputRef}
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Nima qidirmoqdasiz?"
                          aria-label="Saytda qidirish"
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

                      {/* Search results or Trending */}
                      {hasQuery ? (
                        <div className="max-h-[360px] overflow-y-auto px-2 py-2">
                          {/* Loading skeleton */}
                          {searchLoading &&
                            Array.from({ length: 3 }).map((_, i) => (
                              <div
                                key={i}
                                className="flex gap-3 px-3 py-2.5 animate-pulse"
                              >
                                <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0" />
                                <div className="flex-1 space-y-2 pt-1">
                                  <div className="h-3 bg-muted rounded w-full" />
                                  <div className="h-3 bg-muted rounded w-1/2" />
                                </div>
                              </div>
                            ))}

                          {/* Kam belgi */}
                          {!searchLoading && debouncedQ.length < 2 && (
                            <p className="py-8 text-center text-[12px] text-muted-foreground">
                              Qidirish uchun kamida 2 ta belgi kiriting
                            </p>
                          )}

                          {/* Natija topilmadi */}
                          {!searchLoading &&
                            debouncedQ.length >= 2 &&
                            searchResults.length === 0 && (
                              <div className="py-10 text-center">
                                <Search
                                  size={28}
                                  className="mx-auto mb-2 text-muted-foreground/30"
                                />
                                <p className="text-[13px] text-muted-foreground">
                                  Natija topilmadi
                                </p>
                                <p className="text-[11px] text-muted-foreground/60 mt-1">
                                  «{debouncedQ}» bo'yicha hech narsa yo'q
                                </p>
                              </div>
                            )}

                          {/* Natijalar */}
                          {!searchLoading &&
                            searchResults.map((post) => (
                              <Link
                                key={post.id}
                                href={`/article/${post.slug}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
                              >
                                {post.files?.thumbnails?.small?.src && (
                                  <img
                                    src={post.files.thumbnails.small.src}
                                    alt={post.title}
                                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                    {post.title}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground mt-0.5">
                                    {formatPublishTime(post.publish_time)}
                                  </p>
                                </div>
                                <ArrowRight
                                  size={13}
                                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                />
                              </Link>
                            ))}
                        </div>
                      ) : (
                        <>
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
                                <Link key={item.label} href={item.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                                  <button
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-[13px] font-body text-foreground hover:bg-muted rounded-xl transition-colors text-left group"
                                  >
                                    <span className="text-base">
                                      {item.icon}
                                    </span>
                                    <span className="flex-1">{item.label}</span>
                                    <ArrowRight
                                      size={13}
                                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                  </button>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
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
            aria-label={mobileOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
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
            <Link
              key={item.label}
              href={item.href}
              className="nav-link block"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
