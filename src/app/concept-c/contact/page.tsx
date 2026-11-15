"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Zap } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptCContactPage() {
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
        subject: subject || "Pop Art Inquiry",
        message,
        concept_source: "Concept C - Maximalist Pop Art",
      });
      if (res.success) {
        setSent(true);
        showToast("Message received! The Pop Crew will reply shortly.", "success");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        showToast(res.error || "Failed to send message", "error");
      }
    } catch {
      showToast("Unable to send message.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Header Banner */}
      <section className="bg-[#0047FF] text-white py-16 border-b-4 border-black text-center space-y-3 relative overflow-hidden">
        <span className="bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ⚡ POP ART HOTLINE ⚡
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          GET IN TOUCH WITH THE CREW
        </h1>
        <p className="text-sm font-bold text-white/90 max-w-md mx-auto">
          Catering inquiries, art exhibition bookings, collaborations, or general food love notes.
        </p>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFE600] border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-3">
              <span className="text-2xl">📍</span>
              <h3 className="text-lg font-black uppercase">Atelier Location</h3>
              <p className="text-sm font-bold text-black">
                42 Art District Avenue, Hauz Khas, New Delhi 110016
              </p>
            </div>

            <div className="bg-[#FF007F] text-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-3">
              <span className="text-2xl">📞</span>
              <h3 className="text-lg font-black uppercase">Direct Telephone</h3>
              <p className="text-sm font-bold">
                +91 11 4567 8900 / +91 98765 43210
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-3">
              <span className="text-2xl">⏰</span>
              <h3 className="text-lg font-black uppercase">Canteen Hours</h3>
              <p className="text-sm font-bold text-gray-700">
                Monday &ndash; Thursday: 12:00 PM &ndash; 11:00 PM<br />
                Friday &ndash; Sunday: 11:30 AM &ndash; Midnight
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#FF007F]">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6">
              SEND US A DISPATCH
            </h2>

            {sent ? (
              <div className="bg-[#FFE600] border-4 border-black p-8 text-center space-y-4">
                <span className="text-4xl">🚀</span>
                <h3 className="text-xl font-black uppercase">
                  MESSAGE DISPATCHED!
                </h3>
                <p className="text-sm font-bold">
                  Thank you for reaching out. We usually respond within 2 &ndash; 4 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="bg-black text-white text-xs font-black uppercase px-6 py-2.5 border-2 border-black"
                >
                  SEND ANOTHER NOTE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean-Michel"
                      className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="basquiat@art.com"
                      className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="VIP Booking / Press / Catering"
                      className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your note here..."
                    className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#FFE600] hover:bg-[#FF007F] hover:text-white text-black font-black uppercase text-sm py-4 border-4 border-black shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  {submitting ? "TRANSMITTING..." : "TRANSMIT DISPATCH &rarr;"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <ConceptCFooter />
    </div>
  );
}
