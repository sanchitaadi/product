"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Zap, Flame } from "lucide-react";

interface RetroLoaderProps {
  onComplete?: () => void;
  isReady?: boolean;
}

export default function RetroLoader({ onComplete, isReady = true }: RetroLoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(15);
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const messages = [
    "PREPARING SOMETHING DELICIOUS...",
    "FLIPPING THE GOOD STUFF...",
    "ADDING EXTRA CHEESE...",
    "GETTING THE PARTY STARTED!",
  ];

  useEffect(() => {
    // Check session storage to avoid annoying repeated full loader on every click
    const hasLoaded = sessionStorage.getItem("peachy_b_intro_seen");

    if (hasLoaded) {
      // Fast path for subsequent navigations
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 250);
      return () => clearTimeout(timer);
    }

    // First time in session: run high-voltage retro intro sequence
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 450);

    // Realistic progress animation linked to readiness
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) return prev + Math.floor(Math.random() * 12 + 6);
        if (isReady && prev < 98) return prev + 6;
        if (isReady && prev >= 98) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          sessionStorage.setItem("peachy_b_intro_seen", "true");
          setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev;
      });
    }, 120);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isReady, onComplete, messages.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="retro-loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: shouldReduceMotion ? 0 : "-100%",
            opacity: shouldReduceMotion ? 0 : 1,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 bg-[#FFE15D] text-black flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none border-b-8 border-black"
        >
          {/* Top Checkerboard Border Strip */}
          <div className="h-6 w-full pattern-checkerboard-red border-4 border-black shadow-[4px_4px_0px_#000] rounded-xl overflow-hidden animate-checkerboard" />

          {/* Central Animated Retro Comic Stage */}
          <div className="max-w-xl mx-auto w-full text-center space-y-6 relative z-10 my-auto">
            {/* Bouncing Logo Emblem */}
            <motion.div
              animate={{
                y: shouldReduceMotion ? 0 : [-8, 8, -8],
                rotate: shouldReduceMotion ? 0 : [-3, 3, -3],
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="inline-block relative"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-[#FF2A55] rounded-3xl border-4 border-black flex items-center justify-center text-5xl shadow-[6px_6px_0px_#000]">
                🍑
              </div>
              <div className="absolute -top-3 -right-3 p-1.5 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] rotate-12">
                <Zap className="w-5 h-5 text-[#FFE15D] fill-[#FFE15D]" />
              </div>
            </motion.div>

            {/* Kinetic Typography */}
            <div className="space-y-1">
              <span className="text-xs font-retro-bold font-black uppercase tracking-[0.25em] text-[#FF2A55] bg-white px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_#000] inline-block">
                ★ 90s RETRO DINER WORLD ★
              </span>
              <h1 className="font-retro-bold font-black text-4xl sm:text-6xl uppercase tracking-tight text-pop-cherry">
                PEACHY PLATE
              </h1>
            </div>

            {/* Large Animated LOADING Indicator */}
            <div className="flex items-center justify-center gap-1.5 font-retro-bold font-black text-xl sm:text-2xl text-black">
              <span>L</span>
              <motion.span animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}>O</motion.span>
              <motion.span animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}>A</motion.span>
              <motion.span animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}>D</motion.span>
              <motion.span animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}>I</motion.span>
              <motion.span animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.5 }}>N</motion.span>
              <motion.span animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.6 }}>G</motion.span>
              <span className="text-[#FF2A55] ml-1 font-mono text-2xl">
                {Math.min(progress, 100)}%
              </span>
            </div>

            {/* Thick Neo-Brutalist Progress Bar */}
            <div className="w-full bg-white border-4 border-black rounded-2xl h-8 p-1 shadow-[6px_6px_0px_#000] relative overflow-hidden">
              <motion.div
                className="h-full bg-[#FF2A55] rounded-xl relative overflow-hidden"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              >
                <div className="absolute inset-0 pattern-stripes-yellow opacity-40 animate-checkerboard" />
              </motion.div>
            </div>

            {/* Playful Changing Messages */}
            <div className="min-h-[28px]">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-xs sm:text-sm font-retro-bold font-black text-black/80 uppercase tracking-wider"
              >
                {messages[messageIndex]}
              </motion.p>
            </div>
          </div>

          {/* Bottom Running Comic Marquee */}
          <div className="bg-[#121212] text-[#FFE15D] text-xs font-retro-bold font-black py-2 px-4 border-4 border-black rounded-xl shadow-[4px_4px_0px_#000] overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
              <span>⚡ 48-HR SOURDOUGH PIZZAS</span>
              <span>•</span>
              <span>🍕 CHEESE-DRENCHED RIGATONI</span>
              <span>•</span>
              <span>🍵 MATCHA CLOUD FOAM</span>
              <span>•</span>
              <span>🍰 NY BERRY CHEESECAKE</span>
              <span>•</span>
              <span>⚡ 48-HR SOURDOUGH PIZZAS</span>
              <span>•</span>
              <span>🍕 CHEESE-DRENCHED RIGATONI</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
