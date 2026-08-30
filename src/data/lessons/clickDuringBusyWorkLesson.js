const clickDuringBusyWorkLesson = {
  id: "click-during-busy-work",
  title: "Click During Busy Synchronous Work",
  topicId: "Topic9",

  codeLines: [
    "// Scenario: User clicks while",
    "// synchronous work is running.",
    "",
    'console.log("Start");',
    "",
    "const button = document.querySelector(",
    '  "#saveButton"',
    ");",
    "",
    'button.addEventListener("click", () => {',
    '  console.log("Clicked");',
    "});",
    "",
    "function doHeavyWork() {",
    '  console.log("Work Start");',
    "",
    "  // User clicks while this",
    "  // synchronous work is running.",
    "  for (let i = 0; i < 1000000000; i++) {",
    "    // Long synchronous work",
    "  }",
    "",
    '  console.log("Work End");',
    "}",
    "",
    "doHeavyWork();",
    "",
    'console.log("End");',
  ],

  steps: [
    {
      id: "global-enter",
      lineNumber: null,
      type: "PUSH_STACK",
      label: "Global",
      explanation:
        "Global enters the Call Stack.",
    },

    {
      id: "print-start",
      lineNumber: 4,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") prints Start synchronously.',
    },

    {
      id: "find-button",
      lineNumber: 6,
      type: "SYNC_WORK",
      label: "Find saveButton",
      explanation:
        "document.querySelector() searches the document and finds the button with the id saveButton.",
    },

    {
      id: "register-listener",
      lineNumber: 10,
      type: "ADD_BROWSER_API",
      label: "Click Listener",
      explanation:
        "addEventListener() registers the Click Callback with the browser. The callback is not scheduled yet because no click has occurred.",
    },

    {
      id: "heavy-work-enter",
      lineNumber: 26,
      type: "PUSH_STACK",
      label: "doHeavyWork",
      explanation:
        "doHeavyWork() is called and enters the Call Stack above Global.",
    },

    {
      id: "print-work-start",
      lineNumber: 15,
      type: "PRINT_CONSOLE",
      value: "Work Start",
      explanation:
        'doHeavyWork prints "Work Start" and continues executing synchronously.',
    },

    {
      id: "heavy-work-running",
      lineNumber: 19,
      type: "SYNC_WORK",
      label: "Long Synchronous Work",
      explanation:
        "The loop begins long synchronous work. doHeavyWork remains on the Call Stack.",
    },

    {
      id: "user-clicks",
      lineNumber: 17,
      type: "SYNC_WORK",
      label: "User Clicks",
      explanation:
        "The user clicks the button while doHeavyWork is still running.",
    },

    {
      id: "click-to-task-queue",
      lineNumber: 17,
      type: "ADD_TASK_QUEUE",
      label: "Click Callback",
      explanation:
        "The click event occurs, so the registered Click Callback becomes ready and enters the Task Queue. It cannot interrupt the synchronous work currently running.",
    },

    {
      id: "continue-heavy-work",
      lineNumber: 19,
      type: "SYNC_WORK",
      label: "Continue Synchronous Work",
      explanation:
        "doHeavyWork continues running while the Click Callback waits in the Task Queue.",
    },

    {
      id: "print-work-end",
      lineNumber: 23,
      type: "PRINT_CONSOLE",
      value: "Work End",
      explanation:
        'The long synchronous work finishes and console.log("Work End") prints Work End.',
    },

    {
      id: "heavy-work-exit",
      lineNumber: 24,
      type: "POP_STACK",
      label: "doHeavyWork",
      explanation:
        "doHeavyWork finishes and leaves the Call Stack. Global is still running.",
    },

    {
      id: "print-end",
      lineNumber: 28,
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
        "The synchronous script finishes and Global leaves the Call Stack.",
    },

    {
      id: "click-to-stack",
      lineNumber: 10,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Click Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Click Callback",
        },
      ],
      explanation:
        "The Call Stack is now empty, so the Event Loop moves the waiting Click Callback from the Task Queue to the Call Stack.",
    },

    {
      id: "print-clicked",
      lineNumber: 11,
      type: "PRINT_CONSOLE",
      value: "Clicked",
      explanation:
        'The Click Callback executes and console.log("Clicked") prints Clicked.',
    },

    {
      id: "click-exit",
      lineNumber: 12,
      type: "POP_STACK",
      label: "Click Callback",
      explanation:
        "The Click Callback finishes and leaves the Call Stack. The Click Listener remains registered with the browser, so another click can schedule the callback again unless the listener is explicitly removed with removeEventListener().",
    },
  ],
}

export default clickDuringBusyWorkLesson