"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getDayKeyForDate, getProgramForDay } from "./program";

const STORAGE_KEY = "exercise-app:tracking:v1";

export type Section = "morning" | "maintenance" | "main" | "evening";

export interface DayRecord {
  date: string; // YYYY-MM-DD
  morning: Record<string, boolean>;
  maintenance: Record<string, boolean>;
  main: Record<string, boolean>;
  evening: Record<string, boolean>;
  painFeet?: number;
  painShoulders?: number;
  completedAt?: string;
  weights?: Record<string, number>;
}

export type TrackingStore = Record<string, DayRecord>;

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function emptyRecord(dateKey: string): DayRecord {
  return { date: dateKey, morning: {}, maintenance: {}, main: {}, evening: {} };
}

const EMPTY_STORE: TrackingStore = {};
let cachedStore: TrackingStore | null = null;
const listeners = new Set<() => void>();

function readStore(): TrackingStore {
  if (typeof window === "undefined") return EMPTY_STORE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingStore) : EMPTY_STORE;
  } catch {
    return EMPTY_STORE;
  }
}

function getSnapshot(): TrackingStore {
  if (cachedStore === null) {
    cachedStore = readStore();
  }
  return cachedStore;
}

function getServerSnapshot(): TrackingStore {
  return EMPTY_STORE;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function commit(next: TrackingStore) {
  cachedStore = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore write errors (private browsing, quota, etc.)
    }
  }
  listeners.forEach((listener) => listener());
}

export function computeStreak(store: TrackingStore, today: Date = new Date()): number {
  let streak = 0;
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let isToday = true;
  for (let i = 0; i < 400; i++) {
    const dateKey = toDateKey(cursor);
    const dayProgram = getProgramForDay(getDayKeyForDate(cursor));
    const record = store[dateKey];
    const done = dayProgram.isRestDay || Boolean(record?.completedAt);
    if (done) {
      streak += 1;
    } else if (!isToday) {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
    isToday = false;
  }
  return streak;
}

export function getRecentRecords(
  store: TrackingStore,
  days: number,
  today: Date = new Date()
): DayRecord[] {
  const results: DayRecord[] = [];
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  for (let i = 0; i < days; i++) {
    const dateKey = toDateKey(cursor);
    results.unshift(store[dateKey] ?? emptyRecord(dateKey));
    cursor.setDate(cursor.getDate() - 1);
  }
  return results;
}

export function useTracking(date: Date = new Date()) {
  const dateKey = toDateKey(date);
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const record = store[dateKey] ?? emptyRecord(dateKey);

  const toggle = useCallback(
    (section: Section, exerciseId: string) => {
      const current = getSnapshot();
      const prevRecord = current[dateKey] ?? emptyRecord(dateKey);
      const prevSection = prevRecord[section] ?? {};
      const nextRecord: DayRecord = {
        ...prevRecord,
        [section]: {
          ...prevSection,
          [exerciseId]: !prevSection[exerciseId],
        },
      };
      commit({ ...current, [dateKey]: nextRecord });
    },
    [dateKey]
  );

  const setPain = useCallback(
    (painFeet: number, painShoulders: number) => {
      const current = getSnapshot();
      const prevRecord = current[dateKey] ?? emptyRecord(dateKey);
      commit({ ...current, [dateKey]: { ...prevRecord, painFeet, painShoulders } });
    },
    [dateKey]
  );

  const setWeight = useCallback(
    (exerciseId: string, weight: number | undefined) => {
      const current = getSnapshot();
      const prevRecord = current[dateKey] ?? emptyRecord(dateKey);
      const nextWeights = { ...prevRecord.weights };
      if (weight === undefined) {
        delete nextWeights[exerciseId];
      } else {
        nextWeights[exerciseId] = weight;
      }
      commit({ ...current, [dateKey]: { ...prevRecord, weights: nextWeights } });
    },
    [dateKey]
  );

  const markComplete = useCallback(() => {
    const current = getSnapshot();
    const prevRecord = current[dateKey] ?? emptyRecord(dateKey);
    commit({
      ...current,
      [dateKey]: { ...prevRecord, completedAt: new Date().toISOString() },
    });
  }, [dateKey]);

  const unmarkComplete = useCallback(() => {
    const current = getSnapshot();
    const prevRecord = current[dateKey] ?? emptyRecord(dateKey);
    const rest: DayRecord = {
      date: prevRecord.date,
      morning: prevRecord.morning,
      maintenance: prevRecord.maintenance,
      main: prevRecord.main,
      evening: prevRecord.evening ?? {},
      painFeet: prevRecord.painFeet,
      painShoulders: prevRecord.painShoulders,
      weights: prevRecord.weights,
    };
    commit({ ...current, [dateKey]: rest });
  }, [dateKey]);

  const streak = computeStreak(store, date);

  return {
    record,
    toggle,
    setPain,
    setWeight,
    markComplete,
    unmarkComplete,
    streak,
    store,
  };
}
