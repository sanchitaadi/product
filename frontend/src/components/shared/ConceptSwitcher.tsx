"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronUp, Sparkles, Zap, LayoutDashboard, Home } from "lucide-react";

export default function ConceptSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 shadow-2xl flex flex-col gap-2 min-w-[270px] max-h-[80vh] overflow-y-auto"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 pt-1 flex items-center justify-between">
              <span>Packaged Food Brand Samples</span>
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
                D2C CPG
              </span>
            </div>

            <Link
              href="/concept-a/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/concept-a")
                  ? "bg-[#0D0E11] text-[#C5A059] font-bold shadow-sm"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-[#16181F] text-[#C5A059] flex items-center justify-center text-xs font-serif font-black">
                ✦
              </span>
              <div className="flex-1">
                <div>Sample 01: Maison Reserve</div>
                <div className="text-[10px] text-gray-400 font-normal">Noir &amp; Gold Haute Cacao</div>
              </div>
            </Link>

            <Link
              href="/concept-b/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/concept-b")
                  ? "bg-amber-100 text-amber-950 font-bold border border-amber-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-[#FFE15D] text-black border border-black flex items-center justify-center text-xs">
                ⚡
              </span>
              <div className="flex-1">
                <div>Sample 02: Super Crunch Co.</div>
                <div className="text-[10px] text-gray-400 font-normal">90s Bodega Snacks &amp; Sodas</div>
              </div>
            </Link>

            <Link
              href="/concept-c/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/concept-c")
                  ? "bg-[#FFE600] text-black font-bold border-2 border-black"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-[#FF007F] text-white flex items-center justify-center text-xs">
                🎨
              </span>
              <div className="flex-1">
                <div>Sample 03: Pop Flavor Lab</div>
                <div className="text-[10px] text-gray-400 font-normal">Maximalist Hot Sauces &amp; Crunch</div>
              </div>
            </Link>

            <Link
              href="/concept-d/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/concept-d")
                  ? "bg-[#1E3F20] text-[#FDFBF7] font-bold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-[#5E6B4E] text-white flex items-center justify-center text-xs">
                🌿
              </span>
              <div className="flex-1">
                <div>Sample 04: Terra Pure</div>
                <div className="text-[10px] text-gray-400 font-normal">Organic Farmstead Living Soils</div>
              </div>
            </Link>

            <div className="h-px bg-gray-200 my-1" />

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold hover:bg-gray-100 text-gray-700"
            >
              <Home className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <div>All Samples Portal</div>
              </div>
            </Link>

            <Link
              href="/admin/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/admin")
                  ? "bg-slate-900 text-white font-bold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-500" />
              <div className="flex-1">
                <div>Admin SaaS Dashboard</div>
                <div className="text-[10px] text-gray-400 font-normal">Live Catalog &amp; Orders</div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-black text-white text-xs font-bold shadow-xl border border-white/20 backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-all"
      >
        <Layers className="w-4 h-4 text-amber-400" />
        <span className="hidden sm:inline">Switch Sample Design</span>
        <ChevronUp className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
