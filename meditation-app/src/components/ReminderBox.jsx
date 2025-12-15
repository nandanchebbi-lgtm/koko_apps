import React from "react";

export default function ReminderBox({ elapsedTime }) {
  const safeElapsed = Number(elapsedTime) || 0;

  // FIX: progress based on 60 seconds, not 600!
  const progress = Math.min((safeElapsed / 60) * 100, 100);

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
      <h3>Progress</h3>

      <div
        style={{
          width: "100%",
          height: 20,
          backgroundColor: "#ddd",
          borderRadius: 15,
          overflow: "hidden",
          marginTop: 10,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#e25b45",
            transition: "width 0.5s ease",
          }}
        ></div>
      </div>

      <p style={{ marginTop: 10, fontSize: 16 }}>
        {Math.floor(progress)}% completed
      </p>
    </div>
  );
}