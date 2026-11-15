"use client";

import React from "react";
import Link from "next/link";
import { Star, Ticket, Sparkles } from "lucide-react";

export default function ConceptGFooter() {
  return (
    <footer className="bg-[#5C0614] text-[#FFFDD0] border-t-6 border-[#C41E3A] relative overflow-hidden font-sans">
      {/* Marquee Bulbs Border */}
      <div className="bg-[#C41E3A] text-[#FFD54F] py-2 px-4 border-b-2 border-[#FFD54F]/30 text-xs font-black uppercase tracking-widest flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-[#FFD54F]" />
          <span>AND NOW... THE GRAND FINALE OF FLAVORS!</span>
        </span>
        <span className="hidden sm:inline font-mono text-[10px] text-white">
          PEACHY CARNIVAL ENTERPRISES &bull; EST. 2026
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Carnival Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎪</span>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white font-serif">
                  CIRCUS SOCIAL
                </h3>
                <span className="text-[10px] font-bold text-[#FFD54F] tracking-widest block uppercase">
                  THE PEACHY BIG TOP &bull; CONNAUGHT PLACE CARNIVAL
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FFFDD0]/80 leading-relaxed max-w-sm">
              An immersive carnival restaurant experience. Wood-fired big top sourdough, handcrafted carousel pastas, and whimsical dessert wonders beneath the glowing marquee.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD54F] text-[#5C0614] rounded-full border-2 border-white font-black text-xs uppercase shadow-[3px_3px_0px_#C41E3A]">
                <Ticket className="w-4 h-4" />
                <span>GOLDEN TICKET &bull; ADMIT ALL FLAVORS</span>
              </div>
            </div>
          </div>

          {/* Attraction Directory */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#FFD54F] font-black uppercase tracking-wider block text-sm">
              CARNIVAL ATTRACTIONS
            </span>
            <ul className="space-y-2 text-[#FFFDD0]/80">
              <li>
                <Link href="/concept-g/menu/" className="hover:text-[#FFD54F] transition-colors">
                  &bull; Big Top Menu Carte
                </Link>
              </li>
              <li>
                <Link href="/concept-g/about/" className="hover:text-[#FFD54F] transition-colors">
                  &bull; The Peachy Carnival Tale
                </Link>
              </li>
              <li>
                <Link href="/concept-g/gallery/" className="hover:text-[#FFD54F] transition-colors">
                  &bull; Midway Photo Vault
                </Link>
              </li>
              <li>
                <Link href="/concept-g/reservations/" className="hover:text-[#FFD54F] transition-colors">
                  &bull; Ticket Booth Reservations
                </Link>
              </li>
              <li>
                <Link href="/concept-g/reviews/" className="hover:text-[#FFD54F] transition-colors">
                  &bull; Spectator Praise Reviews
                </Link>
              </li>
              <li>
                <Link href="/concept-g/contact/" className="hover:text-[#FFD54F] transition-colors">
                  &bull; Information Gate
                </Link>
              </li>
            </ul>
          </div>

          {/* All 7 Concept Links */}
          <div className="lg:col-span-4 space-y-4 font-mono text-xs">
            <span className="text-[#FFD54F] font-black uppercase tracking-wider block text-sm">
              DISCOVER OTHER SIDES (ALL 7)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <Link href="/concept-a/" className="p-2 bg-white/10 rounded-xl border border-white/20 hover:border-[#FFD54F] hover:text-[#FFD54F] transition-colors">
                🎀 Concept A &bull; Coquette
              </Link>
              <Link href="/concept-b/" className="p-2 bg-white/10 rounded-xl border border-white/20 hover:border-[#FFD54F] hover:text-[#FFD54F] transition-colors">
                ⚡ Concept B &bull; Retro Gen-Z
              </Link>
              <Link href="/concept-c/" className="p-2 bg-white/10 rounded-xl border border-white/20 hover:border-[#FFD54F] hover:text-[#FFD54F] transition-colors">
                🎨 Concept C &bull; Pop Art
              </Link>
              <Link href="/concept-d/" className="p-2 bg-white/10 rounded-xl border border-white/20 hover:border-[#FFD54F] hover:text-[#FFD54F] transition-colors">
                🌿 Concept D &bull; Organic Earth
              </Link>
              <Link href="/concept-e/" className="p-2 bg-white/10 rounded-xl border border-white/20 hover:border-[#FFD54F] hover:text-[#FFD54F] transition-colors">
                🚆 Concept E &bull; Metro Bites
              </Link>
              <Link href="/concept-f/" className="p-2 bg-white/10 rounded-xl border border-white/20 hover:border-[#FFD54F] hover:text-[#FFD54F] transition-colors">
                🍜 Concept F &bull; Manga Bites
              </Link>
            </div>
            <Link
              href="/admin/"
              className="inline-block mt-2 text-[10px] text-[#FFD54F] hover:underline uppercase"
            >
              Unified SaaS Admin Dashboard &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-white/15 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#FFFDD0]/70 gap-4">
          <p>&copy; 2026 Peachy Plate Circus Social &bull; All Rights Reserved.</p>
          <p className="flex items-center gap-1.5 text-white">
            <span>Powered by Marquee Bulbs &amp; Carnival Spirit</span>
            <Star className="w-3.5 h-3.5 text-[#FFD54F] fill-[#FFD54F]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
