"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, MapPin, Package, LogOut, Plus, ShieldCheck, Mail, Phone } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptAAccountPage() {
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
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-10 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block mb-1">
            ✦ Client Vault &bull; Order Archives
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0]">
            Client Account &amp; Cold-Chain Dispatches
          </h1>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-5xl mx-auto px-6">
          {!isAuthenticated ? (
            /* Login & Register Forms */
            <div className="max-w-md mx-auto bg-[#13151A] rounded-2xl p-8 border border-[#C5A059]/30 shadow-2xl space-y-6">
              <div className="flex border-b border-[#C5A059]/20 pb-3">
                <button
                  onClick={() => setTab("login")}
                  className={`flex-1 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider transition ${
                    tab === "login"
                      ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Client Sign In
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`flex-1 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider transition ${
                    tab === "register"
                      ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Register Account
                </button>
              </div>

              {tab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition"
                  >
                    Enter Client Vault ✦
                  </button>
                  <p className="text-[11px] text-gray-500 font-mono text-center">
                    Sample login: aanya@example.com / admin123
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={regPass}
                      onChange={(e) => setRegPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition"
                  >
                    Create Account ✦
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Dashboard */
            <div className="space-y-10">
              {/* Profile Card */}
              <div className="p-8 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#16181F] border border-[#C5A059]/50 flex items-center justify-center text-xl text-[#C5A059] font-serif font-bold">
                    {customer?.full_name?.charAt(0) || "M"}
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-[#F7F5F0]">
                      {customer?.full_name}
                    </h2>
                    <div className="text-xs text-[#A89F91] flex flex-wrap gap-4 mt-1 font-mono">
                      <span>{customer?.email}</span>
                      <span>&bull;</span>
                      <span>{customer?.phone}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="px-5 py-2.5 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0A0B0E] transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Order History */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#F7F5F0] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#C5A059]" />
                  <span>Reserve Order Archives</span>
                </h3>

                {orders.length === 0 ? (
                  <div className="p-10 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 text-center text-xs text-[#A89F91]">
                    No previous dispatches found in this client account.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-sm text-[#F7F5F0]">
                              #{ord.order_number}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#16181F] text-[#C5A059] border border-[#C5A059]/40">
                              {ord.order_status}
                            </span>
                          </div>
                          <span className="text-xs text-[#A89F91] font-mono block mt-1">
                            {new Date(ord.created_at).toLocaleDateString()} &bull; Total: {api.formatPrice(ord.total_amount)}
                          </span>
                        </div>

                        <Link
                          href={`/concept-a/order-tracking/?order_number=${ord.order_number}`}
                          className="px-4 py-2 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0A0B0E] transition"
                        >
                          Track Dispatch &rarr;
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
