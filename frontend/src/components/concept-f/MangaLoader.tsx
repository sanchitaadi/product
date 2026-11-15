"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";

export default function MangaLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("peachy_f_intro_seen");
      if (!seen) {
        setShow(true);
      }
    } catch {
      setShow(false);
    }
  }, []);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem("peachy_f_intro_seen", "true");
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="manga-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-[#FFFDF7] flex flex-col items-center justify-center p-4 overflow-hidden select-none"
      >
        {/* Manga Speed Lines Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 [background:repeating-conic-gradient(#000_0_2deg,transparent_2deg_10deg)]" />

        {/* Halftone Dot Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

        {/* Manga Comic Panel Shutter Container */}
        <motion.div
          initial={{ scale: 0.85, rotate: -2, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="relative z-10 max-w-lg w-full bg-white border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_#D7263D] text-center space-y-6"
        >
          {/* Action Onomatopoeia Tag */}
          <div className="inline-block px-4 py-1.5 bg-[#D7263D] text-white font-black text-sm uppercase tracking-widest border-2 border-black -rotate-2 shadow-[4px_4px_0px_#000]">
            ドドド... DON!!
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#D7263D] block font-mono">
              WEEKLY SHONEN BITES &bull; VOL. 07
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              MANGA BITES
            </h1>
            <p className="text-xs sm:text-sm font-bold text-gray-700 max-w-sm mx-auto">
              Entering the interactive culinary comic realm of Peachy Plate. Prepare your chopsticks!
            </p>
          </div>

          {/* Sound Effect Speech Bubble */}
          <div className="relative inline-block bg-[#FFE600] border-3 border-black px-6 py-2.5 rounded-full font-black text-xs text-black shadow-[4px_4px_0px_#000]">
            <span>ITADAKIMASU! いただきます</span>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFE600] border-r-3 border-b-3 border-black rotate-45" />
          </div>

          {/* Enter Action Button */}
          <div className="pt-4">
            <button
              onClick={handleDismiss}
              className="w-full bg-black hover:bg-[#D7263D] text-white font-black uppercase text-xs tracking-widest py-4 border-3 border-black shadow-[5px_5px_0px_#FFE600] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              READ CHAPTER 01 &bull; OPEN COMIC &rarr;
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
