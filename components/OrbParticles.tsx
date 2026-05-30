"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

export function OrbParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (initRandomY = false): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: initRandomY ? Math.random() * canvas.height : canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05, // drifting upwards
        radius: Math.random() * 1.5 + 0.5,
        alpha: 0,
        targetAlpha: Math.random() * 0.25 + 0.05,
      };
    };

    const initParticles = () => {
      particles = Array.from({ length: maxParticles }, () => createParticle(true));
    };

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Fade in
        if (p.alpha < p.targetAlpha) {
          p.alpha += 0.005;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`; // Blue Accent color tone
        ctx.fill();

        // Respawn if offscreen
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
        }
      });
    };

    const tick = () => {
      updateParticles();
      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    initParticles();
    tick();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
