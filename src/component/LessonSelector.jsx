import { useState } from "react"
import lessonCatalog from "../data/lessons/lessonCatalog"


function LessonSelector(selectedLessonId ,handleLessonChange) {

  const [selectedTopic, setSelectedTopic] = useState("Topic1")

  const availableExercises = lessonCatalog.filter((lesson)=> lesson.topicId === selectedTopic)

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
          value={selectedLessonId}
          onChange={(event) => {
            handleLessonChange(event.target.value)
          }}
          disabled={availableExercises.length === 0}
        >
          <option value="" disabled>
            Select an example
          </option>

          {availableExercises.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default LessonSelector