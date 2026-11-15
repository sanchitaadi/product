"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronUp, Sparkles, Zap, Crown, LayoutDashboard, Home } from "lucide-react";

export default function ConceptSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Hide on admin routes if desired or keep minimal
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 shadow-2xl flex flex-col gap-2 min-w-[240px]"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 pt-1 flex items-center justify-between">
              <span>Switch Concept System</span>
              <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                Next.js 2.0
              </span>
            </div>

            <Link
              href="/concept-a/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/concept-a")
                  ? "bg-rose-50 text-rose-950 font-bold border border-rose-200"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center text-xs">
                🎀
              </span>
              <div className="flex-1">
                <div>Concept A — Coquette</div>
                <div className="text-[10px] text-gray-400 font-normal">Pastel Pinterest editorial</div>
              </div>
            </Link>

            <Link
              href="/concept-b/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/concept-b")
                  ? "bg-amber-50 text-amber-950 font-bold border border-amber-200"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                ⚡
              </span>
              <div className="flex-1">
                <div>Concept B — Retro Gen-Z</div>
                <div className="text-[10px] text-gray-400 font-normal">Neo-brutalist pop energy</div>
              </div>
            </Link>

            <Link
              href="/concept-c/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition ${
                pathname.startsWith("/concept-c")
                  ? "bg-stone-100 text-stone-900 font-bold border border-stone-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-stone-200 text-[#2B2118] flex items-center justify-center text-xs">
                ⚜️
              </span>
              <div className="flex-1">
                <div>Concept C — Luxury Cute</div>
                <div className="text-[10px] text-gray-400 font-normal">Minimal atelier aesthetic</div>
              </div>
            </Link>

            <div className="h-px bg-gray-200 my-1" />

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
                <div className="text-[10px] text-gray-400 font-normal">Real-time metrics & orders</div>
              </div>
            </Link>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 transition"
            >
              <Home className="w-4 h-4" />
              <span>Concepts Presentation Hub</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-black/90 text-white rounded-full shadow-xl hover:bg-black transition text-xs font-semibold backdrop-blur-md border border-white/20 active:scale-95"
      >
        <Layers className="w-4 h-4 text-amber-400" />
        <span>Concepts</span>
        <ChevronUp className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
