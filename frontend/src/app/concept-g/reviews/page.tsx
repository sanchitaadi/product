"use client";

import React, { useEffect, useState } from "react";
import { Star, Ticket, CheckCircle2, MessageSquare } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptGReviewsPage() {
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
        concept_source: "Concept G - Circus Social",
      });
      if (res.success) {
        setSubmitted(true);
        showToast("Spectator praise logged on fairground records!", "success");
        setName("");
        setEmail("");
        setDish("");
        setText("");
      } else {
        showToast(res.error || "Failed to submit review", "error");
      }
    } catch {
      showToast("Unable to record review.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Star className="w-3.5 h-3.5 fill-[#5C0614]" />
            SPECTATOR LOG &bull; CARNIVAL PRAISE ARCHIVES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Spectator Reviews
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Read unfiltered impressions and applause from guests who have witnessed the culinary circus in action.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-16">
        {/* Form Box */}
        <div className="max-w-3xl mx-auto bg-white border-4 border-[#C41E3A] rounded-3xl p-8 sm:p-12 shadow-[10px_10px_0px_#5C0614]">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-[#5C0614]/20">
            <Ticket className="w-5 h-5 text-[#C41E3A]" />
            <h2 className="text-xl font-black uppercase tracking-wider text-[#5C0614] font-serif">
              Submit Your Spectator Praise
            </h2>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
              <h3 className="text-xl font-black uppercase text-[#5C0614] font-serif">Review Cataloged!</h3>
              <p className="text-xs text-[#5C0614]/80 font-medium">
                Thank you for contributing to the Big Top spectator praise archives.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#C41E3A] underline uppercase font-black"
              >
                Log another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-bold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Spectator Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Iyer"
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>

                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Contact Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="spectator@circus.org"
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Circus Rating (Stars)
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="p-1 text-2xl transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= rating ? "text-[#FFD54F] fill-[#FFD54F]" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#5C0614] font-black ml-2 font-mono">
                      {rating} / 5 STARS
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Favorite Carnival Dish Recommended
                  </label>
                  <input
                    type="text"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="e.g. Margherita Fire Dome Hearth"
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5C0614] uppercase mb-1">
                  Spectator Review / Show Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us about the big top atmosphere, flame heat, dough texture, and overall wonder..."
                  className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest py-4 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-all disabled:opacity-50"
              >
                {submitting ? "RECORDING PRAISE..." : "TRANSMIT SPECTATOR REVIEW &rarr;"}
              </button>
            </form>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#5C0614]/20 pb-4">
            <span className="text-xs font-black uppercase text-[#5C0614] font-mono">
              VERIFIED SPECTATOR PRAISE ({reviews.length})
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center font-mono text-sm text-[#5C0614]/70 font-bold">
              GATHERING SPECTATOR NOTES...
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center font-mono text-sm text-[#5C0614]/70 font-bold">
              No spectator praise logged yet. Be the first guest to share your review!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-6 bg-white border-4 border-[#C41E3A] rounded-3xl hover:shadow-[6px_6px_0px_#FFD54F] transition-all space-y-4 shadow-[3px_3px_0px_#5C0614] text-xs font-bold"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (r.rating || 5)
                              ? "text-[#FFD54F] fill-[#FFD54F]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : "RECENT ACT"}
                    </span>
                  </div>

                  <p className="text-[#5C0614] leading-relaxed italic">
                    &ldquo;{r.review_text}&rdquo;
                  </p>

                  <div className="border-t-2 border-[#5C0614]/10 pt-3 flex items-center justify-between">
                    <span className="font-black text-[#5C0614] font-serif uppercase">{r.customer_name}</span>
                    {r.dish_recommended && (
                      <span className="px-2.5 py-0.5 bg-[#FFD54F] text-[#5C0614] text-[9px] font-black rounded-full border border-[#5C0614] uppercase">
                        {r.dish_recommended}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ConceptGFooter />
    </div>
  );
}
