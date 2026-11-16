"use client";

import React, { useEffect, useState } from "react";
import { Star, Sparkles, Send, CheckCircle2 } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptAReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [dish, setDish] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { showToast } = useToast();

  const fetchReviews = () => {
    api
      .getReviews(30)
      .then((res) => {
        if (res.success && Array.isArray(res.reviews)) {
          setReviews(res.reviews);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;
    setSubmitting(true);
    try {
      const res = await api.submitReview({
        customer_name: name,
        customer_email: email,
        rating,
        dish_recommended: dish || "Single-Estate 85% Dark Cacao",
        review_text: text,
        concept_source: "Concept A — Maison Reserve Provisions",
      });
      if (res.success) {
        setSubmitted(true);
        showToast("Tasting note submitted to the Reserve archive. ✦", "success");
        setName("");
        setEmail("");
        setDish("");
        setText("");
        fetchReviews();
      }
    } catch {
      showToast("Unable to record tasting note right now.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-12 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block">
            ✦ Sommelier Tasting Notes &bull; Connoisseur Endorsements
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F7F5F0] tracking-tight">
            Client Tasting Notes &amp; Reviews
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-md mx-auto font-light">
            Real evaluations from chocolate collectors, chefs, and pantry connoisseurs who experience Maison Reserve across India.
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <div className="p-8 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-xl space-y-6 sticky top-28">
              <h3 className="font-serif font-bold text-xl text-[#F7F5F0]">
                Record a Tasting Note
              </h3>

              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#C5A059] mx-auto" />
                  <h4 className="font-serif font-bold text-base text-[#F7F5F0]">
                    Tasting Note Archived
                  </h4>
                  <p className="text-xs text-[#A89F91]">
                    Thank you for detailing your sensory experience with our provisions.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#C5A059] font-mono underline"
                  >
                    Submit another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Laurent V."
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="laurent@chocolat.fr"
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-lg transition ${
                            star <= rating ? "text-[#D4AF37]" : "text-gray-600"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Provision Evaluated
                    </label>
                    <input
                      type="text"
                      value={dish}
                      onChange={(e) => setDish(e.target.value)}
                      placeholder="e.g. Single-Estate 85% Dark Cacao"
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Sensory Impressions *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Describe the snap, mouthfeel, aroma profile, and finish..."
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition disabled:opacity-50"
                  >
                    {submitting ? "Archiving..." : "Archive Tasting Note ✦"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Reviews Stream */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-32 bg-[#13151A] rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-20 bg-[#13151A] rounded-2xl border border-[#C5A059]/30">
                <span className="text-3xl text-[#C5A059]">✦</span>
                <p className="text-xs text-[#A89F91] mt-2">No tasting notes recorded yet. Be the first to share.</p>
              </div>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-6 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 space-y-3 hover:border-[#C5A059] transition shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#F7F5F0]">{r.customer_name}</h4>
                      <span className="text-[11px] text-[#A89F91] font-mono">
                        Evaluated: {r.dish_recommended || "Maison Reserve Provision"}
                      </span>
                    </div>
                    <div className="flex text-[#D4AF37] text-xs">
                      {"★".repeat(Number(r.rating) || 5)}
                    </div>
                  </div>
                  <p className="text-xs text-[#D1C7BD] leading-relaxed italic font-serif">
                    &ldquo;{r.review_text}&rdquo;
                  </p>
                  <div className="text-[10px] text-gray-500 font-mono">
                    ✦ Verified Connoisseur Batch
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
