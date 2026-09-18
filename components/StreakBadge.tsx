interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <path
          d="M12 2c1 3-3 4-3 7.5A3.5 3.5 0 0 0 12 13a3.5 3.5 0 0 0 3-5.3C17 9 18 11 18 13a6 6 0 1 1-12 0c0-4 3-6 3-9 1 1 2 1 3-2Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-sm font-semibold text-foreground">{streak}</span>
      <span className="text-xs text-muted-foreground">day streak</span>
    </div>
  );
}
