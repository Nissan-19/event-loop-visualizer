const awaitWithFulfilledValueLesson = {
  id: "await-with-fulfilled-value",
  title: "Await With a Fulfilled Value",
  topicId: "Topic6",

  codeLines: [
    'console.log("Start");',
    '',
    'async function getMessage() {',
    '  const value = await Promise.resolve(',
    '    "Done"',
    '  );',
    '',
    '  console.log(value);',
    '}',
    '',
    'getMessage();',
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
      id: "get-message-enter",
      lineNumber: 11,
      type: "PUSH_STACK",
      label: "getMessage",
      explanation:
        "getMessage() is called. The async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "await-promise",
      lineNumber: 4,
      actions: [
        {
          type: "POP_STACK",
          label: "getMessage",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "getMessage Continuation",
        },
      ],
      explanation:
        "await is reached. The awaited Promise is already fulfilled with Done, so getMessage is suspended and its continuation is scheduled as a microtask.",
    },

    {
      id: "print-end",
      lineNumber: 13,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'getMessage is suspended, so Global execution continues and console.log("End") prints End.',
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
      id: "continuation-to-stack",
      lineNumber: 4,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "getMessage Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "getMessage Continuation",
        },
      ],
      explanation:
        "The Call Stack is empty, so getMessage's continuation moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "receive-value",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: 'value = "Done"',
      explanation:
        'When the async function resumes, "Done" becomes the result of the await expression and is assigned to value.',
    },

    {
      id: "print-value",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Done",
      explanation:
        'console.log(value) executes and prints the fulfilled value "Done".',
    },

    {
      id: "continuation-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "getMessage Continuation",
      explanation:
        "The remaining code in getMessage has finished, so the async continuation leaves the Call Stack.",
    },
  ],
}

export default awaitWithFulfilledValueLesson