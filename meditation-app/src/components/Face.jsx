// Face.jsx
import React from "react";
import "./face.css";

export default function BreathingFace({ phase, elapsedTime, isStopped, mode }) {
  // ------------------------------------------------------
  // SAFELY NORMALIZE TIME
  // ------------------------------------------------------
  const safeElapsed = (() => {
    const n = Number(elapsedTime);
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.min(n, 3600); // clamp to 1 hour
  })();

  const minutes = Math.floor(safeElapsed / 60);

  const showIdle = phase === "idle" && !isStopped;
  const showBreathing = phase !== "idle" && !isStopped;
  const showFeedback = isStopped;

  // ------------------------------------------------------
  // PROGRESS RING
  // ------------------------------------------------------
  const svgSize = 345;
  const strokeWidth = 14;
  const radius = svgSize / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const totalSessionTime = 10 * 60; // 10 minutes
  const progressFraction = Math.min(safeElapsed / totalSessionTime, 1);
  const strokeDashoffset = circumference * (1 - progressFraction);

  // ------------------------------------------------------
  // FEEDBACK LOGIC
  // ------------------------------------------------------
  let benefit = "Start breathing to see benefits";
  if (minutes >= 1 && minutes < 3) benefit = "✔ Reduced stress and calmer mind";
  else if (minutes >= 3 && minutes < 5) benefit = "✔ Heart rate stabilizing\n✔ Improved oxygen flow";
  else if (minutes >= 5 && minutes < 10) benefit = "✔ Deep relaxation\n✔ Reduced cortisol levels";
  else if (minutes >= 10)
    benefit = "✔ Full session complete!\n✔ Nervous system reset\n✔ Improved emotional balance";

  // ------------------------------------------------------
  // INSTRUCTIONS FOR ALL MODES
  // ------------------------------------------------------
  const getInstruction = () => {
    if (isStopped) return "";
    if (!phase || phase === "idle") return "Say 'Start' to begin";

    switch (phase) {
      // Deep Breathing
      case "inhale-deep":
        return "Deep Inhale";
      case "hold-deep":
        return "Hold Deep";
      case "exhale-deep":
        return "Exhale Deep";

      // Box Breathing
      case "inhale-box":
        return "Box Inhale";
      case "hold-box":
        return "Box Hold";
      case "exhale-box":
        return "Box Exhale";

      // 4-7-8 Breathing
      case "inhale-478":
        return "4-7-8 Inhale";
      case "hold-478":
        return "4-7-8 Hold";
      case "exhale-478":
        return "4-7-8 Exhale";

      // Nadi Shodhana
      case "inhale-left":
        return "Breathe In Left";
      case "hold-left":
        return "Hold Left";
      case "inhale-right":
        return "Breathe In Right";
      case "hold-right":
        return "Hold Right";
      case "hold": // fallback if side not included
        return "Hold";
      case "exhale-left":
        return "Breathe Out Left";
      case "exhale-right":
        return "Breathe Out Right";

      default:
        return "";
    }
  };

  return (
    <div className="face">
      <div className="inner-circle">
        {/* ----------- PROGRESS RING ----------- */}
        <svg className="progress-ring" width={svgSize} height={svgSize}>
          <circle
            className="progress-ring-bg"
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
          />
          <circle
            className="progress-ring-bar"
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: "stroke-dashoffset 0.2s linear",
            }}
          />
        </svg>

        {/* ----------- IDLE EYES ----------- */}
        {showIdle && (
          <>
            <div className="eye left"></div>
            <div className="eye right"></div>
          </>
        )}

        {/* ----------- BREATHING UI ----------- */}
        {showBreathing && (
          <div className="breath-ui active">
            <div className="breath-text">{getInstruction()}</div>
          </div>
        )}

        {/* ----------- FEEDBACK ----------- */}
        {showFeedback && (
          <div className="feedback-ui">
            <h2>Great Job!</h2>
            <p>
              You spent {minutes} min {safeElapsed % 60}s breathing.
            </p>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 16, marginTop: 10 }}>
              {benefit}
            </pre>
          </div>
        )}
      </div>

      {/* ---- INSTRUCTIONS BELOW FACE ---- */}
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
    </div>
  );
}