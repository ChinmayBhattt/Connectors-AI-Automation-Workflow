"use client";

import React from "react";

interface AppIconProps {
  id: string;
  className?: string;
  size?: number;
}

export function AppIcon({ id, className, size = 20 }: AppIconProps) {
  const svgProps = {
    className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "youtube":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="#FF0000" stroke="none">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.525 3.5 12 3.5 12 3.5s-7.525 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.043 0 12 0 12s0 3.957.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.475 20.5 12 20.5 12 20.5s7.525 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.957 24 12 24 12s0-3.957-.502-5.837z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FFFFFF" />
        </svg>
      );
    case "gmail":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#EA4335" strokeWidth={1.8}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "sheets":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#34A853" strokeWidth={1.8}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
      );
    case "slack":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#4A154B" strokeWidth={1.8}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <circle cx="15" cy="15" r="2" />
          <path d="M9 15h6M9 9h6" />
        </svg>
      );
    case "github":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#FFFFFF" fill="none" strokeWidth={1.8}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "supabase":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="#3ECF8E" stroke="none">
          <path d="M19 10.5h-5.5L18 2H9.5L5 13.5h5.5L6 22l13-11.5z" />
        </svg>
      );
    case "stripe":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="#635BFF" stroke="none">
          <path d="M13.962 13.567c-1.393-.578-2.368-.962-2.368-1.74 0-.712.637-1.156 1.625-1.156 1.705 0 3.197.665 4.341 1.341l1.096-3.327c-1.344-.666-3.136-1.077-5.11-1.077-3.957 0-6.602 2.102-6.602 5.617 0 4.148 3.535 5.539 6.275 6.643 1.625.644 2.502 1.156 2.502 1.942 0 .866-.826 1.307-2.022 1.307-2.062 0-4.004-.988-5.327-1.78l-1.153 3.324c1.65.986 3.865 1.488 6.257 1.488 4.28 0 7.025-2.06 7.025-5.698 0-4.227-3.714-5.697-6.195-6.666Z" />
        </svg>
      );
    case "shopify":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#96BF48" strokeWidth={1.8}>
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
          <path d="M3 6h18M16 10a4 4 0 01-8 0" />
        </svg>
      );
    case "chatgpt":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#10A37F" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
    case "claude":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#D4A27F" strokeWidth={1.8}>
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "gemini":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="#4285F4" stroke="none">
          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Zm0 15a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z" />
        </svg>
      );
    case "perplexity":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#20B2AA" strokeWidth={1.8}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#4285F4" strokeWidth={1.8}>
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "drive":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#4285F4" strokeWidth={1.8}>
          <polygon points="12 2 2 22 22 22" />
        </svg>
      );
    case "notion":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#FFFFFF" strokeWidth={1.8}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 7v10M17 7v10M7 7h3l4 10h3" />
        </svg>
      );
    case "todoist":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#E44232" strokeWidth={1.8}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="#FFFFFF" stroke="none">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="#0A66C2" stroke="none">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" stroke="#E4405F" strokeWidth={1.8}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      );
    case "vercel":
      return (
        <svg {...svgProps} viewBox="0 0 24 24" fill="#FFFFFF" stroke="none">
          <polygon points="12 2 2 22 22 22" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps} stroke="#6B5EE4" strokeWidth={1.8}>
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        </svg>
      );
  }
}
