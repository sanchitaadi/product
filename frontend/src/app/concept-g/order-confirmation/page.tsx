"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Star, Ticket, CheckCircle2, ArrowRight } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number") || searchParams.get("order") || "CIRCUS-2026-7701";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFD54F", "#C41E3A", "#5C0614", "#FFFDD0", "#FFFFFF"],
      });
    } catch {}

    api.getOrder(orderNumber).then((res) => {
      if (res.success && res.order) {
        setOrder(res.order);
      }
    });
  }, [orderNumber]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Golden Carnival Ticket Card */}
      <div className="bg-white border-6 border-[#C41E3A] rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-[14px_14px_0px_#5C0614] relative">
        <div className="w-20 h-20 bg-[#FFD54F] border-3 border-[#5C0614] rounded-full text-[#5C0614] flex items-center justify-center mx-auto text-3xl font-black shadow-md -rotate-3">
          <Ticket className="w-10 h-10 text-[#C41E3A]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41E3A] block font-mono">
            GOLDEN ADMISSION VALIDATED &bull; ADMIT TO ALL SIGHTS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Bravo, {order?.customer_name || "Esteemed Spectator"}!
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-md mx-auto leading-relaxed">
            Your carnival order has been admitted to our big top kitchen. The ringmaster has called the acrobats and the ovens are roaring!
          </p>
        </div>

        <div className="inline-block px-6 py-2.5 bg-[#FFFDD0] border-3 border-[#5C0614] rounded-full text-xs font-mono font-black tracking-widest text-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
          GOLDEN TICKET PASS: #{orderNumber}
        </div>

        {order && (
          <div className="p-6 bg-[#FFFDD0] border-3 border-[#5C0614] rounded-2xl text-left space-y-3 font-mono text-xs shadow-sm">
            <div className="flex justify-between border-b border-[#5C0614]/20 pb-2">
              <span className="text-[#5C0614]/70 font-bold">KITCHEN STATUS:</span>
              <span className="text-[#22C55E] font-black uppercase">{order.order_status}</span>
            </div>
            <div className="flex justify-between border-b border-[#5C0614]/20 pb-2">
              <span className="text-[#5C0614]/70 font-bold">DISPATCH TRANSIT:</span>
              <span className="text-[#5C0614] font-black uppercase">{order.order_type}</span>
            </div>
            <div className="flex justify-between border-b border-[#5C0614]/20 pb-2">
              <span className="text-[#5C0614]/70 font-bold">PAYMENT MODE:</span>
              <span className="text-[#5C0614] font-black uppercase">{order.payment_method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C0614]/70 font-bold">AMOUNT COLLECTED:</span>
              <span className="text-base text-[#C41E3A] font-black">{api.formatPrice(order.total_amount)}</span>
            </div>
          </div>
        )}

        {/* Barcode Graphic */}
        <div className="py-2">
          <div className="h-10 max-w-xs mx-auto bg-repeat-x opacity-80 [background:repeating-linear-gradient(90deg,#5C0614_0,#5C0614_2px,transparent_2px,transparent_6px,#5C0614_6px,#5C0614_10px,transparent_10px,transparent_13px)]" />
          <span className="text-[10px] font-mono text-gray-500 font-bold tracking-widest block mt-1">
            * PEACHY-CIRCUS-SOCIAL-GOLDEN-TICKET *
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/concept-g/order-tracking/?order=${orderNumber}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-transform active:scale-95"
          >
            Track Parade on Live Radar &rarr;
          </Link>
          <Link
            href="/concept-g/menu/"
            className="w-full sm:w-auto text-center px-6 py-3.5 text-xs font-black text-[#5C0614] hover:bg-gray-100 border-2 border-[#5C0614] rounded-full uppercase"
          >
            Big Top Carte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptGOrderConfirmationPage() {
  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />
      <Suspense fallback={<div className="py-24 text-center font-mono font-bold text-[#5C0614]">PRINTING GOLDEN CARNIVAL TICKET...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <ConceptGFooter />
    </div>
  );
}
