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

      {/* Push the stack frames towards the bottom of the box. */}
      <div className="mt-auto text-sm text-slate-400">
        {/* Reverse the visual order so the latest frame appears on top. */}
        <div className="flex flex-col gap-2">
          <AnimatePresence
            // Runs after all removed frames finish their exit animations.
            onExitComplete={() => {
              if (currentTaskQueue.length === 0) {
                setShowEmptyMessage(true)
              }
            }}
          >
            {[...currentTaskQueue].reverse().map((taskQueueItem) => (
              <motion.span
                key={taskQueueItem}
                // Start above the frame's final position.
                // Each higher frame travels a slightly shorter distance.
                initial={{ y: -50  }}

                // Move down into the frame's normal position.
                animate={{ y: 0 }}

                // Move back upward before React removes the frame.
                exit={{ y: 50 }}

                // Control the duration and smoothness of both movements.
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="rounded-md border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-center font-semibold text-sky-200"
              >
                {taskQueueItem}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Show this only after the stack is empty and exits are complete. */}
        {showEmptyMessage && currentTaskQueue.length === 0 && (
          <div>
            <p className="text-center">
              Browser Api is empty
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