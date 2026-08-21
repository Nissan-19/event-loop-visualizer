const pendingPromiseMultipleThenLesson = {
  id: "pending-promise-multiple-then",
  title: "Pending Promise With Multiple Then Handlers",
  topicId: "Topic4",

  codeLines: [
    'console.log("Start");',
    '',
    'const promise = new Promise((resolve)=>{',
    '  setTimeout(() => {',
    '    resolve("Finished");',
    '  }, 500);',
    '});',
    '',
    'promise.then((value) => {',
    '  console.log("First:", value);',
    '});',
    '',
    'promise.then((value) => {',
    '  console.log("Second:", value);',
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
      id: "create-promise",
      lineNumber: 3,
      type: "SYNC_WORK",
      label: "Create Pending Promise",
      explanation:
        "A new Promise is created. Its executor runs immediately and synchronously, and the Promise begins in the pending state.",
    },

    {
      id: "timer-register",
      lineNumber: 4,
      type: "ADD_BROWSER_API",
      label: "Timer (500ms)",
      explanation:
        "setTimeout registers a 500ms timer with the Browser APIs. The Promise remains pending.",
    },

    {
      id: "attach-first-then",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Attach First Then Handler",
      explanation:
        "The first .then() handler is attached to the pending Promise. Its callback is not scheduled yet because the Promise is still pending.",
    },

    {
      id: "attach-second-then",
      lineNumber: 13,
      type: "SYNC_WORK",
      label: "Attach Second Then Handler",
      explanation:
        "The second .then() handler is attached to the same pending Promise. It also waits for the Promise to become fulfilled.",
    },

    {
      id: "print-end",
      lineNumber: 17,
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
      id: "timer-to-task-queue",
      lineNumber: null,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer (500ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],
      explanation:
        "After the timer reaches its minimum delay, its callback becomes ready and enters the Task Queue.",
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
        "The Call Stack is empty, so the Event Loop moves the Timer callback from the Task Queue onto the Call Stack.",
    },

    {
      id: "resolve-promise",
      lineNumber: 5,
      actions: [
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "First Then Callback",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "Second Then Callback",
        },
      ],
      explanation:
        'resolve("Finished") fulfills the Promise. Both attached .then() callbacks are now scheduled in the Microtask Queue in registration order.',
    },

    {
      id: "timer-callback-exit",
      lineNumber: 6,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer callback finishes and leaves the Call Stack.",
    },

    {
      id: "first-then-to-stack",
      lineNumber: 9,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "First Then Callback",
        },
        {
          type: "PUSH_STACK",
          label: "First Then Callback",
        },
      ],
      explanation:
        "The Microtask Queue is processed in FIFO order, so the first .then() callback moves onto the Call Stack first.",
    },

    {
      id: "print-first",
      lineNumber: 10,
      type: "PRINT_CONSOLE",
      value: "First: Finished",
      explanation:
        'The first .then() callback receives "Finished" and prints "First: Finished".',
    },

    {
      id: "first-then-exit",
      lineNumber: 11,
      type: "POP_STACK",
      label: "First Then Callback",
      explanation:
        "The first .then() callback finishes and leaves the Call Stack.",
    },

    {
      id: "second-then-to-stack",
      lineNumber: 13,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Second Then Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Second Then Callback",
        },
      ],
      explanation:
        "The second .then() callback is now at the front of the Microtask Queue and moves onto the Call Stack.",
    },

    {
      id: "print-second",
      lineNumber: 14,
      type: "PRINT_CONSOLE",
      value: "Second: Finished",
      explanation:
        'The second .then() callback receives the same fulfilled value and prints "Second: Finished".',
    },

    {
      id: "second-then-exit",
      lineNumber: 15,
      type: "POP_STACK",
      label: "Second Then Callback",
      explanation:
        "The second .then() callback finishes and leaves the Call Stack.",
    },
  ],
}

export default pendingPromiseMultipleThenLesson