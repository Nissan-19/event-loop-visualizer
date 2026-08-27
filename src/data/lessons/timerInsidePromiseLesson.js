const timerInsidePromiseLesson = {
  id: "timer-inside-promise",
  title: "Timer Inside a Promise",
  topicId: "Topic8",

  codeLines: [
    'console.log("Start");',
    '',
    'Promise.resolve().then(() => {',
    '  console.log("Promise");',
    '',
    '  setTimeout(() => {',
    '    console.log("Timer");',
    '  }, 0);',
    '});',
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
      id: "promise-fulfilled",
      lineNumber: 3,
      type: "SYNC_WORK",
      label: "Promise Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "then-to-microtask",
      lineNumber: 3,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "Because the Promise is already fulfilled, the .then() callback is scheduled in the Microtask Queue.",
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
        "The synchronous script finishes and Global leaves the Call Stack.",
    },

    {
      id: "then-to-stack",
      lineNumber: 3,
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
        "The Then Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-promise",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The .then() callback executes and prints Promise.',
    },

    {
      id: "register-timer",
      lineNumber: 6,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "While the .then() callback is running, setTimeout registers a zero-delay timer with the Browser APIs.",
    },

    {
      id: "then-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The Then Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-ready",
      lineNumber: 6,
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
      lineNumber: 6,
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
        "The Call Stack is empty, so the Event Loop moves the Timer Callback from the Task Queue to the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The Timer Callback executes and prints Timer.',
    },

    {
      id: "timer-exit",
      lineNumber: 8,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default timerInsidePromiseLesson