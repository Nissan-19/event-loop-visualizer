import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

function BrowserAPIs({currentBrowserApi}) {


  const [showEmptyMessage, setShowEmptyMessage] = useState(true)

  useEffect(() => {
      if (currentBrowserApi.length > 0) {
        setShowEmptyMessage(false)
      }
    }, [currentBrowserApi.length])
  

  return (
    <section className="h-full rounded-lg flex flex-col overflow-hidden border border-purple-500/60 bg-purple-500/10 p-3 shadow-[inset_0_0_24px_rgba(168,85,247,0.05)]">
      <h3 className="text-center font-semibold text-purple-300">
        Browser APIs
      </h3>

      {/* Push the stack frames towards the bottom of the box. */}
      <div className="mt-auto text-sm text-slate-400">
        {/* Reverse the visual order so the latest frame appears on top. */}
        <div className="flex flex-col gap-2">
          <AnimatePresence
            // Runs after all removed frames finish their exit animations.
            onExitComplete={() => {
              if (currentBrowserApi.length === 0) {
                setShowEmptyMessage(true)
              }
            }}
          >
            {[...currentBrowserApi].reverse().map((browserApisItem, index) => (//making a copy of the array and reversing it so that visually it moves downward
              <motion.span
                key={browserApisItem}
                // Start above the frame's final position.
                // Each higher frame travels a slightly shorter distance.
                initial={{ y: -220 }}

                // Move down into the frame's normal position.
                animate={{ y: 0 }}

                // Move back upward before React removes the frame.
                exit={{ y: 220 }}

                // Control the duration and smoothness of both movements.
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="rounded-md border border-purple-400/40 bg-purple-400/10 px-3 py-2 text-center font-semibold text-purple-200"
              >
                {browserApisItem}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Show this only after the stack is empty and exits are complete. */}
        {showEmptyMessage && currentBrowserApi.length === 0 && (
          <div>
            <p className="text-center ">
              Browser Api is empty
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BrowserAPIs