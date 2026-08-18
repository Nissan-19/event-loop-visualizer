// Motion provides animated elements and supports exit animations.
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

function CallStack({ currentCallStack }) {
  // Controls when the empty-stack message is allowed to appear.
  // It remains false while stack frames are completing their exit animation.
  const [showEmptyMessage, setShowEmptyMessage] = useState(true)

  // Hide the empty message whenever the stack contains at least one frame.
  useEffect(() => {
    if (currentCallStack.length > 0) {
      setShowEmptyMessage(false)
    }
  }, [currentCallStack.length])

  return (
    // overflow-hidden prevents moving frames from appearing outside the box.
    <section className="flex h-full flex-col overflow-hidden rounded-lg border border-sky-500/60 bg-sky-500/10 p-3 shadow-[inset_0_0_24px_rgba(14,165,233,0.05)]">
      <h3 className="text-center font-semibold text-sky-300">
        Call Stack
      </h3>

      {/* Push the stack frames towards the bottom of the box. */}
      <div className="mt-auto text-sm text-slate-400">
        {/* Reverse the visual order so the latest frame appears on top. */}
        <div className="flex flex-col-reverse gap-2">
          <AnimatePresence
            // Runs after all removed frames finish their exit animations.
            onExitComplete={() => {
              if (currentCallStack.length === 0) {
                setShowEmptyMessage(true)
              }
            }}
          >
            {currentCallStack.map((stackFrame, index) => (
              <motion.span
                key={index}
                // Start above the frame's final position.
                // Each higher frame travels a slightly shorter distance.
                initial={{ y: -220 + index * 46 }}

                // Move down into the frame's normal position.
                animate={{ y: 0 }}

                // Move back upward before React removes the frame.
                exit={{ y: -220 + index * 46 }}

                // Control the duration and smoothness of both movements.
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="rounded-md border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-center font-semibold text-sky-200"
              >
                {stackFrame}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Show this only after the stack is empty and exits are complete. */}
        {showEmptyMessage && currentCallStack.length === 0 && (
          <div>
            <p className="text-center">
              Call Stack is empty
            </p>
            <p className="text-center">
              (Last In First Out)
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CallStack