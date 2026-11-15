"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Ticket } from "lucide-react";

export default function CircusLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("peachy_g_intro_seen");
      if (!seen) {
        setShow(true);
      }
    } catch {
      setShow(false);
    }
  }, []);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem("peachy_g_intro_seen", "true");
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="circus-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-[#5C0614] flex flex-col items-center justify-center p-4 overflow-hidden select-none"
      >
        {/* Circus Tent Red & Cream Stripes Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 [background:repeating-conic-gradient(#C41E3A_0_15deg,#FFFDD0_15deg_30deg)]" />

        {/* Marquee Glowing Border Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 180 }}
          className="relative z-10 max-w-lg w-full bg-[#FFFDD0] border-6 border-[#C41E3A] rounded-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(255,213,79,0.5)] text-center space-y-6"
        >
          {/* Marquee Bulbs Top Row */}
          <div className="flex justify-center gap-3 -mt-2">
            {[1, 2, 3, 4, 5, 6, 7].map((b) => (
              <span
                key={b}
                className="w-3.5 h-3.5 rounded-full bg-[#FFD54F] border-2 border-[#5C0614] shadow-[0_0_8px_#FFD54F] animate-pulse"
                style={{ animationDelay: `${b * 120}ms` }}
              />
            ))}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#C41E3A] block font-mono">
              STEP RIGHT UP &bull; THE GRAND SHOW BEGINS
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif leading-none">
              CIRCUS SOCIAL
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#5C0614]/80 max-w-sm mx-auto">
              Entering the whimsical culinary big top of Peachy Plate. Golden tickets, flame-baked hearths, and fairground delights await!
            </p>
          </div>

          {/* Golden Ticket Graphic */}
          <div className="inline-flex items-center gap-2 bg-[#FFD54F] text-[#5C0614] px-6 py-2 rounded-full border-2 border-[#5C0614] font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#C41E3A]">
            <Ticket className="w-4 h-4" />
            <span>ADMIT ONE &bull; ALL ATTRACTIONS OPEN</span>
          </div>

          {/* Enter Action Button */}
          <div className="pt-2">
            <button
              onClick={handleDismiss}
              className="w-full bg-[#C41E3A] hover:bg-[#a3162c] text-white font-black uppercase text-xs tracking-widest py-4 rounded-2xl border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-all hover:scale-[1.02] active:scale-95"
            >
              ENTER THE BIG TOP &rarr;
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
