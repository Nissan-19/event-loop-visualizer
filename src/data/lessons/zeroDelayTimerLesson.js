const zeroDelayTimerLesson = {
  id: "zero-delay-timer",
  title: "Zero-Delay Timer",
  topicId: "Topic2",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '}, 0);',
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
        'console.log("Start") executes synchronously and prints Start.',
    },

    {
      id: "timer-register",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer (0ms)",
      explanation:
        "setTimeout is called with a 0ms delay. The browser handles the timer, but the callback does not run immediately.",
    },

    {
      id: "print-end",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'JavaScript continues executing synchronously, so console.log("End") prints End before the timer callback runs.',
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
      id: "timer-to-task-queue",
      lineNumber: null,

      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer (0ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],

      explanation:
        "The timer is ready, so the browser removes it from Browser APIs and places its callback into the Task Queue.",
    },

    {
      id: "task-queue-to-stack",
      lineNumber: 3,

      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Timer Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Timer Callback",
        },
      ],

      explanation:
        "The Call Stack is empty, so the Event Loop moves the timer callback from the Task Queue onto the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The timer callback executes and console.log("Timer") prints Timer.',
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

export default zeroDelayTimerLesson