const asyncContinuationBeforeThenLesson = {
  id: "async-continuation-before-then",
  title: "Async Continuation Before Then Callback",
  topicId: "Topic8",

  codeLines: [
    'console.log("Start");',
    '',
    'async function checkSequence() {',
    '  console.log("Async 1");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("Async 2");',
    '}',
    '',
    'checkSequence();',
    '',
    'Promise.resolve().then(() => {',
    '  console.log("Promise");',
    '});',
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
        'console.log("Start") executes synchronously and prints Start.',
    },

    {
      id: "check-sequence-enter",
      lineNumber: 11,
      type: "PUSH_STACK",
      label: "checkSequence",
      explanation:
        "checkSequence() is called. Because it is async, it returns a Promise and begins executing synchronously.",
    },

    {
      id: "print-async-one",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Async 1",
      explanation:
        'console.log("Async 1") prints Async 1 synchronously.',
    },

    {
      id: "await-fulfilled",
      lineNumber: 6,
      type: "SYNC_WORK",
      label: "Await Fulfilled Promise",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "suspend-check-sequence",
      lineNumber: 6,
      actions: [
        {
          type: "POP_STACK",
          label: "checkSequence",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "checkSequence Continuation",
        },
      ],
      explanation:
        "await suspends checkSequence. Because the awaited Promise is already fulfilled, its continuation is scheduled in the Microtask Queue.",
    },

    {
      id: "create-fulfilled-promise",
      lineNumber: 13,
      type: "SYNC_WORK",
      label: "Promise Fulfilled",
      explanation:
        "Promise.resolve() creates another already-fulfilled Promise.",
    },

    {
      id: "then-to-microtask",
      lineNumber: 13,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "The .then() callback is scheduled in the Microtask Queue after the checkSequence continuation.",
    },

    {
      id: "register-timer",
      lineNumber: 17,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "setTimeout registers a zero-delay timer with the Browser APIs.",
    },

    {
      id: "print-end",
      lineNumber: 21,
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
      lineNumber: 17,
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
        "The timer has reached its minimum delay, so the Timer Callback enters the Task Queue.",
    },

    {
      id: "continuation-to-stack",
      lineNumber: 6,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "checkSequence Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "checkSequence Continuation",
        },
      ],
      explanation:
        "The checkSequence continuation was scheduled first, so it moves to the Call Stack before the Then Callback.",
    },

    {
      id: "print-async-two",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Async 2",
      explanation:
        'checkSequence resumes after await and prints Async 2.',
    },

    {
      id: "async-complete",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Async Promise Fulfilled",
      explanation:
        "checkSequence finishes normally, so the Promise returned by the async function becomes fulfilled with undefined.",
    },

    {
      id: "continuation-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "checkSequence Continuation",
      explanation:
        "The checkSequence continuation finishes and leaves the Call Stack.",
    },

    {
      id: "then-to-stack",
      lineNumber: 13,
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
        "The next microtask is the Then Callback, so it moves to the Call Stack.",
    },

    {
      id: "print-promise",
      lineNumber: 14,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The .then() callback executes and prints Promise.',
    },

    {
      id: "then-exit",
      lineNumber: 15,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The Then Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 17,
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
      lineNumber: 18,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The Timer Callback executes and prints Timer.',
    },

    {
      id: "timer-exit",
      lineNumber: 19,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default asyncContinuationBeforeThenLesson