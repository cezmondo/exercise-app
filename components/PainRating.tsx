interface PainScaleProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

function PainScale({ label, value, onChange }: PainScaleProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex gap-1.5" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(n)}
            className={`h-9 flex-1 rounded-lg border text-sm font-medium transition-colors ${
              value === n
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted-foreground"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

interface PainRatingProps {
  painFeet?: number;
  painShoulders?: number;
  onChange: (feet: number, shoulders: number) => void;
}

export default function PainRating({ painFeet, painShoulders, onChange }: PainRatingProps) {
  return (
    <section className="space-y-3 rounded-xl border border-border bg-surface p-3">
      <div>
        <h2 className="text-sm font-semibold text-foreground">How did it feel today?</h2>
        <p className="text-xs text-muted-foreground">1 = no pain, 5 = severe pain</p>
      </div>
      <PainScale
        label="Feet"
        value={painFeet}
        onChange={(v) => onChange(v, painShoulders ?? 0)}
      />
      <PainScale
        label="Shoulders"
        value={painShoulders}
        onChange={(v) => onChange(painFeet ?? 0, v)}
      />
    </section>
  );
}
