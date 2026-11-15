"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Leaf } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptDContactPage() {
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
        subject: subject || "Botanical Inquiry",
        message,
        concept_source: "Concept D - Organic Earth",
      });
      if (res.success) {
        setSent(true);
        showToast("Dispatch received by our greenhouse team.", "success");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        showToast(res.error || "Message delivery failed", "error");
      }
    } catch {
      showToast("Unable to send inquiry.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Banner */}
      <section className="bg-[#F2EFE9] py-16 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Conservatory Desk
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          Inquire with our Garden Team
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-md mx-auto font-light leading-relaxed">
          For private gatherings, botanical workshops, farm visits, or quiet inquiries.
        </p>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F2EFE9] rounded-2xl p-6 border border-[#5E6B4E]/20 space-y-2">
              <span className="text-2xl">🌱</span>
              <h3 className="font-medium text-base text-[#1E3F20]">Conservatory Grounds</h3>
              <p className="text-xs text-[#5E6B4E] leading-relaxed">
                8 Greenhouse Lane, Mehrauli Heritage Greens, New Delhi 110030
              </p>
            </div>

            <div className="bg-[#F2EFE9] rounded-2xl p-6 border border-[#5E6B4E]/20 space-y-2">
              <span className="text-2xl">📞</span>
              <h3 className="font-medium text-base text-[#1E3F20]">Direct Hospitality</h3>
              <p className="text-xs text-[#5E6B4E]">
                +91 11 8765 4321 / concierge@peachy-earth.in
              </p>
            </div>

            <div className="bg-[#F2EFE9] rounded-2xl p-6 border border-[#5E6B4E]/20 space-y-2">
              <span className="text-2xl">⏰</span>
              <h3 className="font-medium text-base text-[#1E3F20]">Harvest Hours</h3>
              <p className="text-xs text-[#5E6B4E] leading-relaxed">
                Tuesday &ndash; Sunday: 12:00 PM &ndash; 11:00 PM<br />
                Mondays: Closed for Garden Rest
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#5E6B4E]/25 p-8 sm:p-10 shadow-lg">
            <h2 className="text-2xl font-normal text-[#1E3F20] mb-6">
              Send a Quiet Dispatch
            </h2>

            {sent ? (
              <div className="bg-[#F2EFE9] p-8 rounded-2xl text-center space-y-3">
                <span className="text-4xl">🌾</span>
                <h3 className="text-lg font-medium text-[#1E3F20]">
                  Thank You for Writing
                </h3>
                <p className="text-xs text-[#5E6B4E]">
                  Your message has been placed on our manager&apos;s desk. We will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs uppercase text-[#C86D51] font-sans hover:underline"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Claire Smith"
                      className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="claire@earth.com"
                      className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Private Event / Workshop / Catering"
                      className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry..."
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest py-3.5 rounded-full transition-all shadow-md"
                >
                  {submitting ? "Transmitting..." : "Send Dispatch &rarr;"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <ConceptDFooter />
    </div>
  );
}
