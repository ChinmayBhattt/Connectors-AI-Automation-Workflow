"use client";

import React, { useState } from "react";
import { ConnectedApp } from "@/stores/connectionStore";
import { APP_CATALOG } from "@/lib/apps";
import { AppIcon } from "./AppIcon";
import { formatRelativeTime } from "@/lib/utils";
import { Settings, ShieldAlert, Sparkles, LogOut, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionCardProps {
  connection: ConnectedApp;
  onDisconnect: (appId: string) => void;
}

export function ConnectionCard({ connection, onDisconnect }: ConnectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const appInfo = APP_CATALOG.find((a) => a.id === connection.id);

  if (!appInfo) return null;

  const getStatusDetails = () => {
    switch (connection.status) {
      case "active":
        return {
          color: "text-success",
          bg: "bg-success/10 border-success/20",
          icon: <CheckCircle2 size={12} className="text-success" />,
          label: "Active",
        };
      case "expiring":
        return {
          color: "text-warning",
          bg: "bg-warning/10 border-warning/20",
          icon: <AlertTriangle size={12} className="text-warning" />,
          label: "Expiring soon",
        };
      default:
        return {
          color: "text-error",
          bg: "bg-error/10 border-error/20",
          icon: <XCircle size={12} className="text-error" />,
          label: "Auth Error",
        };
    }
  };

  const status = getStatusDetails();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-bg-surface border border-border hover:border-border-bright rounded-xl p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
    >
      {/* Brand glowing background overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${appInfo.brandColor} 0%, transparent 60%)`,
        }}
      />

      <div className="flex items-start justify-between gap-4">
        {/* App Logo */}
        <div
          className="w-12 h-12 rounded-xl border flex items-center justify-center bg-bg-elevated shrink-0 transition-transform group-hover:scale-105 duration-300"
          style={{
            borderColor: `${appInfo.brandColor}30`,
            boxShadow: `0 4px 15px ${appInfo.brandColor}10`,
          }}
        >
          <AppIcon id={connection.id} size={24} />
        </div>

        {/* Status indicator pill */}
        <div className={cn("flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-semibold", status.bg, status.color)}>
          {status.icon}
          <span>{status.label}</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-display font-semibold text-sm text-text-primary group-hover:text-white transition-colors">
          {appInfo.name}
        </h4>
        <div className="text-[10px] text-text-secondary mt-1 flex items-center gap-1.5 font-mono">
          <span>Connected {formatRelativeTime(connection.connectedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span>Used {formatRelativeTime(connection.lastUsed)}</span>
        </div>
      </div>

      {/* Hover action overlay sheet */}
      <div
        className={cn(
          "absolute inset-0 bg-bg-surface/95 flex items-center justify-center gap-3 px-4 transition-all duration-200",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <button className="flex-1 bg-bg-elevated hover:bg-bg-hover text-text-primary border border-border-bright text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors focus:outline-none">
          <Settings size={13} />
          Configure
        </button>
        <button
          onClick={() => onDisconnect(connection.id)}
          className="bg-error/10 hover:bg-error/20 text-error border border-error/25 text-xs font-semibold p-2 rounded-lg flex items-center justify-center transition-colors focus:outline-none"
          title="Disconnect application"
        >
          <LogOut size={13} />
        </button>
      </div>
    </div>
  );
}
