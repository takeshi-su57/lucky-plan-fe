import { leverageUpdateExecutedEventParser } from "./leverage-update-executed.parser";
// import { leverageUpdateInitiatedEventParser } from 'src/actions/eventParsers/leverage-update-initiated.parser';
import { limitExecutedEventParser } from "./limit-executed.parser";
import { marketCloseCanceledEventParser } from "./market-close-canceled";
import { marketExecutedEventParser } from "./market-executed.parser";
import { marketOpenCanceledEventParser } from "./market-open-canceled";
import { marketOrderInitiatedEventParser } from "./market-order-initiated.parser";
import { positionSizeDecreaseExecutedEventParser } from "./position-size-decrease-executed.parser";
import { positionSizeIncreaseExecutedEventParser } from "./position-size-increase-executed.parser";

import { tradeMaxClosingSlippagePUpdatedEventParser } from "./trade-max-closing-slippage-p-updated.parser";

import { RegisteredEventType } from "../types";
import { tradePositivePnlWithdrawnEventParser } from "./trade-positive-pnl-withdrawn.parser";
import { PerpTradeHistory } from "../../../types";

export const missionEventParsers = [
  limitExecutedEventParser,
  marketExecutedEventParser,
];

export const missionEventNames = missionEventParsers.map(
  (item) => item.eventName,
);

export const updateEventParsers = [
  tradeMaxClosingSlippagePUpdatedEventParser,
  leverageUpdateExecutedEventParser,
  positionSizeDecreaseExecutedEventParser,
  positionSizeIncreaseExecutedEventParser,
];

export const updateEventNames = updateEventParsers.map(
  (item) => item.eventName,
);

export const missionCanceledEventParsers = [
  marketCloseCanceledEventParser,
  marketOpenCanceledEventParser,
];

export const missionCanceledEventNames = missionCanceledEventParsers.map(
  (item) => item.eventName,
);

export const eventParsers = [
  marketOrderInitiatedEventParser,
  tradePositivePnlWithdrawnEventParser,
  ...missionEventParsers,
  ...updateEventParsers,
  ...missionCanceledEventParsers,
];

export const registeredEventNames = eventParsers.map((item) => item.eventName);

export const eventParsersMap = Object.fromEntries(
  eventParsers.map((parser) => [parser.eventName, parser]),
);

export function eventToPerpTradeHistory(
  chainId: number,
  event: RegisteredEventType,
): PerpTradeHistory | null {
  return eventParsersMap[event.eventName].eventToPerpTradeHistory(
    chainId,
    event as any,
  );
}
