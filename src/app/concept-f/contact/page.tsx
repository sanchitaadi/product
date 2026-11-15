"use client";

import React, { useState } from "react";
import { Zap, Phone, Mail, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptFContactPage() {
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
        subject: subject || "Studio Editorial Inquiry",
        message,
        concept_source: "Concept F - Manga Bites",
      });
      if (res.success) {
        setSent(true);
        showToast("Dispatch received at Manga Studio Desk!", "success");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        showToast(res.error || "Message delivery failed", "error");
      }
    } catch {
      showToast("Unable to send inquiry to studio desk.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <Zap className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
            STUDIO TELEGRAPH &bull; EDITORIAL CONTACT
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Studio Dispatch Desk
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Have questions regarding private studio takeovers, comic catering, or fan feedback? Send a telegraph to our chief editors.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coordinates Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-4 border-black p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000]">
              <span className="px-3 py-1 bg-[#FFE600] text-black font-mono text-[10px] font-black uppercase border border-black">
                STUDIO COORDINATES
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Manga Bites Studio HQ
              </h2>

              <div className="space-y-4 text-xs font-bold font-mono">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D7263D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">ADDRESS</span>
                    <span className="text-black font-black">Radial 3, Inner Circle, Connaught Place, New Delhi 110001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">HOTLINE</span>
                    <span className="text-black font-black">+91 11 4123 9999 / 1800-MANGA-BITES</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D7263D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">EDITORIAL INK</span>
                    <span className="text-black font-black">editors@peachyplate-manga.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FFE600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-500 block text-[10px]">STUDIO SERVICE HOURS</span>
                    <span className="text-black font-black">Mon &ndash; Sun: 11:30 AM &ndash; 11:30 PM Daily</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Omake Fan Mail Note */}
            <div className="p-6 bg-[#FFE600] border-3 border-black text-xs font-bold shadow-[6px_6px_0px_#000] space-y-2">
              <span className="font-black text-black uppercase block text-[11px]">
                FAN ART &amp; MANGA SUBMISSIONS
              </span>
              <p className="text-gray-800">
                Want your original manga artwork displayed in our Connaught Place saloon frames? Drop sketches in our physical mailbox or email high-res scans!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b-3 border-black">
              <Send className="w-5 h-5 text-[#D7263D]" />
              <h2 className="text-xl font-black uppercase tracking-wider text-black">
                Transmit Fan Telegraph
              </h2>
            </div>

            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#22C55E] mx-auto" />
                <h3 className="text-2xl font-black uppercase text-black">Telegraph Logged!</h3>
                <p className="text-sm text-gray-700 font-bold max-w-md mx-auto">
                  Our chief editors have received your transmission. Expect a prompt response before the next weekly issue prints.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="bg-black text-[#FFE600] px-6 py-2.5 font-black text-xs uppercase border-2 border-black"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-bold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black uppercase mb-1">
                      Guest / Artist Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kenji Tanaka"
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-black uppercase mb-1">
                      Electronic Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="artist@mangabites.org"
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black uppercase mb-1">
                      Contact Line / Mobile
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-black uppercase mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    >
                      <option value="Studio Catering">Studio &amp; Event Catering</option>
                      <option value="Mural Collaboration">Manga Mural &amp; Art Collaboration</option>
                      <option value="Fan Feedback">Fan Feedback &amp; Suggestions</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">
                    Transmission Content *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding your booking, menu inquiries, or special catering requests..."
                    className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D7263D] hover:bg-[#b51f33] text-white font-black uppercase text-xs tracking-widest py-4 border-3 border-black shadow-[5px_5px_0px_#FFE600] transition-all disabled:opacity-50"
                >
                  {submitting ? "TRANSMITTING TELEGRAPH..." : "DISPATCH TELEGRAPH TO EDITORS &rarr;"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <ConceptFFooter />
    </div>
  );
}
