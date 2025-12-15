import { useEffect, useRef } from "react";

export default function BoxBreathingEngine({ isBreathing, setElapsedTime, setPhase }) {
  const elapsedRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isBreathing) {
      clearInterval(intervalRef.current);
      return;
    }

    const SEG = 4; // seconds per segment
    const CYCLE = SEG * 4;

    elapsedRef.current = 0;
    setElapsedTime(0);

    intervalRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsedTime(elapsedRef.current);

      const t = elapsedRef.current % CYCLE;

      if (t < SEG) setPhase("inhale-box");
      else if (t < SEG * 2) setPhase("hold-box");
      else if (t < SEG * 3) setPhase("exhale-box");
      else setPhase("hold-box");
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isBreathing, setElapsedTime, setPhase]);

  return null;
}