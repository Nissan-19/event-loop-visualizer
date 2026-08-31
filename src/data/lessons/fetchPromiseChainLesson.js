const fetchPromiseChainLesson = {
  id: "fetch-promise-chain",
  title: "Fetch With a Promise Chain",
  topicId: "Topic10",

  codeLines: [
    "// Scenario:",
    "// Network response arrives later.",
    "// JSON parsing completes after that.",
    "",
    'console.log("Start");',
    "",
    'fetch("https://api.example.com/user")',
    "  .then((response) => {",
    "    return response.json();",
    "  })",
    "  .then((data) => {",
    "    return data.name;",
    "  })",
    "  .then((name) => {",
    "    console.log(name);",
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
        "fetch() starts the network request through the browser and immediately returns a pending Promise.",
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
        "The first .then() returns a new Promise. The second .then() handler is attached to that Promise.",
    },

    {
      id: "attach-third-then",
      lineNumber: 14,
      type: "SYNC_WORK",
      label: "Attach Third Then",
      explanation:
        "The second .then() also returns a new Promise. The third .then() handler is attached to that Promise.",
    },

    {
      id: "print-end",
      lineNumber: 18,
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
      lineNumber: 20,
      type: "REMOVE_BROWSER_API",
      label: "Network Request",
      explanation:
        "The network response arrives and the browser finishes the network operation.",
    },

    {
      id: "fetch-fulfilled",
      lineNumber: 20,
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
        "The fetch Promise is fulfilled, so the first .then() callback is scheduled in the Microtask Queue.",
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
      id: "start-json",
      lineNumber: 9,
      type: "ADD_BROWSER_API",
      label: "JSON Body Read",
      explanation:
        "response.json() begins reading and parsing the response body and returns a pending Promise.",
    },

    {
      id: "return-json-promise",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Return JSON Promise",
      explanation:
        "The first .then() callback returns the Promise from response.json(). Its own returned Promise now waits for that JSON Promise to settle.",
    },

    {
      id: "first-then-exit",
      lineNumber: 10,
      type: "POP_STACK",
      label: "First Then Callback",
      explanation:
        "The First Then Callback finishes and leaves the Call Stack. It does not stay on the stack waiting for JSON parsing.",
    },

    {
      id: "json-complete",
      lineNumber: 21,
      type: "REMOVE_BROWSER_API",
      label: "JSON Body Read",
      explanation:
        'The response body finishes parsing into JavaScript data: { name: "Nissan" }.',
    },

    {
      id: "json-fulfilled",
      lineNumber: 21,
      type: "SYNC_WORK",
      label: "JSON Promise Fulfilled",
      explanation:
        'The Promise returned by response.json() fulfils with { name: "Nissan" }.',
    },

    {
      id: "first-chain-fulfilled",
      lineNumber: 21,
      type: "SYNC_WORK",
      label: "First Chained Promise Fulfilled",
      explanation:
        "Because the first .then() returned the JSON Promise, the Promise returned by that .then() now fulfils with the parsed data.",
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
      id: "return-name",
      lineNumber: 12,
      type: "SYNC_WORK",
      label: 'Return "Nissan"',
      explanation:
        'data.name evaluates to "Nissan", so the callback returns the string "Nissan".',
    },

    {
      id: "second-chain-fulfilled",
      lineNumber: 13,
      type: "SYNC_WORK",
      label: "Second Chained Promise Fulfilled",
      explanation:
        'The Promise returned by the second .then() becomes fulfilled with "Nissan".',
    },

    {
      id: "second-then-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "Second Then Callback",
      explanation:
        "The Second Then Callback finishes and leaves the Call Stack.",
    },

    {
      id: "third-then-to-microtask",
      lineNumber: 14,
      type: "ADD_MICROTASK_QUEUE",
      label: "Third Then Callback",
      explanation:
        "The Promise observed by the third .then() is now fulfilled, so its callback is scheduled in the Microtask Queue.",
    },

    {
      id: "third-then-to-stack",
      lineNumber: 14,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Third Then Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Third Then Callback",
        },
      ],
      explanation:
        "The Third Then Callback moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "print-name",
      lineNumber: 15,
      type: "PRINT_CONSOLE",
      value: "Nissan",
      explanation:
        'The callback receives "Nissan" as name and prints it.',
    },

    {
      id: "third-chain-fulfilled",
      lineNumber: 16,
      type: "SYNC_WORK",
      label: "Third Chained Promise Fulfilled",
      explanation:
        "The third callback finishes without returning a value, so the Promise returned by the third .then() fulfils with undefined.",
    },

    {
      id: "third-then-exit",
      lineNumber: 16,
      type: "POP_STACK",
      label: "Third Then Callback",
      explanation:
        "The Third Then Callback finishes and leaves the Call Stack.",
    },
  ],
}

export default fetchPromiseChainLesson