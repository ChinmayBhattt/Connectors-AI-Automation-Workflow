"use client";

import React from "react";
import { useConnectionStore } from "@/stores/connectionStore";
import { ConnectionCard } from "./ConnectionCard";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionGridProps {
  onAddConnectionClick: () => void;
}

export function ConnectionGrid({ onAddConnectionClick }: ConnectionGridProps) {
  const connectedApps = useConnectionStore((state) => state.connectedApps);
  const disconnectApp = useConnectionStore((state) => state.disconnectApp);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 mt-16 pb-24">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-8 border-b border-border/80 pb-4">
        <div>
          <h2 className="font-display font-bold text-xl text-text-primary">
            Connected Applications
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Manage your credentials, scopes, and automation access parameters.
          </p>
        </div>
        <button
          onClick={onAddConnectionClick}
          className="bg-accent hover:bg-accent-hover text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 focus:outline-none shadow-md shadow-accent/20"
        >
          <Plus size={14} strokeWidth={2.5} />
          Connect New
        </button>
      </div>

      {/* Grid of Connections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {connectedApps.map((conn, idx) => (
          <div
            key={conn.id}
            style={{
              animationDelay: `${idx * 40}ms`,
              animationFillMode: "both",
            }}
            className="animate-fade-in-up"
          >
            <ConnectionCard
              connection={conn}
              onDisconnect={disconnectApp}
            />
          </div>
        ))}

        {/* Add Connection Dashed Card Placeholder */}
        <button
          onClick={onAddConnectionClick}
          className="group border border-dashed border-border hover:border-accent/40 rounded-xl p-5 min-h-[140px] flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-accent/5 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full border border-dashed border-border group-hover:border-accent/50 group-hover:bg-bg-elevated flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors shrink-0 mb-3">
            <Plus size={16} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
            Add Connection
          </span>
          <span className="text-[10px] text-text-muted mt-1 leading-normal max-w-[170px]">
            Integrate other tools like HubSpot, Stripe or Midjourney.
          </span>
        </button>
      </div>
    </div>
  );
}
