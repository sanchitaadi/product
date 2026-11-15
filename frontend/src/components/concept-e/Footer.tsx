"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Train, ArrowUpRight, Ticket, Clock, MapPin, Phone } from "lucide-react";

export default function ConceptEFooter() {
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
    <footer className="bg-[#050D1C] text-white border-t-4 border-[#FFD100] relative overflow-hidden font-mono">
      {/* Top Track Color Strip */}
      <div className="grid grid-cols-4 h-2.5 w-full">
        <div className="bg-[#D71920]" />
        <div className="bg-[#FFD100]" />
        <div className="bg-[#0055FF]" />
        <div className="bg-[#00A859]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Giant Station Concourse Header */}
        <div className="border-b-2 border-white/20 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#FFD100] text-xs font-black uppercase tracking-widest block mb-2">
              🚆 CENTRAL FOODWAY TERMINAL &bull; EST. 2026
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              PEACHY <span className="text-[#D71920]">METRO</span> BITES
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#D71920] text-white font-black uppercase text-xs border border-white">
              PLATFORM 1 TO 4
            </span>
            <span className="px-3 py-1 bg-[#FFD100] text-[#08142C] font-black uppercase text-xs border border-black">
              LIVE DISPATCH
            </span>
            <span className="px-3 py-1 bg-[#0055FF] text-white font-black uppercase text-xs border border-white">
              NEW DELHI METRO
            </span>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Timetable Hours & Location */}
          <div className="space-y-4">
            <h3 className="text-base font-black uppercase tracking-wider text-[#FFD100]">
              Station Timetable
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              First Departure: 11:30 AM<br />
              Last Train: 11:30 PM (Midnight on Weekends)<br />
              <span className="text-emerald-400">All Platforms In Continuous Service.</span>
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase text-gray-400 block tracking-wider">
                Terminal Address
              </span>
              <p className="text-xs text-white mt-0.5">
                Concourse Level 2, Metro Interchange Gateway, Connaught Place, New Delhi 110001
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Stations */}
          <div className="space-y-4">
            <h3 className="text-base font-black uppercase tracking-wider text-[#D71920]">
              Line Map
            </h3>
            <ul className="space-y-2 text-xs font-bold uppercase">
              <li>
                <Link href="/concept-e/menu/" className="hover:text-[#FFD100] transition flex items-center gap-1">
                  <span>Foodway Carte (All Stops)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/concept-e/about/" className="hover:text-[#FFD100] transition flex items-center gap-1">
                  <span>The Railway Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/concept-e/gallery/" className="hover:text-[#FFD100] transition flex items-center gap-1">
                  <span>Station Photo Wall</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/concept-e/reservations/" className="hover:text-[#FFD100] transition flex items-center gap-1">
                  <span>Reserve First-Class Seat</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Passenger Services */}
          <div className="space-y-4">
            <h3 className="text-base font-black uppercase tracking-wider text-[#0055FF]">
              Passenger Desk
            </h3>
            <ul className="space-y-2 text-xs font-bold uppercase">
              <li>
                <Link href="/concept-e/cart/" className="hover:text-[#FFD100] transition">
                  Dining Carriage Basket
                </Link>
              </li>
              <li>
                <Link href="/concept-e/wishlist/" className="hover:text-[#FFD100] transition">
                  Saved Travel Itinerary
                </Link>
              </li>
              <li>
                <Link href="/concept-e/order-tracking/" className="hover:text-[#FFD100] transition">
                  Live Train Status Radar
                </Link>
              </li>
              <li>
                <Link href="/concept-e/account/" className="hover:text-[#FFD100] transition">
                  Passenger Transit Pass
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Boarding Pass Newsletter */}
          <div className="bg-[#08142C] p-6 border-2 border-[#FFD100]/40 rounded-xl space-y-3">
            <h3 className="text-base font-black uppercase tracking-wider text-[#FFD100]">
              Boarding Pass Club
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Get secret express fare discounts, free beverage passes, and platform updates.
            </p>

            {subscribed ? (
              <div className="bg-[#D71920] text-white p-3 rounded text-xs font-black uppercase text-center border border-white">
                ★ BOARDING PASS ISSUED! ★
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="PASSENGER EMAIL"
                  required
                  className="w-full bg-black border border-white/40 text-white placeholder-gray-500 text-xs px-3 py-2.5 rounded font-mono focus:border-[#FFD100] outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#FFD100] hover:bg-[#D71920] hover:text-white text-[#08142C] font-black uppercase text-xs py-2.5 rounded border border-black transition-colors"
                >
                  ISSUE PASS &rarr;
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} PEACHY METRO FOODWAY. ALL RAILWAY RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-bold uppercase">
            <Link href="/" className="text-[#FFD100] hover:underline">
              Concept Hub
            </Link>
            <Link href="/concept-a/" className="hover:text-white">
              Concept A (Coquette)
            </Link>
            <Link href="/concept-b/" className="hover:text-white">
              Concept B (Retro)
            </Link>
            <Link href="/concept-c/" className="hover:text-white">
              Concept C (Pop Art)
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
