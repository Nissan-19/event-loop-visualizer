const differentTimerDelaysLesson = {
  id: "different-timer-delays",
  title: "Different Timer Delays",
  topicId: "Topic3",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer 1");',
    '}, 2000);',
    '',
    'setTimeout(() => {',
    '  console.log("Timer 2");',
    '}, 500);',
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
      id: "timer-1-register",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer 1 (2000ms)",
      explanation:
        "Timer 1 is registered with the Browser APIs with a minimum delay of 2000ms.",
    },

    {
      id: "timer-2-register",
      lineNumber: 7,
      type: "ADD_BROWSER_API",
      label: "Timer 2 (500ms)",
      explanation:
        "Timer 2 is registered with the Browser APIs with a shorter minimum delay of 500ms.",
    },

    {
      id: "print-end",
      lineNumber: 11,
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
        "The synchronous script has finished, so Global leaves the Call Stack.",
    },

    {
      id: "timer-2-to-task-queue",
      lineNumber: null,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer 2 (500ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer 2 Callback",
        },
      ],
      explanation:
        "Timer 2 reaches its shorter delay first, so its callback enters the Task Queue before Timer 1.",
    },

    {
      id: "timer-2-to-stack",
      lineNumber: 7,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Timer 2 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Timer 2 Callback",
        },
      ],
      explanation:
        "The Call Stack is empty, so the Event Loop moves Timer 2's callback from the Task Queue onto the Call Stack.",
    },

    {
      id: "print-timer-2",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Timer 2",
      explanation:
        'Timer 2\'s callback executes and prints "Timer 2".',
    },

    {
      id: "timer-2-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Timer 2 Callback",
      explanation:
        "Timer 2's callback finishes and leaves the Call Stack.",
    },

    {
      id: "timer-1-to-task-queue",
      lineNumber: null,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer 1 (2000ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer 1 Callback",
        },
      ],
      explanation:
        "Timer 1 eventually reaches its longer delay, so its callback enters the Task Queue.",
    },

    {
      id: "timer-1-to-stack",
      lineNumber: 3,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Timer 1 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Timer 1 Callback",
        },
      ],
      explanation:
        "The Event Loop moves Timer 1's callback from the Task Queue onto the empty Call Stack.",
    },

    {
      id: "print-timer-1",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer 1",
      explanation:
        'Timer 1\'s callback executes and prints "Timer 1".',
    },

    {
      id: "timer-1-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Timer 1 Callback",
      explanation:
        "Timer 1's callback finishes and leaves the Call Stack.",
    },
  ],
}

export default differentTimerDelaysLesson