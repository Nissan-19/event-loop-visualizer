const multipleMicrotasksFifoLesson = {
  id: "multiple-microtasks-fifo",
  title: "Multiple Microtasks in FIFO Order",
  topicId: "Topic4",

  codeLines: [
    'console.log("Start");',
    '',
    'Promise.resolve().then(() => {',
    '  console.log("Promise 1");',
    '});',
    '',
    'Promise.resolve().then(() => {',
    '  console.log("Promise 2");',
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
      id: "promise-1-to-microtask",
      lineNumber: 3,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 1 Callback",
      explanation:
        "The first Promise is already fulfilled, so its .then() callback is added to the Microtask Queue.",
    },

    {
      id: "promise-2-to-microtask",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise 2 Callback",
      explanation:
        "The second Promise is also fulfilled, so its .then() callback is added behind Promise 1 in the Microtask Queue.",
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
      id: "promise-1-to-stack",
      lineNumber: 3,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Promise 1 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Promise 1 Callback",
        },
      ],
      explanation:
        "The Call Stack is empty. Because the Microtask Queue is FIFO, Promise 1's callback moves onto the Call Stack first.",
    },

    {
      id: "print-promise-1",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Promise 1",
      explanation:
        'Promise 1\'s callback executes and prints "Promise 1".',
    },

    {
      id: "promise-1-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Promise 1 Callback",
      explanation:
        "Promise 1's callback finishes and leaves the Call Stack.",
    },

    {
      id: "promise-2-to-stack",
      lineNumber: 7,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Promise 2 Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Promise 2 Callback",
        },
      ],
      explanation:
        "Promise 2 is now at the front of the Microtask Queue, so its callback moves onto the Call Stack.",
    },

    {
      id: "print-promise-2",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Promise 2",
      explanation:
        'Promise 2\'s callback executes and prints "Promise 2".',
    },

    {
      id: "promise-2-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Promise 2 Callback",
      explanation:
        "Promise 2's callback finishes and leaves the Call Stack.",
    },
  ],
}

export default multipleMicrotasksFifoLesson