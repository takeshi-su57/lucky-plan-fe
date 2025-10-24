import { marginUpdateExecutedEventParser } from "./margin-update-executed.parser";
import { limitExecutedEventParser } from "./limit-executed.parser";
import { marketExecutedEventParser } from "./market-executed.parser";
import { marketOpenCanceledEventParser } from "./market-open-canceled";
import { marketOrderInitiatedEventParser } from "./market-order-initiated.parser";

import { RegisteredEventType } from "../types";
import { PerpTradeHistory } from "@/web3/types";

export const missionEventParsers = [
  limitExecutedEventParser,
  marketExecutedEventParser,
];

export const missionEventNames = missionEventParsers.map(
  (item) => item.eventName,
);

export const eventParsers = [
  marketOrderInitiatedEventParser,
  marketOpenCanceledEventParser,
  marginUpdateExecutedEventParser,
  ...missionEventParsers,
];

export const registeredEventNames = eventParsers.map((item) => item.eventName);

export const eventParsersMap = Object.fromEntries(
  eventParsers.map((parser) => [parser.eventName, parser]),
);

export function eventToPerpTradeHistory(
  _chainId: number,
  event: RegisteredEventType,
): PerpTradeHistory | null {
  return eventParsersMap[event.eventName].eventToPerpTradeHistory(event as any);
}
