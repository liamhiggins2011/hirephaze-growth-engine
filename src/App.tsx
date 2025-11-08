import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Employers from "./pages/Employers";
import Candidates from "./pages/Candidates";
import About from "./pages/About";
import Auth from "./pages/Auth";
import VChat from "./pages/VChat";
import VKimi from "./pages/VKimi";
import VClaude from "./pages/VClaude";
import VGrok from "./pages/VGrok";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/v-chat" element={<VChat />} />
            <Route path="/v-kimi" element={<VKimi />} />
            <Route path="/v-claude" element={<VClaude />} />
            <Route path="/v-grok" element={<VGrok />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
