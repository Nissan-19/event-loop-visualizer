import lessonCatalog from "../data/lessons/lessonCatalog"

function LessonSelector({ selectedLessonId, handleLessonChange }) { //handlelessonchange updates the selectedlessonid
  // Find the complete lesson object that is currently selected.
  const selectedLesson = lessonCatalog.find((lesson) => lesson.id === selectedLessonId)

  // We do not store the topic separately.
  // The selected lesson already tells us which topic it belongs to.
  const selectedTopic = selectedLesson.topicId

  // Show only the exercises belonging to the current topic.
  const availableExercises = lessonCatalog.filter((lesson) => lesson.topicId === selectedTopic)

  function handleTopicChange(event) {
    const newTopic = event.target.value

    // When the topic changes, select the first available lesson
    // belonging to that topic.
    const firstLesson = lessonCatalog.find((lesson) => lesson.topicId === newTopic) //out of the lesson catalaagoue find the first lesson whose topic id matches witht the new topic id

    if (firstLesson) {
      handleLessonChange(firstLesson.id) //and from that lesson send the id to handlelesson change which needs id to change
    }
  }

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
          onChange={handleTopicChange}
        >
          <option value="Topic1">Synchronous Execution</option>
          <option value="Topic2">Timers and Browser APIs</option>
          <option value="Topic3">Task Queue Behaviour</option>
          <option value="Topic4">Promises and Microtasks</option>
          <option value="Topic5">Async/Await</option>
          <option value="Topic6">Mixed Event-Loop Challenges</option>
          <option value="Topic7">Browser Events</option>
          <option value="Topic8">Fetch and Network Requests</option>
          <option value="Topic9">Mixed Promise States</option>
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