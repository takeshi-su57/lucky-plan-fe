# Minimum-Change Simulation Plan

## Purpose

This document captures the current product intent for introducing simulation into the existing copy trading backend.

The primary goal is not to redesign the whole copy trading architecture, and not to refactor the current live system into a perfect event-driven platform. The current architecture has already operated for about a year and a half, so the first simulation implementation should respect that working system and add the smallest useful layer around it.

The goal is:

- Add simulation plans.
- Make simulation behave very similarly to live mode.
- Reuse the current plan, bot, mission, task, action, and subscription flow as much as possible.
- Allow users to run simulation in resumable time windows.
- Let users pause, inspect results, modify bots/options, then resume.
- Keep the door open for future backtesting and deeper architecture improvements.

This is a working direction, not a binding final decision. The implementation may change as we refactor.

## Product Story

User creates a simulation plan.

The simulation plan has:

- Historical start date.
- Historical end date.
- Current simulation cursor.
- Simulation speed, such as `4x`, `8x`, `16x`.
- Bots and strategies similar to live plans.

User clicks `Resume`.

The simulation runs for one simulated day, then stops automatically.

Example:

```text
simulationCursor = 2025-01-01 10:00
speed = 8x
resume clicked
simulation processes events until 2025-01-02 10:00
simulation pauses
```

While paused, the user can inspect:

- PnL chart.
- Open positions.
- Closed positions.
- Bot performance.
- Mission history.
- Task history.
- Filtered or skipped leader events.

Then the user can modify:

- Bot options.
- Strategy options.
- Add bot.
- Delete bot.
- Pause/stop specific bots.

Then the user clicks `Resume` again.

The simulation continues from the current simulation cursor using the new configuration from that point forward.

## Design Principle

Simulation should not be fake frontend state.

Simulation should be a real backend workflow that:

- Writes database state.
- Emits the same subscription events as live mode.
- Uses the same mission/task/action shape where practical.
- Has a durable simulation cursor.
- Can pause and resume.
- Can produce reports from stored simulated state.

Most importantly:

```text
Live and simulation should share the same domain flow as much as possible.
```

The preferred flow is:

```text
Plan -> Bot -> Mission -> Task -> Action -> Subscription events
```

Live and simulation differ mostly at the edges:

```text
Live:
  chain poller fetches real logs
  task executor sends real transactions
  follower chain events confirm tasks

Simulation:
  simulation runner replays historical leader actions
  virtual executor creates simulated follower actions/results
  simulated fills update missions/tasks/PnL
```

## Minimum-Change Architecture

Add a simulation mode around the current system rather than building a completely separate simulator.

Recommended new services:

```text
SimulationRunnerService
SimulationExecutionService
SimulationMarketDataService
SimulationReportService
```

### SimulationRunnerService

Owns pause/resume and time progression.

Responsibilities:

- Load simulation plan.
- Determine replay window:
  - from `simulationCursor`
  - to `simulationCursor + 1 simulated day`
  - capped by `simulationEnd`
- Read historical leader actions/events for that window.
- Feed those action items into the existing bot/mission/task flow.
- Advance `simulationCursor`.
- Auto-pause after the one-day simulated window.
- Emit plan/bot/mission/task subscription updates.

### SimulationExecutionService

Replaces real transaction submission for simulation tasks.

Responsibilities:

- Find created simulation tasks.
- Never submit real transactions.
- Create virtual execution results.
- Create simulated follower actions or direct task updates.
- Update mission/task state through existing service paths where possible.
- Write simulated position and PnL records.

### SimulationMarketDataService

Provides historical prices and fill data.

Responsibilities:

- Return historical prices by pair and simulated timestamp.
- Support mark-to-market for open positions.
- Provide fill assumptions:
  - execution price
  - slippage
  - fees
  - latency
  - cancellation behavior

This can start simple and become more accurate later.

### SimulationReportService

Builds user-facing reports.

Responsibilities:

- PnL chart.
- Realized PnL.
- Unrealized PnL.
- Open positions.
- Closed positions.
- Bot-level performance.
- Drawdown.
- Filtered/skipped events.
- Task and mission summaries.

## Data Model Direction

The smallest useful model is to add simulation fields to `Plan` and infer simulation mode for child bots, missions, and tasks from the plan.

Suggested fields:

```prisma
enum PlanMode {
  Live
  Simulation
}

enum SimulationStatus {
  Created
  Running
  Paused
  Finished
  Failed
}

model Plan {
  mode                 PlanMode @default(Live)
  simulationStatus     SimulationStatus?
  simulationStart      DateTime?
  simulationEnd        DateTime?
  simulationCursor     DateTime?
  simulationSpeed      Int?
}
```

Alternative:

- Create a separate `SimulationPlan` table linked to `Plan`.

The likely simpler first step is `Plan.mode`, because it keeps the existing plan/bot/mission/task shape intact.

## Safety Guard

Simulation tasks must never reach real transaction execution.

Add a hard guard near live task execution:

```ts
if (task.mission.bot.plan.mode === PlanMode.Simulation) {
  throw new Error('Simulation task cannot execute live transaction');
}
```

