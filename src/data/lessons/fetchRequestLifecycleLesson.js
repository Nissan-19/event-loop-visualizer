const fetchRequestLifecycleLesson = {
  id: "fetch-request-lifecycle",
  title: "Fetch Request Lifecycle",
  topicId: "Topic10",

  codeLines: [
    "// Scenario: Network response",
    "// arrives later.",
    "",
    'console.log("Start");',
    "",
    "const request = fetch(",
    '  "https://api.example.com/data"',
    ");",
    "",
    "request.then(() => {",
    '  console.log("Response");',
    "});",
    "",
    'console.log("End");',
    "",
    "// Network response arrives here.",
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
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") executes synchronously and prints Start.',
    },

    {
      id: "start-fetch",
      lineNumber: 6,
      type: "ADD_BROWSER_API",
      label: "Network Request",
      explanation:
        "fetch() asks the browser to start the network request. fetch() immediately returns a Promise that is currently pending.",
    },

    {
      id: "attach-then",
      lineNumber: 10,
      type: "SYNC_WORK",
      label: "Attach Then Handler",
      explanation:
        "The .then() handler is attached to the pending fetch Promise. Because the Promise has not fulfilled yet, its callback is not scheduled.",
    },

    {
      id: "print-end",
      lineNumber: 14,
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
        "The synchronous script finishes and Global leaves the Call Stack. The network request is still being handled by the browser.",
    },

    {
      id: "network-response",
      lineNumber: 16,
      type: "REMOVE_BROWSER_API",
      label: "Network Request",
      explanation:
        "The network response arrives. The browser has finished the network operation.",
    },

    {
      id: "fetch-promise-fulfilled",
      lineNumber: 16,
      type: "SYNC_WORK",
      label: "Fetch Promise Fulfilled",
      explanation:
        "The fetch Promise changes from pending to fulfilled with a Response object.",
    },

    {
      id: "then-to-microtask",
      lineNumber: 10,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "The Promise is now fulfilled, so the already-attached .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "then-to-stack",
      lineNumber: 10,
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
        "The Then Callback moves from the Microtask Queue to the empty Call Stack.",
    },

    {
      id: "print-response",
      lineNumber: 11,
      type: "PRINT_CONSOLE",
      value: "Response",
      explanation:
        'The .then() callback executes and console.log("Response") prints Response.',
    },

    {
      id: "then-exit",
      lineNumber: 12,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The Then Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default fetchRequestLifecycleLesson 