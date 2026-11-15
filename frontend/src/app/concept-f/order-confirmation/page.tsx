"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Zap, CheckCircle2, ArrowRight } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number") || searchParams.get("order") || "SHONEN-2026-8801";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFE600", "#D7263D", "#000000", "#FFFDF7"],
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
      {/* Manga Victory Certificate Card */}
      <div className="bg-white border-4 border-black p-8 sm:p-14 text-center space-y-6 shadow-[14px_14px_0px_#000] relative">
        <div className="w-20 h-20 bg-[#FFE600] border-3 border-black text-black flex items-center justify-center mx-auto text-3xl font-black shadow-[4px_4px_0px_#000] -rotate-3">
          <Zap className="w-10 h-10 text-[#D7263D] fill-[#D7263D]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#D7263D] block font-mono">
            MISSION SUCCESS &bull; MANGA ORDER SEALED
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            Itadakimasu, {order?.customer_name || "Hero"}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-md mx-auto leading-relaxed">
            Your feast has been routed directly to our stone hearth station. The chef has tied their headband and fired the flames!
          </p>
        </div>

        <div className="inline-block px-6 py-2.5 bg-[#FFFDF7] border-3 border-black text-xs font-mono font-black tracking-widest text-black shadow-[3px_3px_0px_#FFE600]">
          ORDER CERTIFICATE: #{orderNumber}
        </div>

        {order && (
          <div className="p-6 bg-[#FFFDF7] border-3 border-black text-left space-y-3 font-mono text-xs shadow-[3px_3px_0px_#000]">
            <div className="flex justify-between border-b border-black/20 pb-2">
              <span className="text-gray-500 font-bold">KITCHEN STATUS:</span>
              <span className="text-[#22C55E] font-black uppercase">{order.order_status}</span>
            </div>
            <div className="flex justify-between border-b border-black/20 pb-2">
              <span className="text-gray-500 font-bold">TRANSIT MODE:</span>
              <span className="text-black font-black uppercase">{order.order_type}</span>
            </div>
            <div className="flex justify-between border-b border-black/20 pb-2">
              <span className="text-gray-500 font-bold">SETTLEMENT:</span>
              <span className="text-black font-black uppercase">{order.payment_method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-bold">AMOUNT CHARGED:</span>
              <span className="text-base text-[#D7263D] font-black">{api.formatPrice(order.total_amount)}</span>
            </div>
          </div>
        )}

        {/* Barcode Graphic */}
        <div className="py-2">
          <div className="h-10 max-w-xs mx-auto bg-repeat-x opacity-80 [background:repeating-linear-gradient(90deg,#000_0,#000_2px,transparent_2px,transparent_6px,#000_6px,#000_10px,transparent_10px,transparent_13px)]" />
          <span className="text-[10px] font-mono text-gray-500 font-bold tracking-widest block mt-1">
            * PEACHY-PLATE-MANGA-BITES-CONFIRMED *
          </span>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/concept-f/order-tracking/?order=${orderNumber}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 border-3 border-black shadow-[4px_4px_0px_#FFE600] transition-transform active:translate-x-1 active:translate-y-1"
          >
            Track Comic Order Live &rarr;
          </Link>
          <Link
            href="/concept-f/menu/"
            className="w-full sm:w-auto text-center px-6 py-3.5 text-xs font-black text-black hover:bg-gray-100 border-2 border-black uppercase"
          >
            Return to Carte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptFOrderConfirmationPage() {
  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />
      <Suspense fallback={<div className="py-24 text-center font-mono font-bold text-black">INKING COMIC CERTIFICATE...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <ConceptFFooter />
    </div>
  );
}
