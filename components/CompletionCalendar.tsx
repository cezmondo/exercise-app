import { DayRecord } from "@/lib/use-tracking";
import { getDayKeyForDate, getProgramForDay } from "@/lib/program";

interface CompletionCalendarProps {
  records: DayRecord[]; // chronological, oldest first
  todayKey: string;
}

export default function CompletionCalendar({ records, todayKey }: CompletionCalendarProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5">
        {records.map((record) => {
          const date = new Date(`${record.date}T00:00:00`);
          const dayProgram = getProgramForDay(getDayKeyForDate(date));
          const isToday = record.date === todayKey;
          const isRest = dayProgram.isRestDay;
          const isDone = Boolean(record.completedAt);

          const base = "flex aspect-square items-center justify-center rounded-md text-[10px] font-medium";
          const stateClass = isRest
            ? "bg-border text-muted-foreground"
            : isDone
              ? "bg-good text-white"
              : "border border-border text-muted-foreground";
          const ring = isToday ? "ring-2 ring-accent ring-offset-1 ring-offset-background" : "";

          return (
            <div
              key={record.date}
              className={`${base} ${stateClass} ${ring}`}
              title={`${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })} — ${
                isRest ? "Rest day" : isDone ? "Completed" : "Not completed"
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-good" aria-hidden="true" />
          Completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-border" aria-hidden="true" />
          Rest day
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-border" aria-hidden="true" />
          Not completed
        </span>
      </div>
    </div>
  );
}
