"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send, Zap } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

function ConceptBContactContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { showToast } = useToast();
  const { playCoin, playPop } = useRetroSound();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    try {
      const res = await api.submitContact({
        name,
        email,
        phone,
        subject: subject || "Collab / Query",
        message,
        concept_source: "Concept B — Retro Gen-Z",
      });
      if (res.success) {
        setSent(true);
        playCoin();
        showToast("DISPATCHED! ⚡ We'll hit you back soon.", "success");
        setName("");
        setEmail("");
        phone;
        setSubject("");
        setMessage("");
      }
    } catch {
      showToast("Unable to send note.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      {/* Header */}
      <ConceptBHeader />

      <section className="py-12 bg-[#FFE15D] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-comic-halftone opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3 relative z-10">
          <span className="px-4 py-1.5 bg-black text-[#FFE15D] text-xs font-retro-bold font-black uppercase tracking-wider inline-block rounded-xl border-2 border-black shadow-[3px_3px_0px_#FF2A55]">
            ⚡ GET IN TOUCH &bull; HOTLINE
          </span>
          <h1 className="font-retro-bold font-black text-4xl sm:text-6xl uppercase tracking-tight text-black">
            DROP US A NOTE OR VISIT
          </h1>
          <p className="text-xs sm:text-sm font-bold text-stone-900 max-w-md mx-auto">
            Got an inquiry, private event, brand collab or just craving sourdough? Reach out.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Side */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white border-4 border-black shadow-[8px_8px_0px_#000] space-y-5">
              <h3 className="font-retro-bold font-black text-2xl uppercase">
                THE PHYSICAL DINER
              </h3>

              <div className="space-y-4 text-xs font-bold">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF2A55] shrink-0" />
                  <div>
                    <div className="text-black font-black uppercase">ADDRESS</div>
                    <div className="text-stone-600 font-semibold">24, Garden Avenue, New Delhi, India 110001</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FF2A55] shrink-0" />
                  <div>
                    <div className="text-black font-black uppercase">SERVICE HOURS</div>
                    <div className="text-stone-600 font-semibold">Monday – Sunday &bull; 11:00 AM – 11:30 PM</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#FF2A55] shrink-0" />
                  <div>
                    <div className="text-black font-black uppercase">DIRECT LINE</div>
                    <div className="text-stone-600 font-semibold">+91 98765 43210 (dummy)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#FF2A55] shrink-0" />
                  <div>
                    <div className="text-black font-black uppercase">EMAIL INQUIRIES</div>
                    <div className="text-stone-600 font-semibold">hello@peachyplate.example</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_#000]">
              <img src="/images/restaurant-dining.webp" alt="Delhi Dining" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] space-y-6">
            <h3 className="font-retro-bold font-black text-2xl uppercase">
              SEND US A QUICK MESSAGE
            </h3>

            {sent ? (
              <div className="p-8 text-center bg-[#FFE15D] rounded-2xl border-4 border-black space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#FF2A55] mx-auto stroke-[3]" />
                <h4 className="font-retro-bold font-black text-2xl uppercase">
                  MESSAGE FIRED! ⚡
                </h4>
                <p className="text-xs font-bold text-stone-800">
                  Our manager will read your note and ping you back within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2.5 rounded-xl bg-black text-white text-xs font-retro-bold font-black uppercase shadow-[2px_2px_0px_#FF2A55]"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-retro-bold font-black">
                <div>
                  <label className="block mb-1">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aanya"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aanya@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">TOPIC / SUBJECT</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Catering, Private Event, Feedback..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none font-normal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-[#FF2A55] text-white border-[3px] border-black font-retro-bold font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000] disabled:opacity-50 transition"
                >
                  {submitting ? "SENDING MESSAGE..." : "DISPATCH MESSAGE ⚡"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <ConceptBFooter />
    </div>
  );
}

export default function ConceptBContactPage() {
  return (
    <RetroSoundProvider>
      <ConceptBContactContent />
    </RetroSoundProvider>
  );
}
