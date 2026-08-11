function GuessOutput() {
  return (
    <section className="rounded-lg border border-slate-300 p-3">
      <h2 className="mb-2 font-semibold">
        Guess the Output
      </h2>

      <p className="mb-3 text-sm text-slate-600">
        Enter each output on a new line.
      </p>

      <label
        htmlFor="output-guess"
        className="mb-1 block text-sm font-medium"
      >
        Your answer
      </label>

      <textarea
        id="output-guess"
        rows="5"
        placeholder={"Start\nHello\nEnd"}
        className="w-full resize-none rounded-md border border-slate-300 p-2"
      />

      <button
        type="button"
        className="mt-2 w-full rounded-md bg-slate-400 px-3 py-2 text-white"
      >
        Check Answer
      </button>
    </section>
  )
}

export default GuessOutput