
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Chat from "./pages/Chat";
import Memory from "./pages/Memory";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CameraInput from "./pages/CameraInput";
import SignLanguage from "./pages/SignLanguage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/camera" element={<CameraInput />} />
          <Route path="/sign-language" element={<SignLanguage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
