const multipleBrowserEventsLesson = {
  id: "multiple-browser-events",
  title: "Multiple Browser Events",
  topicId: "Topic9",

  codeLines: [
    "// Scenario:",
    "// 1. Script finishes.",
    "// 2. User presses a key.",
    "// 3. User clicks Save.",
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
    'document.addEventListener("keydown", () => {',
    '  console.log("Key pressed");',
    "});",
    "",
    'console.log("End");',
    "",
    "// User presses a key.",
    "// User clicks Save.",
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
      lineNumber: 6,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") prints Start synchronously.',
    },

    {
      id: "find-button",
      lineNumber: 8,
      type: "SYNC_WORK",
      label: "Find saveButton",
      explanation:
        "document.querySelector() finds the button with the id saveButton.",
    },

    {
      id: "register-click-listener",
      lineNumber: 12,
      type: "ADD_BROWSER_API",
      label: "Click Listener",
      explanation:
        "The Click Listener is registered with the browser. Its callback is not scheduled because no click has occurred yet.",
    },

    {
      id: "register-keydown-listener",
      lineNumber: 16,
      type: "ADD_BROWSER_API",
      label: "Keydown Listener",
      explanation:
        "The Keydown Listener is registered with the browser. Its callback is also waiting for a future event.",
    },

    {
      id: "print-end",
      lineNumber: 20,
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
      id: "keydown-occurs",
      lineNumber: 22,
      type: "SYNC_WORK",
      label: "User Presses Key",
      explanation:
        "The user presses a key first. The browser recognises the keydown event.",
    },

    {
      id: "keydown-to-task",
      lineNumber: 22,
      type: "ADD_TASK_QUEUE",
      label: "Keydown Callback",
      explanation:
        "The Keydown Callback becomes ready and enters the Task Queue first.",
    },

    {
      id: "click-occurs",
      lineNumber: 23,
      type: "SYNC_WORK",
      label: "User Clicks",
      explanation:
        "The user clicks Save after the key press. The browser recognises the click event.",
    },

    {
      id: "click-to-task",
      lineNumber: 23,
      type: "ADD_TASK_QUEUE",
      label: "Click Callback",
      explanation:
        "The Click Callback enters the Task Queue after the already-waiting Keydown Callback.",
    },

    {
      id: "keydown-to-stack",
      lineNumber: 16,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Keydown Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Keydown Callback",
        },
      ],
      explanation:
        "The Keydown Callback was queued first, so the Event Loop moves it to the Call Stack first.",
    },

    {
      id: "print-key",
      lineNumber: 17,
      type: "PRINT_CONSOLE",
      value: "Key pressed",
      explanation:
        'The Keydown Callback executes and prints "Key pressed".',
    },

    {
      id: "keydown-exit",
      lineNumber: 18,
      type: "POP_STACK",
      label: "Keydown Callback",
      explanation:
        "The Keydown Callback finishes and leaves the Call Stack.",
    },

    {
      id: "click-to-stack",
      lineNumber: 12,
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
        "The Click Callback is now the next task, so the Event Loop moves it to the Call Stack.",
    },

    {
      id: "print-clicked",
      lineNumber: 13,
      type: "PRINT_CONSOLE",
      value: "Clicked",
      explanation:
        'The Click Callback executes and prints "Clicked".',
    },

    {
      id: "click-exit",
      lineNumber: 14,
      type: "POP_STACK",
      label: "Click Callback",
      explanation:
        "The Click Callback finishes and leaves the Call Stack. Both listeners remain registered with the browser, so future key presses or clicks can schedule their callbacks again unless the listeners are explicitly removed with removeEventListener().",
    },
  ],
}

export default multipleBrowserEventsLesson