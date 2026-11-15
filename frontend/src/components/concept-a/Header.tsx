"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X, Sparkles, Calendar } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ConceptAHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setConceptTheme("coquette");
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setConceptTheme]);

  const navLinks = [
    { label: "Home", href: "/concept-a/" },
    { label: "Menu", href: "/concept-a/menu/" },
    { label: "Our Story", href: "/concept-a/about/" },
    { label: "Gallery", href: "/concept-a/gallery/" },
    { label: "Reservations", href: "/concept-a/reservations/" },
    { label: "Contact", href: "/concept-a/contact/" },
  ];

  const isActive = (href: string) => {
    if (href === "/concept-a/") return pathname === "/concept-a" || pathname === "/concept-a/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Coquette Announcement Ribbon Bar */}
      <div className="bg-gradient-to-r from-[#FFF0F3] via-[#FFE5D9] to-[#FFCAD4] py-1.5 px-4 text-center border-b border-rose-200/50 text-[11px] font-semibold text-[#5A4546] flex items-center justify-center gap-2">
        <span>🎀</span>
        <span>
          <strong className="text-[#E07A86] font-bold">Complimentary Tiramisu</strong> on orders over ₹999 &bull; Use code <code className="bg-white/80 px-1.5 py-0.5 rounded text-[#E07A86] font-bold border border-rose-200/60">PEACHY20</code> for 20% OFF
        </span>
        <span className="hidden sm:inline">🌸 Handcrafted in New Delhi</span>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#FFF8F9]/92 backdrop-blur-md shadow-sm border-b border-rose-200/60 py-3"
            : "bg-[#FFF8F9] py-4 border-b border-rose-100/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/concept-a/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FFE5D9] via-[#FFF0F3] to-[#FFCAD4] border border-[#E07A86]/30 flex items-center justify-center text-xl shadow-sm relative"
            >
              🎀
              <span className="absolute -top-1 -right-1 text-[10px] animate-pulse">✨</span>
            </motion.div>
            <div>
              <span className="font-coquette-serif font-black text-xl tracking-wide text-[#3D2D2E] block leading-none">
                Peachy Plate
              </span>
              <span className="font-script text-sm text-[#E07A86] block leading-tight">
                good food &bull; cute moods ♡
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-sm p-1.5 rounded-full border border-rose-200/50 shadow-sm">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition relative ${
                  isActive(item.href)
                    ? "bg-[#E07A86] text-white shadow-sm"
                    : "text-[#4A3E3D] hover:text-[#E07A86] hover:bg-rose-50/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist */}
            <Link
              href="/concept-a/wishlist/"
              className="relative p-2.5 rounded-full bg-white border border-rose-200/60 text-gray-700 hover:text-[#E07A86] hover:border-rose-300 transition shadow-sm"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E07A86] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Button */}
            <button
              onClick={openDrawer}
              className="relative p-2.5 rounded-full bg-white border border-rose-200/60 text-gray-700 hover:text-[#E07A86] hover:border-rose-300 transition shadow-sm"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.total_count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E07A86] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {cart.total_count}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/concept-a/account/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-rose-200/60 text-xs font-semibold text-gray-700 hover:text-[#E07A86] transition shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-[#E07A86]" />
              <span>Patron</span>
            </Link>

            {/* Reservation CTA */}
            <Link
              href="/concept-a/reservations/"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white text-xs font-bold tracking-wide shadow-md shadow-rose-200/60 hover:opacity-95 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-white border border-rose-200/60 text-gray-700"
              aria-label="Toggle menu"
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
            className="lg:hidden bg-[#FFF8F9] border-b border-rose-200/60 shadow-xl overflow-hidden sticky top-16 z-30 px-6 py-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`p-3 rounded-2xl text-sm font-semibold transition ${
                    isActive(item.href)
                      ? "bg-[#E07A86] text-white"
                      : "hover:bg-rose-100/50 text-[#3D2D2E]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-rose-200/50 flex flex-col gap-2.5">
                <Link
                  href="/concept-a/reservations/"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white text-center text-xs font-bold tracking-wide"
                >
                  Reserve a Table 🎀
                </Link>
                <Link
                  href="/concept-a/account/"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 rounded-2xl bg-white border border-rose-200 text-center text-xs font-semibold text-gray-700"
                >
                  Customer Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
