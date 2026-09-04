import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

function TaskQueue({currentTaskQueue}) {

  const [showEmptyMessage, setShowEmptyMessage] = useState(true)

  useEffect(() => {
      if (currentTaskQueue.length > 0) {
        setShowEmptyMessage(false)
      }
    }, [currentTaskQueue.length])
 
  return (
    <section className="h-full rounded-lg border flex flex-col overflow-hidden border-orange-500/60 bg-orange-500/10 p-3 shadow-[inset_0_0_24px_rgba(249,115,22,0.05)]">
      <h3 className=" text-center font-semibold text-orange-300">
        Task Queue
      </h3>

      <div className="mt-auto text-sm text-slate-400">
        <div className="flex flex-col gap-2">
          <AnimatePresence
            
            onExitComplete={() => {
              if (currentTaskQueue.length === 0) {
                setShowEmptyMessage(true)
              }
            }}
          >
            {[...currentTaskQueue].reverse().map((taskQueueItem) => (
              <motion.span
                key={taskQueueItem}
                
                initial={{ y: -50  }}

                animate={{ y: 0 }}

                exit={{ y: 50 }}

                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="rounded-md border border-orange-400/40 bg-orange-400/10 px-3 py-2 text-center font-semibold text-orange-200"
              >
                {taskQueueItem}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {showEmptyMessage && currentTaskQueue.length === 0 && (
          <div>
            <p className="text-center">
              Task Queue is empty
            </p>
            <p className="text-center">
              (First In First Out)
            </p>
          </div>
        )}
        </div>
    </section>
  )
}

export default TaskQueue