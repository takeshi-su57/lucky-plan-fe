import { marginUpdateExecutedEventParser } from './margin-update-executed.parser';
import { limitExecutedEventParser } from './limit-executed.parser';
import { marketExecutedEventParser } from './market-executed.parser';
import { marketOpenCanceledEventParser } from './market-open-canceled';
import { marketOrderInitiatedEventParser } from './market-order-initiated.parser';

import {
  Action,
  ActionItem,
} from 'src/microservices/apiService/modules/actions/entities/action.entity';
import { PerpTradeHistory } from 'src/microservices/apiService/modules/trade-histories/entities/event-logs.entity';
import { LimitOrder, RegisteredEventType } from '../types';

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

export function eventToActionParser(event: RegisteredEventType): ActionItem {
  return eventParsersMap[event.eventName].logParser(event as any);
}

export function eventToPerpTradeHistory(
  _chainId: number,
  event: RegisteredEventType,
): PerpTradeHistory | null {
  return eventParsersMap[event.eventName].eventToPerpTradeHistory(event as any);
}

export function isOpenMissionAction(action: Action | ActionItem) {
  if (!missionEventNames.includes(action.name)) {
    return false;
  }

  if (action.name === marketExecutedEventParser.eventName) {
    return marketExecutedEventParser.actionParser(action).args.open;
  } else {
    return (
      limitExecutedEventParser.actionParser(action).args.orderType ===
      LimitOrder.OPEN
    );
  }
}

export function isCloseMissionAction(action: Action | ActionItem) {
  if (!missionEventNames.includes(action.name)) {
    return false;
  }

  if (action.name === marketExecutedEventParser.eventName) {
    return !marketExecutedEventParser.actionParser(action).args.open;
  } else {
    return [LimitOrder.LIQ, LimitOrder.SL, LimitOrder.TP].includes(
      limitExecutedEventParser.actionParser(action).args.orderType,
    );
  }
}
