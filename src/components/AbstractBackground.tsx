import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioController } from '../lib/audio';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function AbstractBackground() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [smoothMousePos, setSmoothMousePos] = useState({ x: -100, y: -100 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
      audioController.playRipple();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Smooth lerp movement for the hover orb
  useEffect(() => {
    let animationFrameId: number;

    const updateSmoothPos = () => {
      setSmoothMousePos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animationFrameId = requestAnimationFrame(updateSmoothPos);
    };

    animationFrameId = requestAnimationFrame(updateSmoothPos);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Clean up ripples after animation finishes
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      const now = Date.now();
      setRipples((prev) => prev.filter((r) => now - r.id < 1400));
    }, 1400);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-neutral-50 dark:bg-black transition-colors duration-500">
      
      {/* Liquid Pouring & Cascading Water Simulation */}
      <div className="absolute inset-0 opacity-90 dark:opacity-75 overflow-hidden filter blur-[100px] md:blur-[130px]">
        
        {/* --- WATER SOURCE (Top Pouring Points) --- */}
        <motion.div
          animate={{
            scaleX: [1, 1.4, 0.8, 1.2, 1],
            scaleY: [1, 0.8, 1.3, 0.9, 1],
            borderRadius: ["40% 60% 50% 50% / 30% 30% 70% 70%", "60% 40% 70% 30% / 50% 50% 50% 50%", "40% 60% 50% 50% / 30% 30% 70% 70%"]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-1/4 w-[450px] h-[300px] bg-slate-300/60 dark:bg-neutral-800/80 mix-blend-multiply dark:mix-blend-screen"
        />
        
        <motion.div
          animate={{
            scaleX: [1.2, 0.9, 1.3, 1, 1.2],
            scaleY: [0.9, 1.2, 0.8, 1.1, 0.9],
            borderRadius: ["50% 50% 40% 60% / 40% 40% 60% 60%", "30% 70% 60% 40% / 60% 50% 40% 50%", "50% 50% 40% 60% / 40% 40% 60% 60%"]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-28 right-1/4 w-[500px] h-[350px] bg-neutral-300/50 dark:bg-slate-800/70 mix-blend-multiply dark:mix-blend-screen"
        />


        {/* --- CASCADING STREAMS (Continuous downward flow and stretch) --- */}
        
        {/* Stream 1: Left-Center Cascade */}
        <motion.div
          initial={{ y: "-30vh", x: "15vw" }}
          animate={{
            y: ["-30vh", "115vh"],
            x: ["15vw", "18vw", "12vw", "20vw", "15vw"],
            scaleX: [1.1, 1.7, 0.8, 1.4, 1.1],
            scaleY: [1.8, 1.2, 1.9, 1.3, 1.8],
          }}
          transition={{
            y: { duration: 9, repeat: Infinity, ease: "linear" },
            x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            scaleX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scaleY: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute w-[350px] h-[550px] bg-slate-400/40 dark:bg-neutral-700/55 rounded-full mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Stream 2: Center-Right Swirling Pour */}
        <motion.div
          initial={{ y: "-40vh", x: "45vw" }}
          animate={{
            y: ["-40vh", "115vh"],
            x: ["45vw", "41vw", "49vw", "44vw", "45vw"],
            scaleX: [1.4, 0.8, 1.6, 1.0, 1.4],
            scaleY: [1.3, 1.9, 1.2, 1.7, 1.3],
          }}
          transition={{
            y: { duration: 11, repeat: Infinity, ease: "linear", delay: 2 },
            x: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 },
            scaleX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            scaleY: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute w-[400px] h-[600px] bg-neutral-400/50 dark:bg-slate-750/60 rounded-full mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Stream 3: Right Side Heavy Stream */}
        <motion.div
          initial={{ y: "-35vh", x: "70vw" }}
          animate={{
            y: ["-35vh", "115vh"],
            x: ["70vw", "75vw", "68vw", "73vw", "70vw"],
            scaleX: [1.0, 1.5, 0.9, 1.3, 1.0],
            scaleY: [1.7, 1.1, 1.8, 1.2, 1.7],
          }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "linear", delay: 4.5 },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4.5 },
            scaleX: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            scaleY: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute w-[380px] h-[580px] bg-slate-350/45 dark:bg-neutral-800/65 rounded-full mix-blend-multiply dark:mix-blend-screen"
        />


        {/* --- FAST DROPS / SPLASHES (Agressive Pouring droplets) --- */}
        
        {/* Droplet A */}
        <motion.div
          initial={{ y: "-10vh", x: "30vw" }}
          animate={{
            y: ["-10vh", "110vh"],
            x: ["30vw", "32vw", "28vw", "30vw"],
            scale: [0.7, 1.3, 0.9, 0.7]
          }}
          transition={{
            y: { duration: 5, repeat: Infinity, ease: "easeIn" },
            x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-[200px] h-[200px] bg-neutral-300/60 dark:bg-slate-900/70 rounded-full mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Droplet B */}
        <motion.div
          initial={{ y: "-10vh", x: "60vw" }}
          animate={{
            y: ["-10vh", "110vh"],
            x: ["60vw", "58vw", "62vw", "60vw"],
            scale: [1.2, 0.8, 1.4, 1.2]
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeIn", delay: 1.8 },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-[240px] h-[240px] bg-slate-400/50 dark:bg-neutral-800/85 rounded-full mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Droplet C */}
        <motion.div
          initial={{ y: "-10vh", x: "85vw" }}
          animate={{
            y: ["-10vh", "110vh"],
            x: ["85vw", "82vw", "87vw", "85vw"],
            scale: [0.8, 1.2, 0.7, 0.8]
          }}
          transition={{
            y: { duration: 5.5, repeat: Infinity, ease: "easeIn", delay: 3.2 },
            x: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3.2 },
            scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-[180px] h-[180px] bg-neutral-400/40 dark:bg-neutral-700/60 rounded-full mix-blend-multiply dark:mix-blend-screen"
        />


        {/* --- BOTTOM SPLASH POOL (Surging water accumulation) --- */}
        <motion.div
          animate={{
            y: [10, -30, 20, -10, 10],
            scaleY: [1, 1.25, 0.9, 1.15, 1],
            borderRadius: ["60% 40% 50% 50% / 40% 40% 60% 60%", "40% 60% 30% 70% / 50% 50% 50% 50%", "60% 40% 50% 50% / 40% 40% 60% 60%"]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 left-0 right-0 h-[300px] bg-slate-300/55 dark:bg-neutral-900/90 mix-blend-multiply dark:mix-blend-screen"
        />

        <motion.div
          animate={{
            y: [-20, 30, -10, 15, -20],
            scaleY: [1.1, 0.9, 1.2, 0.95, 1.1],
            borderRadius: ["50% 50% 40% 60% / 30% 30% 70% 70%", "70% 30% 60% 40% / 50% 50% 50% 50%", "50% 50% 40% 60% / 30% 30% 70% 70%"]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-32 left-1/6 right-1/6 h-[320px] bg-neutral-400/45 dark:bg-slate-800/80 mix-blend-multiply dark:mix-blend-screen"
        />

      </div>

      {/* Subtle Tech Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-100" 
      />

      {/* Hover cursor following blob (Significantly increased visibility for light mode) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-neutral-300/40 dark:bg-neutral-800/30 blur-[70px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: `${smoothMousePos.x}px`,
          top: `${smoothMousePos.y}px`,
        }}
      />

      {/* Hover cursor center accent glow (Sharper & more noticeable) */}
      <div
        className="absolute w-[180px] h-[180px] rounded-full bg-neutral-400/35 dark:bg-neutral-700/25 blur-[25px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: `${smoothMousePos.x}px`,
          top: `${smoothMousePos.y}px`,
        }}
      />

      {/* Click Ripples (More smooth-textured, layered, and apparent) */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div key={ripple.id} className="pointer-events-none">
            {/* Primary Ripple ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 12, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neutral-400/50 dark:border-neutral-200/40 shadow-[0_0_20px_rgba(150,150,150,0.15)] dark:shadow-[0_0_25px_rgba(255,255,255,0.15)] pointer-events-none"
            />
            {/* Secondary Ripple ring (Staggered for that smooth, high-fidelity liquid wave texture) */}
            <motion.div
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 10, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300/40 dark:border-neutral-400/30 bg-neutral-400/5 dark:bg-neutral-100/5 pointer-events-none"
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
