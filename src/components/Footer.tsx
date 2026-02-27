import { Link } from "react-router-dom";
import uzaLogo from "@/assets/uza-logo-solo.png";
import oksLogo from "@/assets/oks-logo.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <footer className="bg-primary mt-6">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <img src={uzaLogo} alt="UZA.uz" className="h-4 brightness-0 invert opacity-70" />
            <div className="h-4 w-px bg-primary-foreground/20" />
            <span className="text-primary-foreground font-heading font-bold text-sm">WC2026</span>
            <span className="text-primary-foreground/30 text-[11px] font-body hidden sm:inline">
              — JCh-2026 maxsus loyihasi
            </span>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-primary-foreground/50 font-body">
            <Link to="/news" className="hover:text-primary-foreground transition-colors">Yangiliklar</Link>
            <Link to="/results" className="hover:text-primary-foreground transition-colors">Jadval</Link>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Telegram</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Instagram</a>
            <span className="text-primary-foreground/25">© 2026 UZA.uz</span>
            <div className="h-4 w-px bg-primary-foreground/20" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://oks.uz" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                    <img src={oksLogo} alt="OKS Technologies" className="h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">OKS Technologies tomonidan mehr bilan ishlab chiqilgan ❤️</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
