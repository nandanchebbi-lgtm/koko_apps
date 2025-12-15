import React from "react";

export default function FeedbackBox({ elapsedTime }) {
  const safeElapsed = Number(elapsedTime) || 0;
  const minutes = Math.floor(safeElapsed / 60);

  let benefit = "Start breathing to see benefits";

  if (minutes >= 1 && minutes < 3) {
    benefit = "✔ Reduced stress and calmer mind";
  } else if (minutes >= 3 && minutes < 5) {
    benefit = "✔ Heart rate stabilizing\n✔ Improved oxygen flow";
  } else if (minutes >= 5 && minutes < 10) {
    benefit = "✔ Deep relaxation\n✔ Reduced cortisol levels";
  } else if (minutes >= 10) {
    benefit = "✔ Full session complete!\n✔ Nervous system reset\n✔ Improved emotional balance";
  }

  return (
    <div
      style={{
        width: 300,
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        color: "#333",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      }}
    >
      <h3>Session Time</h3>

      <p style={{ fontSize: 22, fontWeight: "bold" }}>
        {minutes} min {safeElapsed % 60}s
      </p>

      <h4>Benefits</h4>
      <pre style={{ whiteSpace: "pre-wrap", fontSize: 16 }}>{benefit}</pre>
    </div>
  );
}