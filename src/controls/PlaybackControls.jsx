function PlaybackControls({ currentStep, handleStepIncrement, handleStepDecrement, handleReset, lastStep, setIsPlaying, isPlaying}) {

function Previous(){
  setIsPlaying(false);
  handleStepDecrement();
}
function Next(){
  setIsPlaying(false),
  handleStepIncrement()
}
function Reset(){
  setIsPlaying(false);
  handleReset();
}  
  

  return (
    <section className="mt-3 rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-lg shadow-black/20">
      <div className="flex flex-wrap gap-2">
        
        <button
          type="button"
          disabled = {currentStep>=lastStep}
          onClick={()=>setIsPlaying((previous)=>!previous)}
          className="h-9 rounded-md border border-slate-700 min-w-18 bg-slate-800 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        >
          {isPlaying ? "Pause":"Play"}
        </button>

        <button
          type="button"
          className="h-9 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentStep <= 0}
          onClick={Previous}
        >
          Previous
        </button>

        <button
          type="button"
          className="h-9 rounded-md border border-yellow-400 bg-yellow-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={Next}
          disabled={currentStep >= lastStep}
        >
          Next
        </button>

        <button
          type="button"
          className="h-9 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          onClick={Reset}
        >
          Reset
        </button>
      </div>

      <div className="mt-3 text-sm text-slate-400">
        {currentStep === 0 ? (
          <p>Not Started</p>
        ) : (
          <p>
            Step {currentStep} of {lastStep}
          </p>
        )}
      </div>
    </section>
  )
}

export default PlaybackControls