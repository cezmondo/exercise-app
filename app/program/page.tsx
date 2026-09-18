import { weeklyProgram, morningRoutine, eveningRoutine } from "@/lib/program";
import { getExercise } from "@/lib/exercises";
import ExerciseRow from "@/components/ExerciseRow";

export default function ProgramPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-foreground">Your Program</h1>
        <p className="text-sm text-muted-foreground">
          Browse every day and exercise, any time.
        </p>
      </header>

      <section className="space-y-1.5 rounded-xl border border-border bg-surface p-3">
        <h2 className="text-sm font-semibold text-foreground">Getting started safely</h2>
        <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
          <li>
            Coming back after time off? Treat the sets/reps below as a ceiling for your
            first 1-2 weeks, not a target — fewer reps, bodyweight or lighter load, more
            rest between sets. Add load gradually once it stops feeling heavy.
          </li>
          <li>
            Warm up with a few minutes of light movement (easy walk, marching in place)
            before strength or cardio days, especially in the first weeks back.
          </li>
          <li>
            Stretch to a mild pull, never sharp pain. Sharp or worsening pain in the
            foot or shoulder means stop and back off, not push through.
          </li>
          <li>
            Check with a doctor or physical therapist before starting if you haven&apos;t
            already been evaluated for the plantar fasciitis or shoulder issue.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Morning routine</h2>
        <p className="text-xs text-muted-foreground">Every day, before standing up</p>
        <ul className="space-y-2">
          {morningRoutine.map((item) => (
            <ExerciseRow key={item.exerciseId} exercise={getExercise(item.exerciseId)} />
          ))}
        </ul>
      </section>

      <div className="space-y-4">
        {weeklyProgram.map((day) => (
          <section
            key={day.day}
            className="space-y-3 rounded-xl border border-border bg-surface p-3"
          >
            <div>
              <h2 className="text-sm font-semibold text-foreground">{day.label}</h2>
              <p className="text-xs text-muted-foreground">{day.focus}</p>
            </div>
            {day.isRestDay ? (
              <p className="text-xs text-muted-foreground">
                No workout scheduled — recovery day.
              </p>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Maintenance</p>
                  <ul className="space-y-2">
                    {day.maintenance.map((item) => (
                      <ExerciseRow
                        key={item.exerciseId}
                        exercise={getExercise(item.exerciseId)}
                      />
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Main block</p>
                  <ul className="space-y-2">
                    {day.main.map((item) => (
                      <ExerciseRow
                        key={item.exerciseId}
                        exercise={getExercise(item.exerciseId)}
                      />
                    ))}
                  </ul>
                </div>
              </>
            )}
          </section>
        ))}
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Evening routine</h2>
        <p className="text-xs text-muted-foreground">
          Every day, before bed — loosens the fascia/shoulders before sleep instead of
          letting them tighten overnight
        </p>
        <ul className="space-y-2">
          {eveningRoutine.map((item) => (
            <ExerciseRow key={item.exerciseId} exercise={getExercise(item.exerciseId)} />
          ))}
        </ul>
      </section>
    </div>
  );
}
