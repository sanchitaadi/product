"use client";

import React from "react";
import Link from "next/link";
import { Star, Ticket, Sparkles, Heart } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";

export default function ConceptGAboutPage() {
  const acts = [
    {
      act: "ACT ONE",
      title: "THE RINGMASTER'S VISION",
      subtitle: "The Genesis of Circus Social",
      desc: "In 2026, we asked a simple question: What if dinner was not merely a meal, but the most joyous, wonder-filled carnival you ever entered? From that spark grew Circus Social &mdash; a dining realm styled after early 20th-century traveling fairs, marquee lights, and whimsical culinary arts.",
      quote: "“The restaurant is our center ring. Every table is front row to the spectacle.”",
      img: "/images/restaurant-interior.webp",
    },
    {
      act: "ACT TWO",
      title: "THE ACROBATIC DOUGH TOSS",
      subtitle: "48-Hour Stone-Ground Sourdough",
      desc: "Before our pizzas meet the 480°C brick dome, the dough undergoes a 48-hour cold fermentation. Spun high by our pizzaiolo acrobats, each circle achieves maximum airy lightness and a blistered, leopard-spotted rim.",
      quote: "“When the dough takes flight, the carnival magic takes hold!”",
      img: "/images/restaurant-kitchen.webp",
    },
    {
      act: "ACT THREE",
      title: "THE GOLDEN TICKET PROMISE",
      subtitle: "Artisanal Integrity in Every Bite",
      desc: "No shortcuts, no artificial tricks. From whole San Marzano tomatoes and cold-pressed extra virgin olive oil to hand-extruded bronze-cut pastas, our fairground is built on authentic culinary integrity.",
      quote: "“Every ticket stub is an admission pass to pure, honest flavor.”",
      img: "/images/margherita-pizza.webp",
    },
    {
      act: "ACT FOUR",
      title: "THE MIDWAY CONCOURSE",
      subtitle: "Connaught Place Flagship Tent",
      desc: "Located in the beating heart of New Delhi, our flagship big top features hand-painted vintage circus murals, golden marquee chasing lights, velvet booth seating, and a sunlit courtyard terrace.",
      quote: "“Step through the tent flaps and leave the ordinary world behind.”",
      img: "/images/restaurant-garden.webp",
    },
  ];

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Star className="w-3.5 h-3.5 fill-[#5C0614]" />
            THE CHRONICLE &bull; FOUR SPECTACULAR ACTS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            The Peachy Carnival Tale
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Discover the history, craftsmanship, and theatrical wonder behind Peachy Plate&apos;s traveling big top.
          </p>
        </div>
      </section>

      {/* Story Acts */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-16">
        {acts.map((act, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={act.act}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_#5C0614] ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`lg:col-span-5 relative ${isEven ? "lg:order-2" : ""}`}>
                <div className="border-4 border-[#5C0614] rounded-2xl overflow-hidden bg-[#5C0614] shadow-[6px_6px_0px_#FFD54F] relative group">
                  <img
                    src={act.img}
                    alt={act.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFD54F] text-[#5C0614] font-black text-xs px-3 py-1 rounded-full border border-[#5C0614] shadow-sm">
                    {act.act}
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className={`lg:col-span-7 space-y-4 ${isEven ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#C41E3A] text-white font-mono text-[10px] font-black uppercase rounded-full">
                    {act.act}
                  </span>
                  <span className="text-xs font-bold text-[#C41E3A] uppercase tracking-wider">
                    {act.subtitle}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
                  {act.title}
                </h2>

                <p className="text-sm text-[#5C0614]/85 font-medium leading-relaxed">
                  {act.desc}
                </p>

                <div className="p-4 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-2xl shadow-[3px_3px_0px_#C41E3A]">
                  <p className="text-xs font-black text-[#5C0614] italic">
                    {act.quote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA Box */}
        <div className="p-10 bg-[#FFD54F] border-4 border-[#C41E3A] rounded-3xl text-center space-y-6 shadow-[10px_10px_0px_#5C0614]">
          <h3 className="text-3xl sm:text-5xl font-black uppercase text-[#5C0614] font-serif">
            JOIN US BENEATH THE MARQUEE
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#5C0614]/80 max-w-md mx-auto">
            Order online with our golden admission tickets or reserve a private booth in our Connaught Place big top.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/concept-g/menu/"
              className="px-8 py-3.5 bg-[#C41E3A] text-white font-black text-xs uppercase tracking-widest rounded-full border-2 border-white shadow-[4px_4px_0px_#5C0614] hover:bg-[#a3162c] transition-colors"
            >
              EXPLORE ATTRACTIONS &rarr;
            </Link>
            <Link
              href="/concept-g/reservations/"
              className="px-8 py-3.5 bg-white text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[4px_4px_0px_#C41E3A] hover:bg-gray-100 transition-colors"
            >
              BOOK TICKET BOOTH &rarr;
            </Link>
          </div>
        </div>
      </main>

      <ConceptGFooter />
    </div>
  );
}
