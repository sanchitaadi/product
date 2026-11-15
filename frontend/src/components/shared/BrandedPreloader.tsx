"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandedPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900); // Quick, elegant 900ms branded entrance
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="peachy-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF8F9] text-[#2B2118]"
        >
          {/* Animated Cloche Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFCAD4] via-[#FFE5D9] to-[#FFF0F3] shadow-md flex items-center justify-center border border-[#E07A86]/20"
              >
                <span className="text-3xl">🍑</span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-serif text-2xl tracking-wider text-[#2B2118] font-bold"
            >
              PEACHY PLATE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-xs uppercase tracking-widest text-[#E07A86] mt-1 font-medium"
            >
              Good Food &bull; Cute Moods
            </motion.p>
          </motion.div>

          {/* Elegant Loading Line */}
          <div className="w-36 h-1 bg-rose-100 rounded-full mt-6 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut" }}
              className="w-full h-full bg-[#E07A86] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
