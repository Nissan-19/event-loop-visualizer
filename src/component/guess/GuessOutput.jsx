function GuessOutput() {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg shadow-black/20">
      <h2 className="mb-2 font-semibold text-white">
        Guess the Output
      </h2>

      <p className="mb-3 text-sm text-slate-400">
        Enter each output on a new line.
      </p>

      <label
        htmlFor="output-guess"
        className="mb-1 block text-sm font-medium text-slate-300"
      >
        Your answer
      </label>

      <textarea
        id="output-guess"
        rows="5"
        placeholder={"Start\nHello\nEnd"}
        className="w-full resize-none rounded-md border border-slate-700 bg-[#0d1117] p-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
      />

      <button
        type="button"
        className="mt-3 w-full rounded-md bg-yellow-400 px-3 py-2 font-semibold text-slate-950 transition hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
      >
        Check Answer
      </button>
    </section>
  )
}

export default GuessOutput