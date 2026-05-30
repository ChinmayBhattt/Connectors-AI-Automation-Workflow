"use client";

import React, { useEffect, useRef, useState } from "react";
import { useConnectionStore } from "@/stores/connectionStore";
import { useChatStore } from "@/stores/chatStore";
import { APP_CATALOG } from "@/lib/apps";
import { AppIcon } from "./AppIcon";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectOrbProps {
  onOrbClick: () => void;
}

export function ConnectOrb({ onOrbClick }: ConnectOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 250, y: 200 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [scale, setScale] = useState(1.0);
  const [positions, setPositions] = useState<{ [appId: string]: { x: number; y: number } }>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const connectedApps = useConnectionStore((state) => state.connectedApps);
  const disconnectApp = useConnectionStore((state) => state.disconnectApp);
  const isProcessing = useChatStore((state) => state.isProcessing);

  // Update center coordinate dynamically
  useEffect(() => {
    const updateCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCenter({
          x: rect.width / 2,
          y: rect.height / 2,
        });
      }
    };

    updateCenter();
    const timer = setTimeout(updateCenter, 100);

    window.addEventListener("resize", updateCenter);
    return () => {
      window.removeEventListener("resize", updateCenter);
      clearTimeout(timer);
    };
  }, [connectedApps.length]);

  // Seed default radial coordinates for any newly added application
  useEffect(() => {
    if (!center.x || !center.y) return;

    setPositions((prev) => {
      const next = { ...prev };
      let needsUpdate = false;

      connectedApps.forEach((app, index) => {
        if (!next[app.id]) {
          needsUpdate = true;
          // Evenly distribute radial coordinates around center
          const angle = (index * 2 * Math.PI) / connectedApps.length || 0;
          const radius = 150;
          next[app.id] = {
            x: center.x + Math.cos(angle) * radius,
            y: center.y + Math.sin(angle) * radius,
          };
        }
      });

      return needsUpdate ? next : prev;
    });
  }, [connectedApps, center]);

  // Custom Pointer Drag Handlers (smooth, jitter-free, handles scale factors)
  const handlePointerDown = (appId: string, e: React.PointerEvent) => {
    e.stopPropagation();
    setActiveDragId(appId);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (appId: string, e: React.PointerEvent) => {
    if (activeDragId !== appId) return;
    e.stopPropagation();

    setPositions((prev) => {
      const current = prev[appId] || { x: center.x, y: center.y };
      return {
        ...prev,
        [appId]: {
          // Adjust velocity based on zoom scale
          x: current.x + e.movementX / scale,
          y: current.y + e.movementY / scale,
        },
      };
    });
  };

  const handlePointerUp = (appId: string, e: React.PointerEvent) => {
    e.stopPropagation();
    setActiveDragId(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Canvas Panning Handlers
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Left click only
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest("a")) return;
    
    setIsPanning(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleCanvasPointerMove = (e: React.PointerEvent) => {
    if (!isPanning) return;
    setPanOffset((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const handleCanvasPointerUp = (e: React.PointerEvent) => {
    if (!isPanning) return;
    setIsPanning(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handleCanvasPointerMove}
      onPointerUp={handleCanvasPointerUp}
      className={cn(
        "w-full flex-1 min-h-[480px] relative select-none overflow-hidden transition-colors duration-200",
        isPanning ? "cursor-grabbing" : "cursor-grab"
      )}
    >
      <style jsx global>{`
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash-flow {
          animation: dash-flow 1.2s linear infinite;
        }
      `}</style>

      {/* Zoom / Scale Container wrapper (handles both panning and zooming) */}
      <div
        className={cn(
          "w-full h-full absolute inset-0 origin-center",
          isPanning ? "" : "transition-transform duration-200 ease-out"
        )}
        style={{ 
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
          willChange: "transform"
        }}
      >
        {/* SVG Canvas for flow lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {connectedApps.map((app) => {
            const pos = positions[app.id] || { x: center.x + 150, y: center.y };
            const appInfo = APP_CATALOG.find((a) => a.id === app.id);
            const brandColor = appInfo?.brandColor || "#06b6d4";

            return (
              <g key={`flow-${app.id}`}>
                {/* Glowing pipeline background */}
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={brandColor}
                  strokeWidth="3"
                  opacity="0.12"
                />
                {/* Pulsing data-flow line */}
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={brandColor}
                  strokeWidth="1.5"
                  strokeDasharray="6, 5"
                  className="animate-dash-flow"
                />
              </g>
            );
          })}
        </svg>

        {/* Central Plus Button Node */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: center.x, top: center.y }}
        >
          <button
            onClick={onOrbClick}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              "w-16 h-16 rounded-full bg-bg-surface border border-border-bright flex items-center justify-center text-text-primary hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent relative shadow-lg glow-border-active",
              isProcessing
                ? "border-accent shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse"
                : "hover:border-accent hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-105"
            )}
            aria-label="Add app connection"
          >
            <span className="text-2xl font-light font-display pb-0.5 select-none z-10">
              +
            </span>
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 top-18 whitespace-nowrap text-[9px] uppercase tracking-widest text-text-muted font-mono pointer-events-none text-center">
            Connect App
          </span>
        </div>

        {/* Floating Draggable App Nodes */}
        {connectedApps.map((app) => {
          const pos = positions[app.id] || { x: center.x + 150, y: center.y };
          const appInfo = APP_CATALOG.find((a) => a.id === app.id);
          if (!appInfo) return null;

          const isHovered = hoveredNode === app.id;
          const isDragging = activeDragId === app.id;

          return (
            <div
              key={app.id}
              onPointerDown={(e) => handlePointerDown(app.id, e)}
              onPointerMove={(e) => handlePointerMove(app.id, e)}
              onPointerUp={(e) => handlePointerUp(app.id, e)}
              onMouseEnter={() => setHoveredNode(app.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={cn(
                "absolute z-10 select-none -translate-x-1/2 -translate-y-1/2",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
              style={{
                left: pos.x,
                top: pos.y,
              }}
            >
              {/* Main Circle Node */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full bg-bg-surface border flex items-center justify-center transition-all duration-200 relative shadow-md",
                  (isHovered || isDragging) ? "scale-110 shadow-lg" : ""
                )}
                style={{
                  borderColor: appInfo.brandColor,
                  boxShadow: (isHovered || isDragging)
                    ? `0 0 20px ${appInfo.brandColor}40`
                    : `0 0 10px ${appInfo.brandColor}15`,
                }}
              >
                <AppIcon id={app.id} size={20} />

                {/* Status Indicator */}
                <span
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border border-bg-surface"
                  style={{
                    backgroundColor: app.status === "active" ? "#10b981" : "#f59e0b",
                  }}
                />
              </div>

              {/* Label below the Node */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <span className="text-[10px] font-semibold text-text-primary block font-display tracking-wide whitespace-nowrap">
                  {appInfo.name}
                </span>
                <span className="text-[8px] text-text-secondary block font-mono uppercase tracking-wider scale-90">
                  {app.status}
                </span>
              </div>

              {/* Tooltip Actions */}
              {isHovered && !isDragging && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-bg-elevated border border-border-bright rounded-lg p-1 shadow-modal flex items-center gap-1 z-30 animate-fade-in"
                  onPointerDown={(e) => e.stopPropagation()} // Stop click-through on drag trigger
                >
                  <button
                    onClick={() => disconnectApp(app.id)}
                    className="p-1 rounded text-error hover:bg-error/10 transition-colors"
                    title="Disconnect app"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Zoom Control Panel */}
      <div 
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-6 flex items-center bg-bg-surface border border-border-bright rounded-xl p-1 z-30 gap-1 shadow-lg select-none"
      >
        <button
          onClick={() => setScale((s) => Math.max(s - 0.1, 0.4))}
          className="w-7 h-7 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors focus:outline-none"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>
        <span className="text-[9px] font-mono text-text-muted px-1.5 min-w-[36px] text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale((s) => Math.min(s + 0.1, 1.6))}
          className="w-7 h-7 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors focus:outline-none"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>
        <div className="w-[1px] h-4 bg-border mx-0.5" />
        <button
          onClick={() => {
            setScale(1.0);
            setPanOffset({ x: 0, y: 0 });
          }}
          className="w-7 h-7 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors focus:outline-none"
          title="Reset Zoom & Pan"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
}
export default ConnectOrb;
