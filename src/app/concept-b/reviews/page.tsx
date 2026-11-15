"use client";

import React, { useEffect, useState } from "react";
import { Zap, CheckCircle2, Star, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

function ConceptBReviewsContent() {
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
  const { playCoin, playPop, playClick } = useRetroSound();

  useEffect(() => {
    api
      .getReviews(30)
      .then((res) => {
        if (res.success && Array.isArray(res.reviews)) {
          setReviews(res.reviews);
        }
      })
      .finally(() => setLoading(false));
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
        concept_source: "Concept B — Retro Gen-Z",
      });
      if (res.success) {
        setSubmitted(true);
        playCoin();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFE15D", "#FF2A55", "#000000", "#FFFFFF"],
          });
        } catch {
          // ignore
        }
        showToast("Review locked in! Thanks for the hype ⚡", "success");
        setName("");
        setEmail("");
        setDish("");
        setText("");
      }
    } catch {
      showToast("Unable to submit feedback.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      {/* Header */}
      <ConceptBHeader />

      <section className="py-12 bg-[#FFE15D] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-comic-halftone opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3 relative z-10">
          <span className="px-4 py-1.5 bg-black text-[#FFE15D] text-xs font-retro-bold font-black uppercase tracking-wider inline-block rounded-xl border-2 border-black shadow-[3px_3px_0px_#FF2A55]">
            ⚡ COMMUNITY HYPE FEED
          </span>
          <h1 className="font-retro-bold font-black text-4xl sm:text-6xl uppercase tracking-tight text-black">
            HONEST REVIEWS FROM REAL PATRONS
          </h1>
          <p className="text-xs sm:text-sm font-bold text-stone-900 max-w-md mx-auto">
            Read what food lovers across New Delhi are saying about our 48-hour pizzas, pasta and vibes.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-retro-bold font-black text-2xl uppercase">
              THE PATRON WALL ({reviews.length})
            </h2>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-32 bg-white rounded-3xl border-4 border-black animate-pulse" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border-4 border-black text-stone-600 text-xs font-bold">
                No reviews yet. Be the first to drop some hype!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-3xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#FFE15D] transition space-y-3"
                  >
                    <div>
                      <div className="flex text-amber-500 text-base mb-2 font-black">
                        {"★".repeat(Number(rev.rating) || 5)}
                      </div>
                      <p className="text-xs font-bold text-stone-800 leading-relaxed">
                        &ldquo;{rev.review_text}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t-2 border-black/15 flex items-center justify-between text-xs font-retro-bold font-black">
                      <span>{rev.customer_name}</span>
                      <span className="bg-[#FFE15D] px-2 py-0.5 rounded border border-black text-[10px]">
                        {rev.dish_recommended || "Sourdough Pizza"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Submission Form */}
          <div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_#000] space-y-4 sticky top-28">
              <span className="text-[10px] font-retro-bold font-black uppercase text-[#FF2A55] tracking-wider block">
                DROP YOUR TAKE
              </span>
              <h3 className="font-retro-bold font-black text-2xl uppercase">
                DROP A REVIEW ⚡
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#48BB78] text-white border-2 border-black text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-white mx-auto stroke-[3]" />
                  <h4 className="font-retro-bold font-black text-sm uppercase">SHOUT RECEIVED!</h4>
                  <p className="text-xs font-bold">Your review will hit the live feed shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-retro-bold font-black underline mt-2 block mx-auto uppercase"
                  >
                    Drop Another Take
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs font-retro-bold font-black">
                  <div>
                    <label className="block mb-1">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kabir S."
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">YOUR RATING</label>
                    <div className="flex gap-2 text-2xl text-amber-500 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            playClick();
                            setRating(s);
                          }}
                          className={s <= rating ? "opacity-100 scale-110 transition" : "opacity-30"}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">RECOMMENDED DISH</label>
                    <input
                      type="text"
                      value={dish}
                      onChange={(e) => setDish(e.target.value)}
                      placeholder="e.g. Pink Sauce Pasta"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">YOUR REVIEW *</label>
                    <textarea
                      rows={3}
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="How was the sourdough, flavor, and crunch?..."
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none font-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-2xl bg-[#FF2A55] text-white border-2 border-black font-retro-bold font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] disabled:opacity-50 transition"
                  >
                    {submitting ? "SUBMITTING TAKE..." : "POST REVIEW NOW ⚡"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConceptBFooter />
    </div>
  );
}

export default function ConceptBReviewsPage() {
  return (
    <RetroSoundProvider>
      <ConceptBReviewsContent />
    </RetroSoundProvider>
  );
}
