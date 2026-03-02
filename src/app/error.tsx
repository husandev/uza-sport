"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Xatoni log qilish (production da monitoring ga yuborsa bo'ladi)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Nimadir xato ketdi
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Sahifa yuklanishida muammo yuz berdi. Internet aloqangizni tekshiring yoki qayta urinib ko'ring.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Qayta urinish
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-muted text-foreground text-sm font-semibold rounded-xl hover:bg-muted/80 transition-colors"
          >
            Bosh sahifa
          </Link>
        </div>
      </div>
    </div>
  );
}
