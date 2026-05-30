"use client";

import React, { useState } from "react";
import { AppIcon } from "./AppIcon";
import { APP_CATALOG } from "@/lib/apps";
import { cn } from "@/lib/utils";

interface AppSatelliteProps {
  appId: string;
  index: number;
  total: number;
  onDisconnect?: (appId: string) => void;
}

export function AppSatellite({ appId, index, total, onDisconnect }: AppSatelliteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const appInfo = APP_CATALOG.find((a) => a.id === appId);

  if (!appInfo) return null;

  // Stagger orbits: distribute across 3 rings
  const ringIndex = index % 3;
  const radius = ringIndex === 0 ? 125 : ringIndex === 1 ? 155 : 185;
  const duration = 10 + ringIndex * 4 + (index % 2) * 2; // 10s, 12s, 14s, 16s, etc.
  const startAngle = (index / total) * 360;

  return (
    <div
      className={cn(
        "app-satellite group hover:[animation-play-state:paused]",
        "entering"
      )}
      style={{
        "--start-angle": `${startAngle}deg`,
        "--orbit-radius": `${radius}px`,
        "--orbit-duration": `${duration}s`,
        "--brand-color-glow": `${appInfo.brandColor}40`,
        borderColor: appInfo.brandColor,
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* App Icon */}
      <div className="flex items-center justify-center w-full h-full bg-bg-surface hover:bg-bg-hover transition-colors">
        <AppIcon id={appId} size={22} />
      </div>

      {/* Tooltip & Actions */}
      <div
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-bg-elevated border border-border-bright rounded-md text-xs whitespace-nowrap shadow-modal z-50 pointer-events-auto",
          "transition-all duration-200 ease-out origin-bottom",
          isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2 font-display font-medium text-text-primary">
          <span
            className="w-2 h-2 rounded-full bg-success animate-pulse"
            style={{ backgroundColor: appInfo.brandColor }}
          />
          {appInfo.name}
        </div>
        <div className="text-[10px] text-text-secondary mt-1">Connected & Active</div>
        {onDisconnect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDisconnect(appId);
            }}
            className="mt-1.5 w-full text-[10px] text-error hover:text-error/80 bg-error/10 hover:bg-error/20 py-0.5 px-1.5 rounded transition-colors text-center block"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
