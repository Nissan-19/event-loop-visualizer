function PlaybackControls() {
  return (
    <section className="mt-2 rounded-lg border border-slate-300 p-3">
      

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border px-3 py- h-8"
        >
          Previous
        </button>

        <button
          type="button"
          className="rounded-md border px-3 py- h-8"
        >
          Play
        </button>

        <button
          type="button"
          className="rounded-md border px-3 py- h-8"
        >
          Next
        </button>

        <button
          type="button"
          className="rounded-md border px-3 py- h-8"
        >
          Reset
        </button>
      </div>

      <p className="mt-2 text-sm text-slate-500">
        Step 1 of 8
      </p>
    </section>
  )
}

export default PlaybackControls