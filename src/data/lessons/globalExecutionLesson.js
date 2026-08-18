const globalExecutionLesson = {
  id: "global-execution", // stable internal identifier used by the application.
  title: "Global Execution", // human-readable lesson name.
  topicId: "Topic1",

  codeLines: [
    // stores the code as separate lines so CodePanel can highlight each line.
    'console.log("First");',
    'console.log("Second");',
    'console.log("Third");',
    'console.log("Fourth");',
    'console.log("Fifth");',
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
      id: "print-first",
      lineNumber: 1,
      type: "PRINT_CONSOLE",
      value: "First",
      explanation:
        'console.log("First") executes synchronously and prints First.',
    },
    {
      id: "print-second",
      lineNumber: 2,
      type: "PRINT_CONSOLE",
      value: "Second",
      explanation:
        'console.log("Second") executes synchronously and prints Second.',
    },
    {
      id: "print-third",
      lineNumber: 3,
      type: "PRINT_CONSOLE",
      value: "Third",
      explanation:
        'console.log("Third") executes synchronously and prints Third.',
    },
    {
      id: "print-fourth",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Fourth",
      explanation:
        'console.log("Fourth") executes synchronously and prints Fourth.',
    },
    {
      id: "print-fifth",
      lineNumber: 5,
      type: "PRINT_CONSOLE",
      value: "Fifth",
      explanation:
        'console.log("Fifth") executes synchronously and prints Fifth.',
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

export default globalExecutionLesson