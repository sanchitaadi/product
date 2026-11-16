"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandedPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="peachy-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0E11] text-[#F7F5F0]"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="w-14 h-14 rounded-2xl bg-[#16181F] border border-[#C5A059]/40 shadow-xl flex items-center justify-center"
              >
                <span className="text-2xl">🍑</span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className="font-serif text-xl tracking-[0.2em] text-[#F7F5F0] font-black uppercase"
            >
              PEACHY PLATE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mt-1 font-mono font-bold"
            >
              Packaged Food &bull; D2C Brand Ecosystem
            </motion.p>
          </motion.div>

          {/* Elegant Loading Line */}
          <div className="w-36 h-0.5 bg-white/10 rounded-full mt-6 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full bg-[#C5A059] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
