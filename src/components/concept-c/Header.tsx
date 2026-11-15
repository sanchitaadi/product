"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptCHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setConceptTheme("popart");
  }, [setConceptTheme]);

  const navLinks = [
    { label: "Home", href: "/concept-c/" },
    { label: "Pop Menu", href: "/concept-c/menu/" },
    { label: "Manifesto", href: "/concept-c/about/" },
    { label: "Art Vault", href: "/concept-c/gallery/" },
    { label: "Book Table", href: "/concept-c/reservations/" },
    { label: "Reviews", href: "/concept-c/reviews/" },
    { label: "Contact", href: "/concept-c/contact/" },
  ];

  const isActive = (href: string) => {
    if (href === "/concept-c/") return pathname === "/concept-c" || pathname === "/concept-c/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Graphic Pop Ticker */}
      <div className="bg-[#FFE600] text-black text-xs font-black uppercase tracking-wider py-2 px-4 border-b-4 border-black overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-[#FF007F] text-white px-2 py-0.5 rounded-sm text-[10px] border border-black shadow-[2px_2px_0px_#000]">
            ⚡ ART x FOOD
          </span>
          <span className="hidden sm:inline">MAXIMALIST POP ART RESTAURANT &bull; NEW DELHI</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline">💥 ORDER ONLINE FOR EXPRESS PICKUP</span>
          <Link
            href="/concept-c/reservations/"
            className="bg-[#0047FF] hover:bg-[#FF007F] text-white px-3 py-0.5 rounded border border-black shadow-[2px_2px_0px_#000] transition-colors"
          >
            RESERVE VIP BOOTH &rarr;
          </Link>
        </div>
      </div>

      {/* Main Pop Art Header */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7] border-b-4 border-black shadow-[0_6px_0px_#FF007F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/concept-c/" className="flex items-center gap-2 group">
            <span className="w-10 h-10 bg-[#FF007F] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-xl group-hover:rotate-12 transition-transform">
              🎨
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tighter text-[#111111] uppercase">
                  PEACHY
                </span>
                <span className="bg-[#FFE600] text-black font-black text-xs px-2 py-0.5 border-2 border-black -rotate-3 shadow-[2px_2px_0px_#000]">
                  POP!
                </span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#0047FF]">
                Maximalist Gastronomy
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
                  className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-md border-2 transition-all ${
                    active
                      ? "bg-[#0047FF] text-white border-black shadow-[3px_3px_0px_#FFE600] -translate-y-0.5"
                      : "border-transparent text-gray-800 hover:border-black hover:bg-[#FFE600] hover:text-black hover:shadow-[2px_2px_0px_#000]"
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
              href="/concept-c/wishlist/"
              className="relative p-2.5 bg-white hover:bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] rounded-lg transition-transform active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-black stroke-[2.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF007F] text-white text-[10px] font-black w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/concept-c/account/"
              className="p-2.5 bg-white hover:bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] rounded-lg transition-transform active:translate-x-0.5 active:translate-y-0.5"
              aria-label="User Account"
            >
              <User className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#0047FF] text-white border-2 border-black px-3.5 py-2 rounded-lg shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-colors font-black text-xs uppercase"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="bg-[#FFE600] text-black px-1.5 py-0.2 rounded font-black text-[11px] border border-black">
                {cart.total_count}
              </span>
              <span className="hidden sm:inline font-mono">
                {api.formatPrice(cart.total)}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] rounded-lg"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5 stroke-[3]" /> : <Menu className="w-5 h-5 stroke-[3]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FFFDF7] border-b-4 border-black z-30 px-6 py-6 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-base font-black uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] ${
                  isActive(link.href)
                    ? "bg-[#0047FF] text-white"
                    : "bg-white text-black hover:bg-[#FFE600]"
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
