function ConsolePanel() {
  return (
    <section className="mt-2 overflow-hidden rounded-lg border border-slate-300">
      <div className="border-b border-slate-700 bg-slate-400 px-3 py-2">
        <h2 className="font-semibold text-white">
          Console Output
        </h2>
      </div>

      <div className="min-h-40 bg-slate- p-3 text-sm text-green-400">
        <pre>
          <code>Waiting for execution...</code>
        </pre>
      </div>
    </section>
  )
}

export default ConsolePanel