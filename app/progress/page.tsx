"use client";

import { useMemo } from "react";
import { useTracking, getRecentRecords, toDateKey } from "@/lib/use-tracking";
import StreakBadge from "@/components/StreakBadge";
import CompletionCalendar from "@/components/CompletionCalendar";
import PainTrendChart from "@/components/PainTrendChart";

export default function ProgressPage() {
  const today = useMemo(() => new Date(), []);
  const { store, streak } = useTracking(today);

  const last28 = useMemo(() => getRecentRecords(store, 28, today), [store, today]);
  const last14 = useMemo(() => getRecentRecords(store, 14, today), [store, today]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Progress</h1>
          <p className="text-sm text-muted-foreground">Last 28 days</p>
        </div>
        <StreakBadge streak={streak} />
      </header>

      <section className="space-y-2 rounded-xl border border-border bg-surface p-3">
        <h2 className="text-sm font-semibold text-foreground">Consistency</h2>
        <CompletionCalendar records={last28} todayKey={toDateKey(today)} />
      </section>

      <section className="space-y-2 rounded-xl border border-border bg-surface p-3">
        <h2 className="text-sm font-semibold text-foreground">Pain trend</h2>
        <PainTrendChart records={last14} />
      </section>
    </div>
  );
}
