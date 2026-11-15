"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function RetroScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-2 bg-black/20 overflow-hidden">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-[#FF2A55] origin-left border-b-2 border-black relative"
      >
        {/* Animated Checkerboard Overlay on Progress Bar */}
        <div className="absolute inset-0 pattern-stripes-yellow opacity-40 animate-checkerboard" />
      </motion.div>
    </div>
  );
}
