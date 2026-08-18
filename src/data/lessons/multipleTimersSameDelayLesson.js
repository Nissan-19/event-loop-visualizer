const multipleTimersSameDelayLesson = {
  id: "multiple-timers-same-delay",
  title: "Multiple Timers With the Same Delay",
  topicId: "Topic3",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer 1");',
    '}, 1000);',
    '',
    'setTimeout(() => {',
    '  console.log("Timer 2");',
    '}, 1000);',
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
      label: "Timer 1 (1000ms)",
      explanation:
        "The first setTimeout is registered. The browser begins managing Timer 1 while JavaScript continues executing.",
    },

    {
      id: "timer-2-register",
      lineNumber: 7,
      type: "ADD_BROWSER_API",
      label: "Timer 2 (1000ms)",
      explanation:
        "The second setTimeout is registered. Browser APIs are now managing both timers.",
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
        "The synchronous script has finished, so Global is removed from the Call Stack.",
    },

    {
      id: "timer-1-to-task-queue",
      lineNumber: null,

      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer 1 (1000ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer 1 Callback",
        },
      ],

      explanation:
        "Timer 1 completes first and its callback moves from Browser APIs into the Task Queue.",
    },

    {
      id: "timer-2-to-task-queue",
      lineNumber: null,

      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer 2 (1000ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer 2 Callback",
        },
      ],

      explanation:
        "Timer 2 also completes and its callback enters the Task Queue behind Timer 1's callback.",
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
        "The Call Stack is empty, so the Event Loop moves Timer 1's callback from the front of the Task Queue onto the Call Stack.",
    },

    {
      id: "print-timer-1",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer 1",
      explanation:
        'Timer 1\'s callback executes and prints "Timer 1". Timer 2 must continue waiting in the Task Queue.',
    },

    {
      id: "timer-1-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Timer 1 Callback",
      explanation:
        "Timer 1's callback has finished and is removed from the Call Stack.",
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
        "The Call Stack is empty again, so the Event Loop moves Timer 2's callback from the Task Queue onto the Call Stack.",
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
        "Timer 2's callback has finished and is removed from the Call Stack.",
    },
  ],
}

export default multipleTimersSameDelayLesson