"use client";

import React, { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceIndicatorProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

export function VoiceIndicator({ isRecording, onToggleRecording }: VoiceIndicatorProps) {
  const barsCount = 6;
  const [heights, setHeights] = useState<number[]>(Array(barsCount).fill(0.2));

  useEffect(() => {
    if (!isRecording) {
      setHeights(Array(barsCount).fill(0.2));
      return;
    }

    let animId: number;
    let localStream: MediaStream | null = null;
    let localCtx: AudioContext | null = null;

    const startAudio = async () => {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStream = audioStream;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        localCtx = ctx;

        const analyserNode = ctx.createAnalyser();
        analyserNode.fftSize = 32;

        const source = ctx.createMediaStreamSource(audioStream);
        source.connect(analyserNode);

        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

        const updateAnalyser = () => {
          analyserNode.getByteFrequencyData(dataArray);
          
          // Map frequency bins to the 6 bars (normalize to 0.15 - 0.95 range)
          const newHeights = Array.from({ length: barsCount }, (_, i) => {
            const val = dataArray[i] || 0;
            return Math.max(0.15, Math.min(0.95, (val / 255) * 1.6 + 0.15));
          });
          setHeights(newHeights);
          animId = requestAnimationFrame(updateAnalyser);
        };
        updateAnalyser();
      } catch (err) {
        console.error("Microphone access denied or error:", err);
        // Fallback to random heights simulation if permission is denied
        const interval = setInterval(() => {
          setHeights(
            Array.from({ length: barsCount }, () => Math.random() * 0.75 + 0.2)
          );
        }, 120);
        
        (window as any)._fallbackInterval = interval;
      }
    };

    startAudio();

    return () => {
      cancelAnimationFrame(animId);
      if ((window as any)._fallbackInterval) {
        clearInterval((window as any)._fallbackInterval);
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (localCtx && localCtx.state !== "closed") {
        localCtx.close();
      }
    };
  }, [isRecording]);

  return (
    <button
      onClick={onToggleRecording}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent metallic-btn metallic-btn-chromatic",
        isRecording
          ? "bg-error/15 border-error/30 text-error shadow-[0_0_15px_rgba(242,92,92,0.25)]"
          : "text-text-secondary hover:text-text-primary"
      )}
      aria-label={isRecording ? "Stop recording voice input" : "Start recording voice input"}
    >
      {isRecording ? (
        <div className="flex items-center gap-0.5 h-4 w-4 justify-center">
          {heights.map((h, i) => (
            <div
              key={i}
              className="bg-error w-[1.5px] rounded-full transition-all duration-100 ease-out"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      ) : (
        <Mic size={16} strokeWidth={2} />
      )}
    </button>
  );
}
