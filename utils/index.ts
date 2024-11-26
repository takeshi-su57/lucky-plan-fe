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
