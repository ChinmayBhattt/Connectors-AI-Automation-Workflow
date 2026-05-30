"use client";

import React, { useState } from "react";
import { PlaygroundCard } from "./PlaygroundCard";
import { MOCK_PLAYGROUND_ITEMS, type PlaygroundItem } from "@/lib/mockData";
import { FileText, Palette, Users, Mail, Database, Heart, Calendar } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";

interface PlaygroundGridProps {
  activeFilter: string;
}

export function PlaygroundGrid({ activeFilter }: PlaygroundGridProps) {
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(MOCK_PLAYGROUND_ITEMS[0]);

  // Filter items based on activeFilter
  const filteredItems = MOCK_PLAYGROUND_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "favorites") return item.isFavorited;
    return item.type === activeFilter;
  });

  const getDetailIcon = (type: string) => {
    switch (type) {
      case "content":
        return <FileText size={18} className="text-info" />;
      case "design":
        return <Palette size={18} className="text-accent-2" />;
      case "leads":
        return <Users size={18} className="text-success" />;
      case "email":
        return <Mail size={18} className="text-warning" />;
      default:
        return <Database size={18} className="text-text-secondary" />;
    }
  };

  return (
    <div className="flex flex-1 min-h-0 pl-[var(--sidebar-width)] h-[calc(100vh-64px)] relative">
      {/* Cards List Grid */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-xl text-text-primary capitalize">
              {activeFilter === "all" ? "All Outputs" : activeFilter === "favorites" ? "Favorites" : `${activeFilter} library`}
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Showing {filteredItems.length} generated automation output{filteredItems.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
              className="animate-fade-in-up"
            >
              <PlaygroundCard
                item={item}
                isSelected={selectedItem?.id === item.id}
                onSelect={() => setSelectedItem(item)}
              />
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-2 flex flex-col items-center justify-center text-center py-20 text-text-secondary select-none">
              <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-lg mb-3">
                📭
              </div>
              <p className="text-xs font-semibold text-text-primary">No Outputs Found</p>
              <p className="text-[11px] text-text-muted mt-1 max-w-[220px]">
                There are no generated files matching the active filter. Run an automation in the chat to create content!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Slide-out / Floating Detail Panel (Right Side) */}
      <div className="w-[360px] border-l border-border bg-bg-surface/50 backdrop-blur-sm shrink-0 overflow-y-auto flex flex-col p-6 h-[calc(100vh-64px)] sticky top-16 right-0 z-10 hidden xl:flex">
        {selectedItem ? (
          <div className="flex flex-col h-full">
            {/* Header info */}
            <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-bright flex items-center justify-center shrink-0">
                  {getDetailIcon(selectedItem.type)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-text-primary truncate max-w-[190px]">
                    {selectedItem.title}
                  </h3>
                  <span className="text-[9px] text-text-secondary font-medium">
                    {selectedItem.automationName}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Stamp info */}
            <div className="flex items-center gap-2 text-[10px] text-text-secondary mb-4 bg-bg-base/30 py-1 px-2 border border-border/60 rounded">
              <Calendar size={11} className="text-text-muted" />
              <span>Created {formatRelativeTime(selectedItem.createdAt)}</span>
            </div>

            {/* Main content body */}
            <div className="flex-1 bg-bg-surface border border-border rounded-xl p-4 font-mono text-[11px] leading-relaxed text-text-primary overflow-y-auto select-text whitespace-pre-wrap">
              {selectedItem.preview}
            </div>

            {/* Action pill */}
            <div className="mt-4 border-t border-border/80 pt-4 flex gap-2">
              <button 
                className="flex-1 py-2 px-3 bg-bg-elevated hover:bg-bg-hover active:bg-bg-active text-text-secondary hover:text-text-primary border border-border-bright rounded-lg text-xs font-semibold transition-colors"
              >
                Copy Content
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-text-secondary select-none">
            <div className="w-10 h-10 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-md mb-2">
              📄
            </div>
            <p className="text-xs font-semibold text-text-primary">Select an Output</p>
            <p className="text-[10px] text-text-muted mt-1 leading-normal max-w-[180px]">
              Click on any playground output card to view its detailed code, text or tables here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
