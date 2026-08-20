const promiseBeforeTimerLesson = {
  id: "promise-before-timer",
  title: "Promise Before Timer",
  topicId: "Topic4",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '}, 0);',
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
      id: "timer-register",
      lineNumber: 3,
      type: "ADD_BROWSER_API",
      label: "Timer (0ms)",
      explanation:
        "setTimeout registers a zero-delay timer with the Browser APIs. JavaScript continues executing without waiting.",
    },

    {
      id: "promise-to-microtask",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise Callback",
      explanation:
        "Promise.resolve() is already fulfilled, so its .then() callback is scheduled in the Microtask Queue.",
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
        "The timer is ready, so its callback moves from Browser APIs into the Task Queue.",
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
      id: "promise-to-stack",
      lineNumber: 7,
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
        "The Call Stack is empty. The Microtask Queue is processed before the Task Queue, so the Promise callback moves onto the Call Stack first.",
    },

    {
      id: "print-promise",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The Promise callback executes and prints "Promise".',
    },

    {
      id: "promise-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Promise Callback",
      explanation:
        "The Promise callback finishes and leaves the Call Stack.",
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
        "The Microtask Queue is now empty, so the Event Loop can move the Timer callback from the Task Queue onto the Call Stack.",
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

export default promiseBeforeTimerLesson