"use client";

import React from "react";
import { motion } from "framer-motion";
import { Train, Navigation, Compass, MapPin } from "lucide-react";

interface MetroStation {
  id: string;
  name: string;
  category: string;
  line: string;
  lineColor: string;
  code: string;
  platform: string;
  coords: { x: number; y: number };
}

const STATIONS: MetroStation[] = [
  { id: "st-all", name: "CENTRAL DEPOT", category: "all", line: "Main Terminal", lineColor: "#FFD100", code: "DEP-00", platform: "PLAT 0", coords: { x: 50, y: 75 } },
  { id: "st-app", name: "STARTER JUNCTION", category: "Starters", line: "Yellow Line", lineColor: "#FFD100", code: "STR-01", platform: "PLAT 1", coords: { x: 220, y: 75 } },
  { id: "st-piz", name: "PIZZA CENTRAL", category: "Pizza", line: "Red Line", lineColor: "#D71920", code: "PIZ-02", platform: "PLAT 2", coords: { x: 390, y: 75 } },
  { id: "st-pas", name: "PASTA STREET", category: "Pasta", line: "Red Line", lineColor: "#D71920", code: "PAS-03", platform: "PLAT 3", coords: { x: 560, y: 75 } },
  { id: "st-ent", name: "ENTRÉE TERMINAL", category: "Main Course", line: "Blue Line", lineColor: "#0055FF", code: "ENT-04", platform: "PLAT 4", coords: { x: 730, y: 75 } },
  { id: "st-des", name: "DESSERT EXPRESS", category: "Desserts", line: "Yellow Line", lineColor: "#FFD100", code: "DES-05", platform: "PLAT 5", coords: { x: 900, y: 75 } },
  { id: "st-bev", name: "BEVERAGE DEPOT", category: "Beverages", line: "Green Line", lineColor: "#00A859", code: "BEV-06", platform: "PLAT 6", coords: { x: 1070, y: 75 } },
];

interface MetroRouteMapProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function MetroRouteMap({ activeCategory, onSelectCategory }: MetroRouteMapProps) {
  const activeStation = STATIONS.find(
    (s) => s.category.toLowerCase() === activeCategory.toLowerCase()
  ) || STATIONS[0];

  return (
    <div className="bg-[#08142C] border-4 border-[#FFD100] p-6 sm:p-8 rounded-2xl shadow-[10px_10px_0px_#000] text-white relative overflow-hidden">
      {/* Top Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-white/20 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#D71920] text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-white">
              INTERACTIVE TRANSIT MAP
            </span>
            <span className="text-xs font-mono text-[#FFD100] tracking-wider uppercase font-bold">
              PEACHY METRO FOODWAY
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-mono font-black uppercase tracking-tight text-white">
            SELECT STATION TO BOARD DISHES
          </h3>
        </div>

        {/* Current Active Station Indicator */}
        <div className="bg-[#0D1F42] border-2 border-[#FFD100] p-3 rounded-lg flex items-center gap-3">
          <Train className="w-5 h-5 text-[#FFD100]" />
          <div>
            <span className="text-[9px] font-mono uppercase text-gray-400 block tracking-widest">
              CURRENT STOP &bull; {activeStation.platform}
            </span>
            <span className="text-sm font-mono font-black text-white uppercase">
              {activeStation.name}
            </span>
          </div>
        </div>
      </div>

      {/* Metro Route Track Line Interactive Viewport */}
      <div className="overflow-x-auto py-8 scrollbar-none">
        <div className="min-w-[1150px] relative px-4 select-none">
          {/* Background Track Line */}
          <div className="absolute top-[82px] left-12 right-12 h-3.5 bg-black/60 border-y-2 border-white/20 rounded-full" />
          <div className="absolute top-[85px] left-12 right-12 h-2 bg-gradient-to-r from-[#FFD100] via-[#D71920] via-[#0055FF] to-[#00A859] rounded-full opacity-80" />

          {/* Interactive Stations */}
          <div className="flex justify-between items-start relative z-10">
            {STATIONS.map((station) => {
              const isActive =
                station.category.toLowerCase() === activeCategory.toLowerCase() ||
                (station.category === "all" && activeCategory === "all");

              return (
                <button
                  key={station.id}
                  onClick={() => onSelectCategory(station.category)}
                  className="flex flex-col items-center group cursor-pointer text-center focus:outline-none w-36"
                >
                  {/* Station Code Badge */}
                  <span
                    className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 mb-2 rounded border transition-all ${
                      isActive
                        ? "bg-[#FFD100] text-[#08142C] border-white shadow-[2px_2px_0px_#000] scale-110"
                        : "bg-black/50 text-gray-300 border-white/20 group-hover:border-[#FFD100] group-hover:text-white"
                    }`}
                  >
                    {station.code}
                  </span>

                  {/* Station Circle Node */}
                  <div className="relative mb-3 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.25, 1.15] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-9 h-9 rounded-full border-4 flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-white border-[#D71920] shadow-[0_0_15px_#FFD100]"
                          : "bg-[#08142C] border-white group-hover:border-[#FFD100]"
                      }`}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: station.lineColor }}
                      />
                    </motion.div>

                    {/* Moving Train Tag on Active Station */}
                    {isActive && (
                      <motion.div
                        layoutId="metroTrainMarker"
                        className="absolute -top-7 text-sm font-black text-[#FFD100] animate-bounce"
                      >
                        🚆
                      </motion.div>
                    )}
                  </div>

                  {/* Station Name & Platform */}
                  <span
                    className={`font-mono text-xs uppercase tracking-tight block font-black leading-tight transition-colors ${
                      isActive
                        ? "text-[#FFD100] underline decoration-[#D71920] decoration-2"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {station.name}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase block">
                    {station.platform}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 gap-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD100]" />
            <span>Yellow Express</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D71920]" />
            <span>Red Hearth Line</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0055FF]" />
            <span>Blue Gourmet Line</span>
          </span>
        </div>
        <span className="text-[#FFD100]">
          💡 Click any station stop to switch the active kitchen line!
        </span>
      </div>
    </div>
  );
}
