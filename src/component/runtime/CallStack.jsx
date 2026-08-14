function CallStack({ currentCallStack }) {
  return (
    <section className="flex h-full flex-col rounded-lg border border-sky-500/60 bg-sky-500/10 p-3 shadow-[inset_0_0_24px_rgba(14,165,233,0.05)]">
      <h3 className="text-center font-semibold text-sky-300">
        Call Stack
      </h3>

      <div className="mt-auto text-sm text-slate-400">
        {currentCallStack.length === 0 ? (
          <p className="text-center">
            Call Stack is empty
          </p>
        ) : (
          <div className="flex flex-col-reverse gap-2">
            {currentCallStack.map((stackFrame, index) => (
              <span
                key={index}
                className="rounded-md border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-center font-semibold text-sky-200"
              >
                {stackFrame}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CallStack