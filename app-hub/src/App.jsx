import React from "react";

const apps = [
  {
    name: "Meditation App",
    url: "http://localhost:5174",  // Local Vite meditation app
    icon: "/icons/meditation.png"
  },
  {
    name: "Music Therapy App",
    url: "http://localhost:3000",  // Local CRA music therapy app
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
          target="_blank"      // Opens each app in a new tab
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