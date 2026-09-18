"use client";

import { useState } from "react";
import { DayRecord } from "@/lib/use-tracking";

interface PainTrendChartProps {
  records: DayRecord[]; // chronological, oldest first
}

const WIDTH = 320;
const HEIGHT = 170;
const PAD_LEFT = 22;
const PAD_RIGHT = 10;
const PAD_TOP = 12;
const PAD_BOTTOM = 10;

export default function PainTrendChart({ records }: PainTrendChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const points = records.filter(
    (r) => r.painFeet !== undefined || r.painShoulders !== undefined
  );

  if (points.length < 2) {
    return (
      <p className="text-sm text-muted-foreground">
        Log a pain rating on at least two days to see your trend here.
      </p>
    );
  }

  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const xFor = (i: number) =>
    PAD_LEFT + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW);
  const yFor = (v: number) => PAD_TOP + plotH - ((v - 1) / 4) * plotH;

  const buildPath = (key: "painFeet" | "painShoulders") => {
    let d = "";
    let started = false;
    points.forEach((p, i) => {
      const v = p[key];
      if (v === undefined) {
        started = false;
        return;
      }
      const x = xFor(i);
      const y = yFor(v);
      d += started ? ` L ${x} ${y}` : ` M ${x} ${y}`;
      started = true;
    });
    return d.trim();
  };

  const feetPath = buildPath("painFeet");
  const shouldersPath = buildPath("painShoulders");
  const cellW = plotW / points.length;
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Pain rating trend for feet and shoulders, scale 1 to 5"
      >
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={yFor(v)}
              y2={yFor(v)}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={PAD_LEFT - 6}
              y={yFor(v) + 3}
              textAnchor="end"
              fontSize="8"
              fill="var(--subtle-foreground)"
            >
              {v}
            </text>
          </g>
        ))}
        {feetPath && (
          <path
            d={feetPath}
            fill="none"
            stroke="var(--series-feet)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {shouldersPath && (
          <path
            d={shouldersPath}
            fill="none"
            stroke="var(--series-shoulders)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {points.map((p, i) => (
          <g key={p.date}>
            {p.painFeet !== undefined && (
              <circle
                cx={xFor(i)}
                cy={yFor(p.painFeet)}
                r={hoverIndex === i ? 5 : 4}
                fill="var(--series-feet)"
              />
            )}
            {p.painShoulders !== undefined && (
              <circle
                cx={xFor(i)}
                cy={yFor(p.painShoulders)}
                r={hoverIndex === i ? 5 : 4}
                fill="var(--series-shoulders)"
              />
            )}
            <rect
              x={xFor(i) - cellW / 2}
              y={PAD_TOP}
              width={cellW}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onTouchStart={() => setHoverIndex(i)}
            />
          </g>
        ))}
      </svg>
      <div className="mt-2 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--series-feet)" }}
            aria-hidden="true"
          />
          Feet
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--series-shoulders)" }}
            aria-hidden="true"
          />
          Shoulders
        </span>
      </div>
      <div className="mt-1 h-4 text-xs text-muted-foreground">
        {hovered &&
          `${new Date(hovered.date + "T00:00:00").toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}` +
            (hovered.painFeet !== undefined ? ` · Feet ${hovered.painFeet}` : "") +
            (hovered.painShoulders !== undefined
              ? ` · Shoulders ${hovered.painShoulders}`
              : "")}
      </div>
    </div>
  );
}
