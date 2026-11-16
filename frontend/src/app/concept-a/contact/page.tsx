"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Package } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptAContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    try {
      const res = await api.submitContact({
        name,
        email,
        phone,
        subject: subject || "Reserve Product Inquiry",
        message,
        concept_source: "Concept A — Maison Reserve Provisions",
      });
      if (res.success) {
        setSent(true);
        showToast("Docket transmitted to Concierge Desk. ✦", "success");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      }
    } catch {
      showToast("Unable to send inquiry right now.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-12 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block">
            ✦ Direct Distribution &bull; Client Concierge
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F7F5F0] tracking-tight">
            Packaging Atelier Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-md mx-auto font-light">
            Questions regarding single-estate origins, temperature-controlled cold-chain shipments, or custom gift chests? Our concierge desk is here to assist.
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Info */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-xl space-y-6">
              <h2 className="font-serif font-bold text-2xl text-[#F7F5F0]">
                Central Packaging Atelier &bull; New Delhi
              </h2>
              <div className="space-y-5 text-xs text-[#D1C7BD]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#16181F] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#F7F5F0] text-sm font-serif">Packaging Facility</strong>
                    <span className="text-[#A89F91]">Central Packaging Atelier, Okhla Phase III, New Delhi 110020</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#16181F] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#F7F5F0] text-sm font-serif">Dispatch &amp; Support Hours</strong>
                    <span className="text-[#A89F91]">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#16181F] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#F7F5F0] text-sm font-serif">Direct Concierge Phone</strong>
                    <span className="text-[#A89F91]">+91 98765 43210 (dummy)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#16181F] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#F7F5F0] text-sm font-serif">Electronic Mail</strong>
                    <span className="text-[#A89F91]">concierge@maisonreserve.example</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cold-Chain Dispatch Note */}
            <div className="p-6 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 text-xs text-[#A89F91] space-y-2">
              <span className="font-serif font-bold text-[#F7F5F0] block flex items-center gap-1.5">
                <span className="text-[#C5A059]">✦</span> Express Climate Dispatch Across India
              </span>
              <p className="leading-relaxed">
                All cacao blocks, honeycombs, and cold-drip extracts are dispatched via climate-controlled express air couriers. Shipments to metropolitan hubs arrive within 24 to 48 hours in insulated boxes.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-xl">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto" />
                <h3 className="font-serif font-bold text-2xl text-[#F7F5F0]">
                  Docket Successfully Transmitted
                </h3>
                <p className="text-xs text-[#A89F91] max-w-sm mx-auto font-light">
                  Thank you. Our pantry concierge team will review your inquiry and respond within 1 business day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 rounded-xl bg-[#16181F] border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0A0B0E] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif font-bold text-xl text-[#F7F5F0]">
                  Transmit Inquiry
                </h3>

                <div>
                  <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lord Julian Sterling"
                    className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="julian@estate.com"
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiring about 85% Cacao Bar shelf life & cold shipping"
                    className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may our concierge assist your palate?"
                    className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? "Transmitting..." : "Send Docket to Atelier"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
