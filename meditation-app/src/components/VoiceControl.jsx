// VoiceControl.jsx
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const VoiceControl = forwardRef(function VoiceControl({ onStart, onStop, onReset, sessionEnded }, ref) {
  const recognitionRef = useRef(null);
  const micEnabledRef = useRef(false);
  const restartingRef = useRef(false);

  const onStartRef = useRef(onStart);
  const onStopRef = useRef(onStop);
  const onResetRef = useRef(onReset);
  const sessionEndedRef = useRef(sessionEnded);

  // Keep refs updated if props change
  useEffect(() => { onStartRef.current = onStart; }, [onStart]);
  useEffect(() => { onStopRef.current = onStop; }, [onStop]);
  useEffect(() => { onResetRef.current = onReset; }, [onReset]);
  useEffect(() => { sessionEndedRef.current = sessionEnded; }, [sessionEnded]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // Handle speech results
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1]?.[0]?.transcript?.toLowerCase().trim();
      if (!transcript) return;

      console.log("VoiceControl heard:", transcript);

      if (transcript.includes("start")) onStartRef.current?.();
      if (transcript.includes("stop")) onStopRef.current?.();
      if ((transcript.includes("reset") || transcript.includes("refresh")) && sessionEndedRef.current) {
        onResetRef.current?.();
      }
    };

    // Handle errors
    recognition.onerror = (e) => {
      // Ignore 'no-speech' errors (normal when silent)
      if (e.error === "no-speech") return;

      // Stop on permission errors
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        micEnabledRef.current = false;
        console.warn("VoiceControl mic permission denied.");
        return;
      }

      console.error("VoiceControl error:", e);

      // Attempt restart on other errors
      if (micEnabledRef.current && !restartingRef.current) {
        restartingRef.current = true;
        setTimeout(() => {
          try { recognition.stop(); recognition.start(); } catch {}
          restartingRef.current = false;
        }, 300);
      }
    };

    // Automatically restart recognition if it ends
    recognition.onend = () => {
      if (micEnabledRef.current && !restartingRef.current) {
        restartingRef.current = true;
        setTimeout(() => {
          try { recognition.start(); console.log("VoiceControl: recognition restarted"); } catch {}
          restartingRef.current = false;
        }, 250);
      }
    };

    recognitionRef.current = recognition;

    // Clean up on unmount
    return () => { 
      try { recognition.stop(); } catch {}
      recognitionRef.current = null;
    };
  }, []);

  // Enable microphone
  const enableMic = async () => {
    if (micEnabledRef.current) return;
    const recognition = recognitionRef.current;
    if (!recognition) return;

    try {
      recognition.start();
      micEnabledRef.current = true;
      console.log("%cVoiceControl: MIC ENABLED + LISTENING", "color: green");
    } catch (err) {
      // Fallback using getUserMedia for permission prompt
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          recognition.start();
          micEnabledRef.current = true;
          console.log("%cVoiceControl: MIC ENABLED + LISTENING (after getUserMedia)", "color: green");
        } catch (gerr) {
          console.error("VoiceControl: mic permission denied:", gerr);
          micEnabledRef.current = false;
        }
      }
    }
  };

  // Disable microphone
  const disableMic = () => {
    try { recognitionRef.current?.stop(); } catch {}
    micEnabledRef.current = false;
    console.log("VoiceControl: MIC DISABLED");
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    enableMic,
    disableMic,
    isMicEnabled: () => micEnabledRef.current
  }));

  return null;
});

export default VoiceControl;