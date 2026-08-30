const clickVsPromiseMicrotaskLesson = {
  id: "click-vs-promise-microtask",
  title: "Click Event vs Promise Microtask",
  topicId: "Topic9",

  codeLines: [
    "// Scenario: User clicks after",
    "// synchronous execution finishes.",
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
    "Promise.resolve().then(() => {",
    '  console.log("Promise");',
    "});",
    "",
    'console.log("End");',
    "",
    "// User clicks the button here.",
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
        "document.querySelector() finds the button with the id saveButton.",
    },

    {
      id: "register-listener",
      lineNumber: 10,
      type: "ADD_BROWSER_API",
      label: "Click Listener",
      explanation:
        "addEventListener() registers the Click Callback with the browser. No click has occurred yet, so the callback is not scheduled.",
    },

    {
      id: "promise-fulfilled",
      lineNumber: 14,
      type: "SYNC_WORK",
      label: "Promise Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "promise-to-microtask",
      lineNumber: 14,
      type: "ADD_MICROTASK_QUEUE",
      label: "Then Callback",
      explanation:
        "Because the Promise is already fulfilled, the .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "print-end",
      lineNumber: 18,
      type: "PRINT_CONSOLE",
      value: "End",
      explanation:
        'console.log("End") prints End synchronously.',
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
      id: "user-clicks",
      lineNumber: 20,
      type: "SYNC_WORK",
      label: "User Clicks",
      explanation:
        "After synchronous execution has finished, the user clicks the button.",
    },

    {
      id: "click-to-task-queue",
      lineNumber: 20,
      type: "ADD_TASK_QUEUE",
      label: "Click Callback",
      explanation:
        "The click event occurs, so the registered Click Callback becomes ready and enters the Task Queue.",
    },

    {
      id: "promise-to-stack",
      lineNumber: 14,
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
        "The Promise callback is a microtask, so it is processed before the waiting click task.",
    },

    {
      id: "print-promise",
      lineNumber: 15,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The .then() callback executes and prints "Promise".',
    },

    {
      id: "promise-exit",
      lineNumber: 16,
      type: "POP_STACK",
      label: "Then Callback",
      explanation:
        "The Promise callback finishes and leaves the Call Stack.",
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
        "The Microtask Queue is now empty, so the Event Loop moves the Click Callback from the Task Queue to the Call Stack.",
    },

    {
      id: "print-clicked",
      lineNumber: 11,
      type: "PRINT_CONSOLE",
      value: "Clicked",
      explanation:
        'The Click Callback executes and prints "Clicked".',
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

export default clickVsPromiseMicrotaskLesson