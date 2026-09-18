"use client";

import { useEffect, useRef, useState } from "react";
import { ExerciseTimer as ExerciseTimerConfig } from "@/lib/types";

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function playBeep() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.4);
    oscillator.onended = () => ctx.close();
  } catch {
    // Web Audio not available — silently skip the beep
  }
}

interface ExerciseTimerProps {
  timer: ExerciseTimerConfig;
  onAllSetsComplete?: () => void;
}

export default function ExerciseTimer({ timer, onAllSetsComplete }: ExerciseTimerProps) {
  const { seconds: setSeconds, sets: totalSets } = timer;
  const [currentSet, setCurrentSet] = useState(1);
  const [remaining, setRemaining] = useState(setSeconds);
  const [running, setRunning] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setRunning(false);
          if (navigator.vibrate) navigator.vibrate(200);
          playBeep();
          if (currentSet >= totalSets) {
            setAllDone(true);
            onAllSetsComplete?.();
          } else {
            setCurrentSet((s) => s + 1);
          }
          return setSeconds;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  if (allDone) {
    return (
      <div className="rounded-lg border border-border p-3 text-center text-sm font-medium text-good">
        All sets complete
      </div>
    );
  }

  const isFreshSet = remaining === setSeconds && !running;

  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Set {currentSet} of {totalSets}
        </span>
      </div>
      <div className="text-center text-3xl font-semibold tabular-nums text-foreground">
        {formatTime(remaining)}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="flex-1 rounded-lg bg-accent py-2 text-sm font-semibold text-accent-foreground"
        >
          {running ? "Pause" : isFreshSet ? `Start Set ${currentSet}` : "Resume"}
        </button>
        {!isFreshSet && (
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setRemaining(setSeconds);
            }}
            className="rounded-lg border border-border px-3 text-xs text-muted-foreground"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
