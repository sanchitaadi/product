"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

export default function ConceptFFooter() {
  return (
    <footer className="bg-black text-white border-t-4 border-black relative overflow-hidden font-sans">
      {/* Sound Effect Graphic Top Border */}
      <div className="bg-[#FFE600] text-black py-2 px-4 border-b-3 border-black text-xs font-black uppercase tracking-widest flex items-center justify-between overflow-hidden">
        <span className="flex items-center gap-2">
          <span>⚡</span>
          <span>TO BE CONTINUED IN CHAPTER 08... 次回へ続く!!</span>
        </span>
        <span className="hidden sm:inline font-mono text-[10px]">
          ISSUE #07 &bull; PUBLISHED WEEKLY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Imprint */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🍑</span>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  PEACHY MANGA BITES
                </h3>
                <span className="text-[10px] font-bold text-[#FFE600] tracking-widest block uppercase">
                  SHONEN PEACHY IMPRINT &bull; TOKYO / NEW DELHI
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-mono leading-relaxed max-w-sm">
              An interactive culinary comic serialized weekly. Crafted with hand-rolled dough, charcoal hearth bakes, and vibrant Japanese pop culture aesthetic.
            </p>

            {/* Barcode & Price Tag */}
            <div className="pt-2 flex items-center gap-4">
              <div className="p-3 bg-white border-2 border-black rounded text-black inline-block">
                <div className="h-8 w-32 bg-repeat-x [background:repeating-linear-gradient(90deg,#000_0,#000_2px,transparent_2px,transparent_5px,#000_5px,#000_9px,transparent_9px,transparent_11px)]" />
                <span className="font-mono text-[8px] font-black tracking-widest block text-center mt-1">
                  ISBN 978-PEACHY-07
                </span>
              </div>
              <div className="text-xs font-black font-mono">
                <span className="px-2 py-1 bg-[#D7263D] text-white rounded text-[10px] block">
                  PRICE: ₹299 / ¥680
                </span>
                <span className="text-gray-500 text-[10px] block mt-1">ALL TAXES INCLUDED</span>
              </div>
            </div>
          </div>

          {/* Chapters & Story Links */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#FFE600] font-black uppercase tracking-wider block text-sm">
              COMIC EPISODES
            </span>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/concept-f/menu/" className="hover:text-[#FFE600] transition-colors">
                  &bull; Chapter 01: The Menu Carte
                </Link>
              </li>
              <li>
                <Link href="/concept-f/about/" className="hover:text-[#FFE600] transition-colors">
                  &bull; Chapter 02: Origin Manga
                </Link>
              </li>
              <li>
                <Link href="/concept-f/gallery/" className="hover:text-[#FFE600] transition-colors">
                  &bull; Chapter 03: Visual Omake
                </Link>
              </li>
              <li>
                <Link href="/concept-f/reservations/" className="hover:text-[#FFE600] transition-colors">
                  &bull; Chapter 04: Table Booking
                </Link>
              </li>
              <li>
                <Link href="/concept-f/reviews/" className="hover:text-[#FFE600] transition-colors">
                  &bull; Chapter 05: Fan Mail Reviews
                </Link>
              </li>
              <li>
                <Link href="/concept-f/contact/" className="hover:text-[#FFE600] transition-colors">
                  &bull; Chapter 06: Dispatch Telegraph
                </Link>
              </li>
            </ul>
          </div>

          {/* All 7 Concept Links */}
          <div className="lg:col-span-4 space-y-4 font-mono text-xs">
            <span className="text-[#FFE600] font-black uppercase tracking-wider block text-sm">
              EXPLORE MULTIVERSE (ALL 7)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <Link href="/concept-a/" className="p-2 bg-white/10 rounded border border-white/20 hover:border-[#FFE600] hover:text-[#FFE600] transition-colors">
                🎀 Concept A &bull; Coquette
              </Link>
              <Link href="/concept-b/" className="p-2 bg-white/10 rounded border border-white/20 hover:border-[#FFE600] hover:text-[#FFE600] transition-colors">
                ⚡ Concept B &bull; Retro Gen-Z
              </Link>
              <Link href="/concept-c/" className="p-2 bg-white/10 rounded border border-white/20 hover:border-[#FFE600] hover:text-[#FFE600] transition-colors">
                🎨 Concept C &bull; Pop Art
              </Link>
              <Link href="/concept-d/" className="p-2 bg-white/10 rounded border border-white/20 hover:border-[#FFE600] hover:text-[#FFE600] transition-colors">
                🌿 Concept D &bull; Organic Earth
              </Link>
              <Link href="/concept-e/" className="p-2 bg-white/10 rounded border border-white/20 hover:border-[#FFE600] hover:text-[#FFE600] transition-colors">
                🚆 Concept E &bull; Metro Bites
              </Link>
              <Link href="/concept-g/" className="p-2 bg-white/10 rounded border border-[#FFD54F] text-[#FFD54F] hover:bg-white/20 transition-colors">
                🎪 Concept G &bull; Circus Social
              </Link>
            </div>
            <Link
              href="/admin/"
              className="inline-block mt-2 text-[10px] text-gray-400 hover:text-white uppercase underline"
            >
              Unified SaaS Admin Dashboard &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/15 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-400 gap-4">
          <p>&copy; 2026 Peachy Plate Manga Bites &bull; All Rights Reserved.</p>
          <p className="flex items-center gap-1.5 text-white">
            <span>Crafted with Japanese Comic Energy</span>
            <span className="text-[#D7263D]">&hearts;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
