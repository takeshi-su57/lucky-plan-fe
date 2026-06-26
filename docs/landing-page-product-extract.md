# Lucky Plans Landing Page Product Extract

## Purpose

This document turns the current Lucky Plans codebase into landing-page-ready product messaging.

It is based on the actual frontend and backend implementation in this repo, not on generic crypto landing page conventions.

## What the codebase clearly supports today

Lucky Plans is currently implemented as a crypto trading product centered on:

- Automated perp copy-trading
- Live plans and automations
- Follower wallet and contract management
- Historical leaderboards and trade analysis
- Walk-forward simulation workflows

This is not just a generic AI planning app.

The strongest product truth visible in the code is:

> Lucky Plans is a trade console for running copy-trading plans, managing follower execution, ranking leaders, and testing strategies through simulations before or alongside live operation.

## Product facts extracted from the implementation

### Frontend product areas

The main navigation exposes these product surfaces:

- `Plan`
- `Simulation`
- `Leaderboard`
- `Setting`
- `Log`

The sidebar brand label is:

- `Lucky Plans`
- `Trade Console`

The app root redirects directly to `/plans`, which suggests plans are the operational center of the product.

### Plan workflow

The product supports:

- Creating a plan with title, description, and date range
- Starting a live plan
- Ending a live plan
- Adding automations to a plan

This makes "plans" a real product entity, not just a marketing metaphor.

### Simulation workflow

The product supports two simulation modes:

- `Auto Simulations`
- `Manual Plans`

Auto simulation inputs currently include:

- title
- description
- platform
- simulation duration
- minimum trades
- minimum R2
- maximum leverage

The UI explicitly describes auto simulation as a walk-forward simulation.

Manual simulation plans also exist as a first-class workflow.

### Follower and execution workflow

The product supports follower operations such as:

- viewing follower contracts
- viewing follower wallet metrics
- generating follower wallets
- withdrawing funds
- opening trades
- calculator tooling

Follower summaries include metrics like:

- followers
- pending orders
- trades
- gas
- collateral
- earned
- lost
- unrealized
- locked

### Leaderboard and analytics workflow

The product supports:

- leaderboards by platform
- historical date selection
- filtering
- analysis view

The backend also explicitly states that leaderboard indexing and trade history are part of the system.

### Supported trading platforms

The implementation currently references:

- `GNS`
- `GMX`
- `AVNT`

The backend also describes platform adapters for these venues.

### Backend architecture claims supported by code/docs

The backend README explicitly describes Lucky Plans as:

- a NestJS backend for automated perp copy-trading
- leaderboard indexing
- strategy simulation

It also states that the system:

- tracks on-chain perp trading events
- stores normalized actions and trade history
- exposes GraphQL queries, mutations, and subscriptions
- runs worker loops that turn leader activity into follower missions and tasks

## Claims we should avoid or soften for now

These ideas may be directionally useful, but they are not strongly supported by the current repo:

- "AI-powered planning and trading intelligence" as the main promise
- "verified official communication" as an existing feature
- "signed announcements" or "on-chain verification" as a live trust system
- "community updates" unless real public community links exist elsewhere
- "waitlist" unless a real collection flow exists

The codebase currently proves copy-trading, simulation, analytics, and execution workflows much more clearly than AI or trust-layer messaging.

## Recommended landing-page direction based on the real implementation

The best current positioning is:

### Short version

Perp copy-trading, simulation, and execution tooling for serious operators.

### Clearer version

Run live trading plans, manage follower execution, analyze leaders, and test strategies with walk-forward simulations from one trade console.

### Slightly more ambitious version

Lucky Plans helps trading operators move from noisy leader discovery to structured execution with live plans, follower management, leaderboards, and simulation workflows.

## Recommended 8-section landing page, grounded in the codebase

### 1. Hero

Suggested headline:

**Run live copy-trading plans and test strategies before you deploy.**

Suggested subheadline:

Lucky Plans is a crypto trade console for managing automations, follower execution, leaderboards, and walk-forward simulations across perp venues.

