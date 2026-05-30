"use client";

import React from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeScreen: "home" | "playground" | "connections";
  onScreenChange: (screen: "home" | "playground" | "connections") => void;
}

export function Header({ activeScreen, onScreenChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-bg-base/80 backdrop-blur-md z-30 flex items-center justify-between px-6 select-none">
      {/* Brand Logo */}
      <div 
        onClick={() => onScreenChange("home")}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold text-sm shadow-[0_0_12px_rgba(107,94,228,0.4)] group-hover:scale-105 transition-transform">
          C
        </div>
        <span className="font-display font-semibold text-[15px] tracking-wide text-text-primary group-hover:text-white transition-colors">
          Connectors
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center bg-bg-surface border border-border rounded-full p-1">
        {(["home", "playground", "connections"] as const).map((screen) => (
          <button
            key={screen}
            onClick={() => onScreenChange(screen)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none",
              activeScreen === screen
                ? "bg-accent text-white shadow-[0_2px_8px_rgba(107,94,228,0.3)]"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {screen}
          </button>
        ))}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button 
          className="w-8 h-8 rounded-lg bg-bg-surface border border-border hover:border-border-bright text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors relative"
          aria-label="View notifications"
        >
          <Bell size={15} />
          {/* Active dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-2 rounded-full" />
        </button>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-accent-2 p-[1px] cursor-pointer hover:scale-105 transition-transform shadow-md">
          <div className="w-full h-full bg-bg-elevated rounded-[7px] flex items-center justify-center text-xs font-semibold text-text-primary">
            CB
          </div>
        </div>
      </div>
    </header>
  );
}
