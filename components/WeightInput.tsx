"use client";

import { useId } from "react";

interface WeightInputProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

export default function WeightInput({ value, onChange }: WeightInputProps) {
  const id = useId();

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <label htmlFor={id} className="text-sm text-muted-foreground">
        Weight used
      </label>
      <div className="flex items-center gap-1.5">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={2.5}
          value={value ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(raw === "" ? undefined : Number(raw));
          }}
          placeholder="0"
          className="w-16 rounded-md border border-border bg-surface px-2 py-1 text-right text-sm text-foreground"
        />
        <span className="text-xs text-muted-foreground">lbs</span>
      </div>
    </div>
  );
}
