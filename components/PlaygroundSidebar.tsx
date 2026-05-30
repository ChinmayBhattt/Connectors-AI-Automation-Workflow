"use client";

import React from "react";
import { 
  Folder, 
  FileText, 
  Palette, 
  Users, 
  Mail, 
  Heart, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_RECENT_AUTOMATIONS } from "@/lib/mockData";
import { formatRelativeTime } from "@/lib/utils";

interface PlaygroundSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onNewAutomationClick: () => void;
}

export function PlaygroundSidebar({
  activeFilter,
  onFilterChange,
  onNewAutomationClick,
}: PlaygroundSidebarProps) {
  
  const categories = [
    { id: "all", label: "All Outputs", count: 8, icon: <Folder size={13} /> },
    { id: "content", label: "Content", count: 3, icon: <FileText size={13} /> },
    { id: "design", label: "Design", count: 2, icon: <Palette size={13} /> },
    { id: "leads", label: "Leads", count: 1, icon: <Users size={13} /> },
    { id: "email", label: "Email", count: 2, icon: <Mail size={13} /> },
    { id: "favorites", label: "Favorites", count: 3, icon: <Heart size={13} /> },
  ];

  const getRecentStatusIcon = (status: "success" | "running" | "failed") => {
    switch (status) {
      case "success":
        return <CheckCircle2 size={12} className="text-success" />;
      case "running":
        return <Loader2 size={12} className="text-accent animate-spin" />;
      default:
        return <AlertCircle size={12} className="text-error" />;
    }
  };

  return (
    <aside className="w-[var(--sidebar-width)] bg-bg-surface border-r border-border shrink-0 flex flex-col justify-between py-6 px-3 select-none h-[calc(100vh-64px)] fixed left-0 top-16 z-20">
      <div className="flex flex-col gap-6">
        {/* Categories Section */}
        <div>
          <h4 className="font-display font-medium text-[10px] text-text-secondary tracking-widest uppercase px-3 mb-2">
            Library
          </h4>
          <nav className="flex flex-col gap-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onFilterChange(cat.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none",
                  activeFilter === cat.id
                    ? "bg-bg-hover text-text-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-hover/40"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={activeFilter === cat.id ? "text-accent" : "text-text-secondary"}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </div>
                <span className="text-[10px] text-text-muted font-mono bg-bg-elevated px-1.5 py-0.5 border border-border/60 rounded-md">
                  {cat.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Recent Section */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h4 className="font-display font-medium text-[10px] text-text-secondary tracking-widest uppercase">
              Recent Runs
            </h4>
            <Clock size={10} className="text-text-muted" />
          </div>
          <div className="flex flex-col gap-1.5 px-1.5">
            {MOCK_RECENT_AUTOMATIONS.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between p-2 rounded-lg bg-bg-base/40 border border-border/30 hover:border-border transition-colors cursor-default"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {getRecentStatusIcon(run.status)}
                  <span className="text-xs font-semibold text-text-primary truncate">
                    {run.name}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-text-muted whitespace-nowrap ml-2 shrink-0">
                  {formatRelativeTime(run.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Automation Trigger Action */}
      <div className="px-1.5">
        <button
          onClick={onNewAutomationClick}
          className="w-full bg-bg-elevated hover:bg-bg-hover active:bg-bg-active text-text-accent border border-border-bright hover:border-accent/40 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Plus size={14} strokeWidth={2.5} />
          New Automation
        </button>
      </div>
    </aside>
  );
}
