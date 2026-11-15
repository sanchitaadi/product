"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Train, ArrowRight } from "lucide-react";

interface DepartureRow {
  trainNo: string;
  destination: string;
  dishName: string;
  time: string;
  platform: string;
  status: "NOW BOARDING" | "HOT FROM OVEN" | "ON TIME" | "EXP-DISPATCH";
  statusColor: string;
}

export default function DepartureBoard() {
  const [departures, setDepartures] = useState<DepartureRow[]>([
    { trainNo: "EX-101", destination: "PIZZA CENTRAL", dishName: "Charred Sourdough Margherita", time: "12:15", platform: "02", status: "HOT FROM OVEN", statusColor: "text-[#D71920]" },
    { trainNo: "EX-104", destination: "PASTA STREET", dishName: "Truffle Penne Rosa", time: "12:20", platform: "03", status: "NOW BOARDING", statusColor: "text-[#FFD100]" },
    { trainNo: "EX-208", destination: "ENTRÉE TERMINAL", dishName: "Herb Roasted Wild Salmon", time: "12:35", platform: "01", status: "ON TIME", statusColor: "text-emerald-400" },
    { trainNo: "EX-312", destination: "DESSERT EXPRESS", dishName: "Cold-Brew Espresso Tiramisu", time: "12:45", platform: "04", status: "EXP-DISPATCH", statusColor: "text-cyan-400" },
    { trainNo: "EX-405", destination: "BURGER JUNCTION", dishName: "Smash Wagyu Cheeseburger", time: "13:00", platform: "02", status: "ON TIME", statusColor: "text-emerald-400" },
  ]);

  const [currentTime, setCurrentTime] = useState("12:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050D1C] border-4 border-[#FFD100] rounded-2xl shadow-[10px_10px_0px_#D71920] overflow-hidden text-white font-mono">
      {/* Top Solari Station Banner */}
      <div className="bg-[#08142C] p-4 sm:p-6 border-b-2 border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#D71920] text-white flex items-center justify-center font-black text-xl border-2 border-white">
            🚆
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#FFD100]">
              PEACHY CONCOURSE &bull; LIVE DEPARTURES
            </h3>
            <span className="text-xs text-gray-400 tracking-wider">
              ALL SERVICES CALLING AT PLATFORMS 1 THROUGH 4
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black/60 px-4 py-2 rounded-lg border border-white/20">
          <Clock className="w-4 h-4 text-[#FFD100] animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-lg font-black tracking-widest text-[#FFD100]">
            {currentTime}
          </span>
        </div>
      </div>

      {/* Split Flap Table Headers */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#0D1F42] border-b-2 border-white/20 text-[#FFD100] font-black uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">TRAIN</th>
              <th className="py-3 px-4">DESTINATION / DISH</th>
              <th className="py-3 px-4">DEPART</th>
              <th className="py-3 px-4 text-center">PLAT</th>
              <th className="py-3 px-4 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 font-bold">
            {departures.map((row, i) => (
              <tr
                key={row.trainNo}
                className={`hover:bg-[#0E224A] transition-colors ${
                  i % 2 === 0 ? "bg-[#08142C]/40" : "bg-transparent"
                }`}
              >
                <td className="py-3.5 px-4 text-[#FFD100]">
                  <span className="bg-black/80 px-2 py-0.5 rounded border border-white/20">
                    {row.trainNo}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="text-white text-sm uppercase">{row.dishName}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                      {row.destination}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-gray-300 font-black">
                  {row.time}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#D71920] text-white font-black text-xs border border-white">
                    {row.platform}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className={`font-black tracking-wider text-xs uppercase ${row.statusColor} animate-pulse`}>
                    ● {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Footer */}
      <div className="bg-[#08142C] p-4 border-t-2 border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
        <span>⚡ ORDERS DISPATCHED WITHIN 20 MINUTES FROM RECEIPT</span>
        <Link
          href="/concept-e/menu/"
          className="text-[#FFD100] hover:underline flex items-center gap-1.5 uppercase font-black"
        >
          <span>VIEW FULL TIME-TABLE &bull; ORDER DISHES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
