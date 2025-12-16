import React from "react";

const apps = [
  {
    name: "Meditation App",
    url: "https://koko-apps.vercel.app/",
    icon: "/icons/meditation.png"
  },
  {
    name: "Music Therapy App",
    url: "https://koko-apps-l2aw.vercel.app/",
    icon: "/icons/music.png"
  }
];

function AppHub() {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "5rem"
      }}
    >
      {apps.map((app) => (
        <a
          key={app.name}
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
            color: "black"
          }}
        >
          <img src={app.icon} alt={app.name} width={100} />
          <span>{app.name}</span>
        </a>
      ))}
    </div>
  );
}

export default AppHub;