const pendingPromiseFulfilledLesson = {
  id: "pending-promise-fulfilled",
  title: "Pending Promise Becomes Fulfilled",
  topicId: "Topic4",

  codeLines: [
    'console.log("Start");',
    '',
    'const promise = new Promise((resolve) => {',
    '  setTimeout(() => {',
    '    resolve("Done");',
    '  }, 1000);',
    '});',
    '',
    'promise.then((value) => {',
    '  console.log(value);',
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
      id: "create-promise",
      lineNumber: 3,
      type: "SYNC_WORK",
      label: "Create Pending Promise",
      explanation:
        "A new Promise is created. Its executor function runs immediately and synchronously. The Promise begins in the pending state.",
    },

    {
      id: "timer-register",
      lineNumber: 4,
      type: "ADD_BROWSER_API",
      label: "Timer (1000ms)",
      explanation:
        "setTimeout registers a 1000ms timer with the Browser APIs. The Promise remains pending while JavaScript continues.",
    },

    {
      id: "attach-then-handler",
      lineNumber: 9,
      type: "SYNC_WORK",
      label: "Attach Then Handler",
      explanation:
        "The .then() handler is attached to the pending Promise. It is not added to the Microtask Queue yet because the Promise has not been fulfilled.",
    },

    {
      id: "print-end",
      lineNumber: 13,
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
      id: "timer-to-task-queue",
      lineNumber: null,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer (1000ms)",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],
      explanation:
        "After the timer reaches its minimum delay, its callback becomes ready and enters the Task Queue.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 4,
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
        "The Call Stack is empty, so the Event Loop moves the Timer callback from the Task Queue onto the Call Stack.",
    },

    {
      id: "resolve-promise",
      lineNumber: 5,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        'resolve("Done") executes. The Promise changes from pending to fulfilled with the value "Done", so the attached .then() callback is scheduled in the Microtask Queue.',
    },

    {
      id: "timer-callback-exit",
      lineNumber: 6,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer callback finishes executing and leaves the Call Stack.",
    },

    {
      id: "then-callback-to-stack",
      lineNumber: 9,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Then Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Then Callback",
        },
      ],
      explanation:
        "The Call Stack is empty, so the waiting .then() callback moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-done",
      lineNumber: 10,
      type: "PRINT_CONSOLE",
      value: "Done",
      explanation:
        'The fulfilled value is received as value, so console.log(value) prints "Done".',
    },

    {
      id: "then-callback-exit",
      lineNumber: 11,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The .then() callback finishes executing and leaves the Call Stack.",
    },
  ],
}

export default pendingPromiseFulfilledLesson