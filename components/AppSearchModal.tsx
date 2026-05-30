"use client";

import React, { useEffect, useRef, useState } from "react";
import { useConnectionStore } from "@/stores/connectionStore";
import { APP_CATALOG, APP_CATEGORIES, searchApps, type AppInfo } from "@/lib/apps";
import { AppIcon } from "./AppIcon";
import { X, Search as SearchIcon, ArrowRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppSearchModal({ isOpen, onClose }: AppSearchModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
  const [isConnectingLocal, setIsConnectingLocal] = useState(false);
  const [authorizedAppId, setAuthorizedAppId] = useState<string | null>(null);

  const connectApp = useConnectionStore((state) => state.connectApp);
  const isAppConnected = useConnectionStore((state) => state.isAppConnected);

  // Sync ref with isOpen
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      setQuery("");
      setSelectedApp(null);
      setAuthorizedAppId(null);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      dialog.close();
      setAuthorizedAppId(null);
    }
  }, [isOpen]);

  // Reset authorized state when active app changes
  useEffect(() => {
    setAuthorizedAppId(null);
  }, [selectedApp]);

  // Handle ESC key or light dismiss events
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  // Fallback light-dismiss logic
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const filteredApps = query 
    ? searchApps(query) 
    : activeCategory === "all" 
      ? APP_CATALOG 
      : APP_CATALOG.filter((app) => app.category === activeCategory);

  const handleConnect = (app: AppInfo) => {
    if (isAppConnected(app.id)) return;
    
    setIsConnectingLocal(true);

    // Open real popup window for OAuth simulation
    const width = 480;
    const height = 580;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const popup = window.open(
      "", 
      "oauth_flow", 
      `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`
    );

    if (popup) {
      popup.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Connect ${app.name} — Connectors</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                background-color: #050507;
                color: #F0EFF8;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                padding: 24px;
                box-sizing: border-box;
                text-align: center;
              }
              .logo {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 32px;
                color: #6B5EE4;
              }
              .connection-card {
                background: #0D0D12;
                border: 1px solid rgba(255,255,255,0.06);
                border-radius: 16px;
                padding: 24px;
                width: 100%;
                max-width: 360px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
              }
              .icon-row {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
                margin-bottom: 24px;
              }
              .icon-box {
                width: 56px;
                height: 56px;
                border-radius: 12px;
                background: #14141C;
                border: 1px solid rgba(255,255,255,0.12);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
              }
              .arrow {
                color: #7A7A8C;
                font-size: 20px;
              }
              h2 { margin: 0 0 8px 0; font-size: 18px; font-weight: 600; }
              p { color: #7A7A8C; font-size: 13px; margin: 0 0 24px 0; line-height: 1.5; }
              .btn {
                background: #6B5EE4;
                color: #fff;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: background 0.2s;
              }
              .btn:hover { background: #7C70EB; }
              .spinner {
                display: none;
                width: 24px;
                height: 24px;
                border: 2px solid rgba(255,255,255,0.1);
                border-top-color: #fff;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin: 0 auto;
              }
              @keyframes spin { to { transform: rotate(360deg); } }
            </style>
          </head>
          <body>
            <div class="logo">Connectors</div>
            <div class="connection-card">
              <div class="icon-row">
                <div class="icon-box">🔗</div>
                <div class="arrow">→</div>
                <div class="icon-box" style="border-color: ${app.brandColor}">${app.name.charAt(0)}</div>
              </div>
              <h2 id="title">Authorize Connection</h2>
              <p id="desc">Connectors would like permission to access your ${app.name} account to run automations.</p>
              <button class="btn" id="connectBtn" onclick="startConnect()">Authorize</button>
              <div class="spinner" id="loader"></div>
            </div>

            <script>
              function startConnect() {
                document.getElementById('connectBtn').style.display = 'none';
                document.getElementById('loader').style.display = 'block';
                document.getElementById('title').innerText = 'Connecting...';
                document.getElementById('desc').innerText = 'Please wait while we establish a secure connection.';
                
                setTimeout(() => {
                  window.opener.postMessage({ type: 'OAUTH_SUCCESS', appId: '${app.id}' }, '*');
                  window.close();
                }, 1500);
              }
            </script>
          </body>
        </html>
      `);
    }

    // Set up postMessage listener
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "OAUTH_SUCCESS" && event.data?.appId === app.id) {
        setAuthorizedAppId(app.id);
        setIsConnectingLocal(false);
        window.removeEventListener("message", handleMessage);
      }
    };
    window.addEventListener("message", handleMessage);
  };

  const handleAddApp = (app: AppInfo) => {
    connectApp(app.id);
    setAuthorizedAppId(null);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      className="p-0 border-0 bg-transparent text-text-primary overflow-visible max-w-[850px] w-[90vw] rounded-2xl shadow-modal backdrop:bg-black/80"
    >
      <div className="flex h-[550px] bg-bg-surface border border-border-bright rounded-2xl overflow-hidden relative">
        {/* Main List Column */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-border">
          {/* Search Header */}
          <div className="p-4 border-b border-border flex items-center gap-3 relative">
            <SearchIcon className="text-text-secondary absolute left-7 top-1/2 -translate-y-1/2" size={18} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search any app or model..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-bg-elevated border border-border rounded-xl py-2.5 pl-11 pr-10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-7 text-text-secondary hover:text-text-primary text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="flex flex-1 min-h-0">
            {/* Category Sidebar */}
            {!query && (
              <div className="w-[170px] border-r border-border py-4 px-2 flex flex-col gap-1 overflow-y-auto shrink-0 select-none">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    activeCategory === "all"
                      ? "bg-bg-hover text-text-accent"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-hover/50"
                  )}
                >
                  All Apps
                </button>
                {APP_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap overflow-hidden text-overflow-ellipsis",
                      activeCategory === cat.id
                        ? "bg-bg-hover text-text-accent"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-hover/50"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* Grid List */}
            <div className="flex-1 p-5 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {filteredApps.map((app) => {
                  const connected = isAppConnected(app.id);
                  return (
                    <button
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200",
                        selectedApp?.id === app.id
                          ? "border-accent/40 bg-accent/5"
                          : "border-border bg-bg-surface hover:border-border-bright hover:bg-bg-hover"
                      )}
                    >
                      <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center border border-border-bright shrink-0">
                        <AppIcon id={app.id} size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-text-primary truncate">
                          {app.name}
                        </div>
                        <div className="text-[10px] text-text-secondary truncate mt-0.5">
                          {connected ? "Connected" : "Available"}
                        </div>
                      </div>
                      {connected && (
                        <div className="w-4 h-4 rounded-full bg-success/15 border border-success/30 flex items-center justify-center shrink-0">
                          <Check className="text-success" size={10} />
                        </div>
                      )}
                    </button>
                  );
                })}

                {filteredApps.length === 0 && (
                  <div className="col-span-2 text-center py-10 text-text-secondary text-xs">
                    No applications match your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selected App Detail Panel (Right Side) */}
        <div className="w-[300px] bg-bg-surface flex flex-col shrink-0 relative overflow-hidden transition-all duration-300">
          {selectedApp ? (
            <div className="flex flex-col h-full p-6">
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 shadow-lg mb-4"
                  style={{
                    borderColor: selectedApp.brandColor,
                    boxShadow: `0 0 20px ${selectedApp.brandColor}25`,
                    backgroundColor: `${selectedApp.brandColor}0a`,
                  }}
                >
                  <AppIcon id={selectedApp.id} size={32} />
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary">
                  {selectedApp.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-text-muted mt-1 px-2.5 py-0.5 bg-bg-elevated border border-border rounded-full font-mono">
                  {selectedApp.category}
                </span>
                <p className="text-xs text-text-secondary mt-4 leading-relaxed max-w-[220px]">
                  {selectedApp.description}
                </p>
              </div>

              <div className="mt-auto">
                {isAppConnected(selectedApp.id) ? (
                  <div className="w-full bg-success-bg border border-success/20 text-success text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
                    <Check size={14} /> Connected & Active
                  </div>
                ) : authorizedAppId === selectedApp.id ? (
                  <button
                    onClick={() => handleAddApp(selectedApp)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 active:from-cyan-600 active:to-emerald-600 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group border border-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer hover:-translate-y-0.5 duration-200"
                  >
                    <Plus size={14} className="stroke-[3px]" />
                    Add to Canvas
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(selectedApp)}
                    disabled={isConnectingLocal}
                    className="w-full bg-accent hover:bg-accent-hover active:bg-accent/80 text-white font-medium text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group border border-accent-hover/30 cursor-pointer"
                  >
                    {isConnectingLocal ? (
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Connect {selectedApp.name}
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-text-secondary select-none">
              <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-lg mb-3">
                💡
              </div>
              <p className="text-xs font-medium text-text-primary">Select an App</p>
              <p className="text-[11px] text-text-muted mt-1 leading-normal max-w-[200px]">
                Click on any application to view authorization requirements and connect.
              </p>
            </div>
          )}

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary p-1 bg-bg-elevated border border-border hover:border-border-bright rounded-lg transition-all"
            aria-label="Close search"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </dialog>
  );
}
