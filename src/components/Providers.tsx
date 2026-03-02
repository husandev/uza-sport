"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,            // 1 daqiqa — yangilik chiqsa 1 daqiqada ko'rinadi
            gcTime: 1000 * 60 * 10,          // 10 daqiqa — xotirada saqlanadi
            retry: 1,                         // 1 marta retry
            retryDelay: 2000,                 // 2 soniya kutib retry
            refetchOnWindowFocus: false,      // tab focus da qayta fetch yo'q
            refetchOnReconnect: true,         // internet qaytsa fetch qiladi
            throwOnError: false,              // error boundary ga chiqarmaydi — komponent o'zi handle qiladi
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
