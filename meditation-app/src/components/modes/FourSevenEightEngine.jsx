import { useEffect, useRef } from "react";

export default function FourSevenEightEngine({ isBreathing, setElapsedTime, setPhase, stopBreathing }) {
  const elapsedRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isBreathing) {
      clearInterval(intervalRef.current);
      return;
    }

    const IN = 4;
    const HOLD = 7;
    const OUT = 8;
    const CYCLE = IN + HOLD + OUT;
    const SESSION_DURATION = 60; // 1 minute

    elapsedRef.current = 0;
    setElapsedTime(0);

    intervalRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsedTime(elapsedRef.current);

      if (elapsedRef.current >= SESSION_DURATION) {
        clearInterval(intervalRef.current);
        stopBreathing();
        return;
      }

      const t = elapsedRef.current % CYCLE;

      if (t < IN) setPhase("inhale-478");
      else if (t < IN + HOLD) setPhase("hold-478");
      else setPhase("exhale-478");
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isBreathing, setElapsedTime, setPhase, stopBreathing]);

  return null;
}