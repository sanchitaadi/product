"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Train, User, LogOut, Plus, Mail, Phone, Ticket, MapPin, Clock, ShieldCheck } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptEAccountPage() {
  const { customer, addresses, orders, isAuthenticated, login, register, logout, saveAddress } = useAuth();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginEmail, setLoginEmail] = useState("aanya@example.com");
  const [loginPass, setLoginPass] = useState("admin123");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");

  const [newAddrLine, setNewAddrLine] = useState("");
  const [newCity, setNewCity] = useState("New Delhi");
  const [newPincode, setNewPincode] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [showAddrForm, setShowAddrForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginEmail, loginPass);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      full_name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPass,
    });
  };

  const handleSaveAddr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine || !newPincode) return;
    await saveAddress({
      address_line: newAddrLine,
      city: newCity,
      pincode: newPincode,
      landmark: newLandmark,
    });
    setNewAddrLine("");
    setNewPincode("");
    setNewLandmark("");
    setShowAddrForm(false);
  };

  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Signboard Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <Ticket className="w-3.5 h-3.5 text-[#D71920]" />
            PASSENGER PORTAL &bull; TRANSIT SMART PASS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Passenger Transit Pass
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            Manage your commuter credentials, saved destination addresses, and past train journey orders.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto bg-[#0D1F42] border-4 border-[#FFD100] rounded-2xl p-8 sm:p-10 shadow-[8px_8px_0px_#D71920]">
            <div className="flex border-b-2 border-[#334155] mb-6 font-mono text-xs font-bold uppercase">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  tab === "login"
                    ? "border-[#FFD100] text-[#FFD100]"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                Commuter Login
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  tab === "register"
                    ? "border-[#FFD100] text-[#FFD100]"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                Issue Smart Pass
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#94A3B8] uppercase font-bold mb-1">
                    Transit Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94A3B8] uppercase font-bold mb-1">
                    Passkey / Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest py-3.5 rounded border-2 border-[#FFD100] shadow-[3px_3px_0px_#FFD100] transition-all"
                >
                  SWIPE SMART PASS TO ENTER &rarr;
                </button>
                <div className="pt-2 text-center text-[10px] text-[#94A3B8]">
                  Demo: <code className="text-[#FFD100]">aanya@example.com</code> / <code className="text-[#FFD100]">admin123</code>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#94A3B8] uppercase font-bold mb-1">
                    Passenger Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94A3B8] uppercase font-bold mb-1">
                    Official Transit Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94A3B8] uppercase font-bold mb-1">
                    Transit Mobile Line *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#94A3B8] uppercase font-bold mb-1">
                    Create Secure Passkey *
                  </label>
                  <input
                    type="password"
                    required
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest py-3.5 rounded border-2 border-[#FFD100] shadow-[3px_3px_0px_#FFD100] transition-all"
                >
                  ISSUE TRANSIT SMART PASS &rarr;
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="space-y-12">
            {/* Passenger Smart Pass Header Card */}
            <div className="bg-[#050D1C] rounded-2xl border-4 border-[#FFD100] p-6 sm:p-10 shadow-[8px_8px_0px_#D71920] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#FFD100] text-[#08142C] flex items-center justify-center font-black text-2xl">
                  <User className="w-8 h-8 text-[#08142C]" />
                </div>
                <div className="space-y-1 font-mono">
                  <span className="px-2 py-0.5 bg-[#D71920] text-white text-[10px] font-bold rounded uppercase">
                    FIRST-CLASS TRANSIT COMMUTER
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                    {customer?.full_name}
                  </h2>
                  <p className="text-xs text-[#94A3B8]">
                    {customer?.email} &bull; {customer?.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#08142C] border-2 border-[#334155] hover:border-[#D71920] text-xs font-mono font-bold text-[#94A3B8] hover:text-[#D71920] transition-colors uppercase"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Exit Concourse
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Saved Transit Addresses */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-6 sm:p-8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#334155] pb-3">
                    <span className="text-[#FFD100] font-black uppercase">
                      DESTINATION DISPATCH HUBS
                    </span>
                    <button
                      onClick={() => setShowAddrForm(!showAddrForm)}
                      className="text-xs text-white hover:text-[#FFD100] underline uppercase"
                    >
                      {showAddrForm ? "Cancel" : "+ Add Hub"}
                    </button>
                  </div>

                  {showAddrForm && (
                    <form onSubmit={handleSaveAddr} className="p-4 bg-[#08142C] rounded-xl border border-[#334155] space-y-3">
                      <div>
                        <label className="block text-[#94A3B8] mb-1 uppercase text-[10px]">Street / Platform Drop *</label>
                        <input
                          type="text"
                          required
                          value={newAddrLine}
                          onChange={(e) => setNewAddrLine(e.target.value)}
                          placeholder="e.g. 14 Barakhamba Road"
                          className="w-full bg-[#050D1C] border border-[#334155] rounded p-2 text-white outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#94A3B8] mb-1 uppercase text-[10px]">City</label>
                          <input
                            type="text"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full bg-[#050D1C] border border-[#334155] rounded p-2 text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[#94A3B8] mb-1 uppercase text-[10px]">Pincode *</label>
                          <input
                            type="text"
                            required
                            value={newPincode}
                            onChange={(e) => setNewPincode(e.target.value)}
                            placeholder="110001"
                            className="w-full bg-[#050D1C] border border-[#334155] rounded p-2 text-white outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#94A3B8] mb-1 uppercase text-[10px]">Station Landmark</label>
                        <input
                          type="text"
                          value={newLandmark}
                          onChange={(e) => setNewLandmark(e.target.value)}
                          placeholder="Opposite Fire Station"
                          className="w-full bg-[#050D1C] border border-[#334155] rounded p-2 text-white outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#FFD100] text-[#08142C] font-black py-2 rounded text-xs uppercase"
                      >
                        Save Transit Hub
                      </button>
                    </form>
                  )}

                  <div className="space-y-3">
                    {addresses.length === 0 ? (
                      <p className="text-[#94A3B8]">No saved drop-off hubs recorded.</p>
                    ) : (
                      addresses.map((a) => (
                        <div key={a.id} className="p-3 bg-[#08142C] rounded-lg border border-[#334155] space-y-1">
                          <p className="text-white font-bold">{a.address_line}</p>
                          <p className="text-[#94A3B8] text-[11px]">{a.city} &bull; {a.pincode}</p>
                          {a.landmark && <p className="text-[#FFD100] text-[10px]">Landmark: {a.landmark}</p>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Past Train Orders */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-6 sm:p-8 space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#334155] pb-3">
                    <span className="text-[#FFD100] font-black uppercase">
                      RECENT TRAIN JOURNEY ORDERS ({orders.length})
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-8 space-y-3">
                      <Train className="w-10 h-10 text-[#334155] mx-auto" />
                      <p className="text-[#94A3B8]">No previous train orders on your transit pass.</p>
                      <Link
                        href="/concept-e/menu/"
                        className="inline-block bg-[#D71920] text-white px-5 py-2 rounded text-xs uppercase font-bold"
                      >
                        Board the Menu &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((o) => (
                        <div
                          key={o.id}
                          className="p-5 bg-[#08142C] rounded-xl border border-[#334155] hover:border-[#FFD100] transition-colors space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-[#94A3B8]">TRANSIT TICKET</span>
                              <h4 className="text-sm font-black text-white">#{o.order_number}</h4>
                            </div>
                            <span className="px-2.5 py-1 bg-[#FFD100] text-[#08142C] text-[10px] font-black rounded uppercase">
                              {o.order_status}
                            </span>
                          </div>

                          <div className="flex justify-between text-[#94A3B8] text-[11px] border-t border-[#334155] pt-2">
                            <span>MODE: {o.order_type?.toUpperCase()}</span>
                            <span className="text-white font-bold">{api.formatPrice(o.total_amount)}</span>
                          </div>

                          <div className="pt-1">
                            <Link
                              href={`/concept-e/order-tracking/?order=${o.order_number}`}
                              className="text-xs text-[#FFD100] hover:underline uppercase font-bold"
                            >
                              Track on Live Radar &rarr;
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptEFooter />
    </div>
  );
}
