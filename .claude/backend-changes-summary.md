# Backend Changes Summary - Resumable Optimization

This document summarizes the recent backend changes enabling **Resumable Optimization** for Optuna backtest tasks. Use this as a guide for implementing the Frontend UI.

## 1. Feature Overview: Resumable Optimization

Users can now:
1.  **Resume** a failed or cancelled optimization task (processing continues from where it left off).
2.  **Extend** a completed task by adding more trials (e.g., "Run 50 more trials").

## 2. GraphQL API Changes

A new mutation has been added to the `BacktestResolver`.

### New Mutation: `resumeBacktestTask`

```graphql
mutation ResumeBacktestTask($taskId: ID!, $additionalTrials: Int) {
  resumeBacktestTask(taskId: $taskId, additionalTrials: $additionalTrials) {
    id
    status
    trials          # Updated target trial count
    totalConfigs    # Same as trials for Optuna
    lastHeartbeat
  }
}
```

### Parameters
*   `taskId` (Required): The ID of the task to resume.
*   `additionalTrials` (Optional):
    *   **If omitted (or 0)**: Resumes the task using the *original* target trial count. Use this for `FAILED` or `CANCELLED` tasks.
    *   **If provided (> 0)**: Increases the target trial count by this amount. Use this for `DONE` tasks that you want to extend.

## 3. Usage Scenarios for Frontend

### Scenario A: Resuming a Failed/Cancelled Task
*   **Condition**: Task status is `FAILED` or `CANCELLED`.
*   **Generic UI**: Show a "Resume" button.
*   **Action**: Call `resumeBacktestTask(taskId: "...")` (no `additionalTrials`).
*   **Expected Result**: Status changes to `AWAIT`, then `PROCESSING`. The optimizer picks up existing study data and runs the remaining trials.

### Scenario B: Extending a Completed Task
*   **Condition**: Task status is `DONE` (and `searchStrategy` is `'optuna'`).
*   **Generic UI**: Show an "Extend Optimization" button or input (e.g., "Run +50 Trials").
*   **Action**: Call `resumeBacktestTask(taskId: "...", additionalTrials: 50)`.
*   **Expected Result**:
    *   Total `trials` count increases (e.g., 100 -> 150).
    *   Status changes to `AWAIT`.
    *   Optimizer starts and runs only the *new* 50 trials.

## 4. Other Notes
*   **Real-time Updates**: The existing subscription `backtestTaskUpdated` will emit events when the task status changes to `AWAIT`, `PROCESSING`, etc., just like a new task.
*   **Build Config**: `tsconfig.json` target was upgraded to `ES2022` to support modern dependencies. This shouldn't affect the frontend contract but is good to know.
