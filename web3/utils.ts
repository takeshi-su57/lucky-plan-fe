import { Platform, Version } from "@/graphql/gql/graphql";

import { gnsMultiCollatDiamondAbi as gnsV10Abi } from "./gns/v10/abi/GNSMultiCollatDiamond";
import { gnsMultiCollatDiamondAbi as gnsV9Abi } from "./gns/v9/abi/GNSMultiCollatDiamond";
import { EventEmitterAbi as gmxV2Abi } from "./gmx/v2/abi/EventEmitter";
import { avntGeneralAbi } from "./avnt/v1/abi/AvntGeneral";

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

const info = {
  [Platform.Gns]: {
    [Version.V9]: {
      eventSignatures: gnsV9EventSignatures,
      abi: gnsV9Abi,
    },
    [Version.V10]: {
      eventSignatures: gnsV10EventSignatures,
      abi: gnsV10Abi,
    },
  },
  [Platform.Gmx]: {
    [Version.V2]: {
      eventSignatures: null,
      abi: gmxV2Abi,
    },
  },
  [Platform.Avnt]: {
    [Version.V1]: {
      eventSignatures: null,
      abi: avntGeneralAbi,
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
