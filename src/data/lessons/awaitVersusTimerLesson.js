const awaitVersusTimerLesson = {
  id: "await-versus-timer",
  title: "Await Versus Timer",
  topicId: "Topic6",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '}, 0);',
    '',
    'async function checkOrder() {',
    '  console.log("Before");',
    '',
    '  await Promise.resolve();',
    '',
    '  console.log("After");',
    '}',
    '',
    'checkOrder();',
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
      id: "timer-register",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer (0ms)",
      explanation:
        "setTimeout registers a zero-delay timer with the Browser APIs. JavaScript continues without waiting for it.",
    },

    {
      id: "check-order-enter",
      lineNumber: 15,
      type: "PUSH_STACK",
      label: "checkOrder",
      explanation:
        "checkOrder() is called. The async function enters the Call Stack and begins executing synchronously.",
    },

    {
      id: "print-before",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Before",
      explanation:
        'Code before await executes synchronously, so "Before" is printed.',
    },

    {
      id: "timer-to-task-queue",
      lineNumber: null,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer (0ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],
      explanation:
        "The timer becomes ready and its callback enters the Task Queue. It cannot execute yet because synchronous JavaScript is still running.",
    },

    {
      id: "await-pause",
      lineNumber: 10,
      actions: [
        {
          type: "POP_STACK",
          label: "checkOrder",
        },
        {
          type: "ADD_MICROTASK_QUEUE",
          label: "checkOrder Continuation",
        },
      ],
      explanation:
        "await suspends checkOrder. Because the awaited Promise is already fulfilled, the function's continuation is scheduled as a microtask.",
    },

    {
      id: "print-end",
      lineNumber: 17,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'checkOrder is suspended, so Global execution continues and "End" is printed.',
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
      lineNumber: 12,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "checkOrder Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "checkOrder Continuation",
        },
      ],
      explanation:
        "The Call Stack is empty. Microtasks are processed before the next task, so checkOrder's continuation moves onto the Call Stack before the Timer callback.",
    },

    {
      id: "print-after",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "After",
      explanation:
        'Execution resumes after await and console.log("After") prints After.',
    },

    {
      id: "continuation-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "checkOrder Continuation",
      explanation:
        "The remaining code in checkOrder finishes, so the async continuation leaves the Call Stack.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 3,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Timer Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Timer Callback",
        },
      ],
      explanation:
        "The Microtask Queue is empty, so the Event Loop can now move the Timer callback from the Task Queue onto the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The Timer callback executes and prints "Timer".',
    },

    {
      id: "timer-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer callback finishes and leaves the Call Stack.",
    },
  ],
}

export default awaitVersusTimerLesson