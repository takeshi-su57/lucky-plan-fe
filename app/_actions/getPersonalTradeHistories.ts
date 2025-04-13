"use client";

import { PersonalTradeHistory } from "@/types";

export async function getPersonalTradeHistories(
  backendUrl: string,
  address: string,
): Promise<PersonalTradeHistory[]> {
  try {
    console.log("fetching!!", backendUrl, address);

    const response = await fetch(
      `${backendUrl}/personal-trading-history-table/${address}`,
    );

    const data = await response.json();
    return data as PersonalTradeHistory[];
  } catch (err) {
    console.log(err);
    return [];
  }
}
