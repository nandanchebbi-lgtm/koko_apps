// Instructions.jsx
import React from "react";

/**
 * Instructions.jsx
 *
 * Accepts:
 *  - phase: string (e.g. "inhale", "hold", "exhale", "inhale-left", "inhale-deep", "exhale-478", etc.)
 *  - mode: string ("deep" | "box" | "478" | "nadi")
 *
 * This component normalizes phases and returns a user-facing instruction string
 * that is tailored to the selected mode.
 */

export default function Instructions({ phase, mode = "deep" }) {
  const getInstruction = () => {
    // Safety check
    if (!phase || phase === "idle") return "Say 'Start' to begin";

    // Normalize phase and detect side (left/right)
    const p = String(phase);
    const side = p.includes("left") ? "left" : p.includes("right") ? "right" : null;

    // Determine base phase
    const basePhase = (() => {
      if (p.startsWith("inhale")) return "inhale";
      if (p.startsWith("exhale")) return "exhale";
      if (p.startsWith("hold")) return "hold";
      return p;
    })();

    // Mode-specific instructions
    if (mode === "nadi") {
      // Nadi: left/right variations matter
      if (basePhase === "inhale") return side === "right" ? "Breathe In Right" : "Breathe In Left";
      if (basePhase === "hold") return side === "right" ? "Hold Right" : side === "left" ? "Hold Left" : "Hold"; // fallback
      if (basePhase === "exhale") return side === "right" ? "Breathe Out Right" : "Breathe Out Left";
    } else {
      // Non-nadi modes: add mode-specific prefix
      const prefix = mode === "deep" ? "Deep" : mode === "box" ? "Box" : mode === "478" ? "4-7-8" : "";

      if (basePhase === "inhale") return prefix ? `${prefix} Inhale` : "Breathe In";
      if (basePhase === "hold") return prefix ? `${prefix} Hold` : "Hold";
      if (basePhase === "exhale") return prefix ? `${prefix} Exhale` : "Breathe Out";
    }

    return ""; // fallback
  };

  return (
    <div
      style={{
        marginTop: 20,
        fontSize: 24,
        color: "#000",
        textAlign: "center",
      }}
    >
      {getInstruction()}
    </div>
  );
}