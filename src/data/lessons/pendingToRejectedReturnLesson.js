const pendingToRejectedReturnLesson = {
  id: "pending-to-rejected-return",
  title: "Pending to Rejected Return",
  topicId: "Topic7",

  codeLines: [
    'console.log("Start");',
    '',
    'async function prepareResult() {',
    '  const value = await new Promise(',
    '    (resolve, reject) => {',
    '      setTimeout(() => {',
    '        reject("Load failed");',
    '      }, 1000);',
    '    }',
    '  );',
    '',
    '  return value;',
    '}',
    '',
    'prepareResult().catch((error) => {',
    '  console.log(error);',
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
        "setTimeout registers a timer with the Browser APIs for a minimum delay of 1000ms. reject() has not executed yet, so the awaited Promise remains pending.",
    },

    {
      id: "await-pending",
      lineNumber: 4,
      type: "POP_STACK",
      label: "prepareResult",
      explanation:
        "await encounters a pending Promise, so prepareResult is suspended. Its continuation is not scheduled in the Microtask Queue yet.",
    },

    {
      id: "attach-catch",
      lineNumber: 15,
      type: "SYNC_WORK",
      label: "Attach Catch Handler",
      explanation:
        "The .catch() handler is attached to the Promise returned by prepareResult. That Promise is still pending, so the Catch Callback is not scheduled yet.",
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
      id: "reject-awaited-promise",
      lineNumber: 7,
      type: "SYNC_WORK",
      label: 'Reject: "Load failed"',
      explanation:
        'reject("Load failed") executes. The Promise being awaited changes from pending to rejected with "Load failed" as its rejection reason.',
    },

    {
      id: "schedule-continuation",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "prepareResult Continuation",
      explanation:
        "Because the awaited Promise has rejected, the suspended prepareResult continuation is scheduled in the Microtask Queue.",
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
      id: "await-throws",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: 'Await throws "Load failed"',
      explanation:
        'When prepareResult resumes, await does not produce a value. Instead, the rejected Promise causes await to throw the rejection reason "Load failed".',
    },

    {
      id: "reject-async-promise",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: "Async Promise Rejected",
      explanation:
        'Because the rejection is not caught inside prepareResult, the Promise returned by prepareResult becomes rejected with "Load failed". The return value line is never reached.',
    },

    {
      id: "schedule-catch",
      lineNumber: 15,
      type: "ADD_MICROTASK_QUEUE",
      label: "Catch Callback",
      explanation:
        "The Promise returned by prepareResult is now rejected, so the already-attached .catch() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "continuation-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "prepareResult Continuation",
      explanation:
        "prepareResult has terminated because of the unhandled rejection inside the async function, so its continuation leaves the Call Stack.",
    },

    {
      id: "catch-to-stack",
      lineNumber: 15,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Catch Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Catch Callback",
        },
      ],
      explanation:
        "The Catch Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-error",
      lineNumber: 16,
      type: "PRINT_CONSOLE",
      value: "Load failed",
      explanation:
        'The .catch() callback receives "Load failed" as the rejection reason and prints it.',
    },

    {
      id: "catch-exit",
      lineNumber: 17,
      type: "POP_STACK",
      label: "Catch Callback",
      explanation:
        "The Catch Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default pendingToRejectedReturnLesson