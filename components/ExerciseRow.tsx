"use client";

import { useState } from "react";
import { Exercise } from "@/lib/types";
import ExerciseTimer from "./ExerciseTimer";
import WeightInput from "./WeightInput";

interface ExerciseRowProps {
  exercise: Exercise;
  checked?: boolean;
  onToggle?: () => void;
  showCheckbox?: boolean;
  weight?: number;
  onWeightChange?: (weight: number | undefined) => void;
}

export default function ExerciseRow({
  exercise,
  checked = false,
  onToggle,
  showCheckbox = false,
  weight,
  onWeightChange,
}: ExerciseRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center gap-3 p-3">
        {showCheckbox && (
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={checked}
            aria-label={checked ? `Mark ${exercise.name} not done` : `Mark ${exercise.name} done`}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
              checked ? "border-good bg-good" : "border-border bg-transparent"
            }`}
          >
            {checked && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="flex flex-1 items-center justify-between gap-2 text-left"
          aria-expanded={expanded}
        >
          <span>
            <span
              className={`block text-sm font-medium ${
                checked ? "text-muted-foreground line-through" : "text-foreground"
              }`}
            >
              {exercise.name}
            </span>
            <span className="block text-xs text-muted-foreground">{exercise.dose}</span>
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 text-subtle-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {expanded && (
        <div className="space-y-3 border-t border-border p-3 pt-3">
          <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {exercise.cues.map((cue) => (
              <li key={cue}>{cue}</li>
            ))}
          </ul>
          {exercise.timer && (
            <ExerciseTimer
              timer={exercise.timer}
              onAllSetsComplete={
                showCheckbox && onToggle && !checked ? onToggle : undefined
              }
            />
          )}
          {exercise.trackWeight && onWeightChange && (
            <WeightInput value={weight} onChange={onWeightChange} />
          )}
          {exercise.videoId && (
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${exercise.videoId}`}
                title={`${exercise.name} demo video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      )}
    </li>
  );
}
