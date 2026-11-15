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
        dish_recommended: dish,
        review_text: text,
        concept_source: "Concept A — Coquette Pinterest",
      });
      if (res.success) {
        setSubmitted(true);
        showToast("Review submitted! Thank you for the love 💖", "success");
        setName("");
        setEmail("");
        setDish("");
        setText("");
      }
    } catch {
      showToast("Unable to post review right now.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block">
            🎀 Patron Love Letters
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Whispers & Memories
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Authentic impressions from our dining community in New Delhi.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Reviews List (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-coquette-serif font-bold text-xl text-[#3D2D2E]">
              Recent Guest Impressions
            </h2>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-32 bg-white rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl text-gray-400 text-xs">
                Be the first to pen a love note!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-3xl bg-white border border-rose-100 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex text-amber-400 text-xs mb-2">
                        {"★".repeat(Number(rev.rating) || 5)}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed italic">
                        &ldquo;{rev.review_text}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-rose-50 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-gray-900 block">{rev.customer_name}</span>
                        {rev.dish_recommended && (
                          <span className="text-rose-500 font-medium">Loved {rev.dish_recommended}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Review Card (1 col) */}
          <div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-4 sticky top-28">
              <span className="text-[10px] uppercase font-bold text-[#E07A86] tracking-wider block">
                Pen a Love Letter
              </span>
              <h3 className="font-coquette-serif font-bold text-xl text-[#3D2D2E]">
                Share Your Experience
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-950">Thank You, Sweet Patron!</h4>
                  <p className="text-xs text-emerald-800">
                    Your impression has been submitted to our moderation queue.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#E07A86] font-bold underline mt-2 block mx-auto"
                  >
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Simran M."
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Star Rating</label>
                    <div className="flex gap-2 text-xl text-amber-400 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className={s <= rating ? "opacity-100" : "opacity-30"}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Dish You Ordered</label>
                    <input
                      type="text"
                      value={dish}
                      onChange={(e) => setDish(e.target.value)}
                      placeholder="e.g. Pink Sauce Pasta"
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Your Note *</label>
                    <textarea
                      required
                      rows={3}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Describe the textures, atmosphere, packaging..."
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold uppercase tracking-wider text-xs shadow-md hover:opacity-95 disabled:opacity-50 transition"
                  >
                    {submitting ? "Posting..." : "Send Love Note 🎀"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
