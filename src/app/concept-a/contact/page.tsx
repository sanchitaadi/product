"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
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
        subject: subject || "Dining Inquiry",
        message,
        concept_source: "Concept A — Coquette Pinterest",
      });
      if (res.success) {
        setSent(true);
        showToast("Message sent to Concierge! 🎀", "success");
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
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block">
            🎀 Concierge & Garden Bistro
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Contact & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Have questions about private celebrations, catering ribbons, or allergies? Our concierge is at your service.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Info */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-6">
              <h2 className="font-coquette-serif font-bold text-2xl text-gray-900">
                Visit Our Garden Sanctuary
              </h2>
              <div className="space-y-4 text-xs text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#E07A86] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 text-sm">Bistro Address</strong>
                    <span>24, Garden Avenue, New Delhi, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#E07A86] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 text-sm">Service Hours</strong>
                    <span>Monday – Sunday: 11:00 AM – 11:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#E07A86] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 text-sm">Concierge Line</strong>
                    <span>+91 98765 43210 (dummy)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-[#E07A86] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 text-sm">Email Inquiries</strong>
                    <span>hello@peachyplate.example</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-rose-100 shadow-sm">
              <img src="/images/restaurant-dining.webp" alt="Conservatory Dining" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-sm space-y-6">
            <h2 className="font-coquette-serif font-bold text-2xl text-gray-900">
              Send Concierge a Message
            </h2>

            {sent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base text-emerald-950">Inquiry Dispatched!</h3>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out. A hospitality manager will respond within 4 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 rounded-full bg-emerald-600 text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aanya Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aanya@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98112 34567"
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Inquiry Topic</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Birthday celebration catering, private lounge..."
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're planning..."
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-200/50 hover:opacity-95 disabled:opacity-50 transition"
                >
                  {submitting ? "Sending..." : "Dispatch Message to Concierge 🎀"}
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
