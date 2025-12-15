import { useEffect, useRef } from "react";

/**
 * BreathingVoice.jsx
 *
 * Speaks short phase instructions using Web Speech API.
 * Accepts:
 *  - phase (string)
 *  - mode (string)
 *
 * It normalizes the phase + mode to a single short instruction string,
 * and tracks the last spoken instruction to avoid duplicates.
 */

export default function BreathingVoice({ phase, mode = "deep" }) {
  const lastInstructionRef = useRef(null);

  // helper: same normalization logic as Instructions.jsx (keeps them consistent)
  const computeInstruction = (phaseVal, modeVal) => {
    if (!phaseVal || phaseVal === "idle") return null;

    const p = String(phaseVal);
    const side = p.includes("left") ? "left" : p.includes("right") ? "right" : null;

    const basePhase = (() => {
      if (p.startsWith("inhale")) return "inhale";
      if (p.startsWith("exhale")) return "exhale";
      if (p.startsWith("hold")) return "hold";
      return p;
    })();

    if (modeVal === "nadi") {
      if (basePhase === "inhale") return side === "right" ? "Breathe In Right" : "Breathe In Left";
      if (basePhase === "hold") return side === "right" ? "Hold Right" : "Hold Left";
      if (basePhase === "exhale") return side === "right" ? "Breathe Out Right" : "Breathe Out Left";
      return null;
    } else {
      const prefix = modeVal === "deep" ? "Deep" : modeVal === "box" ? "Box" : modeVal === "478" ? "4-7-8" : "";

      if (basePhase === "inhale") return prefix ? `${prefix} Inhale` : "Breathe In";
      if (basePhase === "hold") return prefix ? `${prefix} Hold` : "Hold";
      if (basePhase === "exhale") return prefix ? `${prefix} Exhale` : "Breathe Out";
      return null;
    }
  };

  useEffect(() => {
    const instruction = computeInstruction(phase, mode);

    if (!instruction) return;
    if (instruction === lastInstructionRef.current) return;

    // build utterance
    const utter = new SpeechSynthesisUtterance();
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.volume = 1;
    utter.text = instruction;

    // update last
    lastInstructionRef.current = instruction;

    // cancel previous and speak
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (e) {
      // some browsers may throw if speech is not available; ignore
      // console.warn("SpeechSynthesis error:", e);
    }
  }, [phase, mode]);

  return null;
}