Suggested CTA ideas:

- Request Early Access
- Follow Product Updates
- Talk to the Team

### 2. Problem

Suggested copy:

Trading workflows break when leader discovery, execution, simulation, and follower management all live in separate tools. Operators end up reacting to noisy signals, switching contexts, and making live decisions without a clean system for testing and control.

### 3. Solution

Suggested copy:

Lucky Plans brings live plans, trading automations, follower operations, leaderboard analysis, and simulation into one operational flow. Instead of stitching together spreadsheets, dashboards, and manual execution steps, teams can work from a single trade console.

### 4. How It Works

Suggested 3-step structure:

1. Create a plan with a schedule, then attach automations.
2. Analyze leaders and configure follower execution across supported platforms.
3. Run manual or auto simulations to evaluate performance before or alongside live activity.

### 5. Key Features

Feature candidates pulled from the implementation:

- Live plans with start and end controls
- Automation management inside each plan
- Follower wallet and contract operations
- Position, collateral, gas, and PnL visibility
- Historical leaderboards with filters and analysis
- Auto simulations with trade-count, R2, and leverage controls
- Manual simulation plans for deeper workflow testing
- Multi-platform support for GNS, GMX, and AVNT

### 6. Trust / Safety

Suggested copy:

Simulation and live execution are treated as separate operational modes. The backend is designed so simulation workflows reuse the live domain model while keeping execution virtual and isolated from real transaction submission.

This is much stronger and more defensible than generic "security-first" wording.

### 7. Current Status

Suggested copy:

Lucky Plans is in active development. The product already includes core plan, follower, leaderboard, and simulation workflows in the private application, while the public-facing product story and onboarding surface are still being shaped.

Suggested roadmap bullets:

- Public landing page
- Access flow for early users
- Clear documentation for plans and simulations
- Broader visibility into supported venues and workflows
- Refined reporting and simulation outputs

### 8. Final CTA

Suggested copy:

Move from ad hoc trading workflows to a structured operating system for execution and simulation.

Suggested CTA ideas:

- Get Early Access
- Follow Updates
- Contact the Team

## Best-fit headline options

These are better aligned with the real codebase than the original generic draft:

1. Run live copy-trading plans and test strategies before deployment.
2. A trade console for copy-trading, follower execution, and walk-forward simulation.
3. Structure live trading operations with plans, automations, leaderboards, and simulations.
4. From leader analysis to follower execution in one perp trading workflow.

## Best-fit feature list for version one

If the landing page needs a compact feature section, use this set first:

- Live Plans
- Trading Automations
- Follower Operations
- Leaderboards
- Walk-Forward Simulations
- Multi-Platform Perp Support

## Recommended messaging shift from the original draft

The original draft is useful structurally, but the messaging should change in three important ways:

1. Replace generic "AI-powered planning" language with real trading workflow language.
2. Lead with copy-trading, simulation, and execution because the product already implements them.
3. Treat security and official-channel trust as future-facing unless there is a real public system for it outside this repo.

## Evidence sources in this repo

- `fe/app/page.tsx`
- `fe/app/_components/Sidebar/Sidebar.tsx`
- `fe/app/_components/PlansWidget/PlanCreationPanel.tsx`
- `fe/app/_components/PlansWidget/PlanMetadataForm.tsx`
- `fe/app/_components/PlansWidget/PlanDetailPanel.tsx`
- `fe/app/_components/SimulationsWidget/Simulations.tsx`
- `fe/app/_components/SimulationsWidget/SimulationCreationPanel.tsx`
- `fe/app/_components/SimulationsWidget/SimulationPlanCreationPanel.tsx`
- `fe/app/_components/SimulationsWidget/SimulationDetailPanel.tsx`
- `fe/app/_components/FollowerWidgets/Followers.tsx`
- `fe/app/_components/FollowerWidgets/FollowerSummary.tsx`
- `fe/app/_components/LeaderboardWidgets/LeaderboadWrapper.tsx`
- `be/README.md`
- `fe/docs/simulation-minimum-change-plan.md`

