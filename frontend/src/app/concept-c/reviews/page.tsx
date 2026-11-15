"use client";

import React, { useEffect, useState } from "react";
import { Star, CheckCircle2, Zap } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptCReviewsPage() {
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

  useEffect(() => {
    api.getReviews(30).then((res) => {
      if (res.success && Array.isArray(res.reviews)) {
        setReviews(res.reviews);
      }
    }).finally(() => setLoading(false));
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
        concept_source: "Concept C - Maximalist Pop Art",
      });
      if (res.success) {
        setSubmitted(true);
        showToast("Review submitted to the Pop board!", "success");
        setName("");
        setEmail("");
        setDish("");
        setText("");
      } else {
        showToast(res.error || "Failed to submit review", "error");
      }
    } catch {
      showToast("Unable to submit review.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Banner */}
      <section className="bg-[#FFE600] text-black py-16 border-b-4 border-black text-center space-y-3 relative">
        <span className="bg-[#FF007F] text-white text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ★ POP CRITIC BOARD ★
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          CRITIC DISPATCHES &amp; REVIEWS
        </h1>
        <p className="text-sm font-bold text-black/80 max-w-md mx-auto">
          Read authentic dining stories from verified gourmands, food writers, and daily patrons.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-16">
        {/* Submit Review Card */}
        <div className="max-w-2xl mx-auto bg-white border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_#0047FF]">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
            DROP YOUR POP REVIEW
          </h2>
          <p className="text-xs font-bold text-gray-600 mb-6">
            Tell us about your culinary experience, favorite toppings, and the atmosphere.
          </p>

          {submitted ? (
            <div className="bg-[#FFE600] border-3 border-black p-6 text-center space-y-2">
              <span className="text-3xl">⭐</span>
              <h3 className="text-lg font-black uppercase">THANK YOU FOR SHARING!</h3>
              <p className="text-xs font-bold">Your review will be posted to the wall after moderation.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 bg-black text-white px-4 py-1.5 text-xs font-black uppercase"
              >
                SUBMIT ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marina Abramović"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marina@art.com"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Rating (1-5 Stars) *
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 - Incredible)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3 - Decent)</option>
                    <option value={2}>⭐⭐ (2 - Needs Work)</option>
                    <option value={1}>⭐ (1 - Disappointed)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Favorite Dish Tried
                  </label>
                  <input
                    type="text"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="e.g. Sourdough Margherita"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">
                  Your Review *
                </label>
                <textarea
                  rows={3}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="The charred crust was extraordinary and the neon dining room is super lively..."
                  className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#FF007F] hover:bg-black text-white font-black uppercase text-xs py-3.5 border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                {submitting ? "POSTING..." : "POST REVIEW &rarr;"}
              </button>
            </form>
          )}
        </div>

        {/* Reviews Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (rev.rating || 5) ? "fill-[#FFE600] text-black stroke-[2]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {rev.dish_recommended && (
                  <span className="bg-[#0047FF] text-white text-[9px] font-black uppercase px-2 py-0.5 inline-block border border-black">
                    RECOMMENDS: {rev.dish_recommended}
                  </span>
                )}
                <p className="text-xs font-bold text-gray-800 leading-relaxed">
                  &ldquo;{rev.comment || rev.review_text || "Sensational food and vibrant interior design!"}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs">
                <span className="font-black uppercase text-black">
                  {rev.customer_name || "Food Critic"}
                </span>
                <span className="font-mono text-[10px] text-gray-500">
                  {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : "Verified Diner"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ConceptCFooter />
    </div>
  );
}
