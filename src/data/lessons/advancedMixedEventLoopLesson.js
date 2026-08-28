const advancedMixedEventLoopLesson = {
  id: "advanced-mixed-event-loop",
  title: "Advanced Mixed Event Loop",
  topicId: "Topic8",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer 1");',
    '',
    '  Promise.resolve().then(() => {',
    '    console.log("Promise 3");',
    '  });',
    '}, 10000);',
    '',
    'Promise.resolve()',
    '  .then(() => {',
    '    console.log("Promise 1");',
    '',
    '    setTimeout(() => {',
    '      console.log("Timer 2");',
    '    }, 0);',
    '  })',
    '  .then(() => {',
    '    console.log("Promise 2");',
    '  });',
    '',
    'async function processData() {',
    '  console.log("Async 1");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("Async 2");',
    '}',
    '',
    'processData();',
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
      id: "register-timer-one",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer 1",
      explanation:
        "setTimeout registers Timer 1 with the Browser APIs. Its minimum delay is 10000ms.",
    },

    {
      id: "first-promise-fulfilled",
      lineNumber: 11,
      type: "SYNC_WORK",
      label: "Promise 1 Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "promise-one-to-microtask",
      lineNumber: 12,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 1 Callback",
      explanation:
        "The first .then() callback is scheduled in the Microtask Queue because the Promise is already fulfilled.",
    },

    {
      id: "process-data-enter",
      lineNumber: 31,
      type: "PUSH_STACK",
      label: "processData",
      explanation:
        "processData() is called. Because it is async, it returns a Promise and begins executing synchronously.",
    },

    {
      id: "print-async-one",
      lineNumber: 24,
      type: "PRINT_CONSOLE",
      value: "Async 1",
      explanation:
        'processData prints "Async 1" synchronously.',
    },

    {
      id: "await-fulfilled",
      lineNumber: 26,
      type: "SYNC_WORK",
      label: "Await Fulfilled Promise",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise for await.",
    },

    {
      id: "suspend-process-data",
      lineNumber: 26,
      actions: [
        {
          type: "POP_STACK",
          label: "processData",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "processData Continuation",
        },
      ],
      explanation:
        "await suspends processData. Because the awaited Promise is already fulfilled, its continuation is scheduled in the Microtask Queue after Promise 1 Callback.",
    },

    {
      id: "print-end",
      lineNumber: 33,
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
        "The initial synchronous script has finished, so Global leaves the Call Stack.",
    },

    {
      id: "promise-one-to-stack",
      lineNumber: 12,
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
        "Promise 1 Callback was the first queued microtask, so it moves to the Call Stack.",
    },

    {
      id: "print-promise-one",
      lineNumber: 13,
      type: "PRINT_CONSOLE",
      value: "Promise 1",
      explanation:
        'The first .then() callback prints "Promise 1".',
    },

    {
      id: "register-timer-two",
      lineNumber: 15,
      type: "ADD_BROWSER_API",
      label: "Timer 2",
      explanation:
        "While Promise 1 Callback is running, Timer 2 is registered with the Browser APIs with a minimum delay of 0ms.",
    },

    {
      id: "first-then-complete",
      lineNumber: 18,
      type: "SYNC_WORK",
      label: "Chained Promise Fulfilled",
      explanation:
        "The first .then() callback finishes normally. The Promise returned by that .then() becomes fulfilled.",
    },

    {
      id: "promise-two-to-microtask",
      lineNumber: 19,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 2 Callback",
      explanation:
        "The second .then() was already attached to the Promise returned by the first .then(). That Promise is now fulfilled, so Promise 2 Callback is added to the end of the Microtask Queue.",
    },

    {
      id: "promise-one-exit",
      lineNumber: 18,
      type: "POP_STACK",
      label: "Promise 1 Callback",
      explanation:
        "Promise 1 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "continuation-to-stack",
      lineNumber: 26,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "processData Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "processData Continuation",
        },
      ],
      explanation:
        "processData Continuation was already waiting ahead of Promise 2 Callback, so it runs next.",
    },

    {
      id: "print-async-two",
      lineNumber: 28,
      type: "PRINT_CONSOLE",
      value: "Async 2",
      explanation:
        'processData resumes after await and prints "Async 2".',
    },

    {
      id: "process-data-complete",
      lineNumber: 29,
      type: "SYNC_WORK",
      label: "Async Promise Fulfilled",
      explanation:
        "processData finishes normally, so the Promise returned by the async function becomes fulfilled with undefined.",
    },

    {
      id: "continuation-exit",
      lineNumber: 29,
      type: "POP_STACK",
      label: "processData Continuation",
      explanation:
        "The processData continuation finishes and leaves the Call Stack.",
    },

    {
      id: "timer-two-ready",
      lineNumber: 15,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer 2",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer 2 Callback",
        },
      ],
      explanation:
        "Timer 2 has reached its minimum delay and becomes ready in the Task Queue. The remaining microtask still runs first.",
    },

    {
      id: "promise-two-to-stack",
      lineNumber: 19,
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
        "Promise 2 Callback is the remaining microtask, so it moves to the Call Stack before Timer 2 can execute.",
    },

    {
      id: "print-promise-two",
      lineNumber: 20,
      type: "PRINT_CONSOLE",
      value: "Promise 2",
      explanation:
        'The second .then() callback prints "Promise 2".',
    },

    {
      id: "promise-two-exit",
      lineNumber: 21,
      type: "POP_STACK",
      label: "Promise 2 Callback",
      explanation:
        "Promise 2 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-two-to-stack",
      lineNumber: 15,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Timer 2 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Timer 2 Callback",
        },
      ],
      explanation:
        "The Microtask Queue is empty, so the Event Loop moves Timer 2 Callback from the Task Queue to the Call Stack.",
    },

    {
      id: "print-timer-two",
      lineNumber: 16,
      type: "PRINT_CONSOLE",
      value: "Timer 2",
      explanation:
        'Timer 2 Callback prints "Timer 2".',
    },

    {
      id: "timer-two-exit",
      lineNumber: 17,
      type: "POP_STACK",
      label: "Timer 2 Callback",
      explanation:
        "Timer 2 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-one-ready",
      lineNumber: 3,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer 1",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer 1 Callback",
        },
      ],
      explanation:
        "Much later, Timer 1 reaches its 10000ms minimum delay and its callback enters the Task Queue.",
    },

    {
      id: "timer-one-to-stack",
      lineNumber: 3,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Timer 1 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Timer 1 Callback",
        },
      ],
      explanation:
        "The Event Loop moves Timer 1 Callback from the Task Queue to the empty Call Stack.",
    },

    {
      id: "print-timer-one",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer 1",
      explanation:
        'Timer 1 Callback prints "Timer 1".',
    },

    {
      id: "promise-three-fulfilled",
      lineNumber: 6,
      type: "SYNC_WORK",
      label: "Promise 3 Fulfilled",
      explanation:
        "Inside Timer 1 Callback, Promise.resolve() creates another already-fulfilled Promise.",
    },

    {
      id: "promise-three-to-microtask",
      lineNumber: 6,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 3 Callback",
      explanation:
        "The .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "timer-one-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Timer 1 Callback",
      explanation:
        "Timer 1 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "promise-three-to-stack",
      lineNumber: 6,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Promise 3 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Promise 3 Callback",
        },
      ],
      explanation:
        "Before another task can run, Promise 3 Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-promise-three",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "Promise 3",
      explanation:
        'Promise 3 Callback prints "Promise 3".',
    },

    {
      id: "promise-three-exit",
      lineNumber: 8,
      type: "POP_STACK",
      label: "Promise 3 Callback",
      explanation:
        "Promise 3 Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default advancedMixedEventLoopLesson