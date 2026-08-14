function ConsolePanel() {
  return (
    <section className="mt-3 overflow-hidden rounded-xl border border-slate-700 bg-[#080c12] shadow-lg shadow-black/20">
      <div className="border-b border-slate-700 bg-slate-800/80 px-3 py-2">
        <h2 className="font-semibold text-white">
          Console Output
        </h2>
      </div>

      <div className="min-h-40 bg-[#080c12] p-3 font-mono text-sm text-green-400">
        <pre>
          <code>Waiting for execution...</code>
        </pre>
      </div>
    </section>
  )
}

export default ConsolePanel