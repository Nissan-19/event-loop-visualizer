const pendingToFulfilledReturnLesson = {
  id: "pending-to-fulfilled-return",
  title: "Pending to Fulfilled Return",
  topicId: "Topic7",

  codeLines: [
    'console.log("Start");',
    '',
    'async function prepareResult() {',
    '  const value = await new Promise(',
    '    (resolve) => {',
    '      setTimeout(() => {',
    '        resolve("Loaded");',
    '      }, 1000);',
    '    }',
    '  );',
    '',
    '  return value;',
    '}',
    '',
    'prepareResult().then((result) => {',
    '  console.log(result);',
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
        'console.log("Start") prints Start.',
    },

    {
      id: "prepare-result-enter",
      lineNumber: 15,
      type: "PUSH_STACK",
      label: "prepareResult",
      explanation:
        "prepareResult() is called. Because it is async, it returns a Promise. That returned Promise is currently pending.",
    },

    {
      id: "create-promise",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: "Create Pending Promise",
      explanation:
        "A new Promise is created. Its executor runs immediately and synchronously.",
    },

    {
      id: "register-timer",
      lineNumber: 6,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "setTimeout registers a timer with the Browser APIs for a minimum delay of 1000ms. resolve() has not executed yet, so the awaited Promise remains pending.",
    },

    {
      id: "await-pending",
      lineNumber: 4,
      type: "POP_STACK",
      label: "prepareResult",
      explanation:
        "await encounters the pending Promise, so prepareResult is suspended. Its continuation is not scheduled in the Microtask Queue yet.",
    },

    {
      id: "attach-then",
      lineNumber: 15,
      type: "SYNC_WORK",
      label: "Attach Then Handler",
      explanation:
        "The .then() handler is attached to the Promise returned by prepareResult. That Promise is still pending, so the callback is not scheduled yet.",
    },

    {
      id: "print-end",
      lineNumber: 19,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'console.log("End") prints End.',
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
        "After the minimum delay has passed, the Timer Callback becomes ready and enters the Task Queue.",
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
      id: "resolve-awaited-promise",
      lineNumber: 7,
      type: "SYNC_WORK",
      label: 'Resolve: "Loaded"',
      explanation:
        'resolve("Loaded") executes. The Promise being awaited changes from pending to fulfilled with the fulfilment value "Loaded".',
    },

    {
      id: "schedule-continuation",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "prepareResult Continuation",
      explanation:
        "Because the awaited Promise is now fulfilled, the suspended prepareResult continuation is scheduled in the Microtask Queue.",
    },

    {
      id: "timer-exit",
      lineNumber: 8,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },

    {
      id: "continuation-to-stack",
      lineNumber: 4,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "prepareResult Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "prepareResult Continuation",
        },
      ],
      explanation:
        "The prepareResult continuation moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "await-value",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: 'value = "Loaded"',
      explanation:
        'When prepareResult resumes, await produces the fulfilment value "Loaded", so value becomes "Loaded".',
    },

    {
      id: "return-value",
      lineNumber: 12,
      type: "SYNC_WORK",
      label: 'Return "Loaded"',
      explanation:
        'prepareResult returns value. Its own returned Promise now becomes fulfilled with "Loaded".',
    },

    {
      id: "schedule-then",
      lineNumber: 15,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "The Promise returned by prepareResult is now fulfilled, so the already-attached .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "continuation-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "prepareResult Continuation",
      explanation:
        "prepareResult has finished, so its continuation leaves the Call Stack.",
    },

    {
      id: "then-to-stack",
      lineNumber: 15,
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
        "The .then() callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-loaded",
      lineNumber: 16,
      type: "PRINT_CONSOLE",
      value: "Loaded",
      explanation:
        'The .then() callback receives "Loaded" as result and prints it.',
    },

    {
      id: "then-exit",
      lineNumber: 17,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The .then() callback finishes and leaves the Call Stack.",
    },
  ],
}

export default pendingToFulfilledReturnLesson