"use client";

import React from "react";
import Link from "next/link";
import { Train, ArrowRight, Ticket, Clock, ShieldCheck } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";

export default function ConceptEAboutPage() {
  return (
    <div className="bg-[#050D1C] min-h-screen text-white flex flex-col font-mono selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Hero Banner */}
      <section className="bg-[#08142C] py-20 border-b-4 border-[#FFD100] text-center space-y-3 relative overflow-hidden">
        <span className="bg-[#D71920] text-white text-xs font-black uppercase px-3 py-1 border border-white inline-block">
          ★ RAILWAY CHRONICLES &bull; EST. 2026 ★
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          THE RAILWAY JOURNEY
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-sans leading-relaxed">
          Inspired by the golden age of luxury locomotive travel and the fast kinetic energy of modern underground metro networks.
        </p>
      </section>

      {/* Stories */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-24">
        {/* Story 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#FFD100] block">
              TRACK 01 &bull; THE ORIGIN SIGNAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              A Dining Car Born on the Tracks
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              Travelers throughout history have celebrated the unique romance of dining aboard trains &mdash; watching landscapes race by while enjoying hot food served in brass-fitted carriages. Peachy Metro was created to capture that cinematic thrill, combining high-heat wood-fired hearths with express metropolitan precision.
            </p>
            <div className="p-4 bg-[#08142C] border-2 border-[#FFD100]/40 rounded-xl text-xs space-y-1">
              <span className="text-[#FFD100] font-black uppercase block">The Station Kitchen Manifesto</span>
              <p className="text-gray-300 font-sans">No passenger should ever settle for lukewarm, packaged travel snacks. Every single meal is freshly rolled and fired on-site.</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border-4 border-[#FFD100] shadow-[8px_8px_0px_#D71920]">
              <img
                src="/images/restaurant-kitchen.webp"
                alt="Peachy Metro Station Kitchen"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-[8px_8px_0px_#FFD100]">
              <img
                src="/images/restaurant-interior.webp"
                alt="Station Concourse Dining"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D71920] block">
              TRACK 02 &bull; THE CONCOURSE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Connaught Place Railway Gateway
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              Anchored inside the heart of New Delhi, our restaurant mimics a grand central terminus. Subway tiles, mechanical split-flap timetable displays, illuminated route lines, and vintage railway posters transport guests into a romantic train journey every time they dine.
            </p>
            <div className="pt-2">
              <Link
                href="/concept-e/reservations/"
                className="inline-flex items-center gap-2 bg-[#D71920] hover:bg-[#FFD100] hover:text-black text-white text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg border border-white transition-colors font-black"
              >
                <span>BOOK A FIRST-CLASS CARRIAGE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConceptEFooter />
    </div>
  );
}
