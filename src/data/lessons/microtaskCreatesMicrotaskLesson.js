const microtaskCreatesMicrotaskLesson = {
  id: "microtask-creates-microtask",
  title: "Microtask Creating Another Microtask",
  topicId: "Topic8",

  codeLines: [
    'console.log("Start");',
    '',
    'Promise.resolve().then(() => {',
    '  console.log("Promise 1");',
    '',
    '  Promise.resolve().then(() => {',
    '    console.log("Promise 2");',
    '  });',
    '});',
    '',
    'async function processOrder() {',
    '  console.log("Async 1");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("Async 2");',
    '}',
    '',
    'processOrder();',
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
      id: "promise-one-fulfilled",
      lineNumber: 3,
      type: "SYNC_WORK",
      label: "Promise 1 Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "promise-one-to-microtask",
      lineNumber: 3,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 1 Callback",
      explanation:
        "Because the Promise is already fulfilled, its .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "process-order-enter",
      lineNumber: 19,
      type: "PUSH_STACK",
      label: "processOrder",
      explanation:
        "processOrder() is called. The async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "print-async-one",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "Async 1",
      explanation:
        'console.log("Async 1") prints Async 1.',
    },

    {
      id: "await-fulfilled",
      lineNumber: 14,
      type: "SYNC_WORK",
      label: "Await Fulfilled Promise",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "suspend-process-order",
      lineNumber: 14,
      actions: [
        {
          type: "POP_STACK",
          label: "processOrder",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "processOrder Continuation",
        },
      ],
      explanation:
        "await suspends processOrder. Because the awaited Promise is already fulfilled, its continuation is scheduled after the already-queued Promise 1 Callback.",
    },

    {
      id: "register-timer",
      lineNumber: 21,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "setTimeout registers a zero-delay timer with the Browser APIs.",
    },

    {
      id: "print-end",
      lineNumber: 25,
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
      id: "timer-ready",
      lineNumber: 21,
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
        "The timer has reached its minimum delay, so the Timer Callback enters the Task Queue. The queued microtasks still run first.",
    },

    {
      id: "promise-one-to-stack",
      lineNumber: 3,
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
        "Promise 1 Callback was the first scheduled microtask, so it moves to the Call Stack.",
    },

    {
      id: "print-promise-one",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Promise 1",
      explanation:
        'The callback executes and prints Promise 1.',
    },

    {
      id: "promise-two-fulfilled",
      lineNumber: 6,
      type: "SYNC_WORK",
      label: "Promise 2 Fulfilled",
      explanation:
        "While Promise 1 Callback is executing, Promise.resolve() creates another already-fulfilled Promise.",
    },

    {
      id: "promise-two-to-microtask",
      lineNumber: 6,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 2 Callback",
      explanation:
        "The new .then() callback is added to the end of the Microtask Queue. processOrder Continuation is already waiting ahead of it.",
    },

    {
      id: "promise-one-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Promise 1 Callback",
      explanation:
        "Promise 1 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "continuation-to-stack",
      lineNumber: 14,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "processOrder Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "processOrder Continuation",
        },
      ],
      explanation:
        "processOrder Continuation was already waiting in the Microtask Queue, so it executes before Promise 2 Callback.",
    },

    {
      id: "print-async-two",
      lineNumber: 16,
      type: "PRINT_CONSOLE",
      value: "Async 2",
      explanation:
        'processOrder resumes after await and prints Async 2.',
    },

    {
      id: "process-order-complete",
      lineNumber: 17,
      type: "SYNC_WORK",
      label: "Async Promise Fulfilled",
      explanation:
        "processOrder finishes normally, so the Promise returned by the async function becomes fulfilled with undefined.",
    },

    {
      id: "continuation-exit",
      lineNumber: 17,
      type: "POP_STACK",
      label: "processOrder Continuation",
      explanation:
        "The processOrder continuation finishes and leaves the Call Stack.",
    },

    {
      id: "promise-two-to-stack",
      lineNumber: 6,
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
        "Promise 2 Callback is now the next microtask and moves to the Call Stack.",
    },

    {
      id: "print-promise-two",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "Promise 2",
      explanation:
        'The callback executes and prints Promise 2.',
    },

    {
      id: "promise-two-exit",
      lineNumber: 8,
      type: "POP_STACK",
      label: "Promise 2 Callback",
      explanation:
        "Promise 2 Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 21,
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
        "The Microtask Queue is now empty, so the Event Loop moves the Timer Callback from the Task Queue to the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 22,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The Timer Callback executes and prints Timer.',
    },

    {
      id: "timer-exit",
      lineNumber: 23,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default microtaskCreatesMicrotaskLesson