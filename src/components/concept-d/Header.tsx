"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X, Leaf, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptDHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setConceptTheme("earth");
  }, [setConceptTheme]);

  const navLinks = [
    { label: "Home", href: "/concept-d/" },
    { label: "Pantry Provisions", href: "/concept-d/menu/" },
    { label: "Our Story", href: "/concept-d/about/" },
    { label: "Conservatory", href: "/concept-d/gallery/" },
    { label: "Wholesale & Farm Share", href: "/concept-d/reservations/" },
    { label: "Diner Notes", href: "/concept-d/reviews/" },
    { label: "Contact", href: "/concept-d/contact/" },
  ];

  const isActive = (href: string) => {
    if (href === "/concept-d/") return pathname === "/concept-d" || pathname === "/concept-d/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Botanical Ticker */}
      <div className="bg-[#1E3F20] text-[#FDFBF7] text-[11px] font-serif py-1.5 px-4 flex items-center justify-between border-b border-[#5E6B4E]/30">
        <div className="flex items-center gap-2">
          <Leaf className="w-3 h-3 text-[#7B8E78]" />
          <span>REGENERATIVE ORGANIC PANTRY &bull; 100% NATURAL PROVISIONS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] tracking-wider uppercase">
          <span>SMALL-BATCH HARVEST</span>
          <span>&bull;</span>
          <span>COLD-CHAIN PACKAGED</span>
          <span>&bull;</span>
          <Link href="/concept-d/reservations/" className="text-[#C86D51] hover:underline">
            WHOLESALE DESK &rarr;
          </Link>
        </div>
      </div>

      {/* Main Organic Earth Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#5E6B4E]/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/concept-d/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-[#5E6B4E]/10 border border-[#5E6B4E]/30 flex items-center justify-center text-lg text-[#1E3F20] group-hover:bg-[#5E6B4E] group-hover:text-white transition-colors">
              🌿
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-medium tracking-tight text-[#1E3F20]">
                PEACHY EARTH
              </span>
              <span className="text-[9px] font-serif uppercase tracking-widest text-[#7B8E78]">
                Artisanal Table &bull; Est. 2026
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-serif tracking-wider uppercase transition-colors relative py-1 ${
                    active
                      ? "text-[#1E3F20] font-semibold"
                      : "text-[#5E6B4E] hover:text-[#1E3F20]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activePillEarth"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C86D51] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              href="/concept-d/wishlist/"
              className="relative p-2.5 rounded-full text-[#5E6B4E] hover:text-[#1E3F20] hover:bg-[#5E6B4E]/10 transition-colors"
              aria-label="Botanical Favorites"
            >
              <Heart className="w-4 h-4 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C86D51] text-white text-[9px] font-serif w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/concept-d/account/"
              className="p-2.5 rounded-full text-[#5E6B4E] hover:text-[#1E3F20] hover:bg-[#5E6B4E]/10 transition-colors"
              aria-label="Patron Profile"
            >
              <User className="w-4 h-4 stroke-[2]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className="flex items-center gap-2 bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] px-4 py-2 rounded-full shadow-sm text-xs font-serif transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cart.total_count}</span>
              <span className="hidden sm:inline opacity-80">
                &bull; {api.formatPrice(cart.total)}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#1E3F20]"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden bg-[#FDFBF7] border-b border-[#5E6B4E]/20 z-30 px-6 py-6 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 text-sm font-serif rounded-lg ${
                  isActive(link.href)
                    ? "bg-[#5E6B4E] text-[#FDFBF7]"
                    : "text-[#1E3F20] hover:bg-[#5E6B4E]/10"
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
