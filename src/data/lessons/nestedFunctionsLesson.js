const nestedFunctionsLesson = {
  id: "nested-functions", // stable internal identifier used by the application.
  title: "Nested Functions", // human-readable lesson name.
  topicId: "Topic1",

  codeLines: [
    // stores the code as separate lines so CodePanel can highlight individual lines.
    'console.log("Start");',
    '',
    'function outer() {',
    '  console.log("Outer Start");',
    '',
    '  function inner() {',
    '    console.log("Inner");',
    '  }',
    '',
    '  inner();',
    '',
    '  console.log("Outer End");',
    '}',
    '',
    'outer();',
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
      id: "outer-enter",
      lineNumber: 15,
      type: "PUSH_STACK",
      label: "outer",
      explanation:
        "outer() is called, so its execution frame is added on top of Global in the Call Stack.",
    },
    {
      id: "print-outer-start",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Outer Start",
      explanation:
        'console.log("Outer Start") executes inside outer and prints Outer Start.',
    },
    {
      id: "inner-enter",
      lineNumber: 10,
      type: "PUSH_STACK",
      label: "inner",
      explanation:
        "inner() is called from inside outer, so a new inner frame is added on top of the Call Stack.",
    },
    {
      id: "print-inner",
      lineNumber: 7,
      type: "PRINT_CONSOLE",
      value: "Inner",
      explanation:
        'console.log("Inner") executes inside inner and prints Inner.',
    },
    {
      id: "inner-exit",
      lineNumber: 8,
      type: "POP_STACK",
      label: "inner",
      explanation:
        "inner has finished executing, so its frame is removed from the Call Stack and execution returns to outer.",
    },
    {
      id: "print-outer-end",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "Outer End",
      explanation:
        'Execution continues inside outer, and console.log("Outer End") prints Outer End.',
    },
    {
      id: "outer-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "outer",
      explanation:
        "outer has finished executing, so its frame is removed and execution returns to Global.",
    },
    {
      id: "print-end",
      lineNumber: 17,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'console.log("End") executes in the Global context and prints End.',
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

export default nestedFunctionsLesson