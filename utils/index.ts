import { Address } from "viem";

import crypto from "crypto";

export function shrinkAddress(address: Address, onlyFirst?: boolean) {
  if (onlyFirst) {
    return address.slice(0, 7);
  }
  return `${address.slice(0, 7)}...${address.slice(address.length - 5)}`;
}

export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      var base64String = reader?.result as string;
      resolve(base64String);
    };

    reader.readAsDataURL(file);
  });
}

export const sleep = (delay: number /* miliseconds */) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export function encodeIp(ipAddress: string) {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const keyBuffer = Buffer.from(process.env.NEXT_PUBLIC_SECRET || "", "hex");

  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
  let encrypted = cipher.update(ipAddress);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decodeIp(encrypted: string) {
  const textParts = encrypted.split(":");
  const iv = textParts.shift();
  const encryptedText = textParts.join(":");
  const keyBuffer = Buffer.from(process.env.NEXT_PUBLIC_SECRET || "", "hex");

  if (iv && encryptedText) {
    const ivBuffer = Buffer.from(iv, "hex");
    const encryptedTextBuffer = Buffer.from(encryptedText, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      keyBuffer,
      ivBuffer,
    );
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  return "";
}

export const formatWalletAddress = (address: string) => {
  if (address.length < 10) {
    return address;
  }

  const start = address.substring(0, 7);
  // const end = address.substring(address.length - 5, address.length);
  return `${start}`;
};

export const getMedal = (rank: number): string => {
  switch (rank) {
    case 1: {
      return "🥇";
    }
    case 2: {
      return "🥈";
    }
    case 3: {
      return "🥉";
    }
    default: {
      return `${rank}`;
    }
  }
};

export const lifeTimeItems = [
  {
    id: "1hr",
    label: "1 Hour",
    value: 60,
  },
  {
    id: "2hr",
    label: "2 Hours",
    value: 120,
  },
  {
    id: "4hr",
    label: "4 Hours",
    value: 240,
  },
  {
    id: "8hr",
    label: "8 Hours",
    value: 480,
  },
  {
    id: "16hr",
    label: "16 Hours",
    value: 960,
  },
  {
    id: "1d",
    label: "1 Day",
    value: 1440,
  },
  {
    id: "2d",
    label: "2 Days",
    value: 2880,
  },
  {
    id: "3d",
    label: "4 Day",
    value: 3 * 24 * 60,
  },
  {
    id: "1w",
    label: "1 Week",
    value: 7 * 24 * 60,
  },
  {
    id: "2w",
    label: "2 Weeks",
    value: 2 * 7 * 24 * 60,
  },
  {
    id: "1m",
    label: "1 Month",
    value: 30 * 24 * 60,
  },
  {
    id: "2m",
    label: "2 Months",
    value: 2 * 30 * 24 * 60,
  },
  {
    id: "3m",
    label: "3 Months",
    value: 3 * 30 * 24 * 60,
  },
  {
    id: "6m",
    label: "6 Months",
    value: 6 * 30 * 24 * 60,
  },
  {
    id: "1yr",
    label: "1 Year",
    value: 365 * 24 * 60,
  },
  {
    id: "2yr",
    label: "2 Years",
    value: 2 * 365 * 24 * 60,
  },
];

export function convertMinToLifetimeItem(value: number) {
  const result = lifeTimeItems.find((item) => item.value === value);

  if (result) {
    return result;
  }

  return {
    id: "xMinutes",
    label: `${value} Minutes`,
    value,
  };
}
