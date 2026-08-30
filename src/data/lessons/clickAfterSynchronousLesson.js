const clickAfterSynchronousLesson = {
  id: "click-after-synchronous",
  title: "Click After Synchronous Execution",
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
        'console.log("Start") executes synchronously and prints Start.',
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
        "addEventListener() registers the click callback with the browser. The callback does not execute yet.",
    },

    {
      id: "print-end",
      lineNumber: 14,
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
        "The synchronous script finishes and Global leaves the Call Stack.",
    },

    {
      id: "click-occurs",
      lineNumber: 16,
      type: "SYNC_WORK",
      label: "User Clicks",
      explanation:
        "The user clicks the button after the synchronous script has finished. The browser recognises the click event.",
    },

    {
      id: "click-to-task-queue",
      lineNumber: 16,
      type: "ADD_TASK_QUEUE",
      label: "Click Callback",
      explanation:
        "Because the registered click event has occurred, the Click Callback becomes eligible and enters the Task Queue.",
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
        "The Call Stack is empty, so the Event Loop moves the Click Callback from the Task Queue to the Call Stack.",
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

export default clickAfterSynchronousLesson