import React from "react";
import { motion } from "framer-motion";

const apps = [
  {
    name: "Meditation App",
    url: "https://koko-apps.vercel.app/",
    icon: "/icons/meditation.svg"
  },
  {
    name: "Music Therapy App",
    url: "https://koko-apps-l2aw.vercel.app/",
    icon: "/icons/music.svg"
  }
];

function AppHub() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #fff4ec 0%, #ffe0d4 50%, #ffd4d4 100%)",
        color: "#3a1f1f",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "4rem",
          fontWeight: 800,
          marginBottom: "0.5rem",
          color: "#e25b45",
          textShadow: "0 0 20px rgba(226,91,69,0.4)",
        }}
      >
        App Hub
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          fontStyle: "italic",
          marginBottom: "3rem",
          color: "#7b4b3a",
        }}
      >
        Choose your app of choice
      </motion.p>

      {/* App Cards */}
      <div style={{ display: "flex", gap: "3rem" }}>
        {apps.map((app, index) => (
          <motion.a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
            style={{
              textDecoration: "none",
              color: "#3a1f1f",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: "rgba(255,255,255,0.6)",
                borderRadius: "1.5rem",
                padding: "2rem",
                width: "180px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "all 0.3s ease",
              }}
            >
              <img
                src={app.icon}
                alt={app.name}
                width={80}
                style={{ marginBottom: "1rem" }}
              />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                {app.name}
              </span>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default AppHub;