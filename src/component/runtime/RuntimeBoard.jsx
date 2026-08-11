import CallStack from "./CallStack"
import BrowserAPIs from "./BrowserAPIs"
import TaskQueue from "./TaskQueue"
import MicrotaskQueue from "./MicrotaskQueue"

function RuntimeBoard() {
  return (
    <section className="w-full border border-slate-300 min-h-140 rounded-xl p-2">
        <h2>
            JavaScript Runtime
        </h2>

        <div className="grid min-h-120 grid-cols-6 grid-rows-6 gap-6">

          <div className="col-start-3 col-end-5 row-start-1 row-end-3 h-full ">
            <MicrotaskQueue/>
          </div>     

          <div className="col-start-1 col-end-3 row-start-2 row-end-6 h-full ">
            <CallStack />
          </div>

          <div className="col-start-3 row-start-3 col-end-5 row-end-5 h-full flex items-center justify-center">
            <div className="flex size-30 items-center justify-center border-4 rounded-full border-slate-400 text-center font-semibold">
              event loop
            </div>
          </div>

          <div className="col-start-5 col-end-7 row-start-2 row-end-6 h-full">  
            <BrowserAPIs/>
          </div>  

          <div className="col-start-3 col-end-5 row-start-5 row-end-7 h-full">
            <TaskQueue/>
          </div>

        </div>

    </section>
  )
}

export default RuntimeBoard
