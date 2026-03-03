"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPageNumbers } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({ page, totalPages, onPageChange, isLoading }: PaginationProps) {
  if (totalPages <= 1) return null;

  function goTo(p: number) {
    onPageChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-5">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1 || isLoading}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      {getPageNumbers(page, totalPages).map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-[13px]">…</span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p)}
            disabled={isLoading}
            className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-colors ${
              p === page
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages || isLoading}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
