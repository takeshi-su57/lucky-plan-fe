# Lucky Plan Frontend - Codebase Analysis

## Overview

**Lucky Plan** is a sophisticated Web3 trading platform frontend built with Next.js 16. It provides copy-trading functionality, enabling users to follow expert traders on decentralized perpetual trading protocols (GNS, GMX, AVNT). The application features real-time data synchronization via GraphQL subscriptions, comprehensive trading analytics, and multi-chain wallet integration.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Architecture Overview](#architecture-overview)
4. [Core Features](#core-features)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Web3 Integration](#web3-integration)
8. [UI Components](#ui-components)
9. [Data Models](#data-models)
10. [Configuration](#configuration)
11. [Development Workflow](#development-workflow)

---

## Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.7 | React framework with App Router |
| React | 19.2.1 | UI library |
| TypeScript | 5.9.3 | Type safety |

### State Management & Data Fetching
| Technology | Version | Purpose |
|------------|---------|---------|
| Apollo Client | 4.0.9 | GraphQL client with caching |
| TanStack React Query | 5.90.10 | Server state management |
| GraphQL | 16.12.0 | Query language |
| GraphQL-WS | 6.0.6 | WebSocket subscriptions |

### Web3 & Blockchain
| Technology | Version | Purpose |
|------------|---------|---------|
| Wagmi | 2.19.4 | React hooks for Ethereum |
| Viem | 2.39.2 | TypeScript Ethereum client |
| RainbowKit | 2.2.9 | Wallet connection UI |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| HeroUI | 2.8.5 | Component library (formerly NextUI) |
| Tailwind CSS | 4.1.17 | Utility-first CSS |
| Framer Motion | 12.23.24 | Animations |
| Chart.js | 4.4.6 | Charting library |

### Utilities
| Technology | Version | Purpose |
|------------|---------|---------|
| Notistack | 3.0.1 | Toast notifications |
| Dayjs | 1.11.13 | Date manipulation |
| React Virtuoso | 4.12.3 | Virtual scrolling |
| ml-regression | 3.0.1 | Statistical analysis |
| RxJS | 7.8.2 | Reactive programming |

---

## Project Structure

```
lucky-plan-fe/
├── app/                          # Next.js App Router
│   ├── @sidebar/                 # Parallel route slot - navigation
│   ├── @statusbar/               # Parallel route slot - status info
│   ├── @topbar/                  # Parallel route slot - top bar
│   ├── _actions/                 # Server actions
│   ├── _components/              # Page-level components
│   │   ├── ActionsWidget/        # Trading action history
│   │   ├── AutomationWidgets/    # Bot/automation management
│   │   ├── DevWidget/            # Development utilities
│   │   ├── ExpertWidgets/        # Expert trader analytics
│   │   ├── FollowerWidgets/      # Follower management
│   │   ├── LeaderboardWidgets/   # Rankings and PnL charts
│   │   ├── MissionWidgets/       # Mission management
│   │   ├── PlansWidget/          # Trading plans
│   │   ├── SettingsWidget/       # Settings panel
│   │   ├── Sidebar/              # Navigation sidebar
│   │   ├── Statusbar/            # System status
│   │   ├── StrategyWidgets/      # Trading strategies
│   │   ├── TagWidgets/           # User tagging
│   │   ├── TaskWidgets/          # Task management
│   │   ├── Topbar/               # Top navigation
│   │   └── TradingSignalWidgets/ # Trading signals
│   ├── _hooks/                   # Custom React hooks
│   ├── automations/              # Automations page
│   ├── dev-page/                 # Development page
│   ├── experts/                  # Expert leaderboards page
│   ├── followers/                # Followers page
│   ├── fonts/                    # Geist font files
│   ├── leaderboards/             # Leaderboards page
│   ├── logs/                     # System logs page
│   ├── plans/                    # Plans pages
│   │   ├── create/               # Create plan page
│   │   └── [planId]/             # Plan details page
│   ├── settings/                 # Settings page
│   ├── trading-signals/          # Trading signals page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home (redirects to /plans)
│   └── providers.tsx             # App providers
├── components/                   # Reusable UI components
│   ├── AddressWidget/            # Wallet address display
│   ├── buttons/                  # Button variants
│   ├── charts/                   # Chart components
│   │   ├── BarChart/
│   │   ├── LineChart/
│   │   └── MixedLineChart/
│   ├── chips/                    # Chip components
│   ├── icons/                    # 42+ SVG icon components
│   ├── inputs/                   # Input components
│   ├── modals/                   # Modal dialogs
│   ├── snackbars/                # Notification components
│   ├── Stepper/                  # Step indicator
│   ├── tables/                   # Table components
│   └── views/                    # View containers
├── graphql/                      # GraphQL configuration
│   ├── gql/                      # Generated code
│   └── schema.gql                # GraphQL schema
├── styles/                       # Global styles
│   ├── globals.css               # Tailwind imports
│   └── hero.ts                   # HeroUI theme config
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions
│   ├── constants.ts              # App constants
│   ├── convertTradeActionToHistory.tsx
│   ├── historiesChart.ts         # Chart data processing
│   ├── historiesV2Chart.ts
│   ├── index.ts                  # Main utilities
│   ├── mergeClassNames.ts        # Tailwind class merging
│   ├── price.ts                  # Price utilities
│   └── web3.ts                   # Web3 helpers
├── web3/                         # Blockchain integrations
│   ├── avnt/                     # AVNT protocol
│   ├── gmx/                      # GMX v2 protocol
│   ├── gns/                      # GNS v9/v10 protocol
│   ├── types.ts                  # Web3 types
│   └── utils.ts                  # Web3 utilities
├── .env                          # Environment variables
├── codegen.ts                    # GraphQL codegen config
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── schema.graphql                # GraphQL schema (21KB)
└── tsconfig.json                 # TypeScript config
```

---

## Architecture Overview

### Layout Pattern (Parallel Routes)

The app uses Next.js parallel routes for a three-panel layout:

```
┌─────────────────────────────────────────────────────────┐
│                     TOPBAR (@topbar)                     │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│   SIDEBAR    │              MAIN CONTENT                │
│  (@sidebar)  │              (children)                  │
│   300px      │                                          │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│                   STATUSBAR (@statusbar)                 │
└─────────────────────────────────────────────────────────┘
```

### Provider Stack

```tsx
WagmiProvider          // Web3 wallet state
  └─ QueryClientProvider   // TanStack Query
      └─ RainbowKitProvider    // Wallet UI
          └─ ApolloProvider        // GraphQL client
              └─ HeroUIProvider        // UI components
                  └─ SnackbarProvider      // Notifications
                      └─ SubscriptionWrapper   // Real-time subscriptions
```

---

## Core Features

### 1. Plans Management
- Create, start, stop, and delete trading plans
- Schedule plan execution windows
- Monitor plan status (Created → Started → Stopped/Finished)
- View plan history and performance

### 2. Automations (Bots)
- Configure copy-trading bots
- Link followers to expert traders (leaders)
- Set trading strategies with parameters:
  - Collateral baseline and ratio
  - Leverage limits (min/max)
  - Position size limits
  - Lifetime settings

### 3. Missions & Tasks
- Missions track position-mirroring operations
- Tasks execute individual trading actions
- Real-time status updates via subscriptions
- Mission modes: Default, Hook, Signal

### 4. Followers
- Manage follower accounts (derived wallets)
- View balances (ETH, USDC)
- Manage allowances
- Track pending orders and open trades
- PnL snapshots and performance metrics

### 5. Expert Analytics
- Leaderboard rankings
- Performance scoring (R², slope calculations)
- Historical PnL analysis
- Trading pattern analysis

### 6. Trading Signals
- Register addresses for signal tracking
- Real-time event log monitoring
- Cross-platform signal aggregation

### 7. System Management
- System logs with severity levels
- Microservice status monitoring
- Contract management
- Blacklist/Whitelist controls

---

## State Management

### Apollo Client Configuration

```typescript
// Cache with Relay-style pagination
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPnlSnapshotsV2: relayStylePagination(["kind", "platform", "dateStr"]),
        getBotsByStatus: relayStylePagination(["status"]),
        getPlansByStatus: relayStylePagination(["status"]),
        allLogs: relayStylePagination(["checked", "severity"]),
        // ... more paginated queries
      },
    },
    // Type-specific key fields for cache normalization
    Plan: { keyFields: ["id"] },
    BotForwardDetails: { keyFields: ["id"] },
    Follower: { keyFields: ["address"] },
    // ... 40+ type policies
  },
});
```

### Custom Hooks (app/_hooks/)

| Hook | Purpose |
|------|---------|
| `usePlan` | Plan CRUD, queries, and subscriptions |
| `useAutomation` | Bot management and status tracking |
| `useMission` | Mission lifecycle management |
| `useTask` | Task execution and monitoring |
| `useFollower` | Follower data and operations |
| `useUser` | User authentication and permissions |
| `useUserJWT` | JWT token management |
| `useWalletAccount` | Wallet account operations |
| `useHistory` | Trade history queries |
| `useLog` | System log management |
| `useStrategy` | Trading strategy configuration |
| `useTradingSignals` | Signal registration and tracking |
| `useContract` | Contract interactions |
| `useSystem` | System status and controls |
| `useTag` | Tag management |
| `useAppSettings` | Application settings |
| `useGetPrices` | Price data fetching |

---

## API Integration

### GraphQL Connection

```typescript
// HTTP endpoint for queries/mutations
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API,
});

// WebSocket endpoint for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_WSS,
    connectionParams: () => ({
      authToken: getJWTToken(),
    }),
  }),
);

// Link splitting: subscriptions → WS, everything else → HTTP
const splitLink = ApolloLink.split(
  ({ operationType }) => operationType === "subscription",
  wsLink,
  httpLink,
);
```

### Authentication Flow

1. User connects wallet via RainbowKit
2. Signs message with wallet (SIWE pattern)
3. Backend returns JWT token
4. Token stored in localStorage (`user-jwt` key)
5. Token attached to all HTTP and WS requests

### Real-time Subscriptions

```graphql
subscription {
  planCreated(userId: $userId) { ... }
  planUpdated(userId: $userId) { ... }
  botCreated(userId: $userId) { ... }
  botUpdated(userId: $userId) { ... }
  missionCreated(userId: $userId) { ... }
  missionUpdated(userId: $userId) { ... }
  taskCreated(userId: $userId) { ... }
  taskUpdated(userId: $userId) { ... }
  tradingSignalLogUpdated { ... }
  newLog(checked: $checked, severity: $severity) { ... }
}
```

---

## Web3 Integration

### Supported Chains

- Mainnet (Ethereum)
- Polygon
- Arbitrum
- Base
- Ape Chain
- Arbitrum Sepolia (testnet)

### Supported Protocols

| Protocol | Directory | Features |
|----------|-----------|----------|
| GNS (v9, v10) | `web3/gns/` | Decentralized derivatives trading |
| GMX v2 | `web3/gmx/` | Perpetual exchange |
| AVNT | `web3/avnt/` | Trading protocol |

### Protocol Integration Pattern

Each protocol has:
- ABI definitions for contract interactions
- Event parsers for trade events
- Type definitions for protocol-specific data

### Trade Event Types

```typescript
enum PerpTradeHistoryOperation {
  OPEN
  CLOSE
  INCREASE_SIZE
  DECREASE_SIZE
  INCREASE_LEVERAGE
  DECREASE_LEVERAGE
}
```

---

## UI Components

### Component Library: HeroUI

Primary components used:
- `Button`, `Modal`, `Tabs`, `Spinner`
- `Input`, `Select`, `Checkbox`
- `Table`, `Pagination`
- `Tooltip`, `Popover`

### Custom Chart Components

```
components/charts/
├── BarChart/           # Bar charts with expand modal
├── LineChart/          # Line charts with expand modal
└── MixedLineChart/     # Combined line/bar charts
```

### Notification System (Notistack)

```typescript
// 5 snackbar variants
Components: {
  success: SuccessSnackbar,   // Green
  warning: WarningSnackbar,   // Yellow
  info: InfoSnackbar,         // Blue
  error: ErrorSnackbar,       // Red
  default: DefaultSnackbar,   // Gray
}
```

### Virtual Scrolling

Uses `react-virtuoso` for efficient rendering of large lists:
- Follower lists
- Log entries
- Trade histories

---

## Data Models

### Core Entities

```
Plan
├── id: Int
├── title: String
├── description: String
├── status: PlanStatus (Created|Started|Stopped|Finished)
├── scheduledStart: Date
├── scheduledEnd: Date
├── startedAt: Date?
├── endedAt: Date?
└── bots: [BotForwardDetails]

Bot (BotForwardDetails)
├── id: Int
├── status: BotStatus (Created|Live|Stop|Dead)
├── leaderAddress: String
├── followerAddress: String
├── leaderContractId: Int
├── followerContractId: Int
├── strategy: Strategy
└── missions: [MissionForwardDetails]

Mission
├── id: Int
├── status: MissionStatus (Created|Opening|Opened|Closing|Closed|Ignored)
├── mode: MissionMode (Default|Hook|Signal)
├── targetPositionKey: String
├── achievePositionKey: String?
└── tasks: [TaskForwardDetails]

Task
├── id: Int
├── status: TaskStatus (Created|Initiated|Await|Completed|Failed|Stopped)
├── action: Action
├── followerActions: [FollowerActionDetails]
└── logs: [String]

Follower
├── address: String
├── userId: String
├── accountIndex: Int
├── publicKey: String
├── trades: [FollowerTrade]
├── pendingOrders: [FollowerPendingOrder]
└── pnlSnapshots: [PnlSnapshotV2]
```

### User Permissions

```typescript
enum UserPermission {
  Admin   // Full system access
  Trader  // Trading operations
  Trial   // Limited access
}
```

### Platform Types

```typescript
enum Platform {
  GNS   // Gains Network
  GMX   // GMX Protocol
  AVNT  // Avantis
}
```

---

## Configuration

### Environment Variables

```bash
# GraphQL API endpoints
NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API=http://localhost:9999/api
NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_WSS=wss://...

# Timezone configuration
NEXT_PUBLIC_SERVER_TIME_ZONE=UTC

# Admin configuration
NEXT_PUBLIC_ADMIN_EMAIL=...
```

### TypeScript Path Aliases

```json
{
  "@/*": ["./*"],
  "@/components/*": ["./components/*"],
  "@/app-components/*": ["./app/_components/*"],
  "@/app-hooks/*": ["./app/_hooks/*"],
  "@/app-actions/*": ["./app/_actions/*"],
  "@/gql/*": ["./graphql/gql/*"]
}
```

### GraphQL Code Generation

```bash
npm run generate  # Runs graphql-codegen
```

Generates type-safe GraphQL operations from:
- Schema: `schema.graphql`
- Documents: `app/**/*.{ts,tsx}`
- Output: `graphql/gql/`

---

## Development Workflow

### Commands

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build with Webpack
npm run start     # Start production server
npm run lint      # Run ESLint
npm run generate  # Generate GraphQL types
```

### Code Quality Tools

- **ESLint**: Next.js + TanStack Query + TypeScript rules
- **Prettier**: With Tailwind CSS plugin for class sorting
- **GraphQL ESLint**: Schema validation
- **GraphQL SP**: In-editor GraphQL validation

### Key Development Patterns

1. **Fragment-first GraphQL**: Define reusable fragments for query composition
2. **Subscription wrappers**: Auto-subscribe to real-time updates in provider
3. **Relay-style pagination**: Cursor-based pagination with Apollo
4. **Lazy queries**: On-demand data fetching for performance
5. **Type-safe operations**: Generated types from GraphQL schema

---

## Performance Optimizations

1. **Virtual scrolling** - React Virtuoso for large lists
2. **Lazy loading** - Dynamic imports for heavy components
3. **Turbopack** - Fast development builds
4. **Apollo caching** - Normalized cache with efficient updates
5. **Debounced inputs** - Prevent excessive API calls
6. **WebSocket reconnection** - Automatic reconnection for subscriptions

---

## Security Considerations

1. **JWT Authentication** - Secure API access
2. **Wallet Signatures** - SIWE for authentication
3. **Allowance Management** - Controlled token approvals
4. **Password-protected operations** - Sensitive actions require password
5. **Blacklist/Whitelist** - Address filtering

---

*Generated: January 5, 2026*
*Codebase Version: 0.1.0*
