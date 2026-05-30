"use client";

import { create } from "zustand";
import { SIMULATED_AI_RESPONSES, type WorkflowStep } from "@/lib/mockData";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
  workflowSteps?: WorkflowStep[];
  isStreaming?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  isProcessing: boolean;
  isRecording: boolean;
  sendMessage: (text: string) => void;
  setRecording: (recording: boolean) => void;
  clearMessages: () => void;
  runWorkflow: (messageId: string) => void;
}

let messageCounter = 0;

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isProcessing: false,
  isRecording: false,

  sendMessage: (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${++messageCounter}`,
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isProcessing: true,
    }));

    // Find matching simulated response
    const lowerText = text.toLowerCase();
    const matched = SIMULATED_AI_RESPONSES.find((r) =>
      lowerText.includes(r.trigger)
    );
    const response = matched || SIMULATED_AI_RESPONSES.find((r) => r.trigger === "default")!;

    // Simulate AI thinking time
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${++messageCounter}`,
        role: "assistant",
        content: response.response,
        createdAt: new Date(),
        workflowSteps: response.workflowSteps,
        isStreaming: true,
      };

      set((state) => ({
        messages: [...state.messages, aiMsg],
        isProcessing: false,
      }));

      // Stop streaming after a bit
      setTimeout(() => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === aiMsg.id ? { ...m, isStreaming: false } : m
          ),
        }));
      }, 1500);
    }, 1200 + Math.random() * 800);
  },

  setRecording: (recording: boolean) => {
    set({ isRecording: recording });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  runWorkflow: (messageId: string) => {
    const messages = get().messages;
    const msg = messages.find((m) => m.id === messageId);
    if (!msg?.workflowSteps) return;

    // Simulate workflow execution step by step
    msg.workflowSteps.forEach((step, index) => {
      setTimeout(() => {
        set((state) => ({
          messages: state.messages.map((m) => {
            if (m.id !== messageId || !m.workflowSteps) return m;
            return {
              ...m,
              workflowSteps: m.workflowSteps.map((s, i) => {
                if (i < index) return { ...s, status: "complete" as const };
                if (i === index) return { ...s, status: "running" as const };
                return s;
              }),
            };
          }),
        }));
      }, (index + 1) * 1200);
    });

    // Mark all complete
    setTimeout(
      () => {
        set((state) => ({
          messages: state.messages.map((m) => {
            if (m.id !== messageId || !m.workflowSteps) return m;
            return {
              ...m,
              workflowSteps: m.workflowSteps.map((s) => ({
                ...s,
                status: "complete" as const,
              })),
            };
          }),
        }));
      },
      (msg.workflowSteps.length + 1) * 1200
    );
  },
}));
