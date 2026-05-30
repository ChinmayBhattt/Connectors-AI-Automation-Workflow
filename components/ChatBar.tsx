"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, ArrowUp, Loader2 } from "lucide-react";
import { useChatStore } from "@/stores/chatStore";
import { VoiceIndicator } from "./VoiceIndicator";
import { ChatThread } from "./ChatThread";
import { cn } from "@/lib/utils";

export function ChatBar() {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const messages = useChatStore((state) => state.messages);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const clearMessages = useChatStore((state) => state.clearMessages);
  const isProcessing = useChatStore((state) => state.isProcessing);
  const isRecording = useChatStore((state) => state.isRecording);
  const setRecording = useChatStore((state) => state.setRecording);

  const hasMessages = messages.length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isProcessing) return;
    sendMessage(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setRecording(false);
    } else {
      setRecording(true);
      setText("");
    }
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      return;
    }

    if (isRecording) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setRecording(false);
        }
      };

      recognition.onend = () => {
        if (isRecording) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (e) {
        console.error("Speech recognition start error:", e);
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording, setRecording]);

  return (
    <div 
      className={cn(
        "z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hasMessages 
          ? "fixed right-6 top-20 bottom-6 w-[430px] bg-bg-surface/90 border border-border backdrop-blur-md p-5 rounded-2xl flex flex-col shadow-modal" 
          : "fixed bottom-8 left-1/2 -translate-x-1/2 w-[min(700px,90vw)] flex flex-col"
      )}
    >
      {/* Sidebar Header (Only visible when chat sidebar is active) */}
      {hasMessages && (
        <div className="border-b border-border pb-3 mb-3 flex items-center justify-between shrink-0 select-none">
          <span className="text-xs uppercase font-mono tracking-widest text-text-secondary">
            Copilot Assistant
          </span>
          <button 
            type="button"
            onClick={clearMessages} 
            className="text-[10px] text-text-muted hover:text-error transition-colors"
          >
            Clear Chat
          </button>
        </div>
      )}

      {/* Chat Messages Thread */}
      <ChatThread />

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          "w-full bg-bg-elevated border rounded-full px-3 py-2 flex items-center gap-3 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)] shrink-0",
          isFocused ? "border-border-bright shadow-[0_0_15px_rgba(59,130,246,0.2),0_20px_60px_rgba(0,0,0,0.5)]" : "border-border"
        )}
      >
        {/* Voice Input Button */}
        <VoiceIndicator
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
        />

        {/* Input Text Box */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          placeholder={
            isRecording
              ? "Listening... Speak now..."
              : "Tell me what you want to automate..."
          }
          className="flex-1 bg-transparent border-0 text-text-primary text-sm placeholder:text-text-muted focus:outline-none py-1.5"
        />

        {/* Send Action Button */}
        <button
          type="submit"
          disabled={!text.trim() || isProcessing}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-1 focus:ring-accent metallic-btn metallic-btn-chromatic",
            text.trim() && !isProcessing
              ? "text-white active:scale-95 cursor-pointer"
              : "text-text-muted cursor-not-allowed opacity-50"
          )}
          aria-label="Send message to automation assistant"
        >
          {isProcessing ? (
            <Loader2 className="animate-spin text-accent-2" size={14} />
          ) : (
            <ArrowUp size={16} strokeWidth={2.5} />
          )}
        </button>
      </form>
    </div>
  );
}
