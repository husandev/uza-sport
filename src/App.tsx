import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import FootballerPage from "./pages/FootballerPage";
import NewsPage from "./pages/NewsPage";
import ArticlesPage from "./pages/ArticlesPage";
import ResultsPage from "./pages/ResultsPage";
import StandingsPage from "./pages/StandingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/footballer/:id" element={<FootballerPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/standings" element={<StandingsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
