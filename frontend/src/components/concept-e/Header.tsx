"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X, Train, Ticket, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptEHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setConceptTheme("metro");
  }, [setConceptTheme]);

  const navLinks = [
    { label: "Concourse", href: "/concept-e/" },
    { label: "Foodway Carte", href: "/concept-e/menu/" },
    { label: "Our Journey", href: "/concept-e/about/" },
    { label: "Photo Wall", href: "/concept-e/gallery/" },
    { label: "Reserve Seat", href: "/concept-e/reservations/" },
    { label: "Passenger Log", href: "/concept-e/reviews/" },
    { label: "Station Desk", href: "/concept-e/contact/" },
  ];

  const isActive = (href: string) => {
    if (href === "/concept-e/") return pathname === "/concept-e" || pathname === "/concept-e/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Station Ticker */}
      <div className="bg-[#FFD100] text-[#08142C] text-xs font-mono font-black uppercase tracking-wider py-1.5 px-4 border-b-2 border-black flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-[#D71920] text-white px-2 py-0.5 rounded text-[10px] border border-black shadow-[2px_2px_0px_#000]">
            🚆 METRO BITES
          </span>
          <span className="hidden sm:inline">
            CENTRAL TERMINAL DINING &bull; PLATFORM 1 TO 4 OPEN
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline">⚡ EXPRESS CARRIAGE SERVICE</span>
          <Link
            href="/concept-e/reservations/"
            className="bg-[#08142C] hover:bg-[#D71920] text-white px-3 py-0.5 rounded border border-black transition-colors"
          >
            FIRST-CLASS TICKET &rarr;
          </Link>
        </div>
      </div>

      {/* Main Metro Header */}
      <header className="sticky top-0 z-40 bg-[#08142C] border-b-4 border-[#FFD100] shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-white font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/concept-e/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-[#D71920] border-2 border-[#FFD100] flex items-center justify-center text-xl shadow-[2px_2px_0px_#000] group-hover:rotate-6 transition-transform">
              🚆
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-black text-2xl tracking-tighter text-white uppercase">
                  PEACHY
                </span>
                <span className="bg-[#FFD100] text-[#08142C] font-black text-xs px-2 py-0.5 border border-black rounded shadow-[2px_2px_0px_#000]">
                  METRO
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#FFD100]">
                Foodway Express &bull; Est. 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded border-2 transition-all ${
                    active
                      ? "bg-[#D71920] text-white border-[#FFD100] shadow-[2px_2px_0px_#FFD100] -translate-y-0.5"
                      : "border-transparent text-gray-300 hover:border-[#FFD100] hover:text-[#FFD100] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist */}
            <Link
              href="/concept-e/wishlist/"
              className="relative p-2.5 bg-[#0D1F42] hover:bg-[#FFD100] hover:text-black border-2 border-white/30 rounded-lg transition-transform active:translate-x-0.5 active:translate-y-0.5 text-white"
              aria-label="Saved Itinerary"
            >
              <Heart className="w-4 h-4 stroke-[2.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D71920] text-white text-[10px] font-black w-5 h-5 rounded-full border border-white flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/concept-e/account/"
              className="p-2.5 bg-[#0D1F42] hover:bg-[#FFD100] hover:text-black border-2 border-white/30 rounded-lg transition-transform active:translate-x-0.5 active:translate-y-0.5 text-white"
              aria-label="Passenger Transit Pass"
            >
              <User className="w-4 h-4 stroke-[2.5]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className="flex items-center gap-2 bg-[#D71920] hover:bg-[#B3141A] text-white border-2 border-[#FFD100] px-3.5 py-2 rounded-lg shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-colors font-black text-xs uppercase"
              aria-label="Open Cart"
            >
              <Ticket className="w-4 h-4 stroke-[2.5]" />
              <span className="bg-[#FFD100] text-[#08142C] px-1.5 py-0.2 rounded font-black text-[11px] border border-black">
                {cart.total_count}
              </span>
              <span className="hidden sm:inline font-mono">
                {api.formatPrice(cart.total)}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 bg-[#FFD100] text-[#08142C] border-2 border-black rounded-lg"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5 stroke-[3]" /> : <Menu className="w-5 h-5 stroke-[3]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#08142C] border-b-4 border-[#FFD100] z-30 px-6 py-6 space-y-3 font-mono"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-sm font-black uppercase rounded-lg border-2 ${
                  isActive(link.href)
                    ? "bg-[#D71920] text-white border-[#FFD100]"
                    : "bg-[#0D1F42] text-white border-white/20 hover:border-[#FFD100]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
