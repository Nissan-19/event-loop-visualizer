const asyncPendingWhileAwaitingLesson = {
  id: "async-pending-while-awaiting",
  title: "Async Function Pending While Awaiting",
  topicId: "Topic7",

  codeLines: [
    'console.log("Start");',
    '',
    'async function fetchResult() {',
    '  const value = await new Promise(',
    '    (resolve) => {',
    '      setTimeout(() => {',
    '        resolve("Data ready");',
    '      }, 1000);',
    '    }',
    '  );',
    '',
    '  console.log(value);',
    '}',
    '',
    'fetchResult();',
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
        "Global enters the Call Stack.",
    },

    {
      id: "print-start",
      lineNumber: 1,
      type: "PRINT_CONSOLE",
      value: "Start",
      explanation:
        'console.log("Start") prints Start.',
    },

    {
      id: "fetch-result-enter",
      lineNumber: 15,
      type: "PUSH_STACK",
      label: "fetchResult",
      explanation:
        "fetchResult() is called. Because it is async, it returns a Promise. That returned Promise is currently pending.",
    },

    {
      id: "create-promise",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: "Create Pending Promise",
      explanation:
        "new Promise(...) creates the Promise that will be awaited. Its executor runs immediately and synchronously.",
    },

    {
      id: "register-timer",
      lineNumber: 6,
      type: "ADD_BROWSER_API",
      label: "Timer",
      explanation:
        "The Promise executor calls setTimeout. The timer is registered with the Browser APIs for a minimum delay of 1000ms. resolve() has not run yet, so the awaited Promise is still pending.",
    },

    {
      id: "await-pending-promise",
      lineNumber: 4,
      type: "POP_STACK",
      label: "fetchResult",
      explanation:
        "await sees a pending Promise, so fetchResult is suspended and leaves the Call Stack. Its continuation is NOT added to the Microtask Queue yet.",
    },

    {
      id: "print-end",
      lineNumber: 17,
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
        "Synchronous execution finishes and Global leaves the Call Stack.",
    },

    {
      id: "timer-ready",
      lineNumber: 6,
      actions: [
        {
          type: "REMOVE_BROWSER_API",
          label: "Timer",
        },
        {
          type: "ADD_TASK_QUEUE",
          label: "Timer Callback",
        },
      ],
      explanation:
        "After the minimum delay has passed, the timer callback becomes ready and enters the Task Queue.",
    },

    {
      id: "timer-to-stack",
      lineNumber: 6,
      actions: [
        {
          type: "REMOVE_TASK_QUEUE",
          label: "Timer Callback",
        },
        {
          type: "PUSH_STACK",
          label: "Timer Callback",
        },
      ],
      explanation:
        "The Call Stack is empty, so the Event Loop moves the Timer Callback from the Task Queue to the Call Stack.",
    },

    {
      id: "resolve-promise",
      lineNumber: 7,
      type: "SYNC_WORK",
      label: 'Resolve: "Data ready"',
      explanation:
        'resolve("Data ready") finally executes. The Promise being awaited changes from pending to fulfilled with the value "Data ready".',
    },

    {
      id: "schedule-continuation",
      lineNumber: 7,
      type: "ADD_MICROTASK_QUEUE",
      label: "fetchResult Continuation",
      explanation:
        "Now that the awaited Promise is fulfilled, fetchResult can continue. Its continuation is scheduled in the Microtask Queue.",
    },

    {
      id: "timer-exit",
      lineNumber: 8,
      type: "POP_STACK",
      label: "Timer Callback",
      explanation:
        "The Timer Callback finishes and leaves the Call Stack.",
    },

    {
      id: "continuation-to-stack",
      lineNumber: 4,
      actions: [
        {
          type: "REMOVE_MICROTASK_QUEUE",
          label: "fetchResult Continuation",
        },
        {
          type: "PUSH_STACK",
          label: "fetchResult Continuation",
        },
      ],
      explanation:
        "The fetchResult continuation moves from the Microtask Queue to the Call Stack.",
    },

    {
      id: "await-produces-value",
      lineNumber: 4,
      type: "SYNC_WORK",
      label: 'value = "Data ready"',
      explanation:
        'When fetchResult resumes, the fulfilled value of the awaited Promise becomes the result of await. Therefore value becomes "Data ready".',
    },

    {
      id: "print-data",
      lineNumber: 12,
      type: "PRINT_CONSOLE",
      value: "Data ready",
      explanation:
        'console.log(value) prints "Data ready".',
    },

    {
      id: "fetch-result-finished",
      lineNumber: 13,
      type: "SYNC_WORK",
      label: "Async Promise Fulfilled",
      explanation:
        "fetchResult has now completed normally. The Promise originally returned by fetchResult becomes fulfilled with undefined.",
    },

    {
      id: "continuation-exit",
      lineNumber: 13,
      type: "POP_STACK",
      label: "fetchResult Continuation",
      explanation:
        "fetchResult has finished, so its continuation leaves the Call Stack.",
    },
  ],
}

export default asyncPendingWhileAwaitingLesson