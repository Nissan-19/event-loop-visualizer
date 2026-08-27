const promiseChainWithTimerLesson = {
  id: "promise-chain-with-timer",
  title: "Promise Chain With a Timer",
  topicId: "Topic8",

  codeLines: [
    'console.log("Start");',
    '',
    'Promise.resolve()',
    '  .then(() => {',
    '    console.log("Promise 1");',
    '',
    '    setTimeout(() => {',
    '      console.log("Timer");',
    '    }, 0);',
    '  })',
    '  .then(() => {',
    '    console.log("Promise 2");',
    '  });',
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
      id: "create-first-promise",
      lineNumber: 3,
      type: "SYNC_WORK",
      label: "Promise A Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "first-then-to-microtask",
      lineNumber: 4,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 1 Callback",
      explanation:
        "The first .then() is attached to the fulfilled Promise, so its callback is scheduled in the Microtask Queue.",
    },

    {
      id: "attach-second-then",
      lineNumber: 11,
      type: "SYNC_WORK",
      label: "Attach Second Then",
      explanation:
        "The first .then() returns a new Promise. The second .then() is attached to that new Promise, which is still pending, so Promise 2 Callback is not scheduled yet.",
    },

    {
      id: "print-end",
      lineNumber: 15,
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
        "Synchronous execution finishes and Global leaves the Call Stack.",
    },

    {
      id: "first-then-to-stack",
      lineNumber: 4,
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
        "Promise 1 Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-promise-one",
      lineNumber: 5,
      type: "PRINT_CONSOLE",
      value: "Promise 1",
      explanation:
        'The first .then() callback executes and prints Promise 1.',
    },

    {
      id: "register-timer",
      lineNumber: 7,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "While Promise 1 Callback is executing, setTimeout registers a zero-delay timer with the Browser APIs.",
    },

    {
      id: "first-then-complete",
      lineNumber: 10,
      type: "SYNC_WORK",
      label: "Promise B Fulfilled",
      explanation:
        "The first .then() callback finishes normally and returns undefined, so the Promise returned by that .then() becomes fulfilled with undefined.",
    },

    {
      id: "second-then-to-microtask",
      lineNumber: 11,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 2 Callback",
      explanation:
        "Now that the Promise returned by the first .then() is fulfilled, the already-attached second .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "first-then-exit",
      lineNumber: 10,
      type: "POP_STACK",
      label: "Promise 1 Callback",
      explanation:
        "Promise 1 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-ready",
      lineNumber: 7,
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
        "The timer reaches its minimum delay, so the Timer Callback becomes ready and enters the Task Queue.",
    },

    {
      id: "second-then-to-stack",
      lineNumber: 11,
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
        "The Microtask Queue is processed before the next task, so Promise 2 Callback moves to the Call Stack before the Timer Callback.",
    },

    {
      id: "print-promise-two",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "Promise 2",
      explanation:
        'The second .then() callback executes and prints Promise 2.',
    },

    {
      id: "second-then-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "Promise 2 Callback",
      explanation:
        "Promise 2 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 7,
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
        "The Microtask Queue is empty, so the Event Loop moves the Timer Callback from the Task Queue to the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The Timer Callback executes and prints Timer.',
    },

    {
      id: "timer-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default promiseChainWithTimerLesson