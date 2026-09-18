import { DayKey, DayProgram, ProgramItem } from "./types";

const item = (exerciseId: string): ProgramItem => ({ exerciseId });

/** Done before standing up, every day of the week. */
export const morningRoutine: ProgramItem[] = [
  item("plantar-fascia-stretch"),
  item("ankle-pumps-circles"),
  item("calf-stretch"),
  item("foot-ball-roll"),
];

/**
 * Done before bed, every day of the week. Complements the morning routine —
 * loosening the calf/plantar fascia and shoulders before sleep, similar in
 * spirit to a night splint for plantar fasciitis.
 */
export const eveningRoutine: ProgramItem[] = [
  item("plantar-fascia-stretch"),
  item("calf-stretch"),
  item("doorway-pec-stretch"),
  item("sleeper-stretch"),
  item("hamstring-stretch"),
];

/** Foot + shoulder maintenance, done on every workout day's main session. */
const dailyMaintenance: ProgramItem[] = [
  item("calf-stretch"),
  item("plantar-fascia-stretch"),
  item("doorway-pec-stretch"),
  item("sleeper-stretch"),
];

export const weeklyProgram: DayProgram[] = [
  {
    day: "mon",
    label: "Monday",
    isRestDay: false,
    focus: "Lower Body Strength + Foot Focus",
    maintenance: dailyMaintenance,
    main: [
      item("bodyweight-squat"),
      item("forward-lunge"),
      item("glute-bridge"),
      item("standing-calf-raise"),
      item("eccentric-heel-drop"),
      item("towel-scrunch"),
      item("marble-pickup"),
    ],
  },
  {
    day: "tue",
    label: "Tuesday",
    isRestDay: false,
    focus: "Cardio + Shoulder Mobility",
    maintenance: dailyMaintenance,
    main: [
      item("cardio-session"),
      item("band-pull-apart"),
      item("wall-slide"),
      item("arm-circles"),
    ],
  },
  {
    day: "wed",
    label: "Wednesday",
    isRestDay: true,
    focus: "Rest",
    maintenance: [],
    main: [],
  },
  {
    day: "thu",
    label: "Thursday",
    isRestDay: false,
    focus: "Cardio + Eccentric Calf/Foot Strengthening",
    maintenance: dailyMaintenance,
    main: [
      item("cardio-session"),
      item("eccentric-heel-drop"),
      item("single-leg-balance"),
    ],
  },
  {
    day: "fri",
    label: "Friday",
    isRestDay: false,
    focus: "Upper/Full-Body Strength",
    maintenance: dailyMaintenance,
    main: [
      item("push-up"),
      item("dumbbell-row"),
      item("band-external-rotation"),
      item("plank"),
    ],
  },
  {
    day: "sat",
    label: "Saturday",
    isRestDay: false,
    focus: "Full-Body Flexibility Day",
    maintenance: dailyMaintenance,
    main: [
      item("hip-flexor-stretch"),
      item("hamstring-stretch"),
      item("cat-cow-stretch"),
      item("foot-ball-roll"),
      item("eccentric-heel-drop"),
    ],
  },
  {
    day: "sun",
    label: "Sunday",
    isRestDay: true,
    focus: "Rest",
    maintenance: [],
    main: [],
  },
];

const dayKeyByJsIndex: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function getDayKeyForDate(date: Date): DayKey {
  return dayKeyByJsIndex[date.getDay()];
}

export function getProgramForDay(day: DayKey): DayProgram {
  const program = weeklyProgram.find((d) => d.day === day);
  if (!program) {
    throw new Error(`Unknown day: ${day}`);
  }
  return program;
}
