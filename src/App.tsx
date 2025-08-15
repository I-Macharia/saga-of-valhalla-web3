import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CharacterSelect from "./pages/CharacterSelect";
import Game from "./pages/Game";
import NFTMarketplace from "./pages/NFTMarketplace";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/character-select" element={<CharacterSelect />} />
          <Route path="/game" element={<Game />} />
          <Route path="/nft-marketplace" element={<NFTMarketplace />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/multiplayer" element={<div className="min-h-screen bg-gradient-game flex items-center justify-center"><div className="text-center"><h1 className="text-hero mb-4">Multiplayer Mode</h1><p className="text-muted-foreground">Coming Soon! Local WiFi/Hotspot multiplayer battles.</p></div></div>} />
          <Route path="/customize" element={<div className="min-h-screen bg-gradient-game flex items-center justify-center"><div className="text-center"><h1 className="text-hero mb-4">Character Customization</h1><p className="text-muted-foreground">Coming Soon! Customize hair, skin tone, and name.</p></div></div>} />
          <Route path="/inventory" element={<div className="min-h-screen bg-gradient-game flex items-center justify-center"><div className="text-center"><h1 className="text-hero mb-4">Inventory</h1><p className="text-muted-foreground">Coming Soon! Manage your collected items and gear.</p></div></div>} />
          <Route path="/settings" element={<div className="min-h-screen bg-gradient-game flex items-center justify-center"><div className="text-center"><h1 className="text-hero mb-4">Settings</h1><p className="text-muted-foreground">Coming Soon! Configure game preferences and controls.</p></div></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
