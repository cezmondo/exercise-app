"use client";

import { useMemo } from "react";
import { useTracking } from "@/lib/use-tracking";
import {
  eveningRoutine,
  getDayKeyForDate,
  getProgramForDay,
  morningRoutine,
} from "@/lib/program";
import ChecklistSection from "@/components/ChecklistSection";
import PainRating from "@/components/PainRating";
import StreakBadge from "@/components/StreakBadge";

export default function TodayPage() {
  const today = useMemo(() => new Date(), []);
  const dayKey = getDayKeyForDate(today);
  const program = getProgramForDay(dayKey);
  const { record, toggle, setPain, setWeight, markComplete, unmarkComplete, streak } =
    useTracking(today);

  const morningDone = morningRoutine.every((item) => record.morning[item.exerciseId]);
  const eveningDone = eveningRoutine.every(
    (item) => (record.evening ?? {})[item.exerciseId]
  );
  const maintenanceDone = program.maintenance.every(
    (item) => record.maintenance[item.exerciseId]
  );
  const mainDone = program.main.every((item) => record.main[item.exerciseId]);
  const allDone =
    morningDone && eveningDone && (program.isRestDay || (maintenanceDone && mainDone));

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {today.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-xl font-semibold text-foreground">{program.focus}</h1>
        </div>
        <StreakBadge streak={streak} />
      </header>

      <ChecklistSection
        title="Morning routine"
        description="Before standing up / first steps"
        items={morningRoutine}
        done={record.morning}
        onToggle={(id) => toggle("morning", id)}
      />

      {program.isRestDay ? (
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
          Rest day — no workout scheduled. Just the morning and evening routines.
        </div>
      ) : (
        <>
          <ChecklistSection
            title="Maintenance"
            description="Feet + shoulders, every workout day"
            items={program.maintenance}
            done={record.maintenance}
            onToggle={(id) => toggle("maintenance", id)}
          />
          <ChecklistSection
            title="Main workout"
            description="~45 min"
            items={program.main}
            done={record.main}
            onToggle={(id) => toggle("main", id)}
            weights={record.weights}
            onWeightChange={(id, weight) => setWeight(id, weight)}
          />
        </>
      )}

      <ChecklistSection
        title="Evening routine"
        description="Before bed"
        items={eveningRoutine}
        done={record.evening ?? {}}
        onToggle={(id) => toggle("evening", id)}
      />

      <PainRating
        painFeet={record.painFeet}
        painShoulders={record.painShoulders}
        onChange={(feet, shoulders) => setPain(feet, shoulders)}
      />

      <button
        type="button"
        onClick={() => (record.completedAt ? unmarkComplete() : markComplete())}
        disabled={!allDone && !record.completedAt}
        className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
          record.completedAt
            ? "bg-good text-white"
            : allDone
              ? "bg-accent text-accent-foreground"
              : "bg-border text-muted-foreground"
        }`}
      >
        {record.completedAt
          ? "Day complete — tap to undo"
          : allDone
            ? "Mark day complete"
            : "Finish checklist to complete day"}
      </button>
    </div>
  );
}
