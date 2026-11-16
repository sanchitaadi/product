"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function CustomizationModal() {
  const { customizingItem, closeCustomization, addToCart, conceptTheme } = useCart();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number[]>>({});
  const [packVariant, setPackVariant] = useState<"single" | "bundle3" | "bundle6">("single");
  const [instructions, setInstructions] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!customizingItem) return;

    setLoading(true);
    setInstructions("");
    setPackVariant("single");
    api
      .getItemCustomizations(customizingItem.id)
      .then((res) => {
        if (res.success && Array.isArray(res.groups)) {
          setGroups(res.groups);
          // Set initial default selections
          const initial: Record<number, number[]> = {};
          res.groups.forEach((g: any) => {
            const defaultOpts = (g.options || []).filter((o: any) => o.is_default == 1).map((o: any) => o.id);
            if (defaultOpts.length > 0) {
              initial[g.id] = defaultOpts;
            } else if (g.is_required == 1 && g.options && g.options.length > 0) {
              initial[g.id] = [g.options[0].id];
            } else {
              initial[g.id] = [];
            }
          });
          setSelectedOptions(initial);
        } else {
          setGroups([]);
          setSelectedOptions({});
        }
      })
      .catch(() => {
        setGroups([]);
      })
      .finally(() => setLoading(false));
  }, [customizingItem]);

  const handleToggleOption = (group: any, optionId: number) => {
    const current = selectedOptions[group.id] || [];
    if (group.type === "single") {
      setSelectedOptions({ ...selectedOptions, [group.id]: [optionId] });
    } else {
      // multiple
      let next: number[];
      if (current.includes(optionId)) {
        next = current.filter((id) => id !== optionId);
      } else {
        if (group.max_select && current.length >= group.max_select) {
          return; // reached limit
        }
        next = [...current, optionId];
      }
      setSelectedOptions({ ...selectedOptions, [group.id]: next });
    }
  };

  const calculatedTotal = useMemo(() => {
    if (!customizingItem) return 0;
    let baseUnit = Number(customizingItem.price || 0);

    groups.forEach((g) => {
      const selectedIds = selectedOptions[g.id] || [];
      (g.options || []).forEach((o: any) => {
        if (selectedIds.includes(o.id)) {
          baseUnit += Number(o.price_delta || 0);
        }
      });
    });

    if (packVariant === "bundle3") {
      return Math.round(baseUnit * 3 * 0.9);
    }
    if (packVariant === "bundle6") {
      return Math.round(baseUnit * 6 * 0.85);
    }
    return baseUnit;
  }, [customizingItem, groups, selectedOptions, packVariant]);

  const handleAdd = async () => {
    if (!customizingItem) return;
    setAdding(true);
    const flattenedOptionIds: number[] = [];
    Object.values(selectedOptions).forEach((ids) => flattenedOptionIds.push(...ids));

    const packPrefix =
      packVariant === "bundle3"
        ? "[3-Pack Bundle (Save 10%)] "
        : packVariant === "bundle6"
        ? "[6-Pack Pantry Box (Save 15%)] "
        : "[Single Unit] ";

    const fullNote = `${packPrefix}${instructions}`.trim();
    const qty = packVariant === "bundle3" ? 3 : packVariant === "bundle6" ? 6 : 1;

    await addToCart(customizingItem.id, qty, flattenedOptionIds, fullNote);
    setAdding(false);
    closeCustomization();
  };

  if (!customizingItem) return null;

  // Theme-specific styles
  const isRetro = conceptTheme === "retro" || conceptTheme === "concept-b";
  const isPopArt = conceptTheme === "popart" || conceptTheme === "concept-c";
  const isEarth = conceptTheme === "earth" || conceptTheme === "concept-d";
  const isMetro = conceptTheme === "metro" || conceptTheme === "concept-e";
  const isManga = conceptTheme === "manga" || conceptTheme === "concept-f";
  const isCircus = conceptTheme === "circus" || conceptTheme === "concept-g";
  const isLuxury = conceptTheme === "luxury" || conceptTheme === "coquette" || conceptTheme === "concept-a";

  const modalBg = isManga
    ? "bg-[#FFFDF7] border-4 border-black text-black shadow-[10px_10px_0px_#D7263D] rounded-none font-sans"
    : isCircus
    ? "bg-[#FFFDD0] border-4 border-[#C41E3A] text-[#3D0C11] shadow-[10px_10px_0px_#FFD54F] rounded-3xl"
    : isMetro
    ? "bg-[#08142C] border-4 border-[#FFD100] text-[#F8F6F0] shadow-[10px_10px_0px_#D71920] rounded-2xl"
    : isRetro
    ? "bg-[#FFF9EC] border-4 border-black shadow-[8px_8px_0px_#000] rounded-2xl"
    : isPopArt
    ? "bg-[#FFFDF7] border-4 border-black shadow-[8px_8px_0px_#FF007F] rounded-2xl"
    : isEarth
    ? "bg-[#FDFBF7] border-2 border-[#5E6B4E]/30 shadow-2xl rounded-3xl"
    : isLuxury
    ? "bg-[#13151A] border-2 border-[#C5A059]/50 text-[#F7F5F0] shadow-[0_10px_40px_rgba(197,160,89,0.2)] rounded-2xl font-sans"
    : "bg-[#13151A] border-2 border-[#C5A059]/50 text-[#F7F5F0] shadow-2xl rounded-2xl font-sans";

  const btnBg = isManga
    ? "bg-[#D7263D] hover:bg-[#b51f33] text-white border-2 border-black font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_#000]"
    : isCircus
    ? "bg-[#C41E3A] hover:bg-[#A3162C] text-white border-2 border-[#FFD54F] font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_#FFD54F] rounded-full"
    : isMetro
    ? "bg-[#D71920] hover:bg-[#B3141A] text-white border-2 border-[#FFD100] font-mono uppercase shadow-[4px_4px_0px_#000] font-bold rounded-xl"
    : isRetro
    ? "bg-[#FF2A55] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none"
    : isPopArt
    ? "bg-[#FFE600] text-black border-2 border-black font-black uppercase shadow-[4px_4px_0px_#000] hover:bg-[#FF007F] hover:text-white"
    : isEarth
    ? "bg-[#5E6B4E] hover:bg-[#4E5B3F] text-white rounded-full font-serif shadow-md"
    : isLuxury
    ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A0B0E] font-bold tracking-widest uppercase text-xs rounded-xl shadow-lg shadow-[#C5A059]/20 hover:brightness-110"
    : "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A0B0E] font-bold tracking-widest uppercase text-xs rounded-xl shadow-lg shadow-[#C5A059]/20 hover:brightness-110";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCustomization}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative z-10 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden ${modalBg}`}
        >
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex items-start justify-between">
            <div className="pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold opacity-60">
                  {customizingItem.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  ★ Small Batch Pantry
                </span>
              </div>
              <h2 className="text-xl font-bold font-serif text-[#2B2118] mt-0.5">
                {customizingItem.name}
              </h2>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {customizingItem.description}
              </p>
            </div>
            <button
              onClick={closeCustomization}
              className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Pack Size & Bundle Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                  <span>📦</span> Select Pack Size / Bundle
                </label>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Bundle & Save up to 15%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPackVariant("single")}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-between gap-1 ${
                    packVariant === "single"
                      ? "border-black bg-black/5 ring-2 ring-black font-bold shadow-sm"
                      : "border-black/15 bg-white/70 hover:border-black/30"
                  }`}
                >
                  <span className="text-xs font-bold">Single Unit</span>
                  <span className="text-[11px] text-gray-500">1x Standard Pack</span>
                  <span className="text-xs font-black text-gray-900">{api.formatPrice(customizingItem.price)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackVariant("bundle3")}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-between gap-1 relative overflow-hidden ${
                    packVariant === "bundle3"
                      ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600 font-bold shadow-sm"
                      : "border-black/15 bg-white/70 hover:border-black/30"
                  }`}
                >
                  <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded-bl font-black">
                    SAVE 10%
                  </span>
                  <span className="text-xs font-bold text-emerald-950">3-Pack Bundle</span>
                  <span className="text-[11px] text-gray-500">Popular Choice</span>
                  <span className="text-xs font-black text-emerald-700">
                    {api.formatPrice(Math.round(customizingItem.price * 3 * 0.9))}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackVariant("bundle6")}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-between gap-1 relative overflow-hidden ${
                    packVariant === "bundle6"
                      ? "border-rose-600 bg-rose-50 ring-2 ring-rose-600 font-bold shadow-sm"
                      : "border-black/15 bg-white/70 hover:border-black/30"
                  }`}
                >
                  <span className="absolute top-0 right-0 bg-rose-600 text-white text-[9px] px-1.5 py-0.2 rounded-bl font-black">
                    SAVE 15%
                  </span>
                  <span className="text-xs font-bold text-rose-950">6-Pack Pantry Box</span>
                  <span className="text-[11px] text-gray-500">Best Value</span>
                  <span className="text-xs font-black text-rose-700">
                    {api.formatPrice(Math.round(customizingItem.price * 6 * 0.85))}
                  </span>
                </button>
              </div>
            </div>

            {/* Pantry Freshness Guarantee Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 px-3 rounded-xl bg-black/[0.03] border border-black/10 text-[10px] text-gray-600">
              <span className="flex items-center gap-1 font-medium">
                <span>🌿</span> 100% Artisan
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span>📦</span> Vacuum Sealed
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span>❄️</span> Climate-Safe
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span>🚫</span> Zero Artificials
              </span>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-gray-500">
                <Sparkles className="w-6 h-6 animate-spin text-[#E07A86]" />
                <span className="text-sm">Loading product options...</span>
              </div>
            ) : groups.length === 0 ? null : (
              groups.map((group) => {
                const currentSelected = selectedOptions[group.id] || [];
                return (
                  <div key={group.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold tracking-wide uppercase text-gray-800">
                        {group.title}
                        {group.is_required == 1 && (
                          <span className="text-rose-500 text-xs ml-1 font-semibold">*Required</span>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {group.type === "single" ? "Choose 1" : "Optional"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {(group.options || []).map((opt: any) => {
                        const isChecked = currentSelected.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleToggleOption(group, opt.id)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                              isChecked
                                ? isRetro
                                  ? "bg-[#FFE15D] border-2 border-black shadow-[2px_2px_0px_#000]"
                                  : isLuxury
                                  ? "bg-stone-200/70 border-[#2B2118]"
                                  : "bg-rose-50 border-[#E07A86] text-rose-950 font-medium"
                                : "bg-white/80 border-black/10 hover:border-black/30 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                                  group.type === "single" ? "rounded-full" : "rounded-md"
                                } ${
                                  isChecked
                                    ? isRetro
                                      ? "bg-black border-black text-white"
                                      : "bg-[#E07A86] border-[#E07A86] text-white"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className="text-sm">{opt.name}</span>
                            </div>
                            <span className="text-xs font-semibold">
                              {Number(opt.price_delta) > 0 ? `+₹${opt.price_delta}` : "Free"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}

            {/* Gift Message / Special Packing Instructions */}
            <div className="space-y-2 pt-2 border-t border-black/10">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <span>🎁</span> Gift Message or Packing Instructions (Optional)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Include handwritten gift card 'Happy Anniversary!', fragile handle with care..."
                rows={2}
                className="w-full text-sm p-3 rounded-xl border border-black/15 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
              />
            </div>
          </div>

          {/* Footer with Dynamic Total & Add Button */}
          <div className="p-4 sm:p-6 border-t border-black/10 bg-black/[0.02] flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider block">Custom Total</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#2B2118]">
                {api.formatPrice(calculatedTotal)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={adding}
              className={`px-6 py-3.5 font-bold text-sm flex items-center gap-2 transition ${btnBg} disabled:opacity-50`}
            >
              <Plus className="w-4 h-4" />
              <span>{adding ? "Adding..." : "Add to Cart"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
