// App.jsx
import React, { useState, useEffect, useRef } from "react";

import DeepBreathingEngine from "./components/modes/DeepBreathingEngine";
import BoxBreathingEngine from "./components/modes/BoxBreathingEngine";
import FourSevenEightEngine from "./components/modes/FourSevenEightEngine";
import NadiShodhanaEngine from "./components/modes/NadiShodhanaEngine";

import BreathingFace from "./components/Face";
import BreathingVoice from "./components/BreathingVoice";
import Instructions from "./components/Instructions";
import Panel from "./components/panel";
import VoiceControl from "./components/VoiceControl";

import "./components/panel.css";

const IntroAudioPath = "/opening_1.wav";
const EndAudioPath = "/ending_1.wav";

export default function App() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [mode, setMode] = useState("deep");

  const introRef = useRef(null);
  const endRef = useRef(null);
  const introPlayedRef = useRef(false);
  const voiceRef = useRef(null);

  // -----------------------------
  // AUDIO LOADING
  // -----------------------------
  useEffect(() => {
    introRef.current = new Audio(IntroAudioPath);
    introRef.current.preload = "auto";

    endRef.current = new Audio(EndAudioPath);
    endRef.current.preload = "auto";
  }, []);

  // -----------------------------
  // PLAY INTRO AUDIO ON FIRST USER INTERACTION
  // -----------------------------
  useEffect(() => {
    const playIntroOnce = () => {
      if (introPlayedRef.current) return;
      introPlayedRef.current = true;

      introRef.current.currentTime = 0;
      introRef.current.play().catch(() => {});
    };

    window.addEventListener("click", playIntroOnce);
    window.addEventListener("keydown", playIntroOnce);
    window.addEventListener("touchstart", playIntroOnce);

    return () => {
      window.removeEventListener("click", playIntroOnce);
      window.removeEventListener("keydown", playIntroOnce);
      window.removeEventListener("touchstart", playIntroOnce);
    };
  }, []);

  // -----------------------------
  // RESET SESSION ON MODE CHANGE
  // -----------------------------
  useEffect(() => resetSession(), [mode]);

  // -----------------------------
  // SESSION FUNCTIONS
  // -----------------------------
  const startBreathing = () => {
    setElapsedTime(0);
    setIsBreathing(true);
    setPhase("inhale");
    setSessionEnded(false);

    if (endRef.current) {
      endRef.current.pause();
      endRef.current.currentTime = 0;
    }
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setPhase("stopped");
    setSessionEnded(true);

    setTimeout(() => {
      endRef.current?.play().catch(() => {});
    }, 500);
  };

  const resetSession = () => {
    setIsBreathing(false);
    setPhase("idle");
    setElapsedTime(0);
    setSessionEnded(false);
  };

  // -----------------------------
  // MIC ENABLE HANDLER
  // -----------------------------
  const handleMicEnable = () => {
    if (voiceRef.current) {
      console.log("MIC ENABLE BUTTON CLICKED");
      voiceRef.current.enableMic();
    }
  };

  // -----------------------------
  // RENDER BREATHING ENGINE
  // -----------------------------
  const renderBreathingEngine = () => {
    const props = { isBreathing, elapsedTime, setElapsedTime, stopBreathing, setPhase };

    switch (mode) {
      case "deep":
        return <DeepBreathingEngine {...props} />;
      case "box":
        return <BoxBreathingEngine {...props} />;
      case "478":
        return <FourSevenEightEngine {...props} />;
      case "nadi":
        return <NadiShodhanaEngine {...props} />;
      default:
        return null;
    }
  };

  // -----------------------------
  // JSX RETURN
  // -----------------------------
  return (
    <div className="layout-grid">
      <div className="left-column">
        <Panel
          layout="left"
          mode={mode}
          selectMode={setMode}
          onMicEnable={handleMicEnable}
        />
      </div>

      <div className="center-column">
        <div key={mode}>{renderBreathingEngine()}</div>

        <BreathingFace
          phase={phase}
          elapsedTime={elapsedTime}
          isStopped={sessionEnded}
          mode={mode}
        />

        <Instructions phase={phase} mode={mode} />
        <BreathingVoice phase={phase} mode={mode} />

        <VoiceControl
          ref={voiceRef}
          onStart={startBreathing}
          onStop={stopBreathing}
          onReset={resetSession}
          sessionEnded={sessionEnded}
        />
      </div>

      <div className="right-column">
        <Panel
          layout="right"
          onStartBreathing={startBreathing}
          onStopBreathing={stopBreathing}
          onReset={resetSession}
          onMicEnable={handleMicEnable}
          isStopped={sessionEnded}
          voiceRef={voiceRef}
        />
      </div>
    </div>
  );
}