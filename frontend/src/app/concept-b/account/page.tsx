"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, MapPin, Package, LogOut, Plus, Zap, Mail, Phone } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptBAccountPage() {
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
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans">
      <ConceptBHeader />

      <section className="py-8 bg-[#FFE15D] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-black uppercase tracking-wider text-black block mb-1">
            ⚡ PATRON HUB
          </span>
          <h1 className="font-retro-bold font-black text-3xl sm:text-5xl uppercase tracking-tight">
            VIP MEMBERSHIP
          </h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-5xl mx-auto px-6">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_#000] space-y-6">
              <div className="flex border-b-2 border-black pb-3">
                <button
                  onClick={() => setTab("login")}
                  className={`flex-1 py-2 text-center text-xs font-black uppercase tracking-wider transition ${
                    tab === "login"
                      ? "bg-[#FFE15D] border-2 border-black shadow-[2px_2px_0px_#000]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  SIGN IN
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`flex-1 py-2 text-center text-xs font-black uppercase tracking-wider transition ${
                    tab === "register"
                      ? "bg-[#FFE15D] border-2 border-black shadow-[2px_2px_0px_#000]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  JOIN VIP
                </button>
              </div>

              {tab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
                  <div>
                    <label className="block mb-1">EMAIL</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">PASSWORD</label>
                    <input
                      type="password"
                      required
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF2A55] text-white border-2 border-black font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]"
                  >
                    ACCESS VIP ACCOUNT ⚡
                  </button>
                  <p className="text-[10px] text-gray-500 text-center uppercase font-bold">
                    Sample: aanya@example.com / admin123
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4 text-xs font-bold">
                  <div>
                    <label className="block mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">EMAIL</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">PHONE</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">PASSWORD</label>
                    <input
                      type="password"
                      required
                      value={regPass}
                      onChange={(e) => setRegPass(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF2A55] text-white border-2 border-black font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]"
                  >
                    JOIN VIP CLUB ⚡
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="p-8 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#FFE15D] border-2 border-black flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#000]">
                    ⚡
                  </div>
                  <div>
                    <h2 className="font-retro-bold font-black text-3xl">{customer?.full_name}</h2>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-700 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {customer?.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {customer?.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="px-5 py-2.5 rounded-xl bg-white border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-stone-100"
                >
                  SIGN OUT
                </button>
              </div>

              {/* Destinations */}
              <div className="p-8 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-retro-bold font-black text-2xl uppercase">
                    SAVED ADDRESSES
                  </h3>
                  <button
                    onClick={() => setShowAddrForm(!showAddrForm)}
                    className="px-4 py-2 rounded-xl bg-[#FFE15D] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
                  >
                    {showAddrForm ? "CANCEL" : "+ ADD ADDRESS"}
                  </button>
                </div>

                {showAddrForm && (
                  <form onSubmit={handleSaveAddr} className="p-5 rounded-xl bg-[#FFF9EC] border-2 border-black space-y-3 font-bold text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block mb-1">STREET ADDRESS</label>
                        <input
                          type="text"
                          required
                          value={newAddrLine}
                          onChange={(e) => setNewAddrLine(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">CITY</label>
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">PINCODE</label>
                        <input
                          type="text"
                          required
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-black text-white font-black text-xs uppercase"
                    >
                      SAVE ADDRESS
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.length === 0 ? (
                    <div className="text-xs font-bold text-gray-500 py-2">No addresses saved.</div>
                  ) : (
                    addresses.map((a) => (
                      <div key={a.id} className="p-4 rounded-xl border-2 border-black bg-[#FFF9EC] text-xs font-bold space-y-1">
                        <span className="block font-black">{a.title}</span>
                        <p className="text-gray-700">{a.address_line}</p>
                        <p className="text-gray-500">{a.city} &bull; {a.pincode}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Past Orders */}
              <div className="p-8 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] space-y-6">
                <h3 className="font-retro-bold font-black text-2xl uppercase">
                  DROP HISTORY
                </h3>
                {orders.length === 0 ? (
                  <div className="text-xs font-bold text-gray-500 py-2">No previous drops recorded.</div>
                ) : (
                  <div className="divide-y-2 divide-black/10">
                    {orders.map((o) => (
                      <div key={o.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold">
                        <div>
                          <span className="font-retro-bold font-black text-base block">
                            ORDER #{o.order_number}
                          </span>
                          <span className="text-gray-600 block">{o.created_at} &bull; {o.order_type}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-lg bg-[#FFE15D] border-2 border-black font-black">
                            {o.order_status}
                          </span>
                          <span className="font-black text-base">{api.formatPrice(o.final_total)}</span>
                          <Link
                            href={`/concept-b/order-tracking/?order=${encodeURIComponent(o.order_number)}`}
                            className="px-4 py-2 rounded-xl bg-black text-white text-xs font-black uppercase"
                          >
                            RADAR
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptBFooter />
    </div>
  );
}
