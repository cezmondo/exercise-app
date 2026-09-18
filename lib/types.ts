export type ExerciseCategory =
  | "foot"
  | "shoulder"
  | "flexibility"
  | "strength"
  | "cardio";

export interface ExerciseTimer {
  /** Length of one hold/interval, in seconds */
  seconds: number;
  /** Number of sets/rounds */
  sets: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  /** e.g. "3 x 30 sec" or "3 x 12 reps" or "30-40 min" */
  dose: string;
  cues: string[];
  imageSrc?: string;
  videoId?: string;
  /** Present for duration-based exercises (stretches, plank, cardio) */
  timer?: ExerciseTimer;
  /** True for exercises typically done with a dumbbell, to allow logging weight used */
  trackWeight?: boolean;
}

export interface ProgramItem {
  exerciseId: string;
}

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DayProgram {
  day: DayKey;
  label: string;
  isRestDay: boolean;
  focus: string;
  /** Foot + shoulder maintenance stretches, done on workout days */
  maintenance: ProgramItem[];
  /** Main ~45 min block, empty on rest days */
  main: ProgramItem[];
}