This is non-negotiable. Even if the simulation implementation changes, real execution must be protected from simulated plans.

## Subscription Behavior

Simulation should trigger the same subscription mechanisms as live mode where possible:

- `PATTERNS.Plans.PlanUpdated`
- `PATTERNS.Bots.BotCreated`
- `PATTERNS.Bots.BotUpdated`
- `PATTERNS.Missions.MissionCreated`
- `PATTERNS.Missions.MissionUpdated`
- `PATTERNS.Tasks.TaskCreated`
- `PATTERNS.Tasks.TaskUpdated`

This keeps frontend behavior close to live mode.

The UI should be able to subscribe to a simulation plan and see missions/tasks appear and update as the simulated day runs.

## Reuse Targets

Reuse as much of this as possible:

- `PlansService` lifecycle concepts.
- `BotsService.handleActionItems`.
- `MissionsService.handleActions`.
- `TasksService.handleLeaderActions`.
- `TasksService.handleFollowerActions`.
- Existing Redis subscription events.
- Existing GraphQL entities where possible.

Replace or bypass:

- Live chain polling source.
- Real `TaskExecutorService` transaction submission.
- Real follower confirmation events.

## Historical Event Source

The simulation runner needs historical leader events.

Possible initial sources:

- Existing `Action` rows if enough historical data exists.
- Existing `PerpTradingEventLog` rows from leaderboard ingestion.
- Raw on-chain log replay through current event parsers.

For minimum change, prefer the source that already exists in the database and can produce the same `ActionItem` shape expected by `BotsService.handleActionItems`.

Target shape:

```ts
{
  item: ActionItem;
  blockNumber: number;
  logIndex: number;
}
```

## Simulated Follower Actions

Live mode waits for follower chain events to update tasks and missions.

Simulation needs virtual follower confirmations.

Possible first approach:

1. Simulation task is created from leader action.
2. Simulation executor estimates fill.
3. It creates simulated follower action records.
4. It calls existing follower action handling logic if practical.
5. It updates task to `Completed`, `Failed`, `Stopped`, or `Initiated`.
6. It updates mission to `Opening`, `Opened`, `Closing`, or `Closed`.

This keeps the state transitions close to live mode while avoiding real chain writes.

## PnL And Positions

Do not rely only on task logs for performance reporting.

Add simulation-specific projections:

```text
SimulationPosition
SimulationTrade
SimulationPnlPoint
```

These can be run-scoped or plan-scoped.

They should support:

- Current open simulated positions.
- Closed simulated positions.
- Realized PnL.
- Unrealized PnL.
- Equity curve.
- Bot-level performance.
- Market-level exposure.

## Pause And Resume Semantics

Simulation statuses:

```text
Created -> Running -> Paused -> Running -> Paused -> Finished
```

Resume behavior:

```text
if plan is Simulation and status is Created or Paused:
  set status Running
  process one simulated day
  advance simulationCursor
  set status Paused
```

Finish behavior:

```text
if simulationCursor >= simulationEnd:
  set status Finished
```

User edits should be allowed while paused.

Important rule:

```text
Bot/strategy edits affect future simulated time only.
```

Past simulated results should remain as historical output unless the user explicitly resets or reruns the simulation.

## Reset And Rerun

Eventually the user may need:

- Reset simulation to start.
- Rerun from beginning with current config.
- Fork simulation from current cursor.
- Compare two simulation runs.

This does not need to be first version, but the data model should not make it impossible.

If comparison becomes important, introduce `SimulationRun` later.

## Implementation Stages

### Stage 1: Plan Mode And Safety

- Add `Plan.mode`.
- Add simulation fields.
- Add execution guard so simulation tasks cannot submit real transactions.
- Add basic GraphQL/API fields.

### Stage 2: Simulation Runner

- Add resume/pause mutations.
- Implement one simulated day window.
- Load historical leader action items.
- Feed action items through existing bot/mission/task path.
- Emit plan update subscriptions.

### Stage 3: Virtual Execution

- Add simulation executor.
- Convert created simulation tasks into simulated follower results.
- Update tasks/missions.
- Emit task and mission subscriptions.

### Stage 4: Simulation Reporting

- Add simulated positions.
- Add simulated trades.
- Add PnL points.
- Add report queries.

### Stage 5: Better Accuracy

- Add better historical price source.
- Add fill model versioning.
- Add fees, slippage, latency, and cancellation assumptions.
- Add reset/rerun/fork if needed.

## Explicit Non-Goals For First Version

- Full event-sourced rewrite.
- Kafka or advanced durable stream migration.
- Perfect reorg handling.
- Perfect backtesting framework.
- Full replacement of current mission/task architecture.
- Major live trading refactor.

## Guiding Decision

The most important implementation choice is:

```text
Make simulation look like live mode to the backend and frontend,
but make execution virtual and safe.
```

That means:

- Same subscription style.
- Same plan/bot/mission/task/action mental model.
- Same strategy behavior where possible.
- Same user inspection workflow.
- Different execution adapter.
- Separate simulation reporting/projections.

This gives useful simulation quickly while keeping a natural path toward better backtesting later.
