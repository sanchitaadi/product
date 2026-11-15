"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playPop: () => void;
  playCoin: () => void;
  playBoing: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playPop: () => {},
  playCoin: () => {},
  playBoing: () => {},
  playClick: () => {},
});

export const useRetroSound = () => useContext(SoundContext);

export default function RetroSoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Check saved preference (defaults to false / muted)
    const saved = localStorage.getItem("peachy_retro_sound");
    if (saved === "true") {
      setSoundEnabled(true);
    }
  }, []);

  const getAudioContext = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (audioCtx) {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      return audioCtx;
    }
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return null;
    const ctx = new AudioCtxClass();
    setAudioCtx(ctx);
    return ctx;
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    localStorage.setItem("peachy_retro_sound", nextState ? "true" : "false");
    if (nextState) {
      const ctx = getAudioContext();
      if (ctx) {
        playCoinSynth(ctx);
      }
    }
  };

  // 8-bit Pop Synthesizer
  const playPopSynth = (ctx: AudioContext) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // AudioContext blocked
    }
  };

  // 8-bit Retro Coin Synthesizer (Add to cart / success)
  const playCoinSynth = (ctx: AudioContext) => {
    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "square";
      osc2.type = "square";

      osc1.frequency.setValueAtTime(987.77, now); // B5
      osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.setValueAtTime(0.12, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.35);
    } catch {
      // ignore
    }
  };

  // 8-bit Boing / Spring Synthesizer
  const playBoingSynth = (ctx: AudioContext) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // ignore
    }
  };

  // Arcade Click Synthesizer
  const playClickSynth = (ctx: AudioContext) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // ignore
    }
  };

  const playPop = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (ctx) playPopSynth(ctx);
  };

  const playCoin = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (ctx) playCoinSynth(ctx);
  };

  const playBoing = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (ctx) playBoingSynth(ctx);
  };

  const playClick = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (ctx) playClickSynth(ctx);
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playPop,
        playCoin,
        playBoing,
        playClick,
      }}
    >
      {children}

      {/* Floating Retro Sound Toggle Button */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          onClick={toggleSound}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-black font-retro-bold font-black text-[11px] uppercase tracking-wider shadow-[3px_3px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all ${
            soundEnabled
              ? "bg-[#FFE15D] text-black hover:bg-[#FFD600]"
              : "bg-white text-stone-700 hover:bg-stone-100"
          }`}
          title={soundEnabled ? "Mute Retro Sounds" : "Enable 8-Bit Retro Sounds"}
          aria-label="Toggle retro arcade sound effects"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-[#FF2A55] animate-bounce" />
              <span>SFX: ON 👾</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-400" />
              <span>SFX: OFF</span>
            </>
          )}
        </button>
      </div>
    </SoundContext.Provider>
  );
}
