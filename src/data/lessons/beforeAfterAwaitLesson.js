const beforeAfterAwaitLesson = {
  id: "before-after-await",
  title: "Before and After Await",
  topicId: "Topic6",

  codeLines: [
    'console.log("Start");',
    '',
    'async function run() {',
    '  console.log("Before");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("After");',
    '}',
    '',
    'run();',
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
      id: "run-enter",
      lineNumber: 11,
      type: "PUSH_STACK",
      label: "run",
      explanation:
        "run() is called, so the async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "print-before",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Before",
      explanation:
        'The code before await runs synchronously, so console.log("Before") prints Before.',
    },

    {
      id: "await-pause",
      lineNumber: 6,
      actions: [
        {
          type: "POP_STACK",
          label: "run",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "run Continuation",
        },
      ],
      explanation:
        "await is reached. The awaited Promise is already fulfilled, so run is suspended and its continuation is scheduled in the Microtask Queue.",
    },

    {
      id: "print-end",
      lineNumber: 13,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'run is suspended, so Global execution continues and console.log("End") prints End.',
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
      lineNumber: 8,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "run Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "run Continuation",
        },
      ],
      explanation:
        "The Call Stack is empty, so the suspended async function continues. Its continuation moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-after",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "After",
      explanation:
        'Execution resumes after await and console.log("After") prints After.',
    },

    {
      id: "continuation-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "run Continuation",
      explanation:
        "The remaining code in run has finished, so the async continuation leaves the Call Stack.",
    },
  ],
}

export default beforeAfterAwaitLesson