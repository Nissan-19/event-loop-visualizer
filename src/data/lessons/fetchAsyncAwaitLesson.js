const fetchAsyncAwaitLesson = {
  id: "fetch-async-await",
  title: "Fetch With Async/Await",
  topicId: "Topic10",

  codeLines: [
    "// Scenario:",
    "// Network response arrives later.",
    "// JSON parsing completes after that.",
    "",
    'console.log("Start");',
    "",
    "async function loadUser() {",
    "  const response = await fetch(",
    '    "https://api.example.com/user"',
    "  );",
    "",
    "  const data = await response.json();",
    "",
    "  console.log(data.name);",
    "}",
    "",
    "loadUser();",
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
      id: "load-user-enter",
      lineNumber: 17,
      type: "PUSH_STACK",
      label: "loadUser",
      explanation:
        "loadUser() is called. Because it is async, it returns a Promise and begins executing synchronously.",
    },

    {
      id: "start-fetch",
      lineNumber: 8,
      type: "ADD_BROWSER_API",
      label: "Network Request",
      explanation:
        "fetch() asks the browser to start the network request and immediately returns a pending Promise.",
    },

    {
      id: "await-fetch",
      lineNumber: 8,
      type: "POP_STACK",
      label: "loadUser",
      explanation:
        "await sees the pending fetch Promise, so loadUser is suspended. Its continuation is not scheduled yet.",
    },

    {
      id: "print-end",
      lineNumber: 19,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'Global execution continues and console.log("End") prints End.',
    },

    {
      id: "global-exit",
      lineNumber: null,
      type: "POP_STACK",
      label: "Global",
      explanation:
        "The initial synchronous script finishes and Global leaves the Call Stack while the network request continues.",
    },

    {
      id: "network-response",
      lineNumber: 21,
      type: "REMOVE_BROWSER_API",
      label: "Network Request",
      explanation:
        "The network response arrives and the browser finishes the network operation.",
    },

    {
      id: "fetch-fulfilled",
      lineNumber: 21,
      type: "SYNC_WORK",
      label: "Fetch Promise Fulfilled",
      explanation:
        "The fetch Promise becomes fulfilled with a Response object.",
    },

    {
      id: "first-continuation-to-microtask",
      lineNumber: 8,
      type: "ADD_MICROTASK_QUEUE",
      label: "loadUser Continuation 1",
      explanation:
        "Because the awaited fetch Promise is now fulfilled, the first loadUser continuation is scheduled in the Microtask Queue.",
    },

    {
      id: "first-continuation-to-stack",
      lineNumber: 8,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "loadUser Continuation 1",
        },
        {
          type: "PUSH_STACK",
          label: "loadUser Continuation 1",
        },
      ],
      explanation:
        "The first loadUser continuation moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "assign-response",
      lineNumber: 8,
      type: "SYNC_WORK",
      label: "response = Response",
      explanation:
        "When loadUser resumes, await produces the fulfilled Response object and assigns it to response.",
    },

    {
      id: "start-json",
      lineNumber: 12,
      type: "ADD_BROWSER_API",
      label: "JSON Body Read",
      explanation:
        "response.json() begins reading and parsing the response body and returns another pending Promise.",
    },

    {
      id: "await-json",
      lineNumber: 12,
      type: "POP_STACK",
      label: "loadUser Continuation 1",
      explanation:
        "The second await sees the pending JSON Promise, so loadUser is suspended again. Its next continuation is not scheduled yet.",
    },

    {
      id: "json-complete",
      lineNumber: 22,
      type: "REMOVE_BROWSER_API",
      label: "JSON Body Read",
      explanation:
        'The response body finishes parsing into JavaScript data: { name: "Nissan" }.',
    },

    {
      id: "json-fulfilled",
      lineNumber: 22,
      type: "SYNC_WORK",
      label: "JSON Promise Fulfilled",
      explanation:
        'The Promise returned by response.json() becomes fulfilled with { name: "Nissan" }.',
    },

    {
      id: "second-continuation-to-microtask",
      lineNumber: 12,
      type: "ADD_MICROTASK_QUEUE",
      label: "loadUser Continuation 2",
      explanation:
        "Because the awaited JSON Promise is now fulfilled, the second loadUser continuation is scheduled in the Microtask Queue.",
    },

    {
      id: "second-continuation-to-stack",
      lineNumber: 12,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "loadUser Continuation 2",
        },
        {
          type: "PUSH_STACK",
          label: "loadUser Continuation 2",
        },
      ],
      explanation:
        "The second loadUser continuation moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "assign-data",
      lineNumber: 12,
      type: "SYNC_WORK",
      label: "data = Parsed JSON",
      explanation:
        'When loadUser resumes again, await produces the parsed object and assigns it to data.',
    },

    {
      id: "print-name",
      lineNumber: 14,
      type: "PRINT_CONSOLE",
      value: "Nissan",
      explanation:
        'data.name evaluates to "Nissan", so console.log(data.name) prints Nissan.',
    },

    {
      id: "async-complete",
      lineNumber: 15,
      type: "SYNC_WORK",
      label: "Async Promise Fulfilled",
      explanation:
        "loadUser finishes normally, so the Promise returned by the async function becomes fulfilled with undefined.",
    },

    {
      id: "second-continuation-exit",
      lineNumber: 15,
      type: "POP_STACK",
      label: "loadUser Continuation 2",
      explanation:
        "loadUser has finished, so its second continuation leaves the Call Stack.",
    },
  ],
}

export default fetchAsyncAwaitLesson