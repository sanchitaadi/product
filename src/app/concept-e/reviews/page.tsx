"use client";

import React, { useEffect, useState } from "react";
import { Star, Train, CheckCircle2, Ticket, MessageSquare } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptEReviewsPage() {
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
        concept_source: "Concept E - Metro Bites",
      });
      if (res.success) {
        setSubmitted(true);
        showToast("Commuter travel log logged on station records!", "success");
        setName("");
        setEmail("");
        setDish("");
        setText("");
      } else {
        showToast(res.error || "Failed to submit travel log", "error");
      }
    } catch {
      showToast("Unable to record log entry.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Signboard Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <MessageSquare className="w-3.5 h-3.5 text-[#D71920]" />
            COMMUTER LOGBOOK &bull; PASSENGER TESTIMONIALS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Passenger Travel Logs
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            Unfiltered notes from daily commuters and first-class travelers journeying with Peachy Plate Metro Bites.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-16">
        {/* Review Form */}
        <div className="max-w-3xl mx-auto bg-[#0D1F42] border-4 border-[#FFD100] rounded-2xl p-8 sm:p-12 shadow-[8px_8px_0px_#D71920]">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-[#334155]">
            <Train className="w-5 h-5 text-[#FFD100]" />
            <h2 className="text-xl font-black uppercase tracking-wider text-white">
              Log Your Commuter Journey
            </h2>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3 font-mono">
              <CheckCircle2 className="w-12 h-12 text-[#4ADE80] mx-auto" />
              <h3 className="text-xl font-black uppercase text-white">Travel Entry Recorded!</h3>
              <p className="text-xs text-[#94A3B8]">
                Thank you for contributing to the Platform 01 passenger archives.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#FFD100] underline uppercase font-bold"
              >
                Log another journey entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Passenger Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Iyer"
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Transit Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="commuter@delhimetro.org"
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Rating (Stars)
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
                            s <= rating ? "text-[#FFD100] fill-[#FFD100]" : "text-[#334155]"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#FFD100] font-black ml-2">
                      {rating} / 5 STARS
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Favorite Station Dish Recommended
                  </label>
                  <input
                    type="text"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="e.g. Locomotive Sourdough Hearth Pizza"
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                  Commuter Review / Travel Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your experience regarding food temperature, carriage ambiance, arrival speed, and flavor balance..."
                  className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest py-4 rounded border-2 border-[#FFD100] shadow-[4px_4px_0px_#FFD100] transition-all disabled:opacity-50"
              >
                {submitting ? "STAMPING TRAVEL LOG..." : "RECORD COMMUTER TRAVEL LOG &rarr;"}
              </button>
            </form>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#334155] pb-4">
            <span className="text-xs font-mono font-bold uppercase text-[#FFD100]">
              VERIFIED PASSENGER LOGS ({reviews.length})
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center font-mono text-sm text-[#94A3B8]">
              LOADING PASSENGER LOGS...
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center font-mono text-sm text-[#94A3B8]">
              No logs filed yet. Be the first commuter to leave a review!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-6 bg-[#0D1F42] rounded-xl border-2 border-[#334155] hover:border-[#FFD100] transition-colors space-y-4 shadow font-mono text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (r.rating || 5)
                              ? "text-[#FFD100] fill-[#FFD100]"
                              : "text-[#334155]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#94A3B8]">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : "RECENT COMMUTE"}
                    </span>
                  </div>

                  <p className="text-[#F8F6F0] leading-relaxed italic">
                    &ldquo;{r.review_text}&rdquo;
                  </p>

                  <div className="border-t border-[#334155] pt-3 flex items-center justify-between">
                    <span className="font-bold text-white uppercase">{r.customer_name}</span>
                    {r.dish_recommended && (
                      <span className="px-2 py-0.5 bg-[#FFD100] text-[#08142C] text-[9px] font-black rounded uppercase">
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

      <ConceptEFooter />
    </div>
  );
}
