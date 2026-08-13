const functionCallLesson = {
  id: "function-call", //stable internal identifier used by the application.
  title: "Function Call", //human-readable lesson name.

  codeLines: [      //stores the code as separate lines. This will let CodePanel render and highlight an individual line later.
    'console.log("Start");',
    '',
    'function greetUser() {',
    '  console.log("Hello");',
    '}',
    '',
    'greetUser();',
    '',
    'console.log("End");',
  ],

  steps: [
    {
        id: "global-enter",
        lineNumber: null,
        type: "PUSH_STACK", 
        label: "Global", //label because it affect a named stack frame
        explanation:
        "The Global execution context is created and added to the Call Stack.",
    },
    {
        id: "print-start",
        lineNumber: 1,
        type: "PRINT_CONSOLE",
        value: "Start", //value to be added to the console
        explanation:
        'console.log("Start") executes synchronously and prints Start.',
    },
    {
        id: "greet-user-enter",
        lineNumber: 7,
        type: "PUSH_STACK",
        label: "greetUser", //lable because it affect a named stack frame
        explanation:
        "greetUser() is called, so its execution frame is added to the Call Stack.",
    },
    {
        id: "print-hello",
        lineNumber: 4,
        type: "PRINT_CONSOLE",
        value: "Hello",
        explanation:
        'console.log("Hello") executes inside greetUser and prints Hello.',
    },
    {
        id: "greet-user-exit",
        lineNumber: 5,
        type: "POP_STACK",
        label: "greetUser",
        explanation:
        "greetUser has finished executing, so its frame is removed from the Call Stack.",
    },
    {
        id: "print-end",
        lineNumber: 9,
        type: "PRINT_CONSOLE",
        value: "End",
        explanation:
        'console.log("End") executes synchronously and prints End.',
    },
    {
        id: "global-exit",
        lineNumber: null,
        type: "POP_STACK",
        label: "Global",
        explanation:
        "The script has finished executing, so Global is removed from the Call Stack.",
    },
    ],
}

export default functionCallLesson