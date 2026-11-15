"use client";

import React, { useEffect, useState } from "react";
import { Star, Zap, CheckCircle2, MessageSquare } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptFReviewsPage() {
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
        concept_source: "Concept F - Manga Bites",
      });
      if (res.success) {
        setSubmitted(true);
        showToast("Fan mail logged in Manga Bites studio records!", "success");
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
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#D7263D]" />
            FAN MAIL &bull; COMMUNITY TESTIMONIALS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Manga Fan Mail Archives
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Unfiltered feedback and praise from fellow food heroes who have dined in our comic saloon.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-16">
        {/* Review Form */}
        <div className="max-w-3xl mx-auto bg-white border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_#000]">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b-3 border-black">
            <Zap className="w-5 h-5 text-[#D7263D]" />
            <h2 className="text-xl font-black uppercase tracking-wider text-black">
              Send Your Fan Mail
            </h2>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
              <h3 className="text-xl font-black uppercase text-black">Fan Mail Published!</h3>
              <p className="text-xs text-gray-700 font-bold">
                Thank you for contributing to our serialized community archives.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#D7263D] underline uppercase font-black"
              >
                Submit another fan letter
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-bold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-black uppercase mb-1">
                    Your Name / Pen Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Iyer"
                    className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] p-3 text-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">
                    Contact Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@reader.org"
                    className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] p-3 text-black outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-black uppercase mb-1">
                    Shonen Rating (Stars)
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
                            s <= rating ? "text-[#FFE600] fill-[#FFE600]" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-black font-black ml-2 font-mono">
                      {rating} / 5 STARS
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">
                    Signature Dish Recommended
                  </label>
                  <input
                    type="text"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="e.g. Wood-Fired Margherita Supreme"
                    className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] p-3 text-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black uppercase mb-1">
                  Fan Review / Tasting Experience *
                </label>
                <textarea
                  rows={4}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us about the crunch, heat, sauce balance, and dining booth vibe..."
                  className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] p-3 text-black outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest py-4 border-3 border-black shadow-[4px_4px_0px_#FFE600] transition-all disabled:opacity-50"
              >
                {submitting ? "PRINTING LETTER..." : "SEAL & TRANSMIT FAN REVIEW &rarr;"}
              </button>
            </form>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-3 border-black pb-4">
            <span className="text-xs font-black uppercase text-black font-mono">
              VERIFIED FAN REVIEWS ({reviews.length})
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center font-mono text-sm text-gray-500 font-bold">
              LOADING FAN LETTERS...
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center font-mono text-sm text-gray-500 font-bold">
              No fan letters published yet. Be the first hero to leave a review!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-6 bg-white border-3 border-black hover:shadow-[6px_6px_0px_#D7263D] transition-all space-y-4 shadow-[3px_3px_0px_#000] text-xs font-bold"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (r.rating || 5)
                              ? "text-[#FFE600] fill-[#FFE600]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : "RECENT CHAPTER"}
                    </span>
                  </div>

                  <p className="text-gray-800 leading-relaxed italic">
                    &ldquo;{r.review_text}&rdquo;
                  </p>

                  <div className="border-t-2 border-black/10 pt-3 flex items-center justify-between">
                    <span className="font-black text-black uppercase">{r.customer_name}</span>
                    {r.dish_recommended && (
                      <span className="px-2 py-0.5 bg-[#FFE600] text-black text-[9px] font-black border border-black uppercase">
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

      <ConceptFFooter />
    </div>
  );
}
