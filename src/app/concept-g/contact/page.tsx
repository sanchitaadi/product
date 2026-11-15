"use client";

import React, { useState } from "react";
import { Star, Ticket, Phone, Mail, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptGContactPage() {
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
        subject: subject || "Carnival Information Gate Inquiry",
        message,
        concept_source: "Concept G - Circus Social",
      });
      if (res.success) {
        setSent(true);
        showToast("Dispatch received at Carnival Gate Desk!", "success");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        showToast(res.error || "Message delivery failed", "error");
      }
    } catch {
      showToast("Unable to send inquiry to information gate.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Star className="w-3.5 h-3.5 fill-[#5C0614]" />
            GUEST RELATIONS &bull; CARNIVAL INFORMATION GATE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Information Gate
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Contact the Peachy circus troupe for big top event catering, private tent takeovers, or lost belongings.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#5C0614]">
              <span className="px-3 py-1 bg-[#FFD54F] text-[#5C0614] font-mono text-[10px] font-black uppercase rounded-full border border-[#5C0614]">
                CARNIVAL COORDINATES
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
                Big Top Flagship Tent
              </h2>

              <div className="space-y-4 text-xs font-bold font-mono">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C41E3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">TENT ADDRESS</span>
                    <span className="text-[#5C0614] font-black">Gate 4, Connaught Circus Outer Ring, New Delhi 110001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">RINGMASTER CALL LINE</span>
                    <span className="text-[#5C0614] font-black">+91 11 4888 7777 / 1800-CIRCUS-PEACHY</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C41E3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">GUEST RELATIONS EMAIL</span>
                    <span className="text-[#5C0614] font-black">ringmaster@peachyplate-circus.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FFD54F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">SHOWTIME HOURS</span>
                    <span className="text-[#5C0614] font-black">Daily Showings: 11:30 AM &ndash; 11:30 PM (Continuous Acts)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lost & Found */}
            <div className="p-6 bg-[#FFD54F] border-3 border-[#5C0614] rounded-3xl text-xs font-bold shadow-[6px_6px_0px_#C41E3A] space-y-2">
              <span className="font-black text-[#5C0614] uppercase block text-[11px]">
                LOST PROPERTY BOOTH
              </span>
              <p className="text-[#5C0614]/85">
                Left hats, jackets, or belongings inside our big top or ringside booths? Safely cataloged at the main ticket gate for 30 days. Contact security immediately.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white border-4 border-[#C41E3A] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_#5C0614]">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-[#5C0614]/20">
              <Send className="w-5 h-5 text-[#C41E3A]" />
              <h2 className="text-xl font-black uppercase tracking-wider text-[#5C0614] font-serif">
                Transmit Carnival Dispatch
              </h2>
            </div>

            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#22C55E] mx-auto" />
                <h3 className="text-2xl font-black uppercase text-[#5C0614] font-serif">Dispatch Received!</h3>
                <p className="text-sm text-[#5C0614]/80 font-medium max-w-md mx-auto">
                  Our troupe has received your message. Expect a response before the next scheduled curtain call.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="bg-[#C41E3A] text-white px-6 py-2.5 font-black text-xs uppercase rounded-full border-2 border-[#FFD54F]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-bold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Spectator Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lady Clara Sterling"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Electronic Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="spectator@circussocial.org"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    >
                      <option value="Tent Charter">Private Big Top Tent Charter</option>
                      <option value="Carnival Catering">Carnival &amp; Party Catering</option>
                      <option value="Lost Property">Lost &amp; Found Item</option>
                      <option value="Guest Feedback">Spectator Feedback &amp; Compliment</option>
                      <option value="General Question">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding your booking, celebration, menu inquiry, or special carnival request..."
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#C41E3A] hover:bg-[#a3162c] text-white font-black uppercase text-xs tracking-widest py-4 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-all disabled:opacity-50"
                >
                  {submitting ? "TRANSMITTING TO GATE..." : "DISPATCH TELEGRAPH TO RINGMASTER &rarr;"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <ConceptGFooter />
    </div>
  );
}
