const rejectedPromiseAfterAsyncWorkLesson = {
  id: "rejected-promise-after-async-work",
  title: "Rejected Promise After Async Work",
  topicId: "Topic4",

  codeLines: [
    'console.log("Start");',
    '',
    'const promise = new Promise((resolve, reject) => {',
    '  setTimeout(() => {',
    '    reject("Request failed");',
    '  }, 1000);',
    '});',
    '',
    'promise.catch((error) => {',
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
      label: "Create Promise",
      explanation:
        "A new Promise is created. Its executor function runs immediately and synchronously.",
    },

    {
      id: "timer-register",
      lineNumber: 4,
      type: "ADD_BROWSER_API",
      label: "Timer (1000ms)",
      explanation:
        "Inside the Promise executor, setTimeout registers a 1000ms timer with the Browser APIs. The Promise remains pending.",
    },

    {
      id: "attach-catch",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Attach Catch Handler",
      explanation:
        "The .catch() handler is attached to the pending Promise. It does not run yet because the Promise has not been rejected.",
    },

    {
      id: "print-end",
      lineNumber: 13,
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
          label: "Timer (1000ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],
      explanation:
        "After the timer becomes ready, its callback moves from Browser APIs into the Task Queue.",
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
      id: "reject-promise",
      lineNumber: 5,
      type: "ADD_MICROTASK_QUEUE",
      label: "Catch Callback",
      explanation:
        'reject("Request failed") executes. The Promise changes from pending to rejected, and the attached .catch() callback is scheduled in the Microtask Queue.',
    },

    {
      id: "timer-callback-exit",
      lineNumber: 6,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer callback has finished executing and leaves the Call Stack.",
    },

    {
      id: "catch-to-stack",
      lineNumber: 9,
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
        "The Call Stack is empty, so the waiting .catch() callback moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-error",
      lineNumber: 10,
      type: "PRINT_CONSOLE",
      value: "Request failed",
      explanation:
        'The rejection reason is received as error, so console.log(error) prints "Request failed".',
    },

    {
      id: "catch-callback-exit",
      lineNumber: 11,
      type: "POP_STACK",
      label: "Catch Callback",
      explanation:
        "The .catch() callback finishes executing and leaves the Call Stack.",
    },
  ],
}

export default rejectedPromiseAfterAsyncWorkLesson