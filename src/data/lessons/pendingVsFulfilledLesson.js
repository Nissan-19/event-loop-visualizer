const pendingVsFulfilledLesson = {
  id: "pending-vs-fulfilled",
  title: "Pending vs Already-Fulfilled",
  topicId: "Topic5",

  codeLines: [
    'console.log("Start");',
    '',
    'const promise1 = new Promise((resolve) => {',
    '  setTimeout(() => {',
    '    resolve("Delayed finished");',
    '  }, 0);',
    '});',
    '',
    'promise1.then((value) => {',
    '  console.log(value);',
    '});',
    '',
    'const promise2 = Promise.resolve(',
    '  "Already fulfilled"',
    ');',
    '',
    'promise2.then((value) => {',
    '  console.log(value);',
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
      id: "create-promise-1",
      lineNumber: 3,
      type: "SYNC_WORK",
      label: "Create Promise 1",
      explanation:
        "promise1 is created. Its executor runs immediately and synchronously, and the Promise begins in the pending state.",
    },

    {
      id: "register-timer",
      lineNumber: 4,
      type: "ADD_BROWSER_API",
      label: "Timer (0ms)",
      explanation:
        "setTimeout registers a zero-delay timer with the Browser APIs. promise1 remains pending.",
    },

    {
      id: "attach-promise-1-handler",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Attach Promise 1 Handler",
      explanation:
        "A .then() handler is attached to promise1. Because promise1 is still pending, its callback is not scheduled in the Microtask Queue yet.",
    },

    {
      id: "create-promise-2",
      lineNumber: 13,
      type: "SYNC_WORK",
      label: "Create Promise 2",
      explanation:
        'promise2 is created already fulfilled with the value "Already fulfilled".',
    },

    {
      id: "promise-2-to-microtask",
      lineNumber: 17,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 2 Callback",
      explanation:
        "Because promise2 is already fulfilled, its .then() callback is scheduled immediately in the Microtask Queue.",
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
        "The zero-delay timer becomes ready and its callback enters the Task Queue.",
    },

    {
      id: "print-end",
      lineNumber: 21,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'JavaScript continues synchronously and console.log("End") prints End.',
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
      id: "promise-2-to-stack",
      lineNumber: 17,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Promise 2 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Promise 2 Callback",
        },
      ],
      explanation:
        "The Call Stack is empty. Microtasks are processed before tasks, so Promise 2's callback moves onto the Call Stack first.",
    },

    {
      id: "print-promise-2",
      lineNumber: 18,
      type: "PRINT_CONSOLE",
      value: "Already fulfilled",
      explanation:
        'Promise 2\'s fulfilled value is received as value and "Already fulfilled" is printed.',
    },

    {
      id: "promise-2-exit",
      lineNumber: 19,
      type: "POP_STACK",
      label: "Promise 2 Callback",
      explanation:
        "Promise 2's callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 4,
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
        "The Microtask Queue is empty, so the Event Loop moves the Timer callback from the Task Queue onto the Call Stack.",
    },

    {
      id: "resolve-promise-1",
      lineNumber: 5,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 1 Callback",
      explanation:
        'resolve("Delayed finished") fulfills promise1. Its previously attached .then() callback is now scheduled in the Microtask Queue.',
    },

    {
      id: "timer-exit",
      lineNumber: 6,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer callback finishes and leaves the Call Stack.",
    },

    {
      id: "promise-1-to-stack",
      lineNumber: 9,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Promise 1 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Promise 1 Callback",
        },
      ],
      explanation:
        "The Call Stack is empty, so Promise 1's waiting microtask moves onto the Call Stack.",
    },

    {
      id: "print-promise-1",
      lineNumber: 10,
      type: "PRINT_CONSOLE",
      value: "Delayed finished",
      explanation:
        'Promise 1\'s fulfilled value is received as value and "Delayed finished" is printed.',
    },

    {
      id: "promise-1-exit",
      lineNumber: 11,
      type: "POP_STACK",
      label: "Promise 1 Callback",
      explanation:
        "Promise 1's callback finishes and leaves the Call Stack.",
    },
  ],
}

export default pendingVsFulfilledLesson