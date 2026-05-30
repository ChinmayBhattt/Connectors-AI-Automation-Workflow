"use client";

import React, { useState } from "react";
import { PlaygroundItem } from "@/lib/mockData";
import { formatRelativeTime } from "@/lib/utils";
import { 
  FileText, 
  Palette, 
  Users, 
  Mail, 
  Database, 
  Heart, 
  Download, 
  ExternalLink, 
  Play, 
  Check,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaygroundCardProps {
  item: PlaygroundItem;
  isSelected: boolean;
  onSelect: () => void;
}

export function PlaygroundCard({ item, isSelected, onSelect }: PlaygroundCardProps) {
  const [isFavorited, setIsFavorited] = useState(item.isFavorited);
  const [isRunning, setIsRunning] = useState(false);
  const [runSuccess, setRunSuccess] = useState(false);

  const getTypeIcon = () => {
    switch (item.type) {
      case "content":
        return <FileText size={14} className="text-info" />;
      case "design":
        return <Palette size={14} className="text-accent-2" />;
      case "leads":
        return <Users size={14} className="text-success" />;
      case "email":
        return <Mail size={14} className="text-warning" />;
      default:
        return <Database size={14} className="text-text-secondary" />;
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleRunAgain = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRunning) return;
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setRunSuccess(true);
      setTimeout(() => setRunSuccess(false), 2000);
    }, 1800);
  };

  // Check if content contains markdown table
  const renderCardContent = () => {
    if (item.imageUrl) {
      return (
        <div className="relative h-32 rounded-lg overflow-hidden border border-border-bright mt-3 mb-2 select-none group-hover:border-border-bright transition-colors bg-bg-elevated flex items-center justify-center">
          {/* Custom SVG mock thumbnails for illustration instead of raw broken image paths */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent z-10" />
          <svg className="w-full h-full opacity-60 text-accent/20" viewBox="0 0 100 50">
            <rect width="100" height="50" fill="currentColor" />
            <circle cx="50" cy="25" r="10" stroke="#6B5EE4" strokeWidth="0.5" fill="none" />
            <path d="M10,25 Q30,5 50,25 T90,25" stroke="#E44B9B" strokeWidth="0.5" fill="none" />
          </svg>
          <div className="absolute bottom-2 left-2 right-2 z-20 text-[10px] font-mono text-text-secondary truncate">
            {item.preview}
          </div>
        </div>
      );
    }

    if (item.preview.includes("| Company |")) {
      // Competitor table layout
      const rows = item.preview.split("\n").filter((r) => r.trim() !== "");
      return (
        <div className="overflow-x-auto my-3 border border-border rounded-lg bg-bg-base/40 p-2 font-mono text-[10.5px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="pb-1 px-1">Co</th>
                <th className="pb-1 px-1 text-right">Basic</th>
                <th className="pb-1 px-1 text-right">Pro</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(2).map((row, idx) => {
                const cols = row.split("|").map((c) => c.trim()).filter((c) => c !== "");
                if (cols.length < 3) return null;
                return (
                  <tr key={idx} className="border-b border-border/30 last:border-0 hover:bg-bg-hover/20">
                    <td className="py-1 px-1 font-semibold text-text-primary">{cols[0]}</td>
                    <td className="py-1 px-1 text-right text-text-secondary">{cols[1]}</td>
                    <td className="py-1 px-1 text-right text-text-accent">{cols[2]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <p className={cn(
        "text-xs text-text-secondary line-clamp-4 leading-relaxed mt-2.5 mb-3",
        (item.type === "leads" || item.type === "email") && "font-mono text-[10.5px] bg-bg-base/30 p-2 border border-border/50 rounded-lg whitespace-pre-wrap"
      )}>
        {item.preview}
      </p>
    );
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group bg-bg-surface border rounded-xl p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer relative",
        isSelected
          ? "border-accent shadow-[0_0_15px_rgba(107,94,228,0.15)] bg-bg-surface/90"
          : "border-border hover:-translate-y-1 hover:border-border-bright hover:bg-bg-hover/50 hover:shadow-card"
      )}
    >
      {/* Selection vertical bar indicator */}
      {isSelected && (
        <div className="absolute left-0 top-3 bottom-3 w-1 bg-accent rounded-r" />
      )}

      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-bg-elevated border border-border-bright text-[10px] font-medium text-text-secondary">
            {getTypeIcon()}
            <span className="capitalize">{item.type}</span>
          </div>
          <span className="text-[10px] text-text-muted font-medium">
            {formatRelativeTime(item.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-display font-semibold text-sm text-text-primary mt-3 group-hover:text-white transition-colors truncate">
          {item.title}
        </h4>
        <div className="text-[10px] text-text-secondary font-medium truncate mt-1">
          {item.automationName}
        </div>

        {/* Dynamic Card Content Rendering */}
        {renderCardContent()}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between border-t border-border/80 pt-3 mt-auto">
        <div className="flex items-center gap-1">
          {/* Download Action */}
          <button 
            className="p-1.5 rounded-md hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Download results file"
          >
            <Download size={13} />
          </button>
          
          {/* Open full page */}
          <button 
            className="p-1.5 rounded-md hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Open full page view"
          >
            <ExternalLink size={13} />
          </button>
          
          {/* Favorite Toggle */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "p-1.5 rounded-md hover:bg-bg-elevated transition-colors focus:outline-none",
              isFavorited ? "text-accent-2" : "text-text-muted hover:text-text-primary"
            )}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={13} fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Run Again Action */}
        <button
          onClick={handleRunAgain}
          disabled={isRunning}
          className={cn(
            "px-2.5 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 border transition-all",
            runSuccess
              ? "bg-success-bg border-success/20 text-success"
              : isRunning
                ? "bg-bg-elevated border-border text-text-muted cursor-wait"
                : "border-border hover:border-border-bright text-text-secondary hover:text-white bg-bg-elevated hover:bg-bg-hover"
          )}
        >
          {runSuccess ? (
            <>
              <Check size={11} strokeWidth={2.5} /> Done
            </>
          ) : isRunning ? (
            <>
              <Loader2 className="animate-spin" size={11} /> Running
            </>
          ) : (
            <>
              <Play size={9} fill="currentColor" /> Run Again
            </>
          )}
        </button>
      </div>
    </div>
  );
}
