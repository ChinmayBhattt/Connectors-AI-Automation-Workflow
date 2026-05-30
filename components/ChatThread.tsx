"use client";

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { useChatStore } from "@/stores/chatStore";
import { cn } from "@/lib/utils";

export function ChatThread() {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messages.length]);

  if (messages.length === 0) return null;

  return (
    <div 
      className={cn(
        "w-full flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin",
        hasMessages ? "flex-1 min-h-0 mb-2" : "max-h-[40vh] mb-4"
      )}
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
