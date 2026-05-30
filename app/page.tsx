"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { ConnectOrb } from "@/components/ConnectOrb";
import { ChatBar } from "@/components/ChatBar";
import { PlaygroundSidebar } from "@/components/PlaygroundSidebar";
import { PlaygroundGrid } from "@/components/PlaygroundGrid";
import { ConnectionGrid } from "@/components/ConnectionGrid";
import { AppSearchModal } from "@/components/AppSearchModal";
import { OrbParticles } from "@/components/OrbParticles";
import { DotPattern } from "@/components/DotPattern";
import { useChatStore } from "@/stores/chatStore";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<"home" | "playground" | "connections">("home");
  const [activePlaygroundFilter, setActivePlaygroundFilter] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const messages = useChatStore((state) => state.messages);
  const isRecording = useChatStore((state) => state.isRecording);
  const hasMessages = messages.length > 0;

  const handleNewAutomationFromSidebar = () => {
    setActiveScreen("home");
    // Pulse the search modal open
    setTimeout(() => {
      setIsSearchOpen(true);
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-base relative overflow-hidden text-text-primary selection:bg-accent/40 selection:text-white">
      {/* 1. Slow drifting particle field */}
      <OrbParticles />

      {/* 2. Interactive dot pattern */}
      <DotPattern />



      {/* 2. Persistent Header */}
      <Header activeScreen={activeScreen} onScreenChange={setActiveScreen} />

      {/* 3. Screen Router with Framer Motion transitions */}
      <main className="flex-1 flex flex-col pt-16 relative z-10 min-h-0">
        <AnimatePresence mode="wait">
          {activeScreen === "home" && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex-1 flex flex-col items-center justify-center relative min-h-0 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hasMessages ? "pr-[430px]" : "pr-0"
              )}
            >
              {/* Central Connect Orb */}
              <ConnectOrb onOrbClick={() => setIsSearchOpen(true)} />
              
              {/* Bottom chat input field and messaging log */}
              <ChatBar />
            </motion.div>
          )}

          {activeScreen === "playground" && (
            <motion.div
              key="playground-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex"
            >
              {/* Library Categories Sidebar */}
              <PlaygroundSidebar
                activeFilter={activePlaygroundFilter}
                onFilterChange={setActivePlaygroundFilter}
                onNewAutomationClick={handleNewAutomationFromSidebar}
              />
              
              {/* Generated Automation Outputs list & Detail Panel */}
              <PlaygroundGrid activeFilter={activePlaygroundFilter} />
            </motion.div>
          )}

          {activeScreen === "connections" && (
            <motion.div
              key="connections-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              {/* Active integrations dashboard list */}
              <ConnectionGrid onAddConnectionClick={() => setIsSearchOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Global App Catalog Search Modal */}
      <AppSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
