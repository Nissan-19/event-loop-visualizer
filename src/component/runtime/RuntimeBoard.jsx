import CallStack from "./CallStack"
import BrowserAPIs from "./BrowserAPIs"
import TaskQueue from "./TaskQueue"
import MicrotaskQueue from "./MicrotaskQueue"

function RuntimeBoard({currentCallStack, currentStep, lastStep }) {
  const progress = currentStep / lastStep
  const progressAngle = progress*360

  return (

    <section className="relative min-h-130 w-full overflow-hidden rounded-xl border border-slate-700 bg-[#0b1628] p-3 shadow-lg shadow-black/20">
      
      <div className="grid min-h-120 grid-cols-6 grid-rows-6 gap-4 sm:gap-6">
        <div className="col-start-3 col-end-5 row-start-1 row-end-3 h-full">
          <MicrotaskQueue />
        </div>

        <div className="col-start-1 col-end-3 row-start-2 row-end-6 h-full">
          <CallStack 
            currentCallStack ={currentCallStack}/>
        </div>

        <div className="col-start-3 col-end-5 row-start-3 row-end-5 flex h-full items-center justify-center">
          {/* Outer progress ring */}
          <div
            className="event-loop-progress flex size-32 items-center justify-center rounded-full p-1 shadow-[0_0_28px_rgba(247,223,30,0.12)]"
            style={{
              "--progress-angle": `${progressAngle}deg`,
            }}
          >
            {/* Inner Event Loop circle */}
            <div className="flex size-full items-center justify-center rounded-full bg-[#0d1117] text-center font-semibold text-yellow-300">
              Event Loop
            </div>
          </div>
        </div>

        <div className="col-start-5 col-end-7 row-start-2 row-end-6 h-full">
          <BrowserAPIs />
        </div>

        <div className="col-start-3 col-end-5 row-start-5 row-end-7 h-full">
          <TaskQueue />
        </div>
      </div>
    </section>
  )
}

export default RuntimeBoard