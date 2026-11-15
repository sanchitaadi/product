"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, ArrowRight, Heart, Sparkles } from "lucide-react";

export default function ConceptDFooter() {
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
    <footer className="bg-[#1E3F20] text-[#FDFBF7] border-t border-[#5E6B4E]/30 relative overflow-hidden">
      {/* Decorative Organic Wave / Curve */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Botanical Headline */}
        <div className="border-b border-[#5E6B4E]/40 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[#7B8E78] font-serif text-xs tracking-widest uppercase flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Grounded &bull; Pure &bull; Sustainable</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#FDFBF7] tracking-tight">
              PEACHY EARTH <span className="text-[#C86D51] italic">Artisanal Table</span>
            </h2>
          </div>

          <div className="text-xs font-serif text-[#A3B8A0] max-w-sm">
            Rooted in regenerative farming and whole-grain sourdough traditions. Celebrating seasonal harvests from local estates.
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Seasonal Hours & Location */}
          <div className="space-y-4">
            <h3 className="font-serif text-base text-[#FDFBF7] font-medium tracking-wide">
              Conservatory Hours
            </h3>
            <p className="text-xs font-serif text-[#A3B8A0] leading-relaxed">
              Tuesday &ndash; Sunday<br />
              Midday Lunch: 12:00 PM &ndash; 3:30 PM<br />
              Candlelit Dinner: 7:00 PM &ndash; 11:00 PM<br />
              <span className="text-[#7B8E78]">Mondays reserved for garden harvesting.</span>
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#7B8E78] block">Conservatory Grounds</span>
              <p className="text-xs font-serif text-[#FDFBF7] mt-0.5">
                8 Greenhouse Lane, Mehrauli Heritage Greens, New Delhi 110030
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h3 className="font-serif text-base text-[#FDFBF7] font-medium tracking-wide">
              The Carte
            </h3>
            <ul className="space-y-2 text-xs font-serif text-[#A3B8A0]">
              <li>
                <Link href="/concept-d/menu/" className="hover:text-white transition">
                  Seasonal Harvest Carte
                </Link>
              </li>
              <li>
                <Link href="/concept-d/about/" className="hover:text-white transition">
                  Our Botanical Story
                </Link>
              </li>
              <li>
                <Link href="/concept-d/gallery/" className="hover:text-white transition">
                  Conservatory &amp; Gardens
                </Link>
              </li>
              <li>
                <Link href="/concept-d/reservations/" className="hover:text-white transition">
                  Table Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Farm Partners */}
          <div className="space-y-4">
            <h3 className="font-serif text-base text-[#FDFBF7] font-medium tracking-wide">
              Estate Partners
            </h3>
            <ul className="space-y-2 text-xs font-serif text-[#A3B8A0]">
              <li>Himachal Mountain Orchards</li>
              <li>Coorg Single-Origin Arabica</li>
              <li>Nilgiris Wild Botanical Teas</li>
              <li>Rajasthan Cold-Pressed Mustard Oil</li>
              <li>Punjab Organic Ancient Emmer Wheat</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="bg-[#173019] p-6 rounded-2xl border border-[#5E6B4E]/30 space-y-3">
            <h3 className="font-serif text-base text-[#FDFBF7] font-medium">
              Harvest Letter
            </h3>
            <p className="text-xs font-serif text-[#A3B8A0] leading-relaxed">
              Receive notes on seasonal crop changes, foraging dinners, and greenhouse tastings.
            </p>

            {subscribed ? (
              <div className="text-xs font-serif text-[#A3B8A0] bg-[#1E3F20] p-3 rounded-lg border border-[#5E6B4E]/40">
                🌱 Thank you for subscribing to our harvest notes.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-[#1E3F20] border border-[#5E6B4E]/50 text-xs font-serif p-2.5 rounded-lg text-white placeholder-[#7B8E78] focus:border-[#C86D51] outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-white text-xs font-serif py-2 rounded-lg transition-colors"
                >
                  Join Harvest Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-[#5E6B4E]/30 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-serif text-[#7B8E78] gap-4">
          <p>
            &copy; {new Date().getFullYear()} PEACHY EARTH BOTANICAL DINING. ALL CULINARY RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/" className="text-[#C86D51] hover:underline">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
