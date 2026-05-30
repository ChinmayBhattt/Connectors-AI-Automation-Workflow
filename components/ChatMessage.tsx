"use client";

import React from "react";
import { ChatMessage as ChatMessageType } from "@/stores/chatStore";
import { AppIcon } from "./AppIcon";
import { WorkflowPreview } from "./WorkflowPreview";
import { cn } from "@/lib/utils";
import { getAppById } from "@/lib/apps";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const uniqueAppIds = Array.from(
    new Set(message.workflowSteps?.map((step) => step.appId) || [])
  );

  return (
    <div
      className={cn(
        "flex w-full mt-4 first:mt-0 animate-fade-in-up",
        isUser ? "justify-end" : "justify-start"
      )}
      style={{
        animation: "chat-message-enter 350ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <style jsx global>{`
        @keyframes chat-message-enter {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="max-w-[85vw] md:max-w-[70%] flex flex-col">
        {/* Chat bubble body */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed relative shadow-sm border",
            isUser
              ? "bg-accent border-accent-hover text-white rounded-br-sm"
              : "bg-bg-surface border-border text-text-primary rounded-bl-sm"
          )}
        >
          {/* App Pills Row (AI Response Only) */}
          {!isUser && uniqueAppIds.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              <span className="text-[10px] uppercase font-mono text-text-secondary mr-1">
                Apps used:
              </span>
              {uniqueAppIds.map((appId) => {
                const app = getAppById(appId);
                return (
                  <div
                    key={appId}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-bg-elevated border border-border-bright text-[10px] font-medium text-text-primary"
                  >
                    <AppIcon id={appId} size={11} />
                    <span>{app?.name || appId}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Text Message */}
          <div className="whitespace-pre-wrap">{message.content}</div>

          {/* Streaming cursor if processing */}
          {message.isStreaming && (
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-accent-2 animate-pulse align-middle" />
          )}
        </div>

        {/* Workflow Confirmation Card */}
        {!isUser && message.workflowSteps && message.workflowSteps.length > 0 && (
          <WorkflowPreview messageId={message.id} steps={message.workflowSteps} />
        )}
      </div>
    </div>
  );
}
