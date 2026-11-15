"use client";

import React from "react";
import Link from "next/link";
import { Heart, MapPin, Clock, Phone, Mail } from "lucide-react";

export default function ConceptAFooter() {
  return (
    <footer className="bg-[#FFF0F3] border-t border-rose-200/60 pt-16 pb-12 text-[#4A3E3D]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎀</span>
            <span className="font-coquette-serif font-black text-xl text-[#3D2D2E]">
              Peachy Plate
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            A dreamy bistro celebrating hand-fermented sourdough crusts, velvety cream pastas, and Parisian sweet treats. Crafted with love in New Delhi.
          </p>
          <div className="font-script text-xl text-[#E07A86]">
            Baked with love & fresh vanilla ♡
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-full bg-white text-rose-500 border border-rose-200 shadow-sm text-xs font-semibold flex items-center gap-1">
              🎀 Pinterest
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white text-rose-500 border border-rose-200 shadow-sm text-xs font-semibold flex items-center gap-1">
              🌸 Instagram
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-coquette-serif font-bold text-sm text-[#3D2D2E] tracking-wide uppercase">
            Catering & Feasts
          </h4>
          <ul className="text-xs space-y-2 text-gray-600">
            <li>
              <Link href="/concept-a/menu/" className="hover:text-[#E07A86] transition">
                Full Food Menu
              </Link>
            </li>
            <li>
              <Link href="/concept-a/reservations/" className="hover:text-[#E07A86] transition">
                Table Reservations
              </Link>
            </li>
            <li>
              <Link href="/concept-a/gallery/" className="hover:text-[#E07A86] transition">
                Pastel Visual Gallery
              </Link>
            </li>
            <li>
              <Link href="/concept-a/reviews/" className="hover:text-[#E07A86] transition">
                Guest Love Letters
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand Story */}
        <div className="space-y-3">
          <h4 className="font-coquette-serif font-bold text-sm text-[#3D2D2E] tracking-wide uppercase">
            The Atelier
          </h4>
          <ul className="text-xs space-y-2 text-gray-600">
            <li>
              <Link href="/concept-a/about/" className="hover:text-[#E07A86] transition">
                Our Story & Philosophy
              </Link>
            </li>
            <li>
              <Link href="/concept-a/contact/" className="hover:text-[#E07A86] transition">
                Concierge & Inquiries
              </Link>
            </li>
            <li>
              <Link href="/concept-a/order-tracking/" className="hover:text-[#E07A86] transition">
                Track Live Feast Box
              </Link>
            </li>
            <li>
              <Link href="/concept-a/account/" className="hover:text-[#E07A86] transition">
                Patron VIP Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="font-coquette-serif font-bold text-sm text-[#3D2D2E] tracking-wide uppercase">
            Garden Location
          </h4>
          <div className="text-xs space-y-2.5 text-gray-600">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E07A86] shrink-0 mt-0.5" />
              <span>24, Garden Avenue, New Delhi, India</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E07A86] shrink-0" />
              <span>Open Daily: 11:00 AM – 11:00 PM</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E07A86] shrink-0" />
              <span>+91 98765 43210 (dummy)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E07A86] shrink-0" />
              <span>hello@peachyplate.example</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-rose-200/50 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Peachy Plate. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> &bull; Next.js 2.0 Static Export &bull; Shared PHP 8+ PDO
        </p>
      </div>
    </footer>
  );
}
