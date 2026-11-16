"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Heart, Menu, X, Star, User, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "@/components/shared/CartDrawer";
import CustomizationModal from "@/components/shared/CustomizationModal";

export default function ConceptGHeader() {
  const pathname = usePathname();
  const { cart, openDrawer, setConceptTheme } = useCart();
  const { wishlistIds } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    setConceptTheme("circus");
  }, [setConceptTheme]);

  const navLinks = [
    { href: "/concept-g/menu/", label: "BIG TOP SHOP", icon: "🎪" },
    { href: "/concept-g/about/", label: "CARNIVAL TALE", icon: "🎡" },
    { href: "/concept-g/gallery/", label: "MIDWAY VAULT", icon: "🎠" },
    { href: "/concept-g/reservations/", label: "WHOLESALE TRUNK", icon: "🎟️" },
    { href: "/concept-g/contact/", label: "INFORMATION GATE", icon: "🎭" },
  ];

  return (
    <>
      {/* Top Circus Bunting & Marquee Bulbs Bar */}
      <div className="bg-[#5C0614] text-[#FFD54F] py-1.5 px-4 font-black text-[10px] tracking-widest uppercase border-b-2 border-[#FFD54F]/40 flex items-center justify-between select-none">
        <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-white">
            <Star className="w-3 h-3 text-[#FFD54F] fill-[#FFD54F]" />
            STEP RIGHT UP! THE GRAND CULINARY CARNIVAL IS LIVE
          </span>
          <span className="text-[#FFD54F]/60">&bull;</span>
          <span>WOOD-FIRED BIG TOP SPECIALS</span>
          <span className="text-[#FFD54F]/60">&bull;</span>
          <span>FREE DELIVERY OVER ₹599</span>
        </div>
        <Link
          href="/"
          className="hidden md:inline-block px-3 py-0.5 bg-[#FFD54F] text-[#5C0614] font-black text-[9px] uppercase rounded-full hover:bg-white transition-colors shrink-0"
        >
          &larr; ALL 7 CONCEPTS
        </Link>
      </div>

      {/* Main Big Top Header */}
      <header className="bg-[#FFFDD0] border-b-4 border-[#C41E3A] sticky top-0 z-40 font-sans shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/concept-g/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#C41E3A] border-3 border-[#FFD54F] rounded-2xl flex items-center justify-center text-2xl shadow-[3px_3px_0px_#5C0614] group-hover:rotate-6 transition-transform">
              🎪
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black text-xl tracking-tight text-[#5C0614] uppercase">
                  CIRCUS SOCIAL
                </span>
                <span className="px-2 py-0.5 bg-[#FFD54F] text-[#5C0614] text-[9px] font-black rounded-full border border-[#5C0614] uppercase">
                  BIG TOP
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#C41E3A] block -mt-0.5 tracking-wider">
                PEACHY PLATE &bull; THE GRAND CARNIVAL
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all border-2 ${
                    active
                      ? "bg-[#C41E3A] text-white border-[#5C0614] shadow-[3px_3px_0px_#FFD54F]"
                      : "bg-transparent text-[#5C0614] border-transparent hover:border-[#C41E3A] hover:bg-white/60"
                  }`}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              href="/concept-g/wishlist/"
              className="p-2.5 rounded-full border-2 border-[#5C0614] bg-white text-[#C41E3A] hover:bg-[#FFD54F] shadow-[2px_2px_0px_#5C0614] relative transition-transform active:scale-95"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 fill-[#C41E3A]" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C41E3A] text-white text-[9px] font-black flex items-center justify-center border border-white">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/concept-g/account/"
              className="p-2.5 rounded-full border-2 border-[#5C0614] bg-white text-[#5C0614] hover:bg-[#FFD54F] shadow-[2px_2px_0px_#5C0614] transition-transform active:scale-95"
              aria-label="Passholder Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Golden Ticket Cart Trigger */}
            <button
              onClick={openDrawer}
              className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#a3162c] text-white px-4 py-2 rounded-full border-2 border-[#FFD54F] shadow-[3px_3px_0px_#5C0614] font-black text-xs uppercase tracking-wider transition-all active:scale-95"
            >
              <Ticket className="w-4 h-4 text-[#FFD54F]" />
              <span className="hidden sm:inline">TICKETS</span>
              <span className="px-2 py-0.5 bg-[#FFD54F] text-[#5C0614] text-[10px] font-black rounded-full">
                {cart.total_count}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 border-2 border-[#5C0614] rounded-full bg-white text-[#5C0614]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[#C41E3A] bg-[#FFFDD0] p-4 space-y-2 font-black text-xs uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 border-2 border-[#5C0614] rounded-2xl bg-white text-[#5C0614] shadow-[2px_2px_0px_#5C0614] hover:bg-[#FFD54F]"
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/concept-g/reviews/"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 border-2 border-[#5C0614] rounded-2xl bg-white text-[#5C0614] shadow-[2px_2px_0px_#5C0614]"
            >
              ⭐ SPECTATOR REVIEWS
            </Link>
          </div>
        )}
      </header>

      {/* Shared Drawers */}
      <CartDrawer />
      <CustomizationModal />
    </>
  );
}
