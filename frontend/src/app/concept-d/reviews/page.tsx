"use client";

import React, { useEffect, useState } from "react";
import { Star, Leaf, CheckCircle2 } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptDReviewsPage() {
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
        concept_source: "Concept D - Organic Earth",
      });
      if (res.success) {
        setSubmitted(true);
        showToast("Impression submitted with gratitude.", "success");
        setName("");
        setEmail("");
        setDish("");
        setText("");
      } else {
        showToast(res.error || "Failed to submit impression", "error");
      }
    } catch {
      showToast("Unable to record impression.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Banner */}
      <section className="bg-[#F2EFE9] py-16 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Conservatory Impressions
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          Patron Notes &amp; Reviews
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-md mx-auto font-light leading-relaxed">
          Reflections from diners who have shared bread, wine, and conversation in our greenhouse.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-16">
        {/* Submit Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#5E6B4E]/25 p-8 sm:p-10 shadow-lg">
          <h2 className="text-2xl font-normal text-[#1E3F20] mb-2">
            Leave a Dining Impression
          </h2>
          <p className="text-xs text-[#5E6B4E] mb-6">
            Share thoughts on your table experience, sourdough crust, or garden ambiance.
          </p>

          {submitted ? (
            <div className="bg-[#F2EFE9] rounded-2xl p-6 text-center space-y-2">
              <span className="text-3xl">🌿</span>
              <h3 className="text-base font-medium text-[#1E3F20]">With Sincere Gratitude</h3>
              <p className="text-xs text-[#5E6B4E]">Your review has been preserved in our dining journal.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs uppercase text-[#C86D51] font-sans hover:underline"
              >
                Submit Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Margaret Atwood"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="margaret@earth.com"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Rating *
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  >
                    <option value={5}>5 Stars - Exquisite &amp; Grounding</option>
                    <option value={4}>4 Stars - Lovely Experience</option>
                    <option value={3}>3 Stars - Satisfying</option>
                    <option value={2}>2 Stars - Modest</option>
                    <option value={1}>1 Star - Disappointed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Favorite Harvest Dish
                  </label>
                  <input
                    type="text"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="e.g. Heirloom Peach Burrata"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                  Your Note *
                </label>
                <textarea
                  rows={3}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="The sourdough was exceptionally digestible and the garden seating felt peaceful..."
                  className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest py-3.5 rounded-full transition-all shadow-md"
              >
                {submitting ? "Preserving..." : "Submit Impression &rarr;"}
              </button>
            </form>
          )}
        </div>

        {/* Reviews Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="bg-white rounded-2xl border border-[#5E6B4E]/20 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-1 text-[#C86D51]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (rev.rating || 5) ? "fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {rev.dish_recommended && (
                  <span className="text-[10px] text-[#7B8E78] uppercase tracking-wider block">
                    Recommended: {rev.dish_recommended}
                  </span>
                )}
                <p className="text-xs text-[#5E6B4E] leading-relaxed font-light">
                  &ldquo;{rev.comment || rev.review_text || "A calm and deeply thoughtful culinary journey."}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#5E6B4E]/15 flex items-center justify-between text-xs">
                <span className="font-medium text-[#1E3F20]">
                  {rev.customer_name || "Diner"}
                </span>
                <span className="text-[10px] text-[#7B8E78] font-sans">
                  {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : "Verified Guest"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ConceptDFooter />
    </div>
  );
}
