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
  const [instructions, setInstructions] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!customizingItem) return;

    setLoading(true);
    setInstructions("");
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
    let total = Number(customizingItem.price || 0);

    groups.forEach((g) => {
      const selectedIds = selectedOptions[g.id] || [];
      (g.options || []).forEach((o: any) => {
        if (selectedIds.includes(o.id)) {
          total += Number(o.price_delta || 0);
        }
      });
    });

    return total;
  }, [customizingItem, groups, selectedOptions]);

  const handleAdd = async () => {
    if (!customizingItem) return;
    setAdding(true);
    const flattenedOptionIds: number[] = [];
    Object.values(selectedOptions).forEach((ids) => flattenedOptionIds.push(...ids));

    await addToCart(customizingItem.id, 1, flattenedOptionIds, instructions);
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
  const isLuxury = conceptTheme === "luxury";

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
    ? "bg-[#FAF7F2] border border-[#2B2118]/20 shadow-2xl rounded-2xl"
    : "bg-[#FFF8F9] border border-rose-200/60 shadow-2xl rounded-3xl";

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
    ? "bg-[#2B2118] text-[#FAF7F2] hover:bg-[#3D2E22] tracking-widest uppercase text-xs"
    : "bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white shadow-lg shadow-rose-200/50 hover:opacity-95 rounded-2xl";

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
              <span className="text-xs uppercase tracking-wider font-bold opacity-60">
                {customizingItem.category}
              </span>
              <h2 className="text-xl font-bold font-serif text-[#2B2118] mt-0.5">
                Customize {customizingItem.name}
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
            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-gray-500">
                <Sparkles className="w-6 h-6 animate-spin text-[#E07A86]" />
                <span className="text-sm">Loading gourmet options...</span>
              </div>
            ) : groups.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No customization options available for this dish. You can still add special requests below!
              </div>
            ) : (
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

            {/* Special Instructions */}
            <div className="space-y-2 pt-2 border-t border-black/10">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Special Kitchen Instructions (Optional)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Extra spicy, dressing on side, allergy note..."
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
