import { Platform, Version } from "@/graphql/gql/graphql";

import { gnsMultiCollatDiamondAbi as gnsV10Abi } from "./gns/v10/abi/GNSMultiCollatDiamond";
import { gnsMultiCollatDiamondAbi as gnsV9Abi } from "./gns/v9/abi/GNSMultiCollatDiamond";
import { EventEmitterAbi as gmxV2Abi } from "./gmx/v2/abi/EventEmitter";
import { avntGeneralAbi } from "./avnt/v1/abi/AvntGeneral";

import {
  eventParsers as eventParsersV10,
  eventToPerpTradeHistory as eventToPerpTradeHistoryV10,
} from "./gns/v10/eventParsers";
import {
  eventParsers as eventParsersV9,
  eventToPerpTradeHistory as eventToPerpTradeHistoryV9,
} from "./gns/v9/eventParsers";
import {
  eventParsers as eventParsersForGMX,
  eventToPerpTradeHistory as eventToPerpTradeHistoryForGMX,
} from "./gmx/v2/eventParsers";
import {
  eventParsers as eventParsersForAVNT,
  eventToPerpTradeHistory as eventToPerpTradeHistoryForAVNT,
} from "./avnt/v1/eventParsers";

const gnsV10EventSignatures: Record<string, string> = Object.fromEntries(
  gnsV10Abi
    .filter((item) => item.type === "event")
    .map((item) => [item.signature, item.name]),
);

const gnsV9EventSignatures: Record<string, string> = Object.fromEntries(
  gnsV9Abi
    .filter((item) => item.type === "event")
    .map((item) => [item.signature, item.name]),
);

const gnsV9PerpTradeEventNames = eventParsersV9.map((item) => item.eventName);
const gnsV10PerpTradeEventNames = eventParsersV10.map((item) => item.eventName);
const gmxV2PerpTradeEventNames = eventParsersForGMX.map(
  (item) => item.eventName,
);

const info = {
  [Platform.Gns]: {
    [Version.V9]: {
      tradeEventNames: gnsV9PerpTradeEventNames,
      eventSignatures: gnsV9EventSignatures,
      abi: gnsV9Abi,
      eventToPerpTradeHistory: eventToPerpTradeHistoryV9,
    },
    [Version.V10]: {
      tradeEventNames: gnsV10PerpTradeEventNames,
      eventSignatures: gnsV10EventSignatures,
      abi: gnsV10Abi,
      eventToPerpTradeHistory: eventToPerpTradeHistoryV10,
    },
  },
  [Platform.Gmx]: {
    [Version.V2]: {
      tradeEventNames: gmxV2PerpTradeEventNames,
      eventSignatures: null,
      abi: gmxV2Abi,
      eventToPerpTradeHistory: eventToPerpTradeHistoryForGMX,
    },
  },
  [Platform.Avnt]: {
    [Version.V1]: {
      tradeEventNames: eventParsersForAVNT.map((item) => item.eventName),
      eventSignatures: null,
      abi: avntGeneralAbi,
      eventToPerpTradeHistory: eventToPerpTradeHistoryForAVNT,
    },
  },
};

export function getWeb3Info(platform: Platform, version: Version) {
  if (platform === Platform.Gns) {
    if (version === Version.V9 || version === Version.V10) {
      return info[Platform.Gns][version];
    } else {
      throw new Error("Invalid version");
    }
  }

  if (platform === Platform.Gmx) {
    if (version === Version.V2) {
      return info[Platform.Gmx][version];
    } else {
      throw new Error("Invalid version");
    }
  }

  if (platform === Platform.Avnt) {
    if (version === Version.V1) {
      return info[Platform.Avnt][version];
    } else {
      throw new Error("Invalid version");
    }
  }

  throw new Error("Invalid platform");
}
