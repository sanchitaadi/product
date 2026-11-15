"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Ticket, User, LogOut, Plus, Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptGAccountPage() {
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
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Ticket className="w-3.5 h-3.5" />
            VIP PASSHOLDER &bull; CARNIVAL PORTAL
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Circus Passholder Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Manage your VIP carnival credentials, saved delivery hubs, and past big top ticket orders.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto bg-white border-4 border-[#C41E3A] rounded-3xl p-8 sm:p-10 shadow-[10px_10px_0px_#5C0614]">
            <div className="flex border-b-2 border-[#5C0614]/20 mb-6 text-xs font-black uppercase">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  tab === "login"
                    ? "border-[#C41E3A] text-[#C41E3A]"
                    : "border-transparent text-gray-400 hover:text-[#5C0614]"
                }`}
              >
                Passholder Login
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  tab === "register"
                    ? "border-[#C41E3A] text-[#C41E3A]"
                    : "border-transparent text-gray-400 hover:text-[#5C0614]"
                }`}
              >
                Claim VIP Pass
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Passholder Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Secret Passkey
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-full border-2 border-[#FFD54F] shadow-[3px_3px_0px_#5C0614] transition-all"
                >
                  ENTER THE BIG TOP &rarr;
                </button>
                <div className="pt-2 text-center text-[10px] text-gray-600 font-mono">
                  Demo: <code className="text-[#C41E3A] font-bold">aanya@example.com</code> / <code className="text-[#C41E3A] font-bold">admin123</code>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Spectator Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Mobile Line *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Secret Passkey *
                  </label>
                  <input
                    type="password"
                    required
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-full border-2 border-[#FFD54F] shadow-[3px_3px_0px_#5C0614] transition-all"
                >
                  CLAIM VIP PASSHOLDER TICKET &rarr;
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Dashboard */
          <div className="space-y-12">
            {/* VIP Pass Header */}
            <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_#5C0614] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FFD54F] border-3 border-[#5C0614] rounded-full text-[#5C0614] flex items-center justify-center font-black text-2xl shadow-md">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-0.5 bg-[#C41E3A] text-white text-[10px] font-black uppercase rounded-full border border-[#FFD54F] inline-block">
                    GOLDEN VIP PASSHOLDER
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
                    {customer?.full_name}
                  </h2>
                  <p className="text-xs text-gray-600 font-mono font-bold">
                    {customer?.email} &bull; {customer?.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#5C0614] hover:bg-[#5C0614] hover:text-white text-xs font-black text-[#5C0614] rounded-full transition-colors uppercase shadow-[2px_2px_0px_#5C0614]"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Exit Tent
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Addresses */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-8 space-y-4 text-xs font-bold shadow-[6px_6px_0px_#5C0614]">
                  <div className="flex items-center justify-between border-b-2 border-[#5C0614]/20 pb-3">
                    <span className="text-[#5C0614] font-black uppercase">
                      SAVED DELIVERY HUBS
                    </span>
                    <button
                      onClick={() => setShowAddrForm(!showAddrForm)}
                      className="text-xs text-[#C41E3A] underline uppercase font-black"
                    >
                      {showAddrForm ? "Cancel" : "+ Add Hub"}
                    </button>
                  </div>

                  {showAddrForm && (
                    <form onSubmit={handleSaveAddr} className="p-4 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-2xl space-y-3">
                      <div>
                        <label className="block text-[#5C0614] uppercase text-[10px] mb-1">Street / Apartment *</label>
                        <input
                          type="text"
                          required
                          value={newAddrLine}
                          onChange={(e) => setNewAddrLine(e.target.value)}
                          placeholder="e.g. 18 Kasturba Gandhi Marg"
                          className="w-full bg-white border border-[#5C0614] rounded-xl p-2 text-[#5C0614] outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#5C0614] uppercase text-[10px] mb-1">City</label>
                          <input
                            type="text"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full bg-white border border-[#5C0614] rounded-xl p-2 text-[#5C0614] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[#5C0614] uppercase text-[10px] mb-1">Pincode *</label>
                          <input
                            type="text"
                            required
                            value={newPincode}
                            onChange={(e) => setNewPincode(e.target.value)}
                            placeholder="110001"
                            className="w-full bg-white border border-[#5C0614] rounded-xl p-2 text-[#5C0614] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#5C0614] uppercase text-[10px] mb-1">Landmark</label>
                        <input
                          type="text"
                          value={newLandmark}
                          onChange={(e) => setNewLandmark(e.target.value)}
                          placeholder="Near Metro Gate"
                          className="w-full bg-white border border-[#5C0614] rounded-xl p-2 text-[#5C0614] outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#FFD54F] text-[#5C0614] font-black py-2 text-xs uppercase rounded-full border border-[#5C0614]"
                      >
                        Save Drop Hub
                      </button>
                    </form>
                  )}

                  <div className="space-y-3">
                    {addresses.length === 0 ? (
                      <p className="text-gray-500">No saved delivery hubs recorded.</p>
                    ) : (
                      addresses.map((a) => (
                        <div key={a.id} className="p-3 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-2xl space-y-1">
                          <p className="text-[#5C0614] font-black">{a.address_line}</p>
                          <p className="text-gray-600 text-[11px] font-mono">{a.city} &bull; {a.pincode}</p>
                          {a.landmark && <p className="text-[#C41E3A] text-[10px]">Landmark: {a.landmark}</p>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Past Carnival Orders */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-bold shadow-[6px_6px_0px_#5C0614]">
                  <div className="flex items-center justify-between border-b-2 border-[#5C0614]/20 pb-3">
                    <span className="text-[#5C0614] font-black uppercase">
                      CARNIVAL ORDERS ARCHIVE ({orders.length})
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-8 space-y-3">
                      <Ticket className="w-10 h-10 text-gray-300 mx-auto" />
                      <p className="text-gray-500">No carnival orders recorded on your VIP pass.</p>
                      <Link
                        href="/concept-g/menu/"
                        className="inline-block bg-[#C41E3A] text-white px-5 py-2 text-xs uppercase font-black rounded-full border border-[#FFD54F]"
                      >
                        Visit Big Top Menu &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((o) => (
                        <div
                          key={o.id}
                          className="p-5 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-2xl hover:shadow-[4px_4px_0px_#FFD54F] transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-gray-500 font-mono">TICKET STUB</span>
                              <h4 className="text-sm font-black text-[#5C0614]">#{o.order_number}</h4>
                            </div>
                            <span className="px-2.5 py-1 bg-[#FFD54F] text-[#5C0614] text-[10px] font-black rounded-full border border-[#5C0614] uppercase">
                              {o.order_status}
                            </span>
                          </div>

                          <div className="flex justify-between text-[#5C0614]/80 text-[11px] font-mono border-t border-[#5C0614]/10 pt-2">
                            <span>MODE: {o.order_type?.toUpperCase()}</span>
                            <span className="text-[#5C0614] font-black">{api.formatPrice(o.total_amount)}</span>
                          </div>

                          <div className="pt-1">
                            <Link
                              href={`/concept-g/order-tracking/?order=${o.order_number}`}
                              className="text-xs text-[#C41E3A] hover:underline uppercase font-black"
                            >
                              Track on Parade Radar &rarr;
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

      <ConceptGFooter />
    </div>
  );
}
