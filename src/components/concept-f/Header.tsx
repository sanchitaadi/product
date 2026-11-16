"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Menu, X, Sparkles, User, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "@/components/shared/CartDrawer";
import CustomizationModal from "@/components/shared/CustomizationModal";

export default function ConceptFHeader() {
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistIds } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    setConceptTheme("manga");
  }, [setConceptTheme]);

  const navLinks = [
    { href: "/concept-f/menu/", label: "CHAPTER 01: SHOP", icon: "🍜" },
    { href: "/concept-f/about/", label: "ORIGIN STORY", icon: "📖" },
    { href: "/concept-f/gallery/", label: "OMAKE: VAULT", icon: "⚡" },
    { href: "/concept-f/reservations/", label: "GUILD WHOLESALE", icon: "🥢" },
    { href: "/concept-f/contact/", label: "DISPATCH DESK", icon: "💬" },
  ];

  return (
    <>
      {/* Top Sound Effect Marquee Strip */}
      <div className="bg-[#D7263D] text-white py-1.5 px-4 font-black text-[10px] tracking-widest uppercase border-b-2 border-black overflow-hidden flex items-center justify-between select-none">
        <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
          <span>ドドド... DON!!</span>
          <span>&bull;</span>
          <span>CRUNCH!! ざわ...</span>
          <span>&bull;</span>
          <span>DELICIOUS UMAI!! 美味しい</span>
          <span>&bull;</span>
          <span>WEEKLY PEACHY SHONEN CHAPTER 07 IS LIVE!</span>
          <span>&bull;</span>
          <span>FREE DELIVERY ON ORDERS OVER ₹599</span>
          <span>&bull;</span>
          <span>ドドド... DON!!</span>
        </div>
        <Link
          href="/"
          className="hidden md:inline-block px-2.5 py-0.5 bg-black text-[#FFE600] font-black text-[9px] uppercase border border-black hover:bg-white hover:text-black transition-colors shrink-0"
        >
          &larr; ALL 7 CONCEPTS
        </Link>
      </div>

      {/* Main Comic Header */}
      <header className="bg-[#FFFDF7] border-b-4 border-black sticky top-0 z-40 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo with Comic Action Burst */}
          <Link href="/concept-f/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#FFE600] border-3 border-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_#000] group-hover:rotate-6 transition-transform">
              🍑
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-black uppercase">
                  MANGA BITES
                </span>
                <span className="px-1.5 py-0.5 bg-[#D7263D] text-white text-[9px] font-black rounded uppercase">
                  VOL.07
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 block -mt-0.5 tracking-wider">
                ピーチプレート &bull; JAPANESE COMIC DINING
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all border-2 ${
                    active
                      ? "bg-black text-[#FFE600] border-black shadow-[3px_3px_0px_#D7263D]"
                      : "bg-transparent text-black border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0px_#000]"
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              href="/concept-f/wishlist/"
              className="p-2.5 rounded border-2 border-black bg-white hover:bg-[#FFFDF7] text-black shadow-[3px_3px_0px_#000] relative transition-transform active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-[#D7263D]" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#D7263D] text-white text-[9px] font-black flex items-center justify-center border border-black">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/concept-f/account/"
              className="p-2.5 rounded border-2 border-black bg-white hover:bg-[#FFFDF7] text-black shadow-[3px_3px_0px_#000] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Member Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart Trigger with Speech Bubble */}
            <button
              onClick={openDrawer}
              className="flex items-center gap-2 bg-[#D7263D] hover:bg-[#b51f33] text-white px-4 py-2 rounded border-2 border-black shadow-[4px_4px_0px_#000] font-black text-xs uppercase tracking-wider transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BASKET</span>
              <span className="px-1.5 py-0.5 bg-[#FFE600] text-black text-[10px] font-black rounded border border-black">
                {cart.total_count}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 border-2 border-black rounded bg-white shadow-[3px_3px_0px_#000]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-3 border-black bg-[#FFFDF7] p-4 space-y-2 font-black text-xs uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 border-2 border-black bg-white shadow-[3px_3px_0px_#000] hover:bg-[#FFE600]"
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/concept-f/reviews/"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 border-2 border-black bg-white shadow-[3px_3px_0px_#000]"
            >
              ⭐ FAN REVIEWS &bull; TRAVEL LOG
            </Link>
          </div>
        )}
      </header>

      {/* Shared Overlays */}
      <CartDrawer />
      <CustomizationModal />
    </>
  );
}
