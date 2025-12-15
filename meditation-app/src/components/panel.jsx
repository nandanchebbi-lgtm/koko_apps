import React from "react";
import "./panel.css";

export default function Panel({
  layout,
  mode,
  selectMode,
  onStartBreathing,
  onStopBreathing,
  onReset,
  isStopped,
  voiceRef,
}) {
  const modes = [
    { id: "deep", label: "Deep" },
    { id: "box", label: "Box" },
    { id: "478", label: "4-7-8" },
    { id: "nadi", label: "Nadi" },
  ];

  return (
    <div className={`panel-${layout}`}>
      {layout === "left" &&
        modes.map((m) => (
          <button
            key={m.id}
            className={`mode-button ${mode === m.id ? "active" : ""}`}
            onClick={() => selectMode && selectMode(m.id)}
          >
            {m.label}
          </button>
        ))}

      {layout === "right" && (
        <>
          <button className="panel-btn" onClick={onStartBreathing}>
            Start
          </button>
          <button className="panel-btn" onClick={onStopBreathing}>
            Stop
          </button>
          <button className="panel-btn" onClick={onReset} disabled={!isStopped}>
            Reset
          </button>
          <button
            className="panel-btn"
            onClick={() => voiceRef?.current?.enableMic?.()}
          >
            Mic
          </button>
        </>
      )}
    </div>
  );
}