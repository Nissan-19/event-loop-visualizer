const rejectedPromiseLesson = {
  id: "rejected-promise",
  title: "Rejected Promise",
  topicId: "Topic4",

  codeLines: [
    'console.log("Start");',
    '',
    'Promise.reject("Something went wrong").catch((error) => {',
    '  console.log(error);',
    '  console.log("Error handled");',
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
      id: "catch-callback-to-microtask",
      lineNumber: 3,
      type: "ADD_MICROTASK_QUEUE",
      label: "Catch Callback",
      explanation:
        'Promise.reject() creates an already rejected Promise. "Something went wrong" becomes its rejection reason, and the .catch() callback is scheduled in the Microtask Queue.',
    },

    {
      id: "print-end",
      lineNumber: 8,
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
      id: "catch-callback-to-stack",
      lineNumber: 3,
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
        "The Call Stack is empty, so the .catch() callback moves from the Microtask Queue onto the Call Stack.",
    },

    {
      id: "print-rejection-reason",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Something went wrong",
      explanation:
        'The rejection reason was received as the error parameter. console.log(error) prints "Something went wrong".',
    },

    {
      id: "print-error-handled",
      lineNumber: 5,
      type: "PRINT_CONSOLE",
      value: "Error handled",
      explanation:
        'The next line in the .catch() callback prints "Error handled".',
    },

    {
      id: "catch-callback-exit",
      lineNumber: 6,
      type: "POP_STACK",
      label: "Catch Callback",
      explanation:
        "The .catch() callback has finished executing and leaves the Call Stack.",
    },
  ],
}

export default rejectedPromiseLesson