const microtaskInsideTimerLesson = {
  id: "microtask-inside-timer",
  title: "Microtask Inside a Timer",
  topicId: "Topic8",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '',
    '  Promise.resolve().then(() => {',
    '    console.log("Microtask");',
    '  });',
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
        "Global enters the Call Stack.",
    },

    {
      id: "print-start",
      lineNumber: 1,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") prints Start synchronously.',
    },

    {
      id: "register-timer",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "setTimeout registers a zero-delay timer with the Browser APIs.",
    },

    {
      id: "print-end",
      lineNumber: 11,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'console.log("End") prints End synchronously.',
    },

    {
      id: "global-exit",
      lineNumber: null,
      type: "POP_STACK",
      label: "Global",
      explanation:
        "The synchronous script has finished, so Global leaves the Call Stack.",
    },

    {
      id: "timer-ready",
      lineNumber: 3,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],
      explanation:
        "After its minimum delay has passed, the Timer Callback becomes ready and enters the Task Queue.",
    },

    {
      id: "timer-to-stack",
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
        "The Call Stack is empty, so the Event Loop moves the Timer Callback to the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The Timer Callback executes and prints Timer.',
    },

    {
      id: "promise-fulfilled",
      lineNumber: 6,
      type: "SYNC_WORK",
      label: "Promise Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "microtask-added",
      lineNumber: 6,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "Because the Promise is already fulfilled, the .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "timer-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },

    {
      id: "microtask-to-stack",
      lineNumber: 6,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Then Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Then Callback",
        },
      ],
      explanation:
        "Before another task can run, the queued microtask moves to the Call Stack.",
    },

    {
      id: "print-microtask",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "Microtask",
      explanation:
        'The .then() callback executes and prints Microtask.',
    },

    {
      id: "microtask-exit",
      lineNumber: 8,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The .then() callback finishes and leaves the Call Stack.",
    },
  ],
}

export default microtaskInsideTimerLesson