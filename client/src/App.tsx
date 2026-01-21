'use client';

import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatePresence, motion } from "framer-motion";

import Home from "@/pages/Home";
import Messages from "@/pages/Messages";
import Games from "@/pages/Games";
import MessagesSlider from "@/pages/MessagesSlider";
import Countdown from "@/pages/Countdown";
import Memories from "@/pages/Memories";
import NotFound from "@/pages/not-found";

// Game pages
import TruthKiss from "@/pages/games/TruthKiss";
import MemoryHeart from "@/pages/games/MemoryHeart";
import SoulBond from "@/pages/games/SoulBond";
import EternalFlame from "@/pages/games/EternalFlame";
import MidnightWhisper from "@/pages/games/MidnightWhisper";
import DawnEmbrace from "@/pages/games/DawnEmbrace";
import SecretSanctuary from "@/pages/games/SecretSanctuary";
import LoveAlchemy from "@/pages/games/LoveAlchemy";
import MelodicLove from "@/pages/games/MelodicLove";
import CapturedMoment from "@/pages/games/CapturedMoment";
import GiftOfDevotion from "@/pages/games/GiftOfDevotion";
import SereneSips from "@/pages/games/SereneSips";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/love-notes" component={Messages} />
        <Route path="/games" component={Games} />
        <Route path="/games/truth-kiss" component={TruthKiss} />
        <Route path="/games/memory-heart" component={MemoryHeart} />
        <Route path="/games/soul-bond" component={SoulBond} />
        <Route path="/games/eternal-flame" component={EternalFlame} />
        <Route path="/games/midnight-whisper" component={MidnightWhisper} />
        <Route path="/games/dawn-embrace" component={DawnEmbrace} />
        <Route path="/games/secret-sanctuary" component={SecretSanctuary} />
        <Route path="/games/love-alchemy" component={LoveAlchemy} />
        <Route path="/games/melodic-love" component={MelodicLove} />
        <Route path="/games/captured-moment" component={CapturedMoment} />
        <Route path="/games/gift-of-devotion" component={GiftOfDevotion} />
        <Route path="/games/serene-sips" component={SereneSips} />
        <Route path="/messages" component={MessagesSlider} />
        <Route path="/countdown" component={Countdown} />
        <Route path="/memories" component={Memories} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <Navigation />
      <div className="relative">
        <Router />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
