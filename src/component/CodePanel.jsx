function CodePanel({ codeLines, activeLineNumber }) {
  return (
    <section className="mt-2 flex min-h-125 w-full flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg shadow-black/20">
      <div className="flex border-b border-slate-700 bg-slate-800/80 px-3 py-2">
        <h2 className="font-semibold text-slate-100">
          app.js
        </h2>

        <p className="ml-auto text-sm text-slate-400">
          Read-only
        </p>
      </div>

      <div className="flex-1 overflow-x-auto bg-[#0d1117]">
        <pre className="min-h-full p-3 text-sm leading-6">
          <code className="block min-w-full">
            {codeLines.map((codeLine, index) => (
              <span
                key={index}
                className={
                  index + 1 === activeLineNumber
                    ? "active-code-line block rounded-sm px-2"
                    : "block px-2 text-slate-300"
                }
              >
                {codeLine || "\u00A0"}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </section>
  )
}

/*
  <pre> preserves spaces and line breaks.
  <code> identifies the content as programming code.
  "\u00A0" preserves intentional empty lines.
*/

export default CodePanel