 
function StepExplanation({ currentExplanation }) { ////React packages the prop into an object before giving it to the child so we do destructuring ({})
  return (
    <section className="mt-3 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg shadow-black/20">
      <h2 className="mb-2 font-semibold text-white">
        What Is Happening?
      </h2>

      <p className="text-sm leading-6 text-slate-300">
        {currentExplanation}
      </p>
    </section>
  )
}

export default StepExplanation