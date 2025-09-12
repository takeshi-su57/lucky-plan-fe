import { DecodeEventLogReturnType } from "viem";
import { EventEmitterAbi } from "../abi/EventEmitter";
import { positionIncreaseEventParser } from "./position-increase.parser";
import { positionDecreaseEventParser } from "./position-decrease.parser";
import type { PositionIncreaseEvent } from "./position-increase.parser";
import type { PositionDecreaseEvent } from "./position-decrease.parser";
import { PerpTradeHistory } from "../../../types";

export type EventLog = DecodeEventLogReturnType<
  typeof EventEmitterAbi,
  "EventLog"
>;

export type EventLogData = EventLog["args"]["eventData"];

export function parseEventData<T>(eventData: EventLogData) {
  const event: Record<string, any> = {};

  const keys = [
    "addressItems",
    "uintItems",
    "intItems",
    "boolItems",
    "bytes32Items",
    "bytesItems",
    "stringItems",
  ];

  for (const key of keys) {
    const subItems = eventData[key as keyof EventLogData];

    subItems.items.forEach((item) => {
      event[item.key] = item.value;
    });

    subItems.arrayItems.forEach((item) => {
      event[item.key] = item.value;
    });
  }

  return event as T;
}

export function parseEvent(eventName: string, eventData: EventLogData) {
  return {
    eventName,
    args: parseEventData(eventData),
  };
}

export const eventParsers = [
  positionIncreaseEventParser,
  positionDecreaseEventParser,
];

export const registeredEventNames = eventParsers.map((item) => item.eventName);

export const eventParsersMap = Object.fromEntries(
  eventParsers.map((parser) => [parser.eventName, parser]),
);

export function eventToPerpTradeHistory(
  chainId: number,
  event: PositionIncreaseEvent | PositionDecreaseEvent,
): PerpTradeHistory | null {
  return eventParsersMap[event.eventName].eventToPerpTradeHistory(
    chainId,
    event as any,
  );
}
