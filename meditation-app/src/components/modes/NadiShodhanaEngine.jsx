import { useEffect, useRef } from "react";

export default function NadiShodhanaEngine({ isBreathing, setElapsedTime, setPhase }) {
  const elapsedRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isBreathing) {
      clearInterval(intervalRef.current);
      return;
    }

    const IN = 4; // seconds
    const HOLD = 4;
    const OUT = 4;
    const CYCLE = (IN + HOLD + OUT) * 2;

    elapsedRef.current = 0;
    setElapsedTime(0);

    intervalRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsedTime(elapsedRef.current);

      const t = elapsedRef.current % CYCLE;

      if (t < IN) setPhase("inhale-left");
      else if (t < IN + HOLD) setPhase("hold");
      else if (t < IN + HOLD + OUT) setPhase("exhale-right");
      else if (t < IN + HOLD + OUT + IN) setPhase("inhale-right");
      else if (t < IN + HOLD + OUT + IN + HOLD) setPhase("hold");
      else setPhase("exhale-left");
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isBreathing, setElapsedTime, setPhase]);

  return null;
}