const timerWaitingForBusyCallStackLesson = {
  id: "timer-waiting-for-busy-call-stack",
  title: "Timer Waiting for a Busy Call Stack",
  topicId: "Topic3",

  codeLines: [
    'console.log("Start");',
    '',
    'setTimeout(() => {',
    '  console.log("Timer");',
    '}, 0);',
    '',
    'function doHeavyWork() {',
    '  console.log("Work Start");',
    '',
    '  for (let i = 0; i < 1000000000; i++) {',
    '    // Long synchronous work',
    '  }',
    '',
    '  console.log("Work End");',
    '}',
    '',
    'doHeavyWork();',
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
      id: "heavy-work-enter",
      lineNumber: 17,
      type: "PUSH_STACK",
      label: "doHeavyWork",
      explanation:
        "doHeavyWork() is called, so its function execution context is pushed onto the Call Stack above Global.",
    },

    {
      id: "print-work-start",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Work Start",
      explanation:
        'doHeavyWork begins executing and prints "Work Start".',
    },

    {
      id: "long-synchronous-work",
      lineNumber: 10,
      type: "SYNC_WORK",
      label: "Long Synchronous Work",
      explanation:
        "The long loop runs synchronously. The Call Stack remains busy with doHeavyWork, so JavaScript cannot execute another callback.",
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
        "The timer is ready, so its callback enters the Task Queue. However, doHeavyWork is still occupying the Call Stack, so the callback must wait.",
    },

    {
      id: "print-work-end",
      lineNumber: 14,
      type: "PRINT_CONSOLE",
      value: "Work End",
      explanation:
        'The synchronous loop finishes and doHeavyWork continues by printing "Work End".',
    },

    {
      id: "heavy-work-exit",
      lineNumber: 15,
      type: "POP_STACK",
      label: "doHeavyWork",
      explanation:
        "doHeavyWork has finished executing and is removed from the Call Stack. Global is still on the stack.",
    },

    {
      id: "print-end",
      lineNumber: 19,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'Global execution continues and console.log("End") prints End.',
    },

    {
      id: "global-exit",
      lineNumber: null,
      type: "POP_STACK",
      label: "Global",
      explanation:
        "The synchronous script has finished, so Global leaves the Call Stack. The Call Stack is finally empty.",
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
        "The Call Stack is empty, so the Event Loop moves the waiting Timer callback from the Task Queue onto the Call Stack.",
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

export default timerWaitingForBusyCallStackLesson