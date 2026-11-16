"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X, Zap, Flame, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ConceptBHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setConceptTheme("retro");
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setConceptTheme]);

  const navLinks = [
    { label: "HOME", href: "/concept-b/" },
    { label: "SHOP", href: "/concept-b/menu/" },
    { label: "THE VIBE", href: "/concept-b/about/" },
    { label: "PHOTO DROP", href: "/concept-b/gallery/" },
    { label: "REVIEWS", href: "/concept-b/reviews/" },
    { label: "WHOLESALE", href: "/concept-b/reservations/" },
    { label: "CONTACT", href: "/concept-b/contact/" },
  ];

  const isActive = (href: string) => {
    if (href === "/concept-b/") return pathname === "/concept-b" || pathname === "/concept-b/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Animated Retro Diner Marquee Strip */}
      <div className="bg-[#121212] text-[#FFE15D] text-xs font-black tracking-wider uppercase py-1.5 overflow-hidden border-b-2 border-black flex items-center select-none font-retro-bold">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          <span>★ 90s RETRO SNACK BODEGA</span>
          <span className="text-[#FF2A55]">●</span>
          <span>AIR-POPPED SORGHUM CRISPS</span>
          <span className="text-[#FF2A55]">●</span>
          <span>PREBIOTIC WHITE PEACH SODA</span>
          <span className="text-[#FF2A55]">●</span>
          <span>ZERO PALM OIL &bull; GLUTEN FREE</span>
          <span className="text-[#FF2A55]">●</span>
          <span>NITROGEN SEALED FOR MAX CRUNCH</span>
          <span className="text-[#FF2A55]">●</span>
          <span>PAN-INDIA SNACK DISPATCH</span>
          <span className="text-[#FF2A55]">●</span>
          <span>USE CODE &apos;PEACHY20&apos; FOR 20% OFF</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#FFF9EC]/95 backdrop-blur-md border-b-[3px] border-black py-2.5 shadow-[0px_4px_0px_#000]"
            : "bg-[#FFF9EC] py-3.5 border-b-[3px] border-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with Speech Bubble & Rotating Starburst */}
          <Link href="/concept-b/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <span className="w-11 h-11 rounded-2xl bg-[#FFE15D] border-[2.5px] border-black flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#000] group-hover:rotate-12 transition-transform duration-200">
                ⚡
              </span>
              {/* Rotating Mini Starburst */}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF2A55] rounded-full border border-black text-white text-[8px] font-black flex items-center justify-center animate-spin-slow">
                ★
              </div>
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-retro-bold font-black text-2xl sm:text-3xl tracking-tight text-black flex items-center gap-1">
                  PEACHY <span className="text-[#FF2A55]">CRUNCH</span>
                </span>
                {/* Speech Bubble Badge */}
                <span className="hidden sm:inline-block bg-[#FFE15D] border-2 border-black text-[9px] font-black px-2 py-0.5 rounded-full shadow-[2px_2px_0px_#000] rotate-2">
                  AIR-POPPED!
                </span>
              </div>
              <span className="text-[10px] font-black tracking-widest text-[#FF6B35] uppercase block font-mono">
                RETRO BODEGA SNACKS &bull; CPG DISPENSARY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Chunky Hover Boxes */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-retro-bold text-xs font-black tracking-wider px-3.5 py-1.5 rounded-xl border-2 transition-all ${
                    active
                      ? "bg-[#FF2A55] text-white border-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                      : "border-transparent text-black hover:border-black hover:bg-[#FFE15D] hover:shadow-[3px_3px_0px_#000]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist */}
            <Link
              href="/concept-b/wishlist/"
              className="p-2 rounded-xl bg-white border-2 border-black text-black hover:bg-[#FFE15D] shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] transition relative"
              title="Saved Favs"
            >
              <Heart className="w-4 h-4 stroke-[2.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF2A55] text-white font-black text-[9px] rounded-full border border-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/concept-b/account/"
              className="p-2 rounded-xl bg-white border-2 border-black text-black hover:bg-[#FFE15D] shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] transition hidden sm:block"
              title="Patron Profile"
            >
              <User className="w-4 h-4 stroke-[2.5]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className="px-4 py-2 bg-[#FFE15D] hover:bg-[#FFD600] text-black font-retro-bold font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">CART</span>
              <span className="w-5 h-5 rounded-full bg-[#FF2A55] text-white text-[10px] font-black flex items-center justify-center border border-black">
                {cart?.total_count || 0}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000]"
              aria-label="Open retro menu"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-50 bg-[#FFF9EC] p-6 flex flex-col justify-between border-l-4 border-black"
          >
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="font-retro-bold font-black text-xl text-black">
                  PEACHY <span className="text-[#FF2A55]">PLATE</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000]"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            <nav className="flex flex-col gap-3 my-auto py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-retro-bold text-xl font-black px-4 py-3 rounded-2xl border-2 border-black flex items-center justify-between ${
                    isActive(link.href)
                      ? "bg-[#FF2A55] text-white shadow-[4px_4px_0px_#000]"
                      : "bg-white text-black hover:bg-[#FFE15D] shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span>&rarr;</span>
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-bold text-black font-mono">
              <span>NEW DELHI &bull; 11AM - 11PM</span>
              <span className="bg-[#FFE15D] px-2 py-0.5 rounded border border-black">
                RETRO 2.0
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
