"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickBurst {
  id: number;
  x: number;
  y: number;
  text: string;
}

export default function RetroCustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bursts, setBursts] = useState<ClickBurst[]>([]);

  useEffect(() => {
    // Check if device supports hover / fine cursor
    if (typeof window === "undefined") return;
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive target
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest(".cursor-pointer") ||
          target.tagName === "A" ||
          target.tagName === "BUTTON")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const words = ["💥 BAM!", "🍕 YUM!", "✨ POP!", "⚡ WOW!", "🔥 FRESH!"];

    const onClick = (e: MouseEvent) => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const newBurst: ClickBurst = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        text: randomWord,
      };
      setBursts((prev) => [...prev.slice(-3), newBurst]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 700);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Retro Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border-2 border-black flex items-center justify-center font-retro-bold font-black select-none"
        animate={{
          x: pos.x - (isHovering ? 20 : 12),
          y: pos.y - (isHovering ? 20 : 12),
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
          backgroundColor: isHovering ? "#FF2A55" : "#FFE15D",
          scale: isHovering ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 450,
          mass: 0.2,
        }}
      >
        {isHovering && (
          <span className="text-[9px] text-white select-none">✦</span>
        )}
      </motion.div>

      {/* Central Cursor Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-black rounded-full pointer-events-none z-50 select-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: pos.x, top: pos.y }}
      />

      {/* Comic Pop Bursts on Click */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 1, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.3, y: -28 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{ left: burst.x, top: burst.y }}
            className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="inline-block px-2 py-0.5 bg-[#FFE15D] text-black border-2 border-black font-retro-bold font-black text-xs uppercase tracking-wider rounded-md shadow-[3px_3px_0px_#000] rotate-[-6deg]">
              {burst.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
