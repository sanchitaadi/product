"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Zap, ArrowRight, ShieldAlert } from "lucide-react";

export default function MetroLoader() {
  const [show, setShow] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [stationIndex, setStationIndex] = useState(0);

  const stations = [
    "CENTRAL DEPOT",
    "FLAVOR JUNCTION",
    "WOOD-FIRE TERMINAL",
    "PEACHY PLATFORM 1",
  ];

  useEffect(() => {
    const seen = sessionStorage.getItem("peachy_e_intro_seen");
    if (!seen) {
      setShow(true);

      const interval = setInterval(() => {
        setStationIndex((prev) => {
          if (prev < stations.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 450);

      const doorTimer = setTimeout(() => {
        setDoorsOpen(true);
      }, 1900);

      const finishTimer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("peachy_e_intro_seen", "true");
      }, 2600);

      return () => {
        clearInterval(interval);
        clearTimeout(doorTimer);
        clearTimeout(finishTimer);
      };
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none flex">
        {/* Left Metro Sliding Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: doorsOpen ? "-100%" : 0 }}
          transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-[#08142C] border-r-4 border-[#FFD100] flex flex-col justify-between p-8 relative shadow-2xl"
        >
          {/* Top Yellow Warning Strip */}
          <div className="bg-[#FFD100] text-[#08142C] py-2 px-4 font-mono font-black text-xs uppercase tracking-widest border-2 border-black inline-block self-start">
            ⚠️ METRO BITES LINE &bull; TRAIN DOORS
          </div>

          {/* Left Door Graphics */}
          <div className="flex flex-col items-end pr-8 space-y-3">
            <span className="text-4xl">🚆</span>
            <span className="font-mono text-3xl font-black text-[#FFD100] tracking-tighter uppercase">
              PEACHY
            </span>
            <div className="h-1 w-24 bg-[#D71920]" />
          </div>

          {/* Bottom Warning */}
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            DO NOT LEAN AGAINST CLOSING DOORS
          </span>
        </motion.div>

        {/* Right Metro Sliding Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: doorsOpen ? "100%" : 0 }}
          transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-[#08142C] border-l-4 border-[#FFD100] flex flex-col justify-between p-8 relative shadow-2xl"
        >
          {/* Top Station Indicator */}
          <div className="bg-[#D71920] text-white py-2 px-4 font-mono font-black text-xs uppercase tracking-widest border-2 border-black inline-block self-end">
            EXPRESS TRAIN &bull; IN TRANSIT
          </div>

          {/* Right Door Graphics */}
          <div className="flex flex-col items-start pl-8 space-y-3">
            <span className="text-4xl">⚡</span>
            <span className="font-mono text-3xl font-black text-white tracking-tighter uppercase">
              METRO
            </span>
            <div className="h-1 w-24 bg-[#FFD100]" />
          </div>

          {/* Station Announcer */}
          <div className="font-mono text-xs text-[#FFD100] uppercase tracking-wider self-end text-right">
            <span>NEXT STATION: </span>
            <strong className="text-white underline">{stations[stationIndex]}</strong>
          </div>
        </motion.div>

        {/* Center Station Departure Flip Banner */}
        <AnimatePresence>
          {!doorsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 m-auto w-80 sm:w-96 h-44 bg-black border-4 border-[#FFD100] p-6 text-center flex flex-col justify-between shadow-[8px_8px_0px_#D71920] z-20"
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#FFD100] tracking-widest uppercase border-b border-white/20 pb-2">
                <span>PEACHY METRO</span>
                <span className="animate-pulse">● LIVE TRANSIT</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-400 block tracking-widest uppercase">
                  APPROACHING STATION
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-tight uppercase">
                  {stations[stationIndex]}
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#D71920] h-full transition-all duration-300"
                  style={{ width: `${((stationIndex + 1) / stations.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
