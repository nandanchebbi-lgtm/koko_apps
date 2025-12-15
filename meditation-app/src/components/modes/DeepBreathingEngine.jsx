import { useEffect, useRef } from "react";

export default function DeepBreathingEngine({ isBreathing, setElapsedTime, setPhase }) {
  const elapsedRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isBreathing) {
      clearInterval(intervalRef.current);
      return;
    }

    const INHALE = 4;
    const HOLD = 4;
    const EXHALE = 6;
    const CYCLE = INHALE + HOLD + EXHALE;

    elapsedRef.current = 0;
    setElapsedTime(0);

    intervalRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsedTime(elapsedRef.current);

      const t = elapsedRef.current % CYCLE;

      if (t < INHALE) setPhase("inhale-deep");
      else if (t < INHALE + HOLD) setPhase("hold-deep");
      else setPhase("exhale-deep");
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isBreathing, setElapsedTime, setPhase]);

  return null;
}