const multipleAwaitsLesson = {
  id: "multiple-awaits",
  title: "Multiple Awaits",
  topicId: "Topic6",

  codeLines: [
    'console.log("Start");',
    '',
    'async function processSteps() {',
    '  console.log("Step 1");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("Step 2");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("Step 3");',
    '}',
    '',
    'processSteps();',
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
      id: "process-steps-enter",
      lineNumber: 15,
      type: "PUSH_STACK",
      label: "processSteps",
      explanation:
        "processSteps() is called. The async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "print-step-1",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Step 1",
      explanation:
        'Code before the first await runs synchronously, so "Step 1" is printed.',
    },

    {
      id: "first-await",
      lineNumber: 6,
      actions: [
        {
          type: "POP_STACK",
          label: "processSteps",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "Continuation 1",
        },
      ],
      explanation:
        "The first await suspends processSteps. Because the awaited Promise is already fulfilled, the function's first continuation is scheduled as a microtask.",
    },

    {
      id: "print-end",
      lineNumber: 17,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'processSteps is suspended, so Global execution continues and "End" is printed.',
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
      id: "first-continuation-to-stack",
      lineNumber: 8,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Continuation 1",
        },
        {
          type: "PUSH_STACK",
          label: "Continuation 1",
        },
      ],
      explanation:
        "The Call Stack is empty, so the first async continuation moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-step-2",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Step 2",
      explanation:
        'Execution resumes after the first await and prints "Step 2".',
    },

    {
      id: "second-await",
      lineNumber: 10,
      actions: [
        {
          type: "POP_STACK",
          label: "Continuation 1",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "Continuation 2",
        },
      ],
      explanation:
        "The second await suspends processSteps again. Because this Promise is also already fulfilled, a second continuation is scheduled as a microtask.",
    },

    {
      id: "second-continuation-to-stack",
      lineNumber: 12,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Continuation 2",
        },
        {
          type: "PUSH_STACK",
          label: "Continuation 2",
        },
      ],
      explanation:
        "The Call Stack is empty again, so the second continuation moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-step-3",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "Step 3",
      explanation:
        'Execution resumes after the second await and prints "Step 3".',
    },

    {
      id: "second-continuation-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "Continuation 2",
      explanation:
        "The remaining code in processSteps has finished, so the second continuation leaves the Call Stack.",
    },
  ],
}

export default multipleAwaitsLesson