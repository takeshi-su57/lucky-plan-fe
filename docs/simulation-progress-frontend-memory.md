# Simulation Progress Frontend Memory

Backend now treats `resumeSimulation` as an async trigger. The mutation returns quickly after accepting the work; live progress should be rendered from a dedicated GraphQL subscription, and refresh/replay should use a dedicated history query.

## Main Flow

1. Call `resumeSimulation(id, speed)`.
2. If `accepted` is true, show the simulation progress widget immediately.
3. Subscribe to `simulationProgressUpdated(userId, planId)` for live progress events.
4. Also subscribe to existing `planUpdated(userId)` if the page needs plan status/cursor changes.
5. On page load or refresh, call `getSimulationProgressLogs(planId, first: 50)` to rebuild the recent progress timeline.

## Live Subscription

```graphql
subscription SimulationProgress($userId: String!, $planId: Int!) {
  simulationProgressUpdated(userId: $userId, planId: $planId) {
    id
    planId
    userId
    runId
    phase
    status
    message
    details
    percent
    windowStart
    windowEnd
    leaderActionCount
    virtualActionCount
    virtualTaskCount
    finalizedTaskCount
    stoppedTaskCount
    executionIterations
    createdAt
  }
}
```

## Refresh/History Query

```graphql
query SimulationProgressHistory($planId: Int!, $first: Int = 50, $after: Int) {
  getSimulationProgressLogs(planId: $planId, first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        runId
        phase
        status
        message
        details
        percent
        windowStart
        windowEnd
        leaderActionCount
        virtualActionCount
        virtualTaskCount
        finalizedTaskCount
        stoppedTaskCount
        executionIterations
        createdAt
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

History is newest-first. Use the first edge as the latest widget state, and render the rest as a recent activity timeline.

## Widget Model

Recommended top-level widget state:

- `status`: `Accepted`, `Running`, `Completed`, `Failed`, `Finished`, or `Rejected`
- `percent`: approximate progress from 0 to 100
- `message`: human-readable current step
- `phase`: machine-friendly step key, such as `leader-chunk-scan-started`
- `runId`: groups all events from one resume request
- `details`: JSON string with verbose debug context
- counters: `leaderActionCount`, `virtualActionCount`, `virtualTaskCount`, `finalizedTaskCount`, `stoppedTaskCount`, `executionIterations`

Suggested UI:

- Progress bar from `percent`.
- Status badge from `status`.
- Current text from `message`.
- Small secondary line from `phase`.
- Collapsible log drawer from recent progress events.
- Advanced/details view parses `details` JSON and displays contract IDs, block ranges, action names, errors, and stats.

## Important Behavior

- `resumeSimulation` no longer waits for the full simulation process. Do not rely on the mutation response for final counts.
- Completion is signaled by a progress event with `status: "Completed"` and `percent: 100`.
- Failure is signaled by `status: "Failed"` and `percent: 100`; the backend pauses the plan back at the previous simulation cursor.
- If the plan is already running, the mutation returns `accepted: false`, and a progress event with `status: "Rejected"` is written.
- The existing `newLog` subscription still receives verbose debug logs, but the progress widget should use `simulationProgressUpdated`.

## Backend Files

- `prisma/schema.prisma`: `SimulationProgressLog`
- `src/microservices/apiService/modules/plans/entities/plan.entity.ts`: GraphQL progress types
- `src/microservices/apiService/modules/plans/plans.resolver.ts`: query and subscription
- `src/microservices/apiService/modules/plans/plan-simulation.service.ts`: progress persistence and publishing
- `src/utils/constants.ts`: subscription and Redis event tokens
