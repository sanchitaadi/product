"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Sparkles, Heart } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ConceptBFooter() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast("VIP Retro Club Access Granted! Check your inbox.", "success");
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#FFE15D] text-black border-t-4 border-black font-sans relative overflow-hidden">
      {/* Top Black & White Checkerboard Band */}
      <div className="h-6 pattern-checkerboard border-b-2 border-black" />

      {/* Retro Marquee */}
      <div className="bg-[#FF2A55] text-white py-2 overflow-hidden border-b-2 border-black font-retro-bold font-black text-xs uppercase tracking-widest">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>★ DINE-IN</span>
          <span>★ TAKEAWAY</span>
          <span>★ DOORSTEP DELIVERY</span>
          <span>★ CRUNCHY SOURDOUGH CRUST</span>
          <span>★ CHEESY BURRATA</span>
          <span>★ RETRO GELATO</span>
          <span>★ DINE-IN</span>
          <span>★ TAKEAWAY</span>
          <span>★ DOORSTEP DELIVERY</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Speech Bubble */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍕</span>
              <span className="font-retro-bold font-black text-3xl tracking-tight text-black">
                PEACHY <span className="text-[#FF2A55]">PLATE</span>
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg] relative">
              <p className="text-xs font-bold text-black leading-relaxed font-retro-bold">
                &ldquo;Delhi&apos;s loudest, cheesiest, cutest 90s aesthetic food diner. Pull up a chair or order straight to your couch!&rdquo;
              </p>
              <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r-2 border-b-2 border-black rotate-45" />
            </div>

            {/* Vintage Barcode Badge */}
            <div className="pt-2">
              <div className="bg-white p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] inline-block font-mono text-[9px] font-black">
                ||||| | |||| || |||||| | ||||| 2026-DELHI
              </div>
            </div>
          </div>

          {/* Diner Navigation */}
          <div className="space-y-3">
            <h4 className="font-retro-bold font-black text-sm uppercase tracking-wider text-[#FF2A55] bg-white border-2 border-black px-3 py-1 rounded-xl inline-block shadow-[2px_2px_0px_#000]">
              QUICK HITS
            </h4>
            <ul className="font-retro-bold text-sm font-black space-y-2 pt-2">
              <li>
                <Link href="/concept-b/menu/" className="hover:text-[#FF2A55] transition flex items-center gap-1.5">
                  <span>&rarr;</span> <span>Full Menu Catalog</span>
                </Link>
              </li>
              <li>
                <Link href="/concept-b/about/" className="hover:text-[#FF2A55] transition flex items-center gap-1.5">
                  <span>&rarr;</span> <span>The Vibe Story</span>
                </Link>
              </li>
              <li>
                <Link href="/concept-b/gallery/" className="hover:text-[#FF2A55] transition flex items-center gap-1.5">
                  <span>&rarr;</span> <span>Photo Drop Feed</span>
                </Link>
              </li>
              <li>
                <Link href="/concept-b/reservations/" className="hover:text-[#FF2A55] transition flex items-center gap-1.5">
                  <span>&rarr;</span> <span>Table Booking</span>
                </Link>
              </li>
              <li>
                <Link href="/concept-b/reviews/" className="hover:text-[#FF2A55] transition flex items-center gap-1.5">
                  <span>&rarr;</span> <span>Customer Reviews</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Diner Hours & Location */}
          <div className="space-y-3">
            <h4 className="font-retro-bold font-black text-sm uppercase tracking-wider text-black bg-white border-2 border-black px-3 py-1 rounded-xl inline-block shadow-[2px_2px_0px_#000]">
              STATION HOURS
            </h4>
            <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] space-y-2 text-xs font-bold font-mono">
              <div>
                <span className="text-[#FF2A55] block">MON &ndash; SUN:</span>
                <span>11:00 AM &ndash; 11:00 PM</span>
              </div>
              <div className="pt-2 border-t border-black/10">
                <span className="text-black block">LOCATION:</span>
                <span>24, Garden Avenue, New Delhi</span>
              </div>
              <div className="text-[#FF6B35]">Call: +91 98765 43210</div>
            </div>
          </div>

          {/* Retro Club VIP Drop */}
          <div className="space-y-3">
            <h4 className="font-retro-bold font-black text-sm uppercase tracking-wider text-white bg-[#FF2A55] border-2 border-black px-3 py-1 rounded-xl inline-block shadow-[2px_2px_0px_#000]">
              SECRET DROPS
            </h4>
            <p className="text-xs font-bold text-black leading-snug">
              Get secret discount codes, secret pizza drops, and 90s playlist mixtapes!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@cool.com"
                className="w-full bg-white border-2 border-black px-3 py-2 text-xs font-bold text-black placeholder-stone-400 rounded-xl shadow-[2px_2px_0px_#000] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#FF2A55] hover:bg-[#E60033] text-white font-retro-bold font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] transition"
              >
                UNLOCK VIP DEALS ★
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between text-xs font-black font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} PEACHY PLATE RETRO DINER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-black text-[#FFE15D] px-2 py-0.5 rounded">
              GEN-Z APPROVED
            </span>
            <span>&bull;</span>
            <Link href="/" className="hover:text-[#FF2A55] underline">
              Switch Concepts
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
