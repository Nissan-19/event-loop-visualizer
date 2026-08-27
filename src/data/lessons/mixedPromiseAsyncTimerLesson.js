const mixedPromiseAsyncTimerLesson = {
  id: "mixed-promise-async-timer",
  title: "Promise, Async/Await and Timer",
  topicId: "Topic8",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '}, 0);',
    '',
    'Promise.resolve().then(() => {',
    '  console.log("Promise");',
    '});',
    '',
    'async function showOrder() {',
    '  console.log("Async 1");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("Async 2");',
    '}',
    '',
    'showOrder();',
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
        'console.log("Start") executes synchronously and prints Start.',
    },

    {
      id: "register-timer",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "setTimeout registers a zero-delay timer with the Browser APIs. The callback cannot run until the current synchronous work has finished.",
    },

    {
      id: "promise-fulfilled",
      lineNumber: 7,
      type: "SYNC_WORK",
      label: "Promise Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "then-to-microtask",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "Because the Promise is already fulfilled, the attached .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "show-order-enter",
      lineNumber: 19,
      type: "PUSH_STACK",
      label: "showOrder",
      explanation:
        "showOrder() is called. The async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "print-async-one",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "Async 1",
      explanation:
        'console.log("Async 1") prints Async 1 synchronously.',
    },

    {
      id: "await-fulfilled",
      lineNumber: 14,
      type: "SYNC_WORK",
      label: "Await Fulfilled Promise",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise. await can still await an already-fulfilled Promise.",
    },

    {
      id: "suspend-show-order",
      lineNumber: 14,
      actions: [
        {
          type: "POP_STACK",
          label: "showOrder",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "showOrder Continuation",
        },
      ],
      explanation:
        "await suspends showOrder. Because the awaited Promise is already fulfilled, the function's continuation is scheduled in the Microtask Queue.",
    },

    {
      id: "print-end",
      lineNumber: 21,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'Global execution continues and console.log("End") prints End.',
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
        "The timer has reached its minimum delay, so its callback becomes ready and enters the Task Queue.",
    },

    {
      id: "then-to-stack",
      lineNumber: 7,
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
        "Microtasks run before the next task. The Then Callback was scheduled first, so it moves to the Call Stack first.",
    },

    {
      id: "print-promise",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The .then() callback executes and prints Promise.',
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
      id: "continuation-to-stack",
      lineNumber: 14,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "showOrder Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "showOrder Continuation",
        },
      ],
      explanation:
        "The next microtask is the showOrder continuation, so it moves to the Call Stack.",
    },

    {
      id: "print-async-two",
      lineNumber: 16,
      type: "PRINT_CONSOLE",
      value: "Async 2",
      explanation:
        'showOrder resumes after await and prints Async 2.',
    },

    {
      id: "show-order-complete",
      lineNumber: 17,
      type: "SYNC_WORK",
      label: "Async Promise Fulfilled",
      explanation:
        "showOrder finishes normally, so the Promise returned by the async function becomes fulfilled with undefined.",
    },

    {
      id: "continuation-exit",
      lineNumber: 17,
      type: "POP_STACK",
      label: "showOrder Continuation",
      explanation:
        "The showOrder continuation finishes and leaves the Call Stack.",
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
        "The Microtask Queue is empty, so the Event Loop can now move the Timer Callback from the Task Queue to the Call Stack.",
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
      id: "timer-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default mixedPromiseAsyncTimerLesson