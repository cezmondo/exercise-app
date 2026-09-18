import { ProgramItem } from "@/lib/types";
import { getExercise } from "@/lib/exercises";
import ExerciseRow from "./ExerciseRow";

interface ChecklistSectionProps {
  title: string;
  description?: string;
  items: ProgramItem[];
  done: Record<string, boolean>;
  onToggle: (exerciseId: string) => void;
  weights?: Record<string, number>;
  onWeightChange?: (exerciseId: string, weight: number | undefined) => void;
}

export default function ChecklistSection({
  title,
  description,
  items,
  done,
  onToggle,
  weights,
  onWeightChange,
}: ChecklistSectionProps) {
  const doneCount = items.filter((item) => done[item.exerciseId]).length;

  return (
    <section className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {doneCount}/{items.length}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => {
          const exercise = getExercise(item.exerciseId);
          return (
            <ExerciseRow
              key={item.exerciseId}
              exercise={exercise}
              showCheckbox
              checked={Boolean(done[item.exerciseId])}
              onToggle={() => onToggle(item.exerciseId)}
              weight={weights?.[item.exerciseId]}
              onWeightChange={
                onWeightChange
                  ? (weight) => onWeightChange(item.exerciseId, weight)
                  : undefined
              }
            />
          );
        })}
      </ul>
    </section>
  );
}
