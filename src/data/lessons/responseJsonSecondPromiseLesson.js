const responseJsonSecondPromiseLesson = {
  id: "response-json-second-promise",
  title: "response.json() and the Second Promise",
  topicId: "Topic10",

  codeLines: [
    "// Scenario:",
    "// Network response arrives later.",
    "// JSON parsing completes after that.",
    "",
    'console.log("Start");',
    "",
    'fetch("https://api.example.com/data")',
    "  .then((response) => {",
    "    return response.json();",
    "  })",
    "  .then((data) => {",
    "    console.log(data.name);",
    "  });",
    "",
    'console.log("End");',
    "",
    "// Network response arrives here.",
    "// JSON parsing completes later.",
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
      lineNumber: 5,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") executes synchronously and prints Start.',
    },

    {
      id: "start-fetch",
      lineNumber: 7,
      type: "ADD_BROWSER_API",
      label: "Network Request",
      explanation:
        "fetch() asks the browser to start the network request and immediately returns a pending Promise.",
    },

    {
      id: "attach-first-then",
      lineNumber: 8,
      type: "SYNC_WORK",
      label: "Attach First Then",
      explanation:
        "The first .then() handler is attached to the pending fetch Promise. Its callback is not scheduled yet.",
    },

    {
      id: "attach-second-then",
      lineNumber: 11,
      type: "SYNC_WORK",
      label: "Attach Second Then",
      explanation:
        "The first .then() returns a new Promise. The second .then() is attached to that new pending Promise, so its callback is not scheduled yet.",
    },

    {
      id: "print-end",
      lineNumber: 15,
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
        "The synchronous script finishes and Global leaves the Call Stack while the network request continues.",
    },

    {
      id: "network-response",
      lineNumber: 17,
      type: "REMOVE_BROWSER_API",
      label: "Network Request",
      explanation:
        "The network response arrives and the browser finishes the network operation.",
    },

    {
      id: "fetch-fulfilled",
      lineNumber: 17,
      type: "SYNC_WORK",
      label: "Fetch Promise Fulfilled",
      explanation:
        "The fetch Promise becomes fulfilled with a Response object.",
    },

    {
      id: "first-then-to-microtask",
      lineNumber: 8,
      type: "ADD_MICROTASK_QUEUE",
      label: "First Then Callback",
      explanation:
        "The fetch Promise is now fulfilled, so the first .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "first-then-to-stack",
      lineNumber: 8,
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
        "The First Then Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "call-response-json",
      lineNumber: 9,
      type: "ADD_BROWSER_API",
      label: "JSON Body Read",
      explanation:
        "response.json() begins reading and parsing the response body. It returns another Promise, which is currently pending.",
    },

    {
      id: "first-then-waits",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Promise Chain Waiting",
      explanation:
        "The first .then() returns the Promise from response.json(). The Promise returned by the first .then() now waits for that JSON Promise to settle.",
    },

    {
      id: "first-then-exit",
      lineNumber: 10,
      type: "POP_STACK",
      label: "First Then Callback",
      explanation:
        "The First Then Callback finishes and leaves the Call Stack. The second .then() callback is still not ready.",
    },

    {
      id: "json-complete",
      lineNumber: 18,
      type: "REMOVE_BROWSER_API",
      label: "JSON Body Read",
      explanation:
        'The response body has been read and parsed into JavaScript data: { name: "Nissan" }.',
    },

    {
      id: "json-promise-fulfilled",
      lineNumber: 18,
      type: "SYNC_WORK",
      label: "JSON Promise Fulfilled",
      explanation:
        'The Promise returned by response.json() becomes fulfilled with { name: "Nissan" }.',
    },

    {
      id: "chain-promise-fulfilled",
      lineNumber: 18,
      type: "SYNC_WORK",
      label: "Chained Promise Fulfilled",
      explanation:
        'Because the first .then() returned the JSON Promise, its own returned Promise now fulfils with the same parsed data.',
    },

    {
      id: "second-then-to-microtask",
      lineNumber: 11,
      type: "ADD_MICROTASK_QUEUE",
      label: "Second Then Callback",
      explanation:
        "The Promise observed by the second .then() is now fulfilled, so its callback is scheduled in the Microtask Queue.",
    },

    {
      id: "second-then-to-stack",
      lineNumber: 11,
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
        "The Second Then Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-name",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "Nissan",
      explanation:
        'The callback receives the parsed JavaScript object as data. data.name is "Nissan", so Nissan is printed.',
    },

    {
      id: "second-then-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "Second Then Callback",
      explanation:
        "The Second Then Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default responseJsonSecondPromiseLesson