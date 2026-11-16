"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Clock, Phone, Mail, ShieldCheck, Package } from "lucide-react";

export default function ConceptAFooter() {
  return (
    <footer className="bg-[#0A0B0E] border-t border-[#C5A059]/30 pt-16 pb-12 text-[#D1C7BD]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#16181F] border border-[#C5A059]/60 flex items-center justify-center text-[#C5A059] font-serif font-black text-sm">
              MR
            </span>
            <span className="font-serif font-black text-xl text-[#F7F5F0] tracking-[0.15em] uppercase">
              MAISON RESERVE
            </span>
          </div>
          <p className="text-xs text-[#A89F91] leading-relaxed">
            Haute Cacao &amp; Luxury Reserve Pantry Atelier. Single-estate bean-to-bar dark chocolates, wild mountain honeycombs, and gold-dusted sablés sealed in climate-controlled luxury packaging.
          </p>
          <div className="font-serif italic text-sm text-[#C5A059]">
            Stone-conched with precision &bull; Master curation
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-full bg-[#16181F] text-[#C5A059] border border-[#C5A059]/30 shadow-sm text-xs font-semibold flex items-center gap-1.5">
              <span>✦</span> D2C Reserve CPG
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#16181F] text-[#C5A059] border border-[#C5A059]/30 shadow-sm text-xs font-semibold flex items-center gap-1.5">
              <span>✦</span> Pan-India Climate Dispatch
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-xs text-[#F7F5F0] tracking-[0.2em] uppercase">
            Reserve Pantry
          </h4>
          <ul className="text-xs space-y-2 text-[#A89F91]">
            <li>
              <Link href="/concept-a/menu/" className="hover:text-[#C5A059] transition">
                Full Reserve Catalog
              </Link>
            </li>
            <li>
              <Link href="/concept-a/reservations/" className="hover:text-[#C5A059] transition">
                Corporate &amp; Luxury Gifting
              </Link>
            </li>
            <li>
              <Link href="/concept-a/gallery/" className="hover:text-[#C5A059] transition">
                Pantry Vault &amp; Packaging
              </Link>
            </li>
            <li>
              <Link href="/concept-a/reviews/" className="hover:text-[#C5A059] transition">
                Patron &amp; Sommelier Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand Story */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-xs text-[#F7F5F0] tracking-[0.2em] uppercase">
            The Atelier
          </h4>
          <ul className="text-xs space-y-2 text-[#A89F91]">
            <li>
              <Link href="/concept-a/about/" className="hover:text-[#C5A059] transition">
                Bean-to-Bar Philosophy
              </Link>
            </li>
            <li>
              <Link href="/concept-a/contact/" className="hover:text-[#C5A059] transition">
                Concierge &amp; Inquiries
              </Link>
            </li>
            <li>
              <Link href="/concept-a/order-tracking/" className="hover:text-[#C5A059] transition">
                Track Cold-Chain Dispatch
              </Link>
            </li>
            <li>
              <Link href="/concept-a/account/" className="hover:text-[#C5A059] transition">
                Client VIP Vault
              </Link>
            </li>
          </ul>
        </div>

        {/* Dispatch & Distribution Center */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-xs text-[#F7F5F0] tracking-[0.2em] uppercase">
            Packaging Atelier
          </h4>
          <div className="text-xs space-y-2.5 text-[#A89F91]">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Central Packaging Atelier, Okhla Phase III, New Delhi 110020</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Dispatch Hours: Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>+91 98765 43210 (dummy)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>concierge@maisonreserve.example</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Maison Reserve Provisions. All luxury rights reserved.</p>
        <p className="flex items-center gap-2 text-gray-400">
          <span className="text-[#C5A059]">✦</span> Packaged D2C Food Brand Sample 01 &bull; Next.js 2.0 Static Export &bull; Shared PHP 8+ PDO
        </p>
      </div>
    </footer>
  );
}
