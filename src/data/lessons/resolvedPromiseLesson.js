const resolvedPromiseLesson = {
  id: "resolved-promise",
  title: "Resolved Promise",
  topicId: "Topic4",

  codeLines: [
    'console.log("Start");',
    '',
    'Promise.resolve().then(() => {',
    '  console.log("Promise");',
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
      id: "promise-callback-to-microtask",
      lineNumber: 3,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise Callback",
      explanation:
        "Promise.resolve() creates an already fulfilled Promise. The .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "print-end",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'JavaScript continues executing synchronously and console.log("End") prints End.',
    },

    {
      id: "global-exit",
      lineNumber: null,
      type: "POP_STACK",
      label: "Global",
      explanation:
        "The synchronous script has finished, so Global is removed from the Call Stack.",
    },

    {
      id: "microtask-to-stack",
      lineNumber: 3,

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
        "The Call Stack is empty, so the Promise callback moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-promise",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The Promise callback executes and prints "Promise".',
    },

    {
      id: "promise-callback-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Promise Callback",
      explanation:
        "The Promise callback has finished executing and is removed from the Call Stack.",
    },
  ],
}

export default resolvedPromiseLesson