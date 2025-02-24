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

export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

function getWeekStart(date: Date): Date {
  const day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday as start of week
  const weekStart = new Date(date);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0); // Set to start of the day
  return weekStart;
}

export function isSameWeek(date1: Date, date2: Date): boolean {
  const startOfWeek1 = getWeekStart(date1);
  const startOfWeek2 = getWeekStart(date2);
  return startOfWeek1.getTime() === startOfWeek2.getTime();
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isSameHour(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours()
  );
}

export function isSameMinute(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
}

export function getAllMonthsBetween(startDate: Date, endDate: Date): Date[] {
  // Normalize dates to the first day of the month
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setDate(1);
  endDate.setHours(0, 0, 0, 0);

  const months: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    months.push(currentDate); // Format YYYY-MM
    currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
  }

  return months;
}

export function getAllWeeksBetween(startDate: Date, endDate: Date): Date[] {
  const startWeek = getWeekStart(startDate);

  const weeks: Date[] = [];
  const currentWeekStart = new Date(startWeek);

  while (currentWeekStart <= endDate) {
    weeks.push(currentWeekStart); // Add the start of the week in YYYY-MM-DD format
    currentWeekStart.setDate(currentWeekStart.getDate() + 7); // Move to the next week
  }

  return weeks;
}

export function getAllDaysBetween(startDate: Date, endDate: Date): Date[] {
  // Normalize time to midnight for both dates
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const days: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(currentDate); // Push date in YYYY-MM-DD format
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return days;
}

export function getAllHoursBetween(startDate: Date, endDate: Date): Date[] {
  // Normalize dates to the start of the hour
  startDate.setMinutes(0, 0, 0);
  endDate.setMinutes(0, 0, 0);

  const hours: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    hours.push(currentDate); // Store each hour in ISO format
    currentDate.setHours(currentDate.getHours() + 1); // Move to the next hour
  }

  return hours;
}

export function getAllMinutesBetween(startDate: Date, endDate: Date): Date[] {
  // Normalize dates to the start of the minute
  startDate.setSeconds(0, 0);
  endDate.setSeconds(0, 0);

  const minutes: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    minutes.push(currentDate); // Store each minute in ISO format
    currentDate.setMinutes(currentDate.getMinutes() + 1); // Move to the next minute
  }

  return minutes;
}

export function isValidColor(color: string) {
  // Regex for Hexadecimal colors (#RRGGBB, #RGB, #RRGGBBAA, #RGBA)
  const hexRegex =
    /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

  // Regex for RGB/RGBA (e.g., rgb(255, 255, 255) or rgba(255, 255, 255, 0.5))
  const rgbRegex =
    /^rgb(a)?\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/;

  // Regex for HSL/HSLA (e.g., hsl(360, 100%, 50%) or hsla(360, 100%, 50%, 0.5))
  const hslRegex =
    /^hsl(a)?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/;

  // Check if the input matches any of the above regex patterns
  return hexRegex.test(color) || rgbRegex.test(color) || hslRegex.test(color);
}

export function hasCommonItem<T>(array1: T[], array2: T[]): boolean {
  // Create a Set from the first array
  const set1 = new Set(array1);

  // Check if any item in array2 exists in set1
  for (const item of array2) {
    if (set1.has(item)) {
      return true; // Return true if a common item is found
    }
  }

  // If no common items are found, return false
  return false;
}

export function hasSameItems<T>(array1: T[], array2: T[]): boolean {
  // If the lengths are different, they can't be equal
  if (array1.length !== array2.length) {
    return false;
  }

  // Sort both arrays and compare them
  const sortedArray1 = [...array1].sort();
  const sortedArray2 = [...array2].sort();

  // Compare each item in the sorted arrays
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true; // Arrays contain the same items
}

export function getDayGap(date1: Date, date2: Date): number {
  // Convert both dates to UTC to avoid timezone issues
  const utcDate1 = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
  );
  const utcDate2 = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate(),
  );

  // Calculate the difference in milliseconds
  const diffInMilliseconds = Math.abs(utcDate2 - utcDate1);

  // Convert milliseconds to days
  return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
}

export function getDateAfterDays(date: Date, days: number): Date {
  const currentDate = date; // Get the current date and time
  const resultDate = currentDate; // Create a new Date object for the result
  resultDate.setDate(currentDate.getDate() + days); // Add the specified number of days
  return resultDate;
}

export function convertMillisToReadableTime(milliseconds: number): string {
  const msInMinute = 1000 * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  if (milliseconds < msInHour) {
    const minutes = Math.floor(milliseconds / msInMinute);
    return `${minutes} min${minutes === 1 ? "" : "s"}`;
  } else if (milliseconds < msInDay) {
    const hours = Math.floor(milliseconds / msInHour);
    return `${hours} hr${hours === 1 ? "" : "s"}`;
  } else {
    const days = Math.floor(milliseconds / msInDay);
    return `${days} day${days === 1 ? "" : "s"}`;
  }
}

export function getServerTimezone() {
  return process.env.NEXT_PUBLIC_SERVER_TIME_ZONE;
}

export function getPNLPercentage(params: {
  long: boolean;
  closePrice: number;
  openPrice: number;
  leverage: number;
}) {
  const p =
    params.openPrice > 0
      ? ((params.long
          ? params.closePrice - params.openPrice
          : params.openPrice - params.closePrice) *
          100 *
          params.leverage) /
        params.openPrice
      : 0;

  return p > 900 ? 900 : p;
}
