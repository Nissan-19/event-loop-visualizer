const asyncReturnsRejectedLesson = {
  id: "async-returns-rejected",
  title: "Async Function Returns a Rejection",
  topicId: "Topic7",

  codeLines: [
    'console.log("Start");',
    '',
    'async function loadResult() {',
    '  throw new Error(',
    '    "Failed"',
    '  );',
    '}',
    '',
    'loadResult().catch((error) => {',
    '  console.log(error.message);',
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
      id: "load-result-enter",
      lineNumber: 9,
      type: "PUSH_STACK",
      label: "loadResult",
      explanation:
        "loadResult() is called. The async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "throw-error",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: 'Throw Error("Failed")',
      explanation:
        'loadResult throws an Error object. Because loadResult is async, the Promise returned by the function becomes rejected with this Error as its rejection reason.',
    },

    {
      id: "load-result-exit",
      lineNumber: 7,
      type: "POP_STACK",
      label: "loadResult",
      explanation:
        "The throw stops normal execution of loadResult, so the function leaves the Call Stack.",
    },

    {
      id: "catch-to-microtask",
      lineNumber: 9,
      type: "ADD_MICROTASK_QUEUE",
      label: "Catch Callback",
      explanation:
        "The Promise returned by loadResult is rejected, so the attached .catch() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "print-end",
      lineNumber: 13,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'Global execution continues synchronously and console.log("End") prints End.',
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
        "The Call Stack is empty, so the .catch() callback moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-error",
      lineNumber: 10,
      type: "PRINT_CONSOLE",
      value: "Failed",
      explanation:
        'The thrown Error object is received as error. error.message contains "Failed", so console.log(error.message) prints Failed.',
    },

    {
      id: "catch-exit",
      lineNumber: 11,
      type: "POP_STACK",
      label: "Catch Callback",
      explanation:
        "The .catch() callback finishes and leaves the Call Stack.",
    },
  ],
}

export default asyncReturnsRejectedLesson