"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Zap, Sparkles, Heart } from "lucide-react";

export default function ConceptCFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-black text-white border-t-4 border-black relative overflow-hidden">
      {/* Pop Art Top Color Strip */}
      <div className="grid grid-cols-4 h-3 w-full">
        <div className="bg-[#FF007F]" />
        <div className="bg-[#FFE600]" />
        <div className="bg-[#0047FF]" />
        <div className="bg-[#FF6B00]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Giant Kinetic Header */}
        <div className="border-b-4 border-white/20 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#FFE600] font-mono text-sm tracking-widest font-black uppercase block mb-2">
              ★ TASTE THE ART REVOLUTION ★
            </span>
            <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-none text-white">
              PEACHY <span className="text-[#FF007F]">POP</span> ATELIER
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 bg-[#FFE600] text-black font-black uppercase text-xs border-2 border-black -rotate-2 shadow-[3px_3px_0px_#FF007F]">
              HIGH FLAVOR
            </span>
            <span className="px-4 py-2 bg-[#0047FF] text-white font-black uppercase text-xs border-2 border-black rotate-2 shadow-[3px_3px_0px_#FFE600]">
              LOUD DESIGN
            </span>
            <span className="px-4 py-2 bg-[#FF6B00] text-white font-black uppercase text-xs border-2 border-black -rotate-1 shadow-[3px_3px_0px_#000]">
              NEW DELHI
            </span>
          </div>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Col 1: About & Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-wider text-[#FFE600] flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" />
              <span>Canteen Hours</span>
            </h3>
            <p className="text-sm font-medium text-gray-300 leading-relaxed">
              Mon &ndash; Thu: 12:00 PM &ndash; 11:00 PM<br />
              Fri &ndash; Sun: 11:30 AM &ndash; Midnight
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase font-bold text-gray-400 block mb-1">Location</span>
              <p className="text-sm text-gray-200 font-medium">
                42 Art District Avenue, Hauz Khas, New Delhi 110016
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-wider text-[#FF007F]">
              Explore
            </h3>
            <ul className="space-y-2 text-sm font-bold uppercase">
              <li>
                <Link href="/concept-c/menu/" className="hover:text-[#FFE600] transition flex items-center gap-1">
                  <span>Pop Art Menu</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/concept-c/about/" className="hover:text-[#FFE600] transition flex items-center gap-1">
                  <span>The Manifesto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/concept-c/gallery/" className="hover:text-[#FFE600] transition flex items-center gap-1">
                  <span>The Art Vault</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/concept-c/reservations/" className="hover:text-[#FFE600] transition flex items-center gap-1">
                  <span>Table Reservations</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Orders */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-wider text-[#0047FF]">
              Ordering
            </h3>
            <ul className="space-y-2 text-sm font-bold uppercase">
              <li>
                <Link href="/concept-c/cart/" className="hover:text-[#FFE600] transition">
                  My Cart
                </Link>
              </li>
              <li>
                <Link href="/concept-c/wishlist/" className="hover:text-[#FFE600] transition">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link href="/concept-c/order-tracking/" className="hover:text-[#FFE600] transition">
                  Live Food Tracking
                </Link>
              </li>
              <li>
                <Link href="/concept-c/account/" className="hover:text-[#FFE600] transition">
                  Account & History
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Box */}
          <div className="bg-[#1A1A1A] p-6 border-3 border-white/20 rounded-xl space-y-4">
            <h3 className="text-lg font-black uppercase tracking-wider text-[#FFE600]">
              Pop News & Drops
            </h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              Subscribe for secret pop-up invitations, limited menu editions and chef drops.
            </p>

            {subscribed ? (
              <div className="bg-[#FF007F] text-white p-3 rounded text-xs font-black uppercase text-center border-2 border-black">
                ★ YOU ARE ON THE POP LIST! ★
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-black border-2 border-white/40 text-white placeholder-gray-500 text-xs px-3 py-2.5 rounded font-mono focus:border-[#FFE600] outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#FFE600] hover:bg-[#FF007F] hover:text-white text-black font-black uppercase text-xs py-2.5 rounded border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
                >
                  GET INVITED &rarr;
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t-2 border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p className="font-mono">
            &copy; {new Date().getFullYear()} PEACHY POP RESTAURANT. ALL ART RESERVED.
          </p>
          <div className="flex items-center gap-6 font-bold uppercase text-[11px]">
            <Link href="/" className="text-[#FFE600] hover:underline">
              Concept Hub
            </Link>
            <Link href="/concept-a/" className="hover:text-white">
              Concept A (Coquette)
            </Link>
            <Link href="/concept-b/" className="hover:text-white">
              Concept B (Retro)
            </Link>
            <Link href="/concept-d/" className="hover:text-white">
              Concept D (Earth)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
