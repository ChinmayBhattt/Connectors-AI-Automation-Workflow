"use client";

import React from "react";
import { WorkflowStep } from "@/lib/mockData";
import { AppIcon } from "./AppIcon";
import { useChatStore } from "@/stores/chatStore";
import { Play, Check, Edit2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowPreviewProps {
  messageId: string;
  steps: WorkflowStep[];
}

export function WorkflowPreview({ messageId, steps }: WorkflowPreviewProps) {
  const runWorkflow = useChatStore((state) => state.runWorkflow);
  
  const isAnyRunning = steps.some((s) => s.status === "running");
  const isAllComplete = steps.every((s) => s.status === "complete");

  const handleRun = () => {
    runWorkflow(messageId);
  };

  return (
    <div className="mt-4 border border-border bg-bg-surface/60 rounded-xl p-5 shadow-card max-w-[500px]">
      <h4 className="font-display font-medium text-xs text-text-accent tracking-wide uppercase mb-4">
        Workflow Proposal
      </h4>

      {/* Steps List */}
      <div className="relative pl-3 flex flex-col gap-5">
        {steps.map((step, index) => {
          const isComplete = step.status === "complete";
          const isRunning = step.status === "running";
          const isPending = step.status === "pending";

          return (
            <div key={step.id} className="relative flex items-start gap-4">
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-4 top-9 bottom-[-16px] w-[2px] transition-colors duration-500",
                    isComplete ? "bg-accent" : "bg-border"
                  )}
                >
                  {/* Pulse flow animation */}
                  {isComplete && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-accent-2 to-transparent w-full h-[60%] animate-pulse" />
                  )}
                </div>
              )}

              {/* Step bubble */}
              <div
                className={cn(
                  "w-8 h-8 rounded-lg bg-bg-elevated border flex items-center justify-center relative z-10 transition-all duration-300",
                  isComplete && "border-accent bg-accent/5 shadow-[0_0_10px_rgba(107,94,228,0.2)]",
                  isRunning && "border-accent-2 bg-accent-2/5 animate-pulse",
                  isPending && "border-border"
                )}
              >
                <AppIcon id={step.appId} size={16} />
              </div>

              {/* Step info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-text-primary block truncate">
                    {step.appName}
                  </span>
                  {/* Status Indicator */}
                  <span className="flex items-center gap-1.5 shrink-0">
                    {isComplete && (
                      <span className="flex items-center gap-1 text-[10px] text-success font-medium">
                        <Check size={12} strokeWidth={2.5} /> Done
                      </span>
                    )}
                    {isRunning && (
                      <span className="flex items-center gap-1 text-[10px] text-accent-2 font-medium">
                        <Loader2 className="animate-spin" size={12} /> Running
                      </span>
                    )}
                    {isPending && (
                      <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">
                        Pending
                      </span>
                    )}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1 leading-normal truncate">
                  {step.action}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
        <button
          onClick={handleRun}
          disabled={isAnyRunning || isAllComplete}
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all",
            isAllComplete
              ? "bg-success-bg border border-success/20 text-success cursor-default"
              : isAnyRunning
                ? "bg-bg-elevated border border-border text-text-muted cursor-wait"
                : "bg-accent hover:bg-accent-hover text-white border border-accent-hover/30 shadow-[0_4px_12px_rgba(107,94,228,0.2)]"
          )}
        >
          {isAllComplete ? (
            <>
              <Check size={14} strokeWidth={2.5} /> Execution Complete
            </>
          ) : isAnyRunning ? (
            <>
              <Loader2 className="animate-spin" size={14} /> Executing Steps...
            </>
          ) : (
            <>
              <Play size={12} fill="currentColor" /> Run Workflow
            </>
          )}
        </button>
        
        <button
          disabled={isAnyRunning || isAllComplete}
          className={cn(
            "py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all",
            (isAnyRunning || isAllComplete)
              ? "border-border text-text-muted cursor-not-allowed"
              : "border-border hover:border-border-bright text-text-secondary hover:text-text-primary bg-bg-surface hover:bg-bg-hover"
          )}
        >
          <Edit2 size={12} /> Edit
        </button>
      </div>
    </div>
  );
}
