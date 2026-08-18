const timerAfterSynchronousCodeLesson = {
  id: "timer-after-synchronous-code",
  title: "Timer After Synchronous Code",
  topicId: "Topic2",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '}, 1000);',
    '',
    'console.log("End");',
  ],

  steps: [
    {
      id: "global-enter",
      lineNumber: null,
      type: "PUSH_STACK",
      label: "Global",
      explanation:
        "The Global execution context is created and added to the Call Stack.",
    },

    {
      id: "print-start",
      lineNumber: 1,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") runs synchronously and prints Start.',
    },

    {
      id: "timer-register",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer (1000ms)",
      explanation:
        "setTimeout is called. The browser takes responsibility for the timer and starts counting the 1000ms delay.",
    },

    {
      id: "print-end",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'JavaScript does not wait for the timer. It continues synchronously and prints End.',
    },

    {
      id: "global-exit",
      lineNumber: null,
      type: "POP_STACK",
      label: "Global",
      explanation:
        "The synchronous script has finished, so Global is removed from the Call Stack.",
    },

    {
      id: "timer-complete",
      lineNumber: 5,
      type: "REMOVE_BROWSER_API",
      label: "Timer (1000ms)",
      explanation:
        "The timer delay has completed, so the browser no longer needs to keep the timer in Browser APIs.",
    },

    {
      id: "callback-queued",
      lineNumber: 3,
      type: "ADD_TASK_QUEUE",
      label: "Timer Callback",
      explanation:
        "The timer callback is now ready to run and is placed in the Task Queue.",
    },

    {
      id: "callback-dequeued",
      lineNumber: 3,
      type: "REMOVE_TASK_QUEUE",
      label: "Timer Callback",
      explanation:
        "The Call Stack is empty, so the Event Loop allows the timer callback to leave the Task Queue.",
    },

    {
      id: "callback-enter",
      lineNumber: 3,
      type: "PUSH_STACK",
      label: "Timer Callback",
      explanation:
        "The timer callback is added to the Call Stack and begins executing.",
    },

    {
      id: "print-timer",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The callback executes console.log("Timer") and prints Timer.',
    },

    {
      id: "callback-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The timer callback has finished executing and is removed from the Call Stack.",
    },
  ],
}

export default timerAfterSynchronousCodeLesson