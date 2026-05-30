"use client";

import { create } from "zustand";

export interface ConnectedApp {
  id: string;
  connectedAt: Date;
  status: "active" | "expiring" | "error";
  lastUsed: Date;
}

interface ConnectionState {
  connectedApps: ConnectedApp[];
  isConnecting: boolean;
  connectApp: (appId: string) => void;
  disconnectApp: (appId: string) => void;
  isAppConnected: (appId: string) => boolean;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  connectedApps: [],
  isConnecting: false,

  connectApp: (appId: string) => {
    set((state) => {
      if (state.connectedApps.some((app) => app.id === appId)) return state;
      return {
        connectedApps: [
          ...state.connectedApps,
          {
            id: appId,
            connectedAt: new Date(),
            status: "active" as const,
            lastUsed: new Date(),
          },
        ],
      };
    });
  },

  disconnectApp: (appId: string) => {
    set((state) => ({
      connectedApps: state.connectedApps.filter((app) => app.id !== appId),
    }));
  },

  isAppConnected: (appId: string) => {
    return get().connectedApps.some((app) => app.id === appId);
  },
}));
