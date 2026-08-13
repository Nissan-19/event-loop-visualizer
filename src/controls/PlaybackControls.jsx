function PlaybackControls({currentStep, handleStepIncrement, handleStepDecrement, handleReset, lastStep}) {
      
  return (
    <section className="mt-2 rounded-lg border border-slate-300 p-3">
      

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border px-3 h-8"
          disabled={currentStep <= 0}
          onClick={handleStepDecrement}
          
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-md border px-3 h-8"
        >
          Play
        </button>

        <button
          type="button"
          className="rounded-md border px-3 h-8"
          onClick={handleStepIncrement}
          disabled= {currentStep >= lastStep}
        >
          Next
        </button>

        <button
          type="button"
          className="rounded-md border px-3 h-8"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="mt-2 text-sm text-slate-500">
        {currentStep === 0 ? (
          <p>Not Started</p>
        ):(
          <p>Step {currentStep} of {lastStep}</p>
        )}
         
      </div>
    </section>
  )
}

export default PlaybackControls