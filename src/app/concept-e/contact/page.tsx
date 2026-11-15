"use client";

import React, { useState } from "react";
import { Train, Phone, Mail, Clock, MapPin, Send, HelpCircle, CheckCircle2 } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptEContactPage() {
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
        subject: subject || "Station Concourse Inquiry",
        message,
        concept_source: "Concept E - Metro Bites",
      });
      if (res.success) {
        setSent(true);
        showToast("Telegraph dispatch received at Concourse Desk.", "success");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        showToast(res.error || "Failed to transmit message", "error");
      }
    } catch {
      showToast("Unable to send inquiry to station desk.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Signboard Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <HelpCircle className="w-3.5 h-3.5 text-[#D71920]" />
            CONCOURSE ENQUIRIES &bull; WAYFINDING &bull; LOST &amp; FOUND
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Station Information Desk
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            Get in touch with platform dispatch for event catering, private carriage charters, or lost commuter belongings.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Station Information & Timetable Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-6 sm:p-8 space-y-6">
              <span className="px-3 py-1 bg-[#FFD100] text-[#08142C] font-mono text-[10px] font-black rounded uppercase">
                TERMINAL COORDINATES
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#F8F6F0]">
                Central Concourse
              </h2>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FFD100] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#94A3B8] block">STATION ADDRESS</span>
                    <span className="text-white font-bold">Platform 01, Rajiv Chowk Concourse, Connaught Place, New Delhi 110001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#94A3B8] block">DISPATCH HOTLINE</span>
                    <span className="text-white font-bold">+91 11 4987 6543 / 1800-METRO-BITES</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#FFD100] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#94A3B8] block">ELECTRONIC DISPATCH</span>
                    <span className="text-white font-bold">stationmaster@peachyplate-metro.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#94A3B8] block">TRAIN OPERATING HOURS</span>
                    <span className="text-white font-bold">Mon &ndash; Sun: 06:00 AM &ndash; 11:30 PM (First Train to Last Train)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Emergency / Lost & Found */}
            <div className="bg-[#050D1C] border-2 border-dashed border-[#FFD100] rounded-2xl p-6 space-y-2 font-mono text-xs">
              <span className="text-[#FFD100] font-black uppercase text-[11px] block">
                LOST PROPERTY TELEGRAPH
              </span>
              <p className="text-[#94A3B8]">
                Left luggage or items on Platform 01 or dining carriages are safely stored at Station Security for 30 days. Contact concourse officer immediately.
              </p>
            </div>
          </div>

          {/* Contact Telegraph Form */}
          <div className="lg:col-span-7 bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-8 sm:p-10 shadow-xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#334155]">
              <Send className="w-5 h-5 text-[#FFD100]" />
              <h2 className="text-xl font-black uppercase tracking-wider text-[#F8F6F0]">
                Transmit Passenger Telegraph
              </h2>
            </div>

            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#4ADE80] mx-auto" />
                <h3 className="text-2xl font-black uppercase text-white">Telegraph Received!</h3>
                <p className="text-sm text-[#94A3B8] font-mono max-w-md mx-auto">
                  Station Master has received your transmission. Expect a prompt response before the next scheduled departure.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="bg-[#D71920] text-white px-6 py-2.5 rounded font-mono text-xs font-bold uppercase border border-[#FFD100]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Passenger / Officer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Inspector Dev Sharma"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Electronic Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@railway.org"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Transit Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    >
                      <option value="Concourse Catering" className="bg-[#08142C]">Station &amp; Event Catering</option>
                      <option value="Carriage Charter" className="bg-[#08142C]">Private Train Carriage Booking</option>
                      <option value="Lost & Found" className="bg-[#08142C]">Lost &amp; Found Item</option>
                      <option value="Commuter Feedback" className="bg-[#08142C]">Passenger Feedback / Complaint</option>
                      <option value="General Enquiries" className="bg-[#08142C]">General Transit Enquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Transmission Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding your travel booking, menu inquiries, or special concourse requests..."
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest py-4 rounded border-2 border-[#FFD100] shadow-[5px_5px_0px_#FFD100] transition-all disabled:opacity-50"
                >
                  {submitting ? "TRANSMITTING TELEGRAPH..." : "DISPATCH TELEGRAPH TO STATION MASTER &rarr;"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <ConceptEFooter />
    </div>
  );
}
