"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Train, CheckCircle2, Ticket, ArrowRight, MapPin, Clock } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number") || searchParams.get("order") || "METRO-2026-9041";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD100", "#D71920", "#08142C", "#FFFFFF"],
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
      {/* Boarding Pass Ticket Container */}
      <div className="bg-[#050D1C] rounded-2xl border-4 border-[#FFD100] p-8 sm:p-12 text-center space-y-6 shadow-[10px_10px_0px_#D71920] relative overflow-hidden">
        {/* Train Notch Cutouts on Sides */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#08142C] border-2 border-[#FFD100] -translate-y-1/2" />
        <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#08142C] border-2 border-[#FFD100] -translate-y-1/2" />

        <div className="w-16 h-16 rounded-full bg-[#FFD100] text-[#08142C] flex items-center justify-center mx-auto text-3xl font-black">
          <Train className="w-9 h-9 text-[#08142C]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFD100] block">
            TRANSIT PASS VALIDATED &bull; PLATFORM 01
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F8F6F0]">
            All Aboard, {order?.customer_name || "Esteemed Commuter"}!
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto font-mono leading-relaxed">
            Your express train order has been dispatched to our platform hearth station. The chef is currently stoking the ovens.
          </p>
        </div>

        {/* Boarding Ticket Reference Badge */}
        <div className="inline-block px-6 py-2.5 bg-[#08142C] rounded border-2 border-dashed border-[#FFD100] text-xs font-mono tracking-widest text-[#FFD100]">
          TRANSIT TICKET: #{orderNumber}
        </div>

        {order && (
          <div className="p-6 bg-[#08142C] rounded-xl border-2 border-[#334155] text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-[#334155] pb-2 text-[#94A3B8]">
              <span>LOCOMOTIVE STATUS:</span>
              <span className="text-[#4ADE80] font-bold uppercase">{order.order_status}</span>
            </div>
            <div className="flex justify-between border-b border-[#334155] pb-2 text-[#94A3B8]">
              <span>TRANSIT DISPATCH MODE:</span>
              <span className="text-white font-bold uppercase">{order.order_type}</span>
            </div>
            <div className="flex justify-between border-b border-[#334155] pb-2 text-[#94A3B8]">
              <span>FARE SETTLEMENT:</span>
              <span className="text-white font-bold uppercase">{order.payment_method}</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>TOTAL FARE COLLECTED:</span>
              <span className="text-base text-[#FFD100] font-black">{api.formatPrice(order.total_amount)}</span>
            </div>
          </div>
        )}

        {/* Barcode Graphic */}
        <div className="py-2">
          <div className="h-10 max-w-xs mx-auto bg-repeat-x opacity-60 [background:repeating-linear-gradient(90deg,#F8F6F0_0,#F8F6F0_2px,transparent_2px,transparent_6px,#F8F6F0_6px,#F8F6F0_10px,transparent_10px,transparent_13px)]" />
          <span className="text-[10px] font-mono text-[#94A3B8] tracking-widest block mt-1">
            * PEACHY-METRO-BOARDING-PASS *
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/concept-e/order-tracking/?order=${orderNumber}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest px-8 py-3.5 rounded border-2 border-[#FFD100] shadow-[4px_4px_0px_#FFD100] transition-transform active:translate-x-1 active:translate-y-1"
          >
            Track Train Live On Radar &rarr;
          </Link>
          <Link
            href="/concept-e/menu/"
            className="w-full sm:w-auto text-center px-6 py-3.5 rounded text-xs font-mono text-[#94A3B8] hover:text-[#FFD100] border-2 border-[#334155] uppercase font-bold"
          >
            Station Carte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptEOrderConfirmationPage() {
  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />
      <Suspense fallback={<div className="py-24 text-center font-mono text-white">VALIDATING TRANSIT TICKET...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <ConceptEFooter />
    </div>
  );
}
