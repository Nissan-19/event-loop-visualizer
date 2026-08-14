import { useState } from "react"

const exercisesByTopic = {
  Topic1: ["Global Execution", "Function Call", "Nested Functions"],
  Topic2: ["Timer After Synchronous Code", "Zero-Delay Timer"],
  Topic3: ["Different Timer Delays", "Timers Waiting for the Stack"],
  Topic4: ["Promise Before Timer", "Microtasks Before Tasks"],
  Topic5: ["Before and After Await", "Async Function Continuation"],
}

function LessonSelector() {
  const [selectedTopic, setSelectedTopic] = useState("")

  const avaliableExercises = exercisesByTopic[selectedTopic] || []

  return (
    <section className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
      <div>
        <label
          className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
          htmlFor="topic"
        >
          Topic
        </label>

        <select
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 sm:w-52"
          name="topic"
          id="topic"
          value={selectedTopic}
          onChange={(event) => setSelectedTopic(event.target.value)}
        >
          <option value="" disabled>
            Select a topic
          </option>

          <option value="Topic1">Synchronous Execution</option>
          <option value="Topic2">Single Timer</option>
          <option value="Topic3">Multiple Timers</option>
          <option value="Topic4">Promise vs Timer</option>
          <option value="Topic5">Async/Await</option>
        </select>
      </div>

      <div>
        <label
          className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400"
          htmlFor="exercise"
        >
          Example
        </label>

        <select
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-60"
          name="exercise"
          id="exercise"
          disabled={!selectedTopic}
        >
          <option value="">Select an example</option>

          {avaliableExercises.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default LessonSelector