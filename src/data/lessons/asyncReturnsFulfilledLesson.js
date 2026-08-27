const asyncReturnsFulfilledLesson = {
  id: "async-returns-fulfilled",
  title: "Async Function Returns a Fulfilled Value",
  topicId: "Topic7",

  codeLines: [
    'console.log("Start");',
    '',
    'async function makeResult() {',
    '  return "Success";',
    '}',
    '',
    'makeResult().then((value) => {',
    '  console.log(value);',
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
      id: "make-result-enter",
      lineNumber: 7,
      type: "PUSH_STACK",
      label: "makeResult",
      explanation:
        "makeResult() is called. The async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "return-success",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: 'Return "Success"',
      explanation:
        'makeResult returns "Success". Because it is an async function, its returned Promise becomes fulfilled with "Success".',
    },

    {
      id: "make-result-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "makeResult",
      explanation:
        "makeResult has finished its synchronous execution and leaves the Call Stack.",
    },

    {
      id: "then-to-microtask",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "The Promise returned by makeResult is fulfilled, so the attached .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "print-end",
      lineNumber: 11,
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
        "The Call Stack is empty, so the .then() callback moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-success",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Success",
      explanation:
        'The fulfilled value is received as value, so console.log(value) prints "Success".',
    },

    {
      id: "then-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The .then() callback finishes and leaves the Call Stack.",
    },
  ],
}

export default asyncReturnsFulfilledLesson