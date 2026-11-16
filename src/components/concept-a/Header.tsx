"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Menu, X, Sparkles, Package, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ConceptAHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setConceptTheme("luxury");
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setConceptTheme]);

  const navLinks = [
    { label: "Home", href: "/concept-a/" },
    { label: "Reserve Collection", href: "/concept-a/menu/" },
    { label: "Atelier Story", href: "/concept-a/about/" },
    { label: "Pantry Vault", href: "/concept-a/gallery/" },
    { label: "Luxury Gifting", href: "/concept-a/reservations/" },
    { label: "Concierge", href: "/concept-a/contact/" },
  ];

  const isActive = (href: string) => {
    if (href === "/concept-a/") return pathname === "/concept-a" || pathname === "/concept-a/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Haute Luxury Ribbon Bar */}
      <div className="bg-[#0D0E11] text-[#C5A059] py-2 px-4 text-center border-b border-[#C5A059]/25 text-[11px] font-semibold tracking-wider flex items-center justify-center gap-2">
        <span className="text-[#C5A059]">✦</span>
        <span>
          <strong className="text-white font-bold tracking-widest uppercase">MAISON RESERVE</strong> &bull; COMPLIMENTARY 85% MALABAR CACAO BAR ON ORDERS OVER ₹1,499 &bull; USE CODE <code className="bg-[#1A1C22] px-2 py-0.5 rounded text-[#D4AF37] font-mono border border-[#C5A059]/40">RESERVE20</code>
        </span>
        <span className="hidden sm:inline text-gray-400">&bull; ✈ EXPRESS CLIMATE-CONTROLLED PAN-INDIA DISPATCH</span>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0D0E11]/95 backdrop-blur-md shadow-xl border-b border-[#C5A059]/30 py-3.5"
            : "bg-[#0D0E11] py-4 border-b border-[#C5A059]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/concept-a/" className="flex items-center gap-3.5 group">
            <motion.div
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="w-11 h-11 rounded-xl bg-[#16181F] border border-[#C5A059]/60 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(197,160,89,0.15)] relative"
            >
              <span className="text-[#C5A059] font-serif font-black text-xl">MR</span>
              <span className="absolute -top-1 -right-1 text-[9px] text-[#C5A059]">✦</span>
            </motion.div>
            <div>
              <span className="font-serif font-black text-xl tracking-[0.15em] text-[#F7F5F0] uppercase block leading-none">
                MAISON RESERVE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase block leading-tight font-medium mt-1">
                HAUTE CACAO &bull; RESERVE PANTRY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#16181F]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#C5A059]/30 shadow-inner">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 relative ${
                  isActive(item.href)
                    ? "bg-[#C5A059] text-[#0D0E11] font-bold shadow-md shadow-[#C5A059]/20"
                    : "text-[#D1C7BD] hover:text-[#C5A059] hover:bg-white/5"
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
              className="relative p-2.5 rounded-full bg-[#16181F] border border-[#C5A059]/40 text-[#D1C7BD] hover:text-[#C5A059] hover:border-[#C5A059] transition shadow-sm"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-[#0D0E11] text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Button */}
            <button
              onClick={openDrawer}
              className="relative p-2.5 rounded-full bg-[#16181F] border border-[#C5A059]/40 text-[#D1C7BD] hover:text-[#C5A059] hover:border-[#C5A059] transition shadow-sm"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.total_count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-[#0D0E11] text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {cart.total_count}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/concept-a/account/"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#16181F] border border-[#C5A059]/40 text-xs font-medium tracking-wider text-[#D1C7BD] hover:text-[#C5A059] hover:border-[#C5A059] transition shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Client Vault</span>
            </Link>

            {/* Wholesale CTA */}
            <Link
              href="/concept-a/reservations/"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0D0E11] text-xs font-bold tracking-wider uppercase shadow-md shadow-[#C5A059]/20 hover:brightness-110 transition"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Corporate & Gifting</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#16181F] border border-[#C5A059]/40 text-[#D1C7BD]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#C5A059]" /> : <Menu className="w-5 h-5 text-[#C5A059]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0D0E11] border-b border-[#C5A059]/30 px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium tracking-wider uppercase transition ${
                      isActive(item.href)
                        ? "bg-[#C5A059] text-[#0D0E11] font-bold"
                        : "text-[#D1C7BD] hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-[#C5A059]/20 flex flex-col gap-2">
                <Link
                  href="/concept-a/reservations/"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0D0E11] font-bold text-center text-xs uppercase tracking-wider shadow-md"
                >
                  Corporate & Luxury Gifting
                </Link>
                <Link
                  href="/concept-a/account/"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#16181F] border border-[#C5A059]/40 text-[#C5A059] font-medium text-center text-xs uppercase tracking-wider"
                >
                  Client VIP Vault
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
