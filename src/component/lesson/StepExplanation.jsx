function StepExplanation({currentExplanation}) { //React packages the prop into an object before giving it to the child so we do destructuring ({})
  return (
    <section className="mt-2 rounded-lg border border-slate-300 p-3">
      <h2 className="mb-2 font-semibold">
        What Is Happening?
      </h2>

      <div className="text-sm text-slate-600">
        {currentExplanation}
      </div>
    </section>
  )
}

export default StepExplanation