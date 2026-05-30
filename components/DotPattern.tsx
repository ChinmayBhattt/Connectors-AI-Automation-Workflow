"use client";

import React, { useEffect, useId } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  dotSize?: number;
  className?: string;
}

export function DotPattern({
  width = 20,
  height = 20,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  dotSize = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to glide the background when user moves cursor
  const springConfig = { damping: 50, stiffness: 200, mass: 0.8 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const dx = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const dy = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Parallax translation (shift up to 16px)
      mouseX.set(dx * -16);
      mouseY.set(dy * -16);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: translateX,
        y: translateY,
        willChange: "transform",
      }}
      className="fixed inset-[-32px] pointer-events-none z-0 overflow-hidden"
    >
      <svg
        aria-hidden="true"
        className={cn(
          "h-full w-full text-white/[0.15]", // Increased brightness/opacity for visibility
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <circle
              id="pattern-circle"
              cx={cx}
              cy={cy}
              r={dotSize}
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>
    </motion.div>
  );
}

export default DotPattern;
