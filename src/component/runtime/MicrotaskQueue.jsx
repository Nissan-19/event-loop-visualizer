import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

function MicrotaskQueue({currentMicrotask}) {

  const [showEmptyMessage, setShowEmptyMessage] = useState(true)

  useEffect(() => {
      if (currentMicrotask.length > 0) {
        setShowEmptyMessage(false)
      }
    }, [currentMicrotask.length])


  return (
    <section className="h-full rounded-lg border flex flex-col overflow-hidden border-cyan-500/60 bg-cyan-500/10 p-3 shadow-[inset_0_0_24px_rgba(6,182,212,0.05)]">
      <h3 className="font-semibold text-center text-cyan-300">
        Microtask Queue
      </h3>

      {/* Push the stack frames towards the bottom of the box. */}
      <div className="mt-auto text-sm text-slate-400">
        {/* Reverse the visual order so the latest frame appears on top. */}
        <div className="flex flex-col gap-2">
          <AnimatePresence
            // Runs after all removed frames finish their exit animations.
            onExitComplete={() => {
              if (currentMicrotask.length === 0) {
                setShowEmptyMessage(true)
              }
            }}
          >
            {[...currentMicrotask].reverse().map((microtaskItem) => (
              <motion.span
                key={microtaskItem}
                // Start above the frame's final position.
                // Each higher frame travels a slightly shorter distance.
                initial={{ y: -50   }}

                // Move down into the frame's normal position.
                animate={{ y: 0 }}

                // Move back upward before React removes the frame.
                exit={{ y: 50 }}

                // Control the duration and smoothness of both movements.
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-center font-semibold text-cyan-200"
              >
                {microtaskItem}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Show this only after the stack is empty and exits are complete. */}
        {showEmptyMessage && currentMicrotask.length === 0 && (
          <div>
            <p className="text-center">
              Micro Task is empty
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

export default MicrotaskQueue