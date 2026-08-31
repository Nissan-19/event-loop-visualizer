const fetchFailureFinalChallengeLesson = {
  id: "fetch-failure-final-challenge",
  title: "Fetch Failure + Final Challenge",
  topicId: "Topic10",

  codeLines: [
    "// Scenario:",
    "// Network request fails later.",
    "// Failure happens before",
    "// the timer is ready.",
    "",
    'console.log("Start");',
    "",
    "setTimeout(() => {",
    '  console.log("Timer");',
    "}, 5000);",
    "",
    "const request = fetch(",
    '  "https://api.example.com/user"',
    ");",
    "",
    "request.catch(() => {",
    '  console.log("Fetch failed");',
    "});",
    "",
    "Promise.resolve().then(() => {",
    '  console.log("Promise");',
    "});",
    "",
    'console.log("End");',
    "",
    "// Network request fails here.",
    "// Timer becomes ready later.",
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
      lineNumber: 6,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") executes synchronously and prints Start.',
    },

    {
      id: "register-timer",
      lineNumber: 8,
      type: "ADD_BROWSER_API",
      label: "5s Timer",
      explanation:
        "setTimeout registers a timer with the browser. Its 5-second delay is the minimum time before its callback can become ready.",
    },

    {
      id: "start-fetch",
      lineNumber: 12,
      type: "ADD_BROWSER_API",
      label: "Network Request",
      explanation:
        "fetch() asks the browser to start the network request and immediately returns a pending Promise.",
    },

    {
      id: "attach-catch",
      lineNumber: 16,
      type: "SYNC_WORK",
      label: "Attach Catch Handler",
      explanation:
        "catch() attaches a rejection handler to the pending fetch Promise. Nothing is scheduled because the Promise has not rejected yet.",
    },

    {
      id: "resolved-promise",
      lineNumber: 20,
      type: "SYNC_WORK",
      label: "Promise Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "promise-to-microtask",
      lineNumber: 20,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise Callback",
      explanation:
        "Because the Promise is already fulfilled, its .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "print-end",
      lineNumber: 24,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'Synchronous execution continues and console.log("End") prints End.',
    },

    {
      id: "global-exit",
      lineNumber: null,
      type: "POP_STACK",
      label: "Global",
      explanation:
        "The synchronous script finishes and Global leaves the Call Stack.",
    },

    {
      id: "promise-to-stack",
      lineNumber: 20,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Promise Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Promise Callback",
        },
      ],
      explanation:
        "The Call Stack is empty, so the waiting Promise Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-promise",
      lineNumber: 21,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The Promise Callback executes and prints "Promise".',
    },

    {
      id: "promise-exit",
      lineNumber: 22,
      type: "POP_STACK",
      label: "Promise Callback",
      explanation:
        "The Promise Callback finishes and leaves the Call Stack.",
    },

    {
      id: "network-fails",
      lineNumber: 26,
      type: "REMOVE_BROWSER_API",
      label: "Network Request",
      explanation:
        "The network request fails. There is no successful Response object or response body.",
    },

    {
      id: "fetch-rejected",
      lineNumber: 26,
      type: "SYNC_WORK",
      label: "Fetch Promise Rejected",
      explanation:
        "Because the network operation failed, the Promise returned by fetch() becomes rejected.",
    },

    {
      id: "catch-to-microtask",
      lineNumber: 16,
      type: "ADD_MICROTASK_QUEUE",
      label: "Catch Callback",
      explanation:
        "The fetch Promise has rejected, so its attached catch() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "catch-to-stack",
      lineNumber: 16,
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
      id: "print-failure",
      lineNumber: 17,
      type: "PRINT_CONSOLE",
      value: "Fetch failed",
      explanation:
        'The rejection handler runs and prints "Fetch failed".',
    },

    {
      id: "catch-promise-fulfilled",
      lineNumber: 18,
      type: "SYNC_WORK",
      label: "Catch Promise Fulfilled",
      explanation:
        "The catch callback finishes without returning a value, so the new Promise returned by catch() fulfils with undefined.",
    },

    {
      id: "catch-exit",
      lineNumber: 18,
      type: "POP_STACK",
      label: "Catch Callback",
      explanation:
        "The Catch Callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-ready",
      lineNumber: 27,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "5s Timer",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],
      explanation:
        "The timer's minimum delay has now elapsed, so its callback becomes ready and enters the Task Queue.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 8,
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
        "With the Call Stack empty and no waiting microtasks, the Timer Callback moves from the Task Queue to the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 9,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The Timer Callback executes and prints "Timer".',
    },

    {
      id: "timer-exit",
      lineNumber: 10,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default fetchFailureFinalChallengeLesson