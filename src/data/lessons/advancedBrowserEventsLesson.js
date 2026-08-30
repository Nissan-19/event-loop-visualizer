const advancedBrowserEventsLesson = {
  id: "advanced-browser-events",
  title: "Advanced Browser Events Challenge",
  topicId: "Topic9",

  codeLines: [
    "// Scenario:",
    "// Save is clicked during work.",
    "// Load is clicked after the script.",
    "// Cancel is never clicked.",
    "",
    "const saveButton = document.querySelector(",
    '  "#saveButton"',
    ");",
    "",
    "const loadButton = document.querySelector(",
    '  "#loadButton"',
    ");",
    "",
    "const cancelButton = document.querySelector(",
    '  "#cancelButton"',
    ");",
    "",
    'saveButton.addEventListener("click", () => {',
    '  console.log("Save");',
    "",
    "  Promise.resolve().then(() => {",
    '    console.log("Save Microtask");',
    "  });",
    "});",
    "",
    'loadButton.addEventListener("click", () => {',
    '  console.log("Load");',
    "});",
    "",
    'cancelButton.addEventListener("click", () => {',
    '  console.log("Cancel");',
    "});",
    "",
    "Promise.resolve().then(() => {",
    '  console.log("Promise");',
    "});",
    "",
    "function doWork() {",
    '  console.log("Work Start");',
    "",
    "  // User clicks Save here.",
    "  for (let i = 0; i < 1000000000; i++) {}",
    "",
    '  console.log("Work End");',
    "}",
    "",
    "doWork();",
    "",
    'console.log("End");',
    "",
    "// User clicks Load here.",
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
      id: "find-save-button",
      lineNumber: 6,
      type: "SYNC_WORK",
      label: "Find saveButton",
      explanation:
        "document.querySelector() finds the Save button.",
    },

    {
      id: "find-load-button",
      lineNumber: 10,
      type: "SYNC_WORK",
      label: "Find loadButton",
      explanation:
        "document.querySelector() finds the Load button.",
    },

    {
      id: "find-cancel-button",
      lineNumber: 14,
      type: "SYNC_WORK",
      label: "Find cancelButton",
      explanation:
        "document.querySelector() finds the Cancel button.",
    },

    {
      id: "register-save-listener",
      lineNumber: 18,
      type: "ADD_BROWSER_API",
      label: "Save Listener",
      explanation:
        "The Save Click Listener is registered with the browser. Its callback is not scheduled yet.",
    },

    {
      id: "register-load-listener",
      lineNumber: 26,
      type: "ADD_BROWSER_API",
      label: "Load Listener",
      explanation:
        "The Load Click Listener is registered with the browser. Its callback is waiting for a future click.",
    },

    {
      id: "register-cancel-listener",
      lineNumber: 30,
      type: "ADD_BROWSER_API",
      label: "Cancel Listener",
      explanation:
        "The Cancel Click Listener is registered with the browser. Cancel is never clicked in this scenario.",
    },

    {
      id: "global-promise-fulfilled",
      lineNumber: 34,
      type: "SYNC_WORK",
      label: "Promise Fulfilled",
      explanation:
        "Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "global-promise-to-microtask",
      lineNumber: 34,
      type: "ADD_MICROTASK_QUEUE",
      label: "Promise Callback",
      explanation:
        "The .then() callback is scheduled in the Microtask Queue.",
    },

    {
      id: "do-work-enter",
      lineNumber: 47,
      type: "PUSH_STACK",
      label: "doWork",
      explanation:
        "doWork() is called and enters the Call Stack above Global.",
    },

    {
      id: "print-work-start",
      lineNumber: 39,
      type: "PRINT_CONSOLE",
      value: "Work Start",
      explanation:
        'doWork prints "Work Start" and continues executing synchronously.',
    },

    {
      id: "save-click-occurs",
      lineNumber: 41,
      type: "SYNC_WORK",
      label: "User Clicks Save",
      explanation:
        "The user clicks Save while doWork is still running.",
    },

    {
      id: "save-to-task",
      lineNumber: 41,
      type: "ADD_TASK_QUEUE",
      label: "Save Callback",
      explanation:
        "The Save Callback enters the Task Queue. It cannot interrupt doWork, so it waits.",
    },

    {
      id: "continue-work",
      lineNumber: 42,
      type: "SYNC_WORK",
      label: "Continue Synchronous Work",
      explanation:
        "doWork continues running while the Save Callback waits in the Task Queue.",
    },

    {
      id: "print-work-end",
      lineNumber: 44,
      type: "PRINT_CONSOLE",
      value: "Work End",
      explanation:
        'doWork finishes its synchronous work and prints "Work End".',
    },

    {
      id: "do-work-exit",
      lineNumber: 45,
      type: "POP_STACK",
      label: "doWork",
      explanation:
        "doWork finishes and leaves the Call Stack. Global continues.",
    },

    {
      id: "print-end",
      lineNumber: 49,
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
        "The initial synchronous script finishes and Global leaves the Call Stack.",
    },

    {
      id: "load-click-occurs",
      lineNumber: 51,
      type: "SYNC_WORK",
      label: "User Clicks Load",
      explanation:
        "After the script has finished, the user clicks Load.",
    },

    {
      id: "load-to-task",
      lineNumber: 51,
      type: "ADD_TASK_QUEUE",
      label: "Load Callback",
      explanation:
        "The Load Callback enters the Task Queue behind the already-waiting Save Callback.",
    },

    {
      id: "global-promise-to-stack",
      lineNumber: 34,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Promise Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Promise Callback",
        },
      ],
      explanation:
        "The queued Promise callback is a microtask, so it runs before the waiting event tasks.",
    },

    {
      id: "print-promise",
      lineNumber: 35,
      type: "PRINT_CONSOLE",
      value: "Promise",
      explanation:
        'The Promise callback executes and prints "Promise".',
    },

    {
      id: "global-promise-exit",
      lineNumber: 36,
      type: "POP_STACK",
      label: "Promise Callback",
      explanation:
        "The Promise callback finishes and leaves the Call Stack.",
    },

    {
      id: "save-to-stack",
      lineNumber: 18,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Save Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Save Callback",
        },
      ],
      explanation:
        "Save Callback was the first waiting task, so the Event Loop moves it to the Call Stack.",
    },

    {
      id: "print-save",
      lineNumber: 19,
      type: "PRINT_CONSOLE",
      value: "Save",
      explanation:
        'The Save Callback executes and prints "Save".',
    },

    {
      id: "save-promise-fulfilled",
      lineNumber: 21,
      type: "SYNC_WORK",
      label: "Save Promise Fulfilled",
      explanation:
        "Inside the Save Callback, Promise.resolve() creates an already-fulfilled Promise.",
    },

    {
      id: "save-microtask-added",
      lineNumber: 21,
      type: "ADD_MICROTASK_QUEUE",
      label: "Save Microtask",
      explanation:
        "The .then() callback is scheduled in the Microtask Queue while the Save Callback is still running.",
    },

    {
      id: "save-exit",
      lineNumber: 24,
      type: "POP_STACK",
      label: "Save Callback",
      explanation:
        "The Save Callback finishes and leaves the Call Stack.",
    },

    {
      id: "save-microtask-to-stack",
      lineNumber: 21,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "Save Microtask",
        },
        {
          type: "PUSH_STACK",
          label: "Save Microtask",
        },
      ],
      explanation:
        "Before the Event Loop can run the next waiting task, the newly-created Save Microtask must run.",
    },

    {
      id: "print-save-microtask",
      lineNumber: 22,
      type: "PRINT_CONSOLE",
      value: "Save Microtask",
      explanation:
        'The microtask executes and prints "Save Microtask".',
    },

    {
      id: "save-microtask-exit",
      lineNumber: 23,
      type: "POP_STACK",
      label: "Save Microtask",
      explanation:
        "The Save Microtask finishes and leaves the Call Stack.",
    },

    {
      id: "load-to-stack",
      lineNumber: 26,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Load Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Load Callback",
        },
      ],
      explanation:
        "The Microtask Queue is empty, so the Event Loop now moves the Load Callback to the Call Stack.",
    },

    {
      id: "print-load",
      lineNumber: 27,
      type: "PRINT_CONSOLE",
      value: "Load",
      explanation:
        'The Load Callback executes and prints "Load".',
    },

    {
      id: "load-exit",
      lineNumber: 28,
      type: "POP_STACK",
      label: "Load Callback",
      explanation:
        "The Load Callback finishes and leaves the Call Stack. Save, Load and Cancel listeners remain registered with the browser and can respond to future clicks unless explicitly removed with removeEventListener().",
    },
  ],
}

export default advancedBrowserEventsLesson