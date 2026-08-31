const fetchResponseObjectLesson = {
  id: "fetch-response-object",
  title: "Working With the Response Object",
  topicId: "Topic10",

  codeLines: [
    "// Scenario: Network response",
    "// arrives later with status 200.",
    "",
    'console.log("Start");',
    "",
    'fetch("https://api.example.com/data")',
    "  .then((response) => {",
    "    console.log(response.status);",
    "  });",
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
        "fetch() asks the browser to start the network request and immediately returns a pending Promise.",
    },

    {
      id: "attach-then",
      lineNumber: 7,
      type: "SYNC_WORK",
      label: "Attach Then Handler",
      explanation:
        "The .then() handler is attached to the pending fetch Promise. Its callback is not scheduled yet.",
    },

    {
      id: "print-end",
      lineNumber: 11,
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
        "The synchronous script finishes and Global leaves the Call Stack while the browser continues handling the network request.",
    },

    {
      id: "network-response",
      lineNumber: 13,
      type: "REMOVE_BROWSER_API",
      label: "Network Request",
      explanation:
        "The network response arrives and the browser finishes the network operation.",
    },

    {
      id: "fetch-fulfilled",
      lineNumber: 13,
      type: "SYNC_WORK",
      label: "Fetch Promise Fulfilled",
      explanation:
        "The fetch Promise becomes fulfilled with a Response object. In this lesson, response.status is 200.",
    },

    {
      id: "then-to-microtask",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "Because the fetch Promise is now fulfilled, the already-attached .then() callback is scheduled in the Microtask Queue.",
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
        "The Then Callback moves from the Microtask Queue to the empty Call Stack.",
    },

    {
      id: "print-status",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "200",
      explanation:
        "The callback receives the Response object and response.status evaluates to 200, so 200 is printed.",
    },

    {
      id: "then-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The Then Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default fetchResponseObjectLesson