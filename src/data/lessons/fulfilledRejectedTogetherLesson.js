const fulfilledRejectedTogetherLesson = {
  id: "fulfilled-rejected-together",
  title: "Fulfilled and Rejected Together",
  topicId: "Topic5",

  codeLines: [
    'console.log("Start");',
    '',
    'Promise.resolve("Success").then((value) => {',
    '  console.log(value);',
    '});',
    '',
    'Promise.reject("Failure").catch((error) => {',
    '  console.log(error);',
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
      id: "fulfilled-promise-to-microtask",
      lineNumber: 3,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        'Promise.resolve("Success") creates an already fulfilled Promise. The attached .then() callback is scheduled in the Microtask Queue.',
    },

    {
      id: "rejected-promise-to-microtask",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "Catch Callback",
      explanation:
        'Promise.reject("Failure") creates an already rejected Promise. The attached .catch() callback is scheduled behind the first callback in the Microtask Queue.',
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
      id: "then-callback-to-stack",
      lineNumber: 3,
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
        "The Call Stack is empty. The Microtask Queue is processed in FIFO order, so the .then() callback moves onto the Call Stack first.",
    },

    {
      id: "print-success",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Success",
      explanation:
        'The fulfilled value is received as value, so console.log(value) prints "Success".',
    },

    {
      id: "then-callback-exit",
      lineNumber: 5,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The .then() callback finishes and leaves the Call Stack.",
    },

    {
      id: "catch-callback-to-stack",
      lineNumber: 7,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Catch Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Catch Callback",
        },
      ],
      explanation:
        "The .catch() callback is now at the front of the Microtask Queue, so it moves onto the Call Stack.",
    },

    {
      id: "print-failure",
      lineNumber: 8,
      type: "PRINT_CONSOLE",
      value: "Failure",
      explanation:
        'The rejection reason is received as error, so console.log(error) prints "Failure".',
    },

    {
      id: "catch-callback-exit",
      lineNumber: 9,
      type: "POP_STACK",
      label: "Catch Callback",
      explanation:
        "The .catch() callback finishes and leaves the Call Stack.",
    },
  ],
}

export default fulfilledRejectedTogetherLesson