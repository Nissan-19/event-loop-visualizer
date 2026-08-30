const eventListenerNoClickLesson = {
  id: "event-listener-no-click",
  title: "Event Listener Registration — No Click",
  topicId: "Topic9",

  codeLines: [
    "// Scenario: User never clicks",
    "// the button.",
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
        "document.querySelector() searches the document and returns the button with the id saveButton.",
    },

    {
      id: "register-listener",
      lineNumber: 10,
      type: "ADD_BROWSER_API",
      label: "Click Listener",
      explanation:
        "addEventListener() registers the click callback with the browser. The callback does not execute now and does not enter the Task Queue.",
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
        "The synchronous script finishes and Global leaves the Call Stack. The click listener remains registered with the browser.",
    },

    {
      id: "no-click",
      lineNumber: 1,
      type: "SYNC_WORK",
      label: "No Click Occurs",
      explanation:
        "The user never clicks the button, so the registered Click Callback is never scheduled in the Task Queue and never executes.",
    },
  ],
}

export default eventListenerNoClickLesson