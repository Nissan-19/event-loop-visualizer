const timerWithLongSynchronousWorkLesson = {
  id: "timer-with-long-synchronous-work",
  title: "Timer With Long Synchronous Work",
  topicId: "Topic2",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '}, 0);',
    '',
    'for (let i = 0; i < 1000000000; i++) {',
    '  // Long synchronous work',
    '}',
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
        "setTimeout is called with a 0ms delay. The browser starts handling the timer while JavaScript continues executing.",
    },

    {
      id: "long-sync-work-start",
      lineNumber: 7,
      type: "SYNC_WORK",
      label: "Long Synchronous Work",
      explanation:
        "JavaScript begins the long synchronous loop. The Call Stack is still busy with the Global execution context.",
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
        "The timer is already ready, so its callback moves into the Task Queue. However, it cannot execute because the Call Stack is still busy with synchronous work.",
    },

    {
      id: "long-sync-work-end",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Long Synchronous Work Complete",
      explanation:
        "The long synchronous loop finally finishes. The timer callback has been waiting in the Task Queue.",
    },

    {
      id: "print-end",
      lineNumber: 11,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'JavaScript continues with the remaining synchronous statement and prints End before the timer callback can run.',
    },

    {
      id: "global-exit",
      lineNumber: null,
      type: "POP_STACK",
      label: "Global",
      explanation:
        "All synchronous JavaScript has finished, so Global is removed from the Call Stack.",
    },

    {
      id: "task-queue-to-stack",
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
        "The Call Stack is now empty, so the Event Loop moves the waiting timer callback from the Task Queue onto the Call Stack.",
    },

    {
      id: "print-timer",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Timer",
      explanation:
        'The timer callback finally executes and console.log("Timer") prints Timer.',
    },

    {
      id: "callback-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The timer callback has finished executing and is removed from the Call Stack.",
    },
  ],
}

export default timerWithLongSynchronousWorkLesson