import CallStack from "./CallStack"
import BrowserAPIs from "./BrowserAPIs"
import TaskQueue from "./TaskQueue"
import MicrotaskQueue from "./MicrotaskQueue"

function RuntimeBoard({currentCallStack, currentStep, lastStep, currentBrowserApi, currentTaskQueue, currentMicrotask }) {
  const progress = currentStep / lastStep
  const progressAngle = progress*360

  return (

    <section className="w-full overflow-hidden rounded-xl border border-slate-700 bg-[#0b1628] p-3 shadow-lg shadow-black/20 lg:min-h-130">
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:min-h-120 lg:grid-cols-6 lg:grid-rows-6">
        <div className="order-4 h-full lg:order-0 lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-3">
          <MicrotaskQueue 
            currentMicrotask = {currentMicrotask}/>
        </div>

        <div className="order-2 h-full lg:order-0 lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-6">
          <CallStack 
            currentCallStack ={currentCallStack}/>
        </div>

        <div className="relative order-1 flex h-full items-center justify-center md:col-span-2 lg:order-0 lg:col-start-3 lg:col-end-5 lg:row-start-3 lg:row-end-5">
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

        <div className="order-3 h-full lg:order-0 lg:col-start-5 lg:col-end-7 lg:row-start-2 lg:row-end-6">
          <BrowserAPIs 
           currentBrowserApi={currentBrowserApi}/>
        </div>

        <div className="order-5 h-full lg:order-0 lg:col-start-3 lg:col-end-5 lg:row-start-5 lg:row-end-7">
          <TaskQueue 
          currentTaskQueue={currentTaskQueue}/>
        </div>
      </div>
    </section>
  )
}

export default RuntimeBoard