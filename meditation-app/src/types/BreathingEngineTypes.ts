export interface BreathingEngineProps {
  isBreathing: boolean;
  elapsedTime: number;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
  stopBreathing: () => void;
  setPhase: (phase: string) => void;
}